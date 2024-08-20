"use client";

export default function Home() {
  return (
    <main>
      <h1>Have an issue/suggestion?</h1>
      <p>Send us a message. We will resolve it promptly.</p>

      <form className="feedbackForm" action="https://formsubmit.co/el/memipi">
        <input
          type="name"
          name="name"
          placeholder="John Doe"
          required
          className="button"
        />
        <input
          type="subject"
          name="subject"
          placeholder="Issue (How do I do this)"
          required
          className="button"
        />
        <input
          type="email"
          name="email"
          placeholder="your_email@email.com"
          required
          className="button"
        />
        <textarea
          type="message"
          name="message"
          placeholder="message (ex: How do I do this?)"
          required
          className=""
        />

        <button type="submit" className="button">
          Send a message
        </button>
      </form>
    </main>
  );
}
