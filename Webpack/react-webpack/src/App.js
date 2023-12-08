import React from 'react';
import { useEffect, useState } from "react";
import ComponentOne from "./ComponentOne";

const App = () => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        window.setInterval(() => {
            setCount(c => ++c);
        }, 1000);
    }, [])
    return <>
        Hello World {count} times!!!!!
        <ComponentOne />
    </>;
}

export default App;