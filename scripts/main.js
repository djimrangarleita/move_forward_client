import { profileRoute, serverStatusRoute } from './globals.js';

const startApp = async () => {
    const serverStatus = await fetch(serverStatusRoute);
    if (serverStatus.status !== 200) {
        console.log('Server not responding, cannot start app');
        return;
    }
    const data = await serverStatus.json();
    console.log(data.msg);
}

document.addEventListener('DOMContentLoaded', async (_) => {
    const logoutBtn = document.querySelector('#logout-btn');

    logoutBtn.addEventListener('click', (_) => {
        logout();
        window.location.href = './../login.html';
    });

    const username = document.querySelector('#username');

    const profile = await fetchProfile();
    if (profile) {
        username.innerHTML = 'Hi, ' + profile.displayName.substring(0, 6) || profile.name.substring(0, 6)
    }
});

const logout = () => {
    document.cookie = 'X_SESSION_TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

const fetchProfile = async () => {
    try {
        const data = await fetch(profileRoute, {
            credentials: 'include',
        });
        
        if (data.status === 200) {
            return await data.json();
        } else {
            throw Error('An error occured while fetching profile data');
        }
    } catch (error) {
        console.log(error.message);
    }
    return undefined;
}

startApp();