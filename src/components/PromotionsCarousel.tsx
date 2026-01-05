import { useEffect, useCallback, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface ImageData {
  url: string;
  nombre: string;
  tamaño: string;
  dimensiones: string;
}

interface Promotion {
  id: string;
  name: string;
  image?: string;
  imagenes?: {
    desktop: ImageData | null;
    mobile: ImageData | null;
  };
  active: boolean;
  createdAt: string;
}

const PromotionsCarousel = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Load promotions from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('admin_promotions');
    if (stored) {
      const allPromotions: Promotion[] = JSON.parse(stored);
      // Only show active promotions
      setPromotions(allPromotions.filter(p => p.active));
    }
  }, []);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center' },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('bg-primary', index === emblaApi.selectedScrollSnap());
      dot.classList.toggle('bg-border', index !== emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  // Helper to get the correct image based on device
  const getImageUrl = (promotion: Promotion): string | null => {
    if (isMobile) {
      // Mobile: prefer mobile image, fallback to desktop, then legacy
      if (promotion.imagenes?.mobile?.url) return promotion.imagenes.mobile.url;
      if (promotion.imagenes?.desktop?.url) return promotion.imagenes.desktop.url;
      if (promotion.image) return promotion.image;
    } else {
      // Desktop: prefer desktop image, fallback to mobile, then legacy
      if (promotion.imagenes?.desktop?.url) return promotion.imagenes.desktop.url;
      if (promotion.imagenes?.mobile?.url) return promotion.imagenes.mobile.url;
      if (promotion.image) return promotion.image;
    }
    return null;
  };

  // Don't render if no active promotions
  if (promotions.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-background py-10 md:py-[60px]">
      <div className="max-w-[1200px] mx-auto px-4 relative">
        <div className="overflow-hidden rounded-xl" ref={emblaRef}>
          <div className="flex gap-5">
            {promotions.map((promo) => {
              const imageUrl = getImageUrl(promo);
              
              return (
                <div
                  key={promo.id}
                  className="flex-[0_0_100%] min-w-0"
                >
                  {imageUrl ? (
                    <div className="aspect-[4/3] md:aspect-video rounded-xl shadow-lg overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={promo.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/3] md:aspect-video bg-border rounded-xl shadow-lg flex items-center justify-center transition-transform duration-300">
                      <span className="text-muted-foreground text-xl md:text-2xl font-heading font-bold">
                        {promo.name}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Arrows - Electric Blue */}
        <Button
          variant="ghost"
          size="icon"
          onClick={scrollPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:translate-x-0 z-10 bg-background/80 hover:bg-background text-primary hover:text-primary rounded-full shadow-md h-10 w-10 md:h-12 md:w-12"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={scrollNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-0 z-10 bg-background/80 hover:bg-background text-primary hover:text-primary rounded-full shadow-md h-10 w-10 md:h-12 md:w-12"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Dots Indicators - Electric Blue active, gray inactive */}
        <div className="flex justify-center gap-2 mt-6">
          {promotions.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`carousel-dot w-3 h-3 rounded-full transition-colors duration-300 ${
                index === 0 ? 'bg-primary' : 'bg-border'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionsCarousel;
