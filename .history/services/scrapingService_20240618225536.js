// src/services/scrapingService.js

const axios = require('axios'); // Import the axios library for HTTP requests
const cheerio = require('cheerio'); // Import the cheerio library for HTML parsing

// Asynchronous function to fetch product data from a given URL
async function fetchProductData(url) {
    try {
        // Perform a GET request to the provided URL
        const { data } = await axios.get(url);
        // Load the response data into cheerio for parsing
        const $ = cheerio.load(data);

        // Example of how to fetch data from a specific site structure
        const nome = $('div.product-name').text(); // Extract product name
        const preco = parseFloat($('span.price').text().replace('$', '')); // Extract and parse product price
        const imagem = $('img.product-image').attr('src'); // Extract product image URL
        const descricao = $('div.product-details').text(); // Extract product description
        const categoria = $('span.product-category').text(); // Extract product category
        const fabricante = $('span.product-manufacturer').text(); // Extract product manufacturer

        // Return the extracted product data as an object
        return { nome, preco, imagem, descricao, categoria, fabricante };
    } catch (error) {
        // Log the error to the console
        console.error(error);
        // Return null in case of an error
        return null;
    }
}

// Export the fetchProductData function for use in other modules
module.exports = { fetchProductData };
