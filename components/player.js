export default function createPlayer() {
    const player = {};
    player['speed'] = Math.floor(Math.random() * 100); 
    player['strenth'] = Math.floor(Math.random() * 100); 
    player['jumping'] = Math.floor(Math.random() * 100); 
    player['stamina'] = Math.floor(Math.random() * 100); 
    player['fitness'] = Math.floor(Math.random() * 100);
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
    return player
}