import { useQuery } from "react-apollo";
import { ROOT_QUERY } from "../../App";
import { UserList } from "./components";

export const Users = () => {
  const result = useQuery(ROOT_QUERY);
  const { data, loading } = result;
  if (!data) {
    return <p>Loading</p>;
  }
  const { allUsers } = data;

  return (
    <div>
      <p>Loading: {loading ? "yes" : "no"}</p>
      {allUsers && allUsers.length > 0 && <UserList users={allUsers} />}
    </div>
  );
};
