import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        {...props}
        className={cn(
          `
          inline-flex items-center justify-center whitespace-nowrap
          rounded-full font-semibold
          transition-all duration-200
          
          /* DESKTOP */
          hover:scale-[1.02]

          /* MOBILE TAP FEEDBACK */
          active:scale-[0.96]
          active:brightness-95

          /* only apply hover when device supports hover */
          hover:[@media(hover:none)]:scale-100

          disabled:pointer-events-none disabled:opacity-50
          `,
          className
        )}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };