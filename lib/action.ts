'use server';
import { z } from 'zod';
import { FormStateType } from './definitions';

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
      errors: validatedData.error.flatten().fieldErrors,
    };
  }
  const { name, email, content } = validatedData.data;
  try {
    console.log(
      `問い合わせ内容: 名前: ${name}, メールアドレス: ${email}, 内容: ${content}`,
    );
    return {
      success: true,
      message: '問い合わせに成功しました。',
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: '通信に失敗しました。',
    };
  }
}
