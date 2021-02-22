export const generatePlay = (gameData) => {
    let playText, player, playerSelected, score;
    if (gameData.gameState){
        playerSelected = selectRandomPlayer(gameData.playerList)
        player = gameData.playerList[playerSelected]
        score = shooting(player)
        gameData.teamScore += score ? 2 : 0
        gameData.playerList[playerSelected].score += score ? 2 : 0
        playText = attack(score, player)
        if(!score){
            playerSelected = selectRandomPlayer(gameData.playerList)
            player = gameData.enemyList[playerSelected]
            playText += ', ' + rebounding(player) + ','
        }
    }
    else {
        playerSelected = selectRandomPlayer(gameData.playerList)
        player = gameData.enemyList[playerSelected]
        score = shooting(player)
        gameData.enemyScore += score ? 2 : 0
        gameData.enemyList[playerSelected].score += score ? 2 : 0
        playText = attack(score, player)
        if(!score){
            playerSelected = selectRandomPlayer(gameData.playerList)
            player = gameData.playerList[playerSelected]
            playText += ', ' + rebounding(player) + ','
        }
    }
    playText = playText + ' 时间:' + convertTime(gameData.timer > 0 ? gameData.timer : 0)
    gameData.playText = playText + ' 比分: ' + gameData.teamScore + ':' + gameData.enemyScore
    console.log(gameData.playText)
    return gameData;
}

const convertTime = (timer) => {
    const minutes = Math.floor(timer / 60)
    const seconds = Math.floor(timer % 60)
    return minutes +':'+ (seconds < 10 == 1 ? '0':'') + Math.floor(timer % 60);
}

const selectRandomPlayer = (playerList) => {
    const playerSelected = Math.floor(Math.random() * playerList.length)
    return playerSelected
}

const attack = (score, player) => {
    const playText = score ? 
    player.name + '命中' : player.name + '不中'
    return playText
}

const shooting = (player) => {
    const shootingChance = Math.floor(Math.random() * 100);
    console.log(player.shooting, shootingChance, '投篮概率') 
    if (player.shooting > shootingChance)
        return true;
    return false;
}

const rebounding = (player) => {
    return player.name + '抢到篮板'
}