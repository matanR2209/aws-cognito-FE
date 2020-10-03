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
    onSubmit: () => void
    onPasswordChange: (value: string) => void;
    onUsernameChange: (value: string) => void;
}

export default function SignIn(props: IProps) {
    const classes = useStyles();

    const onUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onUsernameChange(event.target.value)
    };

    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onPasswordChange(event.target.value)
    };

    const submitForm = () => {
        props.onSubmit();
    };

    return (
        <Card className={classes.cardContainer} variant="outlined">
            <CardHeader title="Sign In"/>
            <CardContent className={classes.cardContent}>
                <TextField className={classes.input} onChange={onUserNameChange} label="Username" variant="outlined" />
                <TextField className={classes.input} onChange={onPasswordChange} label="Password" type={"password"} variant="outlined" />
            </CardContent>
            <CardActions className={classes.actions}>
                <Button color="primary" variant="contained" onClick={submitForm}>Submit</Button>
            </CardActions>
        </Card>
    );
}
