import { sendEmail } from './action';

const mockSend = jest.fn();

jest.mock('resend', () => {
  return {
    Resend: jest.fn().mockImplementation(() => ({
      emails: {
        send: jest.fn().mockImplementation((...args) => mockSend(...args)),
      },
    })),
  };
});

describe('sendEmail (Server Action)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.TURNSTILE_SECRET_KEY = 'mock-turnstile-secret';
    process.env.ADMIN_EMAIL = 'admin@example.com';
    process.env.RESEND_API_KEY = 'mock-resend-key';
    delete process.env.NEXT_PUBLIC_APP_ENV;
  });

  afterAll(() => {
    delete process.env.TURNSTILE_SECRET_KEY;
    delete process.env.ADMIN_EMAIL;
    delete process.env.RESEND_API_KEY;
  });

  it('正常系: 全ての検証が成功した場合: 送信完了メッセージを返すこと', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ success: true }),
    } as unknown as Response);

    mockSend.mockResolvedValueOnce({
      data: { id: 'mock_email_id' },
      error: null,
    });

    const formData = new FormData();
    formData.append('name', '山田太郎');
    formData.append('email', 'test@example.com');
    formData.append('content', 'テストのお問い合わせ内容です。');
    formData.append('cf-turnstile-response', 'valid-token');

    const result = await sendEmail({ success: false, message: '' }, formData);

    expect(result.success).toBe(true);
    expect(result.message).toBe('送信完了しました！');
  });

  it('異常系: 入力値が不正な場合（Zodエラー）: エラーメッセージと安全なfieldsを返すこと', async () => {
    const formData = new FormData();
    formData.append('name', 'a');
    formData.append('email', 'invalid-email');
    formData.append('content', 'text');

    const result = await sendEmail({ success: false, message: '' }, formData);

    expect(result.success).toBe(false);
    expect(result.message).toBe('問い合わせに失敗しました.');
    expect(result.errors?.name).toContain('名前は二文字以上入力してください');
    expect(result.errors?.email).toContain(
      '正しいメールアドレスをご入力ください',
    );
    expect(result.errors?.content).toContain(
      '内容は５文字以上入力してください',
    );
    expect(result.fields).toEqual({
      name: 'a',
      email: 'invalid-email',
      content: 'text',
    });
  });

  it('異常系: Turnstile トークンがない場合: チェック要求エラーを返すこと', async () => {
    const formData = new FormData();
    formData.append('name', '山田太郎');
    formData.append('email', 'test@example.com');
    formData.append('content', 'テストのお問い合わせ内容です。');

    const result = await sendEmail({ success: false, message: '' }, formData);

    expect(result.success).toBe(false);
    expect(result.message).toBe('Bot判定チェックを完了してください。');
    expect(result.fields?.name).toBe('山田太郎');
  });

  it('異常系: Turnstile 認証が失敗した場合: 認証エラーを返すこと', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ success: false }),
    } as unknown as Response);

    const formData = new FormData();
    formData.append('name', '山田太郎');
    formData.append('email', 'test@example.com');
    formData.append('content', 'テストのお問い合わせ内容です。');
    formData.append('cf-turnstile-response', 'invalid-token');

    const result = await sendEmail({ success: false, message: '' }, formData);

    expect(result.success).toBe(false);
    expect(result.message).toBe(
      'Bot判定の検証に失敗しました。再度お試しください。',
    );
  });

  it('異常系: Resend からエラーが返ってきた場合: 送信失敗エラーを返すこと', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ success: true }),
    } as unknown as Response);

    mockSend.mockResolvedValueOnce({
      data: null,
      error: { message: 'Resend API Error' },
    });

    const formData = new FormData();
    formData.append('name', '山田太郎');
    formData.append('email', 'test@example.com');
    formData.append('content', 'テストのお問い合わせ内容です。');
    formData.append('cf-turnstile-response', 'valid-token');

    const result = await sendEmail({ success: false, message: '' }, formData);

    expect(result.success).toBe(false);
    expect(result.message).toBe(
      'メール送信に失敗しました。時間をおいて再度お試しください。',
    );
  });
});
