import type { Response, Request } from "express";
import { getAllSales, getSaleById, createSale } from "../models/sale.model.js"

export async function getSales(req: Request, res: Response) {
  /*#swagger.tags = ['Sales']
    #swagger.summary = 'Obtener lista completa de Sales' */
  try {
    const sales = await getAllSales();
    res.status(200).json(sales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Fallo al obtener las sales." });
  }
}

export async function getSalesId(req: Request, res: Response) {
  /*#swagger.tags = ['Sales']
    #swagger.summary = 'Obtener una sale por su ID' */
  const id = Number(req.params.id);
  try {
    const sale = await getSaleById(id);
    if (!sale) {
      return res.status(404).json({ error: "Sale no encontrada." });
    }
    res.json(sale);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Fallo al obtener la sale." });
  }
}

export async function createNewSale(req: Request, res: Response) {
  /*  #swagger.tags = ['Sales']
      #swagger.summary = 'Crear una sale' 
      #swagger.parameters['body'] = {
        in: 'body',
        description: 'Datos requeridos para registrar una venta',
        required: true,
        schema: {
          sale_address: 'Calle',
          phone_number: '123456789',
          customer_id: 1,
          sale_date: '2026-11-06',
          sale_status: true
        }
      } 
  */
  const { sale_address, phone_number, customer_id, sale_date, sale_status } = req.body;
  try {
    const newSale = await createSale(
      sale_address,
      phone_number,
      customer_id,
      sale_date,
      sale_status
    );
    res.status(201).json(newSale);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Fallo al crear la sale." });
  }
}