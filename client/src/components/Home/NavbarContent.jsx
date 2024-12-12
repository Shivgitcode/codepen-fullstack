import { codepen, astro } from "../../assets";
import { IoMdHome } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../AppContext/AppContextProvider";

import toast from "react-hot-toast";

export default function NavbarContent() {
  const navigate = useNavigate();
  const { jwtToken, setJwtToken } = useContext(AppContext);

  const handleLogout = async () => {
    console.log("i am working");
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      navigate("/login");
      setJwtToken("");
      toast.success("logged Out successfully");
      console.log(data);
    } else {
      const data = await response.json();
      console.log(data);
    }
  };

  return (
    <div className="flex flex-col py-2 gap-5 mt-3">
      <img src={astro} alt="" />
      <button
        className="btn btn-outline"
        onClick={() => {
          navigate("/codepen");
        }}
      >
        Start coding
      </button>
      <button
        className="btn btn-ghost text-[20px]"
        onClick={() => navigate("/")}
      >
        <IoMdHome></IoMdHome>Home
      </button>
      <button
        className="btn btn-ghost"
        onClick={() => navigate("/codepen/saved")}
      >
        Bookmark
      </button>

      <div className="flex flex-col gap-4 mt-4">
        {!jwtToken ? (
          <button
            className="btn btn-primary text-[20px]"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        ) : (
          <button
            className="btn btn-primary text-[20px]"
            onClick={handleLogout}
          >
            logout
          </button>
        )}
        {!jwtToken && (
          <button
            className="btn btn-success text-[20px]"
            onClick={() => navigate("/signup")}
          >
            Signup
          </button>
        )}
      </div>
    </div>
  );
}
