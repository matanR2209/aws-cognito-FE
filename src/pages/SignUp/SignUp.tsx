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
    onSubmitSignUp: () => void;
    onSubmitConfirm: () => void;
    onUserNameChange: (value: string) => void;
    onPasswordChange: (value: string) => void;
    onEmailChange: (value: string) => void;
    onUserNameValidationChange: (value: string) => void;
    onValidationCodeChange: (value: string) => void;
}

export default function SignUp(props: IProps) {
    const classes = useStyles();

    const onUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onUserNameChange(event.target.value)
    };

    const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onEmailChange(event.target.value)
    };
    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onPasswordChange(event.target.value)
    };

    const onUserNameValidationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onUserNameValidationChange(event.target.value);
    };

    const onValidationCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onValidationCodeChange(event.target.value)
    };

    const submitForm = () => {
        props.onSubmitSignUp();
    };

    const confirmUser = () => {
        console.log("confirmUser");
        props.onSubmitConfirm();
    };

    return (
        <>
            <Card className={classes.cardContainer} variant="outlined">
                <CardHeader title="Sign Up"/>
                <CardContent className={classes.cardContent}>
                    <TextField onChange={onUserNameChange} className={classes.input} label="Username" variant="outlined" />
                    <TextField onChange={onEmailChange} className={classes.input} label="Email" variant="outlined" />
                    <TextField onChange={onPasswordChange} className={classes.input} label="Password" type={"password"} variant="outlined" />
                </CardContent>
                <CardActions className={classes.actions}>
                    <Button color="primary" variant="contained" onClick={submitForm}>Submit</Button>
                </CardActions>
            </Card>

            <Card className={classes.cardContainer} variant="outlined">
                <CardContent className={classes.cardContent}>
                    <CardHeader title="Confirm your account"/>
                    <TextField onChange={onUserNameValidationChange} className={classes.input} label="Username" variant="outlined" />
                    <TextField onChange={onValidationCodeChange} className={classes.input} label="Validation code" variant="outlined" />
                </CardContent>
                <CardActions className={classes.actions}>
                    <Button color="primary" variant="contained" onClick={confirmUser}>Confirm account</Button>
                </CardActions>
            </Card>
        </>
    );
}