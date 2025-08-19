const { Product } = require('../models');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        if (products.length === 0) {
            return res.status(404).json({ error: 'No hay productos registrados' });
        }
        return res.json(products);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        return res.status(500).json({ error: 'Error al obtener los productos' });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        return res.json(product);
    } catch (error) {
        console.error('Error al obtener producto:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, description, stock, price } = req.body;
        
        if (!name || stock === undefined || price === undefined) {
            return res.status(400).json({ error: 'Faltan datos obligatorios' });
        }

        // Validar que stock y price sean números válidos
        if (typeof stock !== 'number' || stock < 0) {
            return res.status(400).json({ error: 'El stock debe ser un número mayor o igual a 0' });
        }
        
        if (typeof price !== 'number' || price <= 0) {
            return res.status(400).json({ error: 'El precio debe ser un número mayor a 0' });
        }

        const newProduct = await Product.create({
            name,
            description: description || null,
            stock,
            price
        });

        return res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error al crear producto:', error);
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: 'Datos de validación incorrectos' });
        }
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const existingProduct = await Product.findByPk(req.params.id);
        if (!existingProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const { name, description, stock, price } = req.body;

        // Validar que stock y price sean números válidos si se proporcionan
        if (stock !== undefined && (typeof stock !== 'number' || stock < 0)) {
            return res.status(400).json({ error: 'El stock debe ser un número mayor o igual a 0' });
        }
        
        if (price !== undefined && (typeof price !== 'number' || price <= 0)) {
            return res.status(400).json({ error: 'El precio debe ser un número mayor a 0' });
        }

        // Actualizar solo los campos proporcionados
        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (description !== undefined) updateData.description = description;
        if (stock !== undefined) updateData.stock = stock;
        if (price !== undefined) updateData.price = price;

        await existingProduct.update(updateData);

        return res.json(existingProduct);
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: 'Datos de validación incorrectos' });
        }
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const existingProduct = await Product.findByPk(req.params.id);
        if (!existingProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        await existingProduct.destroy();
        return res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
