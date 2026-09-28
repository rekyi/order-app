function categoryTemplate(category) {
  return `
  <section class="menu-section">
    <header class="menu-header">
      <div class="menu-header-content">
        <img src="${category.iconSrc}" alt="" width="128" height="128" aria-hidden="true">
        <h2>${category.categoryName}</h2>
      </div>
    </header>
    <div id="${category.id}" class="menu-wrapper"></div>
  </section>`;
}

function productTemplate(product, ingredientsText, formattedPrice, addBtn) {
  return `
  <article class="product-card">
    <img class="product-image" src="${product.src}" alt="" width="800" height="800" loading="lazy" />
    <div class="product-info">
      <h3 class="product-title">${product.name}</h3>
      <p class="product-ingredients">${ingredientsText}</p>
      <span class="product-price">${formattedPrice}</span>
      ${addBtn}
    </div>
  </article>`;
}

function addBtnTemplate(name) {
  return `<button class="add-btn" onclick="addFromMenu('${name}')">Add to basket</button>`;
}

function addedBtnTemplate(name, quantityText) {
  return `<button class="add-btn" onclick="expandMenuItem('${name}')">Added <span class="add-btn-count">${quantityText}</span></button>`;
}

function stepperTemplate(name, quantityText) {
  return `
    <div class="add-stepper">
      <button class="stepper-btn" type="button" onclick="decreaseQuantity('${name}')" aria-label="Decrease quantity">-</button>
      <span class="add-btn-count">${quantityText}</span>
      <button class="stepper-btn" type="button" onclick="increaseQuantity('${name}')" aria-label="Increase quantity">+</button>
    </div>`;
}

function categorySliderItemTemplate(category) {
  return `
  <a class="category-slider-item" href="#${category.id}">
    <img src="${category.iconSrc}" alt="" width="128" height="128" aria-hidden="true" />
    <span>${category.categoryName}</span>
  </a>`;
}

function dialogBasketTemplate(item, linePrice) {
  return `
    <li class="basket-item">
      <h3 class="basket-item-title">${item.name}</h3>
      <div class="basket-item-footer">
        <div class="basket-item-controls">
          <button class="basket-remove-btn" type="button" onclick="decreaseQuantity('${item.name}')" aria-label="Decrease quantity">-</button>
          <span class="basket-item-amount">${item.quantity}</span>
          <button class="basket-add-btn" type="button" onclick="increaseQuantity('${item.name}')" aria-label="Increase quantity">+</button>
        </div>
        <span class="basket-item-price">${linePrice}</span>
      </div>
    </li>`;
}
