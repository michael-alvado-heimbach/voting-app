import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

const CustomDialog = props => {
  const {
    open,
    closeDialog,
    title,
    content,
    agreeHandler,
    disagreeHandler,
  } = props;
  return (
    <div>
      <Dialog
        open={open}
        onClose={closeDialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              disagreeHandler();
              closeDialog();
            }}
            style={{ color: '#444' }}
          >
            Disagree
          </Button>
          <Button
            onClick={() => {
              agreeHandler();
              closeDialog();
            }}
            style={{ color: '#444' }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

CustomDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  agreeHandler: PropTypes.func.isRequired,
  disagreeHandler: PropTypes.func.isRequired,
};

export default withMobileDialog()(CustomDialog);
