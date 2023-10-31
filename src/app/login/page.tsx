"use client";
import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import Input from "@/components/UI/input";
import Button from "@/components/UI/Button";
import { signIn } from "next-auth/react";
import useInput from "@/hooks/useInput";
import { validateInput } from "@/utils/validator";
import { useSession } from "next-auth/react";

const Login = () => {
  const { data: session } = useSession();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState<null | string>(null);

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
  }, [session, callbackUrl]);

  const formSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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

  // check form validation
  const isFormValid =
    !emailError && !passwordError && isEmailTouched && isPasswordTouched
      ? true
      : false;

  return (
    <section className="flex flex-col justify-center items-center p-6">
      <form
        className="flex flex-col border border-violet-300/90 p-4 md:p-6 min-h-[calc(100vh-7rem)] w-[600px] max-w-[100%] shadow-xl shadow-violet-300 rounded-xl overflow-y-auto"
        onSubmit={formSubmitHandler}
      >
        <h2 className="text-center text-xl border-0 border-b-2 font-bold border-violet-900 p-2 text-violet-900 mb-3">
          Login
        </h2>

        <p className="text-red-500 p-4 my-3 text-center h-[20px]">{hasError}</p>

        <Input
          name="email"
          type="email"
          label="Email"
          value={email}
          inputError={isEmailTouched ? emailError : null}
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
          inputError={isPasswordTouched ? passwordError : null}
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

        <Link
          className="text-violet-900 block w-fit ms-auto my-4"
          href="/forgot-pass"
        >
          Forgot password?
        </Link>

        <Button
          disabled={!isFormValid || loading}
          btnClass="block w-full ms-auto mt-2 py-3"
          type="submit"
        >
          {loading ? "Loading..." : "Login"}
        </Button>
        <p className="text-center block mt-auto italic text-black/80 pt-2">
          If you don&lsquo;t have an account. Register a new one!{" "}
          <Link className="text-violet-950 underline p-1" href="/signup">
            Signup
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
