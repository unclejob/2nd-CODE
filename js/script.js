/* ========================================
   UNCLEJOB VENTURE - JAVASCRIPT
   ======================================== */

/* ========================================
   UNCLEJOB VENTURE - JAVASCRIPT
   ======================================== */

// Product Data
const products = [
    { id: 1, name: "Luxury Velvet Sofa", category: "living", price: "$1,299", image: "https://images.unsplash.com/photo-1555035447-4d03e699e40f?w=400&h=300&fit=crop" },
    { id: 2, name: "Executive Office Desk", category: "office", price: "$899", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop" },
    { id: 3, name: "King Size Bed Frame", category: "bedroom", price: "$1,499", image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&h=300&fit=crop" },
    { id: 4, name: "Dining Table Set", category: "dining", price: "$1,799", image: "https://images.unsplash.com/photo-1533082278611-d21a05943b8b?w=400&h=300&fit=crop" },
    { id: 5, name: "Recliner Chair", category: "living", price: "$699", image: "https://images.unsplash.com/photo-1599059772878-e42e190d311d?w=400&h=300&fit=crop" },
    { id: 6, name: "Nightstand Set", category: "bedroom", price: "$399", image: "https://images.unsplash.com/photo-1560795799-184c0b612cfc?w=400&h=300&fit=crop" },
    { id: 7, name: "Bookshelf", category: "office", price: "$459", image: "https://images.unsplash.com/photo-1507892948744-87886167941f?w=400&h=300&fit=crop" },
    { id: 8, name: "Coffee Table", category: "living", price: "$349", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=300&fit=crop" }
];

// Testimonial Data
const testimonials = [
    { id: 1, name: "Sarah Johnson", role: "Homeowner", rating: 5, text: "Absolutely in love with my new living room set!", image: "https://i.pravatar.cc/150?img=11" },
    { id: 2, name: "Michael Chen", role: "Interior Designer", rating: 5, text: "I recommend UncleJob Venture to all my clients.", image: "https://i.pravatar.cc/150?img=12" },
    { id: 3, name: "Emily Rodriguez", role: "New Homeowner", rating: 4, text: "The bedroom set we ordered is beautiful.", image: "https://i.pravatar.cc/150?img=13" },
    { id: 4, name: "David Thompson", role: "Office Manager", rating: 5, text: "Great office furniture that withstands daily use.", image: "https://i.pravatar.cc/150?img=14" },
    { id: 5, name: "Lisa Wong", role: "Apartment Owner", rating: 4, text: "Compact furniture perfect for small spaces.", image: "https://i.pravatar.cc/150?img=15" }
];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initProducts();
    initTestimonials();
    initBookingForm();
    initContactForm();
    initModals();
    initScrollEffects();
});

// Navigation
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// Products
function initProducts() {
    const productGrid = document.getElementById('product-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    function renderProducts(filter = 'all') {
        productGrid.innerHTML = '';
        const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
        filtered.forEach(p => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = '<div class="product-image"><img src="' + p.image + '" alt="' + p.name + '" loading="lazy"></div><div class="product-info"><span class="product-category">' + p.category + '</span><h3>' + p.name + '</h3><span class="product-price">' + p.price + '</span><div class="product-actions"><button class="btn btn-primary" onclick="quickView(' + p.id + ')">View Details</button></div></div>';
            productGrid.appendChild(card);
        });
    }
    renderProducts();
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProducts(btn.dataset.filter);
        });
    });
}

function quickView(id) {
    const p = products.find(x => x.id === id);
    alert(p.name + '\nPrice: ' + p.price + '\nCategory: ' + p.category + '\n\nContact us to order!');
}

// Testimonials Slider
function initTestimonials() {
    const track = document.getElementById('testimonial-track');
    const dotsContainer = document.getElementById('slider-dots');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    let currentIndex = 0;
    testimonials.forEach((t, index) => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        const stars = '★'.repeat(t.rating) + '☆'.repeat(5 - t.rating);
        card.innerHTML = '<div class="testimonial-rating">' + stars + '</div><div class="testimonial-text">"' + t.text + '"</div><div class="testimonial-author"><img src="' + t.image + '" alt="' + t.name + '"><div class="testimonial-author-info"><h4>' + t.name + '</h4><p>' + t.role + '</p></div></div>';
        track.appendChild(card);
        const dot = document.createElement('div');
        dot.className = 'dot' + (index === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    function updateSlider() {
        track.style.transform = 'translateX(-' + currentIndex * 100 + '%)';
        document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === currentIndex));
    }
    function goToSlide(index) { currentIndex = index; updateSlider(); }
    prevBtn.addEventListener('click', () => { currentIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1; updateSlider(); });
    nextBtn.addEventListener('click', () => { currentIndex = currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1; updateSlider(); });
    setInterval(() => { currentIndex = currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1; updateSlider(); }, 5000);
}

// Booking Form
function initBookingForm() {
    const form = document.getElementById('booking-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const original = btn.textContent;
        btn.textContent = 'Sending...'; btn.disabled = true;
        setTimeout(() => {
            btn.textContent = original; btn.disabled = false;
            form.reset(); openModal('booking-modal');
        }, 1500);
    });
    document.getElementById('date').setAttribute('min', new Date().toISOString().split('T')[0]);
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const original = btn.textContent;
        btn.textContent = 'Sending...'; btn.disabled = true;
        setTimeout(() => {
            btn.textContent = original; btn.disabled = false;
            form.reset(); openModal('contact-modal');
        }, 1500);
    });
}

// Modals
function initModals() {
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => { document.querySelectorAll('.modal').forEach(m => m.style.display = 'none'); });
    });
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) e.target.style.display = 'none';
    });
    document.querySelectorAll('[id^="close-"]').forEach(btn => {
        btn.addEventListener('click', () => { document.querySelectorAll('.modal').forEach(m => m.style.display = 'none'); });
    });
}
function openModal(modalId) { document.getElementById(modalId).style.display = 'flex'; }

// Scroll Effects
function initScrollEffects() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.product-card, .testimonial-card, .about-text, .booking-info').forEach(el => {
        el.style.opacity = '0'; el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});