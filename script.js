document.addEventListener("DOMContentLoaded", () => {

    // Winkelwagen laden vanuit localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Product toevoegen
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const name = card.querySelector('h3').innerText;
            const price = card.querySelector('p').innerText.replace('€','');

            cart.push({ name, price });
            saveCart();

            alert(`${name} toegevoegd aan winkelwagen!`);
            updateCartCounter();
        });
    });

    // Teller bijwerken
    function updateCartCounter() {
        const cartLink = document.querySelector('.cart a');
        if (cartLink) {
            cartLink.innerText = `🛒 (${cart.length})`;
        }
    }

    updateCartCounter();

    // Zoekfunctie
const searchForm = document.querySelector('#search-form');
if(searchForm){
    searchForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        const term = document.querySelector('#search-input').value.toLowerCase();
        const products = document.querySelectorAll('.product-card');
        products.forEach(p => {
            const name = p.querySelector('h3').innerText.toLowerCase();
            if(name.includes(term)){
                p.style.display = 'block';  // product + rating tonen
            } else {
                p.style.display = 'none';   // product + rating verbergen
            }
        });
    });
}
    // Scroll animaties
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.product-card, .section').forEach(el => {
        observer.observe(el);
    });

});