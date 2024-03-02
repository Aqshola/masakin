import gsap from "gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
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
      duration: 0.8,
    });
  }
};

export const animatePageOut = (href: string, router: AppRouterInstance) => {
  const animationWrapper = document.getElementById("transition-element");

  if (animationWrapper) {
    const tl = gsap.timeline();

    tl.to(animationWrapper, {
      xPercent: 100,
      duration: 0.8,
      onComplete: () => {
        router.push(href);
      },
    });
  }
};

export const animateToastIn = () => {
  const transitionElement = document.getElementsByClassName("toast");
  if (transitionElement) {
    const tl = gsap.timeline();
    tl.set(transitionElement, {
      y: -100,
    }).to(transitionElement, {
      y: 0,
      duration: 0.8,
    });
  }
};

export const animateToastOut = (callback?: (param?: any) => void) => {
  const transitionElement = document.getElementsByClassName("toast");
  if (transitionElement) {
    const tl = gsap.timeline();
    tl.to(transitionElement, {
      x: 100,
      opacity: 0,
      duration: 0.8,
      onComplete: () => {
        if (callback) {
          callback();
        }
      },
    });
  }
};
