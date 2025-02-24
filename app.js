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
