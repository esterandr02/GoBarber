import styled, { css } from 'styled-components/native';
import InputIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
    isFocused: boolean;
    isFilled: boolean;
    isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
    width: 100%;
    height: 60px;
    border-width: 2px;
    border-radius: 10px;

    padding: 0 16px;
    margin-bottom: 8px;

    align-items: center;
    flex-direction: row;

    border-color: #232129;
    background: #232129;

    ${props =>
        props.isErrored &&
        css`
            border-color: #c53030;
        `}

    ${props =>
        (props.isFocused || props.isFilled) &&
        css`
            border-color: #ff9000;
        `}
`;

export const StyledIcon = styled(InputIcon)`
    margin-right: 16px;
`;

export const TextInput = styled.TextInput`
    flex: 1;
    color: #fff;
    font-size: 16px;
    font-family: 'RobotoSlab-Regular';
`;

export const TooltipText = styled.Text`
    font-family: 'RobotoSlab-Medium';

    align-items: center;
    position: absolute;
    justify-content: center;
`;
