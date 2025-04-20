// DOM Elements
const backToTop = document.querySelector('.back-to-top');
const skillBars = document.querySelectorAll('.skill-progress-bar');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
const contactForm = document.getElementById('contactForm');
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const typingText = document.querySelector('.typing-text');

// Custom Cursor
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

document.addEventListener('mousedown', () => {
    cursor.style.width = '8px';
    cursor.style.height = '8px';
    cursorFollower.style.width = '25px';
    cursorFollower.style.height = '25px';
});

document.addEventListener('mouseup', () => {
    cursor.style.width = '10px';
    cursor.style.height = '10px';
    cursorFollower.style.width = '30px';
    cursorFollower.style.height = '30px';
});

// Hover effects for links and buttons
const hoverElements = document.querySelectorAll('a, button, .filter-btn, .project-card, .skill-icon-inner');
hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.width = '0';
        cursor.style.height = '0';
        cursorFollower.style.width = '50px';
        cursorFollower.style.height = '50px';
        cursorFollower.style.borderColor = 'var(--primary-color)';
        cursorFollower.style.backgroundColor = 'rgba(108, 92, 231, 0.1)';
    });

    element.addEventListener('mouseleave', () => {
        cursor.style.width = '10px';
        cursor.style.height = '10px';
        cursorFollower.style.width = '30px';
        cursorFollower.style.height = '30px';
        cursorFollower.style.borderColor = 'var(--primary-color)';
        cursorFollower.style.backgroundColor = 'transparent';
    });
});

// Back to Top Button
window.addEventListener('scroll', () => {
    // Back to Top Button
    if (window.scrollY > 500) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }

    // Reveal Elements on Scroll
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });

    // Animate Skill Bars on Scroll
    skillBars.forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (barTop < windowHeight - 50) {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        }
    });
});

// Project Filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));

        // Add active class to clicked button
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        // Filter projects
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Form Submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const formValues = Object.fromEntries(formData.entries());

        // Here you would typically send the data to a server
        // For now, we'll just log it and show a success message
        console.log('Form submitted:', formValues);

        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div class="success-icon"><i class="fas fa-check-circle"></i></div>
            <p>Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağım.</p>
        `;

        // Replace form with success message
        contactForm.innerHTML = '';
        contactForm.appendChild(successMessage);
    });
}

// Update the typing animation phrases to reflect backend focus
const phrases = [
    "Merhaba, Ben Furkan",
    "Backend Developer",
    ".NET & C# Web Geliştiriyorum"
];


let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isWaiting = false;

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];

    if (isWaiting) {
        setTimeout(typeWriter, 1500);
        isWaiting = false;
        return;
    }

    if (isDeleting) {
        // Deleting text
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }

        setTimeout(typeWriter, 50);
    } else {
        // Typing text
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentPhrase.length) {
            isDeleting = true;
            isWaiting = true;
        }

        setTimeout(typeWriter, 150);
    }
}

// Particle Animation for About Section
function createAboutParticles() {
    const aboutParticles = document.querySelector('.about-particles');
    if (!aboutParticles) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'about-particle';

        // Random size
        const size = Math.random() * 5 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        particle.style.left = posX + '%';
        particle.style.top = posY + '%';

        // Random color
        const colors = ['var(--primary-color)', 'var(--secondary-color)', 'var(--accent-color)', '#fff'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.backgroundColor = color;

        // Random animation duration
        const duration = Math.random() * 20 + 10;
        particle.style.animation = `float ${duration}s infinite`;

        // Random animation delay
        const delay = Math.random() * 10;
        particle.style.animationDelay = delay + 's';

        aboutParticles.appendChild(particle);
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Start typing animation
    setTimeout(typeWriter, 1000);

    // Initialize animations
    createAboutParticles();

    // Trigger scroll event to initialize animations
    window.dispatchEvent(new Event('scroll'));

    // Add CSS for success message and about particles
    const style = document.createElement('style');
    style.textContent = `
        .success-message {
            text-align: center;
            padding: 30px;
            background-color: var(--background-dark);
            border-radius: var(--border-radius);
            animation: fadeIn 0.5s forwards;
        }
        
        .success-icon {
            font-size: 3rem;
            color: var(--success-color);
            margin-bottom: 20px;
        }
        
        .success-message p {
            color: var(--text-primary);
            font-size: 1.1rem;
        }
        
        .about-particle {
            position: absolute;
            border-radius: 50%;
            opacity: 0.5;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
});
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 100;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createStars() {
    stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5 + 0.5,
            speed: Math.random() * 0.5 + 0.2,
        });
    }
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';

    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        star.y += star.speed;

        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    });

    requestAnimationFrame(animateStars);
}

window.addEventListener('resize', () => {
    resizeCanvas();
    createStars();
});

resizeCanvas();
createStars();
animateStars();

// Particle Animation
const createParticles = () => {
    const particles = document.querySelectorAll('.particle');

    particles.forEach(particle => {
        // Random starting position
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;

        particle.style.left = `${randomX}%`;
        particle.style.top = `${randomY}%`;
    });
};

createParticles();