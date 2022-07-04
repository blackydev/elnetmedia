// FUNKCJE DO OGÓLNEGO UŻYTKU
// ZAMIANY CLASY
function toggleClass(element, className) {
    element.classList.toggle(className);
}
// ZAMIANY ID
function toggleId(element, IdName) {
    if (!element.hasAttribute('id'))
        element.setAttribute('id', IdName)
    else
        element.removeAttribute('id')
}
// SCROLLUJ DO ELEMENTU NA ŚRODEK
function scrollIntoCenter(locationToScroll) {
    locationToScroll.scrollIntoView({ block: 'center' });
}

// AKTYWACJA ANIMACJI NAWIGACJI
function navAction() {
    // aktywacja animacji przycisku
    let element = document.querySelector('#icn-container');
    toggleClass(element, 'active')
    // aktywacja animacji tła nawigacji z elementami
    element = document.querySelector('nav');
    toggleClass(element, 'active')
    // aktywacja animacji panelu z linkami w nawigacji
    element = document.querySelector('#nav-panel');
    toggleClass(element, 'active')
    // wyłączenie możliwości scrolla
    element = document.querySelector('body');
    toggleId(element, '__disable-scrolling-fixed');
}
// AKTYWACJA NAWIGACJI PRZY PRZYCISKU IKONKI
const icnContainerId = document.querySelector('#icn-container');
icnContainerId.onclick = navAction;

// USTAWIENIA W ZAKŁADCE "DOŚWIADCZENIE" LICZBE "LAT"
(function () {
    let locationToInsertion = document.querySelector('#js-exp-years');
    let today = new Date();
    let year = today.getFullYear() - 1996;
    locationToInsertion.textContent = year;
    let works = 10 * 20 * 12 * year;
    locationToInsertion = document.querySelector("#js-exp-works");
    locationToInsertion.textContent = Math.round(works / 10000) * 10000 + "+";
})();

// USTAWIENIE FOOTER COPYRIGHT
(function () {
    let locationToInsertion = document.querySelector('#copyright');
    let today = new Date();
    let year = today.getFullYear();
    locationToInsertion.textContent = "© " + year + " Firma Usługowa ELNET Jacek Likus"
})();

// SCROLL DO KONTAKTU PO KLIKU W OFERCIE BOXA
let elementToClick = document.querySelector('#js-offer-contact');
elementToClick.addEventListener("click", function () {
    let locationToScroll = document.querySelector("#section-contact");
    scrollIntoCenter(locationToScroll);
});

/*
SECTIONS ARRAY 
0. TYTUŁ SEKCJI  
1. CZY SEKCJA JEST W NAWIGACJI | true/false
2. CZY SEKCJA JEST W NAWIGACJI W STOPCE | true/false
*/

let sectionsData = [
    ['text', true, true],
    ['experience', true, true],
    ['offer', true, true],
    ['contact', true, true],
    ['coop', true, false]
];

for (let i = 0; i < sectionsData.length; i++) {
    let section = document.querySelector('#section-' + sectionsData[i][0]);

    // TWORZENIE LINKÓW W NAWIGACJI DO SCROLLA
    if (sectionsData[i][1]) {
        let elementToClick = document.querySelector('#js-scroll-link-nav-' + sectionsData[i][0]);
        elementToClick.addEventListener("click", function () {
            navAction();
            scrollIntoCenter(section);
        });
    }
    // TWORZENIE LINKÓW W NAWIGACJI W STOPCE DO SCROLLA
    if (sectionsData[i][2]) {
        let elementToClick = document.querySelector('#js-scroll-link-footer-' + sectionsData[i][0]);
        elementToClick.addEventListener("click", function () {
            scrollIntoCenter(section);
        });

    }

}

// NADANIE KLASY Z TRANSITION DLA ANIMACJI POKAZYWANIA
let elements = document.querySelectorAll(".js_scroll-animation");
for (let i = 0; i < elements.length; i++) {
    elements[i].style.transition = "1s";
}

// NADANIE KLASY DLA ANIMACJI PLYNNEGO POKAZYWANIA ELEMENTU PRZY SCROLLU
let scrollShowAnimation = setInterval(() => {
    let elements = document.querySelectorAll(".js_scroll-animation");
    if (elements.lenght != 0)
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].getBoundingClientRect().bottom < window.scrollY + window.innerHeight * .7) {
                elements[i].classList.remove("js_scroll-animation");
                setTimeout(() => {
                    elements[i].style.transition = null;
                }, 2000);
            }
        }
}, 50);

scrollShowAnimation;

window.onload = function () {
    // ZAŁADOWANIE RESZTY OBRAZKÓW PO LOADZIE STRONY
    let images = document.querySelectorAll(".js_lazy-loading");
    for (let i = 0; i < images.length; i++) {
        let srcAttribute = images[i].getAttribute("data-src");
        images[i].setAttribute("src", srcAttribute);
        images[i].classList.remove("js_lazy-loading");
        images[i].removeAttribute("data-src");
    }
}

