// import logo from "./logo.svg";
import { gql } from "apollo-boost";
import "./App.css";
import { Users, AuthorizedUser } from "./components";

export const ROOT_QUERY = gql`
  query allUsers {
    totalUsers
    allUsers {
      ...userInfo
    }
    me {
      ...userInfo
    }
  }

  fragment userInfo on User {
    githubLogin
    name
    avatar
  }
`;

function App() {
  return (
    <div className="App">
      <AuthorizedUser />
      <Users />
    </div>
  );
}

export default App;
