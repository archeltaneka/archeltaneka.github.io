// Native animation tracks use the same lifecycle and easing as Projects/Skills.
// Only this route's choreography lives here; restore cancels every filled track.
export function playAbout(root, destination, source, reduced) {
  const incoming = root.querySelector(`[data-scene="${destination}"]`);
  const outgoing = root.querySelector(`[data-scene="${source}"]`);
  const tracks = [];
  const snap = 'cubic-bezier(.16,1,.3,1)';
  const cut = 'cubic-bezier(.65,0,.9,.35)';
  const add = (scope, selector, frames, delay, duration, easing = snap, stagger = 0) => {
    (selector ? scope.querySelectorAll(selector) : [scope]).forEach((element, index) => {
      tracks.push(element.animate(frames, { delay: delay + index * stagger, duration, easing, fill: 'both' }));
    });
  };
  if (reduced) {
    add(incoming, null, { opacity: [0, 1], clipPath: ['inset(0)', 'inset(0)'] }, 0, 120);
    add(outgoing, null, { opacity: [1, 0] }, 0, 120);
  } else {
    const entering = destination === 'about';
    add(incoming, null, { opacity: [0, 1], clipPath: ['inset(0)', 'inset(0)'] }, 250, 1);
    add(outgoing, null, { opacity: [1, 0] }, 280, 1);
    add(root, '.scene-blade--blue', { transform: entering ? ['translateX(140%)', 'translateX(-140%)'] : ['translateX(-140%)', 'translateX(140%)'] }, 90, 510);
    add(root, '.scene-blade--white', { transform: entering ? ['translate(150%,15%)', 'translate(-150%,-15%)'] : ['translate(-150%,-15%)', 'translate(150%,15%)'] }, 140, 430);
    if (entering) {
      add(outgoing, '.menu-arrival', { translate: ['0 0', '75vw -12vh'] }, 40, 260, cut, 12);
      add(outgoing, '.character-entrance', { translate: ['0 0', '-55vw 12vh'] }, 20, 280, cut);
      add(outgoing, '.name-carousel, .character-backdrop', { translate: ['0 0', '-40vw 0'] }, 50, 260, cut);
      add(outgoing, '.impact-card, .landing-footer', { opacity: [1, 0] }, 0, 150);
      add(incoming, '.profile-white-field', { translate: ['-70vw -20vh', '0 0'] }, 200, 360);
      add(incoming, '.profile-slash', { translate: ['35vw -25vh', '0 0'] }, 260, 370);
      add(incoming, '.profile-name-line--0', { transform: ['translate(-65vw,20px) rotate(-6deg)', 'translate(7px,0) rotate(0deg)', 'none'] }, 270, 390);
      add(incoming, '.profile-photo', { translate: ['55vw -8vh', '-5px 0', '0 0'] }, 290, 400);
      add(incoming, '.profile-name-line--1', { translate: ['40vw 0', '-4px 0', '0 0'] }, 330, 350);
      add(incoming, '.profile-name-line--2', { translate: ['-65vw 0', '5px 0', '0 0'] }, 350, 360);
      add(incoming, '.profile-profession', { opacity: [0, 1], translate: ['-25px 0', '0 0'] }, 480, 180);
      add(incoming, '.profile-statement', { clipPath: ['inset(0 100% 0 0)', 'inset(0)'], translate: ['-18px 0', '0 0'] }, 510, 230);
      add(incoming, '.profile-principle', { opacity: [0, 1], translate: ['-70px 12px', '0 0'] }, 480, 230, snap, 35);
      add(incoming, '.profile-arc, .profile-controls, .profile-section-label', { opacity: [0, 1], translate: ['0 10px', '0 0'] }, 620, 180);
    } else {
      add(outgoing, '.profile-statement, .profile-arc, .profile-controls', { opacity: [1, 0], translate: ['0 0', '-25px 0'] }, 0, 140);
      add(outgoing, '.profile-principle', { translate: ['0 0', '-50vw 10vh'] }, 30, 230, cut, 20);
      add(outgoing, '.profile-identity, .profile-white-field', { translate: ['0 0', '-70vw -12vh'] }, 60, 270, cut);
      add(outgoing, '.profile-photo, .profile-slash', { translate: ['0 0', '65vw -10vh'] }, 50, 270, cut);
      add(incoming, '.character-backdrop, .name-carousel', { translate: ['-40vw 8vh', '0 0'] }, 270, 360);
      add(incoming, '.character-entrance', { translate: ['-60vw 12vh', '0 0'] }, 290, 420);
      add(incoming, '.menu-arrival', { translate: ['65vw -12vh', '0 0'] }, 340, 310, snap, 22);
      add(incoming, '.impact-card, .landing-footer', { opacity: [0, 1] }, 610, 170);
    }
  }
  return { controls: Promise.allSettled(tracks.map(track => track.finished)), restore: () => tracks.forEach(track => track.cancel()) };
}
