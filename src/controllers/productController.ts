import { Request, Response } from "express"
import { db } from "../config/firebaseConfig"
import { Product } from "../models/product"

//Crear un producto
export const createProduct = async (req: Request, res: Response) => {
    const productData: Product = req.body;
    try {
        const docRef = await db.collection('products').add(productData);
        res.status(201).json({ id: docRef.id, ...productData });
    } catch (error) {
        res.status(500).json({ error: 'Error creating product' });
    }
};

//Listar todos los productos
export const getProducts = async (req: Request, res: Response) => {
    const snapshot = await db.collection('products').get()
    const product: Product[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product))
    res.status(200).json(product)
}

//Buscar un producto por su id (usar si es necesario)
export const getProductById = async (req: Request, res: Response) => {
    const productId = req.params.id;
    try {
        const productDoc = await db.collection('products').doc(productId).get();
        if (productDoc.exists) {
            res.status(200).json(productDoc.data());
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching product' });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    const productId = req.params.id;
    const updatedData: Partial<Product> = req.body;
    try {
      await db.collection('products').doc(productId).update(updatedData);
      res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error updating product' });
    }
  };
  

//Eliminar producto
export const deleteProduct = async (req: Request, res: Response) => {
    const productId = req.params.id;
    try {
      await db.collection('products').doc(productId).delete();
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting product' });
    }
  };
  

