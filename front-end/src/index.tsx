import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Convertor } from './views/Convertor/Convertor';
import { ConversionService } from './services/conversion.service';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Convertor conversionService={new ConversionService()} />
  </React.StrictMode>,
);
