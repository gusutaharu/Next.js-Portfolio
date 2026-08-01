'use server';

export async function sendEmail(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const content = formData.get('content') as string;
  try {
    console.log(name, email, content);
  } catch (error) {
    console.log(error);
  }
}
