import { ReactNode } from "react";
import { ReactComponent as Logo } from "../../assets/logo-simplestate.svg";
import "./styles.css";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <header className="header">
        <Logo className="logo" />
      </header>
      <div className="content" >
        {children}
      </div>
    </div>
  );
};

export default Layout;
