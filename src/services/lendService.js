import { db } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

// Reference to the "lends" collection in Firestore
const lendsRef = collection(db, "lends");

// Function to add a lend transaction and update user data
export const addLend = async (lend, userId) => {
  try {
    // Add lend transaction
    const docRef = await addDoc(lendsRef, lend);

    // Calculate the earned service fee
    const earnedServiceFee = lend.amount * (lend.expectedMinReturn / 100);

    // Update user data
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();

    await updateDoc(userRef, {
      loanedTo: [...userData.loanedTo, docRef.id],
      availableAmount:
        userData.availableAmount - lend.amount + earnedServiceFee,
      transactionRecord: [...userData.transactionRecord, docRef.id],
      lendedAmount: userData.lendedAmount + lend.amount,
      updatedAt: new Date().toISOString(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Error adding lend: ", error);
    throw error;
  }
};

// Function to get lend transactions for a specific user
export const getUserLends = async (userId) => {
  try {
    const q = query(lendsRef, where("lenderId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Error getting lends: ", error);
    throw error;
  }
};
