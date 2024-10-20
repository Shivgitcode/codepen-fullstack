import { Link } from "react-router-dom";
import { codepen } from "../../assets";
import { IoMdHome } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../AppContext/AppContextProvider";
import Cookie from "js-cookie"
import toast from "react-hot-toast";
import { CiBookmark } from "react-icons/ci";

export default function NavbarContent() {
    const navigate = useNavigate()
    const { isLoggedIn, setIsLoggedIn } = useContext(AppContext)

    const handleLogout = async () => {
        console.log("i am working")
        const response = await fetch("http://localhost:5000/api/v1/logout", {
            method: "POST",
            mode: "cors",
            credentials: "include"
        })

        if (response.ok) {
            const data = await response.json()
            navigate("/login")
            setIsLoggedIn(false)
            toast.success("logged Out successfully")
            console.log(data)
        }
        else {
            const data = await response.json()
            console.log(data)
        }




    }

    return (
        <div className="flex flex-col py-2 gap-5 mt-3">
            <img src={codepen} alt="" />
            <button className="btn btn-outline" onClick={() => { navigate("/codepen") }}>Start coding</button>
            <button className="btn btn-ghost text-[20px]" onClick={() => navigate("/")}><IoMdHome></IoMdHome>Home</button>
            <button className="btn btn-ghost" onClick={() => navigate("/codepen/saved")}>Bookmark</button>

            <div className="flex flex-col gap-4 mt-4">
                {!isLoggedIn ? <button className="btn btn-primary text-[20px]" onClick={() => navigate('/login')}>Login</button> : <button className="btn btn-primary text-[20px]" onClick={handleLogout}>logout</button>}
                {!isLoggedIn && <button className="btn btn-success text-[20px]" onClick={() => navigate("/signup")}>Signup</button>}

            </div>

        </div>
    )
}
