var richConsle = require('./index');

console.log(false);
console.log([1, 2, 3, 4, 5]);
console.log(process.argv);

// if you need to output many times, recommend to use getRichTmpl
var tmp1 = richConsle.getRichTmpl('%s <red>%s</red> <green>%s</green> <cyan>%s</cyan>');
var tmp2 = richConsle.getRichTmpl('%s <red>%s</red> <green>%s</green> <cyan>%s</cyan>', true);
richConsle.log(tmp1, 'dark version:', 'red', 'green', 'cyan');    // dark linght 
richConsle.log(tmp2, 'bright verison:', 'red', 'green', 'cyan');  // bright light

// if you output not frequently, can use log or error method
richConsle.log('<red>a color <pink><cyan>nest</cyan> example, can <red>nested</red> any</pink> times!</red>');
richConsle.error('a error occured, info: [<cyan>%s</cyan>], please fix and run agin', 'foo error info'); 