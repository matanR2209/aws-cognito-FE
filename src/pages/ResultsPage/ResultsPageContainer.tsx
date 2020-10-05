import * as React from 'react';
import ResultsPage from "../ResultsPage/ResultsPage";
import {CompareData} from "../../types/compareData";

interface IProps {
    userCompareDate: CompareData | undefined;
    allUsersCompareDate: CompareData[] | undefined;
    retrieveAllResults: (param: string) => void;
    deleteUseData: () => void;
}

interface ILocalState {}

export default class ResultsPageContainer extends React.Component<IProps>  {

    public state: ILocalState = {};

    public render () {
        return <ResultsPage
            deleteUseData={this.props.deleteUseData}
            retrieveAllResults={this.props.retrieveAllResults}
            allUsersCompareDate={this.props.allUsersCompareDate}
            userCompareDate={this.props.userCompareDate} />
    }

}