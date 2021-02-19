import React, { useEffect, useCallback } from 'react';
import { withRouter } from 'next/router';
import Container from '@material-ui/core/Container';
import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import {
  generatePlay
  }  from '../../components/matchSimulation.js'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex', 
    alignitems: 'flex-start'
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));



function MatchGround({ router: { query } }) {
  const [playerList, setPlayerList] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [modalStyle] = React.useState();
  const [number, setNumber] = React.useState(0);
  const [gameText, setGameText] = React.useState([])
  const classes = useStyles();

const SortableItem = sortableElement(({value}) => <li className="SortableItem"> {value}</li>);

const SortableContainer = sortableContainer(({children}) => {
  return <ul>{children}</ul>;
});

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

  const handleOpen = (index) => {
    console.log('clicked!!!')
    setOpen(true);
    setNumber(index);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const startGame = async () => {
    console.log('list', playerList)
    let i = 0;
    let gameData = {
      timer: 120,
      gameState: true,
      teamScore: 0,
      enemyScore: 0,
      playerList
    }
    while (gameData.timer > 0) { 
      gameData = generatePlay(gameData)
      delayDisplay(i, gameData.playText); 
      gameData.timer = updateTime(gameData.timer)
      console.log(gameData.timer, 'time')
      i++;
      gameData.gameState = !gameData.gameState 
    }
    gameData = generatePlay(gameData)
    delayDisplay(i, gameData.playText);
    console.log('text', gameData.gameText)
  }

  const updateTime = (timer) => {
    return (timer - (Math.floor(Math.random() * 16) + 8)) // 进攻时间在8到24秒之间
  }

  

  const delayDisplay = (i, text) => {
    setTimeout(function() { 
      setGameText(gameText => [...gameText, text]); 
    }, 500 * i); 
  }// TODO: 转换成正常的游戏文字！
  
  const PositionRender = () => {
    return (
      <ul> 
      <li onClick={() => handleOpen(0)}>中锋</li>
      <li onClick={() => handleOpen(1)}>大前锋</li>
      <li onClick={() => handleOpen(2)}>小前锋</li>
      <li onClick={() => handleOpen(3)}>得分后卫</li>
      <li onClick={() => handleOpen(4)}>控球后卫</li>
      </ul>
    )
  }

  const PlayerStatsComponent = () => { 
    if (playerList.length >= number){
    const player = playerList[number]
    if(player?.name){
    return (
      <Container maxWidth="md">
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">球员详细数据</h2>
        <p id="simple-modal-description">姓名 {player.name}</p>
        <p id="simple-modal-description">省份 {player.province}</p>
        <p id="simple-modal-description">身高 {player.height}</p>
        <p id="simple-modal-description">位置 {player.position}</p>
        <p id="simple-modal-description">速度 {player.speed}</p>
        <p id="simple-modal-description">力量 {player.strenth}</p>
        <p id="simple-modal-description">弹跳 {player.jumping}</p>
        <p id="simple-modal-description">耐力 {player.stamina}</p>
        <p id="simple-modal-description">体质 {player.fitness}</p>
        <p id="simple-modal-description">综合身体素质 {player.physical}</p>
        <p id="simple-modal-description">篮板 {player.rebound}</p>
        <p id="simple-modal-description">运球 {player.dribble}</p>
        <p id="simple-modal-description">投篮 {player.shooting}</p>
        <p id="simple-modal-description">传球 {player.pass}</p>
        <p id="simple-modal-description">防守 {player.defense}</p>
        <p id="simple-modal-description">综合技术水平 {player.technique}</p></div>
        </Container>
      )
    }
  }
}

  return (
    
    <Container >
      <Typography>拖动球员姓名选择位置,点击位置查看球员属性</Typography>
      <Grid container className={classes.root}>
      <PositionRender/>
      <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            >
            {PlayerStatsComponent()}
            </Modal>
      <SortableContainer onSortEnd={onSortEnd}>
        {playerList.length > 0 && playerList.map((player, index) => (
          <SortableItem key={player.name} index={index} value={player.name} />
        ))}
         
      </SortableContainer>
      </Grid>
      <Button variant="contained" color="primary" onClick={() => startGame()}>开始比赛</Button>
      {gameText.length > 0 && gameText.map((text) => (
          <Typography>{text}</Typography>
        ))}
      </Container>
  );
}

export default withRouter(MatchGround);
