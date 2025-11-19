// Portfolio Website JavaScript
// Modern data science portfolio with interactive components

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeSkillsChart();
    initializeProjectFilters();
    initializeContactForm();
    initializeScrollAnimations();
    initializeNavigation();
});

// Animation initialization using Anime.js
function initializeAnimations() {
    // Hero typewriter effect
    if (document.querySelector('.hero-title')) {
        new Typed('.hero-title', {
            strings: ['Archel Taneka Sutanto', 'Data Science Student', 'ML Enthusiast'],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }

    // Stagger animation for cards
    anime({
        targets: '.project-card',
        translateY: [50, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        duration: 800,
        easing: 'easeOutQuart'
    });

    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach((bar, index) => {
        const width = bar.dataset.width;
        anime({
            targets: bar,
            width: width + '%',
            delay: index * 200,
            duration: 1000,
            easing: 'easeOutQuart'
        });
    });
}

// Interactive skills radar chart using ECharts
function initializeSkillsChart() {
    const chartContainer = document.getElementById('skills-chart');
    if (!chartContainer) return;

    const chart = echarts.init(chartContainer);
    
    const skillsData = [
        { name: 'Python', value: 95 },
        { name: 'R Programming', value: 80 },
        { name: 'SQL', value: 85 },
        { name: 'Pandas/NumPy', value: 90 },
        { name: 'Scikit-learn', value: 85 },
        { name: 'Data Visualization', value: 80 },
        { name: 'Tableau/Power BI', value: 75 },
        { name: 'Git/GitHub', value: 85 },
        { name: 'Jupyter Notebook', value: 90 },
        { name: 'Statistics & EDA', value: 85 }
    ];

    const option = {
        backgroundColor: 'transparent',
        radar: {
            indicator: skillsData.map(skill => ({
                name: skill.name,
                max: 100
            })),
            center: ['50%', '50%'],
            radius: '70%',
            axisLine: {
                lineStyle: {
                    color: '#7c9885'
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#e5e7eb'
                }
            },
            axisLabel: {
                color: '#6b7280',
                fontSize: 12
            },
            name: {
                textStyle: {
                    color: '#1a1a1a',
                    fontSize: 14,
                    fontWeight: 'bold'
                }
            }
        },
        series: [{
            type: 'radar',
            data: [{
                value: skillsData.map(skill => skill.value),
                name: 'Technical Skills',
                areaStyle: {
                    color: 'rgba(124, 152, 133, 0.3)'
                },
                lineStyle: {
                    color: '#7c9885',
                    width: 2
                },
                itemStyle: {
                    color: '#7c9885'
                }
            }]
        }]
    };

    chart.setOption(option);
    
    // Responsive chart
    window.addEventListener('resize', () => {
        chart.resize();
    });
}

// Project filtering system
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const searchInput = document.getElementById('project-search');

    // Add click handlers for project cards
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.dataset.project;
            if (projectId) {
                window.location.href = `project-details.html?project=${projectId}`;
            }
        });
    });

    // Filter by category
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const categories = card.dataset.categories.split(',');
                const shouldShow = filter === 'all' || categories.includes(filter);
                
                if (shouldShow) {
                    card.style.display = 'block';
                    anime({
                        targets: card,
                        opacity: [0, 1],
                        translateY: [20, 0],
                        duration: 300,
                        easing: 'easeOutQuart'
                    });
                } else {
                    anime({
                        targets: card,
                        opacity: [1, 0],
                        translateY: [0, -20],
                        duration: 200,
                        easing: 'easeInQuart',
                        complete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            projectCards.forEach(card => {
                const title = card.querySelector('.project-title').textContent.toLowerCase();
                const description = card.querySelector('.project-description').textContent.toLowerCase();
                const shouldShow = title.includes(searchTerm) || description.includes(searchTerm);
                
                card.style.display = shouldShow ? 'block' : 'none';
            });
        });
    }
}

// Contact form handling
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!validateForm(data)) {
            showNotification('Please fill in all required fields correctly.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Sending message...', 'info');
        
        setTimeout(() => {
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        }, 2000);
    });

    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });
    });
}

// Form validation functions
function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return data.name && data.email && emailRegex.test(data.email) && data.message;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let message = '';

    switch (fieldName) {
        case 'name':
            isValid = value.length > 0;
            message = 'Name is required';
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
            message = 'Please enter a valid email address';
            break;
        case 'message':
            isValid = value.length > 10;
            message = 'Message must be at least 10 characters';
            break;
    }

    const errorElement = field.parentNode.querySelector('.error-message');
    if (!isValid) {
        field.classList.add('error');
        if (errorElement) {
            errorElement.textContent = message;
        }
    } else {
        field.classList.remove('error');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }

    return isValid;
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    anime({
        targets: notification,
        translateY: [-50, 0],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuart'
    });
    
    setTimeout(() => {
        anime({
            targets: notification,
            translateY: [0, -50],
            opacity: [1, 0],
            duration: 300,
            easing: 'easeInQuart',
            complete: () => {
                notification.remove();
            }
        });
    }, 4000);
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                if (element.classList.contains('fade-in')) {
                    anime({
                        targets: element,
                        opacity: [0, 1],
                        translateY: [30, 0],
                        duration: 800,
                        easing: 'easeOutQuart'
                    });
                }
                
                if (element.classList.contains('slide-in-left')) {
                    anime({
                        targets: element,
                        opacity: [0, 1],
                        translateX: [-50, 0],
                        duration: 800,
                        easing: 'easeOutQuart'
                    });
                }
                
                if (element.classList.contains('slide-in-right')) {
                    anime({
                        targets: element,
                        opacity: [0, 1],
                        translateX: [50, 0],
                        duration: 800,
                        easing: 'easeOutQuart'
                    });
                }
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe all animation elements
    const animationElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animationElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Navigation functionality
function initializeNavigation() {
    const nav = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Active link highlighting
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
}

// Theme toggle (dark/light mode)
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
}

// Export functions for global access
window.toggleMobileMenu = toggleMobileMenu;
window.toggleTheme = toggleTheme;