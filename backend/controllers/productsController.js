const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../db/products.json');

const saveProducts = (productsList) => {
    fs.writeFileSync(dbPath, JSON.stringify(productsList, null, 2));
}

const productsList = () => {
    if (!fs.existsSync(dbPath)) return [];
    const data = fs.readFileSync(dbPath, 'utf-8') || '[]';
    return JSON.parse(data);
}

const getAllProducts = (req, res) => {
    if (fs.existsSync(dbPath)) {
        return res.json(productsList());
    } else {
        return res.status(404).json({ error: 'No hay productos registrados' });
    }
};

const getProductById = (req, res) => {
    const product = productsList().find(product => product.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
};

const createProduct = (req, res) => {
    const { name, stock, price } = req.body;
    if (!name || stock === undefined || price === undefined) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }
    let productList = productsList();
    const newProduct = {
        id: productList.length > 0 ? productList[productList.length - 1].id + 1 : 1,
        name,
        stock,
        price
    };
    productList.push(newProduct);
    saveProducts(productList);
    return res.status(201).json(newProduct);
};

const updateProduct = (req, res) => {
    let productList = productsList();
    const existingProduct = productList.find(product => product.id === parseInt(req.params.id));
    if (!existingProduct) {
        return res.status(404).json({ error: 'Product not found' });
    }
    const { name, stock, price } = req.body;
    if (name !== undefined) existingProduct.name = name;
    if (stock !== undefined) existingProduct.stock = stock;
    if (price !== undefined) existingProduct.price = price;
    saveProducts(productList);
    res.json(existingProduct);
};

const deleteProduct = (req, res) => {
    let productList = productsList();
    const existingProduct = productList.find(product => product.id === parseInt(req.params.id));
    if (!existingProduct) {
        return res.status(404).json({ error: 'Product not found' });
    }
    productList = productList.filter(product => product.id !== existingProduct.id);
    saveProducts(productList);
    res.json({ message: 'Product deleted successfully' });
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
