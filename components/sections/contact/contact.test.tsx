import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Contact } from './contact';

jest.mock('@marsidev/react-turnstile', () => ({
  Turnstile: () => <div data-testid="mock-turnstile" />,
}));

jest.mock('@/lib/action', () => ({
  sendEmail: jest.fn(),
}));

describe('Contact Component', () => {
  it('1. 初期表示で各フォーム要素と Turnstile が正しく描画されること', () => {
    render(<Contact />);

    expect(screen.getByPlaceholderText('name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('message')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '送信' })).toBeInTheDocument();
    expect(screen.getByTestId('mock-turnstile')).toBeInTheDocument();
  });

  it('2. ユーザーの入力を受け付けられること', () => {
    render(<Contact />);

    const nameInput = screen.getByPlaceholderText('name') as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText('email') as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: 'テストユーザー' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(nameInput.value).toBe('テストユーザー');
    expect(emailInput.value).toBe('test@example.com');
  });
});
