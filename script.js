let menuIcon = document.getElementById("menu-icon");
let toggleIcon = document.getElementById("toggleIcon");
let faXmark = document.getElementById("faXmark");
let body = document.getElementsByTagName("body");

menuIcon.addEventListener("click", function () {
    toggleIcon.classList.add("toggleIcon-Toggle");
    body.classList.add("bodyToggle")

});

faXmark.addEventListener("click", function () {
    toggleIcon.classList.remove("toggleIcon-Toggle");
    body.classList.remove("bodyToggle")
});

