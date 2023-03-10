import { useEffect,useState } from "react";
import { db } from "./firebase.config";
import { collection,doc, getDoc, onSnapshot, query } from "firebase/firestore"
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { AuthContextProvider } from "./context/AuthContext";

function App() {

  // const [bookings, setBookings] = useState()
  const [loading,setLoading] = useState(true)
  


  // useEffect(()=>{
  //   const q = query(collection(db,'/bookings'))
  //   const unsubscribe = onSnapshot(q,(querySnapshot) => {
  //     let bookingsArray = []
  //     querySnapshot.forEach((doc) => {
  //       bookingsArray.push({...doc.data(), id:doc.id})
  //     })
  //     setBookings(bookingsArray)
  //     console.log(bookings)
  //   })
  //   return () => unsubscribe()
  // },[])

  return (
    <div className="bg-[#FEFBE9] min-h-screen flex flex-col justify-center items-center">
      <AuthContextProvider>
          <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/dashboard' element={<Dashboard/>} />
       </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
