# jsUtils
记录一些我觉得可以的js工具类，可以复用

## 1.react

### 1.1. mobx-react-hooks:

- useStore: 里面有俩个hook函数， useStores  和  useGlobalStore ,其中useStores()需要传个局部状态名称，这样可以直接获取局部状态，useGlobalStore() 是直接获取全局状态变量。

## 2. axios

对 axios 状态进行封装。进行统一处理。

## 3. log

前端打印日志处理，对 default 、primary、success、warning、danger 进行按颜色打印处理。


## 4. dateFormat
对时间函数的的处理，把Date 转换成 "YYYY-mm-dd HH:MM" 格式。

```js
  let date = new Date();
  let new_date = dateFormat("YYYY-mm-dd HH:MM", date);
  console.log(new_date)
```

