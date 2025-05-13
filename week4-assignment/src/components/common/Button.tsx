interface ButtonProps {
  text: string;
  onClick: () => void;
  colorClass?: string;
  textColorClass?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button = ({
  text,
  onClick,
  colorClass = 'bg-buttonActive',
  textColorClass = 'text-white',
  className = '',
  type = 'button',
  disabled = false,
}: ButtonProps) => {
  const appliedColorClass = disabled ? 'bg-buttonDefault' : colorClass;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full max-w-lg py-2 mb-2 rounded-lg
        ${appliedColorClass} ${textColorClass}
        ${disabled ? 'cursor-not-allowed' : 'hover:opacity-90'}
        ${className}
      `}
    >
      {text}
    </button>
  );
};

export default Button;