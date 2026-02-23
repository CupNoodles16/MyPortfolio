document.addEventListener('DOMContentLoaded', function() {
    // Typing animation
    const typingSpan = document.querySelector('.typing-text span');
    
    if (typingSpan) {
        function getCursorPositions() {
            const width = window.innerWidth;
            if (width <= 480) {
                return {
                    'Software Developer': '180px',
                    'IT Support Specialist': '185px',
                    'Developer': '100px'
                };
            } else if (width <= 768) {
                return {
                    'Software Developer': '240px',
                    'IT Support Specialist': '245px',
                    'Developer': '130px'
                };
            } else if (width <= 995) {
                return {
                    'Software Developer': '280px',
                    'IT Support Specialist': '285px',
                    'Developer': '150px'
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
            const positions = getCursorPositions();
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

        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(updateCursorPosition, 150);
        });

        setInterval(updateCursorPosition, 100);
        updateCursorPosition();
    }

    // Create and add menu toggle button
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const logo = document.querySelector('.logo');
    
    if (header && nav && logo) {
        // Check if menu toggle already exists
        if (!document.querySelector('.menu-toggle')) {
            const menuToggle = document.createElement('button');
            menuToggle.className = 'menu-toggle';
            menuToggle.innerHTML = '☰';
            menuToggle.setAttribute('aria-label', 'Toggle menu');
            
            // Insert after logo
            logo.insertAdjacentElement('afterend', menuToggle);
            
            // Toggle menu
            menuToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                nav.classList.toggle('active');
                menuToggle.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
            });
            
            // Close menu when clicking links
            nav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function() {
                    nav.classList.remove('active');
                    if (menuToggle) menuToggle.innerHTML = '☰';
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
    }

    // Set active navigation based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});