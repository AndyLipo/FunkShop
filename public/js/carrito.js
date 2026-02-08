// Obtenemos los botones y el input
const add = document.querySelector("#add");
const substract = document.querySelector("#substract");
const quantity = document.querySelector("#quantity");

const precioUnitario = document.querySelector("#precio_unitario").textContent;
let precioNro = precioUnitario.match(/\d+/g); // If there are numbers in the string, 'precioNro' will be an array of them
let precioTotal = document.querySelector("#item_precioTotal");

function armarNro (precio, nro) {
    if (precio.length > 1) {
        return (Number(precio [0]) + (0.01 * Number(precio [1])));
    }
    else return (Number(precio [0]));
}

add.addEventListener('click', () => {
    quantity.value = Number(quantity.value) + 1;
    let precioTotalTemp = armarNro(precioNro) * quantity.value;
    precioTotal.textContent = "$ " + String(precioTotalTemp);
});

substract.addEventListener('click', () => {
    if ((Number(quantity.value) - 1) > 0) { //no permitimos nros menores a cero
        quantity.value = Number(quantity.value) - 1;
        let precioTotalTemp = armarNro(precioNro) * quantity.value;
        precioTotal.textContent = "$ " + String(precioTotalTemp);
    }
    else { 
        //si es cero el contador, mostramos un alert indicando que puede removar el item usando el boton x 
        window.alert("Cantidad de items = 0 \nDesea eliminar este item del carrito? Por favor utilice el boton eliminar del articulo que desea remover.");
    }
});

//FALTA ACTUALIZAR EL PRECIO TOTAL EN EL RESUMEN, A MEDIDA QUE ACTUALIZAMOS CONTADORES




