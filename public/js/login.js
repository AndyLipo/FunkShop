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

// hamburguer menu 

document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('navbar-menu');
    const submenuItems = document.querySelectorAll('.with-submenu');

    // Toggle menú principal
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
        });

        // Cerrar menú al hacer click en un link (excepto submenus)
        menu.querySelectorAll('.navbar__link').forEach(link => {
            if (!link.closest('.with-submenu')) {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 768) {
                        menu.classList.remove('active');
                    }
                });
            }
        });
    }

    // Toggle submenús en mobile
    submenuItems.forEach(item => {
        const link = item.querySelector('.navbar__link');
        const submenu = item.querySelector('.submenu');

        if (link && submenu) {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault(); // Evita navegación en mobile
                    item.classList.toggle('active');

                    // Cerrar otros submenús
                    submenuItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                }
            });
        }
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!e.target.closest('.navbar') && menu.classList.contains('active')) {
                menu.classList.remove('active');
                submenuItems.forEach(item => item.classList.remove('active'));
            }
        }
    });
});