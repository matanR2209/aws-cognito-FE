import NetworkService from "./NetworkService";

const COMPARE_YOURSELF_URL = 'https://ygtwgcbulk.execute-api.us-east-2.amazonaws.com/dev/compare-yourself';

export default class FirebaseMyAccountService {

    public static storeData(params: any, token: string) {
        return NetworkService.authenticatedPost(
            COMPARE_YOURSELF_URL,
            params,
            token
        );
    }

}
