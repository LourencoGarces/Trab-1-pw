document.addEventListener('DOMContentLoaded', async () => {
    const userId = 1; // Substitua pelo ID real do usuário logado
    try {
        const response = await fetch(`/api/pgs/wishlist/${userId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const wishlist = await response.json();
        displayWishlist(wishlist);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
});

function displayWishlist(wishlist) {
    const wishlistTableBody = document.getElementById('wishlistTableBody');
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

async function removeFromWishlist(productId) {
    const userId = 1; // Substitua pelo ID real do usuário logado
    try {
        const response = await fetch(`/api/pgs/wishlist/${userId}/${productId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Remover o item da tabela sem recarregar a página
        const row = document.querySelector(`button[onclick="removeFromWishlist(${productId})"]`).closest('tr');
        row.remove();
        alert('Produto removido da wishlist com sucesso');
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        alert('Erro ao remover produto da wishlist');
    }
}
