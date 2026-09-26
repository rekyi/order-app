function categoryTemplate(category) {
  return `
  <section class="menu-section">
    <header class="menu-header">
      <div class="menu-header-content">
        <img src="${category.iconSrc}" alt="${category.categoryName}" width="88" height="91">
        <h2>${category.categoryName}</h2>
      </div>
    </header>
    <div id="${category.id}" class="menu-wrapper"></div>
  </section>`;
}

function productTemplate(product) {
  const ingredientsText = product.ingredients.join(", ");
  const formattedPrice = formatPrice(product.price);
  let addBtn = "";

  if (product.quantity > 0) addBtn = `<button class="add-btn" disabled>Added ${product.quantity}</button>`;
  else {
    addBtn = `<button class="add-btn" onclick="increaseQuantity('${product.name}')">Add to basket</button>`;
  }
  return `
  <article class="product-card">
    <img class="product-image" src="${product.src}" alt="${product.name}" width="207" height="121" />
    <div class="product-info">
      <h3 class="product-title">${product.name}</h3>
      <p class="product-ingredients">${ingredientsText}</p>
      <span class="product-price">${formattedPrice}</span>
      ${addBtn}
    </div>
  </article>`;
}

function dialogBasketTemplate(item) {
  const linePrice = formatPrice(item.price * item.quantity);
  let removeBtn = "";

  if (item.quantity > 1) {
    removeBtn = `<button class="basket-remove-btn" type="button" onclick="decreaseQuantity('${item.name}')" aria-label="Decrease quantity">-</button>`;
  } else {
    removeBtn = `
      <button class="basket-remove-btn" type="button" onclick="decreaseQuantity('${item.name}')" aria-label="Remove item">
        <img src="assets/icons/delete_icon.svg" alt="" width="16" height="18" />
      </button>`;
  }

  return `
    <li class="basket-item">
      <h3 class="basket-item-title">${item.name}</h3>
      <div class="basket-item-footer">
        <div class="basket-item-controls">
          ${removeBtn}
          <span class="basket-item-amount">${item.quantity}</span>
          <button class="basket-add-btn" type="button" onclick="increaseQuantity('${item.name}')" aria-label="Increase quantity">+</button>
        </div>
        <span class="basket-item-price">${linePrice}</span>
      </div>
    </li>`;
}
