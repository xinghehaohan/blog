# 爬坑笔记
```text
记录自己爬过的那些坑, 一般是指耽误在上面的时间长, 真正找到问题所在后又很快解决的问题
```

* RDS构建问题, 迟迟无法构建成功, => npm install 的源切制淘宝
```
# RDS node 基础构建
code.language=nodejs

build.command=npm --python=/usr/alibaba/install/python-3.5.0/bin/python3 --registry=https://registry.npm.taobao.org install --production

build.output=www/
``` 