import { TimelineMax } from 'gsap'; // Ensure you have gsap installed

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