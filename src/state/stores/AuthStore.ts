import { observable } from "mobx";
import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserAttribute,
    CognitoUserPool,
    CognitoUserSession
} from "amazon-cognito-identity-js";
import {User} from "../../types/user.model";


const POOL_DATA = {
    UserPoolId: 'us-east-2_LLdTd8MKQ',
    ClientId: 'nrn6b4a027tcobk82pgdr995e'
}
const userPool = new CognitoUserPool(POOL_DATA);

export default class AuthStore {
    @observable public _isLogged: boolean = false;

    get isLogged() {
        return this._isLogged;
    }

    public registeredUser: CognitoUser | undefined = undefined;

    public signUp(username: string, email: string, password: string): void {
        // this.authIsLoading.next(true);
        const user: User = {
            username: username,
            email: email,
            password: password
        };
        const attributeList: CognitoUserAttribute[] = [];

        const emailAttribute = {
            Name: 'email', // the name of the attribute on cognito
            Value: user.email
        };
        attributeList.push(new CognitoUserAttribute(emailAttribute));

        userPool.signUp(user.username, user.password, attributeList, [], (err, result) => {
            if(err) {
                console.log(err);
                return;
            }else {
                if(result?.user) {
                    this.registeredUser = result?.user;
                    this._isLogged = true;
                }
                console.log(result)
            }
        });
        return;
    }

    public confirmUser(username: string, code: string) {
        const userData = {
            Username: username,
            Pool: userPool
        };
        const cognitoUser = new CognitoUser(userData);
        cognitoUser.confirmRegistration(code, true, (err, result) => {
            if(err) {
                console.log(err);
                return;
            }else {
                console.log(result)
            }
        });
    }

    public  signIn(username: string, password: string): void {
        const authData = {
            Username: username,
            Password: password
        };
        const authDetails = new AuthenticationDetails(authData)
        const userData = {
            Username: username,
            Pool: userPool
        };

        const cognitoUser = new CognitoUser(userData);
        cognitoUser.authenticateUser(authDetails, {
            onSuccess: (result: CognitoUserSession) => {
                console.log(result);
                this._isLogged = true;
            },
            onFailure: (err) => {
                console.log(err);
                this._isLogged = false;
            }
        });
        return;
    }

    public getAuthenticatedUser(): CognitoUser | null {
        return userPool.getCurrentUser();
    }

    public logout() {
        this.getAuthenticatedUser()?.signOut();
        this._isLogged = false
    }

    public  isAuthenticated() {
        const user = this.getAuthenticatedUser();
        if (!user) {
            return false;
        } else {
            user.getSession((err: Error, session: any) => {
                if(err) {
                    console.log(err);
                    return false
                } else {
                    this._isLogged = true;
                    return session.isValid();
                }
            });
        }
    }
}
