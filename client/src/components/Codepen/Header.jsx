import { IoCloud } from "react-icons/io5";
import { MdViewSidebar } from "react-icons/md";
import { logo, profile } from "../../assets";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
export default function Header() {
    const [title, setTitle] = useState("")
    return (
        <div className="flex justify-between items-center py-2 px-5 bg-black border-b-[2px] border-gray-700">
            <div className="flex gap-3">
                <div className="w-[35px]">
                    <img src={logo} alt="" className="" />
                </div>
                <div className="flex flex-col items-start">
                    <div className="flex items-end">
                        <input type="text" disabled value={`${title === "" ? "Untitled" : title}`} className=" text-[20px] bg-transparent text-white w-[30%]" onChange={(e) => setTitle(e.target.value)} />
                        <MdEdit></MdEdit>
                    </div>
                    <p>username</p>

                </div>

            </div>
            <div className="flex items-center gap-5">
                <div className="flex items-center py-[10px] px-[12px] bg-[#444857] rounded text-white text-[15px] font-semibold gap-2 cursor-pointer hover:bg-[#696f86] transition-all">
                    <IoCloud></IoCloud>
                    <span>Save</span>

                </div>

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
