export default function MovieContainer({ children }) {
    return (
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {children}
        </ul>
    )
}