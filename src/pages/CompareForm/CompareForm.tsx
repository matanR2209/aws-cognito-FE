import * as React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {CardHeader} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cardContainer: {
            width: "50%",
            margin: "1em auto"
        },
        cardContent: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "spaceBetween"
        },
        input: {
            marginBottom: "1em"
        },
        actions: {
            display: "flex",
            justifyContent: "space-around"
        }
    }),
);

interface IProps {
    submitForm: () => void
    onRequestData: (param: string) => void;
    onAgeChange: (value: string) => void
    onHeightChange: (value: string) => void
    onIncomeChange: (value: string) => void
}

export default function CompareForm(props: IProps) {
    const classes = useStyles();
    const onAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onAgeChange(event.target.value);
    };

    const onHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onHeightChange(event.target.value)
    };
    const onIncomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onIncomeChange(event.target.value);
    };

    const submitForm = () => {
        props.submitForm();
    };

    const retrieveUserData = () => {
        props.onRequestData("single");
    };

    return (
        <>
            <Card className={classes.cardContainer} variant="outlined">
                <CardHeader title="Compare yourself"/>
                <CardContent className={classes.cardContent}>
                    <TextField onChange={onAgeChange} className={classes.input} label="Age" variant="outlined" />
                    <TextField onChange={onHeightChange} className={classes.input} label="Height" variant="outlined" />
                    <TextField onChange={onIncomeChange} className={classes.input} label="Income" variant="outlined" />
                </CardContent>
                <CardActions className={classes.actions}>
                    <Button color="primary" variant="contained" onClick={submitForm}>Submit</Button>
                </CardActions>

                <CardActions className={classes.actions}>
                    <Button color="primary" variant="contained" onClick={retrieveUserData}>Get my data from server</Button>
                </CardActions>
            </Card>
        </>
    );
}