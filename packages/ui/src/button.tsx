import * as React from "react";
import { cn } from "./utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#99C8FF] disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none";

    const variantStyles = {
      primary:
        "bg-[#853BCE] hover:bg-[#A667E4] text-white border border-[#8043C8] shadow-[0px_0px_8px_0px_#B428B459,0px_0px_24px_0px_#662BDF59]",
      secondary:
        "bg-[#545260] hover:bg-[#6C6B7B] text-white border border-[#FFFFFF1A]",
      ghost:
        "bg-transparent hover:bg-[#FFFFFF0D] text-[#DCDCE0] hover:text-white border-0",
      danger:
        "bg-[#852626] hover:bg-[#A83232] text-white border border-[#FFFFFF1A]",
    };

    const sizeStyles = {
      sm: "h-[36px] px-3 text-xs rounded-[6px] gap-1.5",
      md: "h-[42px] px-4 text-sm rounded-[6px] gap-2",
      lg: "h-[50px] px-6 text-base rounded-[8px] gap-2.5",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

