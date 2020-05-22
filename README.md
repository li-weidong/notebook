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

### 表格中的头内容修改，此处可以变成 “  *备注  ”
```javascript
renderHeader: (h, params) => {
                return h("div",{}, [
                  h(
                    "span",
                    {
                      props: {
                        type: "text",
                        size: "small",
                        tooltip: true
                      },
                      style: {
                        cursor: "pointer",
                        padding: "3px",
                        color: "rgb(45, 140, 240)",
                      },
                    },
                    "*"
                  ),
                  ("span", {}, "备注")
                ],);
              },
```

### 此处可以动态修改表格中的数据内容
```javascript
render: (h, params) => {
                return h("div", [
                  h(
                    "span",
                    {
                      props: {
                        type: "text",
                        size: "small",
                        tooltip: true
                      },
                      style: {
                        // cursor: "pointer",
                        padding: "3px"
                        // color: "rgb(45, 140, 240)",
                      },
                      on：{
                        click:()=>{}
                      }
                    },
                    params.row.note
                  ),

                ]);
              }
```
### rend表格里生成动态输入框下拉框输入框单选等
```javascript

 render:(h,params) => {
      return new Utils().createInputNum({
          h,params,
          block:this.block3,
          disabled: !this.editable,
          attr:'lastCost',
          min:0
      })
  }

。。。。
import axios from 'axios';
function  Utils(disc = {},...rest){  
    this.disc = disc;
};
Utils.prototype = {
    getDisc(opt){ //字典查询
        axios.post('a',{
            dictionaryCode:opt.code,
            entryFlag:opt.entryFlag,
        }).then(res => {
            if(res.success == true){
                this.disc[opt.discName] = [];
                res.data.data.forEach(item => {
                    this.disc[opt.discName].push({
                        value:item.value,
                        label:item.label
                    })
                });
                opt.cb && opt.cb(res);
            }else{
                Modal.error({
                    title: srm.common.warn,
                    content: res.msg,
                });
            }
        }).catch((err) => {
            Modal.error({
                title: srm.common.warn,
                content: srm.common.error1,
                error: err.stack.toString(),
            });
        })
    },
    createSpanButton(opt){ //可复制单号
        return (opt.h)('span',{
            props:{
                type:'text',
            },
            style:{
                padding:'3px',
                cursor:'pointer',
                color:'#61b5ef'
            },
            on:{
                click:() => {
                    opt.cb && opt.cb();
                }
            }
        },opt.title)
    },
    createButton(opt){ //可禁用
        return (opt.h)('Button',{
            props:{
                type:'text',
                disabled:opt.disabled,
                icon:opt.icon,
                size:'small'
            },
            style:{
                padding:'3px'
            },
            on:{
                click:() => {
                    opt.cb && opt.cb();
                }
            }
        },opt.title)
    },
    // 生成下拉选择框
    createSelect(opt){
        let options = [];
        this.disc[opt.discName].forEach(item => {
            options.push((opt.h)('Option',{
                props:{
                    value:item.value,
                    label:item.label
                }
            }))
        });
        return (opt.h)('Select',{
            props:{
                value:opt.params.row[opt.attr],
                labeInValue:false,
                clearable:false,
                size:'small',
                disabled:opt.disabled,
                multiple:opt.multiple
            },
            on:{
                'on-change':(val) => {
                    opt.params.row[opt.attr] = val;
                    opt.block.tableData[opt.params.index] = opt.params.row;
                    opt.cb && opt.cb(val);
                }
            }
        },options);
    },
    // 生成输入框
    createInput(opt){
        return (opt.h)('Tooltip',{
            props:{
                content:opt.params.row[opt.attr],
                disabled:opt.params.row[opt.attr] ? false:true,
            }
        },[
            (opt.h)('Input',{
                props:{
                    size:'small',
                    value:opt.params.row[opt.attr],
                    placeholder:opt.placeholder,
                    disabled:opt.disabled,
                },
                on:{
                    'on-change':(e) => {
                        opt.params.row[opt.attr] = e.target.value;
                        opt.block.tableData[opt.params.index] = opt.params.row;
                        opt.cb && opt.cb(e.target.value);
                    }
                }
            })
        ])
       
    },
    // 生成数字输入框
    createInputNum(opt){
        return (opt.h)('InputNumber',{
            props:{
                size:'small',
                value:opt.params.row[opt.attr],
                placeholder:opt.placeholder,
                disabled:opt.disabled,
                min:opt.min
            },
            style:{
                width:'100%',
            },
            on:{
                'on-change':(e) => {
                    opt.params.row[opt.attr] = e;
                    opt.block.tableData[opt.params.index] = opt.params.row;
                    opt.cb && opt.cb(e);
                }
            }
        })
    },
    // 生成单选框
    createCheckbox(opt){
        return (opt.h)('Checkbox',{
            props:{
                value:opt.params.row[opt.attr] === 'Y' ? true :false,
                disabled:opt.disabled
            },
            on:{
                'on-change':(val) => { 
                    opt.params.row[opt.attr] = val ? 'Y' : 'N';
                    opt.block.tableData[opt.params.index] = opt.params.row;
                    opt.cb && opt.cb(val);
                }
            }
        })
    },
    // 生成*
    createSpanX(opt){
        return (opt.h)('div',[(opt.h)('span',{
            style:{
                color:'red'
            }
        },'*'),(opt.h)('span',opt.desc)]);
    },
};
export default Utils;



```