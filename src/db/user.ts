import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "./config";

type User = {
  groupNumber: number;
  passport: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  isMale: boolean;
  phoneNumber: string;
  digitalIdentityURL: string;
};

export const getUserByPassport = async (passport: string) => {
  const db = getFirestore(app);
  const col = collection(db, "Users");
  const searchQuery = query(col, where("passport", "==", passport));
  const docsRef = await getDocs(searchQuery);
  if (docsRef.size === 0) {
    console.log(`getGroup: User with passport ${passport} not found!`);
    return null;
  }

  const data = (await docsRef.docs[0].data()) as User;
  return data;
};
