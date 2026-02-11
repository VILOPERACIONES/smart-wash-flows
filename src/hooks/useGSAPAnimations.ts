import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseGSAPAnimationsOptions {
  /** Refs for the initial timeline animation (Header → Hero → Promotions → Services) */
  timelineRefs: React.RefObject<HTMLDivElement | null>[];
  /** Refs for scroll-triggered animations (Facilities onward) */
  scrollRefs: React.RefObject<HTMLDivElement | null>[];
}

export function useGSAPAnimations({ timelineRefs, scrollRefs }: UseGSAPAnimationsOptions) {
  const ctx = useRef<gsap.Context | null>(null);

  useEffect(() => {
    ctx.current = gsap.context(() => {
      // 1️⃣ Initial page load timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });

      timelineRefs.forEach((ref, i) => {
        if (ref.current) {
          gsap.set(ref.current, { opacity: 0, y: 40 });
          tl.to(ref.current, { opacity: 1, y: 0 }, i * 0.4);
        }
      });

      // 2️⃣ Scroll-triggered animations
      scrollRefs.forEach((ref) => {
        if (ref.current) {
          gsap.set(ref.current, { opacity: 0, y: 40 });
          gsap.to(ref.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%",
              toggleActions: "play none none none",
              once: true,
            },
          });
        }
      });
    });

    return () => {
      ctx.current?.revert();
    };
  }, []);
}
