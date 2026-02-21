const input = document.getElementById('password');
let realValue = '';
let timeout;

input.addEventListener('input', (e) => {
    const currentValue = e.target.value;

    // Si se está borrando
    if (currentValue.length < realValue.length) {
        realValue = realValue.slice(0, currentValue.length);
        input.value = '•'.repeat(realValue.length);
        return;
    }

    // Si se está escribiendo
    const newChar = currentValue[currentValue.length - 1];

    // Si el nuevo caracter es un punto, ignorarlo (evita bugs)
    if (newChar === '•') {
        input.value = '•'.repeat(realValue.length);
        return;
    }

    realValue += newChar;

    // Muestra la última letra
    input.value = '•'.repeat(realValue.length - 1) + newChar;

    // Después de 500ms, la convierte en punto
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        input.value = '•'.repeat(realValue.length);
    }, 600);
});

// Para enviar el valor real en el form
document.querySelector('.formulario').addEventListener('submit', (e) => {
    e.preventDefault();

    // Crear un input hidden con el valor real
    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = 'password';
    hiddenInput.value = realValue;

    e.target.appendChild(hiddenInput);

    console.log('Password real:', realValue);
    // e.target.submit(); // Descomentar para enviar el form de verdad
});