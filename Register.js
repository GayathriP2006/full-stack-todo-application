import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const register = () => {
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Register</h1>

      <input
        type="text"
        placeholder="Name"
        style={{ padding: "10px", width: "250px" }}
      />

      <br /><br />

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

      <button onClick={register}>
        Register
      </button>

      <p>
        Already have an account?
        <Link to="/"> Login</Link>
      </p>
    </div>
  );
}

export default Register;