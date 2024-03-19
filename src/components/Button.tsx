type ButtonProps = {
  title: string;
  className?: string;
  isDisabled?: boolean;
  onClick?: () => void;
};

export const Button = ({
  title,
  className,
  isDisabled,
  onClick,
}: ButtonProps) => {
  return (
    <button className={className} disabled={isDisabled} onClick={onClick}>
      {title}
    </button>
  );
};
