import cls from 'classnames';
import { useMemo } from 'react';

export default function Button({color, disabled, onClick, children}) {

    const buttonClasses = useMemo(() => {
        return {
            "bg-green text-grey-400 border border-green": color === "green" && !disabled,
            "bg-grey-400 text-green border border-grey-400": color === "grey" && !disabled,
            "bg-transparent text-white border border-grey-300": color === "transparent" && !disabled,
            "bg-grey-400 text-grey-900 cursor-not-allowed": disabled
        }
    })

    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={cls("rounded-lg px-3 py-2 uppercase text-sm font-semibold tracking-wider", buttonClasses)}
        >
            {children}
        </button>
    )
}