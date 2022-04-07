import React, {useEffect, useState} from 'react';
import './App.css';

function App() {
    console.log("APP RENDERED")
    const [loggedOut, setLoggedOut] = useState(false);

    useEffect(() => {
        if (loggedOut) window.alert("EFFECT");
        localStorage.removeItem("item");
    }, [loggedOut])

    const setLocalStorage = () => {
        console.log("set item");
        localStorage.setItem("item", "item!");
    }
    
    const setOther = () => {
        console.log("set other");
        localStorage.setItem("other", "other");
    }

    const removeLocalStorage = () => {
        console.log("remove item");
        localStorage.removeItem("item");
    }
    
    const removeOther = () => {
        console.log("remove other");
        localStorage.removeItem("other");
    }

    window.addEventListener("storage", (e) => {
        if (e.key === "item" && !e.oldValue && e.newValue && !loggedOut) setLoggedOut(true);
    });

    return (
        <div className="App">
            <main>
                <div>
                <button onClick={setLocalStorage}>SetLocalStorage</button>
                <button onClick={removeLocalStorage}>RemoveLocalStorage</button>
                </div>
                <div>
                    <button onClick={setOther}>SetOther</button>
                    <button onClick={removeOther}>RemoveOther</button>
                </div>
            </main>
        </div>
    );
}

export default App;
