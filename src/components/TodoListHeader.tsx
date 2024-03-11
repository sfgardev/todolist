type TodoListHeaderProps = {
  title: string;
};

export const TodoListHeader = ({ title }: TodoListHeaderProps) => {
  return <h3>{title}</h3>;
};
