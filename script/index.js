const container = document.querySelector(".front_page_content_container_desktop_adjustor");
const container2 = document.querySelector(".wrap");
const countContainer = document.querySelector(".count");
const url = "data/products.json";

const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
countContainer.innerHTML = cartItems.length;

async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    data.forEach(product => {
      if (product.id === 6 || product.id === 2) {
        container.innerHTML += `
          <div class="deals_image_container">
            <a href="../product_details.html?id=${product.id}">
              <img class="deals_image" src="${product.cover_url}" alt="Game cover"/>
            </a>
            <div class="flexbutton">
              <a class="deals_button" href="../product_details.html?id=${product.id}"> 
                <p class="learnmorep">Learn More</p> 
              </a>
              <button class="deals_button" data-product='${btoa(JSON.stringify(product))}' id="cartbutton">
                <p>Add to Cart</p>
              </button>
            </div>
          </div>`;
      } else {
        container2.innerHTML += `
          <div class="popular_image_container">
            <a href="../product_details.html?id=${product.id}">
              <img class="popular_image" src="${product.cover_url}" alt="Game cover"/>
            </a>
            <a class="popular_button" href="../product_details.html?id=${product.id}">
              <p class="popular_button">Learn More</p>
            </a>
          </div>`;
      }
    });

    const addToCartButtons = document.querySelectorAll("#cartbutton");
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const product = JSON.parse(atob(button.dataset.product));
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        cartItems.push(product);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        countContainer.innerHTML = cartItems.length;
      });
    });

  } catch (error) {
    console.error(error);
  }
}

fetchData(url);









