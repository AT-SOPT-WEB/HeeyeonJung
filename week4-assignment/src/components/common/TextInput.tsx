import React from 'react';

interface TextInputProps {
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const TextInput = ({ type = 'text', value, onChange, placeholder }: TextInputProps) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full max-w-lg px-4 py-3 mb-4 border rounded-lg text-sm"
    />
  );
};

export default TextInput;
