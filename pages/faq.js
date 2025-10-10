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
                el.style.cursor = "pointer"; 
                el.addEventListener("click", () => {
                    window.location.href = url;
                });
            }
        });

        const toggleBtn = document.getElementById("menu_toggle");
        const menu = document.getElementById("menu_more");
        const menu_title = document.getElementById("title");

        if (toggleBtn && menu) {
            toggleBtn.addEventListener("click", () => {
                menu.classList.toggle("active"); // match CSS
            });
        } else {
            console.error("Menu toggle button not found");
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

    // End
    fetch('end.html')
        .then(response => response.text())
        .then(html => document.getElementById('end_container').innerHTML = html);
});
