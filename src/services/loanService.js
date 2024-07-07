import { db } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const loansRef = collection(db, "loans");

// Function to add a loan transaction and update user data
export const addLoan = async (loan, userId) => {
  try {
    // Add loan transaction
    const docRef = await addDoc(loansRef, loan);

    // Calculate the amount received after service fee
    const amountReceived = loan.amount - loan.totalServiceFee;

    // Update user data
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    const updatedData = {
      loanedFrom: [...userData.loanedFrom, docRef.id],
      availableAmount: userData.availableAmount + amountReceived,
      transactionRecord: [...userData.transactionRecord, docRef.id],
      loanedAmount: userData.loanedAmount + loan.amount,
      updatedAt: new Date().toISOString(),
    };
    console.log("updatedData:", updatedData);

    await updateDoc(userRef, updatedData);

    return docRef.id;
  } catch (error) {
    console.error("Error adding loan: ", error);
    throw error;
  }
};

// Function to get loan transactions for a specific user
export const getUserLoans = async (userId) => {
  try {
    const q = query(loansRef, where("lenderId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Error getting loans: ", error);
    throw error;
  }
};
