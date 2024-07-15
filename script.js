const menu_button = document.querySelector('.h-icon');
const nav_menu = document.querySelector('.nav-menu');
const nav_items = document.querySelectorAll('ul.nav-items');
const currentYear = document.querySelector("#current-year");

menu_button.addEventListener('click', () => {
    menu_button.classList.toggle('is-active');
    nav_menu.classList.toggle('is-active');
})

nav_items.forEach(nav_item => {
    nav_item.addEventListener('click', e => {
        if (e.target.tagName === 'A') {
            menu_button.classList.remove('is-active');
            nav_menu.classList.remove('is-active');
        }
    });
});

currentYear.textContent = new Date().getFullYear();
