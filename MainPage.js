const carousel = document.querySelector(".carousel");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");
const items = document.querySelectorAll(".carousel-item");
const description = document.querySelector(".carousel-description p");
const name = document.querySelector(".carousel-description h1");
const arrow = document.querySelector(".arrow img")
const scale = document.querySelector(".scale img")
const cardWrappers = document.querySelectorAll(".card-wrapper");
const mainPageButton = document.querySelector(".learn-more-btn");
const SecondPage = document.querySelector(".catalogue-bg");
const FirstPage = document.querySelector(".main-part-bg");
const BeginningWin = document.querySelector(".beginning");

const scrollAmount = 350;

mainPageButton.addEventListener("click", () => {
    FirstPage.style.display = "none";
    BeginningWin.style.display = "none";
    SecondPage.style.display = "block";
    setTimeout(() => {
        scrollToTop();
    }, 0);
})

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