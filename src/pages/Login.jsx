import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

function Login() {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [error,setError] = useState()
   const navigate = useNavigate()
   const {logIn} = UserAuth()

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await logIn(email, password)
      navigate('/dashboard')
    } catch (e) {
      setError(e.message)
      console.log(e.message)
    }
  };
   

  return (
    <div className="w-fit">
      <form className="flex flex-col justify-start items-start" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold">Log In</h1>
        <input
          type="email"
           onChange={(e) => setEmail(e.target.value)}
          name=""
          id="text"
          className="my-3 outline-none rounded-md text-xl px-2 py-1"
          autoComplete="off"
        />
        <input
          type="password"
           onChange={(e) => setPassword(e.target.value)}
          name=""
          id="password"
          className="my-3 outline-none rounded-md text-xl px-2 py-1"
          autoComplete="off"
        />
        <input
          type="submit"
          value="Log in"
          className="bg-[#183A1D] text-[#FEFBE9] text-center w-full py-3 font-bold cursor-pointer text-2xl rounded-md"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
}

export default Login;
