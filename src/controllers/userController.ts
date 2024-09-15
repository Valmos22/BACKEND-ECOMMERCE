import { Request, Response } from "express";
import { db } from "../config/firebaseConfig";
import { User } from "../models/user";
import admin from 'firebase-admin';

//Iniciar sesion
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await admin.auth().getUserByEmail(email);
        const token = await admin.auth().createCustomToken(user.uid);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login error' });
    }
};

//Crear usuario
export const createUser = async (req: Request, res: Response) => {
    const userData: User = req.body;
    try {
        const docRef = await db.collection('users').add(userData);
        res.status(201).json({ id: docRef.id, ...userData });
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
}

//Obtener usuario
export const getUserById = async (req: Request, res: Response) => {
    const userId = req.params.id;
    console.log(userId)
    try {
        const userDoc = await db.collection('users').doc(userId).get();
        if (userDoc.exists) {
            res.status(200).json(userDoc.data());
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user' });
    }
}

//Actualizar usuario
export const updateUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const updatedData: Partial<User> = req.body;
    try {
        await db.collection('users').doc(userId).update(updatedData)
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating user' });
    }
}

//Eliminar usuario
export const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    try {
        await db.collection('users').doc(userId).delete();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
    }
};