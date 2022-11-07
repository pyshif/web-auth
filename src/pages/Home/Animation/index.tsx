import styled from 'styled-components';
import { gsap } from 'gsap';
import { useRef, useEffect } from 'react';
// icon status
import { CheckCircle } from '@styled-icons/bootstrap/CheckCircle';
import { Time } from '@styled-icons/boxicons-regular/Time';
// icon characters
import { Browser } from '@styled-icons/entypo/Browser';
import { Server } from '@styled-icons/heroicons-outline/Server';
import { Database } from '@styled-icons/octicons/Database';
// icon object
import { FiletypeJson } from '@styled-icons/bootstrap/FiletypeJson';
import { Jsonwebtokens } from '@styled-icons/simple-icons/Jsonwebtokens';
import { UserCheck } from '@styled-icons/boxicons-regular/UserCheck';
import { ArrowRight } from '@styled-icons/bootstrap/ArrowRight';
import { ArrowBack } from '@styled-icons/boxicons-regular/ArrowBack';
import { EmailOutline } from '@styled-icons/evaicons-outline/EmailOutline';
import { MailInbox } from '@styled-icons/fluentui-system-filled/MailInbox';

const Section = styled.section`
    width: 100%;
    max-width: 900px;
    padding: 1.25rem;
    text-align: center;
`;

const Text = styled.p`
    margin: 0 auto;
`;

const Bar = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

const Items = styled.div`
    width: 33.33%;
    height: 100%;
`;

// const Item = styled((props) => <div {...props}>{props.children}</div>)`
// `;

const Item = styled.div`
    width: 100%;
    position: relative;
    & > * {
        width: ${(props: { iconSize: string }) =>
            props.iconSize ? props.iconSize : '3.5rem'};
        color: rgb(31, 45, 65);
    }
`;

const Package = styled(Item)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    /*  */
    opacity: 0;
    filter: invert(20%);
    z-index: 990;
`;

type PropsAnimation = {};

function Animation(props: PropsAnimation) {
    const AntRef = useRef<any>();

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

            tl.to('.client-request', { duration: 0.75, opacity: 1 })
                .to('.client-request', { duration: 2, x: '100%' })
                .to('.client-request', { duration: 0.75, opacity: 0 })
                .to('.server-request', { duration: 0.75, opacity: 1 })
                .to('.server-request', { duration: 2, x: '100%' })
                .to('.server-request', { duration: 0.75, opacity: 0 })
                .to('.database-check', { duration: 0.75, opacity: 1 })
                .to('.database-response', { duration: 0.75, opacity: 1 })
                .to('.database-response', { duration: 2, x: '-100%' })
                .to('.database-response', { duration: 0.75, opacity: 0 })
                .to('.server-check', { duration: 0.75, opacity: 1 })
                .to('.server-response', { duration: 0.75, opacity: 1 })
                .to('.server-response', { duration: 2, x: '-100%' })
                .to('.server-response', { duration: 0.75, opacity: 0 })
                .to('.client-check', { duration: 0.75, opacity: 1 });
        }, AntRef);

        return () => ctx.revert();
    }, []);

    return (
        <Section ref={AntRef} className="container mx-auto">
            <Bar style={{ marginBottom: '1.5rem' }}>
                <Items>
                    <Item
                        iconSize="1.5rem"
                        style={{ opacity: 0 }}
                        className="client-check"
                    >
                        <CheckCircle />
                    </Item>
                </Items>
                <Items>
                    <Item
                        iconSize="1.5rem"
                        style={{ opacity: 0 }}
                        className="server-check"
                    >
                        <CheckCircle />
                    </Item>
                </Items>
                <Items>
                    <Item
                        iconSize="1.5rem"
                        style={{ opacity: 0 }}
                        className="database-check"
                    >
                        <CheckCircle />
                    </Item>
                </Items>
            </Bar>
            <Bar>
                <Items>
                    <Item iconSize="3.5rem">
                        <Browser />
                        <Text>Browser</Text>
                        {/* pacakge */}
                        <Package
                            iconSize="2rem"
                            style={{ top: '0.875rem' }}
                            className="client-request"
                        >
                            <FiletypeJson />
                        </Package>
                    </Item>
                </Items>
                <Items>
                    <Item iconSize="3.5rem">
                        <Server />
                        <Text>Server</Text>
                        {/* package */}
                        <Package
                            iconSize="2rem"
                            style={{ top: '0.875rem' }}
                            className="server-response"
                        >
                            <Jsonwebtokens />
                        </Package>
                        <Package
                            iconSize="2rem"
                            style={{ top: '0.875rem' }}
                            className="server-request"
                        >
                            <FiletypeJson />
                        </Package>
                    </Item>
                </Items>
                <Items>
                    <Item iconSize="3.5rem">
                        <Database />
                        <Text>Database</Text>
                        {/* pacakage */}
                        <Package
                            iconSize="2rem"
                            style={{ top: '0.875rem' }}
                            className="database-response"
                        >
                            <UserCheck />
                        </Package>
                    </Item>
                </Items>
            </Bar>
        </Section>
    );
}

export default Animation;
