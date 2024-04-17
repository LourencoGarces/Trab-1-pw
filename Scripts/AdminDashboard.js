document.addEventListener('DOMContentLoaded', () => {
    const productListSection = document.getElementById('productListSection');
    const addProductSection = document.getElementById('addProductSection');
    const productTableBody = document.getElementById('productTableBody');
    const addProductForm = document.getElementById('addProductForm');
    const productImageInput = document.getElementById('productImage');
    const productImagePreview = document.getElementById('productImagePreview');

    // Retrieve products from localStorage or initialize an empty array
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // Function to save products to localStorage
    const saveProductsToLocalStorage = () => {
        localStorage.setItem('products', JSON.stringify(products));
    };

    // Function to show product list
    const showProductList = () => {
        // Clear existing table rows
        productTableBody.innerHTML = '';

        // Populate table with products
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
                        <button class="btn btn-sm btn-danger" onclick="deleteProduct(${product.id})">Apagar</button>
                    </td>
                </tr>
            `;
            productTableBody.innerHTML += row;
        });

        // Show product list section
        productListSection.style.display = 'block';
        addProductSection.style.display = 'none';
    };

    // Function to show add product form
    const showAddProductForm = () => {
        addProductForm.reset();
        productListSection.style.display = 'none';
        addProductSection.style.display = 'block';
    };

    // Event listener for list products link
    document.getElementById('listProducts').addEventListener('click', showProductList);

    // Event listener for add product link
    document.getElementById('addProduct').addEventListener('click', showAddProductForm);

    // Event listener for add product form submission
    addProductForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const productName = document.getElementById('productName').value;
        const productDescription = document.getElementById('productDescription').value;
        const productPrice = parseFloat(document.getElementById('productPrice').value);
        const productCategory = document.getElementById('productCategory').value;
        const productImg = productImagePreview.src; // Get the product image URL

        // Generate a unique ID (for simulation)
        const newProductId = products.length + 1;

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
                alert('Por favor, selecione um arquivo de imagem válido (JPG ou PNG).');
            }
        }
    });

    // Load initial product data when DOM is ready
    showProductList(); // Display initial product list
});
