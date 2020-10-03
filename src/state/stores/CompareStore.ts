import {CompareData} from "../../types/compareData";
import DynamoDBService from "../../services/DynamoDBService";

export default class CompareStore {

    public storeData = async (data: CompareData, token: string) => {
        const response = await DynamoDBService.storeData(data, token);
        if(response) {
            return response;
        } else {
            console.log("ERROR!!!");
        }
    }
}
