const el = (sel, par) => (par || document).querySelector(sel);

const elWrap = el("#wrap");
const elTilt = el("#tilt");
const settings = {
  reverse: 0,        // Reverse tilt: 1, 0
  max: 35,           // Max tilt: 35
  perspective: 1000, // Parent perspective px: 1000
  scale: 1,          // Tilt element scale factor: 1.0
  axis: "",          // Limit axis. "y", "x"
};

elWrap.style.perspective = `${settings.perspective}px`;

const tilt = (evt) => {
  const bcr = elWrap.getBoundingClientRect();
  const x = Math.min(1, Math.max(0, (evt.clientX - bcr.left) / bcr.width));
  const y = Math.min(1, Math.max(0, (evt.clientY - bcr.top) / bcr.height));
  const reverse = settings.reverse ? -1 : 1;
  const tiltX = reverse * (settings.max / 2 - x * settings.max);
  const tiltY = reverse * (y * settings.max - settings.max / 2);
  elTilt.style.transform = `
    rotateX(${settings.axis === "x" ? 0 : tiltY}deg)
    rotateY(${settings.axis === "y" ? 0 : tiltX}deg)
    scale(${settings.scale})
  `;
}

elWrap.addEventListener("pointermove", tilt);
