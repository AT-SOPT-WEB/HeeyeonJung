import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface TextInputProps {
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  showToggleIcon?: boolean;
}

const TextInput = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  showToggleIcon = false, 
}: TextInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  const inputType = isPassword
    ? showToggleIcon && showPassword
      ? 'text'
      : 'password'
    : type;

  return (
    <div className="relative w-full max-w-lg">
      <input
        type={inputType}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 mb-4 border rounded-lg text-sm"
      />
      {isPassword && showToggleIcon && (
        <div
          className="absolute right-4 top-3.5  cursor-pointer text-gray-400"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </div>
      )}
    </div>
  );
};

export default TextInput;