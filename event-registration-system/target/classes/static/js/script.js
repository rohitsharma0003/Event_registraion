// Custom JavaScript for Event Registration System

document.addEventListener('DOMContentLoaded', function() {
    // Add any custom JavaScript functionality here

    // Example: Confirm delete actions
    const deleteButtons = document.querySelectorAll('.btn-danger');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!confirm('Are you sure you want to delete this item?')) {
                e.preventDefault();
            }
        });
    });

    // Example: Form validation enhancement
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });

    // Example: Auto-format date inputs (if any)
    const dateInputs = document.querySelectorAll('input[type="datetime-local"]');
    dateInputs.forEach(input => {
        input.addEventListener('change', function() {
            // Add any date formatting logic if needed
        });
    });
});
