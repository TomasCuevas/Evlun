//* component *//
import { ConnectionCard } from "./";

//* interfaces *//
import { IUser } from "@/interfaces";

interface Props {
  users: IUser[];
}

export const ConnectionsFeed: React.FC<Props> = ({ users }) => {
  return (
    <section>
      {users.map((user) => (
        <ConnectionCard key={user._id} user={user} />
      ))}
    </section>
  );
};
