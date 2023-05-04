import React, { useContext } from 'react';

type User = {
  name: string;
  email: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const UserContext = React.createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

const App: React.FC = () => {
  const [user, setUser] = React.useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div>
        <h1>Welcome to my app</h1>
        <LoginForm />
        <UserProfile />
      </div>
    </UserContext.Provider>
  );
};

const LoginForm: React.FC = () => {
  const { setUser } = useContext(UserContext);

  const handleLogin = () => {
    const user = { name: 'John Doe', email: 'johndoe@example.com' };
    setUser(user);
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Log in as John Doe</button>
    </div>
  );
};

const UserProfile: React.FC = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default App;
