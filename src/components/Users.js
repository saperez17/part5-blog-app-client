import React, { useState, useEffect } from "react";
import userService from "services/user";
import { Table } from "react-bootstrap";
import { Link } from 'react-router-dom';

const UserItem = ({ user }) => {
  return (
    <tr>
      <td> <Link to={`/users/${user.id}`}>{user.name}</Link> </td>
      <td> {user.notes.length} </td>
    </tr>
  );
};

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    try {
      userService.getAll().then((res) => {
        setUsers(res.data);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.length &&
            users.map((user, idx) => (
            <UserItem key={idx} user={user}/>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
