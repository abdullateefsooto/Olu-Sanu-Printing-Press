// ============================================
// HAMBURGER MENU TOGGLE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('main-nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            nav.classList.toggle('open');
        });

        // Close menu when a link is clicked (for mobile)
        document.querySelectorAll('nav ul li a').forEach(function(link) {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                nav.classList.remove('open');
            });
        });
    }
});

// ============================================
// HEADER SCROLL EFFECT
// ============================================
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', function() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// SMOOTH SCROLL FOR ALL ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// ANIMATE STAT NUMBERS ON SCROLL
// ============================================
const statNumbers = document.querySelectorAll('.stat-number');

const animateNumbers = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const text = el.textContent;
            // Only animate if it's a number
            if (!isNaN(text.replace('+', '').trim())) {
                const target = parseInt(text.replace('+', '').trim());
                let current = 0;
                const increment = Math.ceil(target / 40);
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        el.textContent = text.includes('+') ? target + '+' : target;
                        clearInterval(timer);
                    } else {
                        el.textContent = current;
                    }
                }, 40);
            }
            observer.unobserve(el);
        }
    });
};

const observer = new IntersectionObserver(animateNumbers, {
    threshold: 0.5
});

statNumbers.forEach(num => {
    observer.observe(num);
});

// ============================================
// SERVICE CARD ANIMATION (Intersection Observer)
// ============================================
const serviceCards = document.querySelectorAll('.service-card');

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

serviceCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    cardObserver.observe(card);
});

console.log('🚀 Olu-Sanu Global Limited website loaded successfully!');
console.log('📧 For support: olusanugloballimited@gmail.com');
console.log('📞 Call us: 08066200781');

// ============================================
// EMAILJS CONTACT FORM
// ============================================

// Initialize EmailJS with your Public Key
(function() {
    emailjs.init({
        publicKey: "cpoMhUuVr2W6Pf90k", // ← REPLACE WITH YOUR KEY
    });
})();

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const statusDiv = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const btn = document.getElementById('sendBtn');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            btn.disabled = true;

            statusDiv.style.display = 'block';
            statusDiv.style.color = '#ffffff';
            statusDiv.innerHTML = 'Sending your message...';

            // Get form data
            const from_name = document.getElementById('from_name').value;
            const from_email = document.getElementById('from_email').value;
            const from_phone = document.getElementById('from_phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Create email parameters
            const templateParams = {
                from_name: from_name,
                from_email: from_email,
                from_phone: from_phone,
                subject: subject,
                message: message,
                to_email: 'olusanugloballimited@gmail.com'
            };

            // Send email using EmailJS
            emailjs.send(
                'service_88oimeu',  // ← REPLACE WITH YOUR SERVICE ID
                'template_jyuqrul', // ← REPLACE WITH YOUR TEMPLATE ID
                templateParams
            )
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                statusDiv.style.color = '#22c55e';
                statusDiv.innerHTML = '✅ Message sent successfully! We\'ll get back to you shortly.';
                form.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;

                setTimeout(() => {
                    statusDiv.style.display = 'none';
                    statusDiv.innerHTML = '';
                }, 5000); // Hide status after 5 seconds
            })
            .catch(function(error) {
                console.log('FAILED...', error);
                statusDiv.style.color = '#ef4444';
                statusDiv.innerHTML = '❌ Failed to send. Please try again or call us directly.';
                btn.innerHTML = originalText;
                btn.disabled = false;
            });
        });
    }
});

// ============================================
// CERTIFICATE MODAL
// ============================================

function openModal(certType) {
    const modal = document.getElementById('cert-modal');
    const modalImg = document.getElementById('cert-modal-img');
    const modalTitle = document.getElementById('cert-modal-title');

    if (!modal || !modalImg || !modalTitle) return;

    if (certType === 'cert-cac') {
        modalImg.src = './assets/images/2024.png';
        modalTitle.textContent = 'Certificate of Incorporation - OLU-SANU GLOBAL LTD';
    } else if (certType === 'cert-business') {
        modalImg.src = './assets/images/1979.png';
        modalTitle.textContent = 'Business Name Registration - OLU-SANU PAINTING PRESS';
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('cert-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close modal on background click
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('cert-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });

        // Close with ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    }
});