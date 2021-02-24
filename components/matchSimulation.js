export const generatePlay = (gameData) => {
    let playText, player, playerSelected, score;
    if (gameData.gameState){
        playerSelected = selectRandomPlayer(gameData.playerList)
        player = gameData.playerList[playerSelected]
        score = shooting(player, playerSelected)
        gameData.teamScore += score
        gameData.playerList[playerSelected].score += score
        playText = attack(score, player)
        if(score == 0){
            playerSelected = selectRandomPlayer(gameData.enemyList)
            player = gameData.enemyList[playerSelected]
            gameData.enemyList[playerSelected].reboundCount++
            playText += ', ' + rebounding(player) + ','
        }
    }
    else {
        playerSelected = selectRandomPlayer(gameData.playerList)
        player = gameData.enemyList[playerSelected]
        score = shooting(player, playerSelected)
        gameData.enemyScore += score
        gameData.enemyList[playerSelected].score += score
        playText = attack(score, player)
        if(score == 0){
            playerSelected = selectRandomPlayer(gameData.playerList)
            player = gameData.playerList[playerSelected]
            gameData.playerList[playerSelected].reboundCount ++
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
    switch (score) {
        case 0:
            return player.name + '不中'
        case 2:
            return player.name + '命中两分'
        case 3:
            return player.name + '命中三分'
    }
    return player.name + '不中'
}

const shooting = (player, playerSelected) => {
    // SF SG PG has 0.3 chance of making a three
    const shootingChance = Math.floor(Math.random() * 100);
    console.log(player.shooting, shootingChance, '投篮概率') 
    if (player.shooting > shootingChance){
        const threePointer = Math.floor(Math.random() * 10);
        console.log('three pointer chance', threePointer, playerSelected)
        if(playerSelected > 1 && threePointer < 3)
            return 3;
        return 2
    }
    return 0;
}

const rebounding = (player) => {
    return player.name + '抢到篮板'
}