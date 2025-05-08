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
    const whatsappNumber = '7826080800'; // your number
    
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

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formResponse = document.getElementById('formResponse');
    
    // Form submission handler
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Get form data
        const formData = {
            name: document.getElementById('contactName').value.trim(),
            email: document.getElementById('contactEmail').value.trim(),
            subject: document.getElementById('contactSubject').value.trim(),
            message: document.getElementById('contactMessage').value.trim()
        };
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        try {
            // In a real application, you would send this to your backend
            // For this example, we'll simulate an API call
            const response = await simulateApiCall(formData);
            
            // Show success message
            showResponse('success', 'Message sent successfully! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        } catch (error) {
            // Show error message
            showResponse('error', 'Failed to send message. Please try again later.');
            console.error('Error:', error);
        } finally {
            // Reset button state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
    
    // Form validation
    function validateForm() {
        let isValid = true;
        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const message = document.getElementById('contactMessage').value.trim();
        
        // Reset error states
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('invalid');
        });
        
        // Validate name
        if (name === '') {
            document.getElementById('nameError').textContent = 'Name is required';
            document.getElementById('contactName').parentElement.classList.add('invalid');
            isValid = false;
        } else if (name.length < 2) {
            document.getElementById('nameError').textContent = 'Name must be at least 2 characters';
            document.getElementById('contactName').parentElement.classList.add('invalid');
            isValid = false;
        }
        
        // Validate email
        if (email === '') {
            document.getElementById('emailError').textContent = 'Email is required';
            document.getElementById('contactEmail').parentElement.classList.add('invalid');
            isValid = false;
        } else if (!isValidEmail(email)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email';
            document.getElementById('contactEmail').parentElement.classList.add('invalid');
            isValid = false;
        }
        
        // Validate message
        if (message === '') {
            document.getElementById('messageError').textContent = 'Message is required';
            document.getElementById('contactMessage').parentElement.classList.add('invalid');
            isValid = false;
        } else if (message.length < 10) {
            document.getElementById('messageError').textContent = 'Message must be at least 10 characters';
            document.getElementById('contactMessage').parentElement.classList.add('invalid');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Show response message
    function showResponse(type, message) {
        formResponse.textContent = message;
        formResponse.className = 'form-response ' + type;
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formResponse.style.display = 'none';
        }, 5000);
    }
    
    // Simulate API call (replace with real fetch in production)
    function simulateApiCall(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate random success/failure for demo
                const isSuccess = Math.random() > 0.2; // 80% success rate
                
                if (isSuccess) {
                    console.log('Form data:', data);
                    resolve({ status: 'success' });
                } else {
                    reject(new Error('Network error'));
                }
            }, 1500); // Simulate network delay
        });
    }
    
    // Real implementation would look like this:
    /*
    async function sendContactForm(data) {
        try {
            const response = await fetch('https://your-api-endpoint.com/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            return await response.json();
        } catch (error) {
            throw error;
        }
    }
    */
});

// // server.js
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const app = express();

// app.use(cors());
// app.use(bodyParser.json());

// // Contact form endpoint
// app.post('/api/contact', (req, res) => {
//     const { name, email, subject, message } = req.body;
    
//     // Validate input
//     if (!name || !email || !message) {
//         return res.status(400).json({ error: 'Missing required fields' });
//     }
    
//     // In a real application, you would:
//     // 1. Save to database
//     // 2. Send email notification
//     // 3. Maybe send confirmation email to user
    
//     console.log('New contact message:', { name, email, subject, message });
    
//     // Simulate processing delay
//     setTimeout(() => {
//         res.json({ 
//             success: true,
//             message: 'Your message has been received. We will contact you soon.'
//         });
//     }, 1000);
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
