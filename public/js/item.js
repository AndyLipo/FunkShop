const add = document.querySelector('#add');
const substract = document.querySelector('#substract');
const quantity = document.querySelector('#quantity');

add.addEventListener('click', (e) => {
    e.preventDefault(); // Evita que el botón submitee el form
    quantity.value = Number(quantity.value) + 1;
});

substract.addEventListener('click', (e) => {
    e.preventDefault(); // Evita que el botón submitee el form
    if (Number(quantity.value) > 0) {
        quantity.value = Number(quantity.value) - 1;
    }
});