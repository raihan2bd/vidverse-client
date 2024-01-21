"use client";
import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import Input from "@/components/UI/input";
import Button from "@/components/UI/Button";
import { signIn } from "next-auth/react";
import useInput from "@/hooks/useInput";
import { validateInput } from "@/utils/validator";
import { useSession } from "next-auth/react";
import { useGlobalState } from "@/context/store";
import AuthOverlay from "@/components/UI/AuthOverlay";
import apple from "../../../public/images/apple-icon.svg";
import google from "../../../public/images/google-icon.svg";
import fb from "../../../public/images/fb-icon.svg";
import Image from "next/image";

const Login = () => {
  const { data: session } = useSession();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState<null | string>(null);

  const { setSuccess } = useGlobalState();

  // get the callback url from query
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("callback");

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

  const handleShowPass = () => {
    setShowPass((prev) => !prev);
  };

  useEffect(() => {
    if (session && session.user)
      callbackUrl ? router.push(callbackUrl as string) : router.push("/");
  }, [session, callbackUrl, router]);

  // check form validation
  const isFormValid = !emailError && !passwordError ? true : false;

  const formSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!isFormValid) {
      emailBlurHandler();
      emailBlurHandler();
      return;
    }
    try {
      setLoading(true);
      setHasError(null);

      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      // check if res is ok
      if (res && !res.ok) {
        if (res && res.status === 401) {
          throw new Error("Invalid email or password");
        }
        throw new Error("Something went wrong. Please try again later");
      }
      setSuccess("Login successful!");
      router.refresh();
    } catch (error) {
      setHasError(
        (error as Error).message ||
          "Something went wrong. Please try again later"
      );
    } finally {
      setLoading(false);
    }
  };

  const inputCls = useMemo(() => {
    return "px-4 py-2 text-custom-blue-400 bg-transparent border-0 border-b-2 border-white mb-6 outline-none text-base placeholder:text-white/50 md:mb-4";
  }, []);

  return (
    <section className="flex flex-col justify-center items-center mt-[-5rem]">
      <AuthOverlay>
          <h2 className="relative z-[1] text-white text-5xl font-semibold">
            Welcome!
          </h2>
          <h4 className="relative z-[1] text-white text-md mt-2">
            Sign in to continue
          </h4>

          <form
            className="flex flex-col p-4 md:p-8 rounded-xl mt-4 bg-[#D9D9D9] bg-opacity-[35%]"
            onSubmit={formSubmitHandler}
          >
            {hasError && (
              <p className="text-red-500 p-4 my-4 text-center h-[20px]">
                {hasError}
              </p>
            )}

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

            <Button
              disabled={loading}
              btnClass="mx-auto mt-2 py-2 text-2xl bg-custom-blue-400 w-fit rounded-[12px] shadow-lg uppercase font-semibold"
              style={{ padding: "0.5rem 2rem" }}
              type="submit"
            >
              {loading ? "Loading..." : "Login"}
            </Button>
            <Link
              className="text-custom-blue-400 block w-fit mx-auto my-4 text-sm"
              href="/forgot-pass"
            >
              Forgot password?
            </Link>

            <div className="flex flex-row gap-4 md:gap-10 items-center">
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
            If you don&lsquo;t have an account. Register a new one!{" "}
            <Link className="text-custom-blue-400 underline p-1" href="/signup">
              Signup
            </Link>
          </p>
      </AuthOverlay>
    </section>
  );
};

export default Login;
