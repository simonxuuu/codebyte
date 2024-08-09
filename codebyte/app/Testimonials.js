import React from 'react';

const testimonials = [
    { name: 'John Doe', text: 'CourtIQ helped me get noticed by top scouts!' },
    { name: 'Jane Smith', text: 'The insights provided by CourtIQ are invaluable.' },
];

const Testimonials = () => (
    <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonialList">
            {testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial">
                    <p>"{testimonial.text}"</p>
                    <p>- {testimonial.name}</p>
                </div>
            ))}
        </div>
    </section>
);

export default Testimonials;
