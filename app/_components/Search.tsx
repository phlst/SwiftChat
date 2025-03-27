import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { cva, VariantProps } from "class-variance-authority";

const inputStyles = cva("text-2xl h-full w-full text-custom-gray", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
    color: {
      gray: "text-gray-500",
      blue: "text-blue-500",
    },
  },
  defaultVariants: {
    size: "md",
    color: "gray",
  },
});

const iconStyles = cva("h-12 w-12", {
  variants: {
    size: {
      sm: "h-6 w-6",
      md: "h-8 w-8",
      lg: "h-12 w-12",
    },
    color: {
      gray: "text-gray-400",
      blue: "text-blue-400",
    },
  },
  defaultVariants: {
    size: "lg",
    color: "gray",
  },
});

interface FlexibleInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputStyles> {}

const FlexibleInput: React.FC<FlexibleInputProps> = ({
  size,
  color,
  ...props
}) => {
  return <input className={inputStyles({ size, color })} {...props} />;
};

interface FlexibleIconProps
  extends React.SVGProps<SVGSVGElement>,
    VariantProps<typeof iconStyles> {}

const FlexibleIcon: React.FC<FlexibleIconProps> = ({
  size,
  color,
  ...props
}) => {
  return (
    <MagnifyingGlassIcon className={iconStyles({ size, color })} {...props} />
  );
};

interface SearchProps {
  className: string;
  text: string;
  inputSize?: "sm" | "md" | "lg";
  inputColor?: "gray" | "blue";
  iconSize?: "sm" | "md" | "lg";
  iconColor?: "gray" | "blue";
}

const Search: React.FC<SearchProps> = ({
  className,
  text,
  inputSize,
  inputColor,
  iconSize,
  iconColor,
}) => {
  return (
    <div
      className={`border-2 flex items-center rounded-2xl justify-center border-dark-blue ${className}`}
    >
      <FlexibleIcon size={iconSize} color={iconColor} />
      <FlexibleInput
        placeholder={text}
        size={inputSize}
        color={inputColor}
        type="text"
      />
    </div>
  );
};

export default Search;
