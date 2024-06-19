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



async function createProductSection(categoria) {~
    debbuger
    const categoria = categoria;

    try {
        const response = await fetch(`/api/pgs/products/id_category/${categoria}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const products = await response.json();
        const productSection = document.getElementById('ProductSection');
        productSection.innerHTML = products.map(product => `
            <div class="col-md-5">
                <div class="main-img">
                    <img class="img-fluid" src="${product.imagem}" alt="${product.nome}">
                </div>
            </div>
            <div class="col-md-5">
                <div class="main-description px-2">
                    <div class="category text-bold">
                        Category: ${product.id_categoria}
                    </div>
                    <div class="product-title text-bold my-3">
                        ${product.nome}
                    </div>
                    <div class="price-area my-4">
                        <p class="price-title text-bold mb-1">Price:</p>
                        <p class="price mb-1">$${product.preco}</p>
                    </div>
                    <div class="buttons d-flex my-5">
                        <div class="block">
                            <a href="#" class="shadow btn custom-btn">Wishlist</a>
                        </div>
                        <div class="block">
                            <button class="shadow btn custom-btn">Add to cart</button>
                        </div>
                    </div>
                </div>
                <div class="product-details my-4">
                    <p class="details-title text-color mb-1">Product Details</p>
                    <p class="description">${product.descricao}</p>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }    
}
//Meu código
// Novo código para filtros
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


function displayProducts(products) {
    const productSection = document.getElementById('ProductSection');
    productSection.innerHTML = products.map(product => `
        <div class="col-md-5">
            <div class="main-img">
                <img class="img-fluid" src="${product.imagem}" alt="${product.nome}">
            </div>
        </div>
        <div class="col-md-5">
            <div class="main-description px-2">
                <div class="category text-bold">
                    Category: ${product.id_categoria}
                </div>
                <div class="product-title text-bold my-3">
                    ${product.nome}
                </div>
                <div class="price-area my-4">
                    <p class="price-title text-bold mb-1">Price:</p>
                    <p class="price mb-1">$${product.preco}</p>
                </div>
                <div class="buttons d-flex my-5">
                    <div class="block">
                        <a href="#" class="shadow btn custom-btn">Wishlist</a>
                    </div>
                    <div class="block">
                        <button class="shadow btn custom-btn">Add to cart</button>
                    </div>
                </div>
            </div>
            <div class="product-details my-4">
                <p class="details-title text-color mb-1">Product Details</p>
                <p class="description">${product.descricao}</p>
            </div>
        </div>
    `).join('');
}