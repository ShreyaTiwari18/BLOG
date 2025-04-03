document.addEventListener('DOMContentLoaded', function() {
    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const accordionContent = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Toggle current accordion item
            if (accordionContent.style.maxHeight) {
                accordionContent.style.maxHeight = null;
                icon.style.transform = 'rotate(0deg)';
            } else {
                // Close all other accordion items
                document.querySelectorAll('.accordion-content').forEach(content => {
                    content.style.maxHeight = null;
                });
                document.querySelectorAll('.accordion-header i').forEach(i => {
                    i.style.transform = 'rotate(0deg)';
                });
                
                // Open current one
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.slide-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
    
    // Mobile menu toggle
    function setupMobileMenu() {
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.mobile-menu-btn')) {
                const nav = document.querySelector('nav');
                const menuBtn = document.createElement('button');
                menuBtn.className = 'mobile-menu-btn';
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                
                const navList = document.querySelector('nav ul');
                
                menuBtn.addEventListener('click', function() {
                    this.classList.toggle('active');
                    navList.classList.toggle('active');
                });
                
                nav.insertBefore(menuBtn, navList);
                
                // Add styles for mobile menu
                const style = document.createElement('style');
                style.textContent = `
                    .mobile-menu-btn {
                        background: none;
                        border: none;
                        color: white;
                        font-size: 1.5rem;
                        cursor: pointer;
                        display: block;
                        margin: 0 auto 1rem;
                    }
                    
                    nav ul {
                        display: none;
                        flex-direction: column;
                        width: 100%;
                    }
                    
                    nav ul.active {
                        display: flex;
                    }
                    
                    nav ul li {
                        margin: 0;
                        text-align: center;
                        padding: 0.5rem 0;
                    }
                `;
                document.head.appendChild(style);
            }
        } else {
            const mobileBtn = document.querySelector('.mobile-menu-btn');
            if (mobileBtn) {
                mobileBtn.remove();
                const navList = document.querySelector('nav ul');
                navList.classList.remove('active');
                navList.style.display = 'flex';
            }
        }
    }
    
    window.addEventListener('resize', setupMobileMenu);
    setupMobileMenu();
    
    // CTA button functionality
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            document.querySelector('#techniques').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});