# ITVACNA

360px min адаптив
поддерживающие проект будут в виде никнеймой на фоне

Сначала я запаривался насчет качества кода, особенно много времени уходило на css, удаление всех магических чисел, максимально все в переменные выносить, порядок свойств. А потом я подумал, что код вряд ли смотреть будут и больше будет упор на что за проект.

Так как я веб разработчик то и frontend я разделил на кучу разных подкатегорий. В дальнейшем, если кто то поможет с категоризацией и новыми вещами, то придется сделать главную категорию и подкатегории более явно

Пофиксить в графике недели и ивенты
Убрать пустые клетки в граифке
Сортировать или сделать по другому тултип
Исправить ошибку при перелистывание элементов в ретйинге

Проверить не мутируется ли у нас dates
крестик в шапке добавить
Ховер сделать правильным
Сортировка в рецтиге

feat: работа с граифками

- добавлен скрол
- возвращен нормальный размер графика
- добавлен moving average
- исправлено отображение крестика в адаптивной шапке
-

## Планы на будущее

- [ ] Возможно исправить ошибки от doiuse, по типу linear-gradient на safari
- [ ] Работа с гит. (CI/CD, husky, precommit, github flow, github action, dotenv push pull)
- [ ] Обработка ошибок на фронте

## Вопросы по проекту

Правильно ли я подключаю svg иконки без svg in js?
Должны ли стили идти подряд? То есть сначала то что выше в html разметке, потом то что ниже

## ПРЯМО СЕЙЧАС

- [ ] Создание readme.md
- [ ] Удалить данные из db
- [ ] ФИКС ОТОБРАЖЕНИЯ НОВЫХ ТЕХНОЛОГИЙ
- [ ] Поправить график. если данные уже загружены то скачет график

## не забывать или под конец или рефакторинг

- [ ] добавлять страницы новые в файлы всякие
- [ ] Поработать с tab-ами
- [ ] naming component
- [ ] skeletonить всё
- [ ] Вынести в .env
- [ ] lighthouse
- [ ] css vars
- [ ] адаптив
- [ ] добавить новые категории
  - [ ] мобильная разработка

## Спорные

- [ ] dto
- [ ] async await
- [ ] env vs const
- [ ] иконки в Safari
- [ ] node best practices
- [ ] Рейтинг сложности технологии
- [ ] Unexpected await inside a loop.
- [ ] слишком много места для категорий
- [ ] сохранять тему (цвета на сайте) в бд?
- [ ] Подумать над несколькими языками (a11y)
- [ ] куда запихнуть файл getNumberOfVacancies
- [ ] Добавить новые npm скрипты: minimize img
- [ ] Подумать об использовании SSG/SSR (critical css)
- [ ] добавить ссылки на обучающие материалы к каждой вещи
- [ ] если не нашлось количестов то помечать и брать среднее между прошлого значения и следющего

## Все

- [ ] Добавить плашку: "Из-за специфичного слова, результаты могут быть некорекнтыми"
- [ ] popup добавить aria или что то такое, потому что боты не увидят текст
- [ ] сделать чтобы в сравнении элементы загружались быстрее
- [ ] вынести localStorage в отедльные переменные
- [ ] добавить кнопку добавить в сравнение
- [ ] Добавить Indeed и другие !!!
- [ ] добавить данные в виде таблицы
- [ ] оптимизировать getTools
- [ ] удалить прослушиватели
- [ ] изменить формат даты
- [ ] webpack настроить
- [ ] hover

- [ ] Пользователь может сам добавлять свои списки (убрать определенные технологии, добавить свои столбцы) и делится ими нужен аккаунт пользователя
- [ ] сделать сноску что +2% по сравнению с месяцем назад итд или что поднялся на 3 позиции вверх сложно
- [ ] добавить комменатрии к определенным датам, гугл увольняет 50% 20.02.2023 этим обуславливается рост итд
- [ ] document.location.href = ${error.response.data.errors[0].captcha_url}&backurl='<http://127.0.0.1:5500/index.html>' попытать удачу с hhru
- [ ] сделать сноску что +2% по сравнению с месяцем назад итд или что поднялся на 3 позиции вверх
- [ ] добавить в бд hh_query_search, в котором показывать какой запрос отправляется при парсинге
- [ ] дорисовать данные или нет если null на графике сделать checkbox
- [ ] не добавлять последнюю дату, чтобы можно было проверить данные
- [ ] Убрать из фильтра определеныне технологии / фильтры в урле
- [ ] сделать либо сохраниние нужной страниц либо показать еще
- [ ] добавить пояснения к технологиям и кто их использует
- [ ] skeleton как точно знать какие размеры у блока будут
- [ ] Авторизация пользователя \ передавать ip или browser
- [ ] Ввод вакансии и анализ какие технологии требуются
- [ ] написать глобальный обработчик ошибок для node js
- [ ] Добавить "самая популярная технология!" итд"
- [ ] возможность удаления из Compare технологий
- [ ] Добавить вывод в виде списка, а не таблицы
- [ ] Добавить роли (например заполнятор, юзер)
- [ ] сделать один раз в неделю
- [ ] Добавить типо форума
- [ ] Поработать с a11y
- [ ] сочетания клавиш
- [ ] Clean-param
- [ ] sitemap.xml
- [ ] canonical
- [ ] Удалить технологии у которых всегда 0
- [ ] Добавить не добавленные вещи в БД
  - [ ] vue router
- [ ] Неиспользуемые пакеты
  - [ ] imagemin
  - [ ] file-loader
  - [ ] postcss-svgo
  - [ ] @svgr/webpack
  - [ ] postcss-cssnext
  - [ ] stylelint-selector-bem-pattern
  - [ ] image-minimizer-webpack-plugin

## anoTodo

- [ ] иконка слева, а не спрва
- [ ] странновато выглядит когда много текста в папках
- [ ] когда много текста в таске, то уменьшатеся зездочка и прочее
- [ ] localization error
- [ ] добавить вспывашки где есть сочетания клавиш
- [ ] добавить возможонсть иметь доступ со всех устройств
- [ ] добавить автоматическую отправку заметок на почту
- [ ] как решать конфликты, если на разных устройствах рахрные такси
- [ ] вынести создание в низ, не очень удобно постоянно щелкать на create Task
- [ ] перенос странный
- [ ] если выбрать завершенно то надо изменить статус задачи
- [ ] trim
- [ ] toLowerCase сделать для поиска
- [ ] по умолчанию сделать активные задачи
- [ ] вместо инпута сделать текстарею
- [ ] показывать число залач
