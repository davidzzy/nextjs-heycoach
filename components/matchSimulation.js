
export const generatePlay = ({timer, gameState, playerList}) => {
    let playText;
    if (gameState){
        const playerSelected = Math.floor(Math.random() * playerList.length)
        playText = playerList[playerSelected].name + '进攻'
    } 
    else {
        playText = '对方进攻'
    }
    playText = playText + ' 时间:' + convertTime(timer > 0 ? timer : 0)
    return playText;
}

const convertTime = (timer) => {
    const minutes = Math.floor(timer / 60)
    const seconds = Math.floor(timer % 60)
    return minutes +':'+ (seconds < 10 == 1 ? '0':'') + Math.floor(timer % 60);
  }