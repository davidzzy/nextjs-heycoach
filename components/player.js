export const createNormalPlayer = () => {
    const positionGenerate = Math.floor(Math.random() * 10) + 1
    if ( positionGenerate > 5 )
        return createInsidePlayer();
    else 
        return createOutsidePlayer();
}

const createInsidePlayer = () => {
    const player = {};
    player['speed'] = Math.floor(Math.random() * 70); 
    player['strenth'] = Math.floor(Math.random() * 100); 
    player['jumping'] = Math.floor(Math.random() * 100); 
    player['stamina'] = Math.floor(Math.random() * 100); 
    player['fitness'] = Math.floor(Math.random() * 100);

    player['rebound'] = Math.floor(Math.random() * 100);
    player['dribble'] = Math.floor(Math.random() * 70); 
    player['shooting'] = Math.floor(Math.random() * 70); 
    player['pass'] = Math.floor(Math.random() * 70); 
    player['defense'] = Math.floor(Math.random() * 100);
    player['position'] = '内线';
    player['height'] = Math.floor(Math.random() * 20) + 185;
    return player
}
const createOutsidePlayer = () => {
    const player = {};
    player['speed'] = Math.floor(Math.random() * 100); 
    player['strenth'] = Math.floor(Math.random() * 70); 
    player['jumping'] = Math.floor(Math.random() * 100); 
    player['stamina'] = Math.floor(Math.random() * 100); 
    player['fitness'] = Math.floor(Math.random() * 100);

    player['rebound'] = Math.floor(Math.random() * 70);
    player['dribble'] = Math.floor(Math.random() * 100); 
    player['shooting'] = Math.floor(Math.random() * 70); 
    player['pass'] = Math.floor(Math.random() * 100); 
    player['defense'] = Math.floor(Math.random() * 70);
    player['position'] = '外线';
    player['height'] = Math.floor(Math.random() * 30) + 165;
    return player
}

export const upgradeElitePlayer = (player) => {
    if (player.position == '内线'){
        return upgradeEliteInside(player);
    }
    else    
        return upgradeEliteOutside(player) 

}

const upgradeEliteInside = (player) => {
    player['strenth'] = Math.floor(Math.random() * 50) + 50;
    player['jumping'] = Math.floor(Math.random() * 50) + 50; 
    player['stamina'] = Math.floor(Math.random() * 50) + 50; 
    player['fitness'] = Math.floor(Math.random() * 50) + 50;

    player['rebound'] = Math.floor(Math.random() * 50) + 50;
    player['defense'] = Math.floor(Math.random() * 50) + 50;
    player['shooting'] = Math.floor(Math.random() * 50) + 50;
}

const upgradeEliteOutside = (player) => {
    player['speed'] = Math.floor(Math.random() * 50) + 50;
    player['jumping'] = Math.floor(Math.random() * 50) + 50; 
    player['stamina'] = Math.floor(Math.random() * 50) + 50; 
    player['fitness'] = Math.floor(Math.random() * 50) + 50;

    player['dribble'] = Math.floor(Math.random() * 50) + 50;
    player['pass'] = Math.floor(Math.random() * 50) + 50;
    player['shooting'] = Math.floor(Math.random() * 50) + 50;
}



//根据五项身体素质总和来评定球员身体素质
export const physicalCheck = (player) => {
    const physical = player['speed'] + player['strenth'] + player['jumping'] + player['stamina'] + player['fitness'];
    console.log('my physical',physical)
    switch(true) {
        case (physical > 400):
            player['physical'] = '超';
            break;
        case (physical > 300):
            player['physical'] = '优';
            break;
        case (physical > 200):
            player['physical'] = '中';
            break;
        case (physical > 100):
            player['physical'] = '下';
            break;
        case (physical <= 100):
            player['physical'] = '不合格';
            break;
    }
    return player;
}

export const techniqueCheck = (player) => {
    const technique = player['rebound'] + player['dribble'] + player['shooting'] + player['pass'] + player['defense'];
    console.log('my technique',technique)
    switch(true) {
        case (technique > 400):
            player['technique'] = '超';
            break;
        case (technique > 300):
            player['technique'] = '优';
            break;
        case (technique > 200):
            player['technique'] = '中';
            break;
        case (technique > 100):
            player['technique'] = '下';
            break;
        case (technique <= 100):
            player['technique'] = '不合格';
            break;
    }
    return player;
}

