//Mining system check for mining level. If mining level is >= the mining level specified run the ore quality check.
//Ore quality check, checks if variable 43 is <= the number specified and gives player appropriate ore for that number.   
//Variable 41 = Mining Level
//Variable 43 = Random number between 1 and 100

function getItemBasedOnValues(value41, value43) {
    if (value41 >= 45) {
        return value43 <= 20 ? 16 : value43 <= 50 ? 15 : 14;
    } else if (value41 >= 40) {
        return value43 <= 18 ? 16 : value43 <= 45 ? 15 : 14;
    } else if (value41 >= 35) {
        return value43 <= 16 ? 16 : value43 <= 40 ? 15 : 14;
    } else if (value41 >= 30) {
        return value43 <= 14 ? 16 : value43 <= 35 ? 15 : 14;
    } else if (value41 >= 25) {
        return value43 <= 12 ? 16 : value43 <= 30 ? 15 : 14;
    } else if (value41 >= 20) {
        return value43 <= 10 ? 16 : value43 <= 25 ? 15 : 14;
    } else if (value41 >= 15) {
        return value43 <= 8 ? 16 : value43 <= 20 ? 15 : 14;
    } else if (value41 >= 10) {
        return value43 <= 6 ? 16 : value43 <= 15 ? 15 : 14;
    } else if (value41 >= 5) {
        return value43 <= 4 ? 16 : value43 <= 10 ? 15 : 14;
    } else {
        return value43 <= 2 ? 16 : value43 <= 5 ? 15 : 14;
    }
}

//dataItems[51] = Bronze Pick
//dataItems[52] = Steel Pick

if ($gameVariables.value(41) >= 10 && $gameParty.hasItem($dataItems[51]) || $gameParty.hasItem($dataItems[52])) {
    const value41 = $gameVariables.value(41);
    const value43 = $gameVariables.value(43);
    const itemId = getItemBasedOnValues(value41, value43);
    
    $gameParty.gainItem($dataItems[itemId], 1);
    this.command119(['MiningAnimation']);
} else if ($gameVariables.value(41) < 10) {
    this.command119(['Lvl < 10']);
} else {
    this.command119(['Pick Needed']);
}

//Random number generator between 1 and 100.
//$gameVariables.setValue(12, Math.randomInt() * 100) + 1;