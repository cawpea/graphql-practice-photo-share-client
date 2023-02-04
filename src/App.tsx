import React, { useEffect, useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { request } from "graphql-request";

type User = {
  name: string;
  avatar: string;
};

const apiUrl = "http://localhost:4000/graphql";

const query = `
query listUsers {
  allUsers {
    avatar
    name
  }
}
`;

const mutation = `
  mutation populate($count: Int!) {
    addFakeUsers(count: $count) {
      githubLogin
    }
  }
`;

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const fetchUsers = async () => {
    const result = await request(apiUrl, query);
    console.log("result", result);
    setUsers(result.allUsers);
  };

  const addUser = async () => {
    await request(apiUrl, mutation, { count: 1 });
    await fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      {users.length > 0 && (
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              <img src={user.avatar} alt="" width="40" height="40" />
              <p>{user.name}</p>
            </li>
          ))}
        </ul>
      )}
      <button type="button" onClick={addUser}>
        Add User
      </button>
    </div>
  );
}

export default App;
