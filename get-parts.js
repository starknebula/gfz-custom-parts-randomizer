function rand(max){
    var value = Math.random() * max;
    var intValue = Math.floor(value);
    return intValue;
}

function randomize(){
    // Create array to iterate over
    var tableIDs = ['body', 'cockpit', 'booster'];
    // Iterate over each table
    for (var index in tableIDs){
        // Get string from array
        var tableID = tableIDs[index];
        // Get tables from DOM
        var table = document.getElementById(tableID);
        // Get indexes for rows which are enabled
        var indexes = getCheckedRowIndexes(table);
        // Get random sub-selection
        var inputFieldID = 'input-' + tableID;
        var total = document.getElementById(inputFieldID).value;
        var subIndexes = getRandomSubSelection(indexes, total);
        // Disable all rows, enable those selected
        setRowsState(table, 'none');
        setRowsStateByIndex(table, 'inherit', subIndexes);
    }
}

function getCheckedRowIndexes(table){
    //
    var indexes = [];
    //
    var tableBody = table.children[1];
    //
    for (var tableRowIndex in tableBody.children){
        // Getting a weird error where item() is last element returned? Skip it.
        if (isNaN(tableRowIndex))
            continue;

        var tableRow = tableBody.children[tableRowIndex];
        // Convert to zero-based index
        var index = tableRow.children[0].innerText - 1;
        // Checkbox is element 1 of table row. Input is sub element (0).
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
    //
    var tbody = table.children[1];
    // Turn off all rows
    for (var index in tbody.children){
        // Getting a weird error where item is last element returned? Skip it.
        if (isNaN(index))
        continue;
        //
        var tableRow = tbody.children[index];
        tableRow.style.display = state;
    } 
}

function setRowsStateByIndex(table, state, indexes){
    //
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

function setRowsCheckboxByClass(classID, isChecked){
    var rows = document.getElementsByClassName(classID);
    for (var i in rows){
        // Getting a weird error where item is last element returned? Skip it.
        if (isNaN(i))
        continue;
        //
        var row = rows[i];
        // Checkbox is element 1 of table row. Input is sub element (0).
        var checkbox = row.children[1].children[0];
        checkbox.checked = isChecked;
    }
}

function setRowsChecked(isChecked){
    setRowsCheckboxByClass('std', isChecked);
    setRowsCheckboxByClass('ax', isChecked);
    setRowsCheckboxByClass('ex', isChecked);
}

function showHideTables(state){
    // Create array to iterate over
    var tableIDs = ['body', 'cockpit', 'booster'];
    // Iterate over each table
    for (var index in tableIDs){
        // Get string from array
        var tableID = tableIDs[index];
        // Get tables from DOM
        var table = document.getElementById(tableID);
        // Disable all rows, enable those selected
        setRowsState(table, state);
    }
}