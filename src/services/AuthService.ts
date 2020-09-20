import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {CognitoUser, CognitoUserAttribute, CognitoUserPool} from 'amazon-cognito-identity-js'
import { User } from './user.model';

const POOL_DATA = {
    UserPoolId: 'us-east-2_LLdTd8MKQ',
    ClientId: 'nrn6b4a027tcobk82pgdr995e'
}
const userPool = new CognitoUserPool(POOL_DATA);

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
        const emailAttribute = {
            Name: 'email',
            Value: user.email
        };
        return;
    }
    public static confirmUser(username: string, code: string) {
        this.authIsLoading.next(true);
        const userData = {
            Username: username,
        };
    }
    public static signIn(username: string, password: string): void {
        this.authIsLoading.next(true);
        const authData = {
            Username: username,
            Password: password
        };
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
