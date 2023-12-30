"use client";

import { FormEvent, useMemo, useState } from "react";
import axios from "axios";
import useDynamicInput from "@/hooks/useDynamicInput";
import useFileInput from "@/hooks/useFileInput";
import { validateInput, validateImage } from "@/utils/validator";
import Spinner from "../UI/Spinner";
import ErrorModal from "../UI/ErrorModal";
import Input from "../UI/input";
import Button from "../UI/Button";
import defaultThumbnail from "../../../public/images/default-thumb.jpg";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useGlobalState } from "@/context/store";

const CreateORUpdateChannelForm = ({
  edit = false,
  chanId = 0,
  chanTitle = "",
  chanDescription = "",
  chanLogo = "",
}) => {
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const pathName = usePathname();
  const params = useSearchParams();
  const {
    setError: setErrorToast,
    setLoading,
    setSuccess,
    uiState: { loading },
  } = useGlobalState();

  const pathWithParams = useMemo(() => {
    return `${pathName}?${params.toString()}`;
  }, [params, pathName]);

  const {
    value: title,
    errorMsg: titleError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    isTouched: isTitleTouched,
    setValue: setTitle,
    reset: resetTitle,
  } = useDynamicInput(
    (value) =>
      validateInput(value, {
        inputType: "string",
        minLength: 6,
        maxLength: 255,
      }),
    chanTitle || ""
  );

  const {
    value: description,
    errorMsg: descriptionError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    isTouched: isDescriptionTouched,
    setValue: setDescription,
    reset: resetDescription,
  } = useDynamicInput(
    (value) =>
      validateInput(value, {
        inputType: "string",
        minLength: 25,
        maxLength: 500,
      }),
    chanDescription || ""
  );

  const validateLogoInput = (value: File | null) => {
    if (edit && value === null) return null;
    const logo = validateImage(value);
    return logo.isValid ? null : logo.msg || "Invalid Image!";
  };

  const {
    value: logo,
    errorMsg: logoError,
    isTouched: isLogoTouched,
    valueChangeHandler: logoChangeHandler,
    inputBlurHandler: logoBlurHandler,
  } = useFileInput(validateLogoInput);

  const router = useRouter();

  // check form is valid or not
  let isFormValid = false;
  if (edit) {
    if (
      !titleError &&
      !descriptionError &&
      (isTitleTouched || isDescriptionTouched || isLogoTouched)
    ) {
      isFormValid = true;
    }
  } else {
    if (
      !titleError &&
      !descriptionError &&
      !logoError &&
      isTitleTouched &&
      isDescriptionTouched &&
      isLogoTouched
    ) {
      isFormValid = true;
    }
  }

  const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session || !session.user || !session.token) {
      router.push(`/login?callback=${pathWithParams}`);
      setErrorToast("Please login to continue");
      return;
    }

    if (session.user.user_role !== "author") {
      if (session.user.user_role !== "admin") {
        router.push("/access-denied");
        setErrorToast("You are not allowed to create channel");
        return;
      }
    }

    const token = session.token;

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    if (!isFormValid) return;

    const formData = new FormData();
    formData.append("title", title as string);
    formData.append("description", description as string);
    formData.append("logo", logo as File);
    let url = `${API_URL}/api/v1/channels`

    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: token,
    };
    if (edit) {
      url = `${API_URL}/api/v1/channels/${chanId}`;
      formData.append("logo_url", chanLogo as string);
      if (
        description === chanDescription &&
        title === chanTitle &&
        logo === null
      ) {
        setSuccess("Your already have this channel");
        router.push(`/channels/${chanId}`);
        return;
      }
    }

    try {
      console.log("form data", formData)
      if (edit) {
        setLoading(true);
        const res = await axios.patch(url, formData, {
          headers,
        });
        const msg = res.data && res.data.message ? res.data.message : "Your Channel is Updated Successfully!";
        setSuccess(msg);
        router.push(`/channels/${chanId}`);
      } else {
        const res = await axios.post(url, formData, {
          headers,
        });

        const channelID = res.data.channel_id;
        if (channelID) {
          router.push(`/channels/${channelID}`);
        } else {
          setErrorToast("Something went wrong! please try again later.");
          setError("Something went wrong! please try again later.");
        }
      }
    } catch (err: any) {
      console.log(err)
      const status = err.response && err.response.status? err.response.status : 500;
      const errMsg =
        err && err.response && err.response.data
          ? err.response.data.error
          : err.message
          ? err.message
          : "Something went wrong! please try again later.";

      switch (status) {
        case 401:
          setErrorToast(errMsg);
          router.push(`/login?callback=${pathWithParams}`);
          break;
        case 403:
          setErrorToast(errMsg);
          router.push("/access-denied");
          break;
        case 422:
          setErrorToast(errMsg);
          setError(errMsg);
          break;
        case 500:
          setErrorToast(errMsg);
          setError(errMsg);
          break;
        default:
          setErrorToast(errMsg);
          setError(errMsg);
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  const imagePreviewContent = useMemo(() => {
    if (logo && !logoError) {
      return (
        <img
          className="rounded max-h-[100%] max-w-[100%] border mx-auto"
          src={URL.createObjectURL(logo)}
          alt="image-preview"
          width={150}
          height={150}
        />
      );
    } else if (chanLogo) {
      return (
        <img
          className="rounded max-h-[100%] max-w-[100%] border mx-auto"
          src={chanLogo}
          alt="image-preview"
          width={150}
          height={150}
        />
      );
    } else {
      return (
        <img
          className="rounded max-h-[100%] max-w-[100%] border mx-auto"
          src={defaultThumbnail.src}
          alt="video-placeholder"
          width={150}
          height={150}
        />
      );
    }
  }, [logo, logoError, chanLogo]);

  if (error) {
    return <ErrorModal errMsg={error} tryAgainHandler={() => setError(null)} />;
  }

  return (
    <form
      onSubmit={formSubmitHandler}
      className="w-[768px] max-w-[100%] p-4 md:p-6 min-h-screen bg-white rounded-2xl flex flex-col gap-2"
    >
      <h1 className="py-1 text-2xl font-bold text-violet-700 block w-fit border-0 border-b-[3px] mx-auto border-bg-black/30">
        {edit ? "Edit Channel" : "Add Channel"}
      </h1>

      <Input
        name="title"
        label="Channel Name"
        type="text"
        value={title as string}
        placeholder="Enter your Channel Name"
        onChange={titleChangeHandler}
        onBlur={titleBlurHandler}
        inputError={isTitleTouched ? titleError : null}
      />

      {imagePreviewContent}

      <Input
        onChange={logoChangeHandler}
        onBlur={logoBlurHandler}
        inputError={isLogoTouched ? logoError : null}
        type="file"
        name="logo"
        label="Channel Logo"
        accept="image/png, image/jpeg, image/jpg"
      />

      <div className="flex flex-col gap-2">
        <label className="text-sm text-black/90" htmlFor="description">
          Channel Description:
        </label>
        <textarea
          className="border border-black/30 rounded-sm p-2 w-full h-32"
          name="description"
          id="description"
          value={description as string}
          onChange={descriptionChangeHandler}
          onBlur={descriptionBlurHandler}
          placeholder="Enter your Video description"
        ></textarea>
      </div>

      <Button disabled={!isFormValid} type="submit" btnClass="w-full py-3 mt-4">
        {loading ? "Please Wait..." : edit ? "Edit Video" : "Upload Video"}
      </Button>
    </form>
  );
};

export default CreateORUpdateChannelForm;
