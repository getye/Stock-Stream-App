import React, { useEffect, useState } from 'react';
import {MaterialReactTable} from 'material-react-table';

const View = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then((response) => response.json())
      .then((data) => {
        const formattedUsers = data.users.map(user => ({
          id: user.ID,       // Map 'ID' to 'id'
          name: user.Name,   // Map 'Name' to 'name'
          email: user.Email, // Map 'Email' to 'email'
        }));
        setUsers(formattedUsers); // Set the formatted users data in state
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);
console.log(users)
  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
  ];

  return (
    <div>
      <h1>Users List</h1>
      {users && users.length > 0 ? (
        <MaterialReactTable
          columns={columns}
          data={users} // users fetched from the API
          enablePagination={true}
          enableSorting={true}
          enableRowSelection={false}
        />
      ) : (
        <h6>No users found</h6>
      )}
    </div>
  );
};

export default View;
