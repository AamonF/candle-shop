'use strict';

// Carousel functionality
const leftBtn = document.querySelector('.left');
const rightBtn = document.querySelector('.right');
const navCarousel = document.querySelector('.carousel-nav');
const carouselItems = Array.from(document.querySelectorAll('.carousel-item'));
const navItems = Array.from(document.querySelectorAll('.nav-item'));
const CAROUSEL_SIZE = carouselItems.length;

if (leftBtn && rightBtn) { // Ensure carousel buttons exist before adding event listeners
    leftBtn.addEventListener('click', swipeLeft);
    rightBtn.addEventListener('click', swipeRight);
    navCarousel.addEventListener('click', navButton);
}

function swipeLeft() {
    const currentCarouselItem = document.querySelector('.carousel-item.active');
    const currentIndex = carouselItems.indexOf(currentCarouselItem);

    let nextIndex = currentIndex === 0 ? CAROUSEL_SIZE - 1 : currentIndex - 1;

    carouselItems[nextIndex].classList.add('active');
    navItems[nextIndex].classList.add('active');
    currentCarouselItem.classList.remove('active');
    navItems[currentIndex].classList.remove('active');
}

function swipeRight() {
    const currentCarouselItem = document.querySelector('.carousel-item.active');
    const currentIndex = carouselItems.indexOf(currentCarouselItem);

    let nextIndex = currentIndex === CAROUSEL_SIZE - 1 ? 0 : currentIndex + 1;

    carouselItems[nextIndex].classList.add('active');
    navItems[nextIndex].classList.add('active');
    currentCarouselItem.classList.remove('active');
    navItems[currentIndex].classList.remove('active');
}

function navButton(e) {
    if (e.target.classList.contains('nav-item')) {
        const currentCarouselItem = document.querySelector('.carousel-item.active');
        const currentIndex = carouselItems.indexOf(currentCarouselItem);
        const nextIndex = navItems.indexOf(e.target);

        carouselItems[nextIndex].classList.add('active');
        navItems[nextIndex].classList.add('active');
        currentCarouselItem.classList.remove('active');
        navItems[currentIndex].classList.remove('active');
    }
}

// Modal functionality
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("modal");
    const btn = document.getElementById("modalButton");
    const span = document.querySelector(".close");

    if (btn && modal && span) { // Ensure modal elements exist before adding event listeners
        btn.onclick = function () {
            modal.style.display = "block";
        };
        span.onclick = function () {
            modal.style.display = "none";
        };
        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        };
    }

    // Feel Good Quotes Button functionality
    const feelGoodQuotesButton = document.getElementById('feelGoodQuotesButton');
    if (feelGoodQuotesButton) {
        feelGoodQuotesButton.addEventListener('click', () => {
            fetch('https://zenquotes.io/api/random/5ef231ce9c345c1f2d3005db3aa05381?custom=true')
                .then(response => response.json())
                .then(data => {
                    const quote = data[0]?.q || "No quote available at the moment.";
                    const author = data[0]?.a || "Unknown";
                    alert(`"${quote}"\n- ${author}`);
                })
                .catch(error => {
                    console.error("Error fetching quote:", error);
                    alert("Sorry, couldn't fetch a quote at the moment.");
                });
        });
    }
});

// Search Pages functionality
function searchPages() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const pages = {
        home: 'index.html',
        'limited edition': 'Limited_Edition.html',
        popular: 'Popular_Candles.html',
        all: 'All_Candles.html',
        'about us': 'About_us.html',
    };

    if (pages[query]) {
        window.location.href = pages[query];
    } else {
        alert('Page not found. Please try searching for Home, Limited Edition, Popular, All, or About Us.');
    }
}
