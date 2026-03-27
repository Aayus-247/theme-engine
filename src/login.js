import React, { useState } from "react";

function Login({ setUser }) {
  const [name, setName] = useState("");

  const handleLogin = () => {
    localStorage.setItem("user", name);
    setUser(name);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Enter your name</h2>
      <input onChange={(e) => setName(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;