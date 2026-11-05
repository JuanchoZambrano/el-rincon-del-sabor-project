import type { Request, Response } from "express";
import {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomerById,
} from "../models/customer.model.js";

export async function getCustomers(req: Request, res: Response) {
  /*#swagger.tags = ['Customers']
    #swagger.summary = 'Obtener lista completa de Customers' */
  try {
    const customers = await getAllCustomers();
    res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Fallo al obtener los customers." });
  }
}

export async function getCustomersId(req: Request, res: Response) {
  /*#swagger.tags = ['Customers']
    #swagger.summary = 'Obtener un Customer por su ID' */
  const id = Number(req.params.id);
  try {
    const customer = await getCustomerById(id);
    if (!customer) {
      return res.status(404).json({ error: "Customer no encontrado." });
    }
    res.json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Fallo al obtener el customer." });
  }
}

export async function createNewCustomer(req: Request, res: Response) {
  /*#swagger.tags = ['Customers']
    #swagger.summary = 'Crear un customer */
  const { customer_name, email, phone_number } = req.body;
  try {
    const newCustomer = await createCustomer(
      customer_name,
      email,
      phone_number,
    );
    res.status(201).json(newCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Fallo al crear el customer." });
  }
}

export async function updateCustomer(req: Request, res: Response) {
  /*#swagger.tags = ['Customers']
    #swagger.summary = 'Actualiza un customer seleccionando su ID 
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Datos del customer',
      schema: {
         customer_name: "Nombre de ejemplo",
         email: "",
         phone_number: ""
      }
} */
  const id = Number(req.params.id);
  const { customer_name, email, phone_number } = req.body;
  try {
    const customer = await updateCustomerById(
      id,
      customer_name,
      email,
      phone_number,
    );
    if (!customer) {
      return res.status(404).json({ error: "Customer no encontrado." });
    }
    res.json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Fallo al actualizar el customer." });
  }
}
