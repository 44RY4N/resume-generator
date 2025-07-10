import { createRoot } from 'react-dom/client';
import './style.css';
import { StrictMode } from 'react';
import {App} from "./App.jsx";
import React from 'react';


const root = createRoot(document.getElementById('app'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);


