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
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const firebaseConfig_1 = require("../config/firebaseConfig");
//Crear un producto
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productData = req.body;
    try {
        const docRef = yield firebaseConfig_1.db.collection('products').add(productData);
        res.status(201).json(Object.assign({ id: docRef.id }, productData));
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating product' });
    }
});
exports.createProduct = createProduct;
//Listar todos los productos
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield firebaseConfig_1.db.collection('products').get();
    const product = snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
    res.status(200).json(product);
});
exports.getProducts = getProducts;
//Buscar un producto por su id (usar si es necesario)
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    try {
        const productDoc = yield firebaseConfig_1.db.collection('products').doc(productId).get();
        if (productDoc.exists) {
            res.status(200).json(productDoc.data());
        }
        else {
            res.status(404).json({ error: 'Product not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching product' });
    }
});
exports.getProductById = getProductById;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    const updatedData = req.body;
    try {
        yield firebaseConfig_1.db.collection('products').doc(productId).update(updatedData);
        res.status(200).json({ message: 'Product updated successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error updating product' });
    }
});
exports.updateProduct = updateProduct;
//Eliminar producto
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    try {
        yield firebaseConfig_1.db.collection('products').doc(productId).delete();
        res.status(200).json({ message: 'Product deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error deleting product' });
    }
});
exports.deleteProduct = deleteProduct;
