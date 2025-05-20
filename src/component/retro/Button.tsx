"use client"

import type React from "react"
import cn from "classnames"

interface RetroButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger"
}

export function RetroButton({className, variant = "primary", children, ...props}: RetroButtonProps) {
    const variantStyles = {
        primary: "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white",
        secondary: "bg-purple-500 hover:bg-purple-600 active:bg-purple-700 text-white",
        danger: "bg-red-500 hover:bg-red-600 active:bg-red-700 text-white",
    }

    return (
        <button
            className={cn(
                "rounded-none border-4 border-black px-6 py-2 font-bold uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all",
                "hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
                "active:translate-y-[0px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
                variantStyles[variant],
                className,
            )}
            {...props}
        >
            {children}
        </button>
    )
}

export default RetroButton