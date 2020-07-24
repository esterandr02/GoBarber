import React, {
    useRef,
    useEffect,
    useImperativeHandle,
    forwardRef,
    useState,
    useCallback,
} from 'react';

import { useField } from '@unform/core';
import { TextInputProperties, Animated } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { Tooltip } from 'react-native-elements';

import { Container, TextInput, TooltipText, StyledIcon } from './styles';

interface InputProps extends TextInputProperties {
    name: string;
    icon: string;
}

interface InputValueReference {
    value: string;
}

interface InputRef {
    focus(): void;
}

// const FadeTooltip = Animated.createAnimatedComponent();

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
    { name, icon, ...rest },
    ref,
) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const inputElementRef = useRef<any>(null);

    const { registerField, defaultValue = '', fieldName, error } = useField(
        name,
    );
    const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

    useImperativeHandle(ref, () => ({
        focus() {
            inputElementRef.current.focus();
        },
    }));

    useEffect(() => {
        registerField<string>({
            name: fieldName,
            ref: inputValueRef.current,
            path: 'value',

            setValue(ref: any, value) {
                inputValueRef.current.value = value;
                inputElementRef.current.setNativeProps({ text: value });
            },
            clearValue() {
                inputValueRef.current.value = '';
                inputElementRef.current.clear();
            },
        });
    }, [fieldName, registerField]);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);
        setIsFilled(!!inputValueRef.current.value);
    }, []);

    return (
        <Container
            isFocused={isFocused}
            isFilled={isFilled}
            isErrored={!!error}
        >
            <StyledIcon
                name={icon}
                size={20}
                color={isFocused || isFilled ? '#ff9000' : '#666360'}
            />

            <TextInput
                ref={inputElementRef}
                keyboardAppearance="dark"
                placeholderTextColor="#666360"
                defaultValue={defaultValue}
                onChangeText={value => {
                    inputValueRef.current.value = value;
                }}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                {...rest}
            />

            {!!error && !isFocused && !isFilled && (
                <Tooltip
                    popover={<TooltipText>{error}</TooltipText>}
                    pointerColor="#ffe4e1"
                    withOverlay={false}
                    toggleAction="onPress"
                    skipAndroidStatusBar
                    width={175}
                    height={40}
                    containerStyle={{
                        backgroundColor: '#ffe4e1',
                    }}
                >
                    <Icon name="info" color="#c43030" size={20} />
                </Tooltip>
            )}
        </Container>
    );
};

export default forwardRef(Input);
