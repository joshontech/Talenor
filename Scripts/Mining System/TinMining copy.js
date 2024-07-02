//Mining system check for mining level. If mining level is >= the mining level specified run the ore quality check.
//Ore quality check, checks if variable 43 is <= the number specified and gives player appropriate ore for that number.   
//Variable 41 = Mining Level
//Variable 43 = Random number between 1 and 100

function getItemBasedOnValues(value41, value43) {
    if (value41 >= 45) {
        return value43 <= 20 ? 13 : value43 <= 50 ? 12 : 11;
    } else if (value41 >= 40) {
        return value43 <= 18 ? 13 : value43 <= 45 ? 12 : 11;
    } else if (value41 >= 35) {
        return value43 <= 16 ? 13 : value43 <= 40 ? 12 : 11;
    } else if (value41 >= 30) {
        return value43 <= 14 ? 13 : value43 <= 35 ? 12 : 11;
    } else if (value41 >= 25) {
        return value43 <= 12 ? 13 : value43 <= 30 ? 12 : 11;
    } else if (value41 >= 20) {
        return value43 <= 10 ? 13 : value43 <= 25 ? 12 : 11;
    } else if (value41 >= 15) {
        return value43 <= 8 ? 13 : value43 <= 20 ? 12 : 11;
    } else if (value41 >= 10) {
        return value43 <= 6 ? 13 : value43 <= 15 ? 12 : 11;
    } else if (value41 >= 5) {
        return value43 <= 4 ? 13 : value43 <= 10 ? 12 : 11;
    } else {
        return value43 <= 2 ? 13 : value43 <= 5 ? 12 : 11;
    }
}

if ($gameParty.hasItem($dataItems[50]) || $gameParty.hasItem($dataItems[51]) || $gameParty.hasItem($dataItems[52])) {
    const value41 = $gameVariables.value(41);
    const value43 = $gameVariables.value(43);
    const itemId = getItemBasedOnValues(value41, value43);
    
    $gameParty.gainItem($dataItems[itemId], 1);
    this.command119(['MiningAnimation']);
} else {
    this.command119(['Pick Needed']);
}

//Random number generator between 1 and 130.
//$gameVariables.setValue(12, Math.randomInt() * 130) + 1;