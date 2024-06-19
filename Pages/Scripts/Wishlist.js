// Event listener for loading the wishlist
document.getElementById('loadWishlist').addEventListener('click', async () => {
    const userId = 1; // Replace with the actual logged-in user's ID
    try {
        // Fetch the wishlist for the given user ID
        const response = await fetch(`/api/pgs/products/wishlist/${userId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Parse the response as JSON
        const wishlist = await response.json();
        // Display the wishlist
        displayWishlist(wishlist);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
});

// Function to display the wishlist
function displayWishlist(wishlist) {
    const wishlistTableBody = document.getElementById('wishlistTableBody');
    // Map the wishlist items to HTML and insert into the table body
    wishlistTableBody.innerHTML = wishlist.map(item => `
        <tr>
            <td><img src="${item.Produtos.imagem}" alt="${item.Produtos.nome}" class="img-fluid" style="max-width: 100px;"></td>
            <td>${item.Produtos.nome}</td>
            <td>${item.Produtos.descricao}</td>
            <td>${item.Produtos.preco}</td>
            <td>${item.Produtos.fabricante}</td>
            <td>${item.Produtos.id_categoria}</td>
            <td>
                <button class="btn btn-danger" onclick="removeFromWishlist(${item.id_produto})">Remover</button>
            </td>
        </tr>
    `).join('');
}

// Function to remove an item from the wishlist
async function removeFromWishlist(productId) {
    const userId = 1; // Replace with the actual logged-in user's ID
    try {
        // Send a DELETE request to remove the item from the wishlist
        const response = await fetch(`/api/pgs/products/wishlist/${userId}/${productId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Remove the item from the table without reloading the page
        const row = document.querySelector(`button[onclick="removeFromWishlist(${productId})"]`).closest('tr');
        row.remove();
        alert('Produto removido da wishlist com sucesso'); // Show success message
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        alert('Erro ao remover produto da wishlist'); // Show error message
    }
}
