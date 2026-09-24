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

document.getElementById("basket-items").innerHTML = dialogBasketTemplate({
  name: "test test asts tststst",
  price: 16.9,
  quantity: 2,
});
