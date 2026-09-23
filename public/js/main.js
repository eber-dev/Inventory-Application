document.addEventListener('DOMContentLoaded', () => {
    const deleteForms = document.querySelectorAll('.btn-delete-form');

    deleteForms.forEach((form) => {
        form.addEventListener('submit', (e) => {
            const confirmacion = confirm(
                '¿Estás seguro de que deseas eliminar este registro?',
            );
            if (!confirmacion) {
                e.preventDefault();
            }
        });
    });
});
