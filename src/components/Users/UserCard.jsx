import React from "react";
import {Tooltip} from "@mui/material";
import PropTypes from "prop-types";

const UserCard = ({ user }) => {
    return (
        <div className="user">
            <img src={user.photo} alt="User icon" className="user__icon"/>
            <Tooltip title={user.name} placement="top">
                <p className="user__info-text">{user.name}</p>
            </Tooltip>
            <div className="user__info">
                <p className="user__info-text">{user.position}</p>
                <Tooltip title={user.email} placement="top">
                    <p className="user__info-text">{user.email}</p>
                </Tooltip>
                <p className="user__info-text">{user.phone}</p>
            </div>
        </div>
    );
};

UserCard.propTypes = {
    user: PropTypes.object.isRequired,
}

export { UserCard };
