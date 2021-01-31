export function createNormalPlayer() {
    const player = {};
    player['speed'] = Math.floor(Math.random() * 100); 
    player['strenth'] = Math.floor(Math.random() * 100); 
    player['jumping'] = Math.floor(Math.random() * 100); 
    player['stamina'] = Math.floor(Math.random() * 100); 
    player['fitness'] = Math.floor(Math.random() * 100);

    player['rebound'] = Math.floor(Math.random() * 100);
    player['dribble'] = Math.floor(Math.random() * 100); 
    player['shooting'] = Math.floor(Math.random() * 100); 
    player['pass'] = Math.floor(Math.random() * 100); 
    player['defense'] = Math.floor(Math.random() * 100);

    return player
}

export const createElitePlayer = () => {
    const player = {};
    player['speed'] = Math.floor(Math.random() * 50) + 50; 
    player['strenth'] = Math.floor(Math.random() * 50) + 50; 
    player['jumping'] = Math.floor(Math.random() * 50) + 50; 
    player['stamina'] = Math.floor(Math.random() * 50) + 50; 
    player['fitness'] = Math.floor(Math.random() * 50) + 50;

    player['rebound'] = Math.floor(Math.random() * 50) + 50;
    player['dribble'] = Math.floor(Math.random() * 50) + 50; 
    player['shooting'] = Math.floor(Math.random() * 50) + 50;  
    player['pass'] = Math.floor(Math.random() * 50) + 50;  
    player['defense'] = Math.floor(Math.random() * 50) + 50; 

    return player
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

