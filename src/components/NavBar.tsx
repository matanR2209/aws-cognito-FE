import * as React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import {List} from "@material-ui/core";
import NavBarListItem from "./NavBarListItem";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        navBar: {
            display: "flex",
            flexDirection: "row"
        }
    }),
);
interface IProps {
    items: any[]
}

export default function NavBar(props: IProps) {
    const classes = useStyles();
    return (
        <List component="nav" className={classes.navBar} >
            {props.items.map( (item: any, index: number) => {
                return <NavBarListItem itemValue={item.value} isSelected={item.isSelected} onClick={item.click}/>
            })
            }
        </List>
    );
}