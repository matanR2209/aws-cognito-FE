import * as React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import {useEffect} from "react";
import AuthService from "../services/AuthService";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        naVbar: {
            display: "flex",
        flexDirection: "row"
        }
    }),
);

interface IProps {}

export default function FormContainer(props: IProps) {
    const classes = useStyles();
    const [isSignUpPage, setValue] = React.useState(false);

    const updateForm = () => {
            setValue(!isSignUpPage);
    }

    useEffect(() => {
        AuthService.initAuth();
    });

    return (
        <div>
            <AppBar position="static" className={classes.naVbar}>
                <Button color="inherit" onClick={updateForm}>Sign up</Button>
                <Button color="inherit" onClick={updateForm}>Sign in</Button>
            </AppBar>
            {isSignUpPage?<SignUp/> : <SignIn/>}
        </div>
    );
}