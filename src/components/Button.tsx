type ButtonProps = {
  title: string;
  onClick?: () => void;
  isDisabled?: boolean;
};

export const Button = ({ title, isDisabled, onClick }: ButtonProps) => {
  return (
    <button disabled={isDisabled} onClick={onClick}>
      {title}
    </button>
  );
};
