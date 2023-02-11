import { useQuery, useMutation } from "react-apollo";
import { gql } from "apollo-boost";
import { ROOT_QUERY } from "../../App";
import { UserList } from "./components";

const ADD_FAKE_USERS_MUTATION = gql`
  mutation addFakeUsers($count: Int!) {
    addFakeUsers(count: $count) {
      githubLogin
      name
      avatar
    }
  }
`;

export const Users = () => {
  const { data, loading, refetch } = useQuery(ROOT_QUERY);
  const [addFakeUserMutation] = useMutation(ADD_FAKE_USERS_MUTATION, {
    refetchQueries: [{ query: ROOT_QUERY }],
  });

  if (!data) {
    return <p>Loading</p>;
  }
  const { allUsers } = data;

  return (
    <>
      <div>
        <p>Loading: {loading ? "yes" : "no"}</p>
        {allUsers && allUsers.length > 0 && <UserList users={allUsers} />}
      </div>
      <div>
        <button type="button" onClick={() => refetch()}>
          Refetch Users
        </button>
        <button
          type="button"
          onClick={() => addFakeUserMutation({ variables: { count: 1 } })}
        >
          Add Fake User
        </button>
      </div>
    </>
  );
};
