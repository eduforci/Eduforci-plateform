const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const sideMenu = document.getElementById("sideMenu");

menuBtn.addEventListener("click", () => {
    sideMenu.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    sideMenu.classList.remove("active");
});

// Fermer le menu si on clique en dehors
document.addEventListener("click", (e) => {
    if (
        sideMenu.classList.contains("active") &&
        !sideMenu.contains(e.target) &&
        !menuBtn.contains(e.target)
    ) {
        sideMenu.classList.remove("active");
    }
});
