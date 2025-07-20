// Modern Resume Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
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

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate sections on scroll
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Animate skill tags with stagger effect
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
        tag.classList.add('animate-in');
    });

    // Add hover effect to contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Add click-to-copy functionality for contact info
    const emailElement = document.querySelector('.contact-item span');
    if (emailElement && emailElement.textContent.includes('@')) {
        emailElement.style.cursor = 'pointer';
        emailElement.title = 'Click to copy email';
        
        emailElement.addEventListener('click', function() {
            navigator.clipboard.writeText(this.textContent).then(() => {
                // Show temporary feedback
                const originalText = this.textContent;
                this.textContent = 'Email copied!';
                this.style.color = '#10b981';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.color = '';
                }, 2000);
            });
        });
    }

    // Add typing animation to tagline
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        const originalText = tagline.textContent;
        tagline.textContent = '';
        
        let index = 0;
        function typeText() {
            if (index < originalText.length) {
                tagline.textContent += originalText.charAt(index);
                index++;
                setTimeout(typeText, 50);
            }
        }
        
        // Start typing animation after a delay
        setTimeout(typeText, 1000);
    }

    // Add progress bar animation to skills
    function animateSkillBars() {
        const skillCategories = document.querySelectorAll('.skill-category');
        skillCategories.forEach(category => {
            const skillTags = category.querySelectorAll('.skill-tag');
            skillTags.forEach((tag, index) => {
                tag.style.opacity = '0';
                tag.style.transform = 'translateY(20px)';
                tag.style.animation = `slideInUp 0.5s ease forwards ${index * 0.1}s`;
            });
        });
    }

    // Add CSS animation keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeInScale {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        .animate-in {
            animation: fadeInScale 0.5s ease forwards;
        }
        
        .contact-item {
            transition: transform 0.2s ease;
        }
        
        .skill-tag {
            animation: slideInUp 0.5s ease forwards;
        }
    `;
    document.head.appendChild(style);

    // Initialize animations
    setTimeout(animateSkillBars, 500);

    // Add print functionality
    function addPrintButton() {
        const header = document.querySelector('.header-content');
        const printBtn = document.createElement('button');
        printBtn.innerHTML = '<i class="fas fa-print"></i> Print Resume';
        printBtn.className = 'print-btn';
        printBtn.style.cssText = `
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            cursor: pointer;
            font-size: 0.875rem;
            transition: all 0.2s ease;
            display: none;
        `;
        
        printBtn.addEventListener('click', () => window.print());
        printBtn.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255, 255, 255, 0.3)';
        });
        printBtn.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255, 255, 255, 0.2)';
        });
        
        header.appendChild(printBtn);
        
        // Show print button on larger screens
        if (window.innerWidth > 768) {
            printBtn.style.display = 'inline-flex';
            printBtn.style.alignItems = 'center';
            printBtn.style.gap = '0.5rem';
        }
    }

    addPrintButton();

    // Add scroll-to-top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: var(--gradient-accent);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: var(--shadow-lg);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'p') {
            e.preventDefault();
            window.print();
        }
    });

    // Add focus management for accessibility
    const focusableElements = document.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });

    // Add lazy loading for better performance
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img.lazy');
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Add enhanced mobile menu if needed (future enhancement)
    function initMobileEnhancements() {
        if (window.innerWidth <= 768) {
            // Add mobile-specific enhancements
            document.body.classList.add('mobile-device');
            
            // Optimize touch interactions
            const interactiveElements = document.querySelectorAll('.skill-tag, .project-item, .experience-item');
            interactiveElements.forEach(element => {
                element.style.transition = 'all 0.3s ease';
            });
        }
    }

    initMobileEnhancements();
    window.addEventListener('resize', initMobileEnhancements);

    // Initialize all animations and interactions
    console.log('Resume website loaded successfully! 🚀');
});

// Theme toggle functionality (for future enhancement)
function initThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    
    // This could be expanded to include dark mode functionality
    // For now, it's prepared for future enhancement
}

// Export functions for potential external use
window.resumeWebsite = {
    scrollToSection: function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    },
    
    printResume: function() {
        window.print();
    },
    
    copyEmail: function() {
        const email = 'dakotajtegan@gmail.com';
        navigator.clipboard.writeText(email);
        console.log('Email copied to clipboard');
    }
};
