import styles from './header.module.scss'
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../api_modules/auth/auth";
import { selectAuth, setAuth } from "../../../redux/reducers/auth/authSlice";

function Header() {
    const history = useHistory();
    const dispatch = useDispatch();
    const auth = useSelector(selectAuth);

    function logout() {
        logOut().then(() => {
            dispatch(setAuth(null));
            history.push('/login')
        }).catch(error => {
            console.log('logout', error.response.data)
        });
    }

    function setActive(e) {
        //e.target.classList.toggle(`${styles.active}`)
    }

    const location = useLocation();

    return (
        <nav className={`navbar navbar-expand-lg navbar-dark of-bg-dark fixed-top p-4 ${styles.indexTop}`}>
            <Link to={`/`} className={`${styles.symbol} text-white text-decoration-none`}>
                <div className={`${styles['navbar-brand']}`}>
                    <ul className={`mb-0 p-0`}>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                Singers<span>.</span>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse pt-4 pt-lg-0" id="navbarSupportedContent">
                <ul className={`navbar-nav ml-auto mb-2 mb-lg-0 ${styles['main-menu']} text-right`}>
                    <li className="nav-item">
                        <Link onMouseEnter={(event) => setActive(event)}
                              onMouseLeave={(event) => setActive(event)} to="/"
                              className={`nav-link text-white ${location.pathname == '/' ? styles.active : false}`}>Home</Link>
                    </li>
                    {auth &&
                    <li className="nav-item">
                        <Link onMouseEnter={(event) => setActive(event)}
                              onMouseLeave={(event) => setActive(event)}
                              className={`nav-link text-white ${location.pathname == '/profile' ? styles.active : false}`}
                              to='/profile' >Profile</Link>
                    </li>
                    }
                    {/*<li className="nav-item">*/}
                    {/*    <Link to="/posts" className="nav-link text-white">Posts</Link>*/}
                    {/*</li>*/}
                    {/*<li className="nav-item">*/}
                    {/*    <Link to="/photos" className="nav-link text-white">Photos</Link>*/}
                    {/*</li>*/}
                    {/*<li className="nav-item">*/}
                    {/*    <Link to="/videos" className="nav-link text-white">Videos</Link>*/}
                    {/*</li>*/}
                    {/*<li className="nav-item">*/}
                    {/*    <Link to="/music" className="nav-link text-white">Music</Link>*/}
                    {/*</li>*/}
                    {!auth &&
                    <li className="nav-item">
                        <Link onMouseEnter={(event) => setActive(event)}
                              onMouseLeave={(event) => setActive(event)}
                              to="/register"
                              className={`nav-link text-white ${location.pathname == '/register' ? styles.active : false}`}>Sign Up</Link>
                    </li>
                    }
                    {!auth &&
                    <li className="nav-item">
                        <Link onMouseEnter={(event) => setActive(event)}
                              onMouseLeave={(event) => setActive(event)}
                              to="/login"
                              className={`nav-link text-white ${location.pathname == '/login' ? styles.active : false}`}>LogIn</Link>
                    </li>
                    }
                    {auth &&
                    <li className="nav-item">
                        <a onMouseEnter={(event) => setActive(event)}
                           onMouseLeave={(event) => setActive(event)}
                           role='button' className="nav-link text-white" onClick={logout}>Log Out</a>
                    </li>
                    }
                </ul>
            </div>
        </nav>
    );
}

export default Header;
