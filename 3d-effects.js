/** ============================================
 * MOSSAIC NOTES - Humanized 3D Effects
 * Organic, Breathing, Natural Animations
 * ============================================ */

class Humanized3DEffects {
    constructor() {
        this.tiltElements = [];
        this.breathingElements = [];
        this.springs = [];
        this.mouseVelocity = { x: 0, y: 0 };
        this.lastMousePos = { x: 0, y: 0 };
        this.lastMouseTime = 0;
        this.init();
    }

    init() {
        this.initOrganicTilt();
        this.initBreathing();
        this.initParallax();
        this.trackMouseVelocity();
        this.animateLoop();
    }

    /**
     * Spring physics for natural movement
     */
    springPhysics(current, target, velocity, tension = 0.08, damping = 0.85) {
        const force = (target - current) * tension;
        const newVelocity = (velocity + force) * damping;
        const newPosition = current + newVelocity;
        return { position: newPosition, velocity: newVelocity };
    }

    /**
     * Organic ease function - mimics natural motion
     */
    organicEase(t) {
        // Custom ease that accelerates and decelerates like a living being
        return t < 0.5
            ? 2 * t * t * (1 + Math.sin(t * Math.PI) * 0.1)
            : 1 - Math.pow(-2 * t + 2, 2) / 2 * (1 + Math.sin((t - 0.5) * Math.PI) * 0.1);
    }

    /**
     * Perlin-like noise for organic variation
     */
    noise(x, y = 0) {
        const sin1 = Math.sin(x * 0.5) * 0.5;
        const sin2 = Math.sin(x * 1.3 + y * 0.7) * 0.25;
        const sin3 = Math.sin(x * 2.7 - y * 1.2) * 0.125;
        return sin1 + sin2 + sin3;
    }

    /**
     * Initialize organic 3D tilt with spring physics
     */
    initOrganicTilt() {
        const tiltElements = document.querySelectorAll('[data-tilt]');

        tiltElements.forEach((el, index) => {
            // Random variation for each element
            const randomOffset = Math.random() * 0.4 + 0.8;
            const randomDelay = Math.random() * 2;

            this.tiltElements.push({
                element: el,
                rect: el.getBoundingClientRect(),
                isHovering: false,
                targetRotateX: 0,
                targetRotateY: 0,
                currentRotateX: 0,
                currentRotateY: 0,
                velocityX: 0,
                velocityY: 0,
                randomOffset,
                randomDelay,
                maxTilt: 12 + (Math.random() * 8), // 12-20 degrees
                breathingPhase: Math.random() * Math.PI * 2,
                idling: true
            });

            // Mouse enter with anticipation
            el.addEventListener('mouseenter', (e) => {
                const tiltObj = this.tiltElements.find(t => t.element === el);
                if (tiltObj) {
                    tiltObj.isHovering = true;
                    tiltObj.idling = false;
                    tiltObj.rect = el.getBoundingClientRect();

                    // Anticipation - slight scale up before tilt
                    el.style.transition = 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    el.style.transform = `perspective(1500px) scale(1.02) translateZ(10px)`;

                    setTimeout(() => {
                        el.style.transition = 'transform 0.05s linear';
                    }, 150);
                }
            });

            // Mouse move with velocity tracking
            el.addEventListener('mousemove', (e) => {
                const tiltObj = this.tiltElements.find(t => t.element === el);
                if (tiltObj && tiltObj.isHovering) {
                    this.updateOrganicTilt(e, tiltObj);
                }
            });

            // Mouse leave with spring physics
            el.addEventListener('mouseleave', (e) => {
                const tiltObj = this.tiltElements.find(t => t.element === el);
                if (tiltObj) {
                    tiltObj.isHovering = false;
                    tiltObj.idling = true;
                    tiltObj.targetRotateX = 0;
                    tiltObj.targetRotateY = 0;
                }
            });
        });
    }

    /**
     * Update tilt with organic, velocity-sensitive movement
     */
    updateOrganicTilt(e, tiltObj) {
        const { rect, maxTilt, randomOffset } = tiltObj;

        // Calculate mouse position relative to center
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        // Calculate base rotation
        const rotateY = (mouseX / (rect.width / 2)) * maxTilt;
        const rotateX = -(mouseY / (rect.height / 2)) * maxTilt;

        // Add noise for organic feel
        const time = Date.now() * 0.001;
        const noiseX = this.noise(time + tiltObj.randomDelay) * 2;
        const noiseY = this.noise(time + tiltObj.randomDelay + 100) * 2;

        // Add velocity influence for momentum
        const velocityInfluence = Math.min(Math.abs(this.mouseVelocity.x) * 0.3, 5);
        const velocityBoost = this.mouseVelocity.x > 0 ? velocityInfluence : -velocityInfluence;

        // Set targets (clamped)
        tiltObj.targetRotateY = this.clamp(
            rotateY * randomOffset + velocityBoost + noiseX,
            -maxTilt, maxTilt
        );
        tiltObj.targetRotateX = this.clamp(
            rotateX * randomOffset + noiseY,
            -maxTilt, maxTilt
        );
    }

    /**
     * Initialize breathing/idling animations
     */
    initBreathing() {
        const breathElements = document.querySelectorAll('.book-3d, .notebook-3d');

        breathElements.forEach((el, index) => {
            // Stagger breathing phases
            const phase = (index * 0.5) + Math.random();

            this.breathingElements.push({
                element: el,
                basePhase: phase,
                breathSpeed: 0.0003 + Math.random() * 0.0002, // Slow, natural breathing
                floatSpeed: 0.0005 + Math.random() * 0.0003,
                floatAmplitude: 5 + Math.random() * 5,
                rotationSpeed: 0.0002 + Math.random() * 0.0001,
                rotationAmplitude: 2 + Math.random() * 2
            });
        });
    }

    /**
     * Track mouse velocity for momentum
     */
    trackMouseVelocity() {
        document.addEventListener('mousemove', (e) => {
            const now = Date.now();
            const dt = Math.max(now - this.lastMouseTime, 16); // Minimum 16ms

            this.mouseVelocity.x = (e.clientX - this.lastMousePos.x) / dt * 10;
            this.mouseVelocity.y = (e.clientY - this.lastMousePos.y) / dt * 10;

            this.lastMousePos = { x: e.clientX, y: e.clientY };
            this.lastMouseTime = now;
        });
    }

    /**
     * Initialize parallax with organic easing
     */
    initParallax() {
        const layers = document.querySelectorAll('.parallax-layer');

        this.parallaxLayers = Array.from(layers).map((layer, index) => ({
            element: layer,
            speed: parseFloat(layer.dataset.speed) || 0.5,
            currentY: 0,
            targetY: 0,
            noise: Math.random() * 10
        }));

        window.addEventListener('scroll', () => {
            requestAnimationFrame(() => this.updateParallax());
        }, { passive: true });
    }

    /**
     * Update parallax with organic movement
     */
    updateParallax() {
        const scrollY = window.scrollY;

        this.parallaxLayers.forEach(layer => {
            const targetY = scrollY * layer.speed;
            // Use spring physics for smooth follow
            const spring = this.springPhysics(layer.currentY, targetY, 0, 0.05, 0.9);
            layer.currentY = spring.position;

            // Add subtle noise for organic feel
            const time = Date.now() * 0.0005;
            const noise = Math.sin(time + layer.noise) * 2;

            layer.element.style.transform = `translateY(${layer.currentY + noise}px)`;
        });
    }

    /**
     * Main animation loop
     */
    animateLoop() {
        const time = Date.now();

        // Animate tilts with spring physics
        this.tiltElements.forEach(tiltObj => {
            const springX = this.springPhysics(
                tiltObj.currentRotateX,
                tiltObj.targetRotateX,
                tiltObj.velocityX,
                0.08, 0.85
            );
            const springY = this.springPhysics(
                tiltObj.currentRotateY,
                tiltObj.targetRotateY,
                tiltObj.velocityY,
                0.08, 0.85
            );

            tiltObj.currentRotateX = springX.position;
            tiltObj.currentRotateY = springY.position;
            tiltObj.velocityX = springX.velocity;
            tiltObj.velocityY = springY.velocity;

            // Calculate Z translation based on activity
            const activity = Math.abs(springX.velocity) + Math.abs(springY.velocity);
            const baseZ = tiltObj.isHovering ? 30 : 0;
            const dynamicZ = baseZ + (activity * 2);

            // Apply transform
            tiltObj.element.style.transform = `
                perspective(1500px)
                rotateX(${tiltObj.currentRotateX}deg)
                rotateY(${tiltObj.currentRotateY}deg)
                translateZ(${dynamicZ}px)
            `;

            // Update glare
            this.updateGlare(tiltObj);
        });

        // Animate breathing/idling
        this.breathingElements.forEach(breath => {
            const { element, basePhase, breathSpeed, floatSpeed, floatAmplitude, rotationSpeed, rotationAmplitude } = breath;

            // Skip if currently being interacted with
            const isHovered = this.tiltElements.some(t => t.element === element && t.isHovering);
            if (isHovered) return;

            const time = Date.now();

            // Breathing scale
            const breathPhase = (time * breathSpeed + basePhase) % (Math.PI * 2);
            const breathScale = 1 + Math.sin(breathPhase) * 0.005;

            // Floating motion
            const floatPhase = (time * floatSpeed + basePhase) % (Math.PI * 2);
            const floatY = Math.sin(floatPhase) * floatAmplitude;
            const floatX = Math.cos(floatPhase * 0.7) * (floatAmplitude * 0.3);

            // Gentle rotation
            const rotationPhase = (time * rotationSpeed + basePhase) % (Math.PI * 2);
            const gentleRotate = Math.sin(rotationPhase) * rotationAmplitude;

            element.style.transform = `
                perspective(1500px)
                scale(${breathScale})
                translate3d(${floatX}px, ${floatY}px, 0)
                rotateY(${gentleRotate}deg)
            `;
        });

        // Decay mouse velocity
        this.mouseVelocity.x *= 0.95;
        this.mouseVelocity.y *= 0.95;

        requestAnimationFrame(() => this.animateLoop());
    }

    /**
     * Update glare/shine effect based on rotation
     */
    updateGlare(tiltObj) {
        const element = tiltObj.element;
        let glare = element.querySelector('.book-glare');

        if (!glare) {
            glare = document.createElement('div');
            glare.className = 'book-glare';
            glare.style.cssText = `
                position: absolute;
                inset: 0;
                pointer-events: none;
                border-radius: inherit;
                z-index: 10;
                transition: background 0.1s;
            `;
            element.appendChild(glare);
        }

        // Calculate glare position based on rotation
        const lightX = 50 + (tiltObj.currentRotateY / 20) * 30;
        const lightY = 50 - (tiltObj.currentRotateX / 20) * 30;
        const intensity = Math.abs(tiltObj.currentRotateY) + Math.abs(tiltObj.currentRotateX);
        const opacity = Math.min(intensity / 40, 0.15);

        glare.style.background = `
            radial-gradient(
                ellipse ${60 + Math.random() * 10}% ${80 + Math.random() * 20}% at ${lightX}% ${lightY}%,
                rgba(255,255,255,${opacity}) 0%,
                transparent 60%
            )
        `;
    }

    /**
     * Clamp utility
     */
    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
}

/**
 * Magnetic button with organic physics
 */
class OrganicMagneticButtons {
    constructor() {
        this.buttons = [];
        this.init();
    }

    init() {
        const magneticBtns = document.querySelectorAll('.magnetic-btn');

        magneticBtns.forEach(btn => {
            this.buttons.push({
                element: btn,
                currentX: 0,
                currentY: 0,
                targetX: 0,
                targetY: 0,
                velocityX: 0,
                velocityY: 0,
                springStrength: 0.1 + Math.random() * 0.05,
                damping: 0.8 + Math.random() * 0.1
            });

            btn.addEventListener('mousemove', (e) => this.handleMouseMove(e, btn));
            btn.addEventListener('mouseleave', () => this.handleMouseLeave(btn));
        });

        this.animate();
    }

    handleMouseMove(e, btn) {
        const button = this.buttons.find(b => b.element === btn);
        if (!button) return;

        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate pull strength with distance falloff
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        const maxDistance = Math.max(rect.width, rect.height);
        const strength = Math.max(0, 1 - distance / maxDistance);

        // Magnetic pull (stronger when closer)
        button.targetX = distanceX * 0.4 * strength;
        button.targetY = distanceY * 0.4 * strength;
    }

    handleMouseLeave(btn) {
        const button = this.buttons.find(b => b.element === btn);
        if (button) {
            button.targetX = 0;
            button.targetY = 0;
        }
    }

    animate() {
        this.buttons.forEach(btn => {
            // Spring physics
            const forceX = (btn.targetX - btn.currentX) * btn.springStrength;
            const forceY = (btn.targetY - btn.currentY) * btn.springStrength;

            btn.velocityX += forceX;
            btn.velocityY += forceY;
            btn.velocityX *= btn.damping;
            btn.velocityY *= btn.damping;

            btn.currentX += btn.velocityX;
            btn.currentY += btn.velocityY;

            // Apply with subtle rotation for organic feel
            const rotation = btn.velocityX * 0.5;

            btn.element.style.transform = `
                translate3d(${btn.currentX}px, ${btn.currentY}px, 0)
                rotate(${rotation}deg)
            `;
        });

        requestAnimationFrame(() => this.animate());
    }
}

/**
 * Organic scroll reveal with natural timing
 */
class OrganicScrollReveal {
    constructor() {
        this.init();
    }

    init() {
        const revealElements = document.querySelectorAll(
            '.book-card, .author-card, .section-header, .stat, .bundle-content'
        );

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger with organic delay
                    const baseDelay = index * 80;
                    const randomDelay = Math.random() * 100;
                    const delay = baseDelay + randomDelay;

                    setTimeout(() => {
                        this.reveal(entry.target);
                    }, delay);

                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(40px) rotateX(5deg)';
            observer.observe(el);
        });
    }

    reveal(element) {
        // Custom ease that feels hand-crafted
        element.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0) rotateX(0)';

        // Subtle follow-up motion
        setTimeout(() => {
            element.style.transition = 'transform 3s ease-in-out';
            element.style.transform = 'translateY(-3px)';
            setTimeout(() => {
                element.style.transform = 'translateY(0)';
            }, 3000);
        }, 800);
    }
}

/**
 * Floating elements with organic motion
 */
class OrganicFloatingElements {
    constructor() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        this.init();
    }

    init() {
        const floatElements = document.querySelectorAll('.float-el');

        floatElements.forEach((el, index) => {
            // Each element gets unique organic motion
            const duration = 6 + Math.random() * 4; // 6-10 seconds
            const delay = index * 0.7 + Math.random();
            const path = this.generateOrganicPath();

            el.style.animation = 'none';
            el.style.offsetPath = path;

            // Apply custom animation
            this.animateFloat(el, duration, delay);
        });
    }

    generateOrganicPath() {
        // Create a gentle, wandering path
        const points = [];
        for (let i = 0; i <= 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const radius = 30 + Math.random() * 20;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius * 0.5;
            points.push(`translate(${x}px, ${y}px)`);
        }
        return points.join(' ');
    }

    animateFloat(el, duration, delay) {
        const startTime = Date.now() + delay * 1000;

        const animate = () => {
            const now = Date.now();
            if (now < startTime) {
                requestAnimationFrame(animate);
                return;
            }

            const elapsed = (now - startTime) / 1000;
            const progress = (elapsed % duration) / duration;

            // Organic motion using multiple sine waves
            const y = Math.sin(progress * Math.PI * 2) * 20
                   + Math.sin(progress * Math.PI * 4 + 1) * 5
                   + Math.sin(progress * Math.PI * 6 + 2) * 2;
            const x = Math.cos(progress * Math.PI * 1.5) * 15
                   + Math.sin(progress * Math.PI * 3 + 0.5) * 5;
            const rotation = Math.sin(progress * Math.PI * 2) * 8
                          + Math.cos(progress * Math.PI * 3) * 3;
            const scale = 1 + Math.sin(progress * Math.PI * 2) * 0.05;

            el.style.transform = `
                translate3d(${x}px, ${y}px, 0)
                rotate(${rotation}deg)
                scale(${scale})
            `;
            el.style.opacity = 0.12 + Math.sin(progress * Math.PI) * 0.08;

            requestAnimationFrame(animate);
        };

        animate();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new Humanized3DEffects();
    new OrganicMagneticButtons();
    new OrganicScrollReveal();
    new OrganicFloatingElements();
});
