/**
 * 获得带颜色转义字符的控制台输出模板.
 * @param  {String}tmpl        包含标签的模板字符串
 * @param  {boolean}isBright   是否高亮，default false
 * @return {String}
 * @public
 */
function getRichTmpl(tmpl, isBright){
    if(typeof tmpl != 'string'){ return tmpl; }

    var fontStyle = isBright == true ? '\u001b[1m' : '';
    var ESCAPES  = {
        black  : (fontStyle + '\u001b[30m'),
        red    : (fontStyle + '\u001b[31m'),
        green  : (fontStyle + '\u001b[32m'),
        yellow : (fontStyle + '\u001b[33m'),
        orange : (fontStyle + '\u001b[33m'),
        blue   : (fontStyle + '\u001b[34m'),
        pink   : (fontStyle + '\u001b[35m'),
        cyan   : (fontStyle + '\u001b[36m'),
        white  : (fontStyle + '\u001b[37m'),
        noColor: '\u001b[0m'
    }    
    
    var NO_COLOR = ESCAPES.noColor;
    var styleStack = [];
    var reg = new RegExp((
         '(\\\\.)'     // 由\表示的转义字符
       + '|<(\\w+)>'   // 样式开始标签
       + '|</(\\w+)>'  // 样式结束标签
    ), 'g');

    var handleTag = function(str){
        return str.replace(reg, function(m, $1, $2, $3){
            // 若是转义字符之间返回\后面的字符
            if ($1) { return $1.slice(1); }
            
            // 若为不支持的颜色直接忽略，否则返回样式开始字符并将样式压栈
            if ($2) { 
                var style = ESCAPES[$2];
                if(style){
                    styleStack.push(style);
                    return style;
                }else{
                    return m;
                }
            }              
            
            // 若为不支持的颜色直接忽略，否则从样式栈中弹出当前样式并返回
            // 栈顶样式，若栈为空返回系统默认样式
            if ($3) {
                if(ESCAPES[$3]){
                    styleStack.pop();
                    var len = styleStack.length;
                    var topStyle = len > 0 ? styleStack[len - 1] : null;
                    return (topStyle ? topStyle : NO_COLOR);
                }else{
                    return m;
                }
            }
            
            // others 
            return m;
        }) + NO_COLOR; // 最末尾的两个重置用来防止用户标签不闭合进而污染整个控制台输出
    };

    return handleTag(tmpl);
}

/**
 * 向控制台输出彩色文字.
 * @param {String}cont
 * @example
 *   showColorText(
 *      '<red>%s <green>%s</green>! </red>', 
 *      'hello', 
 *      'wold'
 *   );
 * @public
 */
function output(cont){
    // 若用户输入的是一个object则调用系统的console输出object结构
    if(typeof cont != 'string'){
        console.log(cont);
        return;
    }

    var moreArgs = [].slice.call(arguments, 1);
    moreArgs.unshift(getRichTmpl(cont));
    console.log.apply(console, moreArgs);
}

/**
 * 以红色文字向控制台输出错误信息.
 * @param  {String|Object}cont
 * @param  {Object...}
 * @public
 */
function outputError(cont){
    if(typeof cont != 'string'){
        console.log(cont);
    }else{
        var moreArgs = [].slice.call(arguments, 1);
        moreArgs.unshift('<red>' + cont + '</red>');
        output.apply(null, moreArgs);
    }
}

module.exports = {
    getRichTmpl: getRichTmpl,
    error: outputError,
    log: output
}