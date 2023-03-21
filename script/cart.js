let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
const container = document.querySelector(".scriptinjection");
const totalPriceElement = document.querySelector("#totalprice");

if (cartItems.length === 0) {
  container.innerHTML = "<a href=\"./product_list.html\" class=\"darkbox\"'>Your cart is empty, visit our Games page to add some!</p></a>";
} else {
  const itemQuantities = {};

  cartItems.forEach((item) => {
    if (item.name in itemQuantities) {
      itemQuantities[item.name]++;
    } else {
      itemQuantities[item.name] = 1;
    }
  });

  let totalPrice = 0;

  for (const itemName in itemQuantities) {
    const itemQuantity = itemQuantities[itemName];
    const item = cartItems.find((item) => item.name === itemName);
    const itemTotalPrice = item.price * itemQuantity;
  
    totalPrice += itemTotalPrice;
  
    const itemHTML = `
      <div class="content_container">
        <div class="content_column" data-item-name="${itemName}">
          <div class="bandade">
            <div class="image_container">
              <img class="game_image" src="${item.cover_url}" alt="Game cover"/>
            </div>
            <div class="description_container">
              <h3>${itemName} - Playbox</h3>
              <hr />
              <p>${item.cartText}</p>
            </div>
          </div>
          <div class="bandade">
            <div class="information_container">
              <p>Quantity</p>
              <p class="margin_adjustment">${itemQuantity}</p>
            </div>
            <div class="information_container">
              <p>Price</p>
              <p class="margin_adjustment">${itemTotalPrice}$</p>
            </div>
            <div class="information_container">
              <p>Remove</p>
              <img
                class="remove_button"
                src="Assets/images/redX.png"
                alt="remove product"
              />
            </div>
          </div>
        </div>
      </div>
    `;
  
    container.insertAdjacentHTML('beforeend', itemHTML);
  }
  
  totalPriceElement.innerHTML = totalPrice + "$";

  const removeButtons = document.querySelectorAll(".remove_button");
  removeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const itemContainer = button.closest(".content_column");
      const itemName = itemContainer.querySelector("h3").textContent.split(" - ")[0];
      const removedItem = cartItems.find((item) => item.name === itemName);
      
      cartItems = cartItems.filter((item) => item.name !== itemName);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      
      itemContainer.remove();
  
      totalPrice -= removedItem.price * itemQuantities[itemName];
      totalPriceElement.innerHTML = totalPrice + "$";
  
      if (cartItems.length === 0) {
        window.location.reload();
      }
    });
  });
}
countContainer.innerHTML = `${count}`