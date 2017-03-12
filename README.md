# xiuyunyundong
修韵恒创微信公众号开发工程

# 工程下载
从git上下载工程到本地，或者使用git将工程checkout到本地
# 环境准备
## node
安装node
## mysql
安装和启动mysql服务器

# 工程运行
## 1. 安装工程相关lib
0. 启动node，在node客户端中进入工程目录`cd ***`.
1. 进入工程目录，即`package.json`文件所在的目录。
2. 运行`npm install --save-dev`,大概需要几分钟到十几分钟，看网络情况。

## 2. 初始化数据库
1. 打开数据库配置文件`dbconfig/config_default.js`，输入数据库信息。
2. 在工程目录中运行`npm initdb`，等待数据库初始化成功。

## 3. 运行工程
运行`npm run start`

## 4. 访问工程
在浏览器中打开链接
[http://localhost:8080/](http://localhost:8080)
