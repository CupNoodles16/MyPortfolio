

document.addEventListener('DOMContentLoaded', function() {
    initCertifications();
    initImageViewer();
});


function initCertifications() {
    
}

/**
 * @param {string} sectionId 
 */

function toggleSection(sectionId) {
    const grid = document.getElementById(sectionId);
    const icon = document.getElementById(`icon-${sectionId}`);
    const header = icon.closest('.section-header');
    
    if (!grid || !icon) return;

    grid.classList.toggle('open');

    icon.classList.toggle('rotated');

    if (header) {
        header.classList.toggle('active');
    }
}

function initImageViewer() {
    const certLinks = document.querySelectorAll('.cert-image a');
    
    certLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); 
            
            const imgSrc = this.getAttribute('href');
            const imgTitle = this.getAttribute('data-title') || 'Certificate';
            
            showImagePopup(imgSrc, imgTitle);
        });
    });
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
    
    document.body.style.overflow = 'hidden';

    setTimeout(() => overlay.classList.add('active'), 10);
    
    function closePopup() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
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

window.toggleSection = toggleSection;