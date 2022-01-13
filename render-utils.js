export function renderParticipant(particiant) {
    const particiantEl = document.createElement('p');
    const particiantCard = document.createElement('div');

    particiantEl.textContent = particiant.name;
    particiantEl.classList.add('participant');

    particiantCard.append(particiantEl);
    return particiantCard;

}