import React from "react";

const Header = () => {
    return (
        <header className="app__header">
            <div className="app__header-block">
                <div>
                    <button className="app__header-button button">
                        <a href="#users">Users</a>
                    </button>
                    <button className="app__header-button button">
                        <a href="#form">Sign up</a>
                    </button>
                </div>
            </div>
        </header>
    );
};

export { Header };
