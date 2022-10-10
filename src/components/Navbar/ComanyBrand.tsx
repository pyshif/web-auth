import styled from 'styled-components';
import { font, text, Size, Transform } from 'utils/font';

type PropsCompanyBrand = {
    name?: string;
    route?: string;
    className?: string;
    size?: Size;
    color?: string;
    weight?: number;
    spacing?: string;
    transform?: Transform;
};

const Styled = styled.div`
    a {
        ${font.didot}
        ${(props: PropsCompanyBrand) =>
            text({
                size: props.size,
                color: props.color,
                weight: props.weight,
                spacing: props.spacing,
                transform: props.transform,
            })}
    }
`;

function CompanyBrand(props: PropsCompanyBrand) {
    const defaults = {
        name: 'company brand',
        route: '/',
        className: '',
        size: '3xl',
        color: 'rgb(71, 85, 105)',
        weight: 600,
        spacing: '0.05rem',
        transform: 'uppercase',
    } as PropsCompanyBrand;

    const { name, route, className, size, color, weight, spacing, transform } =
        {
            ...defaults,
            ...props,
        };

    return (
        <Styled
            className={className}
            size={size}
            color={color}
            weight={weight}
            spacing={spacing}
            transform={transform}
        >
            <a href={route}>{name}</a>
        </Styled>
    );
}

export default CompanyBrand;
