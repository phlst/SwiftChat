import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { cva } from "class-variance-authority";

const inputStyles = cva("text-2xl focus:outline-none h-full w-full", {
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

const iconStyles = cva("", {
  variants: {
    size: {
      sm: "h-3 w-3",
      md: "h-6 w-6",
      lg: "h-8 w-8",
    },
    color: {
      gray: "text-gray-400",
      blue: "text-blue-400",
    },
  },
  defaultVariants: {
    size: "md",
    color: "gray",
  },
});

type FlexibleInputProps = {
  size: "sm" | "md" | "lg";
  color: "gray" | "blue";
  placeholder?: string;
};

const FlexibleInput: React.FC<FlexibleInputProps> = ({
  size,
  color,
  placeholder,
  ...props
}) => {
  return (
    <input
      type="text"
      className={inputStyles({ size, color })}
      placeholder={placeholder}
      {...props}
    />
  );
};

type FlexibleIconProps = {
  size: "sm" | "md" | "lg";
  color: "gray" | "blue";
};

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
  className?: string;
  text: string;
  inputSize?: "sm" | "md" | "lg";
  inputColor?: "gray" | "blue";
}

const Search: React.FC<SearchProps> = ({
  className,
  text,
  inputSize = "md", // Provide default value
  inputColor = "gray", // Provide default value
}) => {
  return (
    <div
      className={`border-2 mx-2 px-2 flex items-center rounded-2xl justify-center border-dark-blue ${className}`}
    >
      <FlexibleIcon size={inputSize} color={inputColor} />
      <FlexibleInput placeholder={text} size={inputSize} color={inputColor} />
    </div>
  );
};

export default Search;
