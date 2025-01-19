import confetti from 'canvas-confetti';

const clickQueue = [];   // Queue to hold click events
let isConfettiRunning = false; // Flag to check if confetti is currently running

export const handleConfettiClick = () => {
    // Add a new click event to the queue
    clickQueue.push(true);

    // If confetti is already running, don't start a new cycle
    if (!isConfettiRunning) {
        triggerConfettiQueue();  // Process the queue
    }
};

const triggerConfettiQueue = () => {
    if (clickQueue.length > 0) {
        // Set confetti running flag
        isConfettiRunning = true;

        // Remove the first item from the queue (simulate a click being handled)
        clickQueue.shift();

        const confettiCount = 10; // Increase confetti particles for more visual effect
        const colors = [
            '#bb0000', '#ffffff', '#00bb00', '#0000bb', '#ffdd00',
            '#ff00ff', '#00ffff', '#ff6600', '#6600ff', '#33cc33'
        ]; // Added more custom colors

        // Use multiple bursts to cover the entire top width
        const defaults = {
            origin: { y: -3 },      // Start at the top of the page
            gravity: 1.1,          // Slightly lower gravity for slower fall
            spread: 200,            // Slightly wider spread for better coverage
            scalar: 1.2,           // Increase scaling factor for larger particles
            colors: colors,        // Use extended colors array
            shapes: ['square', 'circle', 'triangle', 'star', 'polygon'] // New shapes for the confetti particles
        };

        // Emit particles across the top width of the page
        for (let i = 0; i < confettiCount; i++) {
            confetti({
                ...defaults,
                origin: {
                    x: Math.random(),      // Randomize horizontal position (across the width of the screen)
                    y: 0                   // Start from the top (y = 0)
                },          // Emit particles one by one
                ticks: 1000,                 // Increase particle lifespan to make them visible longer
                scalar: Math.random() * 1.5 + 0.5 // Randomize size between 0.5x to 2x for variety
            });
        }

        // Set a timeout for 1 second before processing the next item in the queue
        setTimeout(() => {
            triggerConfettiQueue(); // Trigger the next confetti burst in queue
        }, 1000);
    } else {
        // Reset the flag once the queue is empty
        isConfettiRunning = false;
    }
};