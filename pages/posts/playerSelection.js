import React, { useEffect } from 'react';
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
import {
  createNormalPlayer, 
  upgradeElitePlayer, 
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
  rarePlayer: {
    color: '#800080',
    fontWeight: 'bold',
  }
}));


const htmlText = `
<body><div id="map" style="width:800px;height: 500px;"></div>
<script src="https://img.hcharts.cn/highmaps/highmaps.js"></script>
<script src="https://data.jianshukeji.com/geochina/china.js"></script>
<script>
// 随机数据
var data = [{"name":"北京","value":57},{"name":"天津","value":54},{"name":"河北","value":49},{"name":"山西","value":48},{"name":"内蒙古","value":36},{"name":"辽宁","value":46},{"name":"吉林","value":90},{"name":"黑龙江","value":35},{"name":"上海","value":82},{"name":"江苏","value":68},{"name":"浙江","value":62},{"name":"安徽","value":71},{"name":"福建","value":82},{"name":"江西","value":39},{"name":"山东","value":82},{"name":"河南","value":80},{"name":"湖北","value":19},{"name":"湖南","value":23},{"name":"广东","value":9},{"name":"广西","value":3},{"name":"海南","value":89},{"name":"重庆","value":43},{"name":"四川","value":21},{"name":"贵州","value":28},{"name":"云南","value":32},{"name":"西藏","value":42},{"name":"陕西","value":51},{"name":"甘肃","value":18},{"name":"青海","value":80},{"name":"宁夏","value":45},{"name":"新疆","value":69},{"name":"台湾","value":43},{"name":"香港","value":34},{"name":"澳门","value":89},{"name":"南海诸岛","value":78},{"name":"南海诸岛","value":60}];
// 初始化图表
var test = "12345"
var map = new Highcharts.Map('map', {
  title: {
    text: '中国地图'
  },
  colorAxis: {
    min: 0,
    minColor: 'rgb(255,255,255)',
    maxColor: '#006cee'
  },
  series: [{
    data: data,
    name: '身体素质',
    mapData: Highcharts.maps['cn/china'],
    joinBy: 'name' // 根据 name 属性进行关联
  }]
});
</script></body>`


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
  const handleChange = (event) => {
    setProvince(event.target.value);
  };  

  const selectPlayer = (player) => {
    setSelectedPlayerList(selectedPlayerList => [...selectedPlayerList, player]);
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
    setNumberSelected(index);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectClose = () => {
    setSelectOpen(false);
  };

  const renderPlayerStats = () => {
    if (playerList.length > 0){
      const player = playerList[number]
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
        <p id="simple-modal-description">综合技术水平 {player.technique}</p>
        <Button variant="contained" color="default" onClick={() => selectPlayer(player)}>
        选择该球员
      </Button>
      </div>
      </Container>
      );
    }
  }

  const renderSelectedPlayerStats = () => {
    if (selectedPlayerList.length > 0){
      const player = selectedPlayerList[numberSelected]
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
        <p id="simple-modal-description">综合技术水平 {player.technique}</p>
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
        if(rarePlayer > 80) {
          upgradeElitePlayer(player);
          player.rarity = "elite";
        }
        physicalCheck(player);
        techniqueCheck(player);
        player.name = generateName();
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
              <ListItemText classes={{primary: player.rarity == 'elite' ? classes.rarePlayer : ''}} primary={player.name} />
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
              <ListItemText classes={{primary: player.rarity == 'elite' ? classes.rarePlayer : ''}} primary={player.name} />
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
          </Grid>
            </Grid>
      
      
    </Grid>
    );
  }