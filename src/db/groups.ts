import {
  Timestamp,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "./config";

type Activity = {
  name: string;
  time: Timestamp;
};
type Meal = {
  name: string;
  time: string;
};

type Group = {
  groupNumber: number;
  groupName: string;
  hotelName: string;
  activities: Array<Activity>;
  meals: Array<Meal>;
};

export const getGroupByNumber = async (groupNumber: number) => {
  const store = getFirestore(app);
  const col = collection(store, "Groups");
  const searchQuery = query(col, where("groupNumber", "==", groupNumber));
  const docsRef = await getDocs(searchQuery);
  if (docsRef.size === 0) {
    console.error(`getGroup: Group ${groupNumber} not found!`);
    return null;
  }

  const data = (await docsRef.docs[0].data()) as Group;
  return data;
};
