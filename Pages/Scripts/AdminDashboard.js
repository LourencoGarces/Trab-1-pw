// DOM Elements
const productListSection = document.getElementById('productListSection');
const addProductSection = document.getElementById('addProductSection');
const editProductSection = document.getElementById('editProductSection');
const productTableBody = document.getElementById('productTableBody');
const addProductForm = document.getElementById('addProductForm');
const addCategorieSection = document.getElementById('addCategorieSection');
const addCategorieForm = document.getElementById('addCategorieForm');

document.addEventListener('DOMContentLoaded', async function() {
    var productCategory = document.getElementById('productCategory');
    try {
        // Fetch categories from the backend API
        const response = await fetch('http://localhost:4242/api/pgs/Categories');
        const categories = await response.json();

        // Populate the product category dropdown dynamically
        productCategory.innerHTML = `
            <select class="form-select" id="productCategoryValue" required>
                <option value="" selected disabled>Seleciona a categoria</option>
                ${categories.map(category => `<option value="${category.id_categoria}">${category.descricao}</option>`).join('')}
            </select>
        `;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
});

async function fetchCategories() {
    let strHtml = ``;
    try {
        // Fetch categories from the backend API
        const response = await fetch('http://localhost:4242/api/pgs/Categories');
        const data = await response.json();

        for (const artigo of data) {
            strHtml += `
            <li>
                <a href="#" class="nav-link" onclick="showProductsByCategory('${artigo.id_categoria}')">${artigo.descricao}</a>
                </li>`;
        }

        document.getElementById('categoryListPlaceholder').innerHTML = strHtml;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

async function showProductsByCategory(category) {
    location.reload();
    try {
        const response = await fetch(`http://localhost:4242/api/pgs/Products/category/${category}`);
        const produtos = await response.json();
        
        let strHtml = '';
        
        produtos.forEach(artigo => {
            strHtml += `
                <tr>
                    <td>${artigo.id_produto}</td>
                    <td>${artigo.nome}</td>
                    <td>${artigo.descricao}</td>
                    <td>${artigo.preco}</td>
                    <td>${artigo.fabricante}</td>
                    <td>${artigo.id_categoria}</td>
                    <td>
                        <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#upModal" onclick="preparaEditProdutos(${artigo.id_produto})"><i class="fa fa-pencil"></i> Editar</button>
                        <button type='button' class='btn btn-danger' onclick="apagaProduto(${artigo.id_produto})"><i class="fa fa-trash"></i> Apagar</button>
                    </td>
                </tr>
            `;
        });
        
        document.getElementById("productTableBody").innerHTML = strHtml;
    } catch (error) {
        console.error('Error fetching products for category:', error);
    }
}

// Function to display all products sorted by ID
const showProductList = () => {
    // Show product list section
    productListSection.style.display = 'block';
    addProductSection.style.display = 'none';
    editProductSection.style.display = 'none';
    addCategorieSection.style.display = 'none';
};

// Function to display the add product form
const showAddProductForm = () => {
    addProductForm.reset();
    productListSection.style.display = 'none';
    addProductSection.style.display = 'block';
    editProductSection.style.display = 'none';
    addCategorieSection.style.display = 'none';
};

// Function to display the add category form
const showAddCategorieForm = () => {
    addCategorieForm.reset();
    productListSection.style.display = 'none';
    addProductSection.style.display = 'none';
    editProductSection.style.display = 'none';
    addCategorieSection.style.display = 'block';
};

// Event listener for "List Products" link
document.getElementById('listProducts').addEventListener('click', () => {
    showProductList();
});

// Event listener for "Add Product" link
document.getElementById('addProduct').addEventListener('click', () => {
    showAddProductForm();
});

// Event listener for "Add Category" link
document.getElementById('addCategory').addEventListener('click', () => {
    showAddCategorieForm();
});

// Event listener for form submission
addProductForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    // Retrieve form input values
    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;
    const productPrice = parseFloat(document.getElementById('productPrice').value); 
    const productManufacturer=  document.getElementById('productManufacturer').value;
    const productCategoryValue = parseInt(document.getElementById('productCategoryValue').value);

    // Create new product object with category ID
    const newProduct = {
        nome: productName,
        descricao: productDescription,
        preco: productPrice,
        fabricante: productManufacturer,
        categoria: productCategoryValue,
        imagem: "we" //Implementar imagens
    };

    try {
        // Send POST request to the backend API to create a new product
        const response = await fetch(`http://localhost:4242/Api/Pgs/Products/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct),
        });

        const result = await response.json();
        if (response.ok) {
            alert('Produto adicionado com sucesso');

            // Show product list after adding
            showProductList();
        } else {
            alert('Erro ao adicionar produto: ' + result.msg);
        }
    } catch (error) {
        console.error('Error adding product:', error);
    }
});

// Event listener for form submission
addCategorieForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    // Retrieve form input values
    const descricao = document.getElementById('categorieName').value;
    // Fetch existing categories
    const response = await fetch('http://localhost:4242/api/pgs/Categories');
    const categories = await response.json();

    // Check if the category already exists
    const categoryExists = categories.some(category => category.descricao.toLowerCase() === descricao.toLowerCase());

    if (categoryExists) {
        alert('A categoria já existe!');
        return; // Stop further execution if category exists
    }

    // Create new category object
    const newCategorie = {
        descricao: descricao,
    };

    try {
        // Send POST request to the backend API to create a new category
        const response = await fetch(`http://localhost:4242/Api/Pgs/Categories/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCategorie),
        });

        const result = await response.json();
        if (response.ok) {
            alert('Categoria adicionada com sucesso');

            // Show product list after adding and refresh page
            location.reload();
            showProductList();
        } else {
            alert('Erro ao adicionar categoria: ' + result.msg);
        }
    } catch (error) {
        console.error('Error adding category:', error);
    }
});

// Load initial product data when DOM is ready
showProductList(); // Display initial product list

// Function to populate the edit form with product data
const populateEditForm = (productId) => {
    // Find the product to be edited in the products array
    const productToEdit = products.find(product => product.id === productId);

    if (!productToEdit) {
        console.error('Produto não encontrado.');
        return;
    }

    // Call function to construct and display the edit form with product details
    formeditProduct(productToEdit);
};

const formeditProduct = async (productId) => {
    const editProductSection = document.getElementById('editProductSection');
    if (!editProductSection) {
        console.error('Elemento editProductSection não foi encontrado no DOM.');
        return;
    }

    try {
        // Fetch product data from the backend API
        const response = await fetch(`http://localhost:4242/api/pgs/Products/`);
        const product = await response.json();

        // Fetch categories (assuming categories are fetched from an API)
        const categoriesResponse = await fetch(`http://localhost:4242/api/pgs/Categories/`);
        const categories = await categoriesResponse.json();

        // Create and populate the edit form
        editProductSection.innerHTML = `
            <h2>Edit Product</h2>
            <form id="editProductForm">
                <div class="mb-3">
                    <label for="editProductName" class="form-label">Nome:</label>
                    <input type="text" class="form-control" id="editProductName" value="${product.nome}" required>
                </div>
                <div class="mb-3">
                    <label for="editProductDescription" class="form-label">Descrição:</label>
                    <textarea class="form-control" id="editProductDescription" rows="3" required>${product.descricao}</textarea>
                </div>
                <div class="mb-3">
                    <label for="editProductPrice" class="form-label">Preço:</label>
                    <input type="number" class="form-control" id="editProductPrice" step="0.01" value="${product.preco}" required>
                </div>
                <div class="mb-3">
                    <label for="editProductManufacturer" class="form-label">Fabricante:</label>
                    <input type="text" class="form-control" id="editProductManufacturer" value="${product.fabricante}" required>
                </div>
                <div class="mb-3">
                    <label for="editProductCategory" class="form-label">Categoria:</label>
                    <select class="form-select" id="editProductCategory" required>
                        ${categories.map(category => `<option value="${category.id_categoria}" ${product.id_categoria === category.id ? 'selected' : ''}>${category.nome}</option>`).join('')}
                    </select>
                </div>
                <button type="button" class="btn btn-primary" onclick="saveUpdatedProduct(${product.id})">Editar Produto</button>
            </form>
        `;

        // Display the product edit section
        editProductSection.style.display = 'block';
        productListSection.style.display = 'none';
        addProductSection.style.display = 'none';
        addCategorieSection.style.display = 'none';
    } catch (error) {
        console.error('Error fetching product data:', error);
    }
};

// Example saveUpdatedProduct function
const saveUpdatedProduct = async (productId) => {
    const name = document.getElementById('editProductName').value;
    const description = document.getElementById('editProductDescription').value;
    const price = document.getElementById('editProductPrice').value;
    const category = document.getElementById('editProductCategory').value;

    try {
        const response = await fetch(`http://localhost:4242/api/pgs/Products/update/${productId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_product: productId, nome: name, descricao: description, preco: price, id_categoria: category }),
        });
        const result = await response.json();
        if (response.ok) {
            alert('Product updated successfully');
        } else {
            alert('Error updating product: ' + result.msg);
        }
    } catch (error) {
        console.error('Error updating product:', error);
    }
};

const listarProdutos = async () => {
    try {
        const response = await fetch('http://localhost:4242/api/pgs/Products/');
        const produtos = await response.json();
        
        let strHtml = '';
        
        produtos.forEach(artigo => {
            strHtml += `
                <tr>
                    <td>${artigo.id_produto}</td>
                    <td>${artigo.nome}</td>
                    <td>${artigo.descricao}</td>
                    <td>${artigo.preco}</td>
                    <td>${artigo.fabricante}</td>
                    <td>${artigo.id_categoria}</td>
                    <td>
                        <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#upModal" onclick="preparaEditProdutos(${artigo.id_produto})"><i class="fa fa-pencil"></i> Editar</button>
                        <button type='button' class='btn btn-danger' onclick="apagaProduto(${artigo.id_produto})"><i class="fa fa-trash"></i> Apagar</button>
                    </td>
                </tr>
            `;
        });
        
        document.getElementById("productTableBody").innerHTML = strHtml;
    } catch (error) {
        console.error('Error fetching product data:', error);
    }
};

listarProdutos();

const apagaProduto = async (id_produto) => {
    try {
        const response = await fetch(`http://localhost:4242/api/pgs/Products/delete/${id_produto}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error("Erro ao apagar o produto");
        }
        alert("O produto foi apagado com sucesso!");
        listarProdutos();
    } catch (error) {
        console.error("Houve um erro:", error);
    }
};

const preparaEditProdutos = async (id_produto) => {
    try {
        const response = await fetch(`http://localhost:4242/api/pgs/Products/${id_produto}`);
        const product = await response.json();

        const categoriesResponse = await fetch(`http://localhost:4242/api/pgs/Categories/`);
        const categories = await categoriesResponse.json();
        
        // Create and populate the edit form
        editProductSection.innerHTML = `
            <h2>Edit Product</h2>
            <form id="editProductForm">
                <div class="mb-3">
                    <label for="editProductName" class="form-label">Nome:</label>
                    <input type="text" class="form-control" id="editProductName" value="${product.nome}" required>
                </div>
                <div class="mb-3">
                    <label for="editProductDescription" class="form-label">Descrição:</label>
                    <textarea class="form-control" id="editProductDescription" rows="3" required>${product.descricao}</textarea>
                </div>
                <div class="mb-3">
                    <label for="editProductPrice" class="form-label">Preço:</label>
                    <input type="number" class="form-control" id="editProductPrice" step="0.01" value="${product.preco}" required>
                </div>
                <div class="mb-3">
                    <label for="editProductManufacturer" class="form-label">Fabricante:</label>
                    <input type="text" class="form-control" id="editProductManufacturer" value="${product.fabricante}" required>
                </div>
                <div class="mb-3">
                    <label for="editProductCategory" class="form-label">Categoria:</label>
                    <select class="form-select" id="editProductCategory" required>
                        ${categories.map(category => `<option value="${category.id_categoria}" ${product.id_categoria === category.id_categoria ? 'selected' : ''}>${category.descricao}</option>`).join('')}
                    </select>
                </div>
                <button type="button" class="btn btn-primary" onclick="atualizaProduto(${id_produto})">Editar Produto</button>
            </form>
        `;
        // Display the product edit section
        editProductSection.style.display = 'block';
        productListSection.style.display = 'none';
        addProductSection.style.display = 'none';
        addCategorieSection.style.display = 'none';
    } catch (error) {
        console.error("Houve um erro:", error);
    }
};

const atualizaProduto = async (id_produto) => {
    const nome = document.getElementById('editProductName').value;
    const descricao = document.getElementById('editProductDescription').value;
    const preco = parseFloat(document.getElementById('editProductPrice').value);
    const fabricante = document.getElementById('editProductManufacturer').value;
    const categoria = parseInt(document.getElementById('editProductCategory').value);

    const updatedProduct = {
        id: id_produto,
        nome: nome,
        descricao: descricao,
        preco: preco,
        fabricante: fabricante,
        categoria: categoria
    };

    try {
        const response = await fetch(`http://localhost:4242/api/pgs/Products/update/${id_produto}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProduct),
        });

        if (!response.ok) {
            throw new Error("Erro ao atualizar o produto");
        }
        alert('Produto atualizado com sucesso');
        editProductSection.style.display = 'none';
        productListSection.style.display = 'block';
        addProductSection.style.display = 'none';
        addCategorieSection.style.display = 'none';
        listarProdutos(); // Refresh the product list
    } catch (error) {
        console.error("Houve um erro:", error);
        alert('Erro ao atualizar o produto');
    }
};
