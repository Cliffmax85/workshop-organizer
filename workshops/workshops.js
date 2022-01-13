import {
    checkAuth,
    deleteParticipant,
    getWorkshops,
    logout,

} from '../fetch-utils.js';

import { renderParticipant } from '../render-utils.js';

checkAuth();

const workshopsEl = document.querySelector('.workshops-container');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

async function displayWorkshops() {
    const workshops = await getWorkshops();
    console.log(workshops);
    workshopsEl.textContent = '';
    for (let workshop of workshops) {

        const workshopInfo = document.createElement('div');
        const nameEl = document.createElement('p');
        const participantsEl = document.createElement('div');

        workshopInfo.classList.add('workshop');
        participantsEl.classList.add('participant');

        nameEl.textContent = workshop.name;
        workshopInfo.append(nameEl, participantsEl);

        for (let participant of workshop.participants) {
            const participantEl = renderParticipant(participant);
            participantEl.addEventListener('click', async() => {
                await deleteParticipant(participant.id);
                await displayWorkshops();
            });
            participantsEl.append(participantEl);
            workshopInfo.append(participantsEl);
        }
        workshopsEl.append(workshopInfo);
    }
}

window.addEventListener('load', async() => {
    //const workshops = await getWorkshops();

    displayWorkshops();
});