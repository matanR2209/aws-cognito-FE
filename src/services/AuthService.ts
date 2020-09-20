import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {
    CognitoUser,
    CognitoUserAttribute,
    CognitoUserPool,
    AuthenticationDetails, CognitoUserSession
} from 'amazon-cognito-identity-js'
import { User } from './user.model';

const POOL_DATA = {
    UserPoolId: 'us-east-2_LLdTd8MKQ',
    ClientId: 'nrn6b4a027tcobk82pgdr995e'
}
const userPool = new CognitoUserPool(POOL_DATA);

const DEV_CREDENTIALS = {
    username: 'testUer',
    password: 'test1234',
    email: 'm.atan2209@gmail.com'
};

export default class AuthService {
    public static authIsLoading = new BehaviorSubject<boolean>(false);
    public static authDidFail = new BehaviorSubject<boolean>(false);
    public static authStatusChanged = new Subject<boolean>();
    public static registeredUser: CognitoUser;

    public static signUp(username: string, email: string, password: string): void {
        this.authIsLoading.next(true);
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
                this.authDidFail.next(true);
                this.authIsLoading.next(false);
                return;
            }else {
                this.authDidFail.next(false);
                this.authIsLoading.next(false);
                if(result?.user) {
                    this.registeredUser = result?.user;
                }
                console.log(result)
            }
        });
        return;
    }

    public static confirmUser(username: string, code: string) {
        this.authIsLoading.next(true);
        const userData = {
            Username: username,
            Pool: userPool
        };
        const cognitoUser = new CognitoUser(userData);
        cognitoUser.confirmRegistration(code, true, (err, result) => {
            if(err) {
                this.authDidFail.next(true);
                this.authIsLoading.next(false);
                return;
            }else {
                this.authDidFail.next(false);
                this.authIsLoading.next(false);
                console.log(result)
            }
        });
    }

    public static signIn(username: string = DEV_CREDENTIALS.username, password: string = DEV_CREDENTIALS.password): void {
        this.authIsLoading.next(true);
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
                this.authStatusChanged.next(true);
                this.authDidFail.next(false);
                this.authIsLoading.next(false);
            },
            onFailure: (err) => {
                this.authDidFail.next(true);
                this.authIsLoading.next(false);
                console.log(err);
            }
        })
        this.authStatusChanged.next(true);
        return;
    }

    public static getAuthenticatedUser(): boolean {return  false}
    public static logout() {
        this.authStatusChanged.next(false);
    }
    public static isAuthenticated(): Observable<boolean> {
        const user = this.getAuthenticatedUser();
        const obs = Observable.create((observer: any) => {
            if (!user) {
                observer.next(false);
            } else {
                observer.next(false);
            }
            observer.complete();
        });
        return obs;
    }
    public static initAuth() {
        this.isAuthenticated().subscribe(
            (auth) => this.authStatusChanged.next(auth)
        );
    }
}
