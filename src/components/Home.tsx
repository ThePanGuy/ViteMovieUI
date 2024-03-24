import React from "react";
import Header from "./Header";
import Movies from "./Movies";

export default function Home() {

    return (
        <div className="App">
                <Header loggedIn={false}/>
            <div>
                <Movies/>
            </div>
        </div>
    );
}
