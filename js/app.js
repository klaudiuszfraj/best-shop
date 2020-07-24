const hamburger = document.querySelector(".hamburger");
const headerLinks = document.querySelector(".header__links");

hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("clicked");
    headerLinks.classList.toggle("clicked");

})
