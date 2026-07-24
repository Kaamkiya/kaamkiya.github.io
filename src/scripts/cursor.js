if (!matchMedia("prefers-reduced-motion").matches) {
  const colors = ["#fc4444", "#fcd444", "#8cc43c", "#5bc0de"];
  const decayRate = 0.03;

  let particles = [];

  const spawn = (x, y) => {
    const size = Math.random()*4+3;
    const xv = (Math.random() - 0.5) * 3;
    const yv = (Math.random() - 0.5) * 3;

    const div = document.createElement("div");
    div.style.position = "fixed";
    div.style.width = size + "px";
    div.style.height = size + "px";
    div.style.top = x + "px";
    div.style.left = x + "px";
    div.style.borderRadius = "1em";
    div.style.pointerEvents = "none";
    div.style.background = colors[Math.floor(Math.random()*colors.length)];
    document.body.appendChild(div);

    particles.push({
      x: x, y: y, xv: xv, yv: yv, remaining: 1, div: div,
    });
  };

  const animate = () => {
    particles.map(p => {
      p.x += p.xv;
      p.y += p.yv;
      p.div.style.left = p.x + "px";
      p.div.style.top = p.y + "px";
      p.remaining -= decayRate;
      p.div.style.opacity = p.remaining;
    });

    particles = particles.filter(p => {
      if (p.remaining <= 0) {
        p.div.remove();
        return false;
      }
      return true;
    });

    window.requestAnimationFrame(animate);
  }

  document.onmousemove = evt => {
    for (let i = 0; i < 2; i++) {
      spawn(evt.clientX, evt.clientY);
    }
  }

  animate();
}
