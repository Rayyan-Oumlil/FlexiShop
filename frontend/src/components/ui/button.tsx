import React from "react";

export function Button({ children, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`
        bg-pink-400 hover:bg-pink-500 text-white font-bold
        rounded-full px-6 py-2 shadow-lg transition duration-200
        focus:outline-none focus:ring-2 focus:ring-pink-200
        disabled:opacity-60 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
