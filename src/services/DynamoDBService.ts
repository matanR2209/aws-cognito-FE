import NetworkService from "./NetworkService";

const COMPARE_YOURSELF_URL = 'https://ygtwgcbulk.execute-api.us-east-2.amazonaws.com/dev/compare-yourself';
const ACCESS_TOKEN_QUERY_PARAM = "?accessToken=";
export default class FirebaseMyAccountService {

    public static storeData(params: any, token: string) {
        return NetworkService.authenticatedPost(
            COMPARE_YOURSELF_URL,
            params,
            token
        );
    }

    public static retrieveData(token: string, accessToken: string, queryParam: string) {
        const url = `${COMPARE_YOURSELF_URL}/${queryParam}${ACCESS_TOKEN_QUERY_PARAM}${accessToken}`;
        return NetworkService.authenticatedGet( url, token );
    }

    public static deleteUserData(token: string) {
        const url = `${COMPARE_YOURSELF_URL}`;
        return NetworkService.authenticatedDelete( url, token );
    }
}
