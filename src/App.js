import { useState, useEffect } from "react";
import "./App.css";

import Login from "./pages/login";
import SignUp from "./pages/signup";
import SendForm from "./pages/sendForm";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    if (token) {
      fetch(`${process.env.REACT_APP_API_URI}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  }, [token]);

  return (
    <div className="App">
      {token ? (
        <SendForm />
      ) : (
        <div>
          <button onClick={() => setShowSignUp(true)}>Sign Up</button>
          <button onClick={() => setShowSignUp(false)}>Conenct</button>
          {showSignUp ? (
            <SignUp setToken={setToken} />
          ) : (
            <Login setToken={setToken} />
          )}
        </div>
      )}

      {/* Footer */}
      <div className="footer">
        Fait par{" "}
        <a href="https://github.com/Zakinane" target="_blank" rel="noreferrer">
          Zakinane
        </a>
      </div>
    </div>
  );
}

export default App;
