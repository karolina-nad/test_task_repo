import React, { useEffect, useState } from "react";
import UsersAPI from "../../api/UsersAPI";
import {UserCard} from "./UserCard";
import PropTypes from "prop-types";

const Users = ({ createdNewUser }) => {
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [count,setCount] = useState(6);

    useEffect(() => {
        if (createdNewUser) {
            setCount(6);
        }

        UsersAPI.getUsers(count).then(({ data }) => {
            setUsers(data.users);
            setTotalUsers(data.total_users);
        })
            .catch((error) => console.log(error))
    }, [count, createdNewUser]);

    const handleClickShowMore = () => {
        const newCount = count + 6;

        setCount(newCount);
    };

    return (
        <div className="app__users" id="users">
            <div className="app__users-block">
                <h1 className="app__users-title">Working with GET request</h1>
                <div className="app__users-list">
                    {users && users.map((user) =>(
                        <UserCard user={user} />
                    ))}
                </div>
                <button className="app__users-button button" onClick={handleClickShowMore} disabled={count >= totalUsers}>Show more</button>
            </div>
        </div>
    );
};

Users.propTypes = {
    createdNewUser: PropTypes.bool.isRequired,
}

export { Users };
