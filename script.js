const FREE_DELIVERY_THRESHOLD = 30;
const DELIVERY_FEE = 4.99;

function init() {
  renderBasket();
}

function renderMenu() {
  const menuContainer = document.getElementById("menu-container");
  menuContainer.innerHTML = "";

  for (let categoryIndex = 0; categoryIndex < menuArray.length; categoryIndex++) {
    const category = menuArray[categoryIndex];
    menuContainer.innerHTML += categoryTemplate(category);

    const categoryWrapper = document.getElementById(category.id);
    for (let productIndex = 0; productIndex < category.items.length; productIndex++) {
      const product = category.items[productIndex];
      categoryWrapper.innerHTML += productTemplate(product);
    }
  }
}
renderMenu();

function initBasketDialog() {
  const dialogRef = document.getElementById("basket-dialog");

  document.getElementById("cart").addEventListener("click", () => dialogRef.showModal());
  document.getElementById("basket-close-btn").addEventListener("click", () => dialogRef.close());
  dialogRef.addEventListener("click", onBackdropClick);
}
initBasketDialog();

function onBackdropClick(event) {
  const dialogRef = event.currentTarget;

  if (event.target === dialogRef) {
    dialogRef.close();
  }
}

function getAllItems() {
  const allItems = [];

  for (let categoryIndex = 0; categoryIndex < menuArray.length; categoryIndex++) {
    const category = menuArray[categoryIndex];

    for (let itemIndex = 0; itemIndex < category.items.length; itemIndex++) {
      const item = category.items[itemIndex];
      allItems.push(item);
    }
  }
  return allItems;
}

function getBasketItems() {
  const allItems = getAllItems();
  const basketItems = [];

  for (let allItemsIndex = 0; allItemsIndex < allItems.length; allItemsIndex++) {
    if (allItems[allItemsIndex].quantity > 0) {
      basketItems.push(allItems[allItemsIndex]);
    }
  }
  return basketItems;
}

function renderBasketItems() {
  const basketItems = getBasketItems();
  const basketRef = document.getElementById("basket-items");
  basketRef.innerHTML = "";

  for (let basketItemIndex = 0; basketItemIndex < basketItems.length; basketItemIndex++) {
    const item = basketItems[basketItemIndex];
    basketRef.innerHTML += dialogBasketTemplate(item);
  }
}

function calculateSubtotal() {
  const basketItems = getBasketItems();
  let subtotal = 0;

  for (let basketItemIndex = 0; basketItemIndex < basketItems.length; basketItemIndex++) {
    const item = basketItems[basketItemIndex];
    subtotal += item.quantity * item.price;
  }
  return subtotal;
}

function calculateTotalQuantity() {
  const basketItems = getBasketItems();
  let totalQuantity = 0;

  for (let basketItemIndex = 0; basketItemIndex < basketItems.length; basketItemIndex++) {
    const item = basketItems[basketItemIndex];
    totalQuantity += item.quantity;
  }
  return totalQuantity;
}

function formatPrice(number) {
  const formattedPrice = number.toFixed(2).replace(".", ",") + "€";
  return formattedPrice;
}

function getDeliveryFeeText(deliveryFee) {
  if (deliveryFee === 0) {
    return `<span class="delivery-fee-original">${formatPrice(DELIVERY_FEE)}</span> <span class="delivery-fee-free">Free</span>`;
  } else {
    return formatPrice(deliveryFee);
  }
}

function renderBasketSummary() {
  const subtotal = calculateSubtotal();
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  document.getElementById("basket-subtotal").textContent = formatPrice(subtotal);
  document.getElementById("basket-delivery").innerHTML = getDeliveryFeeText(deliveryFee);
  document.getElementById("basket-total").textContent = formatPrice(total);
  document.getElementById("basket-buy-btn").textContent = `Buy now (${formatPrice(total)})`;
}

function renderCartCount() {
  const totalQuantity = calculateTotalQuantity();
  const cartCount = document.getElementById("cart-count");
  const displayCount = totalQuantity > 99 ? "99+" : totalQuantity;

  cartCount.classList.toggle("cart-count", totalQuantity > 0);
  cartCount.innerHTML = totalQuantity > 0 ? displayCount : "";
}

function changeQuantity(name, amount) {
  const allItems = getAllItems();
  const foundItem = allItems.find((item) => item.name === name);
  foundItem.quantity += amount;
  renderAll();
}

function increaseQuantity(name) {
  changeQuantity(name, 1);
}

function decreaseQuantity(name) {
  changeQuantity(name, -1);
}

function renderBasket() {
  renderBasketItems();
  renderBasketSummary();
  renderCartCount();
}

function renderAll() {
  renderMenu();
  renderBasket();
}
