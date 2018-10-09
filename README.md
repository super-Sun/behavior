# behavior
行为验证，检测用户是否正在查看当前页面
# 使用方法
## 引入样式文件
``` key
<link rel="stylesheet" href="behavior/behavior.css">
```
## 引入script
``` key
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
<script src="behavior/behavior.js"></script>
```
## 入参说明

| name | type | isRequired | default | description |
| ------ | ------ | ------ | ------ | ------ |
| countdown | Number | false | 15（s） | 开始展示倒计时的时长 |
| duration | Number/Array<Number> | false | 30（s） | 检测的机制触发的时间间隔，该参数可以是Number类型和可以是Array类型 |
| loop | Number | false | 0 | 循环的次数，-1：表示无限循环、0：表示不循环，只执行一次、所有正整数都有效的循环次数 |
| onStart | Function | false | - | 开始展示倒计时触发的事件绑定 |
| onClick | Function | false | - | 屏幕点击事件绑定 |
| onTimeout | Function | false | - | 倒计时结束后，未点击屏幕的超时事件绑定 |
## 入参注意事项
#### 1.duration：
当为Number类型时，即为传入的检测时间间隔为单个值，可以配合loop，设置循环检测；
当为Array类型时，即传入多个Number类型的集合，如:[30, 30, 45]，此时loop设置的值将不会起作用，
该数组将被理解为，执行三次检测，检测的时间间隔分别为30s、30s、45s
#### 2.onStart：
该事件在展示倒计时页面将要展示而未展示时被触发，用于执行展示倒计时之前的事件，该事件返回一个参数index，为当前的执行的事件的序号，从0开始
#### 3.onClick：
该事件在倒计时页面展示在用户面前时，用户通过点击页面触发该事件，该事件返回一个参数index，为当前的执行的事件的序号，从0开始
#### 4.onTimeout：
该事件在倒计时页面结束后，用户通过为点击页面触发该事件，该事件返回一个参数index，为当前的执行的事件的序号，从0开始

## 举例
#### 1.自定义多次时间间隔
``` key
    var behavior = new Behavior({
        countdown: 15, // *倒计时
        duration: [30, 40, 30], // *倒计时时间间隔
        onStart: function (index) {
            console.log('onStart');
        },
        onClick: function (index) {
            console.log('onClick: ' + index);
        },
        onTimeout: function (index) {
            console.log('onTimeout');
        }
    })
```
#### 2.循环两次执行，即总共执行三次时间间隔为40秒的检测
``` key
    var behavior = new Behavior({
        countdown: 15, // *倒计时
        duration: 40, // *倒计时时间间隔
        loop: 2,
        onStart: function (index) {
            console.log('onStart');
        },
        onClick: function (index) {
            console.log('onClick: ' + index);
        },
        onTimeout: function (index) {
            console.log('onTimeout');
        }
    })
```
#### 3.自定义提示文字后缀：text
``` key
    var behavior = new Behavior({
        countdown: 15, // *倒计时
        duration: 40, // *倒计时时间间隔
        text: '秒内不点击屏幕，将被认定失效！',
        loop: 2,
        onStart: function (index) {
            console.log('onStart');
        },
        onClick: function (index) {
            console.log('onClick: ' + index);
        },
        onTimeout: function (index) {
            console.log('onTimeout');
        }
    })
```
## 实例方法说明
#### reStart
重新启动当前实例的计时
``` key
    behavior.reStart()
```
#### stop
停止计时并且重置当前的实例的内容
``` key
    behavior.stop()
```
#### destroy
销毁当前的实例的内容
``` key
    behavior.destroy()
```
