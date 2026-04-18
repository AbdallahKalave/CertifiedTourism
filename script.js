// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 1. Initial Load Animations
const tl = gsap.timeline();

tl.from('.navbar', {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
})
.from('.hero-content', {
    scale: 0.9,
    opacity: 0,
    duration: 1.5,
    ease: 'power2.out'
}, "-=0.5");



const navbar = document.querySelector('.navbar');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (navbar && window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else if (navbar) {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle logic handled by inline onclick for maximum reliability
// This script focuses on closing the menu when links are clicked and handling the icon states

const toggleIcon = () => {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const icon = navToggle ? navToggle.querySelector('i') : null;
    if (icon && navMenu) {
        if (navMenu.classList.contains('show-menu')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    }
};

// Listen for class changes to update icon
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
            toggleIcon();
        }
    });
});

const menuEl = document.getElementById('nav-menu');
if (menuEl) {
    observer.observe(menuEl, { attributes: true });
}

// Close menu when clicking links
const navLinksItems = document.querySelectorAll('.nav-links a, .nav-cta');
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.classList.remove('show-menu');
            const icon = navToggle ? navToggle.querySelector('i') : null;
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-xmark');
            }
        }
    });
});

// 2. Global Section Zoom & Opacity coupled with Scroll
const sections = gsap.utils.toArray('section:not(.hero), .footer');

sections.forEach((section) => {
    gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top", 
            scrub: 0.5,
            toggleActions: "play none none reverse"
        }
    })
    .fromTo(section, 
        { scale: 0.9, opacity: 0, filter: 'blur(10px)' }, 
        { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.15, ease: 'power2.out' }
    )
    .to(section, 
        { scale: 1, opacity: 1, duration: 0.8 } // Significantly longer stay
    )
    .to(section, 
        { scale: 0.9, opacity: 0, filter: 'blur(10px)', duration: 0.15, ease: 'power2.in' }
    );
});

// 3. Smooth Staggered Reveals for static elements within sections
gsap.utils.toArray('.experience-card, .story-step, .testimonial-card, .team-card').forEach((elem) => {
    gsap.from(elem, {
        scrollTrigger: {
            trigger: elem,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    });
});
