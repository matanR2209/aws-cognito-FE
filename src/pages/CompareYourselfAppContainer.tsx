import * as React from 'react';
import {observer} from "mobx-react";
import {ApplicationPages, NavBarItem} from "../types/FormPages";
import NavBar from "../components/NavBar";
import {stores} from "../state";
import CompareFormContainer from "./CompareForm/CompareFormContainer";
import SignInContainer from "./SignIn/SignInContainer";
import SignUpContainer from "./SignUp/SignUpContainer";
import {CompareData} from "../types/compareData";
import ResultsPageContainer from "./ResultsPage/ResultsPageContainer";

const authStore = stores.authStore;
const compareStore = stores.compareStore;

interface ILocalState {
    currentNavBarItem: NavBarItem;
    currentPage: ApplicationPages;
}

@observer
export default class CompareYourselfAppContainer extends React.Component {
    public state: ILocalState = {
        currentNavBarItem: NavBarItem.SignIn,
        currentPage: ApplicationPages.SignIn,
    };

    public componentDidMount() {
        authStore.isAuthenticated();
    }

    public render() {
        return (
            <>
                <NavBar isLogged={authStore.isLogged} selectedItem={this.state.currentNavBarItem} onNavBarItemSelected={this.updateForm}/>
                {this.renderPageContent()}
            </>
        )
    };

    private updateForm = (itemSelected: NavBarItem) => {
        const newState = this.state;
        newState.currentNavBarItem = itemSelected;
        switch (itemSelected) {
            case NavBarItem.Logout: {
                this.logout();
                break;
            }
            case NavBarItem.SignIn: {
                newState.currentPage = ApplicationPages.SignIn;
                break;
            }
            case NavBarItem.SignUp: {
                newState.currentPage = ApplicationPages.SignUp;
                break;
            }
        }
        this.setState(newState);
    };

    private renderPageContent = () => {
        if(authStore.isLogged) {
            switch (this.state.currentPage) {
                case ApplicationPages.Results: return <ResultsPageContainer
                    deleteUseData={this.deleteUseData}
                    retrieveAllResults={this.retrieveData}
                    allUsersCompareDate={compareStore.allUsersData}
                    userCompareDate={compareStore.singleUserData} />;

                default: return <CompareFormContainer
                    onSendDataRequest={this.retrieveData}
                    onSendCompare={this.sendCompareData}/>
            }
        } else {
            switch (this.state.currentPage) {
                case ApplicationPages.SignIn: return <SignInContainer onSignIn={this.onSignInSubmit}/>;
                case ApplicationPages.SignUp: return <SignUpContainer onConfirm={this.onConfirmSubmit} onSignUp={this.onSignUpSubmit}/>;
            }
        }
    };

    private onSignUpSubmit = (username: string, email: string, password: string) => {
        authStore.signUp(username, email, password);
    };

    private onConfirmSubmit= ( validationUserName: string, validationCode: string ) => {
        authStore.confirmUser(validationUserName, validationCode);
    };

    private logout =() => {
        const newState = this.state;
        newState.currentPage = ApplicationPages.SignIn;
        this.setState(newState);
        authStore.logout();

    };

    private onSignInSubmit = (username: string, password: string) => {
        authStore.signIn(username, password);
    };

    private sendCompareData = (compareData: CompareData) => {
        authStore.getAuthenticatedUser()?.getSession( async (err: any, session: any) => {
            if(err) {
                console.log(err);
                return;
            }
            const token = session.getIdToken().getJwtToken();
            const response = await compareStore.storeData(compareData, token);
            if(response) {
                const newState = this.state;
                newState.currentPage = ApplicationPages.Results;
                this.setState(newState);
            }

        });
    }

    private retrieveData = (param: string) => {
        authStore.getAuthenticatedUser()?.getSession( async (err: any, session: any) => {
            if(err) {
                console.log(err);
                return;
            }
            const response = await compareStore.retrieveData(session, param);
            if(response) {
                const newState = this.state;
                newState.currentPage = ApplicationPages.Results;
                this.setState(newState);
            }

        });
    }

    private deleteUseData = () => {
        authStore.getAuthenticatedUser()?.getSession( async (err: any, session: any) => {
            if(err) {
                console.log(err);
                return;
            }
            const token = session.getIdToken().getJwtToken();
            const response = await compareStore.deleteData(token);
            if(response) {
                const newState = this.state;
                newState.currentPage = ApplicationPages.Results;
                this.setState(newState);
            }

        });
    }

}