document.addEventListener('DOMContentLoaded', () => {
    // Código del menú hamburguesa
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Cerrar el menú al hacer clic en un enlace
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = 'auto';
            });
        });
    }

    // Código del carrusel (solo se ejecuta si existe el elemento)
    const track = document.querySelector('.carousel-track');
    if (track) {
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
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', prevSlide);
            nextBtn.addEventListener('click', nextSlide);
        }

        // Mostrar primera imagen y comenzar autoplay
        showSlide(currentIndex);
        setInterval(nextSlide, 5000);
    }

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

    // Añadir funcionalidad de scroll suave para la flecha
    document.querySelector('.scroll-arrow').addEventListener('click', function() {
        const statsSection = document.querySelector('.stats');
        statsSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Mejoras para el carrusel
    const carousel = document.querySelector('.carousel');
    let isMouseOver = false;

    carousel.addEventListener('mouseenter', () => {
        isMouseOver = true;
    });

    carousel.addEventListener('mouseleave', () => {
        isMouseOver = false;
    });

    // Pausar el autoplay cuando el mouse está sobre el carrusel
    setInterval(() => {
        if (!isMouseOver) {
            nextSlide();
        }
    }, 5000);

    // Control del carrusel con el teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Efecto parallax suave para la sección Sobre Nosotros
    const aboutSection = document.querySelector('.about-section');
    const missionText = document.querySelector('.mission');
    const mottoDesc = document.querySelector('.motto-description');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const aboutRect = aboutSection.getBoundingClientRect();
        
        if (aboutRect.top < window.innerHeight && aboutRect.bottom > 0) {
            const factor = (window.innerHeight - aboutRect.top) / window.innerHeight;
            missionText.style.transform = `translateY(${factor * 20}px)`;
            mottoDesc.style.transform = `translateY(${factor * 10}px)`;
        }
    });

    // Efecto de revelación progresiva del texto
    const mission = document.querySelector('.mission');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    mission.style.opacity = '0';
    mission.style.transform = 'translateY(20px)';
    mission.style.transition = 'all 0.8s ease';
    observer.observe(mission);

    // Interactividad para el cartel promocional
    const promoImage = document.querySelector('.promo-image');
    if (promoImage) {
        // Efecto de brillo al mover el ratón
        promoImage.addEventListener('mousemove', (e) => {
            const rect = promoImage.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Crear efecto de brillo que sigue al cursor
            promoImage.style.background = `
                radial-gradient(circle at ${x}px ${y}px, 
                rgba(255,255,255,0.2) 0%, 
                rgba(255,255,255,0) 50%)
            `;
        });

        // Resetear el efecto al salir
        promoImage.addEventListener('mouseleave', () => {
            promoImage.style.background = 'none';
        });

        // Click para abrir en tamaño completo
        promoImage.addEventListener('click', () => {
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0,0,0,0.9)';
            overlay.style.display = 'flex';
            overlay.style.justifyContent = 'center';
            overlay.style.alignItems = 'center';
            overlay.style.zIndex = '9999';
            overlay.style.cursor = 'pointer';
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.3s ease';

            const img = document.createElement('img');
            img.src = promoImage.src;
            img.style.maxWidth = '90%';
            img.style.maxHeight = '90vh';
            img.style.objectFit = 'contain';
            img.style.transform = 'scale(0.9)';
            img.style.transition = 'transform 0.3s ease';

            overlay.appendChild(img);
            document.body.appendChild(overlay);

            // Animar entrada
            requestAnimationFrame(() => {
                overlay.style.opacity = '1';
                img.style.transform = 'scale(1)';
            });

            // Cerrar al hacer click
            overlay.addEventListener('click', () => {
                overlay.style.opacity = '0';
                img.style.transform = 'scale(0.9)';
                setTimeout(() => overlay.remove(), 300);
            });
        });
    }
});
