let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
const container = document.querySelector(".products");
const totalPriceElement = document.querySelector("#totalprice");

if (cartItems.length === 0) {
  container.innerHTML = "<p>Your cart is empty</p>";
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
  
    const itemHTML = ` <div class="content_column_subcontainer">
                        <img src="${item.cover_url}" alt="Game cover"/>
                        <div class="text_container">
                            <h3>${item.name}</h3>
                            <hr />
                            <p>${item.cartText}</p>
                        </div>
                        <br class="mobilebr" />
                        <hr class="mobilehr" />
                        <div>
                            <p>Quantity</p>
                            <p>${itemQuantity}</p>
                        </div>
                            <br class="mobilebr" />
                            <hr class="mobilehr" />
                        <div>
                            <p>Total</p>
                            <p>${itemTotalPrice}$</p>
                        </div>
                        </div>
    `;
  
    container.insertAdjacentHTML('beforeend', itemHTML);
  }
  
  totalPriceElement.innerHTML = totalPrice + "$";
}