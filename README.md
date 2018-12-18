<p align="center">
    <a href="https://www.iviewui.com">
        <img width="200" src="https://www.paj166.org/dist/td_icon.ico">
    </a>
</p>

# iView-otcPay

## 当前版本：v1.0.0
[网站地址https://www.paj166.org](https://www.paj166.org)

## Install
```bush
// install dependencies
npm install
```
## Run
### Development
```bush
npm run dev
```
### Production(Build)
```bush
npm run build
```

## 简介
&emsp;&emsp;iView-otcPay是基于Vue.js，搭配使用[iView](https://www.iviewui.com) UI组件库形成的一套第三方数字货币支付平台管理系统。

## 功能

- 登录/登出
- 权限管理
    - 列表过滤
    - 权限切换
- 多语言切换
- 错误页面
    - 403页面
    - 404页面
    - 500页面
- 换肤
- 收缩侧边栏
- tag标签导航
- 面包屑导航
- 全屏/退出全屏
- 锁屏
- 消息中心
- 支付方式上传
- 支付列表
- 账单流水
- 钱包中心

## 文件结构
```shell
.
├── build  项目构建配置
└── src
    ├── images  图片文件
    ├── libs  工具方法
    ├── locale  多语言文件
    ├── router  路由配置
    ├── store  状态管理
    ├── styles  样式文件
    ├── template  模板文件
    ├── vendors  公共库文件
    └── views
        ├── apiAccess  接口权限页面
        ├── bill  账单流水页面
        ├── error_page  错误页面
        ├── home  首页
        │   ├── components  首页组件
        ├── international  多语言
        ├── main_components  Main组件
        │   ├── lockscreen  锁屏
        │   ├── shrinkable-menu  可收缩菜单
        │   └── theme-switch  主题切换
        ├── message  消息中心
        ├── moneySite  钱包地址页面
        ├── my_components  业务组件
        │   └── text-editor  富文本编辑器
        ├── own-space  个人中心
        ├── payShow 交易演示
        ├── payWay 支付方式
        ├── setUrl 设置回调（暂时用于支付模拟）
        └── tran_Management 交易详情
```

## Links

- [TalkingData](https://github.com/TalkingData)
- [iView](https://github.com/iview/iview)
- [Vue](https://github.com/vuejs/vue)
- [Webpack](https://github.com/webpack/webpack)


Copyright (c) huanyun_c
