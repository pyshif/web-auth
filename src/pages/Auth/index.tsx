import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

type PropsAuthWrapper = {
    children?: React.ReactNode;
    className?: string;
};

const AuthWrapper = styled((props: PropsAuthWrapper) => (
    <div className={`container mx-auto ${props.className}`}>
        {props.children}
    </div>
))``;

function Auth() {
    return (
        <AuthWrapper>
            <Outlet />
        </AuthWrapper>
    );
}

export default Auth;
