
import type React from "react"
import cn from "classnames";

interface RetroInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

export function RetroTextArea({className, label, id, placeholder, ...props}: RetroInputProps) {


    const inputId = id

    return (
        <div>
            {label && (
                <label htmlFor={inputId} className="mb-2 block font-bold text-black">
                    {label}
                </label>
            )}
            <input
                id={inputId}
                className={cn(
                    "border-4 border-black ",
                    "font-mono text-lg",
                    "w-full rounded-none bg-white px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none transition-all",
                    "focus:border-blue-600 focus:shadow-[4px_4px_0px_0px_rgba(37,99,235,1)]",
                    "hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
                    "hover:focus:shadow-[6px_6px_0px_0px_rgba(37,99,235,1)]",
                    className,
                )}
                {...props}
            />
        </div>
    )
}

export default RetroTextArea