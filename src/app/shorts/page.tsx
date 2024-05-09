import Link from "next/link";

const page = () => {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex justify-center items-center ">
      <div className="bg-white p-4 rounded-lg w-[97%] max-w-[500px] flex flex-col gap-4 shadow-md">
        <h2 className="text-3xl font-bold text-[#8c35ff]">Shorts Page</h2>
        <p>
          This page is under construction. The content will update soon. Once
          the feature is compleate
        </p>

        <Link className="text-[#8c35ff] block w-fit mx-auto" href="/">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default page;
