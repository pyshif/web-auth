import Form from './Form';
import Board from '../Board';
import Logo from 'images/company-brand.png';

type PropsSignUp = {};

// nick name
// email
// password
// password hint

// profile
// gender
// birthday

function SignUp(props: PropsSignUp) {
    return (
        <>
            <Board img={Logo} title="Sign up your account" />
            <Form />
        </>
    );
}

export default SignUp;
