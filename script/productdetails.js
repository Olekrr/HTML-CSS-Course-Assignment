const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const url = "https://gamehub.olekristianfrontend.no/wp-json/wc/store/products";
const customerKey = "ck_aa4e90c520fe2465096746796407d25176686a71";
const secret = "cs_93d803ead5d112a83450f0c8e2251bb36966f2ef";
const container = document.querySelector(".test");
const titleChange = document.querySelector("title");
const countContainer = document.querySelector(".count");

const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
countContainer.innerHTML = cartItems.length;



async function fetchData(url) {
  try {
    const response = await fetch(url, {
      headers: {
        "Authorization": "Basic " + btoa(`${customerKey}:${secret}`)
      }
    });
    const data = await response.json();
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      const product = data[i];
      if (id && product.id === parseInt(id)) {
        titleChange.innerHTML += `${product.name}`;
        container.innerHTML += `
        <div class="content_container">
          <div class="content_column">
            <div class="game_showcase">
              <div class="rating">
                <img
                  class="stars"
                  src="${product.images[1].src}"
                  alt="star rating"
                />
                <p class="rating_text">${product.attributes[5].terms[0].name}</p>
              </div>
              <img
                class="space_war_img"
                src="${product.images[0].src}"
                alt="Video game cover"
              />
            </div>
    
            <div class="game_info">
              <h1 class="itemnamesizeadjustment">${product.name} - ${product.prices.price/100}NOK</h1>
              <hr />
              <p class="game_info_main_text">${product.description}</p>
              <hr />
              <div class="product_details_photo_container">
                <img
                  class="product_details_photo"
                  src="${product.images[3].src}"
                  alt="gameplay image"
                />
                <img
                  class="product_details_photo"
                  src="${product.images[4].src}"
                  alt="gameplay image"
                />
                <img
                  class="product_details_photo"
                  src="${product.images[5].src}"
                  alt="gameplay image"
                />
                <hr />
                <div class="buttons_spacing">
                  <a href="product_list.html" class="product_details_button">
                    <p class="product_details_button_text" id="textmargin"> More Games </p>
                  </a>
                  <button class="product_details_button" data-product='${btoa(JSON.stringify(product))}' id="cartbutton">
                    <p class="product_details_button_text">Add to Cart</p></button>
                </div>
              </div>
            </div>
            <div class="game_trailer">
              <div class="game_trailer_content_column">
                <h2>Cinematic Trailer</h2>
                  <img
                  class="trailer_img"
                  src="${product.images[2].src}"
                  alt="Trailer video"/>
                <div class="game_specifications_text">
                <div class="game_specifications_sub">
                  <p>Genre</p>
                  <p>${product.attributes[0].terms[0].name}</p>
                </div>
                <hr />
                <div class="game_specifications_sub">
                  <p>Platform</p>
                  <p>${product.attributes[2].terms[0].name}</p>
                </div>
                <hr />
                <div class="game_specifications_sub">
                  <p>PEGI class</p>
                  <p>${product.attributes[1].terms[0].name}</p>
                </div>
                <hr />
                <div class="game_specifications_sub">
                  <p>Publisher</p>
                  <p>${product.attributes[3].terms[0].name}</p>
                </div>
                <hr />
                <div class="game_specifications_sub">
                  <p>Developer</p>
                  <p>${product.attributes[4].terms[0].name}</p>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>`;
      }
    }
    const addToCartButtons = document.querySelectorAll("#cartbutton");
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const product = JSON.parse(atob(button.dataset.product));
        cartItems.push(product);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        countContainer.innerHTML = cartItems.length;
        this.innerHTML = "Added to cart!";
        this.style.backgroundColor = "#00BBC2";
      });
    });
  } catch (error) {
    console.error(error);
  }
}

fetchData(url);

