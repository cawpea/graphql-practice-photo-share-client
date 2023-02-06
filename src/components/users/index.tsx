import { useQuery } from "react-apollo";
import { ROOT_QUERY } from "../../App";
import { UserList } from "./components";

export const Users = () => {
  const result = useQuery(ROOT_QUERY);
  const { data, loading } = result;
  const { allUsers } = data;
  console.log("Users", result);

  return (
    <div>
      <p>Loading: {loading ? "yes" : "no"}</p>
      {allUsers && allUsers.length > 0 && <UserList users={allUsers} />}
    </div>
  );
};
