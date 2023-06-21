import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "./config";

type General = {
  News: {
    content: string;
  };
};

export const getImportantNews = async () => {
  const store = getFirestore(app);
  const col = collection(store, "General");
  const docRef = doc(col, "News");

  const document = getDoc(docRef);

  if (!(await (await document).exists())) {
    console.log(`getImportantNews: No news not found!`);
    return null;
  }

  const data = await (await document).data();
  return data;
};
