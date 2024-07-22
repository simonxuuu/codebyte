// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Feature cards animation on scroll
window.addEventListener('scroll', function () {
    const featureCards = document.querySelectorAll('.feature-card');
    const triggerBottom = window.innerHeight * 0.8;

    featureCards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;

        if (cardTop < triggerBottom) {
            card.classList.add('visible');
        }
    });
});
