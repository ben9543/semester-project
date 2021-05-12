import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

const REQUEST_URL = "http://localhost:4001";
const Home = () => {
    const [ authState, setAuthState ] = useState("signup");
    const [ username, setUsername ] = useState("");
    const [ user, setUser ] = useState(null);
    const [ errorMsg, setErrorMsg ] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        let url = REQUEST_URL + "/user/new";
        if(authState === 'login')
            url = REQUEST_URL + "/user/login";

        try{
            const { data:{ error, user } } = await axios.post(url, { username });
            if(user)
                console.log("ID:", user._id);
            if(error)
                setErrorMsg(error.message);
            setUsername("");
            setUser(user);
        } catch(err){
            console.log(err)
        }
    }

    if(user){
        return <Redirect to={`/chat?id=${user._id}&username=${user.username}`}/>
    }

    return(
            <div className="h-screen w-full flex items-center justify-center ">
                <form className="flex items-center justify-center flex flex-col h-1/2 w-1/3 p-6 rounded shadow-2xl bg-gray-200" onSubmit={e => handleSubmit(e)}>
                    <span id="text-box" className="h-2/3">
                        <p className="text-center w-full text-2xl">{authState === 'login'? "Login": "Sign Up"}</p>
                        <p className="text-red-600">{ errorMsg }</p>
                    </span>
                    <div className="h-full flex flex-col items-center justify-between">
                        <input id="username" className="w-full h-12 p-2 rounded" onChange={e => setUsername(e.target.value)} placeholder="Type Username" value={username}></input>
                        <button className="border border-gray-900 rounded w-full h-12 p-2" type="submit">Submit</button>
                        <div className="w-1/2 flex items-center justify-between">
                            <a className="cursor-pointer text-center text-xs text-gray-900" onClick={() => {
                                setAuthState('signup');
                                setErrorMsg("");
                            }}>Sign Up</a>
                            |
                            <a className="cursor-pointer text-center text-xs text-gray-900" onClick={() => {
                                setAuthState('login');
                                setErrorMsg("");
                            }}>Login</a>
                        </div>
                    </div>
                </form>

            </div>
        );
}

export default Home;