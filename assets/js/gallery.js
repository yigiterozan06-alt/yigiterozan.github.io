/* ===================================
   Gallery with Lightbox Functionality
   =================================== */

// Gallery State
const galleryState = {
    images: [],
    currentIndex: 0,
    lightbox: null,
    lightboxImage: null,
    lightboxClose: null,
    lightboxPrev: null,
    lightboxNext: null,
    isInitialized: false
};

// Initialize Gallery
export function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    
    if (galleryItems.length === 0 || !lightbox) {
        console.log('Gallery elements not found - skipping gallery initialization');
        return;
    }
    
    // Collect all gallery images
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        if (img) {
            galleryState.images.push({
                src: img.src,
                alt: img.alt,
                index: index
            });
            
            // Add click event to open lightbox
            item.addEventListener('click', () => openLightbox(index));
        }
    });
    
    // Initialize lightbox elements
    galleryState.lightbox = lightbox;
    galleryState.lightboxImage = lightbox.querySelector('.lightbox-image');
    galleryState.lightboxClose = lightbox.querySelector('.lightbox-close');
    galleryState.lightboxPrev = lightbox.querySelector('.lightbox-prev');
    galleryState.lightboxNext = lightbox.querySelector('.lightbox-next');
    
    // Add lightbox event listeners
    galleryState.lightboxClose.addEventListener('click', closeLightbox);
    galleryState.lightboxPrev.addEventListener('click', showPrevImage);
    galleryState.lightboxNext.addEventListener('click', showNextImage);
    
    // Close lightbox on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboard);
    
    // Hide prev/next buttons if only one image
    if (galleryState.images.length <= 1) {
        galleryState.lightboxPrev.style.display = 'none';
        galleryState.lightboxNext.style.display = 'none';
    }
    
    galleryState.isInitialized = true;
    
    console.log(`🖼️ Gallery initialized with ${galleryState.images.length} images`);
}

// Open Lightbox
function openLightbox(index) {
    if (!galleryState.isInitialized) return;
    
    galleryState.currentIndex = index;
    updateLightboxImage();
    
    galleryState.lightbox.classList.add('active');
    galleryState.lightbox.setAttribute('aria-hidden', 'false');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Focus management
    galleryState.lightboxClose.focus();
}

// Close Lightbox
function closeLightbox() {
    if (!galleryState.isInitialized) return;
    
    galleryState.lightbox.classList.remove('active');
    galleryState.lightbox.setAttribute('aria-hidden', 'true');
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Return focus to the gallery item
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems[galleryState.currentIndex]) {
        galleryItems[galleryState.currentIndex].focus();
    }
}

// Update Lightbox Image
function updateLightboxImage() {
    const imageData = galleryState.images[galleryState.currentIndex];
    
    if (imageData && galleryState.lightboxImage) {
        galleryState.lightboxImage.src = imageData.src;
        galleryState.lightboxImage.alt = imageData.alt;
        
        // Update button states
        updateNavigationButtons();
    }
}

// Show Previous Image
function showPrevImage() {
    if (!galleryState.isInitialized) return;
    
    galleryState.currentIndex = (galleryState.currentIndex - 1 + galleryState.images.length) % galleryState.images.length;
    updateLightboxImage();
}

// Show Next Image
function showNextImage() {
    if (!galleryState.isInitialized) return;
    
    galleryState.currentIndex = (galleryState.currentIndex + 1) % galleryState.images.length;
    updateLightboxImage();
}

// Update Navigation Buttons
function updateNavigationButtons() {
    if (galleryState.images.length <= 1) return;
    
    // Always show both buttons for circular navigation
    galleryState.lightboxPrev.style.display = 'flex';
    galleryState.lightboxNext.style.display = 'flex';
    
    // Update aria labels for accessibility
    galleryState.lightboxPrev.setAttribute('aria-label', `Önceki resim (${galleryState.currentIndex + 1}/${galleryState.images.length})`);
    galleryState.lightboxNext.setAttribute('aria-label', `Sonraki resim (${galleryState.currentIndex + 1}/${galleryState.images.length})`);
}

// Handle Keyboard Navigation
function handleKeyboard(e) {
    if (!galleryState.isInitialized || !galleryState.lightbox.classList.contains('active')) {
        return;
    }
    
    switch (e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            showPrevImage();
            break;
        case 'ArrowRight':
            showNextImage();
            break;
        case 'ArrowUp':
            e.preventDefault();
            break;
        case 'ArrowDown':
            e.preventDefault();
            break;
    }
}

// Lazy Loading Images
export function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.addEventListener('load', () => {
                        img.classList.add('loaded');
                    });
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer
        lazyImages.forEach(img => {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        });
    }
}

// Masonry Layout (optional enhancement)
export function initMasonryLayout() {
    const galleryGrid = document.querySelector('.gallery-grid');
    
    if (!galleryGrid) return;
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    const columns = getComputedStyle(galleryGrid).gridTemplateColumns.split(' ').length;
    
    if (columns > 1) {
        // Simple masonry effect using CSS grid
        galleryItems.forEach((item, index) => {
            const row = Math.floor(index / columns);
            const span = Math.floor(Math.random() * 2) + 1; // Random span 1-2
            
            if (index % columns === 0 && span > 1) {
                item.style.gridRow = `span ${span}`;
            }
        });
    }
}

// Image Zoom on Hover
export function initImageZoom() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        
        if (img) {
            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                
                img.style.transformOrigin = `${x}% ${y}%`;
            });
            
            item.addEventListener('mouseleave', () => {
                img.style.transformOrigin = 'center center';
            });
        }
    });
}

// Gallery Filter (for future expansion)
export function initGalleryFilter() {
    // This can be expanded to add category filtering
    const filterButtons = document.querySelectorAll('.gallery-filter button');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter items
            galleryItems.forEach(item => {
                const category = item.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => item.classList.add('visible'), 10);
                } else {
                    item.classList.remove('visible');
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });
}

// Gallery Slideshow (auto-play feature)
export function initGallerySlideshow(interval = 5000) {
    if (!galleryState.isInitialized) return;
    
    let slideshowInterval;
    
    function startSlideshow() {
        slideshowInterval = setInterval(() => {
            if (galleryState.lightbox.classList.contains('active')) {
                showNextImage();
            }
        }, interval);
    }
    
    function stopSlideshow() {
        clearInterval(slideshowInterval);
    }
    
    // Start slideshow when lightbox opens
    galleryState.lightbox.addEventListener('transitionend', () => {
        if (galleryState.lightbox.classList.contains('active')) {
            startSlideshow();
        } else {
            stopSlideshow();
        }
    });
    
    // Stop slideshow on user interaction
    galleryState.lightboxPrev.addEventListener('click', () => {
        stopSlideshow();
        startSlideshow();
    });
    
    galleryState.lightboxNext.addEventListener('click', () => {
        stopSlideshow();
        startSlideshow();
    });
    
    // Stop slideshow on keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            if (galleryState.lightbox.classList.contains('active')) {
                stopSlideshow();
                startSlideshow();
            }
        }
    });
}

// Add Touch Support for Mobile
export function initTouchSupport() {
    if (!galleryState.isInitialized) return;
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    galleryState.lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    galleryState.lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - show next image
                showNextImage();
            } else {
                // Swipe right - show previous image
                showPrevImage();
            }
        }
    }
}

// Preload Next and Previous Images
export function preloadAdjacentImages() {
    if (!galleryState.isInitialized) return;
    
    function preloadImage(index) {
        const imageData = galleryState.images[index];
        if (imageData) {
            const img = new Image();
            img.src = imageData.src;
        }
    }
    
    // Preload current adjacent images
    preloadImage(galleryState.currentIndex + 1);
    preloadImage(galleryState.currentIndex - 1);
}

// Export gallery state for external use
export { galleryState };

// Initialize additional gallery features
initLazyLoading();
initImageZoom();
initTouchSupport();