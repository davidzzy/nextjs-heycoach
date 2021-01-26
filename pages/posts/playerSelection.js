import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { provinceData } from '../../public/data/province.js'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
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
  const classes = useStyles();
  const handleChange = (event) => {
    setProvince(event.target.value);
  };

  const renderProvinces = () => {
    return provinceData.map((i) => {
      return (
        <MenuItem value={i.name}>{i.name}</MenuItem>
      );
    });
   }
  
    return (
      <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          球员选择
        </Typography>
        各省球员身体素质学习能力各不相同
      </Box>
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
      </FormControl>
      <div>
            <div className="text-container" dangerouslySetInnerHTML={{ __html: htmlText }} />
            <h1>球员选择</h1>
      </div>
    </Container>
    );
  }