撸了个上传本地指定文件夹最近修改文章到 [ArtiPub](https://github.com/crawlab-team/artipub) 的脚本，需要请自取：

https://gist.github.com/DeppWang/69559dc0ed44e96d80ab12992d6d0ca0

没啥技术含量，大佬请轻喷

## 实现功能

- 上传 `source/posts` 最近修改文章到 ArtiPub，如果文章已存在，更新文章，如果文章已删除，提示已删除

## 使用前提

1. 已安装 npm、node.js
2. 已安装安装模块 axios，安装命令：

```js
npm install axios
```

## 使用方式

1. 下载 `artipub.js` 和 `aritcleid.md`
2. 在 artipub.js 文件中设置 `yourHostIp` 为你的后端 ip+端口
3. 在 artipub.js 文件中设置你的文章路径，默认为 artipub.js 所在路径下的 `source/_posts/`，可改为绝对路径
4. 修改后，运行 `node artipub.js`

