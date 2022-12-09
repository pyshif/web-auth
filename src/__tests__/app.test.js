import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.dev' });
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { cleanup, fireEvent, getByText, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { configure } from '@testing-library/dom';
configure({ asyncUtilTimeout: 2000 });

// module
import store, { useAppDispatch, useAppSelector } from 'store';
import { reset } from 'store/features/authSlice';
import { Provider } from 'react-redux';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';
import routes, { reverse } from 'utils/routes';
import api from 'api';
import mockJWTDecode from 'jwt-decode';
// mock
import 'mocks/browser/window';
import axios from 'axios';
jest.mock('styles/App.css', () => ({}));
jest.mock('hooks/useRequestToken', () => jest.fn());
jest.mock('jwt-decode', () => jest.fn());
// mock

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

async function waitForLoading() {
    await waitForElementToBeRemoved(screen.queryByText(/loading/i)).catch(err => '');
}

beforeAll(() => {
    console.log('process.env :>> ', process.env);
    cleanup();
    // sleep 3 secs
    return new Promise(resolve => setTimeout(resolve, 3000));
})

afterAll(() => {
    // FIXME: sometimes testing failed with unknown reason. guess environment not complete clear ?
    // jest.resetModules();
})

afterEach(cleanup);

describe('Router Testing', () => {
    it('should render home page', async () => {
        renderWithReduxAndRouter(<App />, routes.home);
        await waitForLoading();
        await waitFor(() => expect(screen.getByText(/^jwt authentication$/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/^colorful$/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/^what is this project \?$/i)).toBeInTheDocument());
    });

    it('should render sign-up page', async () => {
        renderWithReduxAndRouter(<App />, routes.auth.signup);
        await waitForLoading();
        await waitFor(() => expect(screen.getByText(/^sign up your account$/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/^colorful$/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/^what is this project \?$/i)).toBeInTheDocument());
    });

    it('should render sign-in page', async () => {
        renderWithReduxAndRouter(<App />, routes.auth.signin);
        await waitForLoading();
        await waitFor(() => expect(screen.getByText(/sign in to your account/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/^colorful$/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/^what is this project \?$/i)).toBeInTheDocument());
    });

    it('should render forgot password page', async () => {
        renderWithReduxAndRouter(<App />, routes.auth.forgot);
        await waitForLoading();
        await waitFor(() => expect(screen.getByText(/get your reset password link/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/^colorful$/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/^what is this project \?$/i)).toBeInTheDocument());
    });

    it('should render reset password page', async () => {
        renderWithReduxAndRouter(<App />, routes.auth.reset.self);
        await waitForLoading();
        await waitFor(() => expect(screen.getByText(/^reset your password in 30 mins$/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/^colorful$/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/^what is this project \?$/i)).toBeInTheDocument());
    });

    it('should render reset password by link page (same with reset page)', async () => {
        renderWithReduxAndRouter(<App />, reverse(routes.auth.reset.resetId, { resetId: 'token' }));
        await waitForLoading();
        await waitFor(() => expect(screen.getByText(/^reset your password in 30 mins$/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/^colorful$/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/^what is this project \?$/i)).toBeInTheDocument());
    });

    it('should render user profile page', async () => {
        renderWithReduxAndRouter(<App />, routes.user);
        await waitForLoading();
        await waitFor(() => expect(screen.getByText(/^update$/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/^colorful$/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/^what is this project \?$/i)).toBeInTheDocument());
    });

    it('should render navbar and link can work', async () => {
        // render
        const { user, findByText, findAllByText } = renderWithReduxAndRouter(<App />, routes.home);
        // make sure render complete
        await waitForLoading();
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
        await waitForLoading();
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
        await waitForLoading();
        await waitFor(() => expect(screen.getByText(/^sign up your account$/i)).toBeInTheDocument());
        // get input element
        const username = getByLabelText(/^username$/i);
        const email = getByLabelText(/^email$/i);
        const password = getByLabelText(/^password$/i);
        const confirmPassword = getByLabelText(/^confirm password$/i);
        const passwordHint = getByLabelText(/^password hint$/i);
        const register = getByRole('button', { name: /^register$/i });
        // empty warning test
        const mockWarning = jest.spyOn(console, 'warn');
        mockWarning.mockImplementation(() => ''); // prevent frequently warning by ant-design from component
        await user.click(register);
        await waitFor(() => expect(screen.getByText(/please input your name/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/please input your email/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/^please input your password!$/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/please input your password again/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/please input your password hint/i)).toBeInTheDocument());
        // 
    });

    it('should navigate back to sign in page', async () => {
        // render
        const { user, getByText } = renderWithReduxAndRouter(<App />, routes.auth.signup);
        await waitForLoading();
        // get link element
        const signInLink = getByText(/back to sign in/i);
        // event
        const mockScroll = jest.spyOn(document, 'querySelector');
        mockScroll.mockReturnValueOnce({ scroll: (x, y) => '' });
        await user.click(signInLink);
        await waitForLoading();
        await waitFor(() => expect(screen.getByText(/sign in to your account/i)).toBeInTheDocument());
    });

    it('should sign up success', async () => {
        // render
        const { user, getByLabelText, getByRole } = renderWithReduxAndRouter(<App />, routes.auth.signup);
        await waitForLoading();
        await waitFor(() => expect(screen.getByText(/^sign up your account$/i)).toBeInTheDocument());
        // mock
        const mockSignUp = jest.spyOn(api.v1.auth, 'signUp');
        mockSignUp.mockResolvedValueOnce({ status: 200, statusText: 'OK' });
        // get input element
        const username = getByLabelText(/^username$/i);
        const email = getByLabelText(/^email$/i);
        const password = getByLabelText(/^password$/i);
        const confirmPassword = getByLabelText(/^confirm password$/i);
        const passwordHint = getByLabelText(/^password hint$/i);
        const register = getByRole('button', { name: /^register$/i });
        // input
        await user.click(username);
        await user.keyboard(process.env.JEST_USER_NAME);
        expect(username).toHaveDisplayValue(process.env.JEST_USER_NAME);

        await user.click(email);
        await user.keyboard(process.env.JEST_USER_EMAIL);
        expect(email).toHaveDisplayValue(process.env.JEST_USER_EMAIL);

        await user.click(password);
        await user.keyboard(process.env.JEST_USER_PASSWORD);
        expect(password).toHaveDisplayValue(process.env.JEST_USER_PASSWORD);

        await user.click(confirmPassword);
        await user.keyboard(process.env.JEST_USER_PASSWORD);
        expect(confirmPassword).toHaveDisplayValue(process.env.JEST_USER_PASSWORD);

        await user.click(passwordHint);
        await user.keyboard(process.env.JEST_USER_PASSWORD_HINT);
        expect(passwordHint).toHaveDisplayValue(process.env.JEST_USER_PASSWORD_HINT);

        await user.click(register);

        await waitFor(() => expect(screen.getByText(/sign-up in progress/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/sign-up success/i)).toBeInTheDocument());
        expect(mockSignUp).toHaveBeenCalled();
    });
});

describe('Sign In Flow Testing', () => {
    it('should validate sign in infromation from user input', async () => {
        const { user, getByText, getByPlaceholderText, getByRole } = renderWithReduxAndRouter(<App />, routes.auth.signin);
        await waitForLoading();
        await waitFor(() => expect(getByText(/^sign in to your account$/i)).toBeInTheDocument());
        // get input element
        const login = getByRole('button', { name: 'Log in' });
        expect(login).toBeInTheDocument();
        // bad input
        await user.click(login);
        // expect warning message
        await waitFor(() => expect(screen.getByText(/^please input your email/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/^please input your password/i)).toBeInTheDocument());
    });

    it('should link to correct page', async () => {
        const { user, getByText, getByRole } = renderWithReduxAndRouter(<App />, routes.auth.signin);
        await waitForLoading();
        await waitFor(() => expect(getByText(/^sign in to your account$/i)).toBeInTheDocument());
        // mock
        const mockScroll = jest.spyOn(document, 'querySelector');
        // click forgot link
        mockScroll.mockReturnValueOnce({ scroll: (x, y) => '' });
        const forgotLink = getByRole('link', { name: /^forgot password \?/i });
        expect(forgotLink).toBeInTheDocument();
        await user.click(forgotLink);
        await waitForLoading();
        await waitFor(() => expect(screen.getByText(/^get your reset password link$/i)).toBeInTheDocument());
        // back
        window.history.back();
        await waitFor(() => expect(getByText(/^sign in to your account$/i)).toBeInTheDocument());
        // click sign up link
        mockScroll.mockReturnValueOnce({ scroll: (x, y) => '' });
        const signUpLink = getByRole('link', { name: /^sign up by here/i });
        expect(signUpLink).toBeInTheDocument();
        await user.click(signUpLink);
        await waitForLoading();
        await waitFor(() => expect(screen.getByText(/^sign up your account$/i)).toBeInTheDocument());
    });

    it('should sign in success', async () => {
        const { user, getByText, getByPlaceholderText, getByRole } = renderWithReduxAndRouter(<App />, routes.auth.signin);
        await waitForLoading();
        await waitFor(() => expect(getByText(/^sign in to your account$/i)).toBeInTheDocument());
        // input
        const email = getByPlaceholderText(/^email$/i);
        const password = getByPlaceholderText(/^password$/i);
        const login = getByRole('button', { name: /^log in$/i });
        expect(email).toBeInTheDocument();
        expect(password).toBeInTheDocument();
        expect(login).toBeInTheDocument();
        // user
        await user.click(email);
        await user.keyboard(process.env.JEST_USER_EMAIL);
        expect(email).toHaveDisplayValue(process.env.JEST_USER_EMAIL);

        await user.click(password);
        await user.keyboard(process.env.JEST_USER_PASSWORD);
        expect(password).toHaveDisplayValue(process.env.JEST_USER_PASSWORD);

        // mock sign in api
        const spySignIn = jest.spyOn(api.v1.auth, 'signIn');
        spySignIn.mockResolvedValueOnce({
            status: 200,
            statusText: 'OK',
            data: {
                accessToken: 'someToken'
            }
        });

        mockJWTDecode.mockReturnValueOnce({
            name: process.env.JEST_USER_NAME,
            birthday: process.env.JEST_USER_BIRTHDAY,
            phone: process.env.JEST_USER_PHONE,
            gender: process.env.JEST_USER_GENDER,
            avatar: '',
            email: process.env.JEST_USER_EMAIL
        });

        await user.click(login);
        // success message
        // await waitFor(() => expect(screen.getByText(/sign-in in progress/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/sign-in success/i)).toBeInTheDocument());
        // navigate to user profile page
        await waitForLoading();
        await waitFor(() => expect(screen.getByText(/^update$/i)).toBeInTheDocument());
    });
});

describe('Forgot Password Testing', () => {
    it('should be link to sign-in page', async () => {
        const { user } = renderWithReduxAndRouter(<App />, routes.auth.forgot);
        await waitForLoading();
        await waitFor(() => expect(screen.getByText(/^get your reset password link$/i)).toBeInTheDocument());
        // get link element
        const signInLink = screen.getByText(/^back to sign in/i);
        expect(signInLink).toBeInTheDocument();
        // click
        const spyScroll = jest.spyOn(document, 'querySelector');
        spyScroll.mockReturnValueOnce({ scroll: (x, y) => '' });
        await user.click(signInLink);
        await waitForLoading();
        await waitFor(() => expect(screen.getByText(/^sign in to your account$/i)).toBeInTheDocument());
    });

    it('should be success get reset password link', async () => {
        const { user } = renderWithReduxAndRouter(<App />, routes.auth.forgot);
        await waitForLoading();
        await waitFor(() => expect(screen.getByText(/^get your reset password link$/i)).toBeInTheDocument());
        // get form element
        const email = screen.getByLabelText(/^email$/i);
        const passwordHint = screen.getByLabelText(/^password hint$/i);
        const submit = screen.getByRole('button', { name: /^submit$/i });
        // event
        await user.click(email);
        await user.keyboard(process.env.JEST_USER_EMAIL);
        expect(email).toHaveDisplayValue(process.env.JEST_USER_EMAIL);

        await user.click(passwordHint);
        await user.keyboard(process.env.JEST_USER_PASSWORD_HINT);
        expect(passwordHint).toHaveDisplayValue(process.env.JEST_USER_PASSWORD_HINT);
        // submit
        const spyForgotAPI = jest.spyOn(api.v1.auth, 'forgotPassword');
        spyForgotAPI.mockResolvedValueOnce({ status: 200, statusText: 'OK' });
        await user.click(submit);
        // assertion
        // await waitFor(() => expect(screen.getByText(/forgot password in progress/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/reset-password link has been sent/i)).toBeInTheDocument());
        expect(spyForgotAPI).toHaveBeenCalledTimes(1);
    });
});

describe('Reset Password Testing', () => {
    it('should be link to sign-in page', async () => {
        const { user } = renderWithReduxAndRouter(<App />, routes.auth.reset.self);
        await waitForLoading();
        await waitFor(() => expect(screen.getByText(/^reset your password in 30 mins$/i)).toBeInTheDocument());
        // get link element
        const signInLink = screen.getByText(/^back to sign in/i);
        // event
        const spyScroll = jest.spyOn(document, 'querySelector');
        spyScroll.mockReturnValueOnce({ scroll: (x, y) => '' });
        await user.click(signInLink);
        await waitForLoading();
        await waitFor(() => expect(screen.getByText(/^sign in to your account$/i)).toBeInTheDocument());
    });

    it('should be success reset password', async () => {
        const { user } = renderWithReduxAndRouter(<App />, routes.auth.reset.self);
        await waitForLoading();
        await waitFor(() => expect(screen.getByText(/^reset your password in 30 mins$/i)).toBeInTheDocument());
        // get form element
        const newPassword = screen.getByLabelText(/^new password$/i);
        const confirmPassword = screen.getByLabelText(/^confirm password$/i);
        const submit = screen.getByRole('button', { name: /^submit$/i });
        // event
        const spyResetAPI = jest.spyOn(api.v1.auth, 'ResetPassword');
        spyResetAPI.mockResolvedValueOnce({
            status: 200,
            statusText: 'OK'
        });

        await user.click(newPassword);
        await user.keyboard(process.env.JEST_USER_NEW_PASSWORD);
        expect(newPassword).toHaveDisplayValue(process.env.JEST_USER_NEW_PASSWORD);

        await user.click(confirmPassword);
        await user.keyboard(process.env.JEST_USER_NEW_PASSWORD);
        expect(confirmPassword).toHaveDisplayValue(process.env.JEST_USER_NEW_PASSWORD);

        await user.click(submit);
        // await waitFor(() => expect(screen.getByText(/reset password in progress/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/reset password success/i)).toBeInTheDocument());
        expect(spyResetAPI).toHaveBeenCalledTimes(1);
    });
});

describe('User Profile Updating Testing', () => {
    it('should be success update user profile', async () => {
        const { user } = renderWithReduxAndRouter(<App />, routes.user);
        await waitForLoading();
        await waitFor(() => expect(screen.getByText(/^update$/i)).toBeInTheDocument());

        // get form element
        const username = screen.getByLabelText(/^username$/i);
        const birthday = screen.getByLabelText(/^birthday$/i);
        const gender = screen.getByLabelText(/^gender$/i);
        const phone = screen.getByLabelText(/^phone$/i);
        const email = screen.getByLabelText(/^email$/i);
        const update = screen.getByRole('button', { name: /^update$/i });
        console.log('username.value :>> ', username.value);
        console.log('birthday.value :>> ', birthday.value);
        console.log('gender.value :>> ', gender.value);
        console.log('phone.value :>> ', phone.value);
        console.log('email.value :>> ', email.value);
        // event
        await user.clear(username);
        await user.click(username);
        await user.keyboard(process.env.JEST_USER_NEW_NAME);
        expect(username).toHaveDisplayValue(process.env.JEST_USER_NEW_NAME);

        await user.clear(birthday);
        fireEvent.change(birthday, { target: { value: process.env.JEST_USER_NEW_BIRTHDAY } });
        expect(birthday).toHaveDisplayValue(process.env.JEST_USER_NEW_BIRTHDAY);

        await user.clear(gender);
        await user.click(gender);
        await user.keyboard(process.env.JEST_USER_NEW_GENDER);
        expect(gender).toHaveDisplayValue(process.env.JEST_USER_NEW_GENDER);

        await user.clear(phone);
        await user.click(phone);
        await user.keyboard(process.env.JEST_USER_NEW_PHONE);
        expect(phone).toHaveDisplayValue(process.env.JEST_USER_NEW_PHONE);

        await user.clear(email);
        await user.click(email);
        await user.keyboard(process.env.JEST_USER_NEW_EMAIL);
        expect(email).toHaveDisplayValue(process.env.JEST_USER_NEW_EMAIL);

        // mock
        const spyUpdateUserName = jest.spyOn(api.v1.auth, 'updateUserName');
        const spyUpdateUserBirthday = jest.spyOn(api.v1.auth, 'updateUserBirthday');
        const spyUpdateUserPhone = jest.spyOn(api.v1.auth, 'updateUserPhone');
        const spyUpdateUserGender = jest.spyOn(api.v1.auth, 'updateUserGender');
        const spyUpdateUserEmail = jest.spyOn(api.v1.auth, 'updateUserEmail');
        spyUpdateUserName.mockResolvedValue({ status: 200, statusText: 'OK' });
        spyUpdateUserBirthday.mockResolvedValue({ status: 200, statusText: 'OK' });
        spyUpdateUserPhone.mockResolvedValue({ status: 200, statusText: 'OK' });
        spyUpdateUserGender.mockResolvedValue({ status: 200, statusText: 'OK' });
        spyUpdateUserEmail.mockResolvedValue({ status: 200, statusText: 'OK' });

        await user.click(update);
        expect(spyUpdateUserName).toHaveBeenCalledTimes(1);
        expect(spyUpdateUserBirthday).toHaveBeenCalledTimes(1);
        expect(spyUpdateUserPhone).toHaveBeenCalledTimes(1);
        expect(spyUpdateUserGender).toHaveBeenCalledTimes(1);
        expect(spyUpdateUserEmail).toHaveBeenCalledTimes(1);
        await waitFor(() => expect(screen.getByText(/update user name success/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/update birthday success/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/update phone number success/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/update gender success/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/update email address success/i)).toBeInTheDocument());
        // console.log('spyUpdateUserName.mock.calls.length :>> ', spyUpdateUserName.mock.calls.length);
        // console.log('spyUpdateUserBirthday.mock.calls.length :>> ', spyUpdateUserBirthday.mock.calls.length);
        // console.log('spyUpdateUserPhone.mock.calls.length :>> ', spyUpdateUserPhone.mock.calls.length);
        // console.log('spyUpdateUserGender.mock.calls.length :>> ', spyUpdateUserGender.mock.calls.length);
        // console.log('spyUpdateUserEmail.mock.calls.length :>> ', spyUpdateUserEmail.mock.calls.length);
    });
});