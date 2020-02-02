/*
    Lazer Technologies Summer 2020 Coding Challenge
    Tailai Wang
    UW CS/BBA '24
*/
var targetTime = document.getElementById('time');
const times = ['9:00', '9:30', '10:00', '10:30', '11:00', '11:30', 
'12:00', '12:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', 
'4:00', '4:30', '5:00', '5:30', '6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00'];

var i, inputToTarget;
for (i = 0; i < times.length; i++){
    if (i % 2 == 0){
        inputToTarget = times[i];
        if (i <= 5){
            targetTime.innerHTML += `<div class = "hourContainer"><p><b><span>${inputToTarget} </b></span><span style = "font-size: 10pt; color: lightgray;">AM</span></p></div>`;
        }else{
            targetTime.innerHTML += `<div class = "hourContainer"><p><b><span>${inputToTarget} </b></span><span style = "font-size: 10pt; color: lightgray;">PM</span></p></div>`;
        }
    }else{
        inputToTarget = times[i];
        targetTime.innerHTML += `<div class = "hourContainer"><p><span style = "color: lightgray; font-size: 10pt;">${inputToTarget}</span></p></div>`;
    }  
}

function compareStarts(a, b) {
    let check = 0;
    if (a.start > b.start){
        check = 1;
    } else if (a.start < b.start){
        check = -1;
    }
    return check;
}

function findBiggestSmall(checkValue, events, current){
    var x;
    for (x = current; x < events.length; x++){
        if (events[x].start >= checkValue){
            return [current, (x - 1)];
        }else if (x == (events.length - 1)){
            return [current, x];
        }
    }
}

function layOutDay (events){

    events = events.sort(compareStarts);
    rangesToAdd = []
    var i;
    for (i = 0; i < events.length; i++){
        var biggestSmall = findBiggestSmall(events[i].end, events, i);
        if (biggestSmall[0] != biggestSmall[1]){
            rangesToAdd.push(biggestSmall);
        }
    }
    var conflicts = new Array(events.length);
    // Possible Change: Difference Array for conflict adding
    var l;
    for (l = 0; l < conflicts.length; l++){
        conflicts[l] = 0;
    }
    var j;
    for (j = 0; j < rangesToAdd.length; j++){
        var k;
        //console.log(j);
        for (k = rangesToAdd[j][0]; k <= rangesToAdd[j][1]; k++){
            conflicts[k] += 1;
        }
    }
    var m;
    for (m = 0; m < events.length; m++){
        events[m] = [conflicts[m], events[m]];
    }
    events = events.sort();
    var n;
    var offsetX = document.getElementById("calendar").offsetLeft + 10;
    var offsetY = document.getElementById("calendar").offsetTop+ 10;
    var currentConflict;
    var currentWidth; 
    var currentStart; 
    var currentEnd;
    var currentHeight;
    var lastWidth = currentWidth;
    var currentPositionX = offsetX;
    var currentPositionY = offsetY;
    var targetCalendar = document.getElementById('calendar');
    for (n = 0; n < events.length; n++){
        currentConflict = events[n][0];
        currentStart = offsetY + events[n][1].start * 29/30;
        currentEnd = offsetY + events[n][1].end * 29/30;
        currentHeight = (currentEnd - currentStart);
        currentWidth = 600 *(1 / (currentConflict + 1));
        if (n == 0){
            targetCalendar.innerHTML += `<div class = "calendarBox" style = "left: ${currentPositionX}px; top: ${currentStart}px; width: ${currentWidth}px; height: ${currentHeight}px;"><h3>Sample Item</h3><p><b>Sample Location</b></p></div>`
            currentPositionY = currentEnd;
            lastWidth = currentWidth;
        }else if (currentStart >= currentPositionY){
            targetCalendar.innerHTML += `<div class = "calendarBox" style = "left: ${currentPositionX}px; top: ${currentStart}px; width: ${currentWidth}px; height: ${currentHeight}px;"><h3>Sample Item</h3><p><b>Sample Location</b></p></div>`
            currentPositionY = currentEnd;
            lastWidth = currentWidth;
        }else if (n + 1 == events.length){
            currentPositionX += lastWidth;
            currentWidth = 600 - lastWidth;
            targetCalendar.innerHTML += `<div class = "calendarBox" style = "left: ${currentPositionX}px; top: ${currentStart}px; width: ${currentWidth}px; height: ${currentHeight}px;"><h3>Sample Item</h3><p><b>Sample Location</b></p></div>` 
        }else{
            currentPositionX += lastWidth;
            targetCalendar.innerHTML += `<div class = "calendarBox" style = "left: ${currentPositionX}px; top: ${currentStart}px; width: ${currentWidth}px; height: ${currentHeight}px;"><h3><b>Sample Item</b></h3><p><b>Sample Location>/b></p></div>`
        }
    }
    

}

layOutDay([{start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610,
    end: 670}]); 

