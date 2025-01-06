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

        const reservation = {
            name: name,
            email: email,
            checkIn: document.getElementById('check-in').value,
            checkOut: document.getElementById('check-out').value,
            observations: document.getElementById('observations').value,
            adults: document.getElementById('adults').value,
            children: document.getElementById('children').value
        };

        localStorage.setItem('reservation', JSON.stringify(reservation));

        window.location.href = 'index2.html';
    });
});