import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import DataProvider from "./store/DataProvider";

import './assets/fonts/Noto_Sans/NotoSans-Regular.ttf';
import'./assets/fonts/Noto_Sans/NotoSans-Bold.ttf';

import './index.scss';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <DataProvider>
        <App />
    </DataProvider>
);

