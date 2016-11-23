To install local clone repo and `$ npm i -g .`

## Grammar
```html
<program>::=<assignment>|<input>|<output>|<loop>|<condition>

// hight level operators
<input>::=read(<сп. id>)
<output>::=write(<сп. id>)
<loop>::=do <declaration> to <boolean expression> by <number> while (<boolean expression>) <program> end

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
## Lexems
| Lexeme | Code     |
| :------------- | :------------- |
| let      | 1      |
| if      | 2     |
| then      | 3     |
| end      | 4     |

## Determinated table

<table>
  <tr>
    <td>1</td>
    <td>
      <table>
        <tr>
          <td>Б</td>
          <td>2</td>
        </tr>
        <tr>
          <td>Ц</td>
          <td>5</td>
        </tr>
        <tr>
          <td>C</td>
          <td>6</td>
        </tr>
      </table>
    </td>
    <td>
      <div>!= Err</div>
    </td>
  </tr>
  <tr>
    <td>2</td>
    <td>
      <table>
        <tr>
          <td>Б</td>
          <td>2</td>
        </tr>
        <tr>
          <td>Ц</td>
          <td>3</td>
        </tr>
      </table>
    </td>
    <td>
      <div>= keyword | err</div>
      <div>!= Err</div>
    </td>
  </tr>
  <tr>
    <td>3</td>
    <td>
      <table>
        <tr>
          <td>Б</td>
          <td>3</td>
        </tr>
        <tr>
          <td>Ц</td>
          <td>3</td>
        </tr>
      </table>
    </td>
    <td>
      <div>= indentifire</div>
      <div>!= Err</div>
    </td>
  </tr>
  <tr>
    <td>4</td>
    <td>
      <table>
        <tr>
          <td>Ц</td>
          <td>4</td>
        </tr>
        <tr>
          <td>.</td>
          <td>5</td>
        </tr>
      </table>
    </td>
    <td>
      <div>!= Err</div>
    </td>
  </tr>
  <tr>
    <td>5</td>
    <td>
      <table>
        <tr>
          <td>Ц</td>
          <td>5</td>
        </tr>
      </table>
    </td>
    <td>
      <div>= Constant</div>
      <div>!= Err</div>
    </td>
  </tr>
  <tr>
    <td>5</td>
    <td>
      <table>
        <tr>
          <td>Ц</td>
          <td>5</td>
        </tr>
      </table>
    </td>
    <td>
      <div>= const</div>
      <div>!= Err</div>
    </td>
  </tr>
  <tr>
    <td>6</td>
    <td>
      <table>
        <tr>
          <td>C</td>
          <td>6</td>
        </tr>
      </table>
    </td>
    <td>
      <div>= keyword | err</div>
      <div>!= Err</div>
    </td>
  </tr>
</table>
