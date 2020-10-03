import * as React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import {List} from "@material-ui/core";
import NavBarListItem from "./NavBarListItem";
import {NavBarItem} from "../types/FormPages";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        navBar: {
            display: "flex",
            flexDirection: "row"
        }
    }),
);
interface IProps {
    isLogged: boolean;
    selectedItem: string;
    onNavBarItemSelected: (itemSelected: NavBarItem) => void
}

interface INavBarItem {
    value: string,
    isSelected: boolean,
    click: (selectedItem: NavBarItem) => void
}

export default function NavBar(props: IProps) {
    const classes = useStyles();

    const getNavBatItems = (): INavBarItem[] => {
        if(!props.isLogged) {
            return [
                {
                    value: NavBarItem.SignIn,
                    isSelected: props.selectedItem === NavBarItem.SignIn,
                    click: props.onNavBarItemSelected
                },
                {
                    value: NavBarItem.SignUp,
                    isSelected: props.selectedItem === NavBarItem.SignUp,
                    click: props.onNavBarItemSelected
                }
            ]
        } else {
            return [
                {
                    value: NavBarItem.Logout,
                    isSelected: props.selectedItem === NavBarItem.Logout,
                    click: props.onNavBarItemSelected
                }
            ]
        }
    }

    return (
        <List component="nav" className={classes.navBar} >
            {getNavBatItems().map( (item: any, index: number) => {
                return <NavBarListItem itemValue={item.value} isSelected={item.isSelected} onClick={item.click}/>
            })
            }
        </List>
    );
}