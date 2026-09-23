function categoryTemplate(category) {
  return `
  <section class="menu-section">
    <header class="menu-header">
      <img src="${category.iconSrc}" alt="${category.categoryName}">
      <h2>${category.categoryName}</h2>
    </header>
    <div id="${category.id}" class="menu-wrapper"></div>
  </section>`;
}

function productTemplate(product) {
  const ingredientsText = product.ingredients.join(", ");
  const formattedPrice = product.price.toFixed(2).replace(".", ",") + "€";

  return `
    <article class="product-card">
      <img src="${product.src}" alt="${product.name}" class="product-image" />
      <div class="product-info">
        <div class="product-header">
          <h3 class="product-title">${product.name}</h3>
          <span class="product-price">${formattedPrice}</span>
        </div>
        <p class="product-ingredients">${ingredientsText}</p>
        <button class="add-btn" onclick="addToBasket('${product.name}')">
          Add to basket
        </button>
      </div>
    </article>`;
}
