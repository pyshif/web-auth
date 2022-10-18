import styled from 'styled-components';
import Animation from './Animation';

const Section = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
`;

function Home() {
    return (
        <Section>
            <Animation />
        </Section>
    );
}

export default Home;
