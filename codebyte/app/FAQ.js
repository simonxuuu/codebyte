import React from 'react';

const faqs = [
    { question: 'How does CourtIQ work?', answer: 'CourtIQ uses AI to analyze your performance and provide insights.' },
    { question: 'Is there a free trial?', answer: 'Yes, we offer a 7-day free trial for new users.' },
];

const FAQ = () => (
    <section className="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faqList">
            {faqs.map((faq, index) => (
                <div key={index} className="faqItem">
                    <h3>{faq.question}</h3>
                    <p>{faq.answer}</p>
                </div>
            ))}
        </div>
    </section>
);

export default FAQ;
