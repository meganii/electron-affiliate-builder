import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Tabs, Tab} from 'material-ui/Tabs';

const style = {
  'height': 600,
};

class DialogModal extends Component {

  render() {
    const { onClick, search, content} = this.props;
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={onClick}
      />
    ];

    return (
      <div>
        <Dialog
          style={style}
          title="Affiliate Link"
          actions={actions}
          modal={true}
          open={search.open}
        >
          <Tabs>
            <Tab label="ImageLink">
              <div dangerouslySetInnerHTML={{__html: content.mix}}></div>
              <TextField id="content" value={content.mix} multiLine={true} rows={2} rowsMax={3} fullWidth={true} />
            </Tab>
            <Tab label="TextLink">
              <h5>Amazon</h5>
              <TextField id="amazon" value={content.amazon} fullWidth={true} />
              <h5>Rakuten</h5>
              <TextField id="rakuten" value={content.rakuten} fullWidth={true} />
              <h5>Yahoo</h5>
              <TextField id="Valuecommerce" value={content.yahoo} fullWidth={true} />
            </Tab>
          </Tabs>
        </Dialog>
      </div>
    );
  }
}

export default DialogModal;
