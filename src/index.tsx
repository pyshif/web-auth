import { createRoot } from 'react-dom/client';
import store from 'store';
import { Provider } from 'react-redux';
import App from './App';

const element = document.querySelector('#root') as HTMLDivElement;
if (element) {
    const root = createRoot(element);
    root.render(
        <Provider store={store}>
            <App />
        </Provider>
    );
}
