/** ============================================
 * MOSSAIC NOTES - Utilities
 * Helper Functions & Data
 * ============================================ */

// Sample book data - expanded categories
const booksData = [
    // Fiction
    {
        id: 1,
        title: "The Silent Hours",
        author: "Eleanor Whitmore",
        category: "fiction",
        price: 24.99,
        pages: 342,
        description: "A haunting meditation on memory, loss, and the quiet moments that shape our lives. Whitmore weaves a narrative of extraordinary depth, where silence speaks louder than words."
    },
    {
        id: 5,
        title: "Letters from the Edge",
        author: "Isla Morgan",
        category: "fiction",
        price: 22.99,
        pages: 298,
        description: "A correspondence that spans decades and continents, revealing the tapestry of lives intertwined by fate, choice, and the enduring power of written words."
    },
    {
        id: 9,
        title: "The Glass Orchard",
        author: "Lillian Voss",
        category: "fiction",
        price: 27.99,
        pages: 384,
        description: "A gothic tale of family secrets set in a crumbling estate, where every room holds a mystery and every mirror reflects a different truth."
    },
    {
        id: 10,
        title: "Echoes of Shanghai",
        author: "Wei Chen",
        category: "fiction",
        price: 29.99,
        pages: 416,
        description: "A sweeping saga of three generations navigating love, war, and reinvention in one of Asia's most vibrant cities."
    },
    // Non-Fiction
    {
        id: 2,
        title: "Patterns of Thought",
        author: "Dr. Marcus Chen",
        category: "non-fiction",
        price: 34.99,
        pages: 412,
        description: "An exploration of how ancient philosophical traditions continue to inform modern cognitive science. A bridge between wisdom old and new."
    },
    {
        id: 6,
        title: "The Architecture of Mind",
        author: "Prof. David Okonkwo",
        category: "non-fiction",
        price: 39.99,
        pages: 478,
        description: "How we construct meaning in an increasingly fragmented world. A rigorous yet accessible examination of consciousness and cognition."
    },
    // Poetry
    {
        id: 3,
        title: "In the Garden of Ink",
        author: "Sofia Ramirez",
        category: "poetry",
        price: 19.99,
        pages: 128,
        description: "A collection of poems that read like whispered secrets, each stanza a petal in a garden of delicate imagery and profound emotion."
    },
    {
        id: 7,
        title: "Whispers Before Dawn",
        author: "Aria Blackwood",
        category: "poetry",
        price: 18.99,
        pages: 104,
        description: "Poetry that captures the liminal spaces between night and morning, between dreaming and waking, between what was and what might be."
    },
    {
        id: 11,
        title: "Salt and Stone",
        author: "Maya O'Brien",
        category: "poetry",
        price: 21.99,
        pages: 156,
        description: "Verses carved from landscape and longing, exploring the weight of place and the lightness of being."
    },
    // Essays
    {
        id: 4,
        title: "The Craft of Attention",
        author: "James Holloway",
        category: "essays",
        price: 28.99,
        pages: 256,
        description: "Essays on the art of deep work and the lost discipline of focus. A manifesto for reclaiming our capacity for sustained attention."
    },
    {
        id: 8,
        title: "On Stillness",
        author: "Thomas Berg",
        category: "essays",
        price: 26.99,
        pages: 192,
        description: "Contemplative essays that find profound movement within apparent stillness. A reminder that the pause between notes is as important as the music itself."
    },
    // Biography
    {
        id: 12,
        title: "The Last Alchemist",
        author: "Dr. Sarah Thornton",
        category: "biography",
        price: 32.99,
        pages: 448,
        description: "The untold story of a forgotten Renaissance polymath whose work bridged art, science, and the sacred."
    },
    {
        id: 13,
        title: "Shadows of Empire",
        author: "Kwame Asante",
        category: "biography",
        price: 29.99,
        pages: 524,
        description: "A sweeping portrait of a colonial officer who became an unlikely champion of indigenous rights."
    },
    // Philosophy
    {
        id: 14,
        title: "Ethics for the Anthropocene",
        author: "Prof. Elena Volkov",
        category: "philosophy",
        price: 27.99,
        pages: 298,
        description: "Reimagining moral philosophy for an age of climate crisis and technological disruption."
    },
    {
        id: 15,
        title: "The Art of Uncertainty",
        author: "Dr. Hiroshi Tanaka",
        category: "philosophy",
        price: 25.99,
        pages: 274,
        description: "A meditation on embracing doubt, ambiguity, and the beauty of not knowing."
    },
    // Art & Design
    {
        id: 16,
        title: "The Shape of Silence",
        author: "Isabella Fontaine",
        category: "art",
        price: 45.99,
        pages: 312,
        description: "A visual journey through minimalist art movements, with stunning photography and critical essays."
    },
    {
        id: 17,
        title: "Designing for Humans",
        author: "Oliver Nash",
        category: "design",
        price: 38.99,
        pages: 368,
        description: "Principles of human-centered design illustrated through case studies from architecture to digital products."
    },
    // Science
    {
        id: 18,
        title: "Quantum Gardens",
        author: "Dr. Priya Sharma",
        category: "science",
        price: 33.99,
        pages: 342,
        description: "Making quantum mechanics accessible through the metaphor of cultivation and growth."
    },
    {
        id: 19,
        title: "The Symbiotic Self",
        author: "Prof. James Morrison",
        category: "science",
        price: 31.99,
        pages: 318,
        description: "Exploring how our bodies are ecosystems, and what that means for medicine and identity."
    },
    // History
    {
        id: 20,
        title: "The Silk Letters",
        author: "Mei-Lin Zhang",
        category: "history",
        price: 35.99,
        pages: 486,
        description: "Uncovering the lost correspondence that shaped trade, culture, and diplomacy along the ancient Silk Road."
    },
    {
        id: 21,
        title: "Revolutionary Minds",
        author: "Antoine Dubois",
        category: "history",
        price: 29.99,
        pages: 412,
        description: "Portraits of the philosophers and writers who inspired the age of revolutions."
    },
    // Memoir
    {
        id: 22,
        title: "Notes from the Margins",
        author: "Zara Al-Rashid",
        category: "memoir",
        price: 26.99,
        pages: 288,
        description: "A coming-of-age story spanning three continents, exploring identity, displacement, and belonging."
    },
    {
        id: 23,
        title: "The Cartographer's Daughter",
        author: "Emma Larsson",
        category: "memoir",
        price: 24.99,
        pages: 264,
        description: "A memoir about growing up among maps, and learning to navigate both geography and grief."
    },
    // Photography
    {
        id: 24,
        title: "Light and Time",
        author: "Sebastian Cole",
        category: "photography",
        price: 55.99,
        pages: 240,
        description: "A masterclass in capturing the ephemeral, with techniques from exposure to printing."
    },
    // Craft
    {
        id: 25,
        title: "The Slow Stitch",
        author: "Hannah Mercer",
        category: "craft",
        price: 32.99,
        pages: 286,
        description: "Rediscovering the meditative art of hand embroidery and textile traditions from around the world."
    }
];

// Author data - expanded
const authorsData = [
    {
        id: 1,
        name: "Eleanor Whitmore",
        genre: "Literary Fiction",
        initials: "EW",
        bio: "Prize-winning novelist known for her exquisite prose and exploration of memory."
    },
    {
        id: 2,
        name: "Dr. Marcus Chen",
        genre: "Philosophy & Science",
        initials: "MC",
        bio: "Philosopher and cognitive scientist bridging ancient wisdom with modern research."
    },
    {
        id: 3,
        name: "Sofia Ramirez",
        genre: "Poetry",
        initials: "SR",
        bio: "Award-winning poet whose work has been translated into over twenty languages."
    },
    {
        id: 4,
        name: "James Holloway",
        genre: "Essays",
        initials: "JH",
        bio: "Writer and educator focused on the art of attention and deep work."
    },
    {
        id: 5,
        name: "Dr. Sarah Thornton",
        genre: "Biography",
        initials: "ST",
        bio: "Historian specializing in Renaissance studies and forgotten polymaths."
    },
    {
        id: 6,
        name: "Kwame Asante",
        genre: "History",
        initials: "KA",
        bio: "Award-winning historian documenting untold stories of colonial resistance."
    },
    {
        id: 7,
        name: "Isabella Fontaine",
        genre: "Art & Design",
        initials: "IF",
        bio: "Art critic and curator with a passion for minimalist movements."
    },
    {
        id: 8,
        name: "Sebastian Cole",
        genre: "Photography",
        initials: "SC",
        bio: "Master photographer teaching the art of capturing light and time."
    },
    {
        id: 9,
        name: "Zara Al-Rashid",
        genre: "Memoir",
        initials: "ZA",
        bio: "Memoirist exploring themes of displacement, identity, and belonging."
    },
    {
        id: 10,
        name: "Prof. Elena Volkov",
        genre: "Philosophy",
        initials: "EV",
        bio: "Environmental ethicist reimagining moral philosophy for the climate age."
    }
];

// Utility Functions
const utils = {
    /**
     * Throttle function execution
     */
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * Debounce function execution
     */
    debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    },

    /**
     * Format currency
     */
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    },

    /**
     * Check if element is in viewport
     */
    isInViewport(element, offset = 0) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight - offset) &&
            rect.bottom >= offset
        );
    },

    /**
     * Map a value from one range to another
     */
    mapRange(value, inMin, inMax, outMin, outMax) {
        return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    },

    /**
     * Clamp a value between min and max
     */
    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    },

    /**
     * Linear interpolation
     */
    lerp(start, end, factor) {
        return start + (end - start) * factor;
    },

    /**
     * Generate a unique ID
     */
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    },

    /**
     * Prefers reduced motion
     */
    prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
};

// Export for module systems (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { booksData, authorsData, utils };
}
