
// Mobile Menu Management
const menuBtn = document.querySelector('.menu-btn');
const mainMenu = document.querySelector('.main-menu');
const body = document.body;
const html = document.documentElement;

// Track menu state
let isMenuOpen = false;
let walletLinkAdded = false;

// Toggle mobile menu
menuBtn.addEventListener('click', toggleMobileMenu);

function toggleMobileMenu(e) {
    e.preventDefault();
    
    // Toggle menu state
    isMenuOpen = !isMenuOpen;
    
    // Toggle classes
    mainMenu.classList.toggle('show', isMenuOpen);
    menuBtn.classList.toggle('active', isMenuOpen);
    
    // Add Connect Wallet link only once
    if (isMenuOpen && !walletLinkAdded) {
        addWalletLinkToMenu();
        walletLinkAdded = true;
    }
    
    // Handle body scroll prevention
    handleBodyScroll(isMenuOpen);
    
    // Handle escape key listener
    if (isMenuOpen) {
        document.addEventListener('keydown', handleEscapeKey);
        // Add click outside to close
        setTimeout(() => {
            document.addEventListener('click', handleClickOutside);
        }, 100);
    } else {
        document.removeEventListener('keydown', handleEscapeKey);
        document.removeEventListener('click', handleClickOutside);
    }
}

// Add wallet link to mobile menu
function addWalletLinkToMenu() {
    const li = document.createElement('li');
    li.innerHTML = `<a href="#" class="mobile-wallet-link">Connect Wallet</a>`;
    li.classList.add('mobile-wallet-item');
    mainMenu.appendChild(li);
}

// Handle body scroll prevention with better approach
function handleBodyScroll(preventScroll) {
    if (preventScroll) {
        // Store current scroll position
        const scrollY = window.scrollY;
        
        // Apply styles to prevent scroll
        body.style.position = 'fixed';
        body.style.top = `-${scrollY}px`;
        body.style.left = '0';
        body.style.right = '0';
        body.style.overflow = 'hidden';
        html.style.overflow = 'hidden';
        
        // Store scroll position for restoration
        body.dataset.scrollY = scrollY;
    } else {
        // Restore scroll position
        const scrollY = parseInt(body.dataset.scrollY || '0', 10);
        
        // Remove styles
        body.style.position = '';
        body.style.top = '';
        body.style.left = '';
        body.style.right = '';
        body.style.overflow = '';
        html.style.overflow = '';
        
        // Restore scroll position
        window.scrollTo(0, scrollY);
        
        // Clean up
        delete body.dataset.scrollY;
    }
}

// Handle escape key to close menu
function handleEscapeKey(e) {
    if (e.key === 'Escape' && isMenuOpen) {
        closeMobileMenu();
    }
}

// Handle click outside menu to close
function handleClickOutside(e) {
    if (isMenuOpen && 
        !mainMenu.contains(e.target) && 
        !menuBtn.contains(e.target)) {
        closeMobileMenu();
    }
}

// Close mobile menu
function closeMobileMenu() {
    if (isMenuOpen) {
        isMenuOpen = false;
        mainMenu.classList.remove('show');
        menuBtn.classList.remove('active');
        handleBodyScroll(false);
        
        // Remove event listeners
        document.removeEventListener('keydown', handleEscapeKey);
        document.removeEventListener('click', handleClickOutside);
    }
}

// Close menu when clicking on menu links
mainMenu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && window.innerWidth <= 968) {
        closeMobileMenu();
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 968 && isMenuOpen) {
        closeMobileMenu();
    }
});
   

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animation elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));
});

// Button Ripple Effect
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-ripple')) {
        const ripple = document.createElement('span');
        const rect = e.target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        e.target.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Loading Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Counter Animation
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(progress * target);
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Animate counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const text = counter.textContent;
            const target = parseInt(text.replace(/[^0-9]/g, ''));
            
            if (target) {
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        }
    });
}, { threshold: 0.5 });

// Observe counter elements
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.frame-text h1');
    counters.forEach(counter => counterObserver.observe(counter));
});