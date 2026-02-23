document.addEventListener('DOMContentLoaded', function() {
    // Typing animation with responsive cursor
    const typingSpan = document.querySelector('.typing-text span');
    
    if (typingSpan) {
        function getResponsiveCursorPos() {
            const width = window.innerWidth;
            if (width <= 480) {
                return {
                    'Software Developer': '250px',
                    'IT Support Specialist': '255px',
                    'Developer': '130px'
                };
            } else if (width <= 768) {
                return {
                    'Software Developer': '300px',
                    'IT Support Specialist': '305px',
                    'Developer': '160px'
                };
            } else {
                return {
                    'Software Developer': '360px',
                    'IT Support Specialist': '370px',
                    'Developer': '190px'
                };
            }
        }

        function updateCursorPosition() {
            const positions = getResponsiveCursorPos();
            const beforeStyle = window.getComputedStyle(typingSpan, '::before');
            const content = beforeStyle.content;
            let text = content.replace(/['"]/g, '');
            
            if (text.includes('Software Developer')) {
                typingSpan.style.setProperty('--cursor-pos', positions['Software Developer']);
            } else if (text.includes('IT Support Specialist')) {
                typingSpan.style.setProperty('--cursor-pos', positions['IT Support Specialist']);
            } else if (text.includes('Developer')) {
                typingSpan.style.setProperty('--cursor-pos', positions['Developer']);
            }
        }

        // Update on resize (debounced)
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(updateCursorPosition, 150);
        });

        setInterval(updateCursorPosition, 100);
        updateCursorPosition();
    }

    // Mobile menu functionality (only affects mobile)
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.setAttribute('aria-label', 'Menu');
    
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const logo = document.querySelector('.logo');
    
    if (header && nav && logo) {
        // Insert toggle after logo
        logo.insertAdjacentElement('afterend', menuToggle);
        
        // Toggle menu
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            nav.classList.toggle('active');
            menuToggle.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
        });
        
        // Close menu when clicking a link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                menuToggle.innerHTML = '☰';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!header.contains(e.target) && nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.innerHTML = '☰';
            }
        });
    }

    // Set active navigation based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
});