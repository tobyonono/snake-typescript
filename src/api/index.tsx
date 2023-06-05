import { firebaseConfig } from './config';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore, collection, query,
  getDocs, doc, updateDoc, addDoc, orderBy, limit, initializeFirestore
} from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const collectionName:string = 'snake-records';

export const addRecord = async (record: MaxScore) => {
  return await addDoc(collection(db, collectionName), record);
}

export const getRecords = async () => {
  const snapShot = await getDocs (
    query(collection(db, collectionName)
      , orderBy('value', 'desc')
      , limit(10)
    )
  )
  
  let data:MaxScore[] = [];
  
  snapShot.forEach( doc => data.push({
    id:doc.id, 
    nickName: doc.data().nickName, 
    value:  doc.data().value, 
    email: doc.data().email

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
