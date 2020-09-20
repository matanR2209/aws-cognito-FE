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

export default function SignIn(props: IProps) {
    const classes = useStyles();
    let [userNameValue] = React.useState('');
    let [passValue] = React.useState('');
    const onUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        userNameValue = event.target.value
    };

    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        passValue = event.target.value
    };

    const submitForm = () => {
        AuthService.signIn(userNameValue, passValue);



    };

    return (
        <Card className={classes.cardContainer} variant="outlined">
            <div>Sign in</div>
            <CardContent className={classes.cardContent}>
                <TextField className={classes.input} onChange={onUserNameChange} label="Username" variant="outlined" />
                <TextField className={classes.input} onChange={onPasswordChange} label="Password" type={"password"} variant="outlined" />
            </CardContent>
            <CardActions className={classes.actions}>
                <Button onClick={submitForm}>Submit</Button>
            </CardActions>
        </Card>
    );
}