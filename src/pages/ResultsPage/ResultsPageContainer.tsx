import * as React from 'react';
import ResultsPage from "../ResultsPage/ResultsPage";

interface IProps {}

interface ILocalState {}

export default class ResultsPageContainer extends React.Component<IProps>  {

    public state: ILocalState = {};

    public render () {
        return <ResultsPage/>
    }

}