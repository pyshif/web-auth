import styled from 'styled-components';
import Animation from './Animation';

const Section = styled.section``;

function Home() {
    return (
        <Section>
            <Animation />
            <div className="container mx-auto p-5">
                <h1
                    style={{
                        fontSize: '2rem',
                        textAlign: 'center',
                        letterSpacing: '0.15rem',
                    }}
                >
                    JWT Authentication
                </h1>
                <hr style={{ marginBottom: '1.5rem' }} />
                <h2 style={{ fontSize: '1.5rem' }}>How we do ?</h2>
                <ul className="list-disc pl-5">
                    <li>Access token is saved in memory.</li>
                    <li>
                        Refresh token is saved in http-only cookies. To avoid
                        other JS program taken.
                    </li>
                    <li>Access token expired every 15 mins.</li>
                    <li>Refresh token expired every 6 months.</li>
                    <li>
                        Remove access token and refresh token when sign out.
                    </li>
                </ul>
            </div>
        </Section>
    );
}

export default Home;
