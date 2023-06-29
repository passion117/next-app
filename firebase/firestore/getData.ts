import firebase_app from "../config";
import { collection, query, where, getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

const q = query(collection(db, "declarations"), where("public", "==", true));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  console.log(doc.id, " => ", doc.data());
});

export default async function getData(collection, id) {
    let docRef = doc(db, collection, id);

    let result = null;
    let error = null;

    try {
        result = await getDoc(docRef);
    } catch (e) {
        error = e;
    }

    return { result, error };
}