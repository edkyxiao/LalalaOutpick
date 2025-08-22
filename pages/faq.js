document.addEventListener("DOMContentLoaded", () => {
    // Display menu
    fetch('menu.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('menu_container').innerHTML = html;

        const navItems = [
            { id: 'menu_about', url: 'about.html' },
            { id: 'menu_doco', url: 'doco.html' },
            { id: 'menu_events', url: 'events.html' },
            { id: 'menu_faq', url: 'faq.html' },
            { id: 'menu_contact', url: 'contact.html' },
        ];

        navItems.forEach(({ id, url }) => {
            const el = document.getElementById(id);
            if (el) {
                el.style.cursor = "pointer"; // better UX
                el.addEventListener("click", () => {
                    window.location.href = url;
                });
            }
        });

        const toggleBtn = document.getElementById("menu_toggle");
        const menu = document.getElementById("menu_more");
        const menu_title = document.getElementById("title");

        if (toggleBtn && menu && menu_title) {
            toggleBtn.addEventListener("click", () => {
                menu.classList.toggle("show");
                menu_title.classList.toggle("hide");
            });
        } else {
            console.error("Menu toggle button, menuMore or title element not found");
        }

        // Back to top button
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            window.addEventListener('scroll', () => {
                backToTop.style.display = window.scrollY > 400 ? 'block' : 'none';
            });
            backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    });

    // Images
    const images = document.querySelectorAll('.fade_image');

    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        entry.target.classList.add('visible');   // fade in
        } else {
        entry.target.classList.remove('visible'); // fade out when scrolled past
        }
    });
    }, { threshold: 0.2 }); // 20% of image must be visible

    images.forEach(img => observer.observe(img));

    // End
    fetch('end.html')
        .then(response => response.text())
        .then(html => document.getElementById('end_container').innerHTML = html);
});