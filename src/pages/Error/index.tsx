import styled from 'styled-components';
import Icon from 'components/Icon';
import { font } from 'utils/font';

const Layout = styled.div`
    position: fixed;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-wrap: wrap;
    text-align: center;
`;

const H1 = styled.h1`
    font-size: 15vmin;
    ${font.arial}
    color: rgb(51, 65, 85);
    width: 100%;
    padding-left: 1rem;
    margin-bottom: 0;
`;

const H2 = styled.h2`
    font-size: 5vmin;
    ${font.arial}
    color: rgba(51, 65, 85, 0.9);
    width: 100%;
`;

const H3 = styled.h3`
    font-size: 2.25vmin;
    ${font.arial}
    color: rgba(51, 65, 85, 0.9);
    width: 100%;
`;

function Error() {
    return (
        <Layout>
            <H1>
                <Icon icon="bug" style={{ marginRight: '2vmin' }} />
                404
            </H1>
            <H2>Page Not Found</H2>
            <H3>The resource requested could not be found on this server</H3>
        </Layout>
    );
}

export default Error;
