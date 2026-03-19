/** ============================================
 * MOSSAIC NOTES - Main Application
 * Core Functionality & Interactions
 * ============================================ */

class MossaicApp {
    constructor() {
        this.cart = [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.renderBooks();
        this.renderAuthors();
        this.initNavigation();
        this.initCart();
        this.initFilter();
        this.initModal();
        this.initForms();
        this.initSmoothScroll();
    }

    /**
     * Render books grid
     */
    renderBooks(filter = 'all') {
        const grid = document.getElementById('booksGrid');
        if (!grid) return;

        const filteredBooks = filter === 'all'
            ? booksData
            : booksData.filter(book => book.category === filter);

        grid.innerHTML = filteredBooks.map(book => this.createBookCard(book)).join('');

        // Re-initialize 3D effects on new elements
        setTimeout(() => {
            if (window.ThreeDEffects) {
                new ThreeDEffects();
            }
        }, 100);
    }

    /**
     * Create book card HTML
     */
    createBookCard(book) {
        return `
            <article class="book-card" data-category="${book.category}" data-id="${book.id}">
                <div class="book-3d" data-tilt>
                    <div class="book-front">
                        <div class="book-cover">
                            <div class="cover-design">
                                <span class="cover-icon">◈</span>
                                <h3>${book.category.toUpperCase()}</h3>
                                <h2>${book.title.split(' ').slice(0, 2).join(' ')}</h2>
                                <p class="cover-author">${book.author}</p>
                            </div>
                        </div>
                    </div>
                    <div class="book-spine"></div>
                    <div class="book-back"></div>
                    <div class="book-shadow"></div>
                </div>
                <div class="book-info">
                    <span class="book-category">${book.category}</span>
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author">${book.author}</p>
                    <p class="book-price">${utils.formatCurrency(book.price)}</p>
                </div>
            </article>
        `;
    }

    /**
     * Render authors grid
     */
    renderAuthors() {
        const grid = document.getElementById('authorsGrid');
        if (!grid) return;

        grid.innerHTML = authorsData.map(author => `
            <article class="author-card">
                <div class="author-avatar">${author.initials}</div>
                <h3 class="author-name">${author.name}</h3>
                <p class="author-genre">${author.genre}</p>
                <p class="author-bio">${author.bio}</p>
            </article>
        `).join('');
    }

    /**
     * Initialize navigation
     */
    initNavigation() {
        const navbar = document.getElementById('navbar');
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        // Scroll effect
        if (navbar) {
            window.addEventListener('scroll', utils.throttle(() => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }, 100));
        }

        // Mobile menu toggle
        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                menuToggle.classList.toggle('active');
            });
        }
    }

    /**
     * Initialize cart functionality
     */
    initCart() {
        const cartBtn = document.querySelector('.cart-btn');
        const cartDrawer = document.getElementById('cartDrawer');
        const cartClose = document.querySelector('.cart-close');
        const cartBackdrop = document.querySelector('.cart-backdrop');

        if (cartBtn) {
            cartBtn.addEventListener('click', () => this.openCart());
        }

        if (cartClose) {
            cartClose.addEventListener('click', () => this.closeCart());
        }

        if (cartBackdrop) {
            cartBackdrop.addEventListener('click', () => this.closeCart());
        }

        // Add to cart buttons in modal
        document.addEventListener('click', (e) => {
            if (e.target.closest('.add-to-cart')) {
                const bookId = document.getElementById('bookModal').dataset.bookId;
                if (bookId) {
                    this.addToCart(parseInt(bookId));
                }
            }
        });
    }

    /**
     * Add item to cart
     */
    addToCart(bookId) {
        const book = booksData.find(b => b.id === bookId);
        if (!book) return;

        const existingItem = this.cart.find(item => item.id === bookId);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.cart.push({ ...book, quantity: 1 });
        }

        this.updateCartUI();
        this.closeModal();
        this.openCart();

        // Show notification
        this.showNotification(`${book.title} added to cart`);
    }

    /**
     * Remove item from cart
     */
    removeFromCart(bookId) {
        this.cart = this.cart.filter(item => item.id !== bookId);
        this.updateCartUI();
    }

    /**
     * Update cart UI
     */
    updateCartUI() {
        const cartCount = document.querySelector('.cart-count');
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');

        // Update count
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }

        // Update items
        if (cartItems) {
            if (this.cart.length === 0) {
                cartItems.innerHTML = `
                    <div class="cart-empty">
                        <p>Your cart is empty</p>
                    </div>
                `;
            } else {
                cartItems.innerHTML = this.cart.map(item => `
                    <div class="cart-item">
                        <div class="cart-item-image">◈</div>
                        <div class="cart-item-details">
                            <p class="cart-item-title">${item.title}</p>
                            <p class="cart-item-price">${utils.formatCurrency(item.price)} × ${item.quantity}</p>
                        </div>
                        <button class="cart-item-remove" data-id="${item.id}">×</button>
                    </div>
                `).join('');

                // Add remove handlers
                cartItems.querySelectorAll('.cart-item-remove').forEach(btn => {
                    btn.addEventListener('click', () => {
                        this.removeFromCart(parseInt(btn.dataset.id));
                    });
                });
            }
        }

        // Update total
        if (cartTotal) {
            const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotal.textContent = utils.formatCurrency(total);
        }
    }

    /**
     * Open cart drawer
     */
    openCart() {
        const cartDrawer = document.getElementById('cartDrawer');
        if (cartDrawer) {
            cartDrawer.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    /**
     * Close cart drawer
     */
    closeCart() {
        const cartDrawer = document.getElementById('cartDrawer');
        if (cartDrawer) {
            cartDrawer.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    /**
     * Initialize category filter
     */
    initFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Filter books
                const filter = btn.dataset.filter;
                this.renderBooks(filter);
            });
        });
    }

    /**
     * Initialize book modal
     */
    initModal() {
        const modal = document.getElementById('bookModal');
        const modalClose = document.querySelector('.modal-close');
        const modalBackdrop = document.querySelector('.modal-backdrop');

        if (!modal) return;

        // Open modal on book card click
        document.addEventListener('click', (e) => {
            const bookCard = e.target.closest('.book-card');
            if (bookCard) {
                const bookId = parseInt(bookCard.dataset.id);
                this.openBookModal(bookId);
            }
        });

        // Close modal
        if (modalClose) {
            modalClose.addEventListener('click', () => this.closeModal());
        }

        if (modalBackdrop) {
            modalBackdrop.addEventListener('click', () => this.closeModal());
        }

        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
                this.closeCart();
            }
        });
    }

    /**
     * Open book modal
     */
    openBookModal(bookId) {
        const book = booksData.find(b => b.id === bookId);
        if (!book) return;

        const modal = document.getElementById('bookModal');

        // Populate modal
        document.getElementById('modalCategory').textContent = book.category;
        document.getElementById('modalTitle').textContent = book.title;
        document.getElementById('modalAuthor').textContent = `By ${book.author}`;
        document.getElementById('modalDescription').textContent = book.description;
        document.getElementById('modalPages').textContent = book.pages;
        document.getElementById('modalPrice').textContent = utils.formatCurrency(book.price);

        // Update cover
        const coverEl = document.getElementById('modalCover');
        if (coverEl) {
            coverEl.innerHTML = `
                <div class="cover-design">
                    <span class="cover-icon">◈</span>
                    <h3>${book.category.toUpperCase()}</h3>
                    <h2>${book.title.split(' ').slice(0, 2).join(' ')}</h2>
                    <p class="cover-author">${book.author}</p>
                </div>
            `;
        }

        modal.dataset.bookId = bookId;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    /**
     * Close modal
     */
    closeModal() {
        const modal = document.getElementById('bookModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    /**
     * Initialize forms
     */
    initForms() {
        const newsletterForm = document.getElementById('newsletterForm');

        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = newsletterForm.querySelector('input[type="email"]').value;
                this.showNotification('Thank you for subscribing!');
                newsletterForm.reset();
            });
        }
    }

    /**
     * Show notification
     */
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--color-gold);
            color: var(--color-navy);
            padding: 1rem 1.5rem;
            border-radius: 8px;
            font-weight: 600;
            z-index: 9999;
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateY(0)';
            notification.style.opacity = '1';
        });

        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateY(100px)';
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    /**
     * Initialize smooth scroll
     */
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new MossaicApp();
});
