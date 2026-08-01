'use server';
import { z } from 'zod';

const formSchema = z.object({
  name: z
    .string()
    .min(2, { error: '名前は二文字以上入力してください' })
    .max(50, { error: '名前は五十文字以内に収めてください' }),
  email: z.email({ error: '正しいメールアドレスをご入力ください' }),
  content: z
    .string()
    .min(5, { error: '内容は５文字以上入力してください' })
    .max(500, { error: '内容は500文字以内に収めてください' }),
});

export async function sendEmail(formData: FormData) {
  const validatedData = formSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    content: formData.get('content'),
  });
  try {
    console.log('validatedData', validatedData);
  } catch (error) {
    console.log(error);
  }
}
