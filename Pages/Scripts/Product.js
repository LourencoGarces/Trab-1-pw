// Event listener for applying filters
document.getElementById('applyFilters').addEventListener('click', async () => {
    // Get values from filter inputs
    const categoria = document.getElementById('filterCategory').value;
    const preco = document.getElementById('filterPrice').value;
    const fabricante = document.getElementById('filterManufacturer').value;

    // Create a filters object
    const filters = {};

    // Add filters to the object if they exist
    if (categoria) filters.categoria = categoria;
    if (preco) {
        const [preco_min, preco_max] = preco.split('-');
        filters.preco_min = preco_min;
        filters.preco_max = preco_max;
    }
    if (fabricante) filters.fabricante = fabricante;

    // Convert filters object to query string
    const queryString = new URLSearchParams(filters).toString();

    // Fetch filtered products
    try {
        const response = await fetch(`/api/pgs/products?${queryString}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const products = await response.json();
        displayProducts(products); // Display the filtered products
    } catch (error) {
        console.error('Houve um problema com a operação fetch:', error);
    }
});

// Fetch products by category
async function fetchProductsByCategory(categoriaId) {
    try {
        const response = await fetch(`/api/pgs/products/id_category/${categoriaId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const products = await response.json();
        displayProducts(products); // Display the products of the specified category
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

// Fetch and create product section by category
async function createProductSection(categoria) {
    debugger;
    try {
        const response = await fetch(`/api/pgs/products/id_category/${categoria}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const products = await response.json();
        displayProducts(products); // Display the products of the specified category
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

// Function to display products
function displayProducts(products) {
    const productSection = document.getElementById('ProductSection');
    productSection.innerHTML = products.map(product => `
        <div class="col-md-4">
            <div class="card mb-4">
                <img class="card-img-top" src="${product.imagem}" alt="${product.nome}">
                <div class="card-body">
                    <h5 class="card-title">${product.nome}</h5>
                    <p class="card-text">${product.descricao}</p>
                    <p class="card-text"><strong>Preço:</strong> €${product.preco}</p>
                    <p class="card-text"><strong>Fabricante:</strong> ${product.fabricante}</p>
                    <p class="card-text"><strong>Categoria:</strong> ${product.id_categoria}</p>
                    <a href="Wishlist.html" class="btn btn-primary" data-product-id="${product.id_produto}">Adicionar à Lista de Desejos</a>
                </div>
            </div>
        </div>
    `).join('');
}

// Event listener for adding products to the wishlist
document.addEventListener('click', async (event) => {
    if (event.target && event.target.classList.contains('btn-primary')) {
        const productId = event.target.dataset.productId; // Get the product ID from the button's data attribute
        const userId = 1; // Replace with the actual logged-in user's ID
        try {
            const response = await fetch('/api/pgs/products/wishlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, productId }), // Send the user ID and product ID to the server
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            alert('Produto adicionado à wishlist com sucesso'); // Show success message
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }
});


