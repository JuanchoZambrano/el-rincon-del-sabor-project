import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

const customerSchema = z.object({
  customer_name: z.string("El nombre es obligatorio").min(1, { message: "Ingrese un nombre valido." }),
  email: z.string().email("Ingrese un email valido."),
  phone_number: z
    .string("El número de celular es requerido.")
    .length(10, {
      message: "El número de celular debe tener exactamente 10 digitos.",
    })
    .regex(/^\d+$/, { message: "El número de celular solo debe contener dígitos." }),
});

export function validateCustomer(req: Request, res: Response, next: NextFunction) {
    const validationResult = customerSchema.safeParse(req.body);
    if (!validationResult.success) {
        return res.status(400).json({ error: validationResult.error.format() });
    }
    next();
};