import * as React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import {CardHeader} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import {List} from "@material-ui/core";

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
        actionsContainer: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
        },
        filtersResultsContainer: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "50%"
        },
        filterResultItem: {
            textAlign: "center",
            border: "1px solid",
            margin: "1em",
            borderRadius: 10
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

export default function ResultsPage(props: IProps) {
    const classes = useStyles();
    return (
        <>
            <Card className={classes.cardContainer} variant="outlined">
                <CardHeader title="Your Results"/>
                <CardContent className={classes.cardContent}>
                    <div className={classes.actionsContainer}>
                        <Button variant="contained">Set Data</Button>
                        <Button variant="contained" color="secondary">Clear data on server</Button>
                        <Button variant="contained" color="primary">Get results</Button>
                    </div>
                </CardContent>
                <CardHeader title="Select filter"/>
                <CardContent className={classes.cardContent}>
                    <List>
                        <ListItem button>
                            <ListItemText primary={`your age: `} />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary={`your height: `} />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary={`your income: `} />
                        </ListItem>
                        <Divider />
                    </List>
                    <div>
                        <List className={classes.actionsContainer} component={"nav"}>
                            <ListItem button className={classes.filterResultItem}>
                                <ListItemText primary={"Lower is better"} />
                            </ListItem>
                            <ListItem button className={classes.filterResultItem}>
                                <ListItemText primary={"height is better"} />
                            </ListItem>
                        </List>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}