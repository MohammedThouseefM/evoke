// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// window.addEventListener('scroll', () => {
//     const header = document.getElementById('header');
//     if (window.scrollY > 50) {
//         header.classList.add('scrolled');
//     } else {
//         header.classList.remove('scrolled');
//     }
// });

// Testimonial slider
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.slider-dot');
let currentSlide = 0;

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Auto slide change
setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Filter buttons
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Here you would filter products based on category
        // For demo purposes, we're just changing the button state
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Sample product data (in a real app, this would come from your API)
const products = [
    {
        id: 1,
        name: "Midnight Oud",
        category: "Men",
        price: 89.99,
        image: "/photos/IMG-20250506-WA0002.jpg",
        rating: 4.5
    },
    {
        id: 2,
        name: "Royal Amber",
        category: "Men",
        price: 79.99,
        image: "/photos/IMG-20250506-WA0003.jpg",
        rating: 4
    },
    {
        id: 3,
        name: "Leather & Spice",
        category: "Men",
        price: 94.99,
        image: "/photos/IMG-20250506-WA0004.jpg",
        rating: 5
    },
    {
        id: 4,
        name: "Tobacco Vanille",
        category: "Men",
        price: 99.99,
        image: "/photos/IMG-20250506-WA0005.jpg",
        rating: 4.5
    },
    {
        id: 5,
        name: "Sandalwood Mystique",
        category: "Men",
        price: 84.99,
        image: "/photos/IMG-20250506-WA0006.jpg",
        rating: 3.5
    },
    {
        id: 6,
        name: "Ocean Breeze",
        category: "Men",
        price: 74.99,
        image: "/photos/IMG-20250506-WA0007.jpg",
        rating: 4
    },
    {
        id: 7,
        name: "Black Orchid",
        category: "Men",
        price: 109.99,
        image: "/photos/IMG-20250506-WA0008.jpg",
        rating: 5
    },
    {
        id: 8,
        name: "Citrus Noir",
        category: "Men",
        price: 69.99,
        image: "/photos/IMG-20250506-WA0009.jpg",
        rating: 4
    },
    {
        id: 9,
        name: "Woody Elegance",
        category: "Men",
        price: 89.99,
        image: "/photos/IMG-20250506-WA0010.jpg",
        rating: 4.5
    }
];

// Function to display products
function displayProducts() {
    const container = document.getElementById('productsContainer');
    container.innerHTML = '';
    
    products.forEach(product => {
        const ratingStars = createRatingStars(product.rating);
        
        const productCard = `
            <div class="product-card">
                <div class="product-img">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <div class="product-rating">
                        ${ratingStars}
                    </div>
                    <a href="#" class="btn buy-now-btn" 
                       data-id="${product.id}"
                       data-name="${product.name}"
                       data-price="${product.price}"
                       data-image="${product.image}">Buy Now</a>
                </div>
            </div>
        `;
        
        container.insertAdjacentHTML('beforeend', productCard);
    });
    
    // Add event listeners to Buy Now buttons
    document.querySelectorAll('.buy-now-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openWhatsAppForm(
                this.getAttribute('data-name'),
                this.getAttribute('data-price'),
                this.getAttribute('data-image')
            );
        });
    });
}

// Function to create rating stars
function createRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    
    return stars;
}

// WhatsApp Form Functions
function openWhatsAppForm(name, price, image) {
    document.getElementById('whatsappProductName').value = name;
    document.getElementById('whatsappProductPrice').value = price;
    document.getElementById('whatsappProductImage').value = image;
    document.getElementById('whatsappFormModal').style.display = 'flex';
}

function closeWhatsAppForm() {
    document.getElementById('whatsappFormModal').style.display = 'none';
}

// Handle form submission
document.getElementById('whatsappOrderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('customerPhone').value;
    const address = document.getElementById('customerAddress').value;
    const quantity = document.getElementById('customerQuantity').value;
    const productName = document.getElementById('whatsappProductName').value;
    const productPrice = document.getElementById('whatsappProductPrice').value;
    const productImage = document.getElementById('whatsappProductImage').value;
    
    // Your WhatsApp number (include country code without + sign)
    const whatsappNumber = '9043950148'; // Replace with your number
    
    const message = `*NEW ORDER* 🛍️
    
*Product:* ${productName}
*Price:* $${productPrice}
*Quantity:* ${quantity}

*Customer Details:*
Name: ${name}
Phone: ${phone}
Address: ${address}

Please confirm this order and provide payment details.`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    
    // Reset and close form
    this.reset();
    closeWhatsAppForm();
});

// Close modal when clicking X
document.querySelector('.close-modal').addEventListener('click', closeWhatsAppForm);

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target === document.getElementById('whatsappFormModal')) {
        closeWhatsAppForm();
    }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    
    // In a real application, you would fetch products from your API:
    /*
    fetch('https://your-api-endpoint.com/products')
        .then(response => response.json())
        .then(data => {
            products = data;
            displayProducts();
        })
        .catch(error => console.error('Error fetching products:', error));
    */
});