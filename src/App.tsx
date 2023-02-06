// import logo from "./logo.svg";
import { gql } from "apollo-boost";
import "./App.css";
import { Users } from "./components";

export const ROOT_QUERY = gql`
  query allUsers {
    totalUsers
    allUsers {
      name
      avatar
    }
  }
`;

function App() {
  return (
    <div className="App">
      <Users />
    </div>
  );
}

export default App;
