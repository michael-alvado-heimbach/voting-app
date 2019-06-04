import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
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

const Vote = props => {
  const { classes } = props;
  const voterName = props.name;
  const [dialogOpen, setDialogToggle] = useState(false);
  const [name, setName] = useState('');
  const [dialogResult, setDialogResult] = useState(false);
  const [data, setData] = useState([]);
  const [vote, setVote] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios({
        method: 'get',
        url: `http://localhost:8080/vote?name=${props.name}`,
      });
      if (result.data && result.data.alreadyVote) {
        setVote(true);
      } else {
        const resultData = Object.keys(result.data).map((key, index) => ({
          name: key,
          id: index,
        }));
        setData(resultData);
      }
    };
    fetchData();
  }, []);

  const handleClickVote = useCallback(nameValue => {
    setName(nameValue);
    setDialogToggle(true);
  }, []);

  const handleAgreeVote = useCallback(async nameValue => {
    setDialogResult(true);
    await axios({
      method: 'post',
      url: `http://localhost:8080/vote`,
      data: {
        name: nameValue,
        voterName,
      },
    });
  }, []);
  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        {(!vote || !dialogResult) && (
          <p align="center">Please choose one of your candidate</p>
        )}
        {(vote || dialogResult) && (
          <div align="center">
            <p>Thank you for your participation!</p>
          </div>
        )}
      </Paper>
      <Grid container justify="center" spacing={2}>
        {(!vote || !dialogResult) &&
          data &&
          data.map(value => (
            <Grid item sm={3} xs={12} key={value.id}>
              <div
                tabIndex={0}
                role="button"
                onKeyDown={() => {
                  handleClickVote(value.name);
                }}
                onClick={() => {
                  handleClickVote(value.name);
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
          handleAgreeVote(name);
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
  name: PropTypes.string,
};

export default withStyles(styles)(Vote);
