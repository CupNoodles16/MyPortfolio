
document.addEventListener('DOMContentLoaded', function() {
    initEducationImageViewer();
});

function initEducationImageViewer() {

    const universityLinks = document.querySelectorAll('.university-images a');
    const courseLinks = document.querySelectorAll('.course-image a');
    
    const allImageLinks = [...universityLinks, ...courseLinks];
    
    if (allImageLinks.length === 0) {
        console.log('No images found on education page');
        return;
    }
    
    allImageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); 
            
            const imgSrc = this.getAttribute('href');
            const imgTitle = this.getAttribute('data-title') || 'Education Image';
            
            showImagePopup(imgSrc, imgTitle);
        });
    });
    
    console.log('✅ Image viewer initialized for education page');
}


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

    document.body.style.overflow = 'hidden';

    function closePopup() {
        overlay.classList.remove('active');
        document.body.style.overflow = ''; 
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.remove();
            }
        }, 300);
    }

    closeBtn.addEventListener('click', closePopup);
    
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closePopup();
        }
    });

    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closePopup();
            document.removeEventListener('keydown', escHandler);
        }
    });
}