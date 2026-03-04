   (function() {
            // menu toggle
            const toggle = document.querySelector('.menu-toggle');
            const nav = document.querySelector('.nav-links');
            toggle?.addEventListener('click', ()=> {
                nav.classList.toggle('active');
                toggle.querySelector('i').classList.toggle('fa-bars');
                toggle.querySelector('i').classList.toggle('fa-times');
            });

            // header scroll
            const header = document.getElementById('header');
            window.addEventListener('scroll', ()=> {
                header.classList.toggle('scrolled', window.scrollY > 60);
            });

            // smooth scroll
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const id = this.getAttribute('href');
                    if(id === '#') return;
                    const el = document.querySelector(id);
                    if(el) window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' });
                    if(nav.classList.contains('active')) {
                        nav.classList.remove('active');
                        toggle.querySelector('i').classList.add('fa-bars');
                        toggle.querySelector('i').classList.remove('fa-times');
                    }
                });
            });

            // animation barres de compétences
            const fillBars = document.querySelectorAll('.skill-fill');
            function animateBars() {
                fillBars.forEach(bar => {
                    const w = bar.getAttribute('data-width');
                    if (w && bar.style.width !== w+'%') bar.style.width = w + '%';
                });
            }

            // Intersection pour déclencher l'animation
            const skillsSec = document.querySelector('.skills');
            if (skillsSec) {
                const obs = new IntersectionObserver((entries)=> {
                    entries.forEach(entry => {
                        if(entry.isIntersecting) animateBars();
                    });
                }, { threshold: 0.3 });
                obs.observe(skillsSec);
            }

            // fade-in scroll
            const faders = document.querySelectorAll('.fade-in');
            const fadeObserver = new IntersectionObserver((entries)=> {
                entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting));
            }, { threshold: 0.2, rootMargin: '20px' });
            faders.forEach(f => fadeObserver.observe(f));

            // EmailJS
            emailjs.init("8Ndaj1LfL0VzIPjiA");
            const cf = document.getElementById('contact-form');
            if(cf) {
                cf.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const status = document.getElementById('form-status');
                    status.textContent = "envoi...";
                    emailjs.sendForm('service_svrycie', 'template_1dltnh7', this)
                        .then(() => {
                            status.style.color = "#00D4FF";
                            status.textContent = "message envoyé !";
                            cf.reset();
                        }, (err) => {
                            status.style.color = "tomato";
                            status.textContent = "échec, vérifie la config";
                            console.error(err);
                        });
                });
            }

            // petite préanimation au cas où
            setTimeout(animateBars, 300);
        })();