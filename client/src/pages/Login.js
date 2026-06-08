import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const login = () => {
    localStorage.setItem("user", "loggedin");
    navigate("/dashboard");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        style={{ padding: "10px", width: "250px" }}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        style={{ padding: "10px", width: "250px" }}
      />

      <br /><br />

      <button onClick={login}>
        Login
      </button>

      <p>
        Don't have an account?
        <Link to="/register"> Register</Link>
      </p>
    </div>
  );
}

export default Login;
