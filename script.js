// make a function that updates the pill numbers (innerHTML) when there is an update (from AJAX)

var resp = [{"Name": "Advil", "Fill Date": 0, "RX": 0, "Qty": 90, "date-to-take": 0, "Red": 10, "Blue": 20,"Green": 30},
            {"Name": "Tylenol", "Fill Date": 0, "RX": 0, "Qty": 90, "date-to-take": 0, "Red": 0, "Blue": 10,"Green": 0},
            {"Name": "RedBull", "Fill Date": 0, "RX": 0, "Qty": 90, "date-to-take": 0, "Red": 0, "Blue": 0,"Green": 10}];


function update_pills() {
    var current_m = "uy";
    var current_a = ""; // having three 'current's defined is redundant
    var current_e = "";
    var new_d = "";

    for (drug of resp) {
        if (drug.Red != 0) { // CHANGE "RED" VAR NAME
            current_m = document.getElementById("morning").innerHTML;
            new_d = `\n${drug.Name} to have: ${drug.Red}`

            document.getElementById("morning").innerHTML = current_m.concat(current_m, new_d);
        }

        if (drug.Green != 0) { // CHANGE "GREEN" VAR NAME
            current_a = document.getElementById("afternoon").innerHTML;
            new_d = `\n${drug.Name} to have: ${drug.Green}`

            document.getElementById("afternoon").innerHTML = current_a.concat(current_a, new_d);
        }

        if (drug.Blue != 0) { // CHANGE "BLUE" VAR NAME
            current_e = document.getElementById("evening").innerHTML;
            new_d = `\n${drug.Name} to have: ${drug.Blue}`
            
            document.getElementById("evening").innerHTML = current_e.concat(current_e, new_d);
        }
    }


    
   
}
update_pills();