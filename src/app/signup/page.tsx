"use client";
import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import axios from "axios";
import useInput from "@/hooks/useInput";
import Input from "@/components/UI/input";
import Button from "@/components/UI/Button";
import { validateInput } from "@/utils/validator";
import { useRouter, useSearchParams } from "next/navigation";
import { useGlobalState } from "@/context/store";
import AuthOverlay from "@/components/UI/AuthOverlay";
import Image from "next/image";
import apple from "../../../public/images/apple-icon.svg";
import google from "../../../public/images/google-icon.svg";
import fb from "../../../public/images/fb-icon.svg";

const Signup = () => {
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();
  const query = useSearchParams();
  const callbackUrl = query.get("callback") || "/";
  const {
    setError,
    setLoading,
    setSuccess,
    uiState: { loading },
  } = useGlobalState();

  const {
    value: name,
    errorMsg: nameError,
    isTouched: isNameTouched,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput((value: string) =>
    validateInput(value, {
      inputType: "string",
      minLength: 3,
      maxLength: 100,
      pattern: /^[A-Za-z]+(\s[A-Za-z]+)?$/,
    })
  );

  const {
    value: email,
    errorMsg: emailError,
    isTouched: isEmailTouched,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput((value: string) =>
    validateInput(value, { inputType: "string", isEmail: true })
  );

  const {
    value: password,
    errorMsg: passwordError,
    isTouched: isPasswordTouched,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput((value: string) =>
    validateInput(value, {
      inputType: "string",
      minLength: 6,
      maxLength: 255,
      isPassword: true,
    })
  );

  const {
    value: conformPassword,
    errorMsg: conformPasswordError,
    isTouched: isConformPasswordTouched,
    valueChangeHandler: conformPasswordChangeHandler,
    inputBlurHandler: conformPasswordBlurHandler,
  } = useInput((value: string) =>
    validateInput(value, { inputType: "string", comparePass: password })
  );

  // check form validation
  const isFormValid =
    !nameError &&
    !emailError &&
    !passwordError &&
    !conformPasswordError
      ? true
      : false;

  const handleShowPass = () => {
    setShowPass((prev) => !prev);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!isFormValid) {
      nameBlurHandler()
      emailBlurHandler()
      passwordBlurHandler()
      conformPasswordBlurHandler()
      return
    }
    setLoading(true);
    if (!isFormValid) return;
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      await axios.post(`${API_URL}/api/v1/auth/signup`, {
        name,
        email,
        password,
      });
      setSuccess("Signup successful, please login to continue");
      router.push(`/login?callback=${callbackUrl}`);
    } catch (error: any) {
      const msg =
        error.response?.data?.error ||
        error.message ||
        "Something went wrong, please try again!";
      setError(msg);
    }
  };

  const inputCls = useMemo(() => {
    return "px-4 py-2 text-custom-blue-400 bg-transparent border-0 border-b-2 border-white mb-6 outline-none text-base placeholder:text-white/50 md:mb-4";
  }, []);

  return (
    <section className="flex flex-col justify-center items-center mt-[-5rem]">
      <AuthOverlay isSignup={true}>
      <h2 className="relative z-[1] text-white text-5xl font-bold font-poppins">
            Hi!
          </h2>
          <h4 className="relative z-[1] text-white text-md mt-2">
            Create a new account
          </h4>
        <form
          className="flex flex-col p-4 md:p-8 rounded-xl mt-4 bg-[#D9D9D9] bg-opacity-[35%]"
          onSubmit={onSubmit}
        >
          <Input
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            inputError={isNameTouched ? nameError : null}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            required
            inputCls={inputCls}
          />
          <Input
            name="email"
            type="email"
            value={email}
            inputError={isEmailTouched ? emailError : null}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            required
            placeholder="Enter your email"
            inputCls={inputCls}
          />
          <Input
            name="password"
            type={showPass ? "text" : "password"}
            value={password}
            inputError={isPasswordTouched ? passwordError : null}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            required
            placeholder="Enter your password"
            inputCls={inputCls}
          />

          <Input
            wrapperCls="flex items-center gap-2 w-fit ms-auto text-custom-blue-400 text-sm"
            inputCls="w-fit"
            name="show"
            type="checkbox"
            label="Show Password"
            onChange={handleShowPass}
          />

          <Input
            name="conform_password"
            type={showPass ? "text" : "password"}
            value={conformPassword}
            onChange={conformPasswordChangeHandler}
            onBlur={conformPasswordBlurHandler}
            inputError={isConformPasswordTouched ? conformPasswordError : null}
            required
            placeholder="Enter the conformation password"
            inputCls={inputCls}
          />

          <Button
            disabled={loading}
            btnClass="mx-auto mt-2 py-2 text-2xl bg-custom-blue-400 w-fit rounded-[12px] shadow-lg uppercase font-semibold"
            style={{ padding: "0.5rem 2rem" }}
            type="submit"
          >
            {loading ? "Loading..." : "Signup"}
          </Button>

          <div className="flex flex-row gap-4 md:gap-10 items-center mt-4">
            <hr className="w-1/2" />
            <span className="text-custom-blue-400">or</span>
            <hr className="w-1/2" />
          </div>
          <div className="text-custom-blue-400 flex flex-col items-center mt-2 gap-3 text-sm">
            <p>Sign in with</p>
            <div className="flex flex-row gap-6">
              <button>
                <Image src={google} alt="Google" width={30} height={30} />
              </button>
              <button>
                <Image src={fb} alt="Google" width={30} height={30} />
              </button>
              <button>
                <Image src={apple} alt="Google" width={30} height={30} />
              </button>
            </div>
            <Link href="/contact-us">Need a help?</Link>
          </div>
        </form>
        <p className="text-center block text-white pt-2 text-sm md:text-base">
          If you already have an account.{" "}
          <Link className="text-violet-950 underline p-1" href="/login">
            Login
          </Link>
        </p>
      </AuthOverlay>
    </section>
  );
};

export default Signup;
