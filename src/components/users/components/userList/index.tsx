import { FC } from "react";
import { User } from "types";

type UserListProps = {
  users: User[];
};

export const UserList: FC<UserListProps> = ({ users }) => {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.name}>
          <img src={user.avatar} alt="" width={40} height={40} />
          <p>{user.name}</p>
        </li>
      ))}
    </ul>
  );
};
