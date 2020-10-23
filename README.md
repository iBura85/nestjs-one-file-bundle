### Компиляция проекта NESTJS в один файл 

Настройка параметров компиляции в файле **webpack.prod.config.js**

```js
// Имя файла получаеммого при компиляции
const outputFileName = "app-name.js"

// Директория в которую компилируется проект
// Может содержать и абсолютный путь /opt/app/
const outputPath = path.resolve(__dirname, 'app');
```

Запуск компиляции
```console
npm run prod
```
