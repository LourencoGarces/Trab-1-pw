// src/services/scrapingService.js

const axios = require('axios');
const cheerio = require('cheerio');

async function fetchProductData(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        // Exemplo de como buscar dados de uma estrutura específica de site
        const nome = $('div.product-name').text();
        const preco = parseFloat($('span.price').text().replace('$', ''));
        const imagem = $('img.product-image').attr('src');
        const descricao = $('div.product-details').text();
        const categoria = $('span.product-category').text();
        const fabricante = $('span.product-manufacturer').text();

        return { nome, preco, imagem, descricao, categoria, fabricante };
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = { fetchProductData };
