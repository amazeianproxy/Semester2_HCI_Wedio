
// https://codepen.io/equinusocio/pen/OJMBpdK
const circle = document.querySelector('.circle');
const timeline = document.querySelector('.timeline');

let isDragging = false;
let offsetX = 0; // Store the initial offset

circle.addEventListener('mousedown', (e) => {
  isDragging = true;
  offsetX = e.clientX - circle.getBoundingClientRect().left; // Calculate initial offset
  e.preventDefault();
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const newX = Math.max(0, Math.min(e.clientX - offsetX, timeline.offsetWidth));
  circle.style.left = `${newX}px`;
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});
