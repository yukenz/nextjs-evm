import React, {useState} from "react";
import cn from "classnames";

interface RetroRadioGroupProps {
    options: { value: string; label: string }[]
    name: string
    defaultValue?: string
    onChange?: (value: string) => void
    className?: string
    label?: string
}

function RetroRadioGroup({options,label ,name, defaultValue, onChange, className}: RetroRadioGroupProps) {

    const [selectedValue, setSelectedValue] = useState(defaultValue || "")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(e.target.value)
        onChange?.(e.target.value)
    }

    return (
        <div className={cn("space-y-3", className)}>

            {label && (
                <label className="mb-2 block font-bold text-black">
                    {label}
                </label>
            )}

            {options.map((option) => (
                <label
                    key={option.value}
                    className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-none border-4 border-black bg-white px-4 py-2 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all",
                        selectedValue === option.value && "border-blue-600 shadow-[4px_4px_0px_0px_rgba(37,99,235,1)]",
                        "hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
                        selectedValue === option.value && "hover:shadow-[6px_6px_0px_0px_rgba(37,99,235,1)]",
                    )}
                >
                    <div className="relative h-6 w-6">
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            checked={selectedValue === option.value}
                            onChange={handleChange}
                            className="peer sr-only"
                        />
                        <div
                            className="h-6 w-6 rounded-none border-4 border-black bg-white peer-checked:bg-blue-600"></div>
                        <div
                            className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 bg-white opacity-0 peer-checked:opacity-100"></div>
                    </div>
                    <span>{option.label}</span>
                </label>
            ))}
        </div>
    )
}

export default RetroRadioGroup