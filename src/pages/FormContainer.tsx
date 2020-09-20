import * as React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import {useEffect} from "react";
import AuthService from "../services/AuthService";
import {List} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        naVbar: {
            display: "flex",
            flexDirection: "row"
        },
        selected: {
            backgroundColor: "white"
        },
        listItem: {
            textAlign: "center"
        }
    }),
);



interface IProps {}

enum loginStatus {
    signIn = 'signIn',
    signUp= 'signUp'
}

interface ILocalState {
    currentPage: loginStatus
}

export default function FormContainer(props: IProps) {
    const classes = useStyles();
    const [currentPage, setValue] = React.useState( loginStatus.signIn);

    useEffect(() => {
        AuthService.initAuth();
    });

    const updateForm = (newPage: loginStatus) => {
        setValue(newPage)
    }

    const isSelected =(page: loginStatus): boolean => {
        return page === currentPage;
    }

    return (
        <div>

            <List component="nav" className={classes.naVbar} >
                <ListItem
                    button
                    className={classes.listItem}
                    selected={currentPage === loginStatus.signIn}
                    onClick={() => updateForm(loginStatus.signIn)}
                >
                    <ListItemText primary="Sign in" />
                </ListItem>
                <ListItem
                    button
                    className={classes.listItem}
                    selected={currentPage === loginStatus.signUp}
                    onClick={() => updateForm(loginStatus.signUp)}
                >
                    <ListItemText primary="Sign up"/>
                </ListItem>
            </List>
            {currentPage === loginStatus.signUp? <SignUp/> : <SignIn/>}
        </div>
    );
}