import gsap from "gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { RefObject } from "react";
export const animatePageIn = () => {
  const transitionElement = document.getElementById("transition-element");

  if (transitionElement) {
    const tl = gsap.timeline();

    tl.set(transitionElement, {
      xPercent: -100,
      opacity: 0,
    }).to(transitionElement, {
      xPercent: 0,
      opacity: 1,
      duration: 0.5,
    });
  }
};

export const animatePageOut = (href: string, router: AppRouterInstance) => {
  const animationWrapper = document.getElementById("transition-element");

  if (animationWrapper) {
    const tl = gsap.timeline();

    tl.to(animationWrapper, {
      xPercent: 100,
      duration: 0.5,
      onComplete: () => {
        router.push(href);
      },
    });
  }
};

export const animateToastIn = (toast:RefObject<HTMLDivElement>) => {
  
  if (toast) {
    const tl = gsap.timeline();
    tl.to(toast.current, {
      x: 0,
      duration: 0.5,
    });
  }
};

export const animateToastOut = (toast:RefObject<HTMLDivElement>,callback?: (param?: any) => void) => {
  
  if (toast) {
    const tl = gsap.timeline();
    tl.to(toast.current, {
      x: "100%",
      duration: 0.5,
      onComplete: () => {
        if (callback) {
          callback();
        }
      },
    });
  }
};
