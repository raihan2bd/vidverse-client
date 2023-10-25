"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Input from "@/components/UI/input";
import Button from "@/components/UI/Button";

const Login = () => {
  const [showPass, setShowPass] = useState(false);

  const handleShowPass = () => {
    setShowPass((prev) => !prev);
  };

  const formSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      axios.defaults.withCredentials = true;

      const res = await axios.post(
        "http://localhost:4000/api/v1/auth/login",
        {}
      );
      // const result = await res.json()
      // console.log(result)
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center p-6">
      <form
        className="flex flex-col border border-violet-300/90 p-4 md:p-6 min-h-[calc(100vh-7rem)] w-[600px] max-w-[100%] shadow-xl shadow-violet-300 rounded-xl overflow-y-auto"
        onSubmit={formSubmitHandler}
      >
        <h2 className="text-center text-xl border-0 border-b-2 font-bold border-violet-900 p-2 text-violet-900 mb-3">
          Login
        </h2>
        <Input
          name="email"
          type="email"
          label="Email"
          inputError={null}
          required
          placeholder="Enter your email"
        />
        <Input
          name="password"
          type={showPass ? "text" : "password"}
          label="Password"
          inputError={null}
          required
          placeholder="Enter your password"
        />
        <Input
          wrapperCls="flex items-center gap-2 text-black/60 text-sm"
          inputCls="w-fit"
          name="show"
          type="checkbox"
          label="Show Password"
          onChange={handleShowPass}
        />

        <Link
          className="text-violet-900 block w-fit ms-auto my-4"
          href="/forgot-pass"
        >
          Forgot password?
        </Link>

        <Button btnClass="block w-full ms-auto mt-2 py-3" type="submit">
          Login
        </Button>
        <p className="text-center block mt-auto italic text-black/80 pt-2">If you don&lsquo;t have an account. Register a new one! <Link className="text-violet-950 underline p-1" href="/signup">Signup</Link></p>
      </form>
    </section>
  );
};

export default Login;
