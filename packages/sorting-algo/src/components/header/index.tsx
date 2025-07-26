import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";
import { Link, useLocation } from "react-router";

const Header = () => {
  const { pathname } = useLocation();
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">
          {pathname === "/" ? "Sorting" : "Heap"} Visualizer
        </h1>
        <div className="flex gap-2">
          <Button variant="ghost">
            <Link to="/">Sorting</Link>
          </Button>
          <Button variant="ghost">
            <Link to="/heap">Heap</Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
