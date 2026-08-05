/* ===================================
   Scroll Animations with Intersection Observer
   =================================== */

// Animation State
const animationState = {
    observers: [],
    animatedElements: new Set(),
    isInitialized: false
};

// Initialize Animations
export function initAnimations() {
    // Check if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        console.log('Reduced motion preferred - skipping scroll animations');
        // Show all elements immediately
        document.querySelectorAll('.reveal, .reveal-text, .reveal-up, .reveal-down, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
            el.classList.add('active');
        });
        return;
    }
    
    animationState.isInitialized = true;
    
    // Initialize different animation types
    initRevealAnimations();
    initParallaxAnimations();
    initCounterAnimations();
    initTextAnimations();
    initStaggerAnimations();
    initTimelineAnimations();
    
    console.log('🎬 Scroll animations initialized');
}

// Reveal Animations
function initRevealAnimations() {
    const revealSelectors = [
        '.reveal',
        '.reveal-text',
        '.reveal-up',
        '.reveal-down',
        '.reveal-left',
        '.reveal-right',
        '.reveal-scale',
        '.reveal-rotate'
    ];
    
    const revealElements = document.querySelectorAll(revealSelectors.join(','));
    
    if (revealElements.length === 0) return;
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add active class with delay based on data attribute
                const delay = element.dataset.delay || 0;
                setTimeout(() => {
                    element.classList.add('active');
                    animationState.animatedElements.add(element);
                }, parseInt(delay) * 1000);
                
                // Stop observing after animation
                revealObserver.unobserve(element);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
    
    animationState.observers.push(revealObserver);
}

// Parallax Animations
function initParallaxAnimations() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                parallaxElements.forEach(element => {
                    const speed = parseFloat(element.dataset.parallax) || 0.5;
                    const rect = element.getBoundingClientRect();
                    const scrolled = window.scrollY;
                    
                    // Only animate if element is in viewport
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        const yPos = -(scrolled * speed);
                        element.style.transform = `translateY(${yPos}px)`;
                    }
                });
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

// Counter Animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-counter]');
    
    if (counters.length === 0) return;
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.counter);
                const duration = parseInt(counter.dataset.duration) || 2000;
                
                animateCounter(counter, target, duration);
                counterObserver.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    animationState.observers.push(counterObserver);
}

// Animate Counter
function animateCounter(element, target, duration) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Text Animations
function initTextAnimations() {
    const textElements = document.querySelectorAll('[data-text-animation]');
    
    if (textElements.length === 0) return;
    
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.dataset.textAnimation || 'reveal';
                
                switch (animationType) {
                    case 'reveal':
                        animateTextReveal(element);
                        break;
                    case 'split':
                        animateTextSplit(element);
                        break;
                    case 'typewriter':
                        animateTypewriter(element);
                        break;
                }
                
                textObserver.unobserve(element);
            }
        });
    }, {
        threshold: 0.5
    });
    
    textElements.forEach(element => {
        textObserver.observe(element);
    });
    
    animationState.observers.push(textObserver);
}

// Text Reveal Animation
function animateTextReveal(element) {
    const text = element.textContent;
    element.textContent = '';
    
    [...text].forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.opacity = '0';
        span.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.02}s`;
        element.appendChild(span);
    });
}

// Text Split Animation
function animateTextSplit(element) {
    const text = element.textContent;
    const words = text.split(' ');
    element.textContent = '';
    
    words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        span.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        element.appendChild(span);
        
        if (index < words.length - 1) {
            element.appendChild(document.createTextNode(' '));
        }
        
        setTimeout(() => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Typewriter Animation
function animateTypewriter(element) {
    const text = element.textContent;
    element.textContent = '';
    let index = 0;
    
    const type = () => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, 50);
        }
    };
    
    type();
}

// Stagger Animations
function initStaggerAnimations() {
    const staggerContainers = document.querySelectorAll('[data-stagger]');
    
    if (staggerContainers.length === 0) return;
    
    staggerContainers.forEach(container => {
        const children = container.children;
        const delay = parseInt(container.dataset.stagger) || 100;
        
        Array.from(children).forEach((child, index) => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(20px)';
            child.style.transition = `opacity 0.5s ease, transform 0.5s ease`;
            child.dataset.delay = (index * delay) / 1000;
        });
    });
}

// Timeline Animations
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length === 0) return;
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                const marker = item.querySelector('.timeline-marker');
                const content = item.querySelector('.timeline-content');
                
                if (marker) {
                    marker.style.animation = 'scaleIn 0.5s ease forwards';
                }
                
                if (content) {
                    content.style.animation = 'fadeInLeft 0.5s ease forwards 0.2s';
                }
                
                timelineObserver.unobserve(item);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });
    
    timelineItems.forEach(item => {
        const marker = item.querySelector('.timeline-marker');
        const content = item.querySelector('.timeline-content');
        
        if (marker) marker.style.opacity = '0';
        if (content) {
            content.style.opacity = '0';
            content.style.transform = 'translateX(-20px)';
        }
        
        timelineObserver.observe(item);
    });
    
    animationState.observers.push(timelineObserver);
}

// Image Reveal Animations
export function initImageReveal() {
    const imageContainers = document.querySelectorAll('.image-reveal');
    
    if (imageContainers.length === 0) return;
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                imageObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    imageContainers.forEach(container => {
        imageObserver.observe(container);
    });
}

// Section Header Animations
export function initSectionHeaders() {
    const sectionHeaders = document.querySelectorAll('.section-label, .section-title');
    
    if (sectionHeaders.length === 0) return;
    
    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                headerObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    sectionHeaders.forEach(header => {
        header.classList.add('reveal-up');
        headerObserver.observe(header);
    });
}

// Card Hover Animations
export function initCardAnimations() {
    const cards = document.querySelectorAll('.project-card, .education-card, .gallery-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Scroll Progress Animation
export function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    
    if (!progressBar) {
        // Create progress bar
        const bar = document.createElement('div');
        bar.className = 'scroll-progress';
        document.body.appendChild(bar);
    }
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        
        document.querySelector('.scroll-progress').style.width = `${progress}%`;
    });
}

// Magnetic Button Effect
export function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.btn-magnetic');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// Cleanup Observers
export function cleanupAnimations() {
    animationState.observers.forEach(observer => {
        observer.disconnect();
    });
    
    animationState.observers = [];
    animationState.animatedElements.clear();
    animationState.isInitialized = false;
    
    console.log('Animation observers cleaned up');
}

// Restart Animations (useful for single-page applications)
export function restartAnimations() {
    cleanupAnimations();
    
    // Remove active classes from all animated elements
    document.querySelectorAll('.active').forEach(el => {
        el.classList.remove('active');
    });
    
    // Re-initialize
    initAnimations();
}

// Export animation state for external use
export { animationState };

// Initialize additional animation features
initImageReveal();
initSectionHeaders();
initCardAnimations();