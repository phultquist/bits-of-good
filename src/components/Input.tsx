export default function Input(props?:
    {
        placeholder?: string,
        id?: string,
        onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
        value?: string
        type?: string
    }) {
    return <input
        onChange={props?.onChange}
        type={props?.type || "text"} id={props?.id}
        placeholder={props?.placeholder}
        value={props?.value}
        className="h-10 bg-gray-100 appearance-none border focus:ring-blue-500 focus:ring-1 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
}