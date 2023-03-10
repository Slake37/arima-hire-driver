import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase.config";

function Dashboard() {
  const { user, logOut } = UserAuth();
  const [bookings, setBookings] = useState();
  const bookingsCollectionRef = collection(db, "bookings");
  const navigate = useNavigate();

  useEffect(() => {
    const getBookings = async () => {
      const data = await getDocs(bookingsCollectionRef);
      setBookings(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(bookings);
    };
    getBookings();
  }, []);

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };
  if (user) {
    return (
      <div className="w-full p-5  m-auto">
        <div className="absolute left-0 m-auto top-0 flex justify-between items-center w-full p-3 max-w-[1440px]">
          <h1 className="flex flex-col">
            Hello <p className="font-bold">{user.email}</p>
          </h1>
          <button
            onClick={handleLogOut}
            className="cursor-pointer bg-[#183A1D] text-[#FEFBE9] px-5 py-2 rounded-md"
          >
            Log out
          </button>
        </div>

        <table className="table-auto w-full">
          <thead>
            <th className="text-sm md:text-xl">Name</th>
            <th className="text-sm md:text-xl">Surname</th>
            <th className="text-sm md:text-xl">Phone number</th>
            <th className="hidden md:flex md:text-xl">E-mail</th>
          </thead>
          <tbody className="text-center ">
            {bookings?.map((booking) => (
              <tr className="odd:bg-white even:bg-slate-50">
                <td className="text-xs md:text-lg">{booking.formData.name}</td>
                <td className="text-xs md:text-lg">{booking.formData.surname}</td>
                <td className="text-xs md:text-lg">{booking.formData.phoneNumber}</td>
                <td className="hidden md:flex md:text-lg">{booking.formData.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    navigate("/");
  }
}

export default Dashboard;
