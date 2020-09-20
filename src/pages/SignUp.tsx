import * as React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AuthService from "../services/AuthService";

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

export default function SignUp(props: IProps) {
    const classes = useStyles();

    let [emailValue] = React.useState('');
    let [userNameValue] = React.useState('');
    let [passValue] = React.useState('');
    let [rePassValue] = React.useState('');


    const onUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        userNameValue = event.target.value
    };

    const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        emailValue = event.target.value
    };
    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        passValue = event.target.value
    };

    const onRePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        rePassValue = event.target.value
    };

    const submitForm = () => {
        console.log(userNameValue, emailValue, passValue, rePassValue);
        AuthService.signUp(userNameValue, emailValue, passValue)
    };

    return (
        <Card className={classes.cardContainer} variant="outlined">
            <CardContent className={classes.cardContent}>
                <TextField onChange={onUserNameChange} className={classes.input} label="Username" variant="outlined" />
                <TextField onChange={onEmailChange} className={classes.input} label="Email" variant="outlined" />
                <TextField onChange={onPasswordChange} className={classes.input} label="Password" type={"password"} variant="outlined" />
                <TextField onChange={onRePasswordChange} className={classes.input} label="Repeat password" type={"password"} variant="outlined" />
            </CardContent>
            <CardActions className={classes.actions}>
                <Button onClick={submitForm}>Submit</Button>
                <Button>Confirm user</Button>
            </CardActions>
        </Card>
    );
}