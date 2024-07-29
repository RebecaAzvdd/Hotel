document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('reservation-form');
    const alertContainer = document.getElementById('alert-container');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        // Clear previous alerts
        alertContainer.innerHTML = '';
        alertContainer.style.display = 'block'; // Ensure alert container is visible

        // Validation variables
        let isValid = true;
        let errors = [];

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const checkInDate = new Date(document.getElementById('check-in').value);
        const checkOutDate = new Date(document.getElementById('check-out').value);
        const today = new Date();

        // Validate Name
        if (name === '') {
            isValid = false;
            errors.push('Nome é obrigatório.');
        }

        // Validate Email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            isValid = false;
            errors.push('E-mail inválido.');
        }

        // Validate Dates
        if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
            isValid = false;
            errors.push('As datas de entrada e saída são obrigatórias.');
        } else if (checkInDate < today) {
            isValid = false;
            errors.push('A data de entrada não pode ser anterior a hoje.');
        }

        if (checkOutDate <= checkInDate) {
            isValid = false;
            errors.push('A data de saída deve ser após a data de entrada.');
        }

        // Show Errors
        if (!isValid) {
            errors.forEach(error => {
                const alert = document.createElement('div');
                alert.className = 'alert alert-danger';
                alert.textContent = error;
                alertContainer.appendChild(alert);
            });
            return;
        }

        // Show Success Message
        const successAlert = document.createElement('div');
        successAlert.className = 'alert alert-success show';
        successAlert.textContent = 'Sua reserva foi enviada com sucesso!';
        alertContainer.appendChild(successAlert);

        // Trigger animation
        setTimeout(() => {
            successAlert.classList.add('active');
        }, 100); // Delay to allow CSS transition to work
    });
});
