
export const generatePlay = (gameData) => {
    let playText;
    if (gameData.gameState){
        const playerSelected = Math.floor(Math.random() * gameData.playerList.length)
        const player = gameData.playerList[playerSelected]
        playText = shooting(player) ? 
        player.name + '命中' : player.name + '不中'
    } 
    else {
        playText = '对方进攻'
    }
    gameData.playText = playText + ' 时间:' + convertTime(gameData.timer > 0 ? gameData.timer : 0)
    return gameData;
}

const convertTime = (timer) => {
    const minutes = Math.floor(timer / 60)
    const seconds = Math.floor(timer % 60)
    return minutes +':'+ (seconds < 10 == 1 ? '0':'') + Math.floor(timer % 60);
  }

const shooting = (player) => {
    const shootingChance = Math.floor(Math.random() * 100);
    console.log(player.shooting, shootingChance, '投篮概率') 
    if (player.shooting > shootingChance)
        return true;
    return false;
}