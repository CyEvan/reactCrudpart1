import Student from "./Students";
import {useState, useEffect} from 'react';
import { getFirestore, doc, onSnapshot, collection, deleteDoc, addDoc} from "firebase/firestore";
import firebaseApp from "./firebaseConfig";
function Home(){
 
     const [student, setStudent] = useState({
      firstname: '',
      lastname: '',
      grade: '',

    });

     const [studentList,  setStudentList] = useState([]);
        
     useEffect(() =>{

         // Initialize Cloud Firestore and get a reference to the service
         const db = getFirestore(firebaseApp);

         try{
         onSnapshot(collection(db, 'students'), snapshot => {

             const newStudentList = [];
            
             snapshot.forEach(student =>{
               //Created a temp variable to store the data of student.data
               const tempStudent = student.data();
               tempStudent["student_id"] = student.id;  
               newStudentList.push(tempStudent);
             });

             setStudentList(newStudentList);
         });

      }catch(e){
         alert('Could not fetch the data of students!');
      }
 
     }, [])


     const addStudent = () => {
         // Initialize Cloud Firestore and get a reference to the service
         const db = getFirestore(firebaseApp);

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
    //Created a function to delete
     const deleteStudent = (studentID, firstname, lastname) => {
            // Initialize Cloud Firestore and get a reference to the service
            const db = getFirestore(firebaseApp);

            confirm(`Are you sure you want to delete ${firstname} ${lastname}?`).then(
               deleteDoc(doc(db,"students", studentID))
            );
          
     }
     return( 
      <section>
        <h1 className="fw-bold">Student Records 👨‍🎓</h1>
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

             <div className="alert alert-light">
              <h3 className="fw-bold">{student.firstname} {student.lastname} {student.grade}</h3>
             </div>
        
         </div>
         </div>
         <br />

          
         {
            //Passing Props
            studentList.map((studentRecord) => (
               <Student key={studentRecord.id} 
               firstname={studentRecord.firstname}
               lastname={studentRecord.lastname}
               grade={studentRecord.grade}
               deleteStudent ={deleteStudent}
               studentID={studentRecord.student_id}
                />
            ))
         }

      </section>
       
     )
}

export default Home;