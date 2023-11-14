import { initializeApp } from "firebase/app";
  
  //Firebase Configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB2Wxm778OIPCMr2-9FCLFEGdO1hwmqD4c",
    authDomain: "studentsrecords-8afb4.firebaseapp.com",
    projectId: "studentsrecords-8afb4",
    storageBucket: "studentsrecords-8afb4.appspot.com",
    messagingSenderId: "102083144786",
    appId: "1:102083144786:web:ac44611fcf5f640e84838b",
    measurementId: "G-TN91H91RTN"
  };

    //Intialize Firebase
    const app = initializeApp(firebaseConfig);

    export default app;