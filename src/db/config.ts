import { initializeApp } from "firebase/app";

//Testing
// const firebaseConfig = {
//   apiKey: "AIzaSyCdN3DjPB_JEeRRPpFxV0pidz6htIP6lO4",
//   authDomain: "mekkah-hotels-demo.firebaseapp.com",
//   projectId: "mekkah-hotels-demo",
//   storageBucket: "mekkah-hotels-demo.appspot.com",
//   messagingSenderId: "934039164068",
//   appId: "1:934039164068:web:7f99a4632700bb30800231",
// };

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
