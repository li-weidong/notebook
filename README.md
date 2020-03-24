# notebook

### 把对象变成url格式
```javascript
ObjToUrl(data) {
  var _result = [];
  for (var key in data) {
    var value = data[key];
    if (value.constructor == Array) {
      value.forEach(function(_value) {
        _result.push(key + "=" + _value);
      });
    } else {
      _result.push(key + "=" + value);
    }
  }
  return _result.join("&");
},
```
### 

# pathRewrite
proxyTable设置代理解决跨域问题,可以用pathRewrite来改变/***，名称
https://www.cnblogs.com/qdlhj/p/10110116.html
