import { useCodeStore } from "../../zustand/codeStore";
import { useState } from "react";
import { useEffect } from "react";

export default function Display() {
  const [template, setTemplate] = useState("");
  const [loading, setLoading] = useState(false);
  const { myLangs } = useCodeStore((state) => ({
    myLangs: state.myLangs,
  }));

  useEffect(() => {
    setLoading(true);
    const timeoutId = setTimeout(() => {
      setTemplate(`
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
    `);
      setLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [myLangs]);

  return (
    <div className="relative w-full">
      {loading && (
        <div className="absolute top-2 right-4 bg-gray-800 text-white px-3 py-1 rounded shadow z-10 pointer-events-none text-sm">
          Loading...
        </div>
      )}
      <iframe
        className="w-[100%] h-[500px] bg-white"
        srcDoc={template}
        sandbox="allow-scripts allow-forms allow-same-origin allow-modals"
        title="Output"
      ></iframe>
    </div>
  );
}
