/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import userService from "services/user";

const UserDetail = () => {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  // console.log('history', history.location.);
  useEffect(() => {
    userService.getById(id).then((res) => {
      setUserInfo(res.data);
    });
  }, []);
  return (
    <div>
      {userInfo && (
        <div>
          <h2>{userInfo.name}</h2>
          <p>added blogs</p>
          <ul>
            {userInfo.notes.map((blog, idx) => (
              <li key={idx}>
                  {blog.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
