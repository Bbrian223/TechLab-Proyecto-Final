import { db } from "../firebase/data.js"
import { ProductSquema } from "../models/product.model.js"
import "dotenv/config"
import {
    collection,
    getDoc,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    query,
    where
} from "firebase/firestore"

const prodCollection = collection(db,process.env.PRODUCT_COLLECTION_NAME);

async function getAllProd() {
    const querySnapshot = await getDocs(prodCollection);
    const list = [];
    querySnapshot.forEach((doc) => {
        const data = ProductSquema.parse(doc.data())
        list.push({id: doc.id, ...data });
    })

    return list;
}

async function getProdById(id) {
    const product = await getDoc(doc(prodCollection,id));
    if(!product.exists())
        return null;

    return ProductSquema.parse(product); 
}

async function createProd(product) {
    const q = query(prodCollection, where("Nombre","==",product.Nombre));
    const snapshot = await getDocs(q);

    if(!snapshot.empty)
        throw new Error(`El nombre del producto ingresado ya existe en la db. Intentelo nuevamente`);

    return await addDoc(prodCollection,product);
}

async function deleteProd(id) {
    const product = await getDoc(doc(prodCollection,id));

    if(!product)
        throw new CustomError(`Usuario con ID: ${id} no encontrado. No es posible completar la operacion`);

    await deleteDoc(doc(prodCollection,id))
}

export default {
    getAllProd,
    getProdById,
    createProd,
    deleteProd
}