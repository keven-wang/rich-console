# rich-console

## Purpose

A node.js module let console can output colorful text. like html,
you can set text color throw tag, for example:  
'<green>hellow <cyan>world<cyan>!</green>.
so far the fllowing color was supported: black, red, green, yellow or    
orange, blue, pink, cyan, white.     

## Features
  
 * get rich output template that can be used by console.log
 * output log content 
 * output error content with red color

## Example
```js
  var richConsle = require('rich-console');
  
  // if you need to output many times, recommend to use getRichTmpl
  var tmp1 = richConsle.getRichTmpl('%s <red>%s</red> <green>%s</green> <cyan>%s</cyan>');
  var tmp2 = richConsle.getRichTmpl('%s <red>%s</red> <green>%s</green> <cyan>%s</cyan>', true);
  richConsle.log(tmp1, 'dark version:', 'red', 'green', 'cyan');    // dark linght 
  richConsle.log(tmp2, 'bright verison:', 'red', 'green', 'cyan');  // bright light
  
  // if you output not frequently, can use log or error method
  richConsle.log('<red>a color <pink><cyan>nest</cyan> example, can <red>nested</red> any</pink> times!</red>');
  richConsle.error('a error occured, info: [<cyan>%s</cyan>], please fix and run agin', 'foo error info'); 
```