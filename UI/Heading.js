import cls from 'classnames';
import { useMemo } from 'react';


export default function Heading({ num, size, color, children }) {

    const headingClasses = useMemo(() => {
        return {
            "uppercase text-xs lg:text-sm font-medium text-green": size === "sm" && color === "green",
            "uppercase text-xs lg:text-sm font-medium text-white": size === "sm" && color === "white",
            "text-xl font-medium text-green": size === "md" && color === "green",
            "text-xl font-medium text-white": size === "md" && color === "white",
            "text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-green": size === "lg" && color === "green",
            "text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-white": size === "lg" && color === "white"
        }
    })


    function createHeading(num, text) {
        let hd;
        let value = parseInt(num)

        switch (value) {
            case value === 1:
                hd = <h1 className={cls("text-center", headingClasses)}>{text}</h1>
                break;
            case value === 2:
                hd = <h2 className={cls("text-center", headingClasses)}>{text}</h2>
                break;
            case value === 3:
                hd = <h3 className={cls("text-center", headingClasses)}>{text}</h3>
                break;
            case value === 4:
                hd = <h4 className={cls("text-center", headingClasses)}>{text}</h4>
                break;

            default:
                hd = <h1 className={cls("text-center", headingClasses)}>{text}</h1>
                break;
        }

        return hd
    }

    let heading = createHeading(num, children)

    return (
        <>
            {heading}
        </>
    )
}