/* =========================================================================
   # Lucide Icons
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
});

/* =========================================================================
   # Mobile Navigation
   ========================================================================= */

const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active');
    
    // Hamburger icon animation
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
    
    // Prevent scrolling when menu is open
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : 'auto';
});

/* =========================================================================
   # Smooth Scrolling
   ========================================================================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            const spans = hamburger.querySelectorAll('span');
            spans.forEach(s => s.style.transform = 'none');
            spans[1].style.opacity = '1';

            const headerHeight = document.querySelector('.header').offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* =========================================================================
   # FAQ Accordion
   ========================================================================= */

document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        item.classList.toggle('active');
        
        const icon = button.querySelector('i');
        if (item.classList.contains('active')) {
            icon.setAttribute('data-lucide', 'minus');
        } else {
            icon.setAttribute('data-lucide', 'plus');
        }
        lucide.createIcons();
    });
});

/* =========================================================================
   # Intersection Observer for Animations
   ========================================================================= */

const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            
            // Trigger counter animation if it's the results section
            if (entry.target.classList.contains('results')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-up, .results').forEach(el => {
    observer.observe(el);
});

/* =========================================================================
   # Counter Animation
   ========================================================================= */

function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const duration = 2000; // 2 seconds

    counters.forEach(counter => {
        const target = +counter.innerText;
        const startTime = performance.now();
        
        const update = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Ease out function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.floor(easeOut * target);
            
            counter.innerText = currentCount;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.innerText = target;
            }
        };
        
        requestAnimationFrame(update);
    });
}

/* =========================================================================
   # Form Submission Mock
   ========================================================================= */

const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.textContent = '送信中...';
        submitBtn.disabled = true;
        
        // Mock API call
        setTimeout(() => {
            contactForm.parentElement.querySelector('.form-header').style.display = 'none';
            contactForm.style.display = 'none';
            formSuccess.classList.remove('hidden');
            
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 1500);
    });
}
