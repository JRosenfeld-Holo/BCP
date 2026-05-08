import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    const smoothScroller = new Lenis();
    smoothScroller.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
        smoothScroller.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const panelElements = document.querySelectorAll(".layered-panels .panel-item");
    const totalPanels = panelElements.length;
    const panelSegment = 1 / totalPanels;

    const panelYOffset = 5;
    const panelScaleStep = 0.075;

    panelElements.forEach((panel, idx) => {
        gsap.set(panel, {
            xPercent: -50,
            yPercent: -50 + idx * panelYOffset,
            scale: 1 - idx * panelScaleStep,
        });
    });

    ScrollTrigger.create({
        trigger: ".layered-panels",
        start: "top top",
        end: `+=${window.innerHeight * 8}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
            const scrollProgress = self.progress;

            const activePanelIndex = Math.min(Math.floor(scrollProgress / panelSegment), totalPanels - 1);
            const segmentProgress = (scrollProgress - activePanelIndex * panelSegment) / panelSegment;

            panelElements.forEach((panel, idx) => {
                if (idx < activePanelIndex) {
                    gsap.set(panel, {
                        yPercent: -250,
                        rotationX: 35,
                    });
                } else if (idx === activePanelIndex) {
                    gsap.set(panel, {
                        yPercent: gsap.utils.interpolate(-50, -200, segmentProgress),
                        rotationX: gsap.utils.interpolate(0, 35, segmentProgress),
                        scale: 1,
                    });
                } else {
                    const offsetIndex = idx - activePanelIndex;
                    const currentPanelYOffset = (offsetIndex - segmentProgress) * panelYOffset;
                    const currentPanelScale = 1 - (offsetIndex - segmentProgress) * panelScaleStep;

                    gsap.set(panel, {
                        yPercent: -50 + currentPanelYOffset,
                        rotationX: 0,
                        scale: currentPanelScale,
                    });
                }
            });
        },
    });
});