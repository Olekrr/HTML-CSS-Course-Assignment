const featuredContainer = document.querySelector(".front_page_content_container_desktop_adjustor");
const otherProductsContainer = document.querySelector(".wrap");
const countContainer = document.querySelector(".count");
const featuredProductsUrl = "https://gamehub.olekristianfrontend.no/wp-json/wc/store/products?featured=true";
const otherProductsUrl = "https://gamehub.olekristianfrontend.no/wp-json/wc/store/products?featured=false";
const customerKey = "ck_aa4e90c520fe2465096746796407d25176686a71";
const secret = "cs_93d803ead5d112a83450f0c8e2251bb36966f2ef";

const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
countContainer.innerHTML = cartItems.length;



async function fetchData(url, container, isFeatured) {
  try {
    const response = await fetch(url, {
      headers: {
        "Authorization": "Basic " + btoa(`${customerKey}:${secret}`)
      }
    });
    const data = await response.json();
    console.log(data)
    for (let i = 0; i < data.length; i++) {
      const product = data[i];
      if (isFeatured) {
        container.innerHTML += `
          <div class="deals_image_container">
            <a href="../product_details.html?id=${product.id}">
              <img class="deals_image" src="${product.images[0].src}" alt="Game cover"/>
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
          container.innerHTML += `
          <div class="popular_image_container">
            <a href="../product_details.html?id=${product.id}">
              <img class="popular_image" src="${product.images[0].src}" alt="Game cover"/>
            </a>
            <a class="popular_button" href="../product_details.html?id=${product.id}">
              <p class="popular_button">Learn More</p>
            </a>
          </div>`;
      }
    }

    const addToCartButtons = document.querySelectorAll("#cartbutton");
    for (let i = 0; i < addToCartButtons.length; i++) {
      const button = addToCartButtons[i];
      button.addEventListener("click", function () {
        const product = JSON.parse(atob(button.dataset.product));
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        cartItems.push(product);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        countContainer.innerHTML = cartItems.length;
        this.innerHTML = "Added to cart!"
        this.style.backgroundColor = "#00BBC2";
      });
    }

  } catch (error) {
    console.error(error);
  }
}

fetchData(featuredProductsUrl, featuredContainer, true);
fetchData(otherProductsUrl, otherProductsContainer, false);










