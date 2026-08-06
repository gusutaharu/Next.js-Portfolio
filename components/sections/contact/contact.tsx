'use client';

import { sendEmail } from '@/lib/action';
import { useActionState } from 'react';
import { FormStateType } from '@/lib/definitions';
import { Turnstile } from '@marsidev/react-turnstile';

const initialState: FormStateType = {
  success: false,
  message: '',
};

export const Contact = () => {
  const [state, formAction, isPending] = useActionState(
    sendEmail,
    initialState,
  );

  return (
    <section id="contact-section">
      <h2 className="section-title">Contact</h2>
      <div className="contact-area">
        <form action={formAction} id="contact-form">
          {state.message && (
            <p
              className={` ${
                state.success ? 'success-message' : 'error-message'
              } `}
            >
              {state.message}
            </p>
          )}
          {state.errors?.name && (
            <p className="error-message">{state.errors.name}</p>
          )}
          <input
            type="text"
            name="name"
            disabled={isPending}
            defaultValue={state.fields?.name ?? ''}
            placeholder="name"
          />
          {state.errors?.email && (
            <p className="error-message">{state.errors.email}</p>
          )}
          <input
            type="email"
            name="email"
            disabled={isPending}
            defaultValue={state.fields?.email ?? ''}
            placeholder="email"
          />
          {state.errors?.content && (
            <p className="error-message">{state.errors.content}</p>
          )}
          <textarea
            name="content"
            disabled={isPending}
            defaultValue={state.fields?.content ?? ''}
            placeholder="message"
          ></textarea>
          <div className="my-4">
            <Turnstile siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!} />
          </div>
          <button type="submit" className="submit-btn" disabled={isPending}>
            {isPending ? '送信中...' : '送信'}
          </button>
        </form>
      </div>
    </section>
  );
};
