// Отримання елементів
const carousel = document.querySelector(".carousel");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");
const items = document.querySelectorAll(".carousel-item");
const description = document.querySelector(".carousel-description p");
const name = document.querySelector(".carousel-description h1");
const arrow = document.querySelector(".arrow img");
const scale = document.querySelector(".scale img");
const cardWrappers = document.querySelectorAll(".card-wrapper");
const mainPageButton = document.querySelectorAll(".learn-more-btn");
const SecondPage = document.querySelector(".catalogue-bg");
const FirstPage = document.querySelector(".main-part-bg");
const BeginningWin = document.querySelector(".beginning");
const ContactLink = document.querySelector(".contact-link");
const catalogueLink = document.querySelector(".catalogue-page-link");
const ratingLink = document.querySelector(".rating-list-link");
const instaLink = document.querySelector(".link-inst");
const copyLink = document.querySelector(".link-copy");
const gmailLink = document.querySelector(".link-gmail");
const copyPopup = document.querySelector(".popup");
const popupText = document.querySelector(".popup-text");
const ratingItems = document.querySelectorAll('.rating-item');
const firstRow = document.querySelector('.first-row');
const secondRow = document.querySelector('.second-row');
const pointerImg = document.querySelector(".first-row img");
const hoverPopup = document.querySelector(".hover-popup")
const popupImg = document.querySelector(".hover-popup img");
const ratingPageBg = document.querySelector('.rating-bg');
const Logo = document.querySelector(".logo");
const mainContent = document.querySelector("main");
const loadingAnim = document.querySelector(".loading-anim");
const diveInBtn = document.querySelector(".start-buttom");
const Footer = document.querySelector("footer");

const scrollAmount = 350;// Кількість пікселів для прокрутки каруселі

// Перехід на сторінку каталогу при натисканні кнопки "Learn More"
mainPageButton.forEach(button => {
    button.addEventListener("click", () => {
        SecondPage.style.display = "block";
        FirstPage.style.display = "none";
        BeginningWin.style.display = "none";

        // Прокрутка сторінки до початку
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    });
});

// Повернення на головну сторінку при натисканні на логотип
Logo.addEventListener("click", () => {
    Array.from(mainContent.children).forEach(child => {
        if (child === SecondPage || child === ratingPageBg || child === FirstPage) {
            child.style.display = 'none'; // Приховування сторінок каталогу та рейтингу
        }
    });
    Footer.style.display = "none"; // Приховування футера
    Array.from(mainContent.children).forEach(child => {
        if (child !== SecondPage && child !== ratingPageBg && child !== FirstPage) {
            child.style.display = 'block'; // Відображення інших елементів
        }
    });
    //Прибераємо не потрібні класи і задаємо необхідні стилі після анімації при натисканні на кнопку
    loadingAnim.style.display = "block"; 
    loadingAnim.classList.remove("active");
    loadingAnim.classList.remove("unactive");

    document.documentElement.scrollTop = 0;  // Прокрутка до початку сторінки
    document.body.scrollTop = 0; 
})
// Відкриття Instagram у новій вкладці
instaLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.open("https://www.instagram.com/", "_blank");
});
// Відкриття Gmail у новій вкладці
gmailLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.open("https://accounts.google.com/InteractiveLogin?hl=ru&service=mail&ifkv=AaSxoQwaNW0eWg2ekYjflSsxcn5Rx6VUh2IdO7vJCqDr7gzBI0JpF5TvqegDRDP4UYCqRJ3I-CyDjA", "_blank");
});
// Копіювання номера телефону в буфер обміну
copyLink.addEventListener("click", (event) => {
    event.preventDefault();
    const copytext = "123 456 78 90"
    navigator.clipboard.writeText(copytext)
        .then(() => {
            popupText.querySelector("p").textContent = "Text copied";
            copyPopup.classList.add("active"); // Відображення спливаючого повідомлення
            setTimeout(() => {
                copyPopup.classList.remove("active");// Приховування повідомлення через 3 секунди
            }, 3000);
        })
        .catch(err => {
            popupText.querySelector("p").textContent = "Failed to copy text"; // Повідомлення про помилку
            copyPopup.classList.add("active");
            setTimeout(() => {
                copyPopup.classList.remove("active");
            }, 3000);
        });

});

// Перехід між сторінками по навігації сайту
document.addEventListener("click", (event) => {
    const target = event.target;

    if (target === catalogueLink) {
        event.preventDefault(); 

        SecondPage.style.display = "block";
        if (window.getComputedStyle(Footer).display === "none") { // Перевірка чи футер прихований, якщо так, то показуємо його 
            Footer.style.display = "block";
        }
        FirstPage.style.display = "none";
        BeginningWin.style.display = "none";
        ratingPageBg.style.display = "none";

        document.documentElement.scrollTop = 0; 
        document.body.scrollTop = 0; 
    }

    if (target === ratingLink) {
        event.preventDefault();

        ratingPageBg.style.display = "block";
        if (window.getComputedStyle(Footer).display === "none") { // Перевірка чи футер прихований, якщо так, то показуємо його 
            Footer.style.display = "block";
        }
        SecondPage.style.display = "none";
        FirstPage.style.display = "none";
        BeginningWin.style.display = "none";

        document.documentElement.scrollTop = 0; 
        document.body.scrollTop = 0; 
    }

    if (target === ContactLink) {
        event.preventDefault(); 

        if (Footer.style.display === "block") {
            Footer.scrollIntoView({
                behavior: "smooth", // Плавна анімація
                block: "start" // Скрол до початку футера
            });
        } else {
            popupText.querySelector("p").textContent = "The footer is hidden";
            copyPopup.classList.add("active"); // Відображення спливаючого повідомлення
            setTimeout(() => {
                copyPopup.classList.remove("active");// Приховування повідомлення через 3 секунди
            }, 3000);
        }

    }
});
// Прокрутка каруселі вліво
btnPrev.addEventListener("click", () => {
    carousel.scrollBy({
        left: -scrollAmount, // Прокрутка вліво на задану кількість пікселів
        behavior: "smooth" // Плавна анімація
    });
    centerItem(true); // Центрування активного елемента
});
// Прокрутка каруселі вправо
btnNext.addEventListener("click", () => {
    carousel.scrollBy({
        left: scrollAmount, // Прокрутка вправо на задану кількість пікселів
        behavior: "smooth"  // Плавна анімація
    });
    centerItem(false); // Центрування активного елемента
});

document.addEventListener("DOMContentLoaded", () => {
    centerItem(); 
});
carousel.addEventListener("scroll", centerItem);

// Визначення активного елементу каруселі
function centerItem(isPrev = null) {
    const center = carousel.offsetWidth / 2 + carousel.scrollLeft;

    let selectedItem = null;

    items.forEach((item, index) => {
        const itemStart = item.offsetLeft;
        const itemEnd = itemStart + item.offsetWidth;

        // Стилізуємо активний елемент
        if (center > itemStart && center < itemEnd) {
            selectedItem = item;
            item.style.boxShadow = "6px 6px 12px rgba(167, 181, 253, 0.3)";
        } else {
            item.style.boxShadow = "none";
        }
    });
    // Виведення назви та опису для активного елементу
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
            arrow.style.transform = `translateX(${result}px)`; // Оновлення позиції стрілки
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

// Анімація появи карточок риб
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
}, { threshold: 0.2 }); // Поріг видимості елементів

cardWrappers.forEach(wrapper => {
    observer.observe(wrapper); // Спостереження за кожною карточкою
});

// Розгортання та згортання елементів рейтингу
document.querySelectorAll('.rating-item').forEach(item => {
    const firstRow = item.querySelector('.first-row'); 
    const secondRow = item.querySelector('.second-row'); 
    const pointerImg = firstRow.querySelector('img'); 

    firstRow.addEventListener('click', () => {
        if (!item.classList.contains('opened')) {
            secondRow.style.display = 'block';
            secondRow.style.height = 'auto'; 
            secondRow.style.paddingBottom = '5px';
            const fullHeight = secondRow.offsetHeight; // Отримання повної висоти
            secondRow.style.height = '0'; 
            secondRow.offsetHeight; // Перезапуск анімації
            pointerImg.src = "images/pointer-up.svg"; // Зміна іконки
            secondRow.style.transition = 'height 0.5s ease-in-out';
            secondRow.style.height = `${fullHeight}px`; // Анімація розгортання
            item.classList.add('opened');
        } else {
            pointerImg.src = "images/pointer-down.svg"; // Зміна іконки
            secondRow.style.height = `${secondRow.offsetHeight}px`; 
            secondRow.offsetHeight; // Перезапуск анімації
            secondRow.style.height = '0'; // Анімація згортання
            secondRow.style.paddingBottom = '0';
            item.classList.remove('opened');
        }
    });

    secondRow.addEventListener('transitionend', () => {
        if (!item.classList.contains('opened')) {
            secondRow.style.display = 'none'; // Приховування другого рядка після завершення анімації
        }
    });
});

// Відображення спливаючого зображення при наведенні на назву тварини рейтингу
document.querySelectorAll(".first-row").forEach(item => {
    const firstRowText = item.querySelector(".first-row h1");

    // Подія при наведенні миші на назву тварини
    firstRowText.addEventListener('mouseenter', () => {
        const image = firstRowText.dataset.img;
        popupImg.src = image;

        // Отримуємо координати текстового елемента та блоку рейтингу
        const textRect = firstRowText.getBoundingClientRect();
        const parentRect = ratingPageBg.getBoundingClientRect();

        // Розраховуємо позицію спливаючого вікна відносно блоку рейтингу
        const relativeTop = textRect.top - parentRect.top;

        // Встановлюємо позицію спливаючого вікна
        hoverPopup.style.top = `${relativeTop - 170}px`;
        hoverPopup.style.left = `${textRect.left + firstRowText.offsetWidth + 10}px`;
        hoverPopup.classList.add('active');
    });

    // Подія при виході миші з назви тварини
    firstRowText.addEventListener('mouseleave', () => {
        hoverPopup.classList.remove('active');
    });
})
// Відображення сторінок при натисканні на кнопку "Dive In"
diveInBtn.addEventListener("click", () => {
    loadingAnim.classList.add("active"); // Відбувається перша частина анімації
    
    // Через 1.5 секунди міняємо блоки і відбувається друга частина анімації
    setTimeout(() => {
        FirstPage.style.display = "block";
        Footer.style.display = "block";
        BeginningWin.style.display = "none";
        loadingAnim.classList.add("unactive");
    }, 1500);

    // Якщо анімація відбулась то прибираємо блок loadingAnim щоб не заважав
    loadingAnim.addEventListener("transitionend", () => {
        if (loadingAnim.classList.contains("unactive")) {
            loadingAnim.style.display = "none";
        }
    });
});