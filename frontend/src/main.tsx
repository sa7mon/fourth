import React from 'react'
import {createRoot} from 'react-dom/client'
import './style.scss'
import {Route, Routes, BrowserRouter as Router} from "react-router-dom";
import RequestsView from "./views/RequestsView";
import EditorView from "./views/EditorView";
import Layout from "./Layout";

const container = document.getElementById('root')

const root = createRoot(container!)

root.render(
    <Router>
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<RequestsView/>}/>
                <Route path="/editor" element={<EditorView/>}/>
            </Route>
        </Routes>
    </Router>
)
