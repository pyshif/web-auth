import styled from 'styled-components';
import routes from 'utils/routes';
import CompanyBrand from './ComanyBrand';
import { MobileNav } from './Nav';

type PropsNavbar = {
    className?: string;
};

const Styled = styled.div`
    border-bottom: 2px solid rgba(229, 231, 235, 0.8);
    background-color: rgba(250, 250, 250, 1);
`;

const Layout = styled.div`
    padding: 1rem 1.25rem;
    display: flex;
    align-items: center;
`;

function Navbar(props: PropsNavbar) {
    return (
        <Styled>
            <Layout className={props.className}>
                <CompanyBrand name="colorful" href={routes.home} />
                <MobileNav className="ml-auto" />
            </Layout>
        </Styled>
    );
}

export default Navbar;
