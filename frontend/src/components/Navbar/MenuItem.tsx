import { Link } from "react-router-dom";

type MenuItemProps = {
  path: string;
  label: string;
  onClick?: () => void;
};

const MenuItem: React.FC<MenuItemProps> = ({ path, label, onClick }) => {
  return (
    <Link
      onClick={onClick}
      to={path}
      className="px-4 py-3 hover:bg-neutral-100 transition"
    >
      {label}
    </Link>
  );
};

export default MenuItem;
