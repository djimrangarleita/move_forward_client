import { registrationRoute } from "./globals.js";

document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.querySelector('#registration-form');
    const formError = document.querySelector('.form-error');
    
    registrationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = document.querySelector('#submit-btn');
        formError.style.display = 'none';
        submitBtn.disabled = true;

        const formData = new FormData(e.target);
        const formToObject = Object.fromEntries(formData);
        formToObject.authentication = {password: formToObject.password};
        delete formToObject.password;
        const formDataJson = JSON.stringify(formToObject);
    
        try {
            const rawdata = await fetch(registrationRoute, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: formDataJson,
            });

            if (rawdata.status === 201) {
                window.location.href = './../login.html';
            } else {
                const data = await rawdata.json();
                throw Error(data.error || 'unknown error');
            }
        } catch (error) {
            submitBtn.disabled = false;
            formError.innerHTML = `An error occured while trying to register: ${error.message}`;
            formError.style.display = 'block';
        }
    });
});