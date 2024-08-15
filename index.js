const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const WMS_TEST_URL = 'https://fake-store-api.mock.beeceptor.com/api/orders';

app.get('/orders', async (req, res) => {
    try {
        const response = await axios.get(WMS_TEST_URL);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve orders' });
    }
});

app.get('/orders', async (req, res) => {
    try {
        const status = req.query.status;
        const response = await axios.get(WMS_TEST_URL);
        const filteredOrders = response.data.filter(order => order.status === status);
        res.json(filteredOrders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve orders' });
    }
});


app.put('/orders/:id', async (req, res) => {
    try {
        const orderId = req.params.id;
        await axios.put(`${WMS_TEST_URL}/${orderId}`, { status: 'picked' });
        res.json({ message: 'Order status updated to picked' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update order status' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
