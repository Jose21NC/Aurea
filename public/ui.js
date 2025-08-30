function getProductHTML(p, currency) {
  return `
    <article class="product">
      <a href="/detail.html?id=${encodeURIComponent(p.id)}" aria-label="${p.title}">
        <div class="p-media">
          <img src="${p.image}" alt="${p.title}" loading="lazy" />
        </div>
        <div class="p-body">
          <div class="p-title">${p.title}</div>
          <div class="price">${currency(p.price)}</div>
        </div>
      </a>
    </article>
  `;
}

export function drawProducts(products, currency, grid, q, currentFilter) {
  const items = products.filter(p => (currentFilter === 'all' || p.category === currentFilter) &&
                                     (!q || p.title.toLowerCase().includes(q)));
  grid.innerHTML = items.map(p => getProductHTML(p, currency)).join('');

  if (items.length === 0) {
    grid.innerHTML = `
      <div class="card" style="grid-column: 1 / -1; text-align:center;">
        <h2>Sin resultados</h2>
        <p class="muted">Prueba otro término o quita los filtros.</p>
      </div>`;
  }
}
