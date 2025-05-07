const carousel = document.querySelector(".carousel");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");
const items = document.querySelectorAll(".carousel-item");
const description = document.querySelector(".carousel-description p");
const name = document.querySelector(".carousel-description h1");
const arrow = document.querySelector(".arrow img")
const scale = document.querySelector(".scale img")
const cardWrappers = document.querySelectorAll(".card-wrapper");
const mainPageButton = document.querySelectorAll(".learn-more-btn");
const SecondPage = document.querySelector(".catalogue-bg");
const FirstPage = document.querySelector(".main-part-bg");
const BeginningWin = document.querySelector(".beginning");
const catalogueLink = document.querySelector(".catalogue-page-link")
const instaLink = document.querySelector(".link-inst")
const copyLink = document.querySelector(".link-copy")
const gmailLink = document.querySelector(".link-gmail")
const popup = document.querySelector(".popup");
const popupText = document.querySelector(".popup-text")


const scrollAmount = 350;

mainPageButton.forEach(button => {
    button.addEventListener("click", () => {
        SecondPage.style.display = "block";
        FirstPage.style.display = "none";
        BeginningWin.style.display = "none";

        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    });
});

instaLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.open("https://www.instagram.com/", "_blank");
});
gmailLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.open("https://accounts.google.com/InteractiveLogin?hl=ru&service=mail&ifkv=AaSxoQwaNW0eWg2ekYjflSsxcn5Rx6VUh2IdO7vJCqDr7gzBI0JpF5TvqegDRDP4UYCqRJ3I-CyDjA", "_blank");
});
copyLink.addEventListener("click", (event) => {
    event.preventDefault();
    const copytext = "123 456 78 90"
    navigator.clipboard.writeText(copytext)
        .then(() => {
            popup.classList.add("active");
            setTimeout(() => {
                popup.classList.remove("active");
            }, 3000);
        })
        .catch(err => {
            popupText.textContent = "Failed to copy text";
            popup.classList.add("active");
            setTimeout(() => {
                popup.classList.remove("active");
            }, 3000);
        });

});

document.addEventListener("click", (event) => {
    const target = event.target;

    if (target === catalogueLink) {
        event.preventDefault(); 

        SecondPage.style.display = "block";
        FirstPage.style.display = "none";
        BeginningWin.style.display = "none";

        document.documentElement.scrollTop = 0; 
        document.body.scrollTop = 0; 
    }

    if (target === ratingLink) {
        event.preventDefault();

        console.log("Натиснули на ratingLink");
    }
});

btnPrev.addEventListener("click", () => {
    carousel.scrollBy({
        left: -scrollAmount,
        behavior: "smooth"
    });
    centerItem(true);
});

btnNext.addEventListener("click", () => {
    carousel.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
    });
    centerItem(false);
});

document.addEventListener("DOMContentLoaded", () => {
    centerItem(); 
});
carousel.addEventListener("scroll", centerItem);

function centerItem(isPrev = null) {
    const center = carousel.offsetWidth / 2 + carousel.scrollLeft;

    let selectedItem = null;

    items.forEach((item, index) => {
        const itemStart = item.offsetLeft;
        const itemEnd = itemStart + item.offsetWidth;

        if (center > itemStart && center < itemEnd) {
            selectedItem = item;
            item.style.boxShadow = "6px 6px 12px rgba(167, 181, 253, 0.3)";
        } else {
            item.style.boxShadow = "none";
        }
    });

    if (selectedItem) {
        const nameText = selectedItem.dataset.name || "немає назви";
        const descriptionText = selectedItem.dataset.description || "немає опису";
        description.textContent = descriptionText;
        name.textContent = nameText;
        const depth = selectedItem.dataset.depth;
        if (depth) {
            const scaleWidth = scale.offsetWidth;
            const func = new Function('scaleWidth', `return ${depth};`);
            const result = func(scaleWidth);
            arrow.style.transform = `translateX(${result}px)`;
    }
}
        

    if (isPrev !== null) {
        if (isPrev) {
            // Якщо це перша картка
            if (carousel.scrollLeft === 0) {
                const firstItem = items[0];
                firstItem.style.boxShadow = "6px 6px 12px rgba(167, 181, 253, 0.3)";
                selectedItem.style.boxShadow = "none";
                const nameText = firstItem.dataset.name || "немає назви"
                const descriptionText = firstItem.dataset.description || "немає опису";
                description.textContent = descriptionText;
                name.textContent = nameText;
                const depth = firstItem.dataset.depth;
                    if (depth) {
                        const scaleWidth = scale.offsetWidth;
                        const func = new Function('scaleWidth', `return ${depth};`);
                        const result = func(scaleWidth);
                        arrow.style.transform = `translateX(${result}px)`;
                    }
            }
        } else {
            // Якщо це остання картка
            if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth) {
                const lastItem = items[items.length - 1];
                lastItem.style.boxShadow = "6px 6px 12px rgba(167, 181, 253, 0.3)";
                selectedItem.style.boxShadow = "none";
                const nameText = lastItem.dataset.name || "немає назви"
                const descriptionText = lastItem.dataset.description || "немає опису";
                description.textContent = descriptionText;
                name.textContent = nameText;
                const depth = lastItem.dataset.depth;
                    if (depth) {
                        const scaleWidth = scale.offsetWidth;
                        const func = new Function('scaleWidth', `return ${depth};`);
                        const result = func(scaleWidth);
                        arrow.style.transform = `translateX(${result}px)`;
                    }
            }
        }
    }
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show"); 
            const card = entry.target.querySelector(".card");
            if (card) {
                card.classList.add("show");
            }
        }
    });
}, { threshold: 0.2 });

cardWrappers.forEach(wrapper => {
    observer.observe(wrapper);
});