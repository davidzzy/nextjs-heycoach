import { legendaryPlayers } from '../public/data/legendaryPlayers'
import { lastName } from '../public/data/lastName.js'
import { firstName } from '../public/data/firstName.js'

let legendaryList = legendaryPlayers

const generateName = () => {
    //firstName.length 800
    //lastName.length 190
    const firstNameSelect = Math.floor(Math.random() * 800); 
    const lastNameSelect = Math.floor(Math.random() * 190);
    const secondLetter = Math.floor(Math.random() * 2);
    const secondLetterSelect = secondLetter === 1 ? firstName[Math.floor(Math.random() * 800)] : '';
    return (lastName[lastNameSelect] + firstName[firstNameSelect] + secondLetterSelect)
  }

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
    player['block'] = Math.floor(Math.random() * 70);
    player['steal'] = Math.floor(Math.random() * 50);
    player['position'] = '内线';
    player['height'] = Math.floor(Math.random() * 20) + 185;
    player.name = generateName();
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
    player['block'] = Math.floor(Math.random() * 50);
    player['steal'] = Math.floor(Math.random() * 70);
    player['position'] = '外线';
    player['height'] = Math.floor(Math.random() * 30) + 165;
    player.name = generateName();
    return player
}

export const upgradeElitePlayer = (player) => {
    if (player.position == '内线'){
        return upgradeEliteInside(player);
    }
    else    
        return upgradeEliteOutside(player) 

}

export const upgradeLegendaryPlayer = (player) => {
    if (legendaryList.length > 0) {
        const randomSelect = Math.floor(Math.random() * legendaryList.length);
        const selectedPlayer = legendaryList[randomSelect];
        legendaryList = legendaryList.filter(p => p.name !== selectedPlayer.name);
        selectedPlayer.rarity = "legendary"
        return selectedPlayer
    }
    return player
}

const upgradeEliteInside = (player) => {
    player['strenth'] = Math.floor(Math.random() * 50) + 50;
    player['jumping'] = Math.floor(Math.random() * 50) + 50; 
    player['stamina'] = Math.floor(Math.random() * 50) + 50; 
    player['fitness'] = Math.floor(Math.random() * 50) + 50;

    player['rebound'] = Math.floor(Math.random() * 50) + 50;
    player['block'] = Math.floor(Math.random() * 50) + 50;
    player['shooting'] = Math.floor(Math.random() * 50) + 50;
    player.rarity = "elite";
}

const upgradeEliteOutside = (player) => {
    player['speed'] = Math.floor(Math.random() * 50) + 50;
    player['jumping'] = Math.floor(Math.random() * 50) + 50; 
    player['stamina'] = Math.floor(Math.random() * 50) + 50; 
    player['fitness'] = Math.floor(Math.random() * 50) + 50;

    player['dribble'] = Math.floor(Math.random() * 50) + 50;
    player['steal'] = Math.floor(Math.random() * 50) + 50;
    player['pass'] = Math.floor(Math.random() * 50) + 50;
    player['shooting'] = Math.floor(Math.random() * 50) + 50;
    player.rarity = "elite";
}



//根据五项身体素质总和来评定球员身体素质
export const physicalCheck = (player) => {
    const physical = player['speed'] + player['strenth'] + player['jumping'] + player['stamina'] + player['fitness'];
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
    const technique = player['rebound'] + player['dribble'] + player['shooting'] + player['pass'] + 
    (player['block'] + player['steal'])/2;
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

