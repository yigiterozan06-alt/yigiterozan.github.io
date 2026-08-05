/* ===================================
   Smooth Scrolling
   =================================== */

// Smooth Scroll State
const scrollState = {
    isScrolling: false,
    scrollTimeout: null,
    isInitialized: false,
    smoothScrollEnabled: true
};

// Initialize Smooth Scroll
export function initSmoothScroll() {
    // Check if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        scrollState.smoothScrollEnabled = false;
        console.log('Reduced motion preferred - smooth scroll disabled');
        return;
    }
    
    scrollState.isInitialized = true;
    
    // Initialize anchor link smooth scrolling
    initAnchorLinks();
    
    // Initialize scroll spy
    initScrollSpy();
    
    // Initialize scroll-to-top button (optional)
    initScrollToTop();
    
    // Handle horizontal scroll (if needed)
    initHorizontalScroll();
    
    console.log('📜 Smooth scroll initialized');
}

// Initialize Anchor Links
function initAnchorLinks() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                scrollToElement(target);
            }
        });
    });
}

// Scroll to Element
export function scrollToElement(element, offset = 0) {
    if (!element) return;
    
    const targetPosition = element.getBoundingClientRect().top + window.scrollY - offset;
    
    if (scrollState.smoothScrollEnabled) {
        // Use native smooth scrolling
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    } else {
        // Instant scroll for reduced motion
        window.scrollTo({
            top: targetPosition,
            behavior: 'auto'
        });
    }
    
    // Update focus for accessibility
    setTimeout(() => {
        element.focus({ preventScroll: true });
    }, 500);
}

// Scroll to Top
export function scrollToTop() {
    if (scrollState.smoothScrollEnabled) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else {
        window.scrollTo({
            top: 0,
            behavior: 'auto'
        });
    }
}

// Scroll to Bottom
export function scrollToBottom() {
    if (scrollState.smoothScrollEnabled) {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    } else {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'auto'
        });
    }
}

// Initialize Scroll Spy
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 100;
                    const sectionHeight = section.offsetHeight;
                    const sectionId = section.getAttribute('id');
                    
                    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                        navLinks.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === `#${sectionId}`) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

// Initialize Scroll to Top Button
function initScrollToTop() {
    // Create scroll-to-top button
    const scrollButton = document.createElement('button');
    scrollButton.className = 'scroll-to-top';
    scrollButton.setAttribute('aria-label', 'Sayfanın başına dön');
    scrollButton.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
        </svg>
    `;
    
    // Add styles
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 48px;
        height: 48px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 100;
    `;
    
    document.body.appendChild(scrollButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
            scrollButton.style.transform = 'translateY(0)';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
            scrollButton.style.transform = 'translateY(20px)';
        }
    });
    
    // Scroll to top on click
    scrollButton.addEventListener('click', scrollToTop);
    
    // Hover effect
    scrollButton.addEventListener('mouseenter', () => {
        scrollButton.style.background = 'rgba(255, 255, 255, 0.2)';
    });
    
    scrollButton.addEventListener('mouseleave', () => {
        scrollButton.style.background = 'rgba(255, 255, 255, 0.1)';
    });
}

// Initialize Horizontal Scroll
function initHorizontalScroll() {
    const horizontalContainers = document.querySelectorAll('[data-horizontal-scroll]');
    
    horizontalContainers.forEach(container => {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        container.addEventListener('mousedown', (e) => {
            isDown = true;
            container.style.cursor = 'grabbing';
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });
        
        container.addEventListener('mouseleave', () => {
            isDown = false;
            container.style.cursor = 'grab';
        });
        
        container.addEventListener('mouseup', () => {
            isDown = false;
            container.style.cursor = 'grab';
        });
        
        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        });
    });
}

// Smooth Scroll with Duration (custom implementation)
export function smoothScrollTo(target, duration = 1000) {
    const targetY = target.getBoundingClientRect().top + window.scrollY;
    const startY = window.scrollY;
    const distance = targetY - startY;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function (ease-out cubic)
        const ease = 1 - Math.pow(1 - progress, 3);
        
        window.scrollTo(0, startY + distance * ease);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

// Scroll Event Handlers
export function onScrollStart(callback) {
    window.addEventListener('scroll', () => {
        if (!scrollState.isScrolling) {
            scrollState.isScrolling = true;
            if (callback) callback();
        }
        
        clearTimeout(scrollState.scrollTimeout);
        scrollState.scrollTimeout = setTimeout(() => {
            scrollState.isScrolling = false;
        }, 100);
    });
}

export function onScrollEnd(callback) {
    window.addEventListener('scroll', () => {
        clearTimeout(scrollState.scrollTimeout);
        scrollState.scrollTimeout = setTimeout(() => {
            scrollState.isScrolling = false;
            if (callback) callback();
        }, 100);
    });
}

// Scroll Direction Detection
export function initScrollDirection() {
    let lastScrollY = window.scrollY;
    let scrollDirection = 'down';
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY) {
            scrollDirection = 'down';
        } else {
            scrollDirection = 'up';
        }
        
        lastScrollY = currentScrollY;
        
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('scrollDirectionChange', {
            detail: { direction: scrollDirection }
        }));
    });
    
    return scrollDirection;
}

// Scroll Progress
export function getScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    return (scrollTop / docHeight) * 100;
}

// Scroll to Element by ID
export function scrollToById(id, offset = 0) {
    const element = document.getElementById(id);
    if (element) {
        scrollToElement(element, offset);
    }
}

// Smooth Scroll Configuration
export function configureSmoothScroll(options) {
    if (options.enabled !== undefined) {
        scrollState.smoothScrollEnabled = options.enabled;
    }
    
    if (options.offset) {
        // Store offset for future use
        scrollState.offset = options.offset;
    }
}

// Export scroll state for external use
export { scrollState };

// Listen for scroll direction changes
initScrollDirection();