// Initialize Lucide icons when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all Lucide icons
    lucide.createIcons();
    
    // Add loading animation to icons
    const icons = document.querySelectorAll('[data-lucide]');
    icons.forEach(icon => {
        icon.classList.add('icon-loading');
        // Add a small delay to create a staggered loading effect
        setTimeout(() => {
            icon.classList.remove('icon-loading');
            icon.classList.add('icon-loaded');
        }, Math.random() * 200);
    });
    
    // Add click analytics (optional)
    const helpCards = document.querySelectorAll('.help-card');
    helpCards.forEach((card, index) => {
        card.addEventListener('click', function(e) {
            const cardTitle = this.querySelector('.card-title').textContent;
            console.log(`Card clicked: ${cardTitle}`);
            
            // You can add analytics tracking here
            // Example: gtag('event', 'help_card_click', { card_name: cardTitle });
        });
        
        // Add keyboard navigation
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Add smooth scroll behavior for internal links
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
    
    // Add intersection observer for animation on scroll (optional enhancement)
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe all cards for scroll animations
        helpCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }
});

// Add resize handler for responsive logo switching
window.addEventListener('resize', function() {
    const logoFull = document.getElementById('logo-full');
    const logoToggle = document.getElementById('logo-toggle');
    
    if (window.innerWidth <= 767) {
        logoFull.style.display = 'none';
        logoToggle.style.display = 'block';
    } else {
        logoFull.style.display = 'block';
        logoToggle.style.display = 'none';
    }
});

// Performance optimization: Preload hover states
document.addEventListener('mouseover', function(e) {
    if (e.target.closest('.help-card')) {
        // Preload any resources that might be needed on hover
        // This is where you could preload images or prepare animations
    }
});

// Add focus management for accessibility
document.addEventListener('keydown', function(e) {
    // Handle tab navigation
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});