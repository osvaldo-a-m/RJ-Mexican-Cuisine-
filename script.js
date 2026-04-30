document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize AOS Animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 600,
            easing: 'ease-out',
            once: true,
            offset: 0,
            disable: window.innerWidth < 900
        });
    }

    // 2. Initialize Swiper for Testimonials
    if (typeof Swiper !== 'undefined') {
        new Swiper('.testimonialsSwiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
        });
    }

    // 3. Navbar Scroll Effect & Mobile Menu Toggle
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            });
        });
    }

    // 4. n8n Webhook URLs (Replace placeholder URLs with actual webhooks)
    const webhooks = {
        catering: 'https://backyou-n8n.pf0hps.easypanel.host/webhook/3baa2633-ad77-4d61-af35-0cc73e551741',
        promo: 'https://backyou-n8n.pf0hps.easypanel.host/webhook/6391b495-d9fa-4a97-8d7e-1169fc4efa19',
        wedding: 'https://backyou-n8n.pf0hps.easypanel.host/webhook/9bb1270f-15bc-4991-8299-b4ec01ba8e93'
    };

    // 5. Handle Catering Form Submission
    const cateringForm = document.getElementById('cateringForm');
    if (cateringForm) {
        cateringForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btn = cateringForm.querySelector('button[type="submit"]');
            const feedback = document.getElementById('cateringFeedback');
            const originalBtnText = btn.innerHTML;

            // Gather data
            const formData = new FormData(cateringForm);
            const dataObj = Object.fromEntries(formData.entries());
            dataObj.formType = 'catering';

            btn.innerHTML = 'Sending...';
            btn.disabled = true;

            try {
                const response = await fetch(webhooks.catering, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dataObj)
                });

                if (response.ok) {
                    feedback.className = 'form-feedback success';
                    feedback.innerHTML = 'Thank you! Your inquiry has been sent.';
                    feedback.style.color = 'green';
                    cateringForm.reset();
                } else {
                    throw new Error('Network response structure was not ok.');
                }
            } catch (error) {
                console.error("Webhook Error:", error);
                if (feedback) {
                    feedback.className = 'form-feedback error';
                    feedback.innerHTML = 'Oops! Something went wrong. Please try calling us instead.';
                    feedback.style.color = 'red';
                }
            } finally {
                btn.innerHTML = originalBtnText;
                btn.disabled = false;
                setTimeout(() => { if (feedback) feedback.style.display = 'none'; }, 5000);
            }
        });
    }

    // 6. Handle Promo Queso Form Submission
    const promoForm = document.getElementById('promoForm');
    if (promoForm) {
        promoForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btn = promoForm.querySelector('button[type="submit"]');
            const feedback = document.getElementById('promoFeedback');
            const originalBtnText = btn.innerHTML;

            const formData = new FormData(promoForm);
            const dataObj = Object.fromEntries(formData.entries());
            dataObj.formType = 'promo_queso';

            btn.innerHTML = 'Wait...';
            btn.disabled = true;

            try {
                const response = await fetch(webhooks.promo, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dataObj)
                });

                if (response.ok) {
                    btn.innerHTML = 'Claimed!';
                    if (feedback) {
                        feedback.className = 'form-feedback success';
                        feedback.innerHTML = 'Check your email for the coupon!';
                        feedback.style.color = 'green';
                    }
                    promoForm.reset();
                } else {
                    throw new Error('Error');
                }
            } catch (error) {
                console.error("Webhook Error:", error);
                if (feedback) {
                    feedback.className = 'form-feedback error';
                    feedback.innerHTML = 'Error applying. Try again later.';
                    feedback.style.color = 'red';
                }
                btn.innerHTML = originalBtnText;
                btn.disabled = false;
            }
        });
    }

    // 7. Handle Wedding Catering Form Submission
    const weddingForm = document.getElementById('weddingForm');
    if (weddingForm) {
        weddingForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btn = weddingForm.querySelector('button[type="submit"]');
            const feedback = document.getElementById('weddingFeedback');
            const originalBtnText = btn.innerHTML;

            const formData = new FormData(weddingForm);
            const dataObj = Object.fromEntries(formData.entries());
            dataObj.formType = 'wedding_catering';

            btn.innerHTML = 'Sending...';
            btn.disabled = true;
            if (feedback) feedback.style.display = 'block';

            try {
                const response = await fetch(webhooks.wedding, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dataObj)
                });

                if (response.ok) {
                    if (feedback) {
                        feedback.innerHTML = 'Thank you! Your wedding inquiry has been sent.';
                        feedback.style.color = 'green';
                    }
                    weddingForm.reset();
                } else {
                    throw new Error('Error');
                }
            } catch (error) {
                console.error("Webhook Error:", error);
                if (feedback) {
                    feedback.innerHTML = 'Oops! Something went wrong. Please try calling us instead.';
                    feedback.style.color = 'red';
                }
            } finally {
                btn.innerHTML = originalBtnText;
                btn.disabled = false;
                setTimeout(() => { if (feedback) feedback.style.display = 'none'; }, 7000);
            }
        });
    }
});
