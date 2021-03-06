To install local clone repo and `$ npm i -g .`

## Grammar
```
<прогр> ::= program <назва> <сп. опер.> end;
<назва>::= <ід.>
<присв.>::= <ід.> = <вираз>
<сп. опер.> ::= <опер.>;|<сп. опер.><опер.>;
<опер.> ::= <присв.> | <введення> | <виведення> | <цикл> | <умов. перехід>
<умов. перехід>::= if <логічний вираз> then <опер.>
<логічний вираз>::=<множ.> && <множ.>|<множ.> || <множ.>
<відношен>::=<множ><оп. відношен.><множ>
<оп. відношен.>::= <|<=|>|>=|==|!=
<введення>::= read(<сп. ід.>)
<виведення>::= write(<сп. ід.>)
<цикл>::= do <ід>:=<вираз> to <вираз> by <кон.> while <вираз> <сп. опер.> end;
<вираз> ::= <множ.> | <вираз> + <множ.> | <вираз> – <множ.> |<вираз> * <множ.> | <вираз> –/ <множ.> |  -<множ.>
<множ.> ::= <ід.>| <кон.> | <вираз>
<ід.>::= <буква> | <ід.> <буква> | <ід.> <цифра>
<кон.>::= <ціле без знаку> | <ціле без знаку>.<ціле без знаку>
<ціле без знаку> ::= <ціле без знаку><цифра> | <цифра>
<буква>::= а | b | . | z
<цифра>::= 0 | 1 | . | 9

```

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
