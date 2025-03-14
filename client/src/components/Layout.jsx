import "../styles/LayoutStyle.css";
import { adminMenu, userMenu } from './../Data/data';
import { Link,useLocation,useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import {message,Badge} from "antd"

 
const Layout = ({children}) => {
    const {user}=useSelector(state=>state.user) 
    const location=useLocation();
    const navigate=useNavigate()

    //logout function
    const handleLogout=()=>{
        localStorage.clear()
        message.success("Logout Successfully")
        navigate("/login")
    }

    //rendering menu list
    const SidebarMenu=user?.isAdmin ? adminMenu : userMenu
  return (
    <>
        <div className="main">
            <div className="layout">
                <div className="sidebar">
                    <div className="logo">
                        <h6>Doc App</h6>
                        <hr />
                    </div>
                    <div className="menu">
                        {userMenu.map(menu=>{
                            const isActive=location.pathname===menu.path
                            return(
                                
                                <div key={menu.path} className={`menu-item ${isActive && "active"}`}>
                                    <i className={menu.icon}></i>
                                    <Link to={menu.path}>{menu.name}</Link>
                                </div>
                                
                            )
                        })}
                         <div key="logout" className={`menu-item`} onClick={handleLogout}>
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                    <Link to={"/login"}>
                                    Logout</Link>
                                </div>
                    </div>
                </div>
                <div className="content">
                    <div className="header">
                    <div className="header-content">
                    <Badge count={user && user.notification.length}>
    </Badge>
                    <i className="fa-solid fa-bell"></i>
                    <Link to="/profile">{user?.name}</Link>
                    </div>
                    </div>
                    <div className="body">{children}</div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Layout
