'use server';
import { z } from 'zod';
import { FormStateType } from './definitions';
import { Resend } from 'resend';

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: '名前は二文字以上入力してください' })
    .max(50, { message: '名前は五十文字以内に収めてください' }),
  email: z.email({ message: '正しいメールアドレスをご入力ください' }),
  content: z
    .string()
    .min(5, { message: '内容は５文字以上入力してください' })
    .max(500, { message: '内容は500文字以内に収めてください' }),
});
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(
  _prevState: FormStateType,
  formData: FormData,
): Promise<FormStateType> {
  const fields = {
    name: formData.get('name'),
    email: formData.get('email'),
    content: formData.get('content'),
  };
  const validatedData = formSchema.safeParse({
    ...fields,
  });
  if (!validatedData.success) {
    return {
      success: false,
      message: '問い合わせに失敗しました.',
      errors: validatedData.error.flatten((error) => error.message).fieldErrors,
      fields: {
        name: typeof fields.name === 'string' ? fields.name : '',
        email: typeof fields.email === 'string' ? fields.email : '',
        content: typeof fields.content === 'string' ? fields.content : '',
      },
    };
  }
  const { name, email, content } = validatedData.data;
  try {
    const { error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: `${process.env.ADMIN_EMAIL}`,
      subject: `【ポートフォリオ】${name}様からの問い合わせ`,
      html: `<p>名前: ${name}</p><p>メール: ${email}</p><p>内容: ${content}</p>`,
    });
    if (error) {
      console.error('Resend API Error:', error);
      return {
        success: false,
        message: 'メール送信に失敗しました。時間をおいて再度お試しください。',
        fields: {
          name,
          email,
          content,
        },
      };
    }
    return { success: true, message: '送信完了しました！' };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: '送信に失敗しました。',
    };
  }
}
