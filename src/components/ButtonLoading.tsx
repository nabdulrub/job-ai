import { Loader2 } from "lucide-react";
import { Button, ButtonProps, buttonVariants } from "./ui/button";
import { ButtonHTMLAttributes } from "react";
import { VariantProps } from "class-variance-authority";

interface ButtonLoadingProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  text?: string;
  loadingText?: string;
  className?: string;
  variant?: VariantProps<typeof buttonVariants>;
  buttonIcon?: React.ReactNode;
}

const ButtonLoading = ({
  isLoading,
  text,
  loadingText,
  className,
  variant,
  buttonIcon,
  ...props
}: ButtonLoadingProps) => {
  return isLoading ? (
    <Button
      disabled={isLoading}
      className={className}
      {...props}
      variant={variant}
    >
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      {loadingText}
    </Button>
  ) : (
    <Button className={className} {...props} variant={variant}>
      {text}
      {buttonIcon}
    </Button>
  );
};

export default ButtonLoading;
