import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import React, { useState, useEffect } from 'react';
import VoteItem from '../components/VoteItem';
import Dialog from '../components/Dialog';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    marginBottom: '2vh',
  },
});

const data = [
  { id: 1, name: 'Michael Alvado' },
  { id: 2, name: 'Pamela Anderson' },
  { id: 3, name: 'Nicolette Shea' },
  { id: 4, name: 'Cawaiikanom' },
  { id: 5, name: 'Tara Moon' },
  { id: 6, name: 'Misty Knight' },
  { id: 7, name: 'Poa Camilla' },
  { id: 8, name: 'Alice Bambam' },
];

const Vote = props => {
  const { classes } = props;
  const [dialogOpen, setDialogToggle] = useState(false);
  const [name, setName] = useState('');
  const [dialogResult, setDialogResult] = useState(false);

  useEffect(() => {
    console.log(dialogResult);
  });

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        {!dialogResult && (
          <p align="center">Please choose one of your candidate</p>
        )}
        {dialogResult && (
          <div align="center">
            <p>Thank you for your participation!</p>
          </div>
        )}
      </Paper>
      <Grid container justify="center" spacing={2}>
        {!dialogResult &&
          data &&
          data.map(value => (
            <Grid item sm={3} xs={12} key={value.id}>
              <div
                tabIndex={0}
                role="button"
                onKeyDown={() => {
                  setName(value.name);
                  setDialogToggle(true);
                }}
                onClick={() => {
                  setName(value.name);
                  setDialogToggle(true);
                }}
              >
                <VoteItem name={value.name} />
              </div>
            </Grid>
          ))}
      </Grid>
      <Dialog
        open={dialogOpen}
        closeDialog={() => {
          setDialogToggle(false);
        }}
        title={`Are sure you want to vote ${name}?`}
        content="You can only vote once."
        agreeHandler={() => {
          setDialogResult(true);
        }}
        disagreeHandler={() => {
          setDialogResult(false);
        }}
      />
    </div>
  );
};

Vote.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Vote);
