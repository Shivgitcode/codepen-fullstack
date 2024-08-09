import { IoMdSettings } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from "@uiw/codemirror-theme-vscode"
export default function PenCard({ pen }) {
    const [value, setValue] = React.useState("console.log('hello world!');");
    const onChange = React.useCallback((val, viewUpdate) => {
        console.log('val:', val);
        setValue(val);
    }, []);
    return (
        <div className="flex flex-col w-full">
            <div>
                <div>
                    <div>
                        <img src={pen.logo} alt="" />
                    </div>
                    <div>
                        <button><IoMdSettings></IoMdSettings></button>
                        <button><IoIosArrowDown></IoIosArrowDown></button>
                    </div>

                </div>

            </div>

            <div>
                <CodeMirror value={value} theme={vscodeDark} height="200px" extensions={[javascript({ jsx: true })]} onChange={onChange} />
            </div>
        </div>
    )
}
