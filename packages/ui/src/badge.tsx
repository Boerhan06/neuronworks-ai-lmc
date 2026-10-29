import * as React from "react";
import { cn } from "./utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "info" | "outline" | "mono";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "default",
  children,
  ...props
}) => {
  const base =
    "inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full transition-colors";

  const variants = {
    default: "bg-[#211F2D] text-[#DCDCE0] border border-[#33323E]",
    success: "bg-[#26543F] text-[#DFF1E9] border border-[#367859]",
    info: "bg-[#183367] text-[#99C8FF] border border-[#306EE8]",
    outline: "bg-transparent text-[#A1A0AB] border border-[#FFFFFF1A]",
    mono: "font-mono text-[11px] bg-[#FFFFFF1A] text-[#FFFFFF] rounded-[4px] px-2 py-0.5",
  };

  return (
    <span className={cn(base, variants[variant], className)} {...props}>
      {children}
    </span>
  );
};
Badge.displayName = "Badge";

