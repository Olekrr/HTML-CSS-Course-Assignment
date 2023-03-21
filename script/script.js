const container = document.querySelector(".front_page_content_container_desktop_adjustor");
const container2 = document.querySelector("#secondloop");
const countContainer = document.querySelector(".count");
const url = "data/products.json";

const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
countContainer.innerHTML = cartItems.length;

async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
      const product = data[i];
      const containerToUse = i < 5 ? container : container2;
      containerToUse.innerHTML += `
        <div class="deals_image_container">
          <a href="../product_details.html?id=${product.id}">
            <img class="deals_image" src="${product.cover_url}" alt="Game cover"/>
          </a>
          <div class="flexbutton">
            <a class="deals_button" href="../product_details.html?id=${product.id}"> 
              <p class="learnmorep">Learn More</p> 
            </a>
            <button class="deals_button" data-product='${btoa(JSON.stringify(product))}'>
              <p>Add to Cart</p>
            </button>
          </div>
        </div>`;
    }

    const addToCartButtons = document.querySelectorAll(".deals_button");
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const product = JSON.parse(atob(button.dataset.product));
        cartItems.push(product);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        countContainer.innerHTML = cartItems.length;
        this.innerHTML = "Added to cart!"
        this.style.backgroundColor = "#0051ff75";
      });
    });
  } catch (error) {
    console.error(error);
  }
}

fetchData(url);


