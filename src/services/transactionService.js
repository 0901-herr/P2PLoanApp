import { db } from "./firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const transactionsRef = collection(db, "transactions");

export const addTransaction = async (transaction) => {
  try {
    const docRef = await addDoc(transactionsRef, transaction);
    return docRef.id;
  } catch (error) {
    console.error("Error adding transaction: ", error);
    throw error;
  }
};

export const getUserTransactions = async (userId) => {
  try {
    const q = query(transactionsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Error getting transactions: ", error);
    throw error;
  }
};
