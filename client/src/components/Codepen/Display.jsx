import React from 'react'
import { useCodeStore } from '../../zustand/codeStore'
import { useState } from 'react'
import { useEffect } from 'react'

export default function Display() {
    const [template, setTemplate] = useState("")
    const { myLangs } = useCodeStore((state) => ({
        myLangs: state.myLangs
    }))

    useEffect(() => {
        const template = `
        <html>
            <head>
                <style>
                    ${myLangs.css}
                </style>
            </head>
            
            <body>
                ${myLangs.html}


                <script>
                    ${myLangs.js}
                </script>
            </body>
            
        </html>
    `
        setTemplate(template)

    }, [myLangs])



    return (
        <div>
            <iframe height={"100%"} width={"100%"} srcDoc={template} sandbox='allow-scripts' title='Output' ></iframe>


        </div>
    )
}
