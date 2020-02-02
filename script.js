// make a function that updates the pill numbers (innerHTML) when there is an update (from AJAX)

function update_pills() {
    var response = resp.data;
    var current_m = "";
    var current_a = ""; // having three 'current's defined is redundant
    var current_e = "";
    var new_d = "";

    for (drug of response) {
        if (drug.Red != 0) { // CHANGE "RED" VAR NAME
            current_m = document.getElementById("morning").innerHTML;
            new_d = `${drug.Name} to have: ${drug.Red}\n`

            document.getElementById("morning").innerHTML = current.concat(current_m, new_d);
        }

        if (drug.Green != 0) { // CHANGE "GREEN" VAR NAME
            current_a = document.getElementById("afternoon").innerHTML;
            new_d = `${drug.Name} to have: ${drug.Green}\n`

            document.getElementById("afternoon").innerHTML = current.concat(current_a, new_d);
        }

        if (drug.Blue != 0) { // CHANGE "BLUE" VAR NAME
            current_e = document.getElementById("evening").innerHTML;
            new_d = `${drug.Name} to have: ${drug.Blue}\n`
            
            document.getElementById("evening").innerHTML = current.concat(current_e, new_d);
        }
    }


    
    
}