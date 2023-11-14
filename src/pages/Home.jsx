import Student from "./Students";
import {useState, useEffect} from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot, collection, addDoc} from "firebase/firestore";

function Home(){
 
     const [student, setStudent] = useState({
      firstname: '',
      lastname: '',
      grade: '',

    });

     const [studentList,  setStudentList] = useState([]);
     const [savedStudentList, setSavedStudentList] = useState([]);

     useEffect(() =>{
       
      const savedStudentList = [];

      
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


         // Initialize Cloud Firestore and get a reference to the service
         const db = getFirestore(app);

      try{
      
         onSnapshot(collection(db, 'students'), snapshot => {
                snapshot.forEach(student => {
                  setSavedStudentList(
                     savedStudentList => [
                        ...savedStudentList,
                        student.data()
                     ]
                  );
          
            });
              setStudentList(savedStudentList);
            
         });

      }catch(e){
         alert('Could not fetch the data of students!');
      }
    
        
     }, [])


     const addStudent = () => {

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


         // Initialize Cloud Firestore and get a reference to the service
         const db = getFirestore(app);

        if(student.firstname === '' || student.lastname === '' || student.grade === ''){
         alert("Missing Fields!");
        }else{
         setStudentList(
            studentList => [
               ...studentList, student
            ]
          );

          addDoc(collection(db, 'students'),student);
         
          setStudent({
            firstname: '',
            lastname: '',
            grade: '',
   
          });

       } 
         //  localStorage.setItem('studentList', JSON.stringify(studentList))

        
     }

     return(
      <section>
        <h1 className="fw-bold ">Student Records 👨‍🎓</h1>
        <p>This is list of student records </p>
        <hr /> 
        <div className="mb-5 p-5 border">
         <div className="row">
            <div className="col-md-5">
               <label htmlFor="firstname">First name:</label>
                  <input id="firstname" 
                     onChange={(e)=> setStudent({
                        ...student,
                        firstname: e.target.value
                     })}
                     value={student.firstname}
                     className="form-control" 
                     type="text" placeholder="Cy "
                     />
            </div>
        
            <div className="col-md-5">
              <label htmlFor="lastname">Last name:</label>
               <input id="lastname"
                  onChange={(e)=> setStudent({
                     ...student,
                     lastname: e.target.value
                  })}
                  value={student.lastname}
                  className="form-control" 
                  type="text" placeholder="Evan "
                  />
            </div>

            <div className="col-md-2">
              <label htmlFor="gwa">Grade:</label>
               <input id="gwa" 
                  onChange={(e)=> setStudent({
                     ...student,
                     grade: e.target.value
                  })}
                  value={student.grade}
               className="form-control"
               type="number"
               />
            </div>
            
            <div className="col-md-2">
             <button onClick={()=>{addStudent()}} className="btn btn-dark mt-3">Add ➕</button>
            </div>

             <div className="alert aler-light">
              <h3 className="fw-bold">{student.firstname} {student.lastname} {student.grade}</h3>
             </div>
        
         </div>
         </div>
         <br />
    
         {
            studentList.map((studentRecord) => (
               <Student key={studentRecord.id} 
               firstname={studentRecord.firstname}
               lastname={studentRecord.lastname}
               grade={studentRecord.grade}
                />
            ))
         }

       


      </section>
       
     )
}

export default Home;