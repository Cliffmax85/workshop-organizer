import {
    createPartipant,
    getWorkshops,
    checkAuth,
    logout
} from '../fetch-utils.js';

checkAuth();

const form = document.querySelector('.participant-form');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('clcik', () => {
    logout();
});

form.addEventListener('submit', async(e) => {
    e.preventDefault();

    const data = new FormData(form);
    const name = data.get('participant-name');
    const workshop_id = data.get('workshop-id');

    await createPartipant({
        name: name,
        workshop_id: workshop_id
    });
});

window.addEventListener('load', async() => {

    const dropdown = document.querySelector('select');
    const workshops = await getWorkshops();

    for (let workshop of workshops) {
        const dropOption = document.createElement('option');
        dropOption.value = workshop.id;
        dropOption.textContent = workshop.name;
        dropdown.append(dropOption);
    }
    
});