//Mining system check for mining level. If mining level is >= the mining level specified run the ore quality check.
//Ore quality check, checks if variable 43 is <= the number specified and gives player appropriate ore for that number.   
//Variable 41 = Mining Level
//Variable 43 = Random number between 1 and 100

if ($gameParty.hasItem($dataItems[50]) || $gameParty.hasItem($dataItems[51]) || $gameParty.hasItem($dataItems[52])) {

    if ($gameVariables.value(41) >= 45) {
        if ($gameVariables.value(43) <= 20) {
            $gameParty.gainItem($dataItems[13], 1);
        } else if ($gameVariables.value(43) <= 50) {
            $gameParty.gainItem($dataItems[12], 1);
        } else {
            $gameParty.gainItem($dataItems[11], 1);
        }
        this.command119(['MiningAnimation']);

    } else if ($gameVariables.value(41) >= 40) {
        if ($gameVariables.value(43) <= 18) {
            $gameParty.gainItem($dataItems[13], 1);
        } else if ($gameVariables.value(43) <= 45) {
            $gameParty.gainItem($dataItems[12], 1);
        } else {
            $gameParty.gainItem($dataItems[11], 1);
        }
        this.command119(['MiningAnimation']);

    } else if ($gameVariables.value(41) >= 35) {
        if ($gameVariables.value(43) <= 16) {
            $gameParty.gainItem($dataItems[13], 1);
        } else if ($gameVariables.value(43) <= 40) {
            $gameParty.gainItem($dataItems[12], 1);
        } else {
            $gameParty.gainItem($dataItems[11], 1);
        }
        this.command119(['MiningAnimation']);

    } else if ($gameVariables.value(41) >= 30) {
        if ($gameVariables.value(43) <= 14) {
            $gameParty.gainItem($dataItems[13], 1);
        } else if ($gameVariables.value(43) <= 35) {
            $gameParty.gainItem($dataItems[12], 1);
        } else {
            $gameParty.gainItem($dataItems[11], 1);
        }
        this.command119(['MiningAnimation']);

    } else if ($gameVariables.value(41) >= 25) {
        if ($gameVariables.value(43) <= 12) {
            $gameParty.gainItem($dataItems[13], 1);
        } else if ($gameVariables.value(43) <= 30) {
            $gameParty.gainItem($dataItems[12], 1);
        } else {
            $gameParty.gainItem($dataItems[11], 1);
        }
        this.command119(['MiningAnimation']);

    } else if ($gameVariables.value(41) >= 20) {
        if ($gameVariables.value(43) <= 13) {
            $gameParty.gainItem($dataItems[13], 1);
        } else if ($gameVariables.value(43) <= 25) {
            $gameParty.gainItem($dataItems[12], 1);
        } else {
            $gameParty.gainItem($dataItems[11], 1);
        }
        this.command119(['MiningAnimation']);

    } else if ($gameVariables.value(41) >= 15) {
        if ($gameVariables.value(43) <= 11) {
            $gameParty.gainItem($dataItems[13], 1);
        } else if ($gameVariables.value(43) <= 20) {
            $gameParty.gainItem($dataItems[12], 1);
        } else {
            $gameParty.gainItem($dataItems[11], 1);
        }
        this.command119(['MiningAnimation']);

    } else if ($gameVariables.value(41) >= 13) {
        if ($gameVariables.value(43) <= 6) {
            $gameParty.gainItem($dataItems[13], 1);
        } else if ($gameVariables.value(43) <= 15) {
            $gameParty.gainItem($dataItems[12], 1);
        } else {
            $gameParty.gainItem($dataItems[11], 1);
        }
        this.command119(['MiningAnimation']);

    } else if ($gameVariables.value(41) >= 5) {
        if ($gameVariables.value(43) <= 4) {
            $gameParty.gainItem($dataItems[13], 1);
        } else if ($gameVariables.value(43) <= 13) {
            $gameParty.gainItem($dataItems[12], 1);
        } else {
            $gameParty.gainItem($dataItems[11], 1);
        }
        this.command119(['MiningAnimation']);

    } else {
        if ($gameVariables.value(43) <= 2) {
            $gameParty.gainItem($dataItems[13], 1);
        } else if ($gameVariables.value(43) <= 5) {
            $gameParty.gainItem($dataItems[12], 1);
        } else {
            $gameParty.gainItem($dataItems[11], 1);
        }
        this.command119(['MiningAnimation']);
    }

} else {
    this.command119(['Pick Needed']);
}

//Random number generator between 1 and 130.
//$gameVariables.setValue(12, Math.randomInt() * 130) + 1;