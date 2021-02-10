import React, { useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withRouter } from 'next/router';


function MatchGround({ router: { query } }) {
    const playerList = JSON.parse(localStorage.getItem('selectedPlayer'));;
    console.log('playerList', query)
    return (
        <List component="nav" aria-label="secondary mailbox folders">
        <List>
        {playerList && playerList.map((player) => {
            return (
              <ListItem>
              <ListItemText  primary={player.name} />
              </ListItem> //
            );
        })}
        </List>
      </List>
    )
}

export default withRouter(MatchGround);
