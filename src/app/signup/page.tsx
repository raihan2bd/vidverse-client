"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import axios from "axios";
import useInput from "@/hooks/useInput";
import Input from "@/components/UI/input";
import Button from "@/components/UI/Button";
import { validateInput } from "@/utils/validator";
import { useRouter, useSearchParams } from "next/navigation";
import { useGlobalState } from "@/context/store";

const Signup = () => {
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();
  const query = useSearchParams()
  const callbackUrl = query.get('callback') || "/";
  const { setError, setLoading, setSuccess} = useGlobalState();

  const {
    value: name,
    errorMsg: nameError,
    isTouched: isNameTouched,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput((value: string) => validateInput(value, { inputType: 'string', minLength: 3, maxLength: 100, pattern: /^[A-Za-z]+(\s[A-Za-z]+)?$/ }));

  const {
    value: email,
    errorMsg: emailError,
    isTouched: isEmailTouched,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput((value: string) => validateInput(value, { inputType: 'string', isEmail: true }));

  const {
    value: password,
    errorMsg: passwordError,
    isTouched: isPasswordTouched,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput((value: string) => validateInput(value, { inputType: 'string', minLength: 6, maxLength: 255, isPassword: true }));

  const {
    value: conformPassword,
    errorMsg: conformPasswordError,
    isTouched: isConformPasswordTouched,
    valueChangeHandler: conformPasswordChangeHandler,
    inputBlurHandler: conformPasswordBlurHandler,
  } = useInput((value: string) => validateInput(value, { inputType: 'string', comparePass: password }));

  // check form validation
  const isFormValid = (!nameError && !emailError && !passwordError && !conformPasswordError && isNameTouched && isEmailTouched && isPasswordTouched && isConformPasswordTouched) ? true : false;

  const handleShowPass = () => {
    setShowPass((prev) => !prev);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    if (!isFormValid) return;
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      await axios.post(
        `${API_URL}/api/v1/auth/signup`,
        {
          name,
          email,
          password,
        }
      );
      setSuccess("Signup successful, please login to continue")
      router.push(`/login?callback=${callbackUrl}`)
    } catch (error: any) {
      const msg = error.response?.data?.error || error.message || "Something went wrong, please try again!";
      setError(msg);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center p-6">
      <form
        className="flex flex-col border border-violet-300/90 p-4 md:p-6 min-h-[calc(100vh-7rem)] w-[600px] max-w-[100%] shadow-xl shadow-violet-300 rounded-xl overflow-y-auto"
        onSubmit={onSubmit}
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
          value={email}
          inputError={isEmailTouched? emailError : null}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          required
          placeholder="Enter your email"
        />
        <Input
          name="password"
          type={showPass ? "text" : "password"}
          label="Password"
          value={password}
          inputError={isPasswordTouched? passwordError : null}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
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
          value={conformPassword}
          onChange={conformPasswordChangeHandler}
          onBlur={conformPasswordBlurHandler}
          inputError={isConformPasswordTouched? conformPasswordError : null}
          required
          placeholder="Enter the conformation password"
        />

        <Button disabled={!isFormValid} btnClass="block w-full ms-auto mt-2 py-3" type="submit">
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
