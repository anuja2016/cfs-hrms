import { DropdownItem, Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, DropdownToggle, DropdownMenu, UncontrolledDropdown } from "reactstrap";
import { NavLink as ReactLink } from "react-router-dom";
import { useState } from "react";
import { isLoggedIn, getCurrentUserDetail } from "../Auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doLogout } from "../Auth";
import Logo from '../Assets/Logo1.png';

const CustomNavBar = () => {

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [login, setLogin] = useState(false)
    const [employee, setUser] = useState(undefined)

    useEffect(() => {
        setLogin(isLoggedIn())
        setUser(getCurrentUserDetail())
    }, [login])

    const logout = () => {
        doLogout(() => {
            //logged out
            setLogin(false)
            navigate("/login")
        })
    }

    return (
        <div >
            <Navbar color="dark" dark expand="md" fixed="" className="px-5">
                <NavbarBrand tag={ReactLink} to="/employee/dashboard">
                    <img src={Logo} alt="Logo1" style={{ marginRight: '3px', height: '30px' }} />
                    <span className="bold-text" style={{ fontSize: '15px', verticalAlign: 'bottom' }}></span>
                </NavbarBrand>
                <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        

                        
                    </Nav>
                    <Nav navbar>

                        {
                            login && (
                                <>
                                    <NavItem>
                                    <NavLink tag={ReactLink} to={`/employee/profile-info/${getCurrentUserDetail().id}`}>
                                            Profile Info
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={ReactLink} to="/employee/dashboard">
                                            {employee.userName}
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink onClick={logout}>
                                            Logout
                                        </NavLink>
                                    </NavItem>
                                </>

                            )
                        }

                        {
                            !login && (
                                <>
                                    <NavItem>
                                        <NavLink tag={ReactLink} to="/login">
                                            Login
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={ReactLink} to="/signup">
                                            
                                        </NavLink>
                                    </NavItem>
                                </>
                            )
                        }

                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default CustomNavBar;