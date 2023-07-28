import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'


const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useToken();
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password);
        e.target.reset();
        navigate('/user/profile')
    };

    return (
        <div className="container mt-5 pt-5">
            <div className="offset-3 col-6">
                <div className="card-body">
                    <form className="signup-form" onSubmit={(e) => handleSubmit(e)}>
                        <h1>Log In</h1>
                        <div className="mb-3">
                            <label className="form-label">Username:</label>
                            <input
                                name="username"
                                type="text"
                                className="form-control"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password:</label>
                            <input
                                name="password"
                                type="password"
                                className="form-control"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <button type="submit" value="Login">Login </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
