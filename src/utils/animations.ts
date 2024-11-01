import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface AnimationProps {
    [key: string]: any;
}

interface ScrollProps {
    [key: string]: any;
}

export const animateWithGSAP = (target: gsap.DOMTarget, animationProps: AnimationProps, scrollProps?: ScrollProps) => {
    gsap.to(target, {
        ...animationProps,
        scrollTrigger:{
            trigger: target,
            toggleActions: 'restart reverse restart reverse',
            start: 'top 85%',
            ...scrollProps,
        }
    });
}


export const animateWithGSAPTimeline = (
    timeline: TimelineMax,
    rotationRef: React.RefObject<{ rotation: { y: number } }>,
    rotationState: number,
    firstTarget: any,
    secondTarget: any,
    animationProps: any
) => {
    timeline.to(rotationRef.current.rotation, {
        y: rotationState,
        duration: 1,
        ease: 'power2.inOut'
    })

    timeline.to(firstTarget, {
        ...animationProps,
        ease: 'power2.inOut'
    }, '<');
    
    timeline.to(secondTarget, {
        ...animationProps,
        ease: 'power2.inOut'
    }, '<');
    
}