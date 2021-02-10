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
import RootRef from "@material-ui/core/RootRef";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function MatchGround({ router: { query } }) {
  const [playerList, setPlayerList] = React.useState([]);
  if (typeof window !== 'undefined'){
    
    
  }

  useEffect(() => {
    // code to run on component mount
    var selectedList = JSON.parse(localStorage.getItem('selectedPlayer'))
    setIndex(selectedList)
    setPlayerList(selectedList)
    console.log('list', selectedList)
  },[])
    const setIndex = (selectedList) => {
      selectedList.forEach((player,index) => player.id = index)
    }
    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      console.log('reorder',result)
      return result;
    };
    const getItemStyle = (isDragging, draggableStyle) => ({
      // styles we need to apply on draggables
      ...draggableStyle,
    
      ...(isDragging && {
        background: "rgb(235,235,235)"
      })
    });
    const getListStyle = isDraggingOver => ({
      //background: isDraggingOver ? 'lightblue' : 'lightgrey',
    });

    const onDragEnd = useCallback((result) => {
       // dropped outside the list
       if (!result.destination) {
        return;
      }
  
      const items = reorder(
        playerList,
        result.source.index,
        result.destination.index
      );
  
      setPlayerList(items)
      // the only one that is required
    }, []);

    console.log('playerList', query)
    return (
      <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <RootRef rootRef={provided.innerRef}>
            <List style={getListStyle(snapshot.isDraggingOver)}>
              {playerList.length > 0 && playerList.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <ListItem
                      ContainerComponent="li"
                      ContainerProps={{ ref: provided.innerRef }}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <ListItemText
                        primary={item.name}
                      />
                      <ListItemSecondaryAction>
                      </ListItemSecondaryAction>
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          </RootRef>
        )}
      </Droppable>
    </DragDropContext>
    )
}

export default withRouter(MatchGround);
