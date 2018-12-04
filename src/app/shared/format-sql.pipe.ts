import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatSql',
})
export class FormatSqlPipe implements PipeTransform {
  transform(text: any, step?: any): any {
    return text ? formatSQL(text, 4) : '';
  }
}

function createShiftArr(step) {
  let space = '    ';

  // tslint:disable-next-line:radix
  if (isNaN(parseInt(step))) {
    // argument is string
    space = step;
  } else {
    // argument is integer
    switch (step) {
      case 1:
        space = ' ';
        break;
      case 2:
        space = '  ';
        break;
      case 3:
        space = '   ';
        break;
      case 4:
        space = '    ';
        break;
      case 5:
        space = '     ';
        break;
      case 6:
        space = '      ';
        break;
      case 7:
        space = '       ';
        break;
      case 8:
        space = '        ';
        break;
      case 9:
        space = '         ';
        break;
      case 10:
        space = '          ';
        break;
      case 11:
        space = '           ';
        break;
      case 12:
        space = '            ';
        break;
    }
  }

  const shift = ['\n']; // array of shifts
  for (let ix = 0; ix < 100; ix++) {
    shift.push(shift[ix] + space);
  }
  return shift;
}

function isSubquery(str, parenthesisLevel) {
  return (
    parenthesisLevel -
    (str.replace(/\(/g, '').length - str.replace(/\)/g, '').length)
  );
}

function split_sql(str, tab) {
  return (
    str
      .replace(/\s{1,}/g, ' ')

      .replace(/ AND /gi, '~::~' + tab + tab + 'AND ')
      .replace(/ BETWEEN /gi, '~::~' + tab + 'BETWEEN ')
      .replace(/ CASE /gi, '~::~' + tab + 'CASE ')
      .replace(/ ELSE /gi, '~::~' + tab + 'ELSE ')
      .replace(/ END /gi, '~::~' + tab + 'END ')
      .replace(/ FROM /gi, '~::~FROM ')
      .replace(/ GROUP\s{1,}BY/gi, '~::~GROUP BY ')
      .replace(/ HAVING /gi, '~::~HAVING ')
      // .replace(/ SET /ig," SET~::~")
      .replace(/ IN /gi, ' IN ')

      .replace(/ JOIN /gi, '~::~JOIN ')
      .replace(/ CROSS~::~{1,}JOIN /gi, '~::~CROSS JOIN ')
      .replace(/ INNER~::~{1,}JOIN /gi, '~::~INNER JOIN ')
      .replace(/ LEFT~::~{1,}JOIN /gi, '~::~LEFT JOIN ')
      .replace(/ RIGHT~::~{1,}JOIN /gi, '~::~RIGHT JOIN ')

      .replace(/ ON /gi, '~::~' + tab + 'ON ')
      .replace(/ OR /gi, '~::~' + tab + tab + 'OR ')
      .replace(/ ORDER\s{1,}BY/gi, '~::~ORDER BY ')
      .replace(/ OVER /gi, '~::~' + tab + 'OVER ')

      .replace(/\(\s{0,}SELECT /gi, '~::~(SELECT ')
      .replace(/\)\s{0,}SELECT /gi, ')~::~SELECT ')

      .replace(/ THEN /gi, ' THEN~::~' + tab + '')
      .replace(/ UNION /gi, '~::~UNION~::~')
      .replace(/ USING /gi, '~::~USING ')
      .replace(/ WHEN /gi, '~::~' + tab + 'WHEN ')
      .replace(/ WHERE /gi, '~::~WHERE ')
      .replace(/ WITH /gi, '~::~WITH ')

      // .replace(/\,\s{0,}\(/ig,",~::~( ")
      // .replace(/\,/ig,",~::~"+tab+tab+"")

      .replace(/ ALL /gi, ' ALL ')
      .replace(/ AS /gi, ' AS ')
      .replace(/ ASC /gi, ' ASC ')
      .replace(/ DESC /gi, ' DESC ')
      .replace(/ DISTINCT /gi, ' DISTINCT ')
      .replace(/ EXISTS /gi, ' EXISTS ')
      .replace(/ NOT /gi, ' NOT ')
      .replace(/ NULL /gi, ' NULL ')
      .replace(/ LIKE /gi, ' LIKE ')
      .replace(/\s{0,}SELECT /gi, 'SELECT ')
      .replace(/\s{0,}UPDATE /gi, 'UPDATE ')
      .replace(/ SET /gi, ' SET ')

      .replace(/~::~{1,}/g, '~::~')
      .split('~::~')
  );
}

function formatSQL(text, step) {
  const ar_by_quote = text
      .replace(/\s{1,}/g, ' ')
      .replace(/\'/gi, '~::~\'')
      .split('~::~'),
    tab = '    ',
    inComment = true,
    inQuote = false,
    shift = step ? createShiftArr(step) : createShiftArr(tab);

  let ix = 0,
    ar = [],
    len = ar_by_quote.length,
    parenthesisLevel = 0,
    deep = 0,
    str = '';

  for (ix = 0; ix < len; ix++) {
    if (ix % 2) {
      ar = ar.concat(ar_by_quote[ix]);
    } else {
      ar = ar.concat(split_sql(ar_by_quote[ix], tab));
    }
  }

  len = ar.length;
  for (ix = 0; ix < len; ix++) {
    parenthesisLevel = isSubquery(ar[ix], parenthesisLevel);

    if (/\s{0,}\s{0,}SELECT\s{0,}/.exec(ar[ix])) {
      ar[ix] = ar[ix].replace(/\,/g, ',\n' + tab + tab + '');
    }

    if (/\s{0,}\s{0,}SET\s{0,}/.exec(ar[ix])) {
      ar[ix] = ar[ix].replace(/\,/g, ',\n' + tab + tab + '');
    }

    if (/\s{0,}\(\s{0,}SELECT\s{0,}/.exec(ar[ix])) {
      deep++;
      str += shift[deep] + ar[ix];
    } else if (/\'/.exec(ar[ix])) {
      if (parenthesisLevel < 1 && deep) {
        deep--;
      }
      str += ar[ix];
    } else {
      str += shift[deep] + ar[ix];
      if (parenthesisLevel < 1 && deep) {
        deep--;
      }
    }
    const junk = 0;
  }

  str = str.replace(/^\n{1,}/, '').replace(/\n{1,}/g, '\n');
  return str;
}
