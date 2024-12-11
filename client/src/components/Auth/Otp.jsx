import { useContext, useEffect, useLayoutEffect, useState } from "react";

import toast from "react-hot-toast";
import { AppContext } from "../../AppContext/AppContextProvider";
import { useLocation, useNavigate } from "react-router-dom";

export default function Otp() {
  const [otp, setOtp] = useState("");
  const { setJwtToken, otpEmail, setOtpEmail } = useContext(AppContext);
  let [timer, setTimer] = useState(30);
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  console.log(query.get("email"));
  const submitOtp = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/verify-otp`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp, email: query.get("email") }),
      }
    );
    if (response.ok) {
      const res = await response.json();
      setJwtToken(res.user);
      toast.success(res.message);
      navigate("/");
    } else {
      const res = await response.json();
      toast.error(res.message);
    }
  };
  const resendOtp = () => {
    const resendingOtp = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/resend-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: query.get("email") }),
        }
      );
      if (response.ok) {
        const res = await response.json();
        setTimer(30);
        return res;
      } else {
        const res = await response.json();
        return res;
      }
    };
    toast.promise(resendingOtp(), {
      loading: "Getting your otp",
      success: (data) => `${data.message}`,
      error: (err) => `Error:${err.toString()}`,
    });
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prev) => {
        return (prev = prev - 1);
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(intervalId);
    }, 30000);
    setTimer(30);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="w-full ml-[30%] mt-[15%]">
      <div className=" bg-[#1e1f26] rounded-lg p-[30px] max-w-[500px] min-h-[300px] flex flex-col items-center gap-5">
        <h2 className=" font-bold text-[32px]">Enter Otp</h2>
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
            placeholder="otp"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </label>
        <p>
          {timer === 0 ? (
            <span onClick={resendOtp} className=" text-blue-500 cursor-pointer">
              resend otp
            </span>
          ) : (
            <p>otp expires in {timer} seconds </p>
          )}
        </p>

        <button
          className="btn btn-outline font-medium text-[20px] mt-6"
          onClick={submitOtp}
        >
          verify otp
        </button>
      </div>
    </div>
  );
}
