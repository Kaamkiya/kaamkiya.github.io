for (let e of document.querySelectorAll(".carousel")) {
  e.onclick = () => {
    let v = e.getAttribute("values").split(",");
    e.innerText = v[Math.floor(Math.random() * v.length)];
  };
}
