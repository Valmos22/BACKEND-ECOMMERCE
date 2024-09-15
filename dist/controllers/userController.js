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
exports.deleteUser = exports.updateUser = exports.getUserById = exports.createUser = void 0;
const firebaseConfig_1 = require("../config/firebaseConfig");
//Crear usuario
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    try {
        const docRef = yield firebaseConfig_1.db.collection('users').add(userData);
        res.status(201).json(Object.assign({ id: docRef.id }, userData));
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
});
exports.createUser = createUser;
//Obtener usuario
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    console.log(userId);
    try {
        const userDoc = yield firebaseConfig_1.db.collection('users').doc(userId).get();
        if (userDoc.exists) {
            res.status(200).json(userDoc.data());
        }
        else {
            res.status(404).json({ error: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching user' });
    }
});
exports.getUserById = getUserById;
//Actualizar usuario
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const updatedData = req.body;
    try {
        yield firebaseConfig_1.db.collection('users').doc(userId).update(updatedData);
        res.status(200).json({ message: 'User updated successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error updating user' });
    }
});
exports.updateUser = updateUser;
//Eliminar usuario
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        yield firebaseConfig_1.db.collection('users').doc(userId).delete();
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
    }
});
exports.deleteUser = deleteUser;
