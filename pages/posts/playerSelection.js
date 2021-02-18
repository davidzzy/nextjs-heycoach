import React, { useEffect } from 'react';
import { useRouter } from 'next/router'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { createGenerateClassName, makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';



import { provinceData } from '../../public/data/province.js'
import { lastName } from '../../public/data/lastName.js'
import { firstName } from '../../public/data/firstName.js'
import { htmlData } from '../../public/data/htmlData.js'
import {
  createNormalPlayer, 
  upgradeElitePlayer,
  upgradeLegendaryPlayer, 
  physicalCheck, 
  techniqueCheck
  }  from '../../components/player.js'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    wrap: 'nowrap',
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  elite: {
    color: '#800080',
    fontWeight: 'bold',
  },
  legendary: {
    color: '#ffa500',
    fontWeight: 'bold',
  }
}));


const htmlText = htmlData;


export default function PlayerSelection() {
  const [province, setProvince] = React.useState('');
  const [provinceList, setProvinceList] = React.useState([]);
  const [playerList, setPlayerList] = React.useState([]);
  const [selectedPlayerList, setSelectedPlayerList] = React.useState([]);
  const [number, setNumber] = React.useState(0);
  const [numberSelected, setNumberSelected] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [selectOpen, setSelectOpen] = React.useState(false);
  const classes = useStyles();
  const [modalStyle] = React.useState();
  const router = useRouter()
  const handleChange = (event) => {
    setProvince(event.target.value);
  };  

  const selectPlayer = (player) => {
    if ( selectedPlayerList.length >= 5 || selectedPlayerList.some(p => p.name === player.name)){
      alert("选择上限或球员已被选择!");
    }

    else {
    setSelectedPlayerList(selectedPlayerList => [...selectedPlayerList, player]);
    console.log('new player selected!', selectedPlayerList);
    }
    handleClose();
  }

  const removePlayer = (player) => {
    const newSelectedList = selectedPlayerList.filter(p => p.name !== player.name);
    console.log('newlist!', newSelectedList);
    setSelectedPlayerList(newSelectedList);
    handleSelectClose();
  }

  const renderProvinces = () => {
    return provinceData.map((i) => {
      return (
        <MenuItem value={i.name}>{i.name}</MenuItem>
      );
    });
   }
  
  const handleOpen = (index) => {
    setOpen(true);
    setNumber(index);
  };

  const handleSelectOpen = (index) => {
    setSelectOpen(true);
    console.log('current selected number', index)
    setNumberSelected(index);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectClose = () => {
    setSelectOpen(false);
  };

  const PlayerStatsComponent = (props) => { 
    const player = props.player
    return <div>
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
}
  //const Wrap = (player) => {(<div>{playerStatsComponent(player)}</div>)};

  const renderPlayerStats = () => {
    if (playerList.length > 0){
      
      const player = playerList[number]
      return (
      <Container maxWidth="md">
      <div style={modalStyle} className={classes.paper}>
      <p id="simple-modal-description">姓名 {player.name}</p>
        <PlayerStatsComponent player={player}/>
        <Button variant="contained" color="default" onClick={() => selectPlayer(player)}>
          选择该球员
        </Button>
        
      </div>
      </Container>
      );
    }
  }

  const renderSelectedPlayerStats = () => {
    if (selectedPlayerList.length > 0  && selectedPlayerList.length > numberSelected){
      console.log(selectedPlayerList.length, ' vs ', numberSelected)
      const player = selectedPlayerList[numberSelected]
      return (
      <Container maxWidth="md">
      <div style={modalStyle} className={classes.paper}>
      <PlayerStatsComponent player={player}/>
        <Button variant="contained" color="default" onClick={() => removePlayer(player)}>
        取消选择
      </Button>
      </div>
      </Container>
      );
    }
  }

  const generateName = () => {
    //firstName.length 800
    //lastName.length 190
    const firstNameSelect = Math.floor(Math.random() * 800); 
    const lastNameSelect = Math.floor(Math.random() * 190);
    const secondLetter = Math.floor(Math.random() * 2);
    const secondLetterSelect = secondLetter === 1 ? firstName[Math.floor(Math.random() * 800)] : '';
    return (lastName[lastNameSelect] + firstName[firstNameSelect] + secondLetterSelect)
  }

  const MyButton = React.forwardRef(({ onClick, href }, ref) => {
    return (
      <a href={href} onClick={onClick} ref={ref}>
        Click Me
      </a>
    )
  })

  const startMatch = () => {
    console.log(selectedPlayerList)
    // TODO: 至少选择五个人进行比赛

    const sendPlayer = selectedPlayerList
    localStorage.setItem('selectedPlayer', JSON.stringify(selectedPlayerList))
    router.push({
      pathname:'/posts/matchGround'
    })
  }

  useEffect(() => {
    // code to run on component mount
    console.log(province  ,'pronvice change!', province === '')
    if (!provinceList.includes(province) &&  province !== ''){
      console.log('rerender');
      for (var i = 0; i < 3; i ++){
        let player;
        const rarePlayer = Math.floor(Math.random() * 100);
        console.log(rarePlayer, 'larger than 80');
        player = createNormalPlayer();
        console.log('position', player)
        player.rarity = "normal";
        player.name = generateName();
        
        if(rarePlayer >= 70 && rarePlayer < 95) {
          upgradeElitePlayer(player);
        }
        else if(rarePlayer >= 95) {
          player = upgradeLegendaryPlayer(player);
          console.log('lengdary player', player)
        }
        physicalCheck(player);
        techniqueCheck(player);
        player.province = province;
        setPlayerList(playerList => [...playerList, player]);
        // save here then filter out by province
      }
      console.log('array', playerList);
      setProvinceList(provinceList => [...provinceList, province]);
    }
    
  }, [province])
  


  
    return (
      <Grid container className={classes.root} direction={'row'} spacing={2}>
          <Grid container justify="center">
          <Grid><Box component="div" display="inline">
        <Typography variant="h4" component="h1" gutterBottom>
          球员选择
        </Typography>
        从各省选择生源
      </Box>
      <Box component="div" display="inline">
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">省份</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={province}
          onChange={handleChange}
        >
          {renderProvinces()}
        </Select>
        <List component="nav" aria-label="secondary mailbox folders">
        <ListItem button>
          <ListItemText primary={`${province}球员`} />
        </ListItem>
        <List>
        {province != '' && playerList.map((player, index) => {
          if (player.province == province){
            return (
              <ListItem button onClick={() => handleOpen(index)} >
              <ListItemText classes={{primary: classes[player.rarity]}} primary={player.name} />
              </ListItem> //
            );
          }
        })}
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            >
            {renderPlayerStats()}
            </Modal>
        </List>
      </List>
      </FormControl>
      </Box>
      </Grid>
          <Grid>
          <div>
            <div className="text-container" dangerouslySetInnerHTML={{ __html: htmlText }} />
            <h1>已选择球员</h1>
      </div>
      <List>
      {selectedPlayerList.map((player, index) => {
            return (
              <ListItem button onClick={() => handleSelectOpen(index)} >
              <ListItemText classes={{primary: classes[player.rarity]}} primary={player.name} />
              </ListItem>
              
            );
          }
        )}
        <Modal
            open={selectOpen}
            onClose={handleSelectClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            >
            {renderSelectedPlayerStats()}
            </Modal>
        </List>
        <Button variant="contained" onClick = {startMatch} color="secondary">准备开赛</Button>
          </Grid>
            </Grid>
      
      
    </Grid>
    );
  }