import Link from "next/link";

type PropTypes = {
  title?: string;
  message?: string;
  actionLink?: string;
  disableActionBtn?: boolean;
  children?: React.ReactNode;
};

const CustomError = ({
  title = "An Error Occurred",
  message = "Something went wrong. Please try again later",
  actionLink = "/",
  disableActionBtn = false,
  children,
}: PropTypes) => {
  return (
    <div className="flex h-screen w-[100vw] justify-center items-center p-4 overflow-hidden max-w-[100%]">
      <div className="flex flex-col justify-center items-center w-fit bg-white p-4 rounded-xl gap-2">
        <h1 className="p-2 w-full text-center border-0 border-b-2 border-red-500 text-red-500 text-xl font-bold">
          {title}
        </h1>
        <p className="text-red-400">{message}</p>
        {!disableActionBtn && <Link className="text-white text-center bg-violet-900 p-1" href={actionLink}>
          Back To Home
        </Link>}
        {children}
      </div>
    </div>
  );
};

export default CustomError;
