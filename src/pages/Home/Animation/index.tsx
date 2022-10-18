import styled from 'styled-components';
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
import React from 'react';

const Section = styled.section`
    width: 100%;
    padding: 1.25rem;
    text-align: center;
`;
// Status
const StatusBar = styled.div`
    width: 100%;
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: center;
`;

const Status = styled.div`
    width: 33%;
    & > svg {
        width: 1.5rem;
    }
`;
// Characters
const CharactersBar = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
`;

const Character = styled.div`
    width: 33%;
    & > * {
        color: rgb(31, 45, 65);
    }
    & > svg {
        width: 3.5rem;
    }
`;
// Sequence
const Sequence = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 2.25rem;
`;

const Item = styled.div`
    width: 33%;
    & > svg {
        width: 2rem;
    }

    animation: request 4s infinite;

    @keyframes request {
        0% {
            opacity: 0%;
        }

        10% {
            opacity: 100%;
            transform: translateX(0);
        }

        90% {
            opacity: 100%;
        }

        100% {
            transform: translateX(100%);
            opacity: 0%;
        }
    }
`;

type PropsAnimation = {};

function Animation(props: PropsAnimation) {
    return (
        <Section>
            <StatusBar>
                <Status>
                    <CheckCircle />
                </Status>
                <Status>
                    <CheckCircle />
                </Status>
                <Status>
                    <Time />
                </Status>
            </StatusBar>
            <CharactersBar>
                <Character>
                    <Browser />
                    <p>Browser</p>
                </Character>
                <Character>
                    <Server />
                    <p>Server</p>
                </Character>
                <Character>
                    <Database />
                    <p>Database</p>
                </Character>
                <Sequence>
                    <Item>
                        <Jsonwebtokens />
                    </Item>
                    <Item>
                        <FiletypeJson />
                    </Item>
                    <Item>
                        <UserCheck />
                    </Item>
                </Sequence>
            </CharactersBar>
        </Section>
    );
}

export default Animation;
