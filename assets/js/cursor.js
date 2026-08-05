/* ===================================
   Custom Cursor Effects
   =================================== */

// Cursor State
const cursorState = {
    cursor: null,
    follower: null,
    mouseX: 0,
    mouseY: 0,
    cursorX: 0,
    cursorY: 0,
    followerX: 0,
    followerY: 0,
    isHovering: false,
    isInitialized: false
};

// Initialize Custom Cursor
export function initCursor() {
    // Check if device supports hover (not touch device)
    if (window.matchMedia('(hover: none)').matches) {
        console.log('Touch device detected - skipping custom cursor');
        return;
    }
    
    // Check if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        console.log('Reduced motion preferred - skipping custom cursor');
        return;
    }
    
    cursorState.cursor = document.querySelector('.custom-cursor');
    cursorState.follower = document.querySelector('.cursor-follower');
    
    if (!cursorState.cursor || !cursorState.follower) {
        console.log('Cursor elements not found - skipping custom cursor');
        return;
    }
    
    cursorState.isInitialized = true;
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Initialize position
    cursorState.cursorX = window.innerWidth / 2;
    cursorState.cursorY = window.innerHeight / 2;
    cursorState.followerX = window.innerWidth / 2;
    cursorState.followerY = window.innerHeight / 2;
    
    // Event Listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    
    // Add hover effects to interactive elements
    addHoverEffects();
    
    // Start animation loop
    requestAnimationFrame(animateCursor);
    
    console.log('✨ Custom cursor initialized');
}

// Handle Mouse Move
function handleMouseMove(e) {
    cursorState.mouseX = e.clientX;
    cursorState.mouseY = e.clientY;
}

// Handle Mouse Down
function handleMouseDown() {
    if (!cursorState.isInitialized) return;
    
    cursorState.cursor.style.transform = `translate(${cursorState.cursorX}px, ${cursorState.cursorY}px) scale(0.8)`;
    cursorState.follower.style.transform = `translate(${cursorState.followerX}px, ${cursorState.followerY}px) scale(0.8)`;
}

// Handle Mouse Up
function handleMouseUp() {
    if (!cursorState.isInitialized) return;
    
    cursorState.cursor.style.transform = `translate(${cursorState.cursorX}px, ${cursorState.cursorY}px) scale(1)`;
    cursorState.follower.style.transform = `translate(${cursorState.followerX}px, ${cursorState.followerY}px) scale(1)`;
}

// Handle Mouse Enter (for hover states)
function handleMouseEnter(e) {
    if (!cursorState.isInitialized) return;
    
    const target = e.target;
    
    // Check if element should trigger hover state
    if (isInteractiveElement(target)) {
        setHoverState(true);
    }
}

// Handle Mouse Leave
function handleMouseLeave(e) {
    if (!cursorState.isInitialized) return;
    
    const target = e.target;
    
    if (isInteractiveElement(target)) {
        setHoverState(false);
    }
    
    // Check if we left the window
    if (e.relatedTarget === null) {
        cursorState.cursor.style.opacity = '0';
        cursorState.follower.style.opacity = '0';
    }
}

// Add Hover Effects to Interactive Elements
function addHoverEffects() {
    const interactiveSelectors = [
        'a',
        'button',
        '.btn',
        '.gallery-item',
        '.project-card',
        '.education-card',
        '.social-link',
        '.nav-link',
        '.contact-link',
        'input',
        'textarea',
        '[role="button"]',
        '[tabindex="0"]'
    ];
    
    const elements = document.querySelectorAll(interactiveSelectors.join(','));
    
    elements.forEach(element => {
        element.addEventListener('mouseenter', () => setHoverState(true));
        element.addEventListener('mouseleave', () => setHoverState(false));
    });
}

// Check if Element is Interactive
function isInteractiveElement(element) {
    const interactiveTags = ['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT'];
    const interactiveClasses = ['btn', 'gallery-item', 'project-card', 'education-card', 'social-link', 'nav-link', 'contact-link'];
    
    return (
        interactiveTags.includes(element.tagName) ||
        interactiveClasses.some(className => element.classList.contains(className)) ||
        element.getAttribute('role') === 'button' ||
        element.getAttribute('tabindex') === '0'
    );
}

// Set Hover State
function setHoverState(isHovering) {
    cursorState.isHovering = isHovering;
    
    if (isHovering) {
        document.body.classList.add('hovering');
    } else {
        document.body.classList.remove('hovering');
    }
}

// Animate Cursor
function animateCursor() {
    if (!cursorState.isInitialized) return;
    
    // Smooth cursor movement
    const cursorSpeed = 0.2;
    const followerSpeed = 0.1;
    
    cursorState.cursorX += (cursorState.mouseX - cursorState.cursorX) * cursorSpeed;
    cursorState.cursorY += (cursorState.mouseY - cursorState.cursorY) * cursorSpeed;
    
    cursorState.followerX += (cursorState.mouseX - cursorState.followerX) * followerSpeed;
    cursorState.followerY += (cursorState.mouseY - cursorState.followerY) * followerSpeed;
    
    // Apply transforms
    cursorState.cursor.style.transform = `translate(${cursorState.cursorX}px, ${cursorState.cursorY}px)`;
    cursorState.follower.style.transform = `translate(${cursorState.followerX}px, ${cursorState.followerY}px)`;
    
    // Show cursor if it was hidden
    cursorState.cursor.style.opacity = '1';
    cursorState.follower.style.opacity = '1';
    
    // Continue animation loop
    requestAnimationFrame(animateCursor);
}

// Magnetic Effect for Buttons
export function addMagneticEffect(element) {
    if (!cursorState.isInitialized) return;
    
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        element.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'translate(0, 0)';
    });
}

// Cursor Trail Effect (optional enhancement)
export function addCursorTrail() {
    if (!cursorState.isInitialized) return;
    
    const trailContainer = document.createElement('div');
    trailContainer.className = 'cursor-trail-container';
    trailContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9998;
    `;
    document.body.appendChild(trailContainer);
    
    const trailDots = [];
    const trailLength = 10;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail-dot';
        dot.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            transition: opacity 0.3s ease;
        `;
        trailContainer.appendChild(dot);
        trailDots.push({
            element: dot,
            x: cursorState.mouseX,
            y: cursorState.mouseY
        });
    }
    
    function animateTrail() {
        // Update first dot with current mouse position
        trailDots[0].x = cursorState.mouseX;
        trailDots[0].y = cursorState.mouseY;
        
        // Update subsequent dots
        for (let i = 1; i < trailDots.length; i++) {
            const prevDot = trailDots[i - 1];
            const currentDot = trailDots[i];
            
            currentDot.x += (prevDot.x - currentDot.x) * 0.3;
            currentDot.y += (prevDot.y - currentDot.y) * 0.3;
            
            currentDot.element.style.left = `${currentDot.x}px`;
            currentDot.element.style.top = `${currentDot.y}px`;
            currentDot.element.style.opacity = 1 - (i / trailDots.length);
        }
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
}

// Hide cursor on specific elements (like video players)
export function hideCursorOnElements(selectors) {
    const elements = document.querySelectorAll(selectors.join(','));
    
    elements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (cursorState.cursor) cursorState.cursor.style.opacity = '0';
            if (cursorState.follower) cursorState.follower.style.opacity = '0';
            document.body.style.cursor = 'auto';
        });
        
        element.addEventListener('mouseleave', () => {
            if (cursorState.cursor) cursorState.cursor.style.opacity = '1';
            if (cursorState.follower) cursorState.follower.style.opacity = '1';
            document.body.style.cursor = 'none';
        });
    });
}

// Clean up cursor (for when switching pages or disabling)
export function destroyCursor() {
    if (!cursorState.isInitialized) return;
    
    document.body.style.cursor = 'auto';
    document.body.classList.remove('hovering');
    
    if (cursorState.cursor) {
        cursorState.cursor.style.display = 'none';
    }
    
    if (cursorState.follower) {
        cursorState.follower.style.display = 'none';
    }
    
    cursorState.isInitialized = false;
    
    console.log('Custom cursor destroyed');
}

// Export cursor state for external use
export { cursorState };