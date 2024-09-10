# Fake-Bank_Front

home for the Fake bank company

## Start Project

Simply install dependencies and start project

Node version >= 16.20.0

```
yarn
yarn start
```

## Project Structure

```
├── src
│   ├── components    // global components that can be reused
│   ├── pages         // project pages
│   ├── stores        // mobx stores
│   ├── styles        // default style variables for index.scss
│   ├── config        // config styles received from dotenv
|── router            // routing all pages
```

## Tailwind

```
yarn add -D tailwindcss
npx tailwindcss -i ./src/input.css -o ./public/output.css --watch
```

Git Flow 是一种常见的工作流方法，通常用于有多个发布周期和功能开发的项目。它使用了明确的分支命名和结构。

    •	main 或 master：这是主分支，通常代表生产环境的代码。
    •	develop：这是用于开发的主干分支，所有新的功能会合并到这里。
    •	feature/{feature-name}：每个新功能的开发都应该从 develop 分支拉出一个特性分支。
    •	示例：feature/user-login、feature/payment-integration
    •	release/{version}：当准备发布时，从 develop 分支创建一个发布分支。
    •	示例：release/1.0.0
    •	hotfix/{description}：用于紧急修复的分支，从 main 分支拉出并在修复后合并回 main 和 develop。
    •	示例：hotfix/security-patch
    •	bugfix/{issue}：用于从 develop 分支创建的修复特定问题的分支。
    •	示例：bugfix/issue-123

git comment

    •	常见类型：
    •	feat：新功能（feature）
    •	fix：修复 Bug
    •	docs：仅文档更改
    •	style：代码格式（不影响代码逻辑的变动）
    •	refactor：重构（即不是新增功能，也不是修复 Bug 的代码变动）
    •	test：增加或修改测试代码
    •	chore：对构建过程或辅助工具的更改（不影响源代码）
    - <type>: <short summary>
    - [optional body]
    - [optional footer(s)]
