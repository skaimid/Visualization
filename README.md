# 开源可视化项目

## 运行
需要 [node.js](https://nodejs.org/zh-cn/)

```bash
# 安装依赖
npm install 

# 运行项目
npm start
```

打开浏览器访问 http://localhost:3000/

### 国内npm镜像 （推荐使用）

建议不要用cnmp
```bash
npm config set registry https://registry.npmmirror.com/ 
```


## 项目结构

```
├───public                            #静态资源               
└───src
    ├───assets                        # 静态资源（代码可以引用）
    ├───components                    # 可复用的React组件
    └───containers                    # 页面容器
        ├───CompCop                   # 公司合作
        ├───CompLeave                 # 公司流失
        ├───CompParticipate           # 公司参与
        ├───DevLeave                  # 开发者流失
        └───MainPage                  # 主页

```

## 使用的第三方库
- [react](https://zh-hans.reactjs.org/)
- [tailwindcss](https://tailwindcss.com/) inline css
- [react-router](https://reactrouter.com/) 路由
- [d3 d3-sankey](https://d3js.org/) 可视化库
## git 使用 & 分支

最好不要直接提代码到master
- 可以各自开一个dev分支（dev/xxx），然后提交代码到dev分支（并且注意及时将master中发生的合并回dev，以避免冲突），最后合并到master
- 或者fork之后再提pr

推荐软件 [fork](https://git-fork.com/)
