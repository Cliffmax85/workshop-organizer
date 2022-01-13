import {
    checkAuth,
    deleteParticipant,
    getWorkshops,
    logout,

} from '../fetch-utils.js';

import { renderParticipant } from '../render-utils';

checkAuth();

const workshopsEl = document.querySelector('.workshops-container');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

async function displayWorkshops() {
    const workshops = await getWorkshops();

    workshopsEl.textContent = '';
    for (let workshop of workshops) {

        const workshopInfo = document.createElement('div');
        const nameEl = document.createElement('p');
        const participantsEl = document.createElement('div');

        workshopInfo.classList.add('workshop');
        participantsEl.classList.add('particiant');

        nameEl.textContent = workshop.name;
        workshopInfo.append(nameEl, participantsEl);

        for (let particiant of workshop.particiants) {
            const particiantEl = renderParticipant(particiant);
            particiantEl.addEventListener('click', async() => {
                await deleteParticipant(particiant.id);
                displayWorkshops();
            });
            participantsEl.append(particiantEl);
            workshopInfo.append(participantsEl);
        }
        workshopsEl.append(workshopInfo);
    }
}

window.addEventListener('load', async() => {
    const workshops = await getWorkshops();

    displayWorkshops(workshops);
});