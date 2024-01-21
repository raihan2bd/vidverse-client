import Image from "next/image";
import authSplash from "../../../public/images/auth-splash-img.png";
import Link from "next/link";

const AuthPage = () => {
  return (
    <section className="bg-custom-violet-300 grid grid-cols-2 min-h-screen mt-[-5rem] p-[6%] md:p-[8%] items-center">
      <div className="col-span-full md:col-span-1 flex flex-col gap-2">
        <h2 className="text-white text-5xl font-semibold text-left">Hello!</h2>
        <p className="text-white text-lg mt-2">
          Best place were <br /> You can kill your time.
        </p>
        <div className="mt-8 flex flex-col gap-8 w-fit mx-auto md:mx-0">
          <Link
            className="block w-[300px] max-w-[100%] bg-gradient-btn rounded-20 px-5 py-3 shadow-custom-btn text-xl font-bold text-center text-white hover:text-custom-blue-400"
            href="/login"
          >
            SIGN IN
          </Link>
          <Link
            href="/signup"
            className="block w-[300px] max-w-[100%] bg-gradient-btn rounded-20 px-5 py-3 shadow-custom-btn text-xl font-bold text-center text-white hover:text-custom-blue-400"
          >
            SIGN UP
          </Link>
          <Link
            href="/"
            className="text-custom-purple-100 text-center mt-[-1rem]"
          >
            Continue as a quest
          </Link>
        </div>
      </div>
      <div className="hidden first-letter:md:col-span-1 md:block">
        <Image src={authSplash} alt="Authenticate" width={830} height={600} />
      </div>
    </section>
  );
};

export default AuthPage;
