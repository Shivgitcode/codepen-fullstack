import { IoCloud } from "react-icons/io5";
import { MdViewSidebar } from "react-icons/md";
import { logo, profile } from "../../assets";
import { MdEdit } from "react-icons/md";
import { useContext, useState } from "react";
import { useStore } from "zustand";
import { AppContext } from "../../AppContext/AppContextProvider";
import { Link, useNavigate, useParams } from "react-router-dom"
import { useCodeStore } from "../../zustand/codeStore";
import toast from "react-hot-toast";

export default function Header() {
    const [title, setTitle] = useState("Untitled")
    const { isLoggedIn } = useContext(AppContext)
    const [edit, setEdit] = useState(true)
    const { myLangs } = useCodeStore((state) => ({
        myLangs: state.myLangs
    }))
    const navigate = useNavigate()
    const params = useParams()
    console.log(params)
    console.log("dfhlea", isLoggedIn)

    const handleSubmission = async (id) => {
        if (!isLoggedIn) {
            return navigate("/login")
        }

        if (id) {
            const response = await fetch(`http://localhost:5000/api/v1/codepen/${id}`, {
                method: "PATCH",
                mode: "cors",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...myLangs, title })
            })
            if (response.ok) {
                const data = await response.json()
                toast.success(data.message);
                navigate("/")

            }
            else {
                const data = await response.json()
                toast.error(data.message)

            }
        }
        else {
            const response = await fetch("http://localhost:5000/api/v1/codepen", {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...myLangs, title })

            })
            if (response.ok) {
                const data = await response.json()
                toast.success("Pen saved successfully")
                navigate("/")
                console.log(data)
            }
            else {
                const data = await response.json()
                toast.success("Not saved")
                console.log(data)
            }

        }

    }




    return (
        <div className="flex justify-between items-center py-2 px-5 bg-black border-b-[2px] border-gray-700">
            <div className="flex gap-3">
                <div className="w-[35px]">
                    <Link to={"/"}>
                        <img src={logo} alt="" className="" />
                    </Link>
                </div>
                <div className="flex flex-col items-start">
                    <div className="flex items-end">
                        {edit ? <input type="text" disabled value={title} className=" text-[20px] bg-black text-white w-[30%]" /> : <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className=" text-[20px]  text-white w-[30%]"></input>}
                        <MdEdit onClick={() => setEdit(!edit)}></MdEdit>
                    </div>
                    <p>username</p>

                </div>

            </div>
            <div className="flex items-center gap-5">
                <button className="flex items-center py-[10px] px-[12px] bg-[#444857] rounded text-white text-[15px] font-semibold gap-2 cursor-pointer hover:bg-[#696f86] transition-all" onClick={() => handleSubmission(params.id)}>
                    <IoCloud></IoCloud>
                    <span>Save</span>

                </button>

                {/* change view  */}
                <div className="px-[16px] py-[14px] mr-[10px] bg-[#444857] rounded text-white cursor-pointer hover:bg-[#696f86] transition-all">
                    <MdViewSidebar></MdViewSidebar>
                </div>

                <div className="w-[44px] rounded">
                    <img src={profile} alt="" />
                </div>



            </div>

        </div>
    )
}
