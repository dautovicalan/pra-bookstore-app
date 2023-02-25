import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const ShowAllWorkers = () => {
  const [listOfUsers, setListOfUsers] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api-admin/workers/get-workers");
      const result = await response.json();
      setListOfUsers(result);
    }

    fetchData();
  }, []);

  return (
    <div style={{width: "80%", margin: "auto"}}>
      <table className="table table-striper">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Worker UID</th>
          </tr>
        </thead>
        <tbody>
          {listOfUsers &&
            listOfUsers.users.map((element) => {
              return (
                <tr key={element.uid}>
                  <td>{element.displayName}</td>
                  <td>{element.email}</td>
                  <td>{element.uid}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <Button
        variant="contained"
        color="success"
        onClick={() => navigate("/add-worker")}
      >
        Add new Worker
      </Button>
    </div>
  );
};

export default ShowAllWorkers;
