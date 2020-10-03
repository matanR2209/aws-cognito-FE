import * as React from 'react';
import SignUp from "./SignUp";

interface IProps {
    onSignUp: (username: string, email: string, password: string) => void
    onConfirm: ( validationUserName: string, validationCode: string ) => void
}

interface ILocalState {
    username : string,
    password: string,
    email: string,
    validationUserName: string
    validationCode: string
}

export default class SignUpContainer extends React.Component<IProps>  {
    public state: ILocalState = {
        username : '',
        password: '',
        email: '',
        validationUserName: '',
        validationCode: ''
    };

    public render () {
        return <SignUp
            onUserNameChange={this.onUserNameChange}
            onPasswordChange={this.onPasswordChange}
            onEmailChange={this.onEmailChange}
            onUserNameValidationChange={this.onUserNameValidationChange}
            onValidationCodeChange={this.onValidationCodeChange}
            onSubmitSignUp={this.submitSignUpForm}
            onSubmitConfirm={this.submitConfirmation}
        />
    }

    private onUserNameChange = (value: string) => {
        this.updateState("username", value)
    };

    private onPasswordChange = (value: string) => {
        this.updateState("password", value)
    };

    private onEmailChange = (value: string) => {
        this.updateState("email", value)
    };

    private onUserNameValidationChange = (value: string) => {
        this.updateState("validationUserName", value)
    };

    private onValidationCodeChange = (value: string) => {
        this.updateState("validationCode", value)
    };

    private submitSignUpForm = () => {
        const { username, password, email } = this.state;
        this.props.onSignUp(username, email, password);
    };

    private submitConfirmation = () => {
        const {validationUserName, validationCode} = this.state;
        this.props.onConfirm( validationUserName, validationCode );
    };

    private updateState = (key: string, value: any) => {
        const newState = this.state;
        // @ts-ignore
        newState[key] = value;
        this.setState(newState)
    };
}