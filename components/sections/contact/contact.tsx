import { sendEmail } from '@/lib/action';

export const Contact = () => {
  return (
    <section id="contact-section">
      <h2 className="section-title">Contact</h2>
      <div className="contact-area">
        <form action={sendEmail} id="contact-form">
          <input type="text" name="name" placeholder="name" />
          <input type="email" name="email" placeholder="email" />
          <textarea name="content" placeholder="message"></textarea>
          <button className="submit-btn">送信</button>
        </form>
      </div>
    </section>
  );
};
