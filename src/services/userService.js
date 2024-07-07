import { db } from "../../firebase";
import { collection, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

const usersRef = collection(db, "users");

export const addUser = async (userId, userData) => {
  try {
    await setDoc(doc(usersRef, userId), userData);
  } catch (error) {
    console.error("Error adding user: ", error);
    throw error;
  }
};

export const getUser = async (userId) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such user!");
      return null;
    }
  } catch (error) {
    console.error("Error getting user: ", error);
    throw error;
  }
};

export const updateUser = async (userId, updates) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, updates);
  } catch (error) {
    console.error("Error updating user: ", error);
    throw error;
  }
};
