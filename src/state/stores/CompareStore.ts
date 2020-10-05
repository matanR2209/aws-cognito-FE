import {CompareData} from "../../types/compareData";
import DynamoDBService from "../../services/DynamoDBService";
import {observable} from "mobx";

export default class CompareStore {
    @observable public _singleUserData: CompareData | undefined = undefined;
    @observable public _allUsersData: CompareData[] | undefined = undefined;


    get singleUserData() {
        return this._singleUserData;
    }

    get allUsersData() {
        return this._allUsersData;
    }

    public storeData = async (data: CompareData, token: string) => {
        const response = await DynamoDBService.storeData(data, token);
        if(response) {
            return response;
        } else {
            console.log("ERROR!!!");
            return false;
        }
    }

    public retrieveData =  async (session: any, queryParam: string) => {
        const token = session.getIdToken().getJwtToken();
        const accessToken = session.getAccessToken().getJwtToken();
        const response =  await DynamoDBService.retrieveData(token, accessToken, queryParam);
        if(response) {
            queryParam === 'all'? this._allUsersData = response : this._singleUserData = response[0];
            return true;
        } else {
            return false;
        }
    }

    public deleteData =  async (token: string) => {
        return await DynamoDBService.deleteUserData(token);
    }
}