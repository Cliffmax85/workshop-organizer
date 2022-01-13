export function renderParticipant(participant) {
    const particiantEl = document.createElement('p');
    const particiantCard = document.createElement('div');

    particiantEl.textContent = participant.name;
    particiantEl.classList.add('participant');

    particiantCard.append(particiantEl);
    return particiantCard;

}