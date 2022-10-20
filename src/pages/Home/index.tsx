import Animation from './Animation';

function Home() {
    return (
        <section>
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
                <div style={{ width: '100%', maxWidth: 660, margin: '0 auto' }}>
                    <h2 style={{ fontSize: '1.5rem' }}>How we do ?</h2>
                    <ul className="list-disc pl-5">
                        <li>
                            We store the access token in memory to increase
                            security.
                        </li>
                        <li>
                            We store the refresh token in http-only cookies to
                            avoid another program access.
                        </li>
                        <li>The access token expires every 15-minute.</li>
                        <li>The refresh token expires every 6-month.</li>
                        <li>
                            The system clears the tokens after the user signs
                            out.
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default Home;
