"use client";
import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { cva } from "class-variance-authority";

// Define styles with class-variance-authority (cva)
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

// Define prop types for FlexibleInput
type FlexibleInputProps = {
  size: "sm" | "md" | "lg";
  color: "gray" | "blue";
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// FlexibleInput component
const FlexibleInput: React.FC<FlexibleInputProps> = ({
  size,
  color,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <input
      type="text"
      className={inputStyles({ size, color })}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

// Define prop types for FlexibleIcon
type FlexibleIconProps = {
  size: "sm" | "md" | "lg";
  color: "gray" | "blue";
};
// FlexibleIcon component
const FlexibleIcon: React.FC<FlexibleIconProps> = ({ size, color }) => {
  return <MagnifyingGlassIcon className={iconStyles({ size, color })} />;
};

// Define prop types for Search
interface SearchProps {
  className?: string;
  text: string;
  inputSize?: "sm" | "md" | "lg";
  inputColor?: "gray" | "blue";
  wantIcon?: boolean;
  onSubmit?: (value: string) => void;
}

// Search component
const Search: React.FC<SearchProps> = ({
  className,
  text,
  inputSize = "md", // Provide default value
  inputColor = "gray", // Provide default value
  wantIcon = true, // Provide default value
  onSubmit,
}) => {
  const [value, setValue] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit && value.trim() !== "") {
      onSubmit(value);
      setValue(""); // Clear the input after submission
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`border-2 mx-2 px-2 flex items-center rounded-2xl justify-center border-dark-blue ${className}`}
    >
      {wantIcon ? <FlexibleIcon size={inputSize} color={inputColor} /> : null}
      <FlexibleInput
        placeholder={text}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        size={inputSize}
        color={inputColor}
      />
    </form>
  );
};

export default Search;
