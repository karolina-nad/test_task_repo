import React, {useState} from "react";
import {Banner} from "./Banner";
import {Users} from "./Users/Users";
import { Form } from  "./Form";

const Main = () => {
    const [createdNewUser, setCreatedNewUser] = useState(false);

    return (
        <main>
            <Banner />
            <Users createdNewUser={createdNewUser} />
            <Form createdNewUser={createdNewUser} setCreatedNewUser={setCreatedNewUser} />
        </main>
    );
};

export { Main };
