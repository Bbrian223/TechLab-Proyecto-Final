import { db } from "../firebase/data.js"
import {
    collection,
    getDoc,
    getDocs,
    addDoc,
    deleteDoc,
    doc
} from "firebase/firestore"

const prodCollection = collection(db,"products");

async function getAllProd() {
    const querySnapshot = await getDocs(prodCollection);
    const list = [];
    querySnapshot.forEach((doc) => {
        list.push({id: doc.id, ...doc.data() });
    })

    return list;
}

async function getProdById(id) {
    const product = await getDoc(doc(prodCollection,id));

    return product.exists() ? product.data() : null;
}

async function createProd(product) {
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