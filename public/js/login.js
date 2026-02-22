const input = document.getElementById('password');
let realValue = '';
let timeout;
let isUpdating = false; // Flag para evitar loops infinitos

input.addEventListener('input', (e) => {
    if (isUpdating) return; // Evita loops

    const currentValue = e.target.value;

    // Si se está borrando
    if (currentValue.length < realValue.length) {
        realValue = realValue.slice(0, currentValue.length);
        isUpdating = true;
        input.value = '•'.repeat(realValue.length);
        isUpdating = false;
        return;
    }

    // Si se está escribiendo
    const newChar = currentValue[currentValue.length - 1];

    // Si el nuevo caracter es un punto, ignorarlo (evita bugs)
    if (newChar === '•') {
        isUpdating = true;
        input.value = '•'.repeat(realValue.length);
        isUpdating = false;
        return;
    }

    // Agregar el nuevo caracter al valor real
    realValue += newChar;

    // Muestra todos los puntos excepto la última letra
    isUpdating = true;
    input.value = '•'.repeat(realValue.length - 1) + newChar;
    isUpdating = false;

    // Después de 600ms, convierte la última letra en punto
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        isUpdating = true;
        input.value = '•'.repeat(realValue.length);
        isUpdating = false;
    }, 600); // 600ms es un buen balance
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
    e.target.submit(); // Envía el form
});