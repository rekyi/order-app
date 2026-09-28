const FREE_DELIVERY_THRESHOLD = 30;
const DELIVERY_FEE = 4.99;
let expandedItemName = "";

function init() {
  renderMenu();
  renderCategorySlider();
  initCategorySlider();
  initBasketDialog();
  initConfirmationDialog();
  renderBasket();
}

function renderMenu() {
  const menuContainer = document.getElementById("menu-categories");
  menuContainer.innerHTML = "";

  for (let categoryIndex = 0; categoryIndex < menuArray.length; categoryIndex++) {
    const category = menuArray[categoryIndex];
    menuContainer.innerHTML += categoryTemplate(category);

    const categoryWrapper = document.getElementById(category.id);
    for (let productIndex = 0; productIndex < category.items.length; productIndex++) {
      const product = category.items[productIndex];
      categoryWrapper.innerHTML += getProductHtml(product);
    }
  }
}

function formatQuantity(quantity) {
  return quantity > 99 ? "99+" : quantity;
}

function getAddBtn(product) {
  const quantityText = formatQuantity(product.quantity);

  if (product.quantity === 0) {
    return addBtnTemplate(product.name);
  }
  if (product.name === expandedItemName) {
    return stepperTemplate(product.name, quantityText);
  }
  return addedBtnTemplate(product.name, quantityText);
}

function getProductHtml(product) {
  const ingredientsText = product.ingredients.join(", ");
  const formattedPrice = formatPrice(product.price);
  const addBtn = getAddBtn(product);

  return productTemplate(product, ingredientsText, formattedPrice, addBtn);
}

function renderCategorySlider() {
  const sliderRef = document.getElementById("category-slider");
  sliderRef.innerHTML = "";

  for (let categoryIndex = 0; categoryIndex < menuArray.length; categoryIndex++) {
    const category = menuArray[categoryIndex];
    sliderRef.innerHTML += categorySliderItemTemplate(category);
  }
}

function initCategorySlider() {
  const btnRef = document.getElementById("hamburger-btn");
  const sliderRef = document.getElementById("category-slider");

  btnRef.addEventListener("click", () => {
    sliderRef.classList.toggle("open");
  });
}

function initBasketDialog() {
  const dialogRef = document.getElementById("basket-dialog");
  const desktopBreakpoint = window.matchMedia("(min-width: 1000px)");

  document.getElementById("cart").addEventListener("click", () => {
    dialogRef.showModal();
    requestAnimationFrame(() => {
      dialogRef.classList.add("slide-up");
    });
  });
  document.getElementById("basket-close-btn").addEventListener("click", () => dialogRef.close());
  dialogRef.addEventListener("click", onBackdropClick);
  dialogRef.addEventListener("close", () => {
    dialogRef.classList.remove("slide-up");
  });
  desktopBreakpoint.addEventListener("change", (event) => {
    if (event.matches && dialogRef.open) {
      dialogRef.close();
    }
  });
}

function initConfirmationDialog() {
  const confirmationDialogRef = document.getElementById("confirmation-dialog");
  document.getElementById("confirmation-close-btn").addEventListener("click", () => confirmationDialogRef.close());
  confirmationDialogRef.addEventListener("click", onBackdropClick);
}

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

function calculateDiscount(subtotal) {
  if (subtotal >= 50) {
    return subtotal * 0.05;
  } else {
    return 0;
  }
}

function formatPrice(number) {
  const formattedPrice = number.toFixed(2).replace(".", ",") + "€";
  return formattedPrice;
}

function getDeliveryFeeText(deliveryFee) {
  if (deliveryFee === 0) {
    return `<span class="delivery-fee-original">${formatPrice(DELIVERY_FEE)}</span> <span class="delivery-fee-free">0,00€</span>`;
  } else {
    return formatPrice(deliveryFee);
  }
}

function renderBasketItems() {
  const basketItems = getBasketItems();
  const basketRef = document.getElementById("basket-items");
  basketRef.innerHTML = "";

  for (let basketItemIndex = 0; basketItemIndex < basketItems.length; basketItemIndex++) {
    const item = basketItems[basketItemIndex];
    basketRef.innerHTML += getBasketItemHtml(item);
  }
}

function getBasketItemHtml(item) {
  const linePrice = formatPrice(item.price * item.quantity);
  return dialogBasketTemplate(item, linePrice);
}

function renderBasketSummary() {
  const subtotal = calculateSubtotal();
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const discount = calculateDiscount(subtotal);
  const total = subtotal + deliveryFee - discount;

  const discountRowRef = document.getElementById("basket-discount-row");
  discountRowRef.classList.toggle("hidden", discount === 0);
  document.getElementById("basket-discount").textContent = `-${formatPrice(discount)}`;

  document.getElementById("basket-subtotal").textContent = formatPrice(subtotal);
  document.getElementById("basket-delivery").innerHTML = getDeliveryFeeText(deliveryFee);
  document.getElementById("basket-total").textContent = formatPrice(total);
  document.getElementById("basket-buy-btn").textContent = "Go to checkout";
}

function toggleBasketSummaryVisibility() {
  const isEmpty = getBasketItems().length === 0;

  document.getElementById("basket-summary").classList.toggle("hidden", isEmpty);
  document.getElementById("basket-buy-btn").classList.toggle("hidden", isEmpty);
}

function renderCartCount() {
  const totalQuantity = calculateTotalQuantity();
  const cartCount = document.getElementById("cart-count");
  const displayCount = formatQuantity(totalQuantity);

  cartCount.classList.toggle("cart-count", totalQuantity > 0);
  cartCount.textContent = totalQuantity > 0 ? displayCount : "";
}

function renderBasket() {
  renderBasketItems();
  renderBasketSummary();
  renderCartCount();
  toggleBasketSummaryVisibility();
}

function renderAll() {
  renderMenu();
  renderBasket();
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

function expandMenuItem(name) {
  expandedItemName = name;
  renderMenu();
}

function addFromMenu(name) {
  expandedItemName = name;
  increaseQuantity(name);
}

function buyNow() {
  const allItems = getAllItems();

  for (let allItemsIndex = 0; allItemsIndex < allItems.length; allItemsIndex++) {
    allItems[allItemsIndex].quantity = 0;
  }
  document.getElementById("basket-dialog").close();
  renderAll();

  const confirmationDialogRef = document.getElementById("confirmation-dialog");
  confirmationDialogRef.showModal();
  setTimeout(() => {
    confirmationDialogRef.close();
  }, 3000);
}

init();
