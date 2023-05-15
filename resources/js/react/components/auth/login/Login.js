import { useState } from "react";
import {useAlert} from "react-alert";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { login } from '../../../api_modules/auth/auth';
import { setAuth } from "../../../redux/reducers/auth/authSlice";

function Login() {
    const alert = useAlert();
    const history = useHistory();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function loginUser() {
        login(email, password).then(response => {
            if (response.success) {
                dispatch(setAuth(response.user));
                alert.success(response.message);
                history.push('/');
            } else {
                alert.error(response.message);
            }
        }).catch(error => {
            alert.error(error.message);
        });
    }

    return (
        <section className={`mt-5`}>
            <div className="container">
                <div className="row justify-content-md-center mt-3">
                    <div className="col col-lg-6">
                        <form>
                            <div className="form-group">
                                <label htmlFor="login-email">Email address</label>
                                <input type="email"
                                       value={email}
                                       id="login-email"
                                       className="form-control"
                                       placeholder="Enter email"
                                       onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="login-password">Password</label>
                                <input type="password"
                                       id="login-password"
                                       value={password}
                                       className="form-control"
                                       placeholder="Enter Password"
                                       onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="col-md-12 text-center mt-4">
                                <button onClick={loginUser} className="btn btn-primary rounded-pill text-uppercase" type="button">
                                    Log In
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
