import { type Request, type Response, type NextFunction } from "express";
import {z} from "zod";

const productSchema = z.object({
    product_name: z.string().min(1, { message: "Se requiere un nombre" }),
    product_description: z.string().min(1, { message: "Se requiere una descripción" }),
    price: z.number().positive({ message: "El precio debe ser un número positivo" }),
    cost: z.number().positive({ message: "El costo debe ser un número positivo" }).optional(),
    stock: z.number().int().nonnegative({ message: "El stock debe ser un número entero no negativo" }).optional(),
});

export function validateProduct(req: Request, res: Response, next: NextFunction) {
    const validationResult = productSchema.safeParse(req.body);
    if (!validationResult.success) {
        return res.status(400).json({ error: validationResult.error.format() });
    }
    next();
};