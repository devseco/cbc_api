const Bill = require('../models/Bill');

class BillController {
    static async addBill(req, res, next) {
        try {
            const { name, phone, city, address, price, delivery, items , user_id} = req.body;
            const result = await Bill.addBill(name, phone, city, address, price, delivery, items,user_id);
            res.status(200).send('Bill added successfully');
        } catch (error) {
            console.error('Error adding bill:', error);
            res.status(500).send('Failed to add bill');
        }
    }
    static async getSalesById(req, res, next) {
        try {
            const billId = req.params.id;
            const result = await Bill.getSalesById(billId);
            if (result.length > 0) {
                res.status(200).json(result);
            } else {
                res.status(404).send('Bill not found');
            }
        } catch (error) {
            console.error('Error fetching bill:', error);
            res.status(500).send('Failed to fetch bill');
        }
    }

    static async getBill(req, res, next) {
        try {
            const billId = req.params.id;
            const result = await Bill.getBill(billId);
            if (result.length > 0) {
                res.status(200).json(result);
            } else {
                res.status(404).send('Bill not found');
            }
        } catch (error) {
            console.error('Error fetching bill:', error);
            res.status(500).send('Failed to fetch bill');
        }
    }
    static async getBillsLastest(req, res, next) {
        try {
            const billId = req.params.id;
            const result = await Bill.getBillsLastest(billId);
            if (result.length > 0) {
                res.status(200).json(result);
            } else {
                res.status(404).send('Bill not found');
            }
        } catch (error) {
            console.error('Error fetching bill:', error);
            res.status(500).send('Failed to fetch bill');
        }
    }
    
    static async getBillsByid(req, res, next) {
        try {
            const billId = req.params.id;
            const result = await Bill.getBillsById(billId);
            if (result.length > 0) {
                res.status(200).json(result);
            } else {
                res.status(404).send('Bill not found');
            }
        } catch (error) {
            console.error('Error fetching bill:', error);
            res.status(500).send('Failed to fetch bill');
        }
    }
}

module.exports = BillController;
