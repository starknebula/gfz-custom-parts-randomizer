var bodyParts = [
'Aqua Goose',
'Big Tyrant',
'Brave Eagle',
'Dread Hammer',
'Fire Wolf',
'Funny Swallow',
'Giant Planet',
'Grand Base',
'Holy Spider',
'Liberty Manta',
'Megalo Cruiser',
'Optical Wing',
'Rapid Barrel',
'Silver Sword',
'Sky Horse',
'Space Cancer',
'Speedy Dragon',
'Splash Whale',
'Valiant Jaguar',
'Wild Chariot',
// AX parts
'Mad Bull',
//JP parts
'Blood Raven',
'Galaxy Falcon',
'Metal Shell',
'Rage Knight'
];

var cockpitParts = [
'Aerial Bullet',
'Blast Camel',
'Bright Spear',
'Combat Cannon',
'Crystal Egg',
'Cyber Fox',
'Dark Chaser',
'Energy Crest',
'Garnet Phantom',
'Heat Snake',
'Moon Snail',
'Muscle Gorilla',
'Rave Drifter',
'Red Rex',
'Scud Viper',
'Sonic Soldier',
'Spark Bird',
'Super Lynx',
'Windy Shark',
'Wonder Worm',
// AX parts
'Crazy Buffalo',
// JP parts
'Hyper Stream',
'Maximum Star',
'Round Disk',
'Rush Cyclone'
];

var boosterParts = [
'Bazooka -YS',
'Bluster -X',
'Boxer -2C',
'Comet -V',
'Devilfish -RX',
'Euros -01',
'Extreme -ZZ',
'Impulse 220',
'Jupiter -Q',
'Meteor -RR',
'Punisher -4X',
'Raiden -88',
'Saturn -SG',
'Scorpion -R',
'Sunrise 140',
'Thunderbolt -V2',
'Tiger -RZ',
'Titan -G4',
'Triangle -GT',
'Triple -Z',
// AX parts
'Mars -EX',
// JP parts
'Crown -77',
'Hornet -FX',
'Shuttle -M2',
'Velocity -J'
];

//<-------------------------------------------------------------------------------------->

function rand(max){
    var value = Math.random() * max;
    var intValue = Math.floor(value);
    return intValue;
}

function getRandomParts(partsList, nParts, partsIndexMax){
    // Clone array. We need to remove selected items from list as we iterate to prevent duplicates.
    var partsListClone = [...partsList];
    // Init parts array for randomly selected parts. Iterate for n parts, pick at random.
    var parts = [];
    for (var i = 0; i < nParts; i++){
        // Get random index to select. i is implicit list size decrement.
        var randomIndex = rand(partsIndexMax - i);
        // Copy part, add to list.
        var part = partsListClone[randomIndex];
        parts.push(part);
        // Remove item from clone list
        partsListClone.splice(randomIndex, 1);
    }

    return parts;
}

function getRandomPartsBCB(nBodies, nCockpits, nBoosters, mode){

    var partsMaxIndex;
    switch (mode){
        case 'std':
            partsMaxIndex = 20;
            break;
        case 'ax':
            partsMaxIndex = 21;
            break;
        case 'all':
            partsMaxIndex = 25;
            break;
        default:
            throw new Error('Undefined mode');
    }

    var bodies   = getRandomParts(bodyParts,    nBodies,   partsMaxIndex);
    var cockpits = getRandomParts(cockpitParts, nCockpits, partsMaxIndex);
    var boosters = getRandomParts(boosterParts, nBoosters, partsMaxIndex);

    //
    bodies.sort();
    cockpits.sort();
    boosters.sort();

    setResults('body', bodies, bodyParts);
    setResults('cockpit', cockpits, cockpitParts);
    setResults('booster', boosters, boosterParts);
}

function setResults(id, parts, partsList) {
    var result = '';
    for (var index in parts) {
        // Get part text/name
        var part = parts[index];
        // Get part index from list
        var partIndex = partsList.indexOf(part);
        // Construct img tag with path to icon for part
        var image = '<img src="./media/nparts-custom/' + id + '/' + partIndex + '.png" />';
        result += '<li>' + getPrefix00(partIndex) + ' ' + image + part + '</li>\n';
    }

    var element = document.getElementById(id);
    element.innerHTML = result;
}

function getPrefix00 (integer){
    // prepend 0 if less than 10
    var value = (integer < 10) ? '0' + integer : integer;
    return '[' + (value) + '] ';
}

// currently hardcoded names
function randomize()
{
    // get's mode string from option[0] (mode)
    var nBodies   = document.getElementById('input-body').value;
    var nCockpits = document.getElementById('input-cockpit').value;
    var nBoosters = document.getElementById('input-booster').value;
    var mode = document.getElementById('input-mode').value;

    getRandomPartsBCB(nBodies, nCockpits, nBoosters, mode)
}


function randomize2(){

    // Create array to iterate over
    var tableIDs = ['body', 'cockpit', 'booster'];

    // Iterate over each table
    for (var index in tableIDs){
        // Get string from array
        var tableID = tableIDs[index];
        // Get tables from DOM
        var table = document.getElementById(tableID);
        //
        var indexes = getCheckedRowIndexes(table);
        // Get random sub-selection
        var inputFieldID = 'input-' + tableID;
        var total = document.getElementById(inputFieldID).value;
        var subIndexes = getRandomSubSelection(indexes, total);
        //
        setRowsState(table, 'none');
        setRowsStateByIndex(table, 'inherit', subIndexes);
    }
}

function getCheckedRowIndexes(table){

    var indexes = [];

    var tableBody = table.children[1];
    //
    for (var tableRowIndex in tableBody.children){
        // Getting a weird error where item() is last element returned? Skip it.
        if (isNaN(tableRowIndex))
            continue;

        var tableRow = tableBody.children[tableRowIndex];
        // Convert to zero-based index
        var index = tableRow.children[0].innerText - 1;
        // Check box is element 1 of table row. Input is sub element (0).
        var checkbox = tableRow.children[1].children[0];

        var isChecked = checkbox.checked;
        if (isChecked){
            indexes.push(index);
            //console.log('checked: ' + index);
        }
    }

    return indexes;
}

function setRowsState(table, state){

    var tbody = table.children[1];
    // Turn off all rows
    for (var index in tbody.children){
        // Getting a weird error where item() is last element returned? Skip it.
        if (isNaN(index))
        continue;
        //
        var tableRow = tbody.children[index];
        tableRow.style.display = state;
    } 

}

function setRowsStateByIndex(table, state, indexes){
    var tbody = table.children[1];
    // Enable selected rows
    for (var i in indexes){
        var index = indexes[i];
        var tableRow = tbody.children[index];
        tableRow.style.display = state;
    }
}

function getRandomSubSelection(indexes, total){
    // Get min value from set
    var min = total < indexes.length ? total : indexes.length;
    
    // Clone array. We need to remove selected items from list as we iterate to prevent duplicates.
    var indexesClone = [...indexes]
    // Init parts array for randomly selected parts. Iterate for n parts, pick at random.
    var subIndexes = [];
    // 
    for (var i = 0; i < min; i++){
        // Get random index to select
        var randomIndex = rand(indexesClone.length);
        // Get index from list, add to selection
        var index = indexesClone[randomIndex];
        subIndexes.push(index);
        // Remove item from clone list
        indexesClone.splice(randomIndex, 1);
    }
    
    return subIndexes;
}