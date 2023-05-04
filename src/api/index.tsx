import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, query,
  getDocs, doc, updateDoc, addDoc, orderBy, limit
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDr5n-LKnmavyGosqK9FjJadkHM4CAG9Og",
  authDomain: "hmonitor-57097.firebaseapp.com",
  projectId: "hmonitor-57097",
  storageBucket: "hmonitor-57097.appspot.com",
  messagingSenderId: "1038874301708",
  appId: "1:1038874301708:web:213fe7a3fd63e4a93da529",
  measurementId: "G-THD2K9C2R0"
}
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const collectionName:string = "snake-records"

export const addRecord = async (record: MaxScore) => {
  return await addDoc(collection(db, collectionName), record);
}

export const getRecords = async () => {
  const snapShot = await getDocs (
    query(collection(db, collectionName)
      , orderBy("value", "desc")
      , limit(10)
    )
  )
  
  let data:MaxScore[] = [];
  
  snapShot.forEach( doc => data.push({
    id:doc.id, 
    nickName: doc.data().nickName, 
    value:  doc.data().value, 
  }))  
  return data;
}

export const addDocument = async (item: MaxScore) => {
  return await addDoc(collection(db, collectionName), item);
}

export const updateDocument = (id:string, item:MaxScore) => {
  const aux = doc(db, collectionName, id)
  return updateDoc(aux, {...item})
}
