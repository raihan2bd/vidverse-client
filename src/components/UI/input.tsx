'use client'

import React, { forwardRef, ForwardedRef, InputHTMLAttributes, LegacyRef } from 'react';
type InputProps = {
  name: string;
  wrapperCls?: string;
  inputCls?: string;
  label?: string;
  inputError?: string | null;
  inputRef?: ForwardedRef<HTMLInputElement>;
} & InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = forwardRef(
  (
    {
      name,
      wrapperCls = 'flex flex-col gap-2 w-full text-sm text-[#243D66]',
      inputCls = 'w-full px-4 py-2 bg-white/10 text-[#243D66] text-base hover:px-6 transition-all rounded-sm border border-violet-300 mb-2 rounded-sm text-sm',
      label,
      inputError,
      inputRef,
      ...restProps
    },
    ref
  ) => {
    const inputClass = `${inputCls} ${inputError ? 'border border-red-500' : ''}`;

    return (
      <div className={wrapperCls}>
        {label && (
          <label className="block my-1 text-sm" htmlFor={name}>
            {label}: {inputError && <span className="text-red-500">{inputError}</span>}
          </label>
        )}
        {inputError && !label && <p className="text-red-500 text-sm">{  inputError }</p>}
        <input
          name={name}
          className={inputClass}
          ref={inputRef || ref as LegacyRef<HTMLInputElement>}
          {...restProps}
        />
      </div>
    );
  }
);

Input.displayName = 'Input'

export default Input;

