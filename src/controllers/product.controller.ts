import type { Response, Request } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
} from "../models/product.model.js";

export async function getMenu(req: Request, res: Response) {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Fallo al obtener el menú." });
  }
}

export async function getProductId(req: Request, res: Response) {
  /*#swagger.tags = ['Products']
  #swagger.summary = 'Obtener un producto por su ID' */
  const productId = Number(req.params.id);
  try {
    const product = await getProductById(productId);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado." });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Fallo al obtener el producto." });
  }
}

export async function createNewProduct(req: Request, res: Response) {
  /*#swagger.tags = ['Products']
  #swagger.summary = 'Crear un nuevo producto agregando todas sus propiedades' */
  const { product_name, product_description, price } = req.body;
  try {
    const newProduct = await createProduct(product_name, product_description, price);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Fallo al crear el producto." });
  }
}

export async function updateProduct(req: Request, res: Response) {
  /*#swagger.tags = ['Products']
  #swagger.summary = 'Actualizar un producto existente modificando todas sus propiedades' */
  const productId = Number(req.params.id);
  const { name, description, price } = req.body;
  try {
    const updatedProduct = await updateProductById(
      productId,
      name,
      description,
      price,
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: "Producto no encontrado." });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Fallo al actualizar el producto." });
  }
}
