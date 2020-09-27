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

interface IProps {}

export default function CompareForm(props: IProps) {
    const classes = useStyles();

    let [ageValue] = React.useState('');
    let [heightValue] = React.useState('');
    let [incomeValue] = React.useState('');

    const onAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        ageValue = event.target.value
    };

    const onHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        heightValue = event.target.value
    };
    const onIncomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        incomeValue = event.target.value
    };

    const submitForm = () => {
        console.log(ageValue, heightValue, incomeValue);
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
                    <Button color="primary" variant="contained" onClick={submitForm}>Compare</Button>
                </CardActions>
            </Card>
        </>
    );
}