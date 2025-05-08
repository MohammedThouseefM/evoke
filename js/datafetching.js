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