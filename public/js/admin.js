function confirmDeletion(product_id) {
    // Aparece un cuadro de diálogo de confirmación
    const confirmDeletion = confirm('Está seguro de que desea eliminar este producto?');

    // Si el usuario hace clic en "Aceptar"
    if (confirmDeletion) {
        // Redirigir al usuario a la página de eliminación
        window.location.href = `/admin/delete/${product_id}`;
    } else {
        // Si el usuario hace clic en "Cancelar", no hace nada
    }
}