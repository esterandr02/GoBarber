import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 0 25px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Title = styled.Text`
    font-size: 24px;
    color: #f4ede8;
    font-family: 'RobotoSlab-Medium';
    margin: 64px 0 24px;
`;

export const ForgotPassword = styled.TouchableOpacity`
    margin-top: 24px;
`;

export const ForgotPasswordText = styled.Text`
    color: #f4ede8;
    font-size: 16px;
    font-family: 'RobotoSlab-Regular';
`;

export const CreateAccount = styled.TouchableOpacity`
    position: absolute;
    align-items: center;
    justify-content: center;
    flex-direction: row;

    left: 0;
    right: 0;
    bottom: 0;

    background: #312e38;
    border-color: #232129;

    border-top-width: 1px;
    padding: 16px 0 ${16 + getBottomSpace()}px;
`;

export const CreateAccountText = styled.Text`
    color: #ff9000;
    margin-left: 16px;
    font-size: 18px;
    font-family: 'RobotoSlab-Regular';
`;
