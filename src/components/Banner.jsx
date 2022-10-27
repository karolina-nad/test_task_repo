import React from "react";

const Banner = () => {
    return (
        <div className="app__main-banner">
            <div className="app__main-banner-text">
                <h1 className="app__main-banner-header">Test assignment for front-end developer</h1>
                <p className="app__main-banner-paragraph">What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
                <button className="app__main-banner-button button">
                    <a href="#form">Sign up</a>
                </button>
            </div>
        </div>
    );
};

export { Banner };
