import styled from 'styled-components';
import Link from 'components/Link';
import { font, text, Size, Transform } from 'utils/font';
import { defaults } from 'utils/base';
import { loadOptions } from '@babel/core';

type PropsCompanyBrand = {
    name?: string;
    href?: string;
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
    const options = defaults<PropsCompanyBrand>(
        {
            name: 'company brand',
            href: '/',
        },
        props
    );

    return (
        <Styled className={options.className}>
            <BrandLink href={options.href}>{options.name}</BrandLink>
        </Styled>
    );
}

export default CompanyBrand;
