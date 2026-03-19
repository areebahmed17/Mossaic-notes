/** ============================================
 * MOSSAIC NOTES - Organic GSAP Animations
 * Natural, Human-like Motion
 * ============================================ */

// Check if GSAP is available
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Reduced motion check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        initOrganicAnimations();
    }
}

function initOrganicAnimations() {
    // Custom organic easing
    const organicEase = "power2.out";
    const springEase = "elastic.out(1, 0.75)";
    const gentleEase = "sine.inOut";

    // ============================================
    // Hero Section - Organic Reveal
    // ============================================

    const heroTimeline = gsap.timeline({
        defaults: { ease: organicEase }
    });

    // Staggered text reveal with organic timing
    heroTimeline
        .from('.hero-eyebrow', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: 0.3
        })
        .from('.hero-title .title-line', {
            opacity: 0,
            y: 50,
            rotateX: 15,
            duration: 1,
            stagger: {
                each: 0.12,
                ease: "power3.out"
            }
        }, '-=0.4')
        .from('.hero-subtitle', {
            opacity: 0,
            y: 30,
            filter: 'blur(10px)',
            duration: 0.9
        }, '-=0.6')
        .from('.hero-cta .btn', {
            opacity: 0,
            y: 20,
            scale: 0.95,
            duration: 0.6,
            stagger: 0.1,
            ease: springEase
        }, '-=0.5')
        .from('.hero-book', {
            opacity: 0,
            rotateY: -45,
            z: -100,
            duration: 1.8,
            ease: springEase
        }, '-=1.2');

    // ============================================
    // Organic Scroll Reveals
    // ============================================

    // Section headers with breathing effect
    gsap.utils.toArray('.section-header').forEach((header, index) => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });

        tl.from(header.children, {
            opacity: 0,
            y: 40,
            duration: 0.9,
            stagger: 0.15,
            ease: organicEase
        });

        // Subtle breathing after reveal
        tl.to(header, {
            y: -3,
            duration: 2,
            ease: gentleEase,
            yoyo: true,
            repeat: -1
        }, '+=0.5');
    });

    // ============================================
    // Book Cards - Organic Stagger
    // ============================================

    const bookCards = gsap.utils.toArray('.book-card');
    bookCards.forEach((card, index) => {
        // Random delay for organic feel
        const randomDelay = Math.random() * 0.2;

        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 60,
            rotateY: -20,
            scale: 0.95,
            duration: 0.8,
            delay: (index % 4) * 0.1 + randomDelay,
            ease: organicEase
        });
    });

    // ============================================
    // Notebooks Section - Flowing Animation
    // ============================================

    const notebooksTl = gsap.timeline({
        scrollTrigger: {
            trigger: '#notebooks',
            start: 'top 60%',
            toggleActions: 'play none none none'
        }
    });

    notebooksTl
        .from('.notebooks-text', {
            opacity: 0,
            x: -60,
            duration: 1,
            ease: organicEase
        })
        .from('.notebook-3d', {
            opacity: 0,
            rotateY: -60,
            x: 80,
            duration: 1.4,
            ease: springEase
        }, '-=0.8')
        .from('.notebook-features li', {
            opacity: 0,
            x: -30,
            duration: 0.5,
            stagger: 0.1,
            ease: organicEase
        }, '-=0.8');

    // ============================================
    // Bundle Section - Dramatic Reveal
    // ============================================

    const bundleTl = gsap.timeline({
        scrollTrigger: {
            trigger: '#bundle',
            start: 'top 60%',
            toggleActions: 'play none none none'
        }
    });

    bundleTl
        .from('.bundle-content', {
            opacity: 0,
            x: -80,
            duration: 1,
            ease: organicEase
        })
        .from('.bundle-visual', {
            opacity: 0,
            x: 80,
            duration: 1,
            ease: organicEase
        }, '-=0.8')
        .from('.bundle-books .mini-book, .bundle-books .mini-notebook', {
            opacity: 0,
            y: 40,
            rotation: () => gsap.utils.random(-15, 15),
            duration: 0.7,
            stagger: {
                each: 0.12,
                from: "center"
            },
            ease: springEase
        }, '-=0.6');

    // Price counter with organic easing
    const priceElements = document.querySelectorAll('.price-current');
    priceElements.forEach(el => {
        const price = parseFloat(el.textContent.replace('$', ''));

        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            textContent: 0,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            onUpdate: function() {
                this.targets()[0].textContent = '$' + Math.ceil(this.targets()[0].textContent);
            }
        });
    });

    // ============================================
    // Author Cards - Wave Reveal
    // ============================================

    const authorCards = gsap.utils.toArray('.author-card');
    authorCards.forEach((card, index) => {
        const waveDelay = Math.sin(index * 0.5) * 0.2 + (index * 0.1);

        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            scale: 0.9,
            duration: 0.8,
            delay: waveDelay,
            ease: organicEase
        });
    });

    // ============================================
    // About Section - Mosaic Reveal
    // ============================================

    const aboutTl = gsap.timeline({
        scrollTrigger: {
            trigger: '#about',
            start: 'top 60%',
            toggleActions: 'play none none none'
        }
    });

    aboutTl
        .from('.about-text', {
            opacity: 0,
            x: -50,
            duration: 1,
            ease: organicEase
        })
        .from('.mosaic-piece', {
            opacity: 0,
            scale: 0.3,
            rotation: () => gsap.utils.random(-20, 20),
            duration: 0.7,
            stagger: {
                each: 0.08,
                from: "random"
            },
            ease: springEase
        }, '-=0.6')
        .from('.stat', {
            opacity: 0,
            y: 30,
            duration: 0.6,
            stagger: 0.15,
            ease: organicEase
        }, '-=0.4');

    // Stat counters with organic motion
    document.querySelectorAll('.stat-number').forEach(stat => {
        const value = stat.textContent;
        const numericValue = parseInt(value.replace(/\D/g, ''));
        const suffix = value.replace(/[0-9]/g, '');

        gsap.from(stat, {
            scrollTrigger: {
                trigger: stat,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            textContent: 0,
            duration: 2.5,
            ease: "power2.out",
            snap: { textContent: 1 },
            onUpdate: function() {
                this.targets()[0].textContent = Math.ceil(this.targets()[0].textContent) + suffix;
            }
        });
    });

    // ============================================
    // Newsletter - Gentle Float In
    // ============================================

    gsap.from('.newsletter-container', {
        scrollTrigger: {
            trigger: '#newsletter',
            start: 'top 70%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: organicEase
    });

    // ============================================
    // Footer - Cascading Reveal
    // ============================================

    gsap.from('.footer-brand, .footer-column', {
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.1,
        ease: organicEase
    });

    // ============================================
    // Organic Parallax Effects
    // ============================================

    // Hero parallax with depth
    gsap.to('.hero-title', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5
        },
        y: -80,
        ease: "none"
    });

    gsap.to('.hero-book', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: -150,
        rotateY: 15,
        ease: "none"
    });

    // Floating elements with organic paths
    gsap.utils.toArray('.float-el').forEach((el, i) => {
        const speed = 0.5 + (i * 0.2);
        const yOffset = -100 - (i * 50);

        gsap.to(el, {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: speed
            },
            y: yOffset,
            rotation: 10 + (i * 5),
            ease: "none"
        });
    });

    // ============================================
    // Navbar Organic Transition
    // ============================================

    ScrollTrigger.create({
        start: 50,
        onUpdate: (self) => {
            const navbar = document.getElementById('navbar');
            if (navbar) {
                if (self.scroll() > 50) {
                    gsap.to(navbar, {
                        backgroundColor: 'rgba(10, 22, 40, 0.95)',
                        backdropFilter: 'blur(20px)',
                        duration: 0.4,
                        ease: gentleEase
                    });
                } else {
                    gsap.to(navbar, {
                        backgroundColor: 'transparent',
                        backdropFilter: 'blur(0px)',
                        duration: 0.4,
                        ease: gentleEase
                    });
                }
            }
        }
    });

    // ============================================
    // Continuous Ambient Animations
    // ============================================

    // Gentle floating for hero book
    gsap.to('.hero-book', {
        y: '+=10',
        duration: 3,
        ease: gentleEase,
        yoyo: true,
        repeat: -1
    });

    // Subtle rotation for floating elements
    gsap.utils.toArray('.float-el').forEach((el, i) => {
        gsap.to(el, {
            rotation: '+=15',
            duration: 4 + i,
            ease: gentleEase,
            yoyo: true,
            repeat: -1
        });
    });
}
