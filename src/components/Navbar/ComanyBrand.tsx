import styled from 'styled-components';
import Link from 'components/Link';
import { font, text } from 'utils/font';

type PropsCompanyBrand = {
    href: string;
    name: string;
    className?: string;
};

const BrandLink = styled(Link)`
    ${font.didot}
    ${text({
        size: '3xl',
        color: 'rgb(71, 85, 105);',
        weight: 600,
        spacing: '0.05rem',
        transform: 'uppercase',
    })}

    &:hover {
        filter: invert(30%);
    }
`;

const Styled = styled.div``;

function CompanyBrand(props: PropsCompanyBrand) {
    return (
        <Styled className={props.className}>
            <BrandLink to={props.href} scrollToTop>
                {props.name}
            </BrandLink>
        </Styled>
    );
}

export default CompanyBrand;
