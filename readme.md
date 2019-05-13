# Limit Map

## Install
`npm install limit-map`

## Usage

### limitMap

```javascript
const limitMap = require('limit-map');

limitMap(array, func, {limit:..., qps:..., deltaMS:...}).then(...)
```

* map array
```javascript
console.log(await limitMap([1,2,3,4], v=>2*v)) // => [2,4,6,8]
```

* except

```javascript
try {
  await limitMap([2,5,8,11], errorIfEvenNumber) // throw num if num is 5 or 11
} catch (e) {
  // e => 5 
}
```

* default options

`limitMap([100, 400, 200, 300], asyncFuncMS)`

draw the time line:

```
   :0s-------|1s-------
100:=
200:==
300:===
400:====
```

* options with limit

`limitMap([100, 400, 200, 300], asyncSleepMS, { limit: 2 })`

draw the time line:

```
   :0s-------|1s-------
100:=
200: ==
400:====
300:   ===
```

* options with qps

`limitMap([100, 400, 200, 300], asyncSleepMS, { qps: 2 })`

draw the time line:

```
   :0s-------|1s-------
100:=
400:====
200:          ==
300:          ===
```

* options with deltaMs

`limitMap([100, 400, 200, 300], asyncSleepMS, { deltaMs: 200 })`

draw the time line:

```
   :0s-------|1s-------
100:=
400:  ====
200:    ==
300:      ===
```

* options with limit and deltaMs

`limitMap([100, 400, 200, 300], asyncSleepMS, { limit: 2, deltaMs: 200 })`

draw the time line:

```
   :0s-------|1s-------
100:=
200:    ==
400:  ====
300:      ===
```

* options with limit and qps

`limitMap([100, 400, 200, 300], asyncSleepMS, { limit: 1, qps: 2 })`

draw the time line:

```
   :0s-------|1s-------
100:=
400: ====
200:          ==
300:            ===
```

* options with qps and deltaMs

`limitMap([100, 400, 200, 300], asyncSleepMS, { qps: 2, deltaMs: 200 })`

draw the time line:

```
   :0s-------|1s-------
100:=
400:  ====
200:          ==
300:            ===
```

* options with limit and qps and deltaMs

`limitMap([100, 400, 200, 300], asyncSleepMS, { limit: 1, qps: 2, deltaMs: 200 })`

draw the time line:

```
   :0s-------|1s-------
100:=
400:  ====
200:          ==
300:            ===
```
