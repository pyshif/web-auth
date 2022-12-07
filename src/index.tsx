import { createRoot } from 'react-dom/client';
import store from 'store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const element = document.querySelector('#root') as HTMLDivElement;
if (element) {
    const root = createRoot(element);
    root.render(
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    );
}
