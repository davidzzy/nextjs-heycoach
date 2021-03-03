export const generatePlay = (gameData) => {
    let playText, player, playerSelected, defensePlayer, defenseSelected, score, defended, assistSelect;
    if (gameData.gameState){
        playerSelected = selectRandomPlayer(gameData.playerList)
        defenseSelected = selectRandomPlayer(gameData.enemyList)
        player = gameData.playerList[playerSelected] // 选择进攻球员
        defensePlayer = gameData.enemyList[defenseSelected] //选择防守球员
        defended = defenseCheck(defensePlayer, player)
        if(defended == 'false'){
            score = shooting(player, playerSelected)
            playText = attack(score, player)
            if(score > 0){
                gameData.teamScore += score
                gameData.playerList[playerSelected].score += score
                assistSelect = assistCheck(gameData.playerList, playerSelected)
                if (assistSelect != -1) {
                    player = gameData.playerList[assistSelect]
                    playText += ',' + assisting(player) + ','
                    gameData.playerList[assistSelect].assist++
                }
            }
            if(score == 0){
                defenseSelected = selectReboundPlayer(gameData.enemyList)
                playerSelected = selectReboundPlayer(gameData.playerList)
                defensePlayer = gameData.enemyList[defenseSelected]
                player = gameData.playerList[playerSelected]
                if (reboundCheck(player, defensePlayer)) {
                    gameData.playerList[playerSelected].reboundCount ++
                    console.log('进攻板!!!!!')
                    playText += ', ' + offensiveRebounding(player) + ','
                }
                else {
                    gameData.enemyList[defenseSelected].reboundCount ++
                    playText += ', ' + rebounding(defensePlayer) + ','
                }
            }
        }
        else {
            playText = defend(defended, defensePlayer)
            if (defended == 'block')
                gameData.enemyList[defenseSelected].block++
            if (defended == 'steal')
                gameData.enemyList[defenseSelected].steal++
        }
        
    }
    else {
        playerSelected = selectRandomPlayer(gameData.enemyList)
        defenseSelected = selectRandomPlayer(gameData.playerList)
        player = gameData.enemyList[playerSelected]
        defensePlayer = gameData.playerList[defenseSelected] //选择防守球员
        defended = defenseCheck(defensePlayer, player)
        if(defended == 'false'){
            score = shooting(player, playerSelected)
            playText = attack(score, player)
            if(score > 0){
                gameData.enemyScore += score
                gameData.enemyList[playerSelected].score += score
                assistSelect = assistCheck(gameData.enemyList, playerSelected)
                if (assistSelect != -1) {
                    player = gameData.enemyList[assistSelect]
                    playText += ',' + assisting(player) + ','
                    gameData.enemyList[assistSelect].assist++
                }
            }
            if(score == 0){
                defenseSelected = selectReboundPlayer(gameData.playerList)
                playerSelected = selectReboundPlayer(gameData.enemyList)
                defensePlayer = gameData.playerList[defenseSelected]
                player = gameData.enemyList[playerSelected]
                if (reboundCheck(player, defensePlayer)) {
                    gameData.enemyList[playerSelected].reboundCount ++
                    playText += ', ' + offensiveRebounding(player) + ','
                }
                else {
                    gameData.playerList[defenseSelected].reboundCount ++
                    playText += ', ' + rebounding(defensePlayer) + ','
                }
                
            }
        }
        else {
            playText = defend(defended, defensePlayer)
            if (defended == 'block')
                gameData.playerList[defenseSelected].block++
            if (defended == 'steal')
                gameData.playerList[defenseSelected].steal++
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
    //TODO: make rebounding / assist / steal / foul more accurate with position instead of random
    const playerSelected = Math.floor(Math.random() * playerList.length)
    return playerSelected
}

const selectReboundPlayer = (playerList) => {
    //TODO: make rebounding / assist / steal / foul more accurate with position instead of random
    let playerSelected = Math.floor(Math.random() * playerList.length)
    if (playerSelected > 1) playerSelected = Math.floor(Math.random() * playerList.length)
    return playerSelected
}

const attack = (score, player) => {
    const fancyScore = Math.floor(Math.random() * 100);
    switch (score) {
        case 0:
            return player.name + '不中'
        case 2:
            if (player.shooting - fancyScore > 70)
                return player.name + '漂移后仰命中'
            else if (player.shooting - fancyScore > 60)
                return player.name + '转身跳投得手'
            else if (player.shooting - fancyScore > 50)
                return player.name + '稳稳命中两分'
            return player.name + '命中两分'
        case 3:
            if (player.shooting - fancyScore > 70)
                return player.name + '超远程发炮三分，球空心入框'
            else if (player.shooting - fancyScore > 60)
                return player.name + '不停球直接三分命中'
            else if (player.shooting - fancyScore > 50)
                return player.name + '底角投中三分'
            return player.name + '命中三分'
    }
    return player.name + '不中'
}

const defend = (defended, player) => {
    switch (defended) {
        case 'block':
            return player.name + '盖帽'
        case 'steal':
            return player.name + '抢断'
    }
    return player.name + '不中'
}

const defenseCheck = (defensePlayer, player) => {
    const blockChance = Math.floor(Math.random() * 100);
    const stealChance = Math.floor(Math.random() * 100);
    const defenseChance = Math.floor(Math.random() * 100); //各种降低防守数据可能性保持真实度
    if (defensePlayer.defense > blockChance && defensePlayer.defense > stealChance && defensePlayer.defense > defenseChance){
        if (stealChance > blockChance && stealChance > player.dribble)
            return 'steal'
        if (blockChance > stealChance && blockChance > player.jumping)
            return 'block'
    }
    return 'false'
}

const assistCheck = (playerList, playerSelected) => {
    const assistSelect = selectRandomPlayer(playerList)
    console.log('assist playlist', playerList, assistSelect)
    if (assistSelect != playerSelected){ // more assist conditions
        const assistingChance = Math.floor(Math.random() * 100);
        console.log(playerList[playerSelected].pass, assistingChance, '助攻概率') 
        if (playerList[playerSelected].pass > assistingChance)
            return assistSelect
    }
    return -1
}

const reboundCheck = (player, defensePlayer) => {
    const defenseRebound = Math.floor(Math.random() * 50);
    console.log(player.rebound, '争板概率' , defensePlayer.rebound + defenseRebound)
    return player.rebound > (defensePlayer.rebound + defenseRebound)
}

const shooting = (player, playerSelected) => {
    // SF SG PG has 0.3 chance of making a three
    const shootingChance = Math.floor(Math.random() * 100);
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

const offensiveRebounding = (player) => {
    return player.name + '抢到进攻篮板'
}

const assisting = (player) => {
    return player.name + '送出助攻'
}

