let menuIcon = document.getElementById("menu-icon");
let toggleIcon = document.getElementById("toggleIcon");
let faXmark = document.getElementById("faXmark");

menuIcon.addEventListener("click", function () {
    toggleIcon.classList.add("toggleIcon-Toggle");
});

faXmark.addEventListener("click", function () {
    toggleIcon.classList.remove("toggleIcon-Toggle");
});

