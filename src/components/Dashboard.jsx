import React, { useState, useEffect } from "react";
import Backlog from "./Backlog";

const Dashboard = ({ setAuth, isAuthenticated }) => {
  const [name, setName] = useState("");
  async function getName() {
    try {
      const response = await fetch("http://localhost:5000/dashboard", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await response.json();
      setName(parseRes.user_name);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getName();
  }, []);
  return (
    <>
      <Backlog setAuth={setAuth} isAuthenticated={isAuthenticated} />
    </>
  );
};

export default Dashboard;
