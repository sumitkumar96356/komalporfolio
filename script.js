document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       MOBILE MENU TOGGLE
       ========================================================================== */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
            document.body.classList.toggle('no-scroll');
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('open');
                navMenu.classList.remove('open');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    /* ==========================================================================
       STICKY NAVBAR & ACTIVE NAV LINKS
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');

    const handleScroll = () => {
        // Sticky class
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Active link highlighting
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120; // adjust offset for sticky nav
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on load to set initial state
    handleScroll();

    /* ==========================================================================
       SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
       ========================================================================== */
    const revealItems = document.querySelectorAll('.reveal-item');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                // Stop observing after reveal to keep it visible and optimize performance
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px'
    });

    revealItems.forEach(item => {
        revealObserver.observe(item);
    });

    /* ==========================================================================
       TYPEWRITER EFFECT
       ========================================================================== */
    const typewriter = document.getElementById('typewriter');
    
    if (typewriter) {
        const words = [
            "Telecalling & Customer Relationship Professional",
            "Lead Generation & Client Relations Specialist",
            "Customer Support & Operations Expert"
        ];
        
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 80;
        let deleteSpeed = 40;
        let delayBetweenWords = 2000;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                // Remove character
                typewriter.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                // Add character
                typewriter.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            // Determine typing speed
            let currentSpeed = isDeleting ? deleteSpeed : typeSpeed;

            // If word is completely typed
            if (!isDeleting && charIndex === currentWord.length) {
                currentSpeed = delayBetweenWords;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                // Move to next word
                wordIndex = (wordIndex + 1) % words.length;
                currentSpeed = 500; // Pause before typing next word
            }

            setTimeout(type, currentSpeed);
        }

        // Start typing
        setTimeout(type, 1000);
    }
});
