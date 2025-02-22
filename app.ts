// Función para el carrusel de imágenes
class Carousel {
    private images: string[] = [
        'img/carrusel1.png',
        'img/carrusel2.png',
        'img/carrusel3.png'
        // Agrega aquí más imágenes según necesites
    ];
    private currentIndex: number = 0;
    private element: HTMLElement;
    private currentImage: HTMLImageElement | null;

    constructor(elementId: string) {
        this.element = document.getElementById(elementId)!;
        this.currentImage = this.element.querySelector('img');
        this.initCarousel();
        this.setupButtons();
    }

    private initCarousel(): void {
        // Autoplay cada 5 segundos
        setInterval(() => this.nextImage(), 5000);
    }

    private setupButtons(): void {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => this.prevImage());
            nextBtn.addEventListener('click', () => this.nextImage());
        }
    }

    private nextImage(): void {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateImage();
    }

    private prevImage(): void {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateImage();
    }

    private updateImage(): void {
        if (this.currentImage) {
            this.currentImage.style.opacity = '0';
            setTimeout(() => {
                if (this.currentImage) {
                    this.currentImage.src = this.images[this.currentIndex];
                    this.currentImage.style.opacity = '1';
                }
            }, 500);
        }
    }
}

// Inicializar el carrusel cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new Carousel('carousel');
});
