import { initializeApp } from "firebase/app";

//Production
const firebaseConfig = {
  apiKey: "AIzaSyAPljtE4WMskFrwLZSjRRyZbI1UQKFR5wY",
  authDomain: "makkah-hotels-77d1a.firebaseapp.com",
  projectId: "makkah-hotels-77d1a",
  storageBucket: "makkah-hotels-77d1a.appspot.com",
  messagingSenderId: "541839871571",
  appId: "1:541839871571:web:d0c4e0b069b6c9b93bc0a6",
  measurementId: "G-RCGCWJXDW8",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export { app };
