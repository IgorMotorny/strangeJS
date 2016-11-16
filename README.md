To install local clone repo and `$ npm i -g .`

## Grammar
```html
<program>::=<assignment>|<input>|<output>|<loop>|<condition>

// hight level operators
<input>::=read(<сп. id>)
<output>::=write(<сп. id>)
<loop>::=do <id>=<expression> to <expression> by <expression> while (<condition>) <сп. оп.> end

// math
<math operator>::=+|-|*|/
<math expression>::=<id><math operator><id>|<math operator><id>

// logical statements
<condition>::=<expression><condition symbol><expression>
<condition symbol>::=<|<=|>|>=|==|!=
<condition>::=if <лог в> then <оп>

// boolean
<boolean expression>::=<any>|<any><boolean operator><any>
<boolean operator>::=<boolean and>|<boolean or>|<boolean not>
<boolean and>::=&&
<boolean or>::=||
<boolean not>::=!

// variable declarations
<id>::=<letter>|<id><letter>|<id><number>
<id list>::=<id>|<id list>, <id>
<declaration>::=let <id list>: <type>
<assignment>::=<id> = <expression>|<declaration> = <expression>

// types
<type>::=number|string|Array|Object|Function|null|undefined|any
<boolean>::=true|false
<number>::=<numeral>|<numeral>.<numeral>
<string>::='*'|"*"
<Array>::=[<any>]|[<any>, <any>]

// lexical primitives
<numeral>::=0|1|2|3|4|5|6|7|8|9
<letter>::=A|B..Z|a|b|..|z

```
