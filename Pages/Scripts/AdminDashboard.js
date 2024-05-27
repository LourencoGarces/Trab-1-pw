// DOM Elements
const productListSection = document.getElementById('productListSection');
const addProductSection = document.getElementById('addProductSection');
const productTableBody = document.getElementById('productTableBody');
const addProductForm = document.getElementById('addProductForm');

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

// Function to display all products sorted by ID
const showProductList = () => {

    listarProdutos();

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

const listarProdutos = async () => {
    let strHtml = ``
    //alert("aaaa")
    const response = await fetch('http://localhost:4242/api/pgs/produtos')
    const lv = await response.json()
    for (const artigo of lv) {
        strHtml += `
            <tr>
                <td>${artigo.id}</td>
                <td>${artigo.nome}</td>
                <td>${artigo.descricao}</td>
                <td>${artigo.preco}</td>
                <td>${artigo.fabricante}</td>
                <td>
                    <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#upModal" onclick="preparaEditCarro(${artigo.id})"><i class="fa fa-pencil"></i> Editar</button>
                    <button type='button' class='btn btn-danger' onclick="apagaCarro(${artigo.id})"><i class="fa fa-trash"></i> Apagar</button>
                </td>
            </tr>
                `
    }
    document.getElementById("editProductSection").innerHTML = strHtml;
}
listarProdutos();

const novoProduto= async () => {
    var dados = {
        id: document.getElementById("mId").value,
        nome: document.getElementById("mNome").value,
        descricao: document.getElementById("mDescricao").value,
        preco: document.getElementById("mPreco").value,
        fabricante: document.getElementById("mFabricante").value,
    };
    //alert(dados.Marca) //alert(dados.Detalhes) //alert(dados.Foto)
    fetch('http://localhost:4242/api/pgs/produtos/create', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dados)
    })
    .then(response => {
        // Verifica se a resposta foi bem sucedida
        if (!response.ok) {
            throw new Error('Erro ao obter os dados');
        }
        // Converte a resposta para JSON
        return response.json();
    })
    .then(() => {
        listarProdutos(); // Atualiza a tabela após adicionar um novo carro
    });
};

const apagaProduto = async (id) => {
    fetch("http://localhost:4242/api/pgs/produtos/delete/" + id, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
        // Verifica se a resposta foi bem sucedida
        if (!response.ok) {
        throw new Error("Erro ao obter os dados");
        }
        return response;
    })
    .then((data) => {
        // Faz algo com os dados
        //console.log(data);
        resposta = "O carro foi apagado com sucesso!";
        alert(resposta);
        listarProdutos();
    })
    .catch((error) => {
        // Captura qualquer erro de rede ou tratamento de erro
        console.error("Houve um erro:", error);
    })
    .then(() => {
        listarProdutos(); // Atualiza a tabela após adicionar um novo carro
    });
};

const preparaEditProdutos = async (id) => {
    //alert("aaaa")            
    const response = await fetch('http://localhost:4242/api/pgs/produtos/'+id)
    const artigo = await response.json()           
    document.getElementById("muId").value = artigo.id;
    document.getElementById("muNome").value = artigo.nome;
    document.getElementById("muDescricao").value = artigo.descricao;
    document.getElementById("muPreco").value = artigo.preco;
    document.getElementById("muFabricante").value = artigo.fabricante;
};

const atualizaProduto = async () => {
    var dados = {
    id: document.getElementById("muId").value,
    nome: document.getElementById("muNome").value,
    descricao: document.getElementById("muDescricao").value,
    preco: document.getElementById("muPreco").value,
    fabricante: document.getElementById("muFabricante").value,
    };
    fetch("http://localhost:4242/api/pgs/produtos/update", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
    })
    .then((response) => {
        // Verifica se a resposta foi bem sucedida
        if (!response.ok) {
        throw new Error("Erro ao obter os dados");
        }
        // Converte a resposta para JSON
        return response.json();
    })
    .then(() => {
        listarProdutos(); // Atualiza a tabela após adicionar um novo carro
    });
};
