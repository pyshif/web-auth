import Form from './Form';
import Board from '../Board';
import Logo from 'images/company-brand.png';

function SignIn() {
    return (
        <>
            <Board img={Logo} title="Sign in to your account" />
            <Form />
        </>
    );
}

export default SignIn;
