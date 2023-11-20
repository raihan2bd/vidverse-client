import Link from "next/link";

const PageNotFound = () => {
    return (
        <div className="flex h-screen w-[100vw] justify-center items-center p-4 overflow-hidden max-w-[100%]">
          <div className="flex flex-col justify-center items-center w-fit bg-white p-4 rounded-xl gap-2">
            <h1 className="p-2 w-full text-center border-0 border-b-2 border-red-500 text-red-500 text-xl font-bold">Page Not Found</h1>
            <p className="text-red-400">The Page you are visited is not found our server.</p>
            <Link className="text-white text-center bg-violet-900 p-1" href="/">Back To Home</Link>
          </div>
        </div>
    );
}

export default PageNotFound;