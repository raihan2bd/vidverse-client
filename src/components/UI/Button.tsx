import { ReactNode, ButtonHTMLAttributes } from 'react';

type PropsType = {
  btnClass?: string,
  type?: "button" | "submit" | "reset",
  children: ReactNode,
}& ButtonHTMLAttributes<HTMLButtonElement>;

;

const Button = ({ btnClass, type = "button", children, ...restProps }: PropsType) => {
  const btnClasses = btnClass ? `text-sm text-white bg-custom-blue-400 hover:bg-custom-blue-300 active:bg-custom-blue-400 px-4 py-2 rounded-sm disabled:opacity-25 disabled:cursor-not-allowed ${btnClass}` : `text-sm text-white bg-custom-blue-400 hover:bg-custom-blue-300 active:bg-custom-blue-400 px-4 py-2 rounded-sm disabled:opacity-25 disabled:cursor-not-allowed`;

  return (
    <button className={btnClasses} type={type? type : 'button'}{...restProps}>
      {children}
    </button>
  );
};

export default Button;