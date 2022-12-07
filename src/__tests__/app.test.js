import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { cleanup, fireEvent, getByText, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
// module
import store from 'store';
import { Provider } from 'react-redux';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';
import routes, { reverse } from 'utils/routes';
// mock
import 'mocks/browser/window';
jest.mock('styles/App.css', () => ({}));
jest.mock('hooks/useRequestToken', () => jest.fn());


function renderWithReduxAndRouter(component, route) {
    window.history.pushState({}, '', route);
    const user = userEvent.setup();
    const Wrapper = ({ children }) => <Provider store={store}>
        <BrowserRouter>
            {children}
        </BrowserRouter>
    </Provider>;

    return {
        ...render(component, { wrapper: Wrapper }),
        store,
        user
    }
}

afterAll(() => {
    // FIXME: sometimes testing failed with unknown reason. guess environment not complete clear ?
    jest.resetModules();
})

afterEach(cleanup);

describe('Router Testing', () => {
    it('should render home page', async () => {
        renderWithReduxAndRouter(<App />, routes.home);
        const titleEl = await waitFor(() => screen.getByText(/^jwt authentication$/i));
        expect(titleEl).toBeInTheDocument();

        const navEl = await screen.findByText(/^colorful$/);
        expect(navEl).toBeInTheDocument();

        const footEl = await screen.findByText(/what is this project/i);
        expect(footEl).toBeInTheDocument();
    });

    it('should render sign-up page', async () => {
        renderWithReduxAndRouter(<App />, routes.auth.signup);
        const titleEl = await waitFor(() => screen.getByText(/sign up your account/i));
        expect(titleEl).toBeInTheDocument();

        const navEl = await screen.findByText(/^colorful$/);
        expect(navEl).toBeInTheDocument();

        const footEl = await screen.findByText(/what is this project/i);
        expect(footEl).toBeInTheDocument();
    });

    it('should render sign-in page', async () => {
        renderWithReduxAndRouter(<App />, routes.auth.signin);
        const titleEl = await waitFor(() => screen.getByText(/sign in to your account/i));
        expect(titleEl).toBeInTheDocument();

        const navEl = await screen.findByText(/^colorful$/);
        expect(navEl).toBeInTheDocument();

        const footEl = await screen.findByText(/what is this project/i);
        expect(footEl).toBeInTheDocument();
    });

    it('should render forgot password page', async () => {
        renderWithReduxAndRouter(<App />, routes.auth.forgot);
        const titleEl = await waitFor(() => screen.getByText(/get your reset password link/i));
        expect(titleEl).toBeInTheDocument();

        const navEl = await screen.findByText(/^colorful$/);
        expect(navEl).toBeInTheDocument();

        const footEl = await screen.findByText(/what is this project/i);
        expect(footEl).toBeInTheDocument();
    });

    it('should render reset password page', async () => {
        renderWithReduxAndRouter(<App />, routes.auth.reset.self);
        const titleEl = await waitFor(() => screen.getByText(/reset your password in 30 mins/i));
        expect(titleEl).toBeInTheDocument();

        const navEl = await screen.findByText(/^colorful$/);
        expect(navEl).toBeInTheDocument();

        const footEl = await screen.findByText(/what is this project/i);
        expect(footEl).toBeInTheDocument();
    });

    it('should render reset password by link page (same with reset page)', async () => {
        renderWithReduxAndRouter(<App />, reverse(routes.auth.reset.resetId, { resetId: 'token' }));
        const titleEl = await waitFor(() => screen.getByText(/reset your password in 30 mins/i));
        expect(titleEl).toBeInTheDocument();

        const navEl = await screen.findByText(/^colorful$/);
        expect(navEl).toBeInTheDocument();

        const footEl = await screen.findByText(/what is this project/i);
        expect(footEl).toBeInTheDocument();
    });

    it('should render user profile page', async () => {
        renderWithReduxAndRouter(<App />, routes.user);
        const titleEl = await waitFor(() => screen.getByText(/update/i));
        expect(titleEl).toBeInTheDocument();

        const navEl = await screen.findByText(/^colorful$/);
        expect(navEl).toBeInTheDocument();

        const footEl = await screen.findByText(/what is this project/i);
        expect(footEl).toBeInTheDocument();
    });

    it('should render navbar and link can work', async () => {
        // render
        const { user, findByText, findAllByText } = renderWithReduxAndRouter(<App />, routes.home);
        // mock scroll to top
        // const spyInsertBefore = jest.spyOn(container, 'insertBefore').mockImplementation(jest.fn());
        // make sure render complete
        await waitFor(() => expect(screen.getByText(/^jwt authentication$/i)).toBeInTheDocument());
        // get navbar element
        const brandLink = await findByText(/^colorful$/);
        const homeLinks = await findAllByText(/^home$/i);
        const authLinks = await findAllByText(/^auth$/i);
        // link to sign-in page, and make sure render success
        jest.spyOn(document, 'querySelector').mockReturnValueOnce({ scroll: jest.fn((x, y) => '') });
        await user.click(authLinks[0]);
        await waitFor(() => expect(screen.getByText(/^sign in to your account$/i)).toBeInTheDocument());
        // link back to home page, and make sure render success
        jest.spyOn(document, 'querySelector').mockReturnValueOnce({ scroll: jest.fn((x, y) => '') });
        await user.click(homeLinks[0]);
        await waitFor(() => expect(screen.getByText(/^jwt authentication$/i)).toBeInTheDocument());

        jest.spyOn(document, 'querySelector').mockReturnValueOnce({ scroll: jest.fn((x, y) => '') });
        await user.click(brandLink);
        await waitFor(() => expect(screen.getByText(/^jwt authentication$/i)).toBeInTheDocument());
    });
});
