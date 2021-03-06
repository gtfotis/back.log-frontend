import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);

        setAuth(true);
        toast.success("Welcome to back.log( ' u ' )");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <>
      <div className="form container">
        <h1 className="text-center mt-5">Login</h1>
        <form onSubmit={onSubmitForm}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="form-control my-3"
            value={email}
            onChange={(e) => onChange(e)}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="form-control my-3"
            value={password}
            onChange={(e) => onChange(e)}
          />
          <div className="form-check">
            Remember me
            <input type="checkbox" value="remember-me" id="remember_me" />
            <label className="checkbox"></label>
          </div>
          <br />
          <button className="btn btn-secondary btn-block">Submit</button>
        </form>
        <br />
        <Link to="/register">Click here to register! ( °ワ°)</Link>
        <br />
      </div>
    </>
  );
};

export default Login;
