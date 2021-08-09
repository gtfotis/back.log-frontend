import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { name, email, password };

      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);

        setAuth(true);
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
        <h1 className="text-center mt-5">Register</h1>
        <form onSubmit={onSubmitForm}>
          <input
            className="form-control my-3"
            type="text"
            name="name"
            placeholder="Create a username"
            value={name}
            onChange={(e) => onChange(e)}
          />
          <input
            className="form-control my-3"
            type="email"
            name="email"
            placeholder="Enter an email"
            value={email}
            onChange={(e) => onChange(e)}
          />
          <input
            className="form-control my-3"
            type="password"
            name="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => onChange(e)}
          />

          <button className="btn btn-secondary btn-block">Submit</button>
        </form>
        <br />
        <Link to="/login">Click here to login ( ´◡` )</Link>
        <br />
      </div>
    </>
  );
};

// back.log(°ワ°)(´◡`)(ʕ ͡° ʖ̯ ͡°ʔ)

export default Register;
