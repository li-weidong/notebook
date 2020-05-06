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
# 
## pathRewrite
proxyTable设置代理解决跨域问题,可以用pathRewrite来改变/***，名称
https://www.cnblogs.com/qdlhj/p/10110116.html

#

### 现在上班这边的这个框架通过点击横幅上的标签导航栏时，参数会默认为第一次打开导航栏时的参数，通过修改第一次打开导航栏时的参数，修复这个bug
在vuex的tags_nav.js这个页面
```javascript
/** 切换标签页 */
  SWITCH_TAG(state, tag) {
      state.activeTag = tag;
      state.tags.forEach((item,index,arr)=>{
          if(arr[index].name===tag.name){
              arr[index]= tag
          }
          
      })
  console.log(state, tag)
 },
        ```