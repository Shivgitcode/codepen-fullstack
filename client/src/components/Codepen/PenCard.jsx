import { IoMdSettings } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from "@uiw/codemirror-theme-vscode"
export default function PenCard({ pen }) {
    const [value, setValue] = React.useState("");
    const onChange = React.useCallback((val, viewUpdate) => {
        console.log('val:', val);
        setValue(val);
    }, []);
    return (
        <div className="flex flex-col w-full pb-5">

            <div className="flex items-center justify-between">
                <div className="flex items-end text-white gap-3 font-medium bg-[#1E1E1E] border-t-4 border-[#34363E] p-2">
                    <div className="w-[27px]">
                        <img src={pen.logo} alt="" />
                    </div>
                    <span>{pen.name}</span>
                </div>

                <div className="flex gap-1 items-center ">
                    <button className=" py-[2px] px-[7px] rounded-sm bg-[#1E1E1E]"><IoMdSettings></IoMdSettings></button>
                    <button className=" py-[2px] px-[7px] rounded-sm bg-[#1E1E1E]"><IoIosArrowDown></IoIosArrowDown></button>
                </div>

            </div>



            <div>
                <CodeMirror value={value} theme={vscodeDark} height="297px" extensions={[javascript({ jsx: true })]} onChange={onChange} />
            </div>
        </div>
    )
}
