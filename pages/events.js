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

    // Events
    document.querySelectorAll('.event_button').forEach(btn => {
    btn.addEventListener('click', () => {
        window.location.href = btn.dataset.link;
    });
    });

    // Filter
    const yearSelect = document.getElementById('filter_year');
    const locationSelect = document.getElementById('filter_location');
    const events = document.querySelectorAll('.event_entry');

    function filterEvents() {
        const selectedYear = yearSelect.value;
        const selectedLocation = locationSelect.value;

        events.forEach(event => {
            const eventYear = event.dataset.year;
            const eventLocation = event.dataset.location;

            const matchesYear = selectedYear === 'all' || eventYear === selectedYear;
            const matchesLocation = selectedLocation === 'all' || eventLocation === selectedLocation;

            if (matchesYear && matchesLocation) {
                event.style.display = 'grid'; // show
            } else {
                event.style.display = 'none'; // hide
            }
        });

        const pins = document.querySelectorAll('.pin');
        pins.forEach(pin => {
            const pinYear = pin.dataset.year;
            const pinLocation = pin.dataset.location;

            const matchesYear = selectedYear === 'all' || pinYear === selectedYear;
            const matchesLocation = selectedLocation === 'all' || pinLocation === selectedLocation;

            pin.style.display = (matchesYear && matchesLocation) ? 'block' : 'none';
        });
    }

    yearSelect.addEventListener('change', filterEvents);
    locationSelect.addEventListener('change', filterEvents);


    // End
    fetch('end.html')
        .then(response => response.text())
        .then(html => document.getElementById('end_container').innerHTML = html);
});