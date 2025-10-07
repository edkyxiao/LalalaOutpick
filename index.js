// Carousel
document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;
    const images = carousel.querySelectorAll('img');
    const imageCount = images.length;

    // Clone first image and append it to the end for seamless looping
    const firstClone = images[0].cloneNode(true);
    carousel.appendChild(firstClone);

    let currentIndex = 0;
    const totalSlides = imageCount + 1; // original + clone

    // Preload images
    images.forEach(img => {
        const preload = new Image();
        preload.src = img.src;
    });

    function showImage(index) {
        carousel.style.transition = 'transform 0.5s ease-in-out';
        carousel.style.transform = `translateX(-${index * 100}%)`;
    }

    // Initial display
    setTimeout(() => {
        showImage(currentIndex);
    }, 200);

    // Slide every 2 seconds
    setInterval(() => {
        currentIndex++;
        showImage(currentIndex);

        // When reaching the cloned slide (last one), reset to the real first slide
        if (currentIndex === totalSlides - 1) {
            setTimeout(() => {
                carousel.style.transition = 'none';  // disable transition for instant jump
                currentIndex = 0;
                carousel.style.transform = `translateX(0)`;
            }, 500); // make sure this matched with CSS transition duration
        }
    }, 3000);

    // From Home to About page
    const content = document.querySelector(".content_home");

    if (content) {
        // Listen for a click anywhere on the page
        document.addEventListener("click", () => {
            // Trigger fade-out animation
            content.classList.add("fade-out");

            // After the transition, go to About page
            content.addEventListener("transitionend", () => {
                window.location.href = "pages/about.html";
            }, { once: true });
        });
    } else return;
});
