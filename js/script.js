document.addEventListener('DOMContentLoaded', function() {
    // ===== TYPING ANIMATION =====
    const typingSpan = document.querySelector('.typing-text span');
    
    if (typingSpan) {
        // Responsive cursor positions based on screen width
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

        // Debounced resize handler
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(updateCursorPosition, 150);
        });

        setInterval(updateCursorPosition, 100);
        updateCursorPosition();
    }

    // ===== MOBILE MENU FUNCTIONALITY =====
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        // Toggle menu on button click
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            nav.classList.toggle('active');
            
            // Update button icon
            if (nav.classList.contains('active')) {
                menuToggle.innerHTML = '✕';
                menuToggle.setAttribute('aria-label', 'Close menu');
                // Prevent body scroll when menu is open
                document.body.style.overflow = 'hidden';
            } else {
                menuToggle.innerHTML = '☰';
                menuToggle.setAttribute('aria-label', 'Open menu');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking a link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                menuToggle.innerHTML = '☰';
                menuToggle.setAttribute('aria-label', 'Open menu');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.innerHTML = '☰';
                menuToggle.setAttribute('aria-label', 'Open menu');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.innerHTML = '☰';
                menuToggle.setAttribute('aria-label', 'Open menu');
                document.body.style.overflow = '';
            }
        });
    }

    // ===== SET ACTIVE NAVIGATION LINK =====
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // ===== TOUCH DEVICE DETECTION =====
    const isTouchDevice = ('ontouchstart' in window) || 
                         (navigator.maxTouchPoints > 0) || 
                         (navigator.msMaxTouchPoints > 0);

    if (isTouchDevice) {
        document.body.classList.add('touch-device');
    }
});