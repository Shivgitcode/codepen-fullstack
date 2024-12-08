import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../AppContext/AppContextProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [loginDetails, setLoginDetails] = useState({
    loginDetails: "",
    setLoginDetails: "",
  });
  const { setJwtToken } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    setLoginDetails((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    console.log(loginDetails);
  };

  const submitLogin = async (e) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/login`, {
      method: "POST",
      credentials: "include",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginDetails),
    });
    if (response.ok) {
      const data = await response.json();
      toast.success("Logged In ");
      setJwtToken(data.token);
      navigate("/");

      console.log(data);
    } else {
      const data = await response.json();
      toast.error(data.message);
      console.log(data);
    }
  };
  return (
    <div className="w-full ml-[30%] mt-[15%]">
      <div className=" bg-[#1e1f26] rounded-lg p-[30px] max-w-[500px] min-h-[300px] flex flex-col items-center gap-5">
        <h2 className=" font-bold text-[32px]">Login</h2>
        <label className="input input-bordered flex items-center gap-2 w-[80%]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Email"
            name="email"
            onChange={handleLogin}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-[80%]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="password"
            name="password"
            onChange={handleLogin}
          />
        </label>
        <Link
          to={"/reset"}
          className=" w-full pr-12 mt-[-12px] text-right text-blue-600"
        >
          Forgot Password
        </Link>
        <p className="w-full text-center mt-5 ">
          Don't have an account?{" "}
          <Link to="/signup" className=" text-blue-600">
            Sign Up
          </Link>
        </p>
        <button
          className="btn btn-outline font-medium text-[20px] mt-6"
          onClick={submitLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
