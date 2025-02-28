import confetti, { Shape } from 'canvas-confetti';

const clickQueue: boolean[] = [];
let isConfettiRunning = false;

export const handleConfettiClick = () => {
    clickQueue.push(true);
    if (!isConfettiRunning) {
        triggerConfettiQueue();
    }
};

const triggerConfettiQueue = () => {
    if (clickQueue.length > 0) {
        isConfettiRunning = true;
        clickQueue.shift();

        const confettiCount = 10;
        const colors = [
            '#bb0000', '#ffffff', '#00bb00', '#0000bb', '#ffdd00',
            '#ff00ff', '#00ffff', '#ff6600', '#6600ff', '#33cc33'
        ];

        const defaults = {
            origin: { y: -0.3 },
            gravity: 1.1,
            spread: 200,
            scalar: 1.2,
            colors: colors,
            shapes: ['square', 'circle', 'triangle', 'star', 'polygon'] as Shape[]
        };

        for (let i = 0; i < confettiCount; i++) {
            confetti({
                ...defaults,
                origin: {
                    x: Math.random(),
                    y: 0
                },
                ticks: 1000,
                scalar: Math.random() * 1.5 + 0.5
            });
        }

        setTimeout(() => {
            triggerConfettiQueue();
        }, 1000);
    } else {
        isConfettiRunning = false;
    }
};