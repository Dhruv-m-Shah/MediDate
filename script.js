// make a function that updates the pill numbers (innerHTML) when there is an update (from AJAX)

function update_pills() {
    var response = resp.data;
    
    for (drug of response) {
        if (drug.Red != 0) {
            document.getElementById("morning").innerHTML.concat(document.getElementById("morning").innerHTML.concat, "")
        }
    }


    
    
}