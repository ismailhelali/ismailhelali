// This script adds a smooth scroll effect to the page.

window.addEventListener("scroll", function() {
  var header = document.querySelector("header");
  var offset = header.getBoundingClientRect().top;
  if (offset < window.innerHeight) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// This script adds a search bar to the page.

var searchBar = document.querySelector(".search-bar");
var input = document.querySelector(".search-bar input");

input.addEventListener("input", function() {
  var value = this.value;
  var results = document.querySelectorAll(".result");

  for (var i = 0; i < results.length; i++) {
    if (results[i].textContent.toLowerCase().indexOf(value.toLowerCase()) < 0) {
      results[i].style.display = "none";
    } else {
      results[i].style.display = "block";
    }
  }
});

// This script adds a product to the page.

function addProduct(product) {
  var li = document.createElement("li");
  li.textContent = product.name;
  document.querySelector(".products").appendChild(li);
}
