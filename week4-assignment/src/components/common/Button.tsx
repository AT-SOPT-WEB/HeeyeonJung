interface ButtonProps {
  text: string;
  onClick: () => void;
  colorClass?: string;
  textColorClass?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({
  text,
  onClick,
  colorClass = 'bg-buttonDefault',
  textColorClass = 'text-white',
  className = '',
  type = 'button',
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full max-w-lg py-2 mb-2 rounded-lg hover:opacity-90 ${colorClass} ${textColorClass} ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;