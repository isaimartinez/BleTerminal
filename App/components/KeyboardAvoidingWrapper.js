import React from 'react';
import {KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, Platform} from 'react-native';

const KeyboardAvoidingWrapper = ({children}) => {
    return (
        <KeyboardAvoidingView style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'height' : null}
            keyboardVerticalOffset={130}
        >
            {/* <ScrollView 
              contentContainerStyle={{flex: 1}}
            > */}
                {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
                    {children}
                {/* </TouchableWithoutFeedback> */}
            {/* </ScrollView> */}
        </KeyboardAvoidingView>
    )
};

export default KeyboardAvoidingWrapper;