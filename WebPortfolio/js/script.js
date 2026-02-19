document.addEventListener('DOMContentLoaded', function() {
    const typingSpan = document.querySelector('.typing-text span');
    if (!typingSpan) return;
    
    
    const cursorPositions = {
        'Software Developer': '360px',      
        'IT Support Specialist': '370px',     
        'Developer': '190px'                 
    };
    
   
    function updateCursorPosition() {
        const beforeStyle = window.getComputedStyle(typingSpan, '::before');
        const content = beforeStyle.content;
        
        let text = content.replace(/['"]/g, '');
        
        if (text.includes('Software Developer')) {
            typingSpan.style.setProperty('--cursor-pos', cursorPositions['Software Developer']);
        } else if (text.includes('IT Support Specialist')) {
            typingSpan.style.setProperty('--cursor-pos', cursorPositions['IT Support Specialist']);
        } else if (text.includes('Developer')) {
            typingSpan.style.setProperty('--cursor-pos', cursorPositions['Developer']);
        }
    }
    
    setInterval(updateCursorPosition, 100);
});