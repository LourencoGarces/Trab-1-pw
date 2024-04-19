// DOM Elements
const productListSection = document.getElementById('productListSection');
const addProductSection = document.getElementById('addProductSection');
const productTableBody = document.getElementById('productTableBody');
const addProductForm = document.getElementById('addProductForm');
const productImageInput = document.getElementById('productImage');
const productImagePreview = document.getElementById('productImagePreview');


const categories = ["Telemóveis", "Ipads", "Smart Watches", "Airpods", "Computadores", "Acessórios"];
// Dynamically populate product category dropdown
document.addEventListener('DOMContentLoaded', function()
{
    var productCategory = document.getElementById('productCategory');
    productCategory.innerHTML = `
            <select class="form-select" id="productCategoryValue" required>
                <option value="" selected disabled>Seleciona a categoria</option>
                <!-- Dynamically populate options from categories array -->
                ${categories.map(category => `<option value="${category}">${category}</option>`).join('')}
            </select>
        `;
});

// Retrieve products from localStorage or initialize an empty array
let products = JSON.parse(localStorage.getItem('products')) || [];

// Function to save products to localStorage
const saveProductsToLocalStorage = () => {
    localStorage.setItem('products', JSON.stringify(products));
};

// Function to display product list based on category
const showProductListCategory = (category) => {
    // Clear existing table rows
    productTableBody.innerHTML = '';

    // Filter products based on the specified category
    const filteredProducts = products.filter(product => product.category === category);

    if (filteredProducts.length === 0) {
        productTableBody.innerHTML = '<tr><td colspan="7">Não foram encontrados produtos desta categoria.</td></tr>';
        productListSection.style.display = 'block';
        addProductSection.style.display = 'none';
        return;
    }

    // Sort filtered products by ID
    filteredProducts.sort((a, b) => a.id - b.id);

    // Populate table with filtered products
    filteredProducts.forEach(product => {
        const row = `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>${product.price}</td>
                <td>${product.category}</td>
                <td><img src="${product.img}" alt="Product Image" style="max-width: 100px;"></td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="populateEditForm(${product.id})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
                </td>
            </tr>
        `;
        productTableBody.innerHTML += row;
    });

    // Show product list section
    productListSection.style.display = 'block';
    addProductSection.style.display = 'none';
    editProductSection.style.display = 'none';
};

// Function to display all products sorted by ID
const showProductList = () => {
    // Clear existing table rows
    productTableBody.innerHTML = '';

    // Check if there are no products
    if (products.length === 0) {
        productTableBody.innerHTML = '<tr><td colspan="7">Nenhum produto encontrado.</td></tr>';
        productListSection.style.display = 'block';
        addProductSection.style.display = 'none';
        editProductSection.style.display = 'none';
        return;
    }

    // Sort products by ID
    products.sort((a, b) => a.id - b.id);

    // Populate table with sorted products
    products.forEach(product => {
        const row = `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>${product.price}</td>
                <td>${product.category}</td>
                <td><img src="${product.img}" alt="Product Image" style="max-width: 100px;"></td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="populateEditForm(${product.id})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
                </td>
            </tr>
        `;
        productTableBody.innerHTML += row;
    });

    // Show product list section
    productListSection.style.display = 'block';
    addProductSection.style.display = 'none';
    editProductSection.style.display = 'none';
};

// Function to display the add product form
const showAddProductForm = () => {
    addProductForm.reset();
    productListSection.style.display = 'none';
    addProductSection.style.display = 'block';
    editProductSection.style.display = 'none';
};

// Event listener for "List Products" link
document.getElementById('listProducts').addEventListener('click', () => {
    showProductList();
});

// Event listener for "Add Product" link
document.getElementById('addProduct').addEventListener('click', () => {
    showAddProductForm();
});

// Event listener for add product form submission
addProductForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Retrieve form input values
    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;
    const productPrice = parseFloat(document.getElementById('productPrice').value);
    const productCategory = document.getElementById('productCategoryValue').value;
    const productImg = productImagePreview.src; // Get the product image URL

    // Find the maximum ID in the current products list
    const maxId = products.reduce((max, product) => (product.id > max ? product.id : max), 0);

    // Generate new ID by incrementing the maximum ID
    const newProductId = maxId + 1;

    // Create new product object
    const newProduct = {
        id: newProductId,
        name: productName,
        description: productDescription,
        price: productPrice,
        category: productCategory,
        img: productImg
    };

    // Add new product to the array
    products.push(newProduct);

    // Save updated products to localStorage
    saveProductsToLocalStorage();

    // Show product list after adding
    showProductList();
});

// Function to handle delete product action
window.deleteProduct = (productId) => {
    // Filter out the product to delete
    products = products.filter(product => product.id !== productId);

    // Save updated products to localStorage
    saveProductsToLocalStorage();

    // Show product list after deletion
    showProductList();
};

// Event listener for product image upload
productImageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        // Check if the file is an image
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const base64Image = e.target.result;

                // Display the image preview
                productImagePreview.src = base64Image;
            };

            // Read the file as a data URL
            reader.readAsDataURL(file);
        } else {
            alert('Por favor seleciona um ficheiro válido (JPG or PNG).');
        }
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

// Function to dynamically create and populate the edit form with product details
const formeditProduct = (product) => {
    // Find the DOM element where we want to insert the edit form
    const editProductSection = document.getElementById('editProductSection');

    // Check if editProductSection element exists in the DOM
    if (!editProductSection) {
        console.error('Elemento editProductSection não foi encontrado no DOM.');
        return;
    }

    // Create and populate the edit form
    editProductSection.innerHTML = `
        <h2>Edit Product</h2>
        <form id="editProductForm">
            <div class="mb-3">
                <label for="editProductName" class="form-label">Nome:</label>
                <input type="text" class="form-control" id="editProductName" value="${product.name}" required>
            </div>
            <div class="mb-3">
                <label for="editProductDescription" class="form-label">Descrição:</label>
                <textarea class="form-control" id="editProductDescription" rows="3" required>${product.description}</textarea>
            </div>
            <div class="mb-3">
                <label for="editProductPrice" class="form-label">Preço:</label>
                <input type="number" class="form-control" id="editProductPrice" step="0.01" value="${product.price}" required>
            </div>
            <div class="mb-3">
                <label for="editProductCategory" class="form-label">Categoria:</label>
                <select class="form-select" id="editProductCategory" required>
                    ${categories.map(category => `<option value="${category}" ${product.category === category ? 'selected' : ''}>${category}</option>`).join('')}
                </select>
            </div>
            <div class="mb-3">
                <label for="editProductImage" class="form-label">Imagem:</label>
                <input type="file" class="form-control" id="editProductImage" accept="image/png, image/jpeg">
                <img id="editProductImagePreview" src="${product.img}" alt="Product Image Preview" style="max-width: 200px;">
            </div>
            <button type="button" class="btn btn-primary" onclick="saveUpdatedProduct(${product.id})">Editar Produto</button>
        </form>
    `;

    // Display the product edit section
    editProductSection.style.display = 'block';
    productListSection.style.display = 'none';
    addProductSection.style.display = 'none';

    // Add change event listener for the image input
    const editProductImageInput = document.getElementById('editProductImage');
    editProductImageInput.addEventListener('change', (event) => {
        const file = event.target.files[0];

        if (file) {
            // Check if the file is an image
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    const base64Image = e.target.result;

                    // Display the preview of the new image
                    const editProductImagePreview = document.getElementById('editProductImagePreview');
                    editProductImagePreview.src = base64Image;
                };

                // Read the file as a data URL
                reader.readAsDataURL(file);
            } else {
                alert('Por favor seleciona um ficheiro válido (JPG or PNG).');
            }
        }
    });
};

// Function to save updated product data
const saveUpdatedProduct = (productId) => {
    // Find the product to be updated
    const productToUpdate = products.find(product => product.id === productId);

    if (!productToUpdate) {
        console.error('Produto não encontrado.');
        alert('Erro: Produto não encontrado!');
        return;
    }

    // Get updated values from the edit form
    const updatedName = document.getElementById('editProductName').value;
    const updatedDescription = document.getElementById('editProductDescription').value;
    const updatedPrice = parseFloat(document.getElementById('editProductPrice').value);
    const updatedCategory = document.getElementById('editProductCategory').value;
    const updatedImagePreview = document.getElementById('editProductImagePreview');

    // Check if the image has been changed
    if (updatedImagePreview.src !== productToUpdate.img) {
        productToUpdate.img = updatedImagePreview.src;
    }

    // Update product data
    productToUpdate.name = updatedName;
    productToUpdate.description = updatedDescription;
    productToUpdate.price = updatedPrice;
    productToUpdate.category = updatedCategory;

    // Save updated products to localStorage
    saveProductsToLocalStorage();

    // Show the product list after editing
    showProductList();
};
