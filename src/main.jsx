import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css';
import App from './components/App/App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
