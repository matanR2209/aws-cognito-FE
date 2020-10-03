import * as React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {NavBarItem} from "../types/FormPages";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        listItem: {
            textAlign: "center"
        }
    }),
);
interface IProps {
    itemValue: NavBarItem
    isSelected: boolean;
    onClick: (itemSelected: NavBarItem) => void;
}

export default function NavBarListItem(props: IProps) {
    const classes = useStyles();

    const onClick = () => {
        props.onClick(props.itemValue);
    };

    return (
        <ListItem
            button
            className={classes.listItem}
            selected={props.isSelected}
            onClick={onClick}
        >
            <ListItemText primary={props.itemValue}/>
        </ListItem>
    );
}