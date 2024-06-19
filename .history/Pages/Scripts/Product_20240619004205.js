document.getElementById('applyFilters').addEventListener('click', async () => {
    const categoria = document.getElementById('filterCategory').value;
    const preco = document.getElementById('filterPrice').value;
    const fabricante = document.getElementById('filterManufacturer').value;

    const filters = {};

    if (categoria) filters.categoria = categoria;
    if (preco) {
        const [preco_min, preco_max] = preco.split('-');
        filters.preco_min = preco_min;
        filters.preco_max = preco_max;
    }
    if (fabricante) filters.fabricante = fabricante;

    const queryString = new URLSearchParams(filters).toString();

    try {
        const response = await fetch(`/api/pgs/products?${queryString}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Houve um problema com a operação fetch:', error);
    }
});

async function fetchProductsByCategory(categoriaId) {
    try {
        const response = await fetch(`/api/pgs/products/id_category/${categoriaId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

async function createProductSection(categoria) {
    debugger;
    try {
        const response = await fetch(`/api/pgs/products/id_category/${categoria}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }    
}

function displayProducts(products) {
    const productSection = document.getElementById('ProductSection');
    productSection.innerHTML = products.map(product => `
        <div class="col-md-4">
            <div class="card mb-4">
                <img class="card-img-top" src="${product.imagem}" alt="${product.nome}">
                <div class="card-body">
                    <h5 class="card-title">${product.nome}</h5>
                    <p class="card-text">${product.descricao}</p>
                    <p class="card-text"><strong>Preço:</strong> R$${product.preco}</p>
                    <p class="card-text"><strong>Fabricante:</strong> ${product.fabricante}</p>
                    <p class="card-text"><strong>Categoria:</strong> ${product.id_categoria}</p>
                    <a href="Wishlist.html" class="btn btn-primary">Adicionar à Lista de Desejos</a>
                    <button class="btn btn-success">Adicionar ao Carrinho</button>
                </div>
            </div>
        </div>
    `).join('');
}
