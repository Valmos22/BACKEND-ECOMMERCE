"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrder = exports.getOrderById = exports.createOrder = void 0;
const firebaseConfig_1 = require("../config/firebaseConfig");
//Crear una orden
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderData = req.body;
    try {
        const docRef = yield firebaseConfig_1.db.collection('orders').add(orderData);
        res.status(201).json(Object.assign({ id: docRef.id }, orderData));
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating order' });
    }
});
exports.createOrder = createOrder;
//Obtener una orden
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    try {
        const orderDoc = yield firebaseConfig_1.db.collection('orders').doc(orderId).get();
        if (orderDoc.exists) {
            res.status(200).json(orderDoc.data());
        }
        else {
            res.status(404).json({ error: 'Order not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching order' });
    }
});
exports.getOrderById = getOrderById;
//Actualizar una orden
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    const updatedData = req.body;
    try {
        yield firebaseConfig_1.db.collection('orders').doc(orderId).update(updatedData);
        res.status(200).json({ message: 'Order updated successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error updating order' });
    }
});
exports.updateOrder = updateOrder;
//Eliminar orden
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    try {
        yield firebaseConfig_1.db.collection('orders').doc(orderId).delete();
        res.status(200).json({ message: 'Order deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error deleting order' });
    }
});
exports.deleteOrder = deleteOrder;
