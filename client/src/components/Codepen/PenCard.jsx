import { IoMdSettings } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { useState, useCallback, useLayoutEffect } from "react";
import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { langs } from "@uiw/codemirror-extensions-langs"
import { vscodeDark } from "@uiw/codemirror-theme-vscode"
import { useCodeStore } from "../../zustand/codeStore";
import { useRef } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PenCard({ pen }) {
    const params = useParams()
    let [lang, setLang] = useState([])

    const [value, setValue] = useState("");

    // const inputRef = useRef(null)
    const { myLangs, handleMyLangs, onePen } = useCodeStore((state) => ({
        myLangs: state.myLangs,
        handleMyLangs: state.handleMyLangs,
        onePen: state.onePen
    }))

    useLayoutEffect(() => {

        if (pen.name == "HTML") {
            setLang(langs.html())
            if (params.id) {
                setValue(onePen.html)

            }
            else {
                setValue("")
            }
        }
        else if (pen.name == "CSS") {
            setLang(langs.css())
            if (params.id) {
                setValue(onePen.css)

            }
            else {
                setValue("")
            }

        }
        else {
            setLang(langs.javascript())
            if (params.id) {
                setValue(onePen.js)

            }
            else {
                setValue("")
            }
        }
        console.log("hello 1")

    }, [onePen])



    const onChange = (val) => {
        console.log(val)
        handleMyLangs(val, pen.name.toLowerCase())
        setValue(val)



    }

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
                <CodeMirror value={value} theme={vscodeDark} height="297px" extensions={[lang]} onChange={(value) => onChange(value)} />
            </div>
        </div>
    )

}