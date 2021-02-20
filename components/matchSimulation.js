export const generatePlay = (gameData) => {
    let playText, player, score;
    if (gameData.gameState){
        player = selectAttackPlayer(gameData.playerList)
        score = shooting(player)
        gameData.teamScore += score ? 2 : 0
        playText = attack(score, player)
    }
    else {
        player = selectAttackPlayer(gameData.enemyList)
        score = shooting(player)
        gameData.enemyScore += score ? 2 : 0
        playText = attack(score, player)
    }
    gameData.playText = playText + ' 时间:' + convertTime(gameData.timer > 0 ? gameData.timer : 0)
    gameData.playText = playText + ' 比分: ' + gameData.teamScore + ':' + gameData.enemyScore
    return gameData;
}

const convertTime = (timer) => {
    const minutes = Math.floor(timer / 60)
    const seconds = Math.floor(timer % 60)
    return minutes +':'+ (seconds < 10 == 1 ? '0':'') + Math.floor(timer % 60);
}

const selectAttackPlayer = (playerList) => {
    const playerSelected = Math.floor(Math.random() * playerList.length)
    const player = playerList[playerSelected]
    return player
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