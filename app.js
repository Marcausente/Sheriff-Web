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

    // Funcionalidad del lightbox para la galería
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');

    // Añadir delay de animación a cada item
    galleryItems.forEach((item, index) => {
        item.style.setProperty('--i', index + 1);
    });

    // Abrir lightbox
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Cerrar lightbox
    function closeLightboxFunction() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    closeLightbox.addEventListener('click', closeLightboxFunction);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightboxFunction();
        }
    });

    // Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightboxFunction();
        }
    });

    // Funcionalidad específica para la página de Rangers
    const rangerItems = document.querySelectorAll('.ranger-description li');
    
    // Añadir delay de animación a cada item
    rangerItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });

    // Efecto de hover mejorado para los items
    rangerItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Crear y añadir el icono
            const icon = document.createElement('span');
            icon.textContent = '→';
            icon.style.position = 'absolute';
            icon.style.left = '-20px';
            icon.style.opacity = '0';
            icon.style.transition = 'all 0.3s ease';
            
            item.appendChild(icon);
            
            setTimeout(() => {
                icon.style.left = '0';
                icon.style.opacity = '1';
            }, 50);
        });

        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('span');
            if (icon) {
                icon.remove();
            }
        });
    });

    // Funcionalidad para la página de comisarías
    document.addEventListener('DOMContentLoaded', function() {
        // Verificar si estamos en la página de comisarías
        const stationsSection = document.querySelector('.stations-section');
        if (!stationsSection) return;
        
        // Datos adicionales para cada comisaría
        const stationData = {
            'señora': {
                features: [
                    'Centro de operaciones principal',
                    'Unidad de investigaciones especiales',
                    'Centro de comunicaciones',
                    'Sala de conferencias de prensa',
                    'Helipuerto',
                    'Garaje para vehículos especializados',
                    'Armería central'
                ]
            },
            'sandy': {
                features: [
                    'Unidad de respuesta táctica',
                    'Centro de coordinación rural',
                    'Unidad de búsqueda y rescate',
                    'Patrulla de carreteras',
                    'Garaje para vehículos todoterreno',
                    'Sala de entrenamiento'
                ]
            },
            'paleto': {
                features: [
                    'Unidad marítima',
                    'Patrulla costera',
                    'Centro de monitoreo ambiental',
                    'Unidad de respuesta a emergencias',
                    'Muelle para embarcaciones',
                    'Torre de vigilancia'
                ]
            },
            'marina': {
                features: [
                    'Unidad de seguridad turística',
                    'Patrulla de playas',
                    'Centro de atención al ciudadano',
                    'Unidad de tráfico',
                    'Sala de monitoreo de cámaras',
                    'Centro de formación comunitaria'
                ]
            },
            'beaver': {
                features: [
                    'Centro de conservación ambiental',
                    'Unidad de prevención de incendios',
                    'Centro de rescate de fauna',
                    'Patrulla de senderos',
                    'Estación meteorológica',
                    'Centro de información para visitantes'
                ]
            },
            'paletoforest': {
                features: [
                    'Unidad de rastreo',
                    'Centro de primeros auxilios',
                    'Patrulla forestal',
                    'Punto de control de cazadores',
                    'Torre de vigilancia de incendios',
                    'Albergue de emergencia'
                ]
            },
            'bolingbroke': {
                features: [
                    'Celdas de máxima seguridad',
                    'Centro de rehabilitación',
                    'Unidad médica',
                    'Torres de vigilancia',
                    'Perímetro de seguridad avanzado',
                    'Centro de formación correccional',
                    'Unidad canina especializada'
                ]
            }
        };

        // Obtener elementos del DOM
        const stationCards = document.querySelectorAll('.station-card');
        const modal = document.getElementById('stationModal');
        const closeModal = document.querySelector('.close-modal');
        const modalImage = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        const modalDetails = document.getElementById('modalDetails');
        const modalFeatures = document.getElementById('modalFeatures');

        // Función para abrir el modal con la información de la estación
        function openStationModal(station) {
            const location = station.getAttribute('data-location');
            const image = station.querySelector('img').src;
            const title = station.querySelector('h2').textContent;
            const description = station.querySelector('.station-description').textContent;
            const details = station.querySelector('.station-details').innerHTML;
            
            // Llenar el modal con la información
            modalImage.src = image;
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            modalDetails.innerHTML = details;
            
            // Limpiar y llenar las características
            modalFeatures.innerHTML = '';
            if (stationData[location]) {
                stationData[location].features.forEach(feature => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    modalFeatures.appendChild(li);
                });
            }
            
            // Mostrar el modal con animación
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Animar la entrada de las características
            setTimeout(() => {
                const featureItems = modalFeatures.querySelectorAll('li');
                featureItems.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-20px)';
                    
                    setTimeout(() => {
                        item.style.transition = 'all 0.3s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, 100 * (index + 1));
                });
            }, 300);
        }

        // Función para cerrar el modal
        function closeStationModal() {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Añadir event listeners
        stationCards.forEach(card => {
            card.addEventListener('click', () => {
                openStationModal(card);
            });
        });

        closeModal.addEventListener('click', closeStationModal);

        // Cerrar el modal al hacer clic fuera del contenido
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeStationModal();
            }
        });

        // Cerrar el modal con la tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeStationModal();
            }
        });

        // Efecto de parallax en las imágenes de las estaciones
        window.addEventListener('scroll', () => {
            stationCards.forEach(card => {
                const cardRect = card.getBoundingClientRect();
                const cardImage = card.querySelector('img');
                
                if (cardRect.top < window.innerHeight && cardRect.bottom > 0) {
                    const scrollPosition = window.scrollY;
                    const cardTop = card.offsetTop;
                    const scrollValue = (scrollPosition - cardTop) * 0.1;
                    
                    cardImage.style.transform = `translateY(${scrollValue}px)`;
                }
            });
        });

        // Animación de entrada para las tarjetas
        function animateStationCards() {
            stationCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100 * index);
            });
        }

        // Observador de intersección para animar las tarjetas cuando son visibles
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStationCards();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        // Observar la sección de estaciones
        observer.observe(stationsSection);

        // Efecto de hover 3D para las tarjetas
        stationCards.forEach(card => {
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
        });

        // Efecto de brillo al pasar el ratón sobre las tarjetas
        stationCards.forEach(card => {
            const overlay = card.querySelector('.station-overlay');
            
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                overlay.style.background = `
                    radial-gradient(circle at ${x}px ${y}px, 
                    rgba(26, 71, 42, 0.4) 0%, 
                    rgba(26, 71, 42, 0.8) 70%)
                `;
            });
            
            card.addEventListener('mouseleave', () => {
                overlay.style.background = 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(26, 71, 42, 0.8) 100%)';
            });
        });
    });

    // Código para la página de agentes
    document.addEventListener('DOMContentLoaded', function() {
        // Verificar si estamos en la página de agentes
        const agentsSection = document.querySelector('.agents-section');
        if (!agentsSection) return;
        
        // Efecto de hover 3D para las tarjetas
        document.querySelectorAll('.agent-card').forEach(card => {
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
        });
    });

    // Código específico para la página de rangos
    document.addEventListener('DOMContentLoaded', function() {
        // Verificar si estamos en la página de rangos
        const ranksSection = document.querySelector('.ranks-section');
        if (!ranksSection) return;
        
        // Efecto de hover 3D para las tarjetas de rango
        function add3DHoverEffect() {
            const rankItems = document.querySelectorAll('.rank-item');
            
            rankItems.forEach(item => {
                item.addEventListener('mousemove', (e) => {
                    const rect = item.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = (y - centerY) / 20;
                    const rotateY = (centerX - x) / 20;
                    
                    item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
                });
                
                item.addEventListener('mouseleave', () => {
                    item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
                });
            });
        }

        // Efecto de brillo para las insignias
        function addBadgeShineEffect() {
            const badges = document.querySelectorAll('.rank-badge');
            
            badges.forEach(badge => {
                badge.addEventListener('mousemove', (e) => {
                    const rect = badge.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    badge.style.background = `
                        radial-gradient(circle at ${x}px ${y}px, 
                        rgba(255,255,255,0.8) 0%, 
                        rgba(255,255,255,0.1) 30%,
                        rgba(255,255,255,0) 70%)
                    `;
                });
                
                badge.addEventListener('mouseleave', () => {
                    badge.style.background = 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)';
                });
            });
        }

        // Añadir clase de resaltado al hacer clic en un rango
        function addHighlightEffect() {
            const rankItems = document.querySelectorAll('.rank-item');
            
            rankItems.forEach(item => {
                item.addEventListener('click', () => {
                    // Eliminar resaltado de todos los elementos
                    rankItems.forEach(i => i.classList.remove('highlight'));
                    
                    // Añadir resaltado al elemento actual
                    item.classList.add('highlight');
                    
                    // Eliminar resaltado después de un tiempo
                    setTimeout(() => {
                        item.classList.remove('highlight');
                    }, 2000);
                });
            });
        }

        // Inicializar efectos interactivos
        add3DHoverEffect();
        addBadgeShineEffect();
        addHighlightEffect();
        
        // Animación de entrada para las categorías
        const rankCategories = document.querySelectorAll('.rank-category');
        rankCategories.forEach((category, index) => {
            setTimeout(() => {
                category.style.opacity = '1';
                category.style.transform = 'translateY(0)';
            }, 200 * index);
        });
        
        // Animación de entrada para los elementos de rango
        const rankItems = document.querySelectorAll('.rank-item');
        rankItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    });

    // Código específico para la página de detalle de Beaver Bush
    document.addEventListener('DOMContentLoaded', function() {
        // Verificar si estamos en la página de detalle de Beaver Bush
        const stationAreas = document.querySelector('.station-areas');
        if (!stationAreas) return;
        
        // Efectos visuales para las tarjetas de área
        function addAreaCardEffects() {
            const areaCards = document.querySelectorAll('.area-card');
            areaCards.forEach(card => {
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
            });
        }

        // Efecto de parallax para el mapa
        function addMapParallaxEffect() {
            const mapContainer = document.querySelector('.map-container');
            const locationImage = document.querySelector('.location-image');
            
            mapContainer.addEventListener('mousemove', (e) => {
                const rect = mapContainer.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const moveX = (x - rect.width / 2) / 20;
                const moveY = (y - rect.height / 2) / 20;
                
                locationImage.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
            });
            
            mapContainer.addEventListener('mouseleave', () => {
                locationImage.style.transform = 'translate(0, 0) scale(1)';
            });
        }

        // Animación de entrada para los elementos
        function animateElements() {
            // Animación para la introducción
            const introContent = document.querySelector('.intro-content');
            introContent.style.opacity = '0';
            introContent.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                introContent.style.transition = 'all 0.8s ease';
                introContent.style.opacity = '1';
                introContent.style.transform = 'translateY(0)';
            }, 300);
            
            // Animación para el mapa
            const mapContainer = document.querySelector('.map-container');
            mapContainer.style.opacity = '0';
            mapContainer.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                mapContainer.style.transition = 'all 0.8s ease';
                mapContainer.style.opacity = '1';
                mapContainer.style.transform = 'translateY(0)';
            }, 600);
            
            // Animación para las tarjetas de área
            const areaCards = document.querySelectorAll('.area-card');
            areaCards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.8s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 900 + (index * 200));
            });
            
            // Animación para los servicios
            const serviceItems = document.querySelectorAll('.service-item');
            serviceItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    item.style.transition = 'all 0.8s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 1500 + (index * 150));
            });
        }

        // Inicializar todos los efectos
        addAreaCardEffects();
        addMapParallaxEffect();
        animateElements();
    });

    // Código para la página de divisiones - Versión corregida
    document.addEventListener('DOMContentLoaded', function() {
        // Solo aplicar este código si estamos en la página de divisiones
        if (document.querySelector('.divisions-section')) {
            const divisionCards = document.querySelectorAll('.division-card');
            
            divisionCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-5px)';
                    this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                });
            });
        }
    });
});
 