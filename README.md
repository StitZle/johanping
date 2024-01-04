# Johan-Ping = Johannes + Ping :heart

## How to run
Install Docker on your System. On a Windows Maschine install Docker Desktop for easier Management. 
See Docker Install Docs for help --> https://docs.docker.com/engine/install/ \
For Docker Desktop on Windows --> https://docs.docker.com/desktop/install/windows-install/

After that follow these steps:
1. Start Docker Desktop
2. Clone this Git Repo
3. 


If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
