const { Sale, User, Product } = require('../models')

const getAllSales = async (req, res) => {
    try {
        const Sales = await Sale.findAll({
            attributes: ['id', 'quantity', 'total', 'date'],
            include: [
                {
                    model: User,
                    attributes: ['name', 'email']
                },
                {
                    model: Product,
                    attributes: ['name', 'price']
                }
            ]
        })

        res.json({ status: 200, data: Sales, message: 'Sales obtained successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al obtener las ventas', error: error })
    }
}


const getSaleById = async (req, res) => {
    try {
        const sale = await Sale.findByPk(req.params.id, {
            include: [User, Product]
        })

        if (!sale) return res.status(404).json({ message: 'Sale not found' })
        res.json({ status: 200, data: sale, message: 'Sale obtained successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al obtener la venta solicitada', error: error })
    }
}

const createSale = async (req, res) => {
    const { userId, productId, quantity, total, date } = req.body
    try {
        if (!userId || !productId || !quantity || !total || !date) {
            return res.status(400).json({ message: 'Missing required fields' })
        }

        const newSale = await Sale.create({ userId, productId, quantity, total, date })
        res.json({ status: 201, message: 'Sale registered successfully', data: newSale })
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al crear la nueva venta', error: error })
    }
}

const updateSale = async (req, res) => {
    try {
        const sale = await Sale.findByPk(req.params.id)
        if (!sale) return res.status(404).json({ message: 'Sale not found' })

        const { userId, productId, quantity, total, date } = req.body

        sale.userId = userId || sale.userId
        sale.productId = productId || sale.productId
        sale.quantity = quantity || sale.quantity
        sale.total = total || sale.total
        sale.date = date || sale.date

        await sale.save()

        res.json({ status: 201, message: 'Sale updated successfully', data: sale })
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al actualizar la venta', error: error })
    }
}

const deleteSale = async (req, res) => {
    try {
        const sale = await Sale.findByPk(req.params.id)
        if (!sale) return res.status(404).json({ message: 'Sale not found' })

        await sale.destroy()
        res.json({ status: 201, message: 'Sale deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al eliminar la venta', error: error })
    }
}


module.exports = {
    getAllSales,
    getSaleById,
    createSale,
    updateSale,
    deleteSale
}