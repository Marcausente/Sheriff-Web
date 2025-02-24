document.addEventListener('DOMContentLoaded', () => {
    const images = [
        'img/oficina.png',
        'img/carcel.png',
        'img/atril.png',
        'img/barco.png',
        'img/caninos.png',
        'img/oficina2.png',
        'img/entrenamiento.png',
        'img/carcel2.png'
    ];

    const track = document.querySelector('.carousel-track');
    let currentIndex = 0;

    // Crear slides
    images.forEach(imageSrc => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.style.backgroundImage = `url(${imageSrc})`;
        track.appendChild(slide);
    });

    const slides = document.querySelectorAll('.carousel-slide');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    // Configurar botones
    document.getElementById('prevBtn').addEventListener('click', prevSlide);
    document.getElementById('nextBtn').addEventListener('click', nextSlide);

    // Mostrar primera imagen y comenzar autoplay
    showSlide(currentIndex);
    setInterval(nextSlide, 5000);
});

// Interactividad mejorada para las cards de información
document.querySelectorAll('.info-card').forEach(card => {
    // Efecto de hover 3D
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });

    // Animación de entrada para los elementos de la lista
    const listItems = card.querySelectorAll('ul li');
    listItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 100 * (index + 1));

        // Efecto de hover individual para cada elemento
        item.addEventListener('mouseenter', () => {
            // Crear y añadir el tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = item.getAttribute('data-description') || 'Requisito importante';
            tooltip.style.position = 'absolute';
            tooltip.style.background = 'rgba(26, 71, 42, 0.9)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '0.5rem 1rem';
            tooltip.style.borderRadius = '4px';
            tooltip.style.fontSize = '0.9rem';
            tooltip.style.zIndex = '1000';
            tooltip.style.opacity = '0';
            tooltip.style.transition = 'opacity 0.3s ease';
            
            document.body.appendChild(tooltip);
            
            // Posicionar el tooltip
            const rect = item.getBoundingClientRect();
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
            tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
            
            // Mostrar el tooltip
            setTimeout(() => tooltip.style.opacity = '1', 50);
            
            item.addEventListener('mouseleave', () => {
                tooltip.remove();
            });
        });
    });
});

// Efecto de conteo para números en los requisitos
document.querySelectorAll('.info-card ul li').forEach((item, index) => {
    const number = document.createElement('span');
    number.className = 'requirement-number';
    number.textContent = `${index + 1}. `;
    number.style.color = 'var(--dark-green)';
    number.style.fontWeight = 'bold';
    number.style.marginRight = '0.5rem';
    item.prepend(number);
});
