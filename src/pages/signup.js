import { useState } from "react";
import "./signup.css";

function SignUp({ setToken }) {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URI}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setToken(data.token);
    } catch (err) {
      setError("Error : " + err.message);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          value={formData.email}
          name="email"
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          value={formData.password}
          name="password"
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit">Sign Up</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default SignUp;
