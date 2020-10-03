import * as React from 'react';
import CompareForm from "./CompareForm";
import {CompareData} from "../../types/compareData";
import {observer} from "mobx-react";

interface IProps {
    onSendCompare: (data: CompareData) => void;
}

interface ILocalState {
    age: string;
    height: string;
    income: string;
    isDataStored: boolean
}

@observer
export default class CompareFormContainer extends React.Component<IProps>  {
    public state: ILocalState = {
        age: '',
        height: '',
        income: '',
        isDataStored: false
    }

    public render () {
        return (
            <CompareForm
                onAgeChange={this.onAgeChange}
                onHeightChange={this.onHeightChange}
                onIncomeChange={this.onIncomeChange}
                submitForm={this.submitForm}/>
        );
    }

    private onAgeChange = (value: string) => {
        this.updateState("age", value)
    };
    private onHeightChange = (value: string) => {
        this.updateState("height", value)
    };

    private onIncomeChange = (value: string) => {
        this.updateState("income", value)
    };

    private updateState = (key: string, value: any) => {
        const newState = this.state;
        // @ts-ignore
        newState[key] = value;
        this.setState(newState)
    };

    private submitForm = () => {
        const params: CompareData = {
            age: 35,
            height: 85,
            income: 3500
        };
        this.props.onSendCompare(params);
    };
}