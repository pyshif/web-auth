import Board from '../Board';
import Logo from 'images/company-brand.png';
import Form from './Form';

type PropsForgot = {};

function Forgot(props: PropsForgot) {
    return (
        <>
            <Board img={Logo} title="Get your reset password link" />
            <Form />
        </>
    );
}

export default Forgot;
