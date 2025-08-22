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

    // End
    fetch('end.html')
        .then(response => response.text())
        .then(html => document.getElementById('end_container').innerHTML = html);

    // Doco carousel
    const track = document.querySelector(".carousel");
    const images = ["images/photos/outpicker.png", 
                    "images/photos/outpicker2.png", 
                    "images/photos/outpicker3.png",
                    "images/photos/outpicker4.png"];
    let currentIndex = 0;

    function showNextImage() {
    const nextIndex = (currentIndex + 1) % images.length;

    // Add the next image to the end
    const nextImg = document.createElement("img");
    nextImg.src = images[nextIndex];
    track.appendChild(nextImg);
    
    // Slide left
    requestAnimationFrame(() => {
        track.style.transform = "translateX(-700px)"; // match width
    });
    
    // After animation ends
    track.addEventListener("transitionend", function handler() {
        track.removeEventListener("transitionend", handler);
        // Remove the first image
        track.removeChild(track.firstElementChild);
        // Reset position
        track.style.transition = "none";
        track.style.transform = "translateX(0)";
        // Force reflow before re-enabling transition
        void track.offsetWidth;
        track.style.transition = "transform 0.5s ease";
        
        currentIndex = nextIndex;
    });
    }
    function showPrevImage() {
        const prevIndex = (currentIndex - 1 + images.length) % images.length;

        // Add the previous image to the start
        const prevImg = document.createElement("img");
        prevImg.src = images[prevIndex];
        track.insertBefore(prevImg, track.firstElementChild);

        // Start offset to the left (so it looks like we're sliding right)
        track.style.transition = "none";
        track.style.transform = "translateX(-700px)"; // match width

        // Force reflow before moving to 0
        void track.offsetWidth;

        // Slide right into place
        track.style.transition = "transform 0.5s ease";
        track.style.transform = "translateX(0)";

        // After animation ends
        track.addEventListener("transitionend", function handler() {
            track.removeEventListener("transitionend", handler);
            // Remove the last image
            track.removeChild(track.lastElementChild);
            currentIndex = prevIndex;
        });
    }

    document.getElementById("nextBtn").addEventListener("click", showNextImage);
    document.getElementById("prevBtn").addEventListener("click", showPrevImage);
});