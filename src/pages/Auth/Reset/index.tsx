import { useMatch, useLocation } from 'react-router-dom';
import routes from 'utils/routes';
import Board from '../Board';
import Logo from 'images/company-brand.png';
import Form from './Form';

type PropsReset = {};

function Reset(props: PropsReset) {
    const location = useLocation();
    const match = useMatch(routes.auth.reset.resetId);
    const params = match?.params;

    console.log('location :>> ', location);
    console.log('match :>> ', match);
    console.log('match?.params?.resetId :>> ', match?.params?.resetId);

    return (
        <>
            <Board img={Logo} title="Reset your password in 30 mins" />
            <Form />
        </>
    );
}

export default Reset;
