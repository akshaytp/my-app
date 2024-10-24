import React, { useEffect, useState } from 'react';

const UserList = ({ searchTerm }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await fetch('https://api.example.com/users').then(response => response.json()).catch(e => console.log(e));
      setUsers(data);
    }
    fetchUsers();
  }, [searchTerm]);

  const activateUser = async () => {
    setLoading(true)
    await fetch(`/api/users/${user.id}/activate`, { method: 'POST' }).then(response => response.json())
      .then(data => console.log(data)).catch(e => console.log(e));
    setLoading(false)
  }

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          <h2>{user.name}</h2>
          <div>{user.profile}</div>
          <button onClick={activateUser()}>
            {loading ? "Activating" : "Activate User"}
          </button>
        </li>
      ))}
    </ul>
  );
};

const Dashboard = () => {
  const [search, setSearch] = useState('');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('wss://api.example.com/notifications');
    ws.onmessage = (event) => {
      setNotifications(prev => [...prev, event.data]);
    };
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        onChange={handleSearch}
        value={search}
      />
      <UserList searchTerm={search} />
      <ul>
        {notifications.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;