const carousel = document.querySelector(".carousel");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");
const items = document.querySelectorAll(".carousel-item");
const description = document.querySelector(".carousel-description p");
const name = document.querySelector(".carousel-description h1");

const scrollAmount = 350;

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
        const nameText = selectedItem.dataset.name || "No name avialable";
        const descriptionText = selectedItem.dataset.description || "No description available";
        description.textContent = descriptionText;
        name.textContent = nameText;
    }

    if (isPrev !== null) {
        if (isPrev) {
            // Якщо це перша картка
            if (carousel.scrollLeft === 0) {
                const firstItem = items[0];
                firstItem.style.boxShadow = "6px 6px 12px rgba(167, 181, 253, 0.3)";
                selectedItem.style.boxShadow = "none";
            }
        } else {
            // Якщо це остання картка
            if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth) {
                const lastItem = items[items.length - 1];
                lastItem.style.boxShadow = "6px 6px 12px rgba(167, 181, 253, 0.3)";
                selectedItem.style.boxShadow = "none";
            }
        }
    }
}