# Limited Map

## Install
`npm install limited-map`

## Usage

### limitedMap

```javascript
const limitedMap = require('limited-map');

limitedMap(array, func, {limit:..., qps:..., deltaMS:...}).then(...)
```

* map array
```javascript
console.log(await limitedMap([1,2,3,4], v=>2*v)) // => [2,4,6,8]
```

* except

```javascript
try {
  await limitedMap([2,5,8,11], errorIfEvenNumber) // throw num if num is 5 or 11
} catch (e) {
  // e => 5 
}
```

* default options

`limitedMap([100, 400, 200, 300], asyncFuncMS)`

draw the time line:

```
   :0s-------|1s-------
100:=
200:==
300:===
400:====
```

* options with limit

`limitedMap([100, 400, 200, 300], asyncSleepMS, { limit: 2 })`

draw the time line:

```
   :0s-------|1s-------
100:=
200: ==
400:====
300:   ===
```

* options with qps

`limitedMap([100, 400, 200, 300], asyncSleepMS, { qps: 2 })`

draw the time line:

```
   :0s-------|1s-------
100:=
400:====
200:          ==
300:          ===
```

* options with deltaMs

`limitedMap([100, 400, 200, 300], asyncSleepMS, { deltaMs: 200 })`

draw the time line:

```
   :0s-------|1s-------
100:=
400:  ====
200:    ==
300:      ===
```

* options with limit and deltaMs

`limitedMap([100, 400, 200, 300], asyncSleepMS, { limit: 2, deltaMs: 200 })`

draw the time line:

```
   :0s-------|1s-------
100:=
200:    ==
400:  ====
300:      ===
```

* options with limit and qps

`limitedMap([100, 400, 200, 300], asyncSleepMS, { limit: 1, qps: 2 })`

draw the time line:

```
   :0s-------|1s-------
100:=
400: ====
200:          ==
300:            ===
```

* options with qps and deltaMs

`limitedMap([100, 400, 200, 300], asyncSleepMS, { qps: 2, deltaMs: 200 })`

draw the time line:

```
   :0s-------|1s-------
100:=
400:  ====
200:          ==
300:            ===
```

* options with limit and qps and deltaMs

`limitedMap([100, 400, 200, 300], asyncSleepMS, { limit: 1, qps: 2, deltaMs: 200 })`

draw the time line:

```
   :0s-------|1s-------
100:=
400:  ====
200:          ==
300:            ===
```
