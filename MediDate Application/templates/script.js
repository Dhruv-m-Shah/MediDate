// make a function that updates the pill numbers (innerHTML) when there is an update (from AJAX)

var resp = [{"Name": "Advil", "Fill Date": 0, "RX": 0, "Qty": 90, "date-to-take": 0, "Red": 10, "Blue": 20,"Green": 30},
            {"Name": "Tylenol", "Fill Date": 0, "RX": 0, "Qty": 90, "date-to-take": 0, "Red": 0, "Blue": 10,"Green": 20},
            {"Name": "RedBull", "Fill Date": 0, "RX": 0, "Qty": 90, "date-to-take": 0, "Red": 0, "Blue": 0,"Green": 10}];


function update_pills() {
    var new_d = "";
    for (drug of resp) {
        if (drug.Red != 0) { // CHANGE "RED" VAR NAME
            new_d = `\n${drug.Name} to have: ${drug.Red}`

            document.getElementById("morning").innerHTML.concat(new_d);
        }
        if (drug.Green != 0) { // CHANGE "GREEN" VAR NAME
            new_d = `\n${drug.Name} to have: ${drug.Green}`

            document.getElementById("afternoon").innerHTML.concat(new_d);
        }
        if (drug.Blue != 0) { // CHANGE "BLUE" VAR NAME
            new_d = `\n${drug.Name} to have: ${drug.Blue}`
            
            document.getElementById("evening").innerHTML.concat(new_d);
        }
    }
}
update_pills();