// Заглушка для глобальной переменной `gon`, которую инлайнит pug-шаблон
// (см. server/views/index.pug). Раньше её подключали через webpack `externals`.
export default window.gon;
