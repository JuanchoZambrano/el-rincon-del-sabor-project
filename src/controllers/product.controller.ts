import type { Response, Request } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
} from "../models/product.model.js";

export async function getProductsMenu(req: Request, res: Response) {
  /* 
    #swagger.tags = ['Products'] 
    #swagger.description = 'Obtener lista completa del menu de productos'
    #swagger.parameters['maxPrice'] = { in: 'query', description: 'Filtrar productos por precio máximo', required: false, type: 'number' }
    #swagger.parameters['page'] = { in: 'query', description: 'Numero de pagina', required: false, type: 'number' }
    #swagger.parameters['limit'] = { in: 'query', description: 'Limite de datos para mostrar por pagina', required: false, type: 'number' } 
  */
  try {
    const maxPrice = req.query.maxPrice
      ? Number(req.query.maxPrice)
      : undefined;
    const page = req.query.page ? Number(req.query.page) : undefined;
    const limit = req.query.limit ? Number(req.query.limit) : undefined;

    const products = await getAllProducts(maxPrice, page, limit);
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
  const { product_name, product_description, price, cost, stock } = req.body;
  try {
    const newProduct = await createProduct(
      product_name,
      product_description,
      price,
      cost,
      stock,
    );
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
  const { product_name, product_description, price, cost, stock } = req.body;
  try {
    const updatedProduct = await updateProductById(
      productId,
      product_name,
      product_description,
      price,
      cost,
      stock,
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
