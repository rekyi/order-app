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
  const formattedPrice = product.price.toFixed(2).replace(".", ",") + "€";

  return `
    <article class="product-card">
      <img class="product-image" src="${product.src}" alt="${product.name}" width="207" height="121" />
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-ingredients">${ingredientsText}</p>
        <span class="product-price">${formattedPrice}</span>
        <button class="add-btn" onclick="addToBasket('${product.name}')">
          Add to basket
        </button>
      </div>
    </article>`;
}
