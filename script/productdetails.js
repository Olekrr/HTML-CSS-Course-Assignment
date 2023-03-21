const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const url = "data/products.json";
const container = document.querySelector(".test");
const titleChange = document.querySelector("title");
const countContainer = document.querySelector(".count");
const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
countContainer.innerHTML = cartItems.length;

async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (id && item.id === parseInt(id)) {
        titleChange.innerHTML += `${item.name}`;
        container.innerHTML += `
        <div class="content_container">
          <div class="content_column">
            <div class="game_showcase">
              <div class="rating">
                <img
                  class="stars"
                  src="${item.ratingImage}"
                  alt="star rating"
                />
                <p class="rating_text">${item.rating}</p>
              </div>
              <img
                class="space_war_img"
                src="${item.cover_url}"
                alt="Video game cover"
              />
            </div>
    
            <div class="game_info">
              <h1 class="itemnamesizeadjustment">${item.name} - ${item.price}$</h1>
              <hr />
              <p class="game_info_main_text">${item.game_info}</p>
              <hr />
              <div class="product_details_photo_container">
                <img
                  class="product_details_photo"
                  src="${item.detailsimg1}"
                  alt="gameplay image"
                />
                <img
                  class="product_details_photo"
                  src="${item.detailsimg2}"
                  alt="gameplay image"
                />
                <img
                  class="product_details_photo"
                  src="${item.detailsimg3}"
                  alt="gameplay image"
                />
                <hr />
                <div class="buttons_spacing">
                  <a href="product_list.html" class="product_details_button">
                    <p class="product_details_button_text" id="textmargin"> Continue Shopping </p>
                  </a>
                  <button class="product_details_button" data-product='${btoa(JSON.stringify(item))}' id="cartbutton">
                    <p class="product_details_button_text">Add to Cart</p></button>
                </div>
              </div>
            </div>
            <div class="game_trailer">
              <div class="game_trailer_content_column">
                <h2>Cinematic Trailer</h2>
                  <img
                  class="trailer_img"
                  src="${item.trailerVideo}"
                  alt="Trailer video"/>
                <div class="game_specifications_text">
                <div class="game_specifications_sub">
                  <p>Genre</p>
                  <p>${item.genre}</p>
                </div>
                <hr />
                <div class="game_specifications_sub">
                  <p>Platform</p>
                  <p>${item.platform}</p>
                </div>
                <hr />
                <div class="game_specifications_sub">
                  <p>PEGI class</p>
                  <p>${item.pegi}</p>
                </div>
                <hr />
                <div class="game_specifications_sub">
                  <p>Publisher</p>
                  <p>${item.publisher}</p>
                </div>
                <hr />
                <div class="game_specifications_sub">
                  <p>Developer</p>
                  <p>${item.developer}</p>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
        `;
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
        this.style.backgroundColor = "#0051ff75";
      });
    });
  } catch (error) {
    console.error(error);
  }
}

fetchData(url);

