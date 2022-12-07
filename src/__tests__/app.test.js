import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { cleanup, fireEvent, getByText, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { configure } from '@testing-library/dom';
configure({ asyncUtilTimeout: 2000 });
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
        await waitFor(() => expect(screen.getByText(/^jwt authentication$/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/^colorful$/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/^what is this project \?$/i)).toBeInTheDocument());
    });

    it('should render sign-up page', async () => {
        renderWithReduxAndRouter(<App />, routes.auth.signup);
        await waitFor(() => expect(screen.getByText(/^sign up your account$/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/^colorful$/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/^what is this project \?$/i)).toBeInTheDocument());
    });

    it('should render sign-in page', async () => {
        renderWithReduxAndRouter(<App />, routes.auth.signin);
        await waitFor(() => expect(screen.getByText(/sign in to your account/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/^colorful$/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/^what is this project \?$/i)).toBeInTheDocument());
    });

    it('should render forgot password page', async () => {
        renderWithReduxAndRouter(<App />, routes.auth.forgot);
        await waitFor(() => expect(screen.getByText(/get your reset password link/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/^colorful$/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/^what is this project \?$/i)).toBeInTheDocument());
    });

    it('should render reset password page', async () => {
        renderWithReduxAndRouter(<App />, routes.auth.reset.self);
        await waitFor(() => expect(screen.getByText(/^reset your password in 30 mins$/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/^colorful$/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/^what is this project \?$/i)).toBeInTheDocument());
    });

    it('should render reset password by link page (same with reset page)', async () => {
        renderWithReduxAndRouter(<App />, reverse(routes.auth.reset.resetId, { resetId: 'token' }));
        await waitFor(() => expect(screen.getByText(/^reset your password in 30 mins$/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/^colorful$/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/^what is this project \?$/i)).toBeInTheDocument());
    });

    it('should render user profile page', async () => {
        renderWithReduxAndRouter(<App />, routes.user);
        await waitFor(() => expect(screen.getByText(/^update$/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/^colorful$/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/^what is this project \?$/i)).toBeInTheDocument());
    });

    it('should render navbar and link can work', async () => {
        // render
        const { user, findByText, findAllByText } = renderWithReduxAndRouter(<App />, routes.home);
        // make sure render complete
        await waitFor(() => expect(screen.getByText(/^jwt authentication$/i)).toBeInTheDocument());
        // get links
        const brandLink = await findByText(/^colorful$/);
        const homeLinks = await findAllByText(/^home$/i);
        const authLinks = await findAllByText(/^auth$/i);
        // link to sign-in page, and make sure render success
        const mockScroll = jest.spyOn(document, 'querySelector');
        mockScroll.mockReturnValueOnce({ scroll: jest.fn((x, y) => '') });
        await user.click(authLinks[0]);
        await waitFor(() => expect(screen.getByText(/^sign in to your account$/i)).toBeInTheDocument());
        // link back to home page, and make sure render success
        mockScroll.mockReturnValueOnce({ scroll: jest.fn((x, y) => '') });
        await user.click(homeLinks[0]);
        await waitFor(() => expect(screen.getByText(/^jwt authentication$/i)).toBeInTheDocument());

        mockScroll.mockReturnValueOnce({ scroll: jest.fn((x, y) => '') });
        await user.click(brandLink);
        await waitFor(() => expect(screen.getByText(/^jwt authentication$/i)).toBeInTheDocument());
    });

    it('should render footer and webmap can work', async () => {
        // render
        const { user, findByText, findAllByText } = renderWithReduxAndRouter(<App />, routes.home);
        await waitFor(() => expect(screen.getByText(/^jwt authentication$/i)).toBeInTheDocument());
        // get links from footer
        const homeLink = await findByText(/^introduction$/i);
        const userLink = await findByText(/^user profile$/i);
        const signInLink = await findByText(/^sign in$/i);
        const signUpLink = await findByText(/^sign up$/i);
        const forgotLink = await findByText(/^forgot password$/i);
        const resetLink = await findByText(/^reset password$/i);
        // console.log('homeLink :>> ', homeLink);
        // console.log('userLink :>> ', userLink);
        // console.log('signInLink :>> ', signInLink);
        // console.log('signUpLink :>> ', signUpLink);
        // console.log('forgotLink :>> ', forgotLink);
        // console.log('resetLink :>> ', resetLink);
        // navigate to user profile page
        const mockScroll = jest.spyOn(document, 'querySelector');
        mockScroll.mockReturnValueOnce({ scroll: jest.fn((x, y) => '') })
        await user.click(userLink);
        await waitFor(() => expect(screen.getByText(/^update$/i)).toBeInTheDocument());
        // console.log('window.location.href :>> ', window.location.href);
        // navigate to sign-in page
        mockScroll.mockReturnValueOnce({ scroll: jest.fn((x, y) => '') })
        await user.click(signInLink);
        await waitFor(() => expect(screen.getByText(/^sign in to your account$/i)).toBeInTheDocument());
        // console.log('window.location.href :>> ', window.location.href);
        // navigate to sign-up page
        mockScroll.mockReturnValueOnce({ scroll: jest.fn((x, y) => '') })
        await user.click(signUpLink);
        await waitFor(() => expect(screen.getByText(/^sign up your account$/i)).toBeInTheDocument());
        // console.log('window.location.href :>> ', window.location.href);
        // navigate to forgot page
        mockScroll.mockReturnValueOnce({ scroll: jest.fn((x, y) => '') })
        await user.click(forgotLink);
        await waitFor(() => expect(screen.getByText(/^get your reset password link$/i)).toBeInTheDocument());
        // console.log('window.location.href :>> ', window.location.href);
        // navigate to reset page
        mockScroll.mockReturnValueOnce({ scroll: jest.fn((x, y) => '') })
        await user.click(resetLink);
        await waitFor(() => expect(screen.getByText(/^reset your password in 30 mins$/i)).toBeInTheDocument());
        // console.log('window.location.href :>> ', window.location.href);
        // navigate to home
        mockScroll.mockReturnValueOnce({ scroll: jest.fn((x, y) => '') });
        await user.click(homeLink);
        await waitFor(() => expect(screen.getByText(/^jwt authentication$/i)).toBeInTheDocument());
        // console.log('window.location.href :>> ', window.location.href);
        // console.log('mockScroll.mock.calls.length :>> ', mockScroll.mock.calls.length);
    });
});

describe('Sign Up Flow Testing', () => {
    it('should correctly validate input data from user', async () => {
        // render
        const { user, getByLabelText, getByRole } = renderWithReduxAndRouter(<App />, routes.auth.signup);
        await waitFor(() => expect(screen.getByText(/^sign up your account$/i)).toBeInTheDocument());
        // get input element
        const username = getByLabelText(/^username$/i);
        const email = getByLabelText(/^email$/i);
        const password = getByLabelText(/^password$/i);
        const confirmPassword = getByLabelText(/^confirm password$/i);
        const passwordHint = getByLabelText(/^password hint$/i);
        const register = getByRole('button', { name: /^register$/i });
        // empty warning test
        await user.click(register);
        await waitFor(() => expect(screen.getByText(/please input your name/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/please input your email/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/^please input your password!$/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/please input your password again/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/please input your password hint/i)).toBeInTheDocument());

    });

    it('should navigate back to sign in page', async () => {

    });

    it('should sign up success', async () => { })
});

describe('Sign In Flow Testing', () => { });

describe('Forgot Password Testing', () => { });

describe('Reset Password Testing', () => { });

describe('User Profile Updating Testing', () => { });