import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import AccountIcon from '@material-ui/icons/AccountCircle';

const styles = () => ({
  card: {
    display: 'flex',
    cursor: 'pointer',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  icon: {
    width: '10vw',
    height: '10vh',
  },
});

const VoteItem = props => {
  const { name, classes } = props;
  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <div align="center">
          <AccountIcon className={classes.icon} />
          <p>{name}</p>
        </div>
      </CardContent>
    </Card>
  );
};

VoteItem.propTypes = {
  name: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VoteItem);
