import styles from "../styles/Layout.module.css";
import { adminMenu, userMenu } from "./../Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message, Badge } from "antd";
import { useState } from "react";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };

  const doctorMenu = [
    { name: "Home", path: "/", icon: "fa-solid fa-house" },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];

  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;

  const renderLinks = () =>
    SidebarMenu.map((menu) => {
      const isActive = location.pathname === menu.path;
      return (
        <Link
          key={menu.path}
          to={menu.path}
          className={`${styles.navLink} ${isActive ? styles.active : ""}`}
          onClick={() => setMenuOpen(false)}
        >
          <i className={menu.icon}></i>
          <span>{menu.name}</span>
        </Link>
      );
    });

  return (
    <div className={styles.container}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.navContent}>
          <Link to="/" className={styles.logo}>
            Doc App
          </Link>

          {/* Desktop Navigation */}
          <div className={styles.desktopNav}>
            <div className={styles.navCenter}>{renderLinks()}</div>
            <div className={styles.navControls}>
              <Badge
                count={user?.notification?.length || 0}
                onClick={() => navigate("/notification")}
                className={styles.badge}
              >
                <i className="fa-solid fa-bell"></i>
              </Badge>
              <Link to="/profile" className={styles.avatar}>
                {user?.name?.charAt(0).toUpperCase()}
              </Link>
              <button className={styles.logoutBtn} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className={styles.mobileControls}>
            <Badge
              count={user?.notification?.length || 0}
              onClick={() => navigate("/notification")}
              className={styles.badge}
            >
              <i className="fa-solid fa-bell"></i>
            </Badge>
            <Link to="/profile" className={styles.avatar}>
              {user?.name?.charAt(0).toUpperCase()}
            </Link>
            <button
              className={styles.menuToggle}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <i className={`fa ${menuOpen ? "fa-times" : "fa-bars"}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`${styles.mobileOverlay} ${menuOpen ? styles.show : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Slide-In Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.show : ""}`}>
        {renderLinks()}
        <button
          className={styles.mobileLogoutBtn}
          onClick={() => {
            handleLogout();
            setMenuOpen(false);
          }}
        >
          <i className="fa-solid fa-right-from-bracket"></i>
          <span>Logout</span>
        </button>
      </div>

      {/* Page Content */}
      <main className={styles.content}>{children}</main>
    </div>
  );
};

export default Layout;
