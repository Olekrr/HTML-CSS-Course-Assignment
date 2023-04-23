let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
const container = document.querySelector(".scriptinjection");
const totalPriceElement = document.querySelector("#totalprice");

if (cartItems.length === 0) {
  container.innerHTML =
    '<a href="./product_list.html" class="darkbox"\'>Your cart is empty, visit our Games page to add some!</p></a>';
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
    const itemTotalPrice = item.prices.price/100 * itemQuantity;

    totalPrice += itemTotalPrice;

    const itemHTML = `
      <div class="content_container">
        <div class="content_column" data-item-name="${itemName}">
          <div class="bandade">
            <div class="image_container">
              <img class="game_image" src="${item.images[0].src}" alt="Game cover"/>
            </div>
            <div class="description_container">
              <h3>${itemName} - Playbox</h3>
              <hr />
              <p>${item.short_description}</p>
            </div>
          </div>
          <div class="bandade">
            <div class="information_container">
              <p>Quantity</p>
              <div class="quantityflex">
              <button class="decrease-quantity">-</button>
              <p class="margin_adjustment">${itemQuantity}</p>
              <button class="increase-quantity">+</button>
              </div>
            </div>
            <div class="information_container">
              <p>Price</p>
              <p class="margin_adjustment">${itemTotalPrice}kr</p>
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

    container.insertAdjacentHTML("beforeend", itemHTML);
  }

  totalPriceElement.innerHTML = totalPrice + "kr";

  const updateQuantity = (button, increase) => {
    const itemContainer = button.closest(".content_column");
    const itemName = itemContainer
      .querySelector("h3")
      .textContent.split(" - ")[0];
    const item = cartItems.find((item) => item.name === itemName);
    const quantityElement = itemContainer.querySelector(".margin_adjustment");
    

    if (increase) {
      itemQuantities[itemName]++;
      cartItems.push(item);
    } else if (itemQuantities[itemName] > 1) {
      itemQuantities[itemName]--;
      const itemIndex = cartItems.findIndex(
        (cartItem) => cartItem.name === itemName
      );
      if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1);
      }
    } else {
      return;
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    quantityElement.textContent = itemQuantities[itemName];
    const itemTotalPrice = item.prices.price/100 * itemQuantities[itemName];
    itemContainer.querySelector(
      ".information_container p:last-child"
    ).textContent = `${itemTotalPrice}kr`;

    totalPrice += increase ? item.prices.price/100 : -item.prices.price/100;
    totalPriceElement.innerHTML = totalPrice + "kr";
  };

  const increaseButtons = document.querySelectorAll(".increase-quantity");
  increaseButtons.forEach((button) => {
    button.addEventListener("click", () => updateQuantity(button, true));
  });

  const decreaseButtons = document.querySelectorAll(".decrease-quantity");
  decreaseButtons.forEach((button) => {
    button.addEventListener("click", () => updateQuantity(button, false));
  });

  const removeButtons = document.querySelectorAll(".remove_button");
  removeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const itemContainer = button.closest(".content_column");
      const itemName = itemContainer
        .querySelector("h3")
        .textContent.split(" - ")[0];
      const removedItem = cartItems.find((item) => item.name === itemName);

      cartItems = cartItems.filter((item) => item.name !== itemName);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      itemContainer.remove();

      totalPrice -= removedItem.prices.price/100 * itemQuantities[itemName];
      totalPriceElement.innerHTML = totalPrice + "kr";

      if (cartItems.length === 0) {
        window.location.reload();
      }
    });
  });
}
countContainer.innerHTML = `${count}`;
