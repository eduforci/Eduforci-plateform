const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const sideMenu = document.getElementById("sideMenu");

menuBtn.onclick = () => {
    sideMenu.classList.add("active");
}

closeBtn.onclick = () => {
    sideMenu.classList.remove("active");
}
