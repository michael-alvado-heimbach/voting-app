import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
});

const Index = props => {
  const { classes } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios({
        method: 'get',
        url: 'http://localhost:8080/vote/all',
      });
      const resultData = Object.keys(result.data).map(key => ({
        name: key,
        vote: result.data[key].totalCount,
      }));
      setData(resultData);
    };
    fetchData();
  }, []);

  return (
    <Paper className={classes.root} elevation={1}>
      <div style={{ textAlign: 'center', width: '90vw' }}>
        <h1>Vote Result</h1>
        <div align="center">
          <BarChart width={900} height={500} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="vote" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
    </Paper>
  );
};

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);
