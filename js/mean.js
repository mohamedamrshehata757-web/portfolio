// Smooth scrolling for navigation links
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

// Scroll navigation highlight - Updated for navbar
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    // Update navbar links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').substring(1);
        if (href === current) {
            link.classList.add('active');
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.pageYOffset > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 212, 255, 0.4)';
    } else {
        navbar.style.boxShadow = '0 2px 15px rgba(0, 212, 255, 0.2)';
    }
});

// Button interactions
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    button.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
});

// Get Started button action
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function() {
        const aboutSection = document.querySelector('#About');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Brand click to scroll to home
document.querySelector('.nav-brand')?.addEventListener('click', function() {
    const homeSection = document.querySelector('#Home');
    if (homeSection) {
        homeSection.scrollIntoView({ behavior: 'smooth' });
    }
});

// Page load animation
window.addEventListener('load', () => {
    document.body.style.animation = 'fadeIn 0.5s ease-out';
});

// Parallax effect on hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = `center ${window.pageYOffset * 0.5}px`;
    }
});

// Intersection Observer for element animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeIn 0.6s ease-out';
            
            // Animate progress bars when skills section comes into view
            if (entry.target.classList.contains('skills-section')) {
                const progressBars = entry.target.querySelectorAll('.progress');
                progressBars.forEach(bar => {
                    const percent = bar.getAttribute('data-percent');
                    setTimeout(() => {
                        bar.style.width = percent + '%';
                    }, 200);
                });
            }

            // Stagger project cards animation
            if (entry.target.classList.contains('projects-section')) {
                const projectCards = entry.target.querySelectorAll('.project-card');
                projectCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.animation = `slideInUp 0.6s ease-out forwards`;
                        card.style.opacity = '1';
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Project card hover effect with mouse tracking
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xPercent = (x / rect.width) * 10;
        const yPercent = (y / rect.height) * 10;
        
        this.style.transform = `perspective(1000px) rotateY(${xPercent - 5}deg) rotateX(${-(yPercent - 5)}deg)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateY(0)';
    });
});

// Project link click handler with scroll animation
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        alert('This would navigate to: ' + this.parentElement.parentElement.querySelector('h3').textContent);
    });
});

// Filter projects by technology (optional feature)
const projectTags = document.querySelectorAll('.tag');
projectTags.forEach(tag => {
    tag.addEventListener('click', function() {
        const tagText = this.textContent;
        const allCards = document.querySelectorAll('.project-card');
        
        allCards.forEach(card => {
            const hasTech = Array.from(card.querySelectorAll('.tag')).some(t => t.textContent === tagText);
            if (hasTech) {
                card.style.opacity = '1';
                card.style.pointerEvents = 'auto';
            } else {
                card.style.opacity = '0.5';
                card.style.pointerEvents = 'none';
            }
        });
    });
});

// Reset filter when clicking elsewhere
document.addEventListener('click', function(e) {
    if (!e.target.classList.contains('tag')) {
        const allCards = document.querySelectorAll('.project-card');
        allCards.forEach(card => {
            card.style.opacity = '1';
            card.style.pointerEvents = 'auto';
        });
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validate form
        if (name.trim() && email.trim() && subject.trim() && message.trim()) {
            // Show success message
            const submitBtn = contactForm.querySelector('.btn-contact');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '✓ Message Sent!';
            submitBtn.style.background = 'linear-gradient(90deg, #00ff00, #00aa00)';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = 'linear-gradient(90deg, #00D4FF, #0084ff)';
            }, 3000);
            
            console.log('Form submitted:', { name, email, subject, message });
        }
    });
}

// Form input animations
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.animation = 'slideInUp 0.3s ease-out';
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.style.borderColor = 'rgba(0, 212, 255, 0.2)';
        }
    });
});

// Social icon click handlers
document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('click', function(e) {
        e.preventDefault();
        const social = this.getAttribute('title');
        alert(`Connect on ${social}: ${social.toLowerCase().replace(/\s/g, '')}.com/yourprofile`);
    });
});

// Info card animations
document.querySelectorAll('.info-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});



