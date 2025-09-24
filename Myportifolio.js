document.addEventListener('DOMContentLoaded', () => {
    const backgroundSnowContainer = document.querySelector('.background-snow-container');
    const foregroundSnowContainer = document.querySelector('.foreground-snow-container');
    const starsContainer = document.querySelector('.stars-container');

    const numberOfBackgroundSnowflakes = 80;
    const numberOfForegroundSnowflakes = 40;
    const numberOfStars = 50;

    // Function to create snowflakes with varying properties
    function createSnowflake(container, minSize, maxSize, minDuration, maxDuration, minDelay, maxDelay, opacity) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');

        const size = Math.random() * (maxSize - minSize) + minSize;
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;

        const startX = Math.random() * window.innerWidth;
        snowflake.style.left = `${startX}px`;

        snowflake.style.opacity = opacity;

        const animationDuration = Math.random() * (maxDuration - minDuration) + minDuration;
        snowflake.style.animationDuration = `${animationDuration}s`;

        const startDelay = Math.random() * (maxDelay - minDelay) + minDelay;
        snowflake.style.animationDelay = `${startDelay}s`;

        container.appendChild(snowflake);

        // Remove snowflake after it falls to prevent DOM bloat
        snowflake.addEventListener('animationiteration', () => {
            snowflake.remove();
            createSnowflake(container, minSize, maxSize, minDuration, maxDuration, minDelay, maxDelay, opacity);
        });
        snowflake.addEventListener('animationend', () => { // Fallback for browsers that don't fire iteration on infinite
             snowflake.remove();
             createSnowflake(container, minSize, maxSize, minDuration, maxDuration, minDelay, maxDelay, opacity);
        });
    }

    // Create background snowflakes (smaller, slower, more transparent)
    for (let i = 0; i < numberOfBackgroundSnowflakes; i++) {
        createSnowflake(backgroundSnowContainer, 1, 3, 15, 25, 0, 15, 0.4);
    }

    // Create foreground snowflakes (larger, faster, more opaque)
    for (let i = 0; i < numberOfForegroundSnowflakes; i++) {
        createSnowflake(foregroundSnowContainer, 3, 6, 8, 15, 0, 8, 0.8);
    }

    // Function to create twinkling stars
    function createStar(container) {
        const star = document.createElement('div');
        star.classList.add('star');

        const size = Math.random() * 2 + 0.5; // Size between 0.5px and 2.5px
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        star.style.left = `${startX}px`;
        star.style.top = `${startY}px`;

        const animationDuration = Math.random() * 4 + 2; // Twinkle duration 2s-6s
        star.style.animationDuration = `${animationDuration}s`;

        const startDelay = Math.random() * 5; // Delay for natural look
        star.style.animationDelay = `${startDelay}s`;

        container.appendChild(star);

        // Remove star after animation and re-create to prevent DOM bloat if needed
        // For stars, animationiteration works well for infinite. No explicit removal needed unless stars move.
    }

    // Create stars
    for (let i = 0; i < numberOfStars; i++) {
        createStar(starsContainer);
    }

    // Intersection Observer for Section Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    document.querySelectorAll('.portfolio-main section').forEach(section => {
        section.classList.add('fade-in-section'); // Add base class for animation
        sectionObserver.observe(section);
    });
});