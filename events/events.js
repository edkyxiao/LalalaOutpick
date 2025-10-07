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

    // Back
    document.getElementById("back_to_events").addEventListener("click", function() {
        window.location.href = "../events.html";
    });

    // Image Carousel
    const mainImg = document.getElementById('main_img');
    const thumbnails = document.querySelectorAll('.row_images img');

    let currentIndex = 0;

    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            if(index === currentIndex) return; 

            const direction = index > currentIndex ? 1 : -1; 

            // Slide out current image
            mainImg.style.transform = `translateX(${-100 * direction}%)`;
            mainImg.style.opacity = '0';

            setTimeout(() => {
                // Change image
                mainImg.src = thumb.src;

                // Position new image off-screen opposite direction
                mainImg.style.transform = `translateX(${100 * direction}%)`;

                setTimeout(() => {
                    // Slide in
                    mainImg.style.transform = 'translateX(0)';
                    mainImg.style.opacity = '1';
                }, 50);

                currentIndex = index; 
            }, 400); 
        });
    });

    // End
    fetch('end.html')
        .then(response => response.text())
        .then(html => document.getElementById('end_container').innerHTML = html);

});
