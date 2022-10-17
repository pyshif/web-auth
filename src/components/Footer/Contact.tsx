import styled from 'styled-components';
import { ComponentPropsWithoutRef } from 'react';
import { font } from 'utils/font';
import Icon from 'components/Icon';

const Section = styled.section`
    font-size: 0.75rem;
    text-align: center;
`;

const Text = styled.p`
    padding: 0.25rem 1rem;
    margin-bottom: 0;

    &::before,
    &:after {
        content: '';
        display: block;
        width: 100%;
        background: rgba(250, 250, 250, 0.2);
        height: 1px;
        padding: 0 1rem;
        margin: 0.375rem 0;
    }
`;

const Dot = styled.span`
    margin: 0 0.25rem;
    &:before {
        content: '・';
    }
`;

type PropsContact = ComponentPropsWithoutRef<'section'> & {};

function Contact(props: PropsContact) {
    return (
        <Section {...props}>
            <Text>
                <span>
                    <Icon icon="circle-user" /> Developer: Chen, Po Yu
                </span>
                <Dot />
                <span>
                    <Icon icon="envelope" /> Email: pyfissh@gmail.com
                </span>
            </Text>
        </Section>
    );
}

export default Contact;
