import React, { useEffect, useCallback } from 'react';
import { withRouter } from 'next/router';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  ListItemSecondaryAction
} from "@material-ui/core";
import Container from '@material-ui/core/Container';
import RootRef from "@material-ui/core/RootRef";
import {sortableContainer, sortableElement} from 'react-sortable-hoc';

const SortableItem = sortableElement(({value}) => <li>{value}</li>);

const SortableContainer = sortableContainer(({children}) => {
  return <ul>{children}</ul>;
});

function MatchGround({ router: { query } }) {
  const [playerList, setPlayerList] = React.useState([]);
  if (typeof window !== 'undefined'){
    
    
  }

  useEffect(() => {
    // code to run on component mount
    var selectedList = JSON.parse(localStorage.getItem('selectedPlayer'))
    setPlayerList(selectedList)
    console.log('list', selectedList)
  },[])

  const onSortEnd = ({oldIndex, newIndex}) => {
    setPlayerList(arrayMove(playerList, oldIndex, newIndex))
  };

  const arrayMove = (array, from, to) => {
    // Will be deprecated soon. Consumers should install 'array-move' instead
    // https://www.npmjs.com/package/array-move
  
    array = array.slice();
    array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
  
    return array;
  }

  return (
      <SortableContainer onSortEnd={onSortEnd}>
        {playerList.length > 0 && playerList.map((player, index) => (
          <SortableItem key={player.name} index={index} value={player.name} player ={player} />
        ))}
      </SortableContainer>
  );
}

export default withRouter(MatchGround);
