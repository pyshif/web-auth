import styled from 'styled-components';
import { font } from 'utils/font';

const Styled = styled.div`
    color: rgb(230, 230, 230);
    /* font-family: Arial, Helvetica, sans-serif; */
    font-size: 0.75rem;
    font-family: 'Times New Roman', Times, serif;
    background-color: rgb(31, 45, 65);
    padding: 0.25rem 1.25rem;
`;

function Footer() {
    return (
        <Styled>
            <div className="container mx-auto">
                <span>JWT Web Auth</span>
                <span className="float-right">Chen Po Yu</span>
            </div>
        </Styled>
    );
}

export default Footer;
