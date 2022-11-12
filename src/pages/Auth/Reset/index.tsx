import { useMatch } from 'react-router-dom';
import routes from 'utils/routes';
import Board from '../Board';
import Logo from 'images/company-brand.png';
import Form from './Form';

type PropsReset = {};

// has access token or match-params

function Reset(props: PropsReset) {
    const match = useMatch(routes.auth.reset.resetId);
    // console.log('match :>> ', match);
    let resetId = '';
    // console.log('match?.params?.resetId :>> ', match?.params?.resetId);
    if (match?.params?.resetId) {
        resetId = match.params.resetId;
        // console.log('resetId :>> ', resetId);
    }

    return (
        <>
            <Board img={Logo} title="Reset your password in 30 mins" />
            <Form resetId={resetId} />
        </>
    );
}

export default Reset;
