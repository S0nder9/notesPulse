'use client'
import { useEffect, useState } from "react"

export const Notes = () => {
    const [text, setText] = useState("");

    useEffect(() => {
        const savedText = localStorage.getItem("text");

        if (savedText) {
            setText(savedText);
        }
    }, []);

    const handleChange = (e) => {
        const newText = e.target.value;
        setText(newText);
        localStorage.setItem("text", newText);
    }

    return (
        <div className="w-full">
            {/* <textarea onChange={(e) => handleChange(e)} cols={4} rows={4} className="w-1/2" value={text} /> */}
            <input onChange={(e) => handleChange(e)} value={text} type="text" placeholder="John Doe" className="block  mt-2 w-1/2 placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-red-300" />
        </div>
    )
}

// https://merakiui.com/components