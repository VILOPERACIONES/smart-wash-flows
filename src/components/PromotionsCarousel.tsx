import { useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

const promotions = [
  { id: 1, title: 'Promoción 1' },
  { id: 2, title: 'Promoción 2' },
  { id: 3, title: 'Promoción 3' },
];

const PromotionsCarousel = () => {
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

  return (
    <section className="w-full bg-background py-10 md:py-[60px]">
      <div className="max-w-[1200px] mx-auto px-4 relative">
        <div className="overflow-hidden rounded-xl" ref={emblaRef}>
          <div className="flex gap-5">
            {promotions.map((promo) => (
              <div
                key={promo.id}
                className="flex-[0_0_100%] min-w-0"
              >
                <div className="aspect-[4/3] md:aspect-video bg-border rounded-xl shadow-lg flex items-center justify-center transition-transform duration-300">
                  <span className="text-muted-foreground text-xl md:text-2xl font-heading font-bold">
                    {promo.title}
                  </span>
                </div>
              </div>
            ))}
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