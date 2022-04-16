import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

const rootElement = createRoot(document.getElementById('root'));
rootElement.render(<App />);

reportWebVitals();
