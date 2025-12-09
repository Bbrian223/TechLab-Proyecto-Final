import { db } from "../firebase/data.js"
import { UserSchema } from "../models/user.model.js"
import bcrypt from "bcrypt";
import {
    collection,
    getDoc,
    getDocs,
    addDoc,
    doc,
    query,
    where
} from "firebase/firestore"

const userCollection = collection(db,"users");

async function validateUser(email,pass) {
    const q = query(userCollection, where("Email","==",email));
    const snapshot = await getDocs(q);

    if(snapshot.empty)
        return null;

    const userDoc = snapshot.docs[0];
    const user = { id: userDoc.id, ...userDoc.data() };

    const valid = await bcrypt.compare(pass, user.Pass)

    if(!valid)
        throw new Error("Credenciales incorrectas, intentelo de nuevo");

    return user;
}

async function getUserById(id) {
    const user = await getDoc(doc(userCollection,id));
    if(!user.exists())
        return null

    const {Pass, ...safeUser} = user.data();

    return UserSchema.parse(safeUser);
}

async function getAllUser() {
    const querySnapshot = await getDocs(userCollection);
    const list = [];
    querySnapshot.forEach((doc) => {
        const {Pass, ...safeUser} = doc.data();
        const data = UserSchema.parse(safeUser);

        list.push({id: doc.id, ...data });
    })

    return list;
}

async function createUser(user) {
    const q = query(userCollection, where("Email","==",user.Email));
    const snapshot = await getDocs(q);

    if(!snapshot.empty)
        throw new Error(`El email ingresado ya existe en la db. Intentelo nuevamente`);

    const hashedPassword = await bcrypt.hash(user.Pass, 10);
    user.Pass = hashedPassword;

    return await addDoc(userCollection,user);
}

async function deleteUser(id) {
    const user = await getDoc(doc(userCollection,id));

    if(user.empty)
        throw new Error(`Usuario con ID: ${id} no encontrado. No es posible completar la operacion`);

    await deleteDoc(doc(userCollection,id))
}


export default{
    validateUser,
    getUserById,
    getAllUser,
    createUser,
    deleteUser
}

