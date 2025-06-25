
export const Spinner = () => {
    return <div role="status">
        <div className="w-full gap-x-2 flex justify-center items-center">
            <div
                className="w-5 bg-rose-500 animate-pulse h-5 rounded-full animate-bounce"
            ></div>
            <div
                className="w-5 animate-pulse h-5 bg-red-300 rounded-full animate-bounce"
            ></div>
            <div
                className="w-5 h-5 animate-pulse bg-slate-600 rounded-full animate-bounce"
            ></div>
        </div>
    </div>
}