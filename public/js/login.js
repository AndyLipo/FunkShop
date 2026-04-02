const input = document.getElementById('password');
let realValue = '';
let timeout;
let isUpdating = false;

input.addEventListener('input', (e) => {
    if (isUpdating) return;
    const currentValue = e.target.value;

    if (currentValue.length < realValue.length) {
        realValue = realValue.slice(0, currentValue.length);
        isUpdating = true;
        input.value = '•'.repeat(realValue.length);
        isUpdating = false;
        return;
    }

    const newChar = currentValue[currentValue.length - 1];
    if (newChar === '•') {
        isUpdating = true;
        input.value = '•'.repeat(realValue.length);
        isUpdating = false;
        return;
    }

    realValue += newChar;
    isUpdating = true;
    input.value = '•'.repeat(realValue.length - 1) + newChar;
    isUpdating = false;

    clearTimeout(timeout);
    timeout = setTimeout(() => {
        isUpdating = true;
        input.value = '•'.repeat(realValue.length);
        isUpdating = false;
    }, 600);
});

// Login con Supabase
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = realValue; // usa el valor real, no el que muestra puntos

    const { error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        alert("Email o contraseña incorrectos");
        console.error(error);
    } else {
        window.location.href = "./admin.html";
    }
});
