document.addEventListener('DOMContentLoaded', function() {
    const imageLinks = document.querySelectorAll('.project-image-grid a');
    
    imageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); 
            
            const imgSrc = this.getAttribute('href');
            const imgTitle = this.getAttribute('data-title') || 'Preview';
            
            showImagePopup(imgSrc, imgTitle);
        });
    });
});

function showImagePopup(src, title) {
    const overlay = document.createElement('div');
    overlay.className = 'simple-overlay';
    
    const popup = document.createElement('div');
    popup.className = 'simple-popup';
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'simple-close';
    closeBtn.innerHTML = '&times;'; 
    
    const img = document.createElement('img');
    img.src = src;
    img.alt = title;
    
    const caption = document.createElement('div');
    caption.className = 'simple-caption';
    caption.textContent = title;
    
    popup.appendChild(closeBtn);
    popup.appendChild(img);
    popup.appendChild(caption);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    
    setTimeout(() => overlay.classList.add('active'), 10);
    
    function closePopup() {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300);
    }
    
    closeBtn.addEventListener('click', closePopup);
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closePopup();
    });

    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closePopup();
            document.removeEventListener('keydown', escHandler);
        }
    });
}