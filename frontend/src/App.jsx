import {Routes, Route, Link} from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import Navbar from "./components/Home/Navbar"
import TopicsPage from "./pages/TopicsPage";
import NotePage from "./pages/NotePage";
import About from "./components/Home/About";


function App() {
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme); 
    }

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <>
            <Navbar  toggleTheme={toggleTheme} currentTheme={theme}/>

             <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/topics" element={<TopicsPage />} />
                <Route path="/notes/:topicId" element={<NotePage />} /> 
                <Route path="/about" element={<About />}/>
            </Routes>
        </>
    )
}

export default App;