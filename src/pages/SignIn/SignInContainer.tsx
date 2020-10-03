import * as React from 'react';
import SignIn from "./SignIn";
import {observer} from "mobx-react";

interface IProps {
    onSignIn: (username: string, password: string) => void;
}

interface ILocalState {
    username : string,
    password: string,
}

@observer
export default class SignInContainer extends React.Component<IProps>  {
    public state: ILocalState = {
        username : '',
        password: '',
    };

    public render () {
     return <SignIn
         onPasswordChange={this.onPasswordChange}
         onUsernameChange={this.onUserNameChange}
         onSubmit={this.submitSignIn}/>
    }

    private onUserNameChange = (value: string) => {
        this.updateState("username", value)
    };

    private onPasswordChange = (value: string) => {
        this.updateState("password", value)
    };

    private updateState = (key: string, value: any) => {
        const newState = this.state;
        // @ts-ignore
        newState[key] = value;
        this.setState(newState)
    };

    private submitSignIn = () => {
        // const { username, password } = this.state;
        this.props.onSignIn("matan123", "matan123");
    };
}