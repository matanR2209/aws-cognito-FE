import * as React from 'react';
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import CompareForm from "./CompareForm";
import {navBarItem} from "../types/FormPages";
import NavBar from "../components/NavBar";
import {stores} from "../state";
import {observer} from "mobx-react";

const authStore = stores.authStore;

interface ILocalState {
    currentNavBarItem: navBarItem
}

@observer
export default class FormContainer extends React.Component {
    public state: ILocalState = {
        currentNavBarItem: navBarItem.signIn
    };

    public componentDidMount() {
        authStore.isAuthenticated();
    }

    public render() {
        return (
            <>
                <NavBar items={this.getNavBatItems()}/>
                {this.renderPageContent()}
            </>
        )
    }

    private updateForm = (itemSelected: navBarItem) => {
        const newState = this.state;
        newState.currentNavBarItem = itemSelected;
        this.setState(newState);
    };

    private submitSignInForm = ( userName: string, password: string ) => {
        authStore.signIn(userName, password);
    };

    private submitSignUpForm = (username: string, email: string, pass: string) => {
        authStore.signUp(username, email, pass)
    }

    private submitConfirmation = (username: string, code: string) => {
        authStore.confirmUser(username, code);
    }

    private renderPageContent = () => {
        if(authStore.isLogged) {
            return <CompareForm/>
        } else {
            switch (this.state.currentNavBarItem) {
                case navBarItem.signIn: return <SignIn onSubmit={this.submitSignInForm}/>;
                case navBarItem.signUp: return <SignUp onSubmitSignUp={this.submitSignUpForm} onSubmitConfirm={this.submitConfirmation}/>;
            }
        }
    };

    private logout =() => {
        authStore.logout();
    };

    private getNavBatItems = () => {
        if(!authStore.isLogged) {
            return [
                {
                    value: navBarItem.signIn,
                    isSelected: this.state.currentNavBarItem === navBarItem.signIn,
                    click: this.updateForm
                },
                {
                    value: navBarItem.signUp,
                    isSelected: this.state.currentNavBarItem === navBarItem.signUp,
                    click: this.updateForm
                }
            ]
        } else {
            return [
                {
                    value: navBarItem.logout,
                    isSelected: this.state.currentNavBarItem === navBarItem.logout,
                    click: this.logout
                }
            ]
        }
    }

}