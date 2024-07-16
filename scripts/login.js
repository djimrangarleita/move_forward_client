import { loginRoute } from "./globals.js";

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const formError = document.querySelector('.form-error');
    
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = document.getElementById('submit-btn');
        formError.style.display = 'none';
        submitBtn.disabled = true;

        const formData = new FormData(e.target);
        const formDataJson = JSON.stringify(Object.fromEntries(formData));

        try {
            const rawdata = await fetch(loginRoute, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: formDataJson,
            });

            if (rawdata.status === 200) {
                window.location.href = './../my-application.html';
            } else {
                throw Error;
            }
        } catch (error) {
            submitBtn.disabled = false;
            formError.innerHTML = 'An error occured while trying to login, check your credentials and try again.';
            formError.style.display = 'block';
        }
    });
});