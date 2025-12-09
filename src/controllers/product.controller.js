import service from "../services/product.service.js"
import { ProductSquema } from "../models/product.model.js"

export async function GetAllProducts(req,res) {
    try {
        const list = await service.getAllProd();

        if(list.length == 0) 
            return res.status(200).json({ msg: `No hay productos cargados. Agregue uno para visualizarlo`});

        return res.status(200).json(list);

    } catch (error) {
        return res.status(500).json({
            "error": `Error al procesar la solicitud`,
            "detail": `${error.message}`
        });
    }
}

export async function GetProductById(req,res) {
    const id = req.params.id;
    
    try {
        if(id == null)
            return res.status(400).json({ err: `ID invalido`})

        const product = await service.getProdById(id);

        if(!product)
            return res.status(400).json({ err: `no se encuentra o no existe un producto con ID: ${id}`})

        return res.status(200).json(product);

    } catch (error) {
        return res.status(500).json({
            "error": `Error al procesar la solicitud`,
            "detail": `${error.message}`
        });
    }
}

export async function CreateProduct(req,res) {
    try {
        const product = ProductSquema.parse(req.body);
        const saved = await service.createProd(product)

        return res.status(201).json(saved);

    } catch (error) {
        return res.status(error.status || 500).json({
            "error": `Error al procesar la solicitud`,
            "detail": `${error.message}`
        });
    }
}

export async function DeleteProduct(req,res) {
    const id = req.params.id;
    try {
        await service.deleteProd(id);

        return res.status(204).send();

    } catch (error) {
        return res.status(error.status || 500).json({
            "error": `Error al procesar la solicitud`,
            "detail": `${error.message}`
        });
    }
}