import { Request, Response } from 'express'
import { db } from "../config/firebaseConfig"
import { Order } from '../models/order'

//Crear una orden
export const createOrder = async (req: Request, res: Response) => {
  const orderData: Order = req.body;
  try {
    const docRef = await db.collection('orders').add(orderData);
    res.status(201).json({ id: docRef.id, ...orderData });
  } catch (error) {
    res.status(500).json({ error: 'Error creating order' });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  const snapshot = await db.collection('orders').get()
  const order: Order[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order))
  res.status(200).json(order)
}

//Obtener una orden
export const getOrderById = async (req: Request, res: Response) => {
  const orderId = req.params.id;
  try {
    const orderDoc = await db.collection('orders').doc(orderId).get();
    if (orderDoc.exists) {
      res.status(200).json(orderDoc.data());
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching order' });
  }
};

//Actualizar una orden
export const updateOrder = async (req: Request, res: Response) => {
  const orderId = req.params.id;
  const updatedData: Partial<Order> = req.body;
  try {
    await db.collection('orders').doc(orderId).update(updatedData);
    res.status(200).json({ message: 'Order updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating order' });
  }
};

//Eliminar orden
export const deleteOrder = async (req: Request, res: Response) => {
  const orderId = req.params.id;
  try {
    await db.collection('orders').doc(orderId).delete();
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting order' });
  }
};


