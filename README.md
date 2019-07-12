<div align="center">
  <h1>twinkle-parser</h1>
  <p>
    <a href="https://www.npmjs.com/package/twinkle-parser" target="_blank" rel="noopener">
      <img alt="npm" src="https://img.shields.io/npm/v/twinkle-parser.svg">
    </a>
    <a href="https://codeclimate.com/github/nandenjin/twinkle-parser/maintainability">
      <img src="https://api.codeclimate.com/v1/badges/77e6012b3b82e41c25be/maintainability" />
    </a>
    <span>
      <img src="http://img.shields.io/badge/license-MIT-blue.svg?style=flat">
    </span>
  </p>
  <p>Parse CSV from https://kdb.tsukuba.ac.jp to structured JSON.</p>
</div>

## Usage
### From CLI 
```shell
# In this repo directory
yarn run parse data_from_kdb.csv
```

### As API
```js
const parser = require('twinkle-parser')
const data = parser('CSV string here') // -> KDBData
```

## Output Format
```js
{
  "COURSE_ID": {
  
    "title": "Twinkle",
    
    // Terms & Modules
    // 0 = Spring A, 1 = Spring B, ...
    "termStr": "春AB",
    "terms": [ 0, 1 ],
    
    // Day & Period sets
    "periodStr": "月1-3\n水4-6",
    "periods": [
      // [ Days( 0 = Sun. 1 = Mon. ... ), Periods ]
      [ [ 1 ], [ 0, 1, 2 ] ],
      [ [ 3 ], [ 4, 5, 6 ] ]
    ],
    
    // Rooms
    "rooms": [ "7A106", "7C202" ],
    
    // Instructors
    "instructors": [ "筑波 太郎" ],
    
    // Overview & Remarks
    "overview": "",
    "remarks": ""
    
  }
}
```

## TypeScipt Support
TypeScript supported! 🎉

```ts
// This will be imported with types
import parser from 'twinkle-parser'

// And types for output data are also available
import { KDBData, KDBCourse } from 'twinkle-parser'
```

## Contribution
Issue or PR submissions are welcome.
