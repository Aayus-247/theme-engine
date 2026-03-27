import React, { useState } from "react";

function Login({ setUser }) {
  const [name, setName] = useState("");

  return (
    <div>
      <h2>Login</h2>
      <input onChange={(e) => setName(e.target.value)} />
      <button onClick={() => setUser(name)}>Enter</button>
    </div>
  );
}

export default Login;