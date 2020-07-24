import React, { useCallback, useRef, useEffect, useState } from 'react';

import * as Yup from 'yup';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { useNavigation } from '@react-navigation/native';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    View,
    ScrollView,
    TextInput,
    Alert,
    Keyboard,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import {
    Container,
    Title,
    ForgotPassword,
    ForgotPasswordText,
    CreateAccount,
    CreateAccountText,
} from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const navigation = useNavigation();
    const { signIn } = useAuth();

    const formRef = useRef<FormHandles>(null);
    const passwordInputRef = useRef<TextInput>(null);

    const handleSignIn = useCallback(
        async (data: SignInFormData) => {
            try {
                formRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    email: Yup.string()
                        .required('E-mail obrigatório')
                        .email('Digite um e-mail válido'),
                    password: Yup.string().required('Senha obrigatória'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                await signIn({
                    email: data.email,
                    password: data.password,
                });
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                }

                Alert.alert(
                    'Erro na autenticacao',
                    'Ocorreu um erro ao fazer login, cheque as credenciais.',
                );

                // addToast({
                //     type: 'error',
                //     title: 'Erro na autenticação',
                //     description:
                //         'Ocorreu um erro ao logar, cheque as credenciais.',
                // });
            }
        },
        [signIn],
    );

    const [keyboard, setKeyboard] = useState(false);

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => {
            setKeyboard(true);
        });
        Keyboard.addListener('keyboardDidHide', () => {
            setKeyboard(false);
        });
    }, []);

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                enabled
            >
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flex: 1 }}
                >
                    <Container>
                        <Image source={logoImg} />
                        <View>
                            <Title>Faça seu logon</Title>
                        </View>

                        <Form ref={formRef} onSubmit={handleSignIn}>
                            <Input
                                name="email"
                                icon="mail"
                                placeholder="E-mail"
                                keyboardType="email-address"
                                returnKeyType="next"
                                autoCorrect={false}
                                autoCapitalize="none"
                                onSubmitEditing={() => {
                                    passwordInputRef.current?.focus();
                                }}
                            />
                            <Input
                                ref={passwordInputRef}
                                name="password"
                                icon="lock"
                                placeholder="Senha"
                                secureTextEntry
                                returnKeyType="send"
                                onSubmitEditing={() => {
                                    formRef.current?.submitForm();
                                }}
                            />
                        </Form>

                        <Button
                            onPress={() => {
                                formRef.current?.submitForm();
                            }}
                        >
                            Entrar
                        </Button>

                        <ForgotPassword onPress={() => {}}>
                            <ForgotPasswordText>
                                Esqueci minha senha
                            </ForgotPasswordText>
                        </ForgotPassword>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>

            {!keyboard && (
                <CreateAccount onPress={() => navigation.navigate('SignUp')}>
                    <Icon name="log-in" size={20} color="#ff9000" />
                    <CreateAccountText>Criar uma conta</CreateAccountText>
                </CreateAccount>
            )}
        </>
    );
};

export default SignIn;
