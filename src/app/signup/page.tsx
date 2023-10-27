"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import axios from "axios";
import useInput from "@/hooks/useInput";
import Input from "@/components/UI/input";
import Button from "@/components/UI/Button";
import { validateInput, ValidationResultType } from "@/utils/validator";

const Signup = () => {
  const [showPass, setShowPass] = useState(false);

  const {
    value: name,
    errorMsg: nameError,
    isTouched: isNameTouched,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput((value: string) => validateInput(value, { inputType: 'string', minLength: 3, maxLength: 100, pattern: /^[A-Za-z]+(\s[A-Za-z]+)?$/  }));

  const handleShowPass = () => {
    setShowPass((prev) => !prev);
  };

  const formSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      axios.defaults.withCredentials = true;

      const res = await axios.post(
        "http://localhost:4000/api/v1/auth/signup",
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
          Signup
        </h2>
        <Input
          name="name"
          type="text"
          label="Full Name"
          placeholder="Enter your full name"
          value={name}
          inputError={isNameTouched? nameError: null}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          required
        />
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

        <Input
          name="conform_password"
          type={showPass ? "text" : "password"}
          label="Conformation Password"
          inputError={null}
          required
          placeholder="Enter your password"
        />

        <Button btnClass="block w-full ms-auto mt-2 py-3" type="submit">
          Signup
        </Button>

        <p className="text-center block mt-auto italic text-black/80 pt-2">
          If you already have an account.{" "}
          <Link className="text-violet-950 underline p-1" href="/login">
            Login
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Signup;
