import { useState } from "react";
import toast from "react-hot-toast";
export default function ResetPage() {
  const [email, setEmail] = useState("");

  const submitReset = async () => {
    const response = await fetch(`${import.meta.env}/resetpassword`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    if (response.ok) {
      const res = await response.json();
      toast.success(res.message);
    } else {
      const res = await response.json();
      toast.error(res.message);
    }
  };

  return (
    <div className="w-full ml-[30%] mt-[15%]">
      <div className=" bg-[#1e1f26] rounded-lg p-[30px] max-w-[500px] min-h-[300px] flex flex-col items-center gap-5">
        <h2 className=" font-bold text-[32px]">Reset Your Password</h2>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <button
          className="btn btn-outline font-medium text-[20px] mt-6"
          onClick={submitReset}
        >
          Send Reset Link
        </button>
      </div>
    </div>
  );
}
