import React from 'react';

const features = [
    { title: 'Real-Time', description: 'Get scouted by the best teams in the NBA.' },
    { title: 'Analysis', description: 'Improve your game with our AI insights.' },
    { title: 'Insights', description: 'Get drafted by the best teams in the NBA.' },
];

const Features = () => (
    <section className="features">
        <h2>Features</h2>
        <div className="featureList">
            {features.map((feature, index) => (
                <div key={index} className="feature">
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                </div>
            ))}
        </div>
    </section>
);

export default Features;
