- Кнопка добавить в сравнение
- Авторизация пользователя
- Прочее: Хотите добавить ваш язык?
- Добавить вывод в виде списка, а не таблицы
- Подумать над вынесением логики в другие компоненты
- Сделать вкладку Сравнить
- Пагинация
- При парсинге, дать возможность работать с сервером (создает дату, но не все элементы есть)
- светлая тема
- вынести фильтры в кнопки
- jsovskoe -> ecosystem js
- добавить иконки к категориям
- добавить "Показать следующие"
- показать рядом с количеством стрелку вверх или вниз
- несколько категорий

---

- Подумать над стилизацией _Select_
- Фильтры в урле
- Дать возможность редактирования списка
- Перепроверить результаты получаемые от HH и Indeed
- Подумать над несколькими языками
- Пофиксить названия категорий
- Добавить не добавленные вещи в БД
- Пользователь может сам добавлять свои списки (убрать определенные технологии, добавить свои столбцы)
- рейтинг сложности технологии

---

- Сделать адаптив под мобилки
- Поработать с tab-ами
- Поработать с a11y
- Подумать об использовании SSG/SSR
- Webpack svg
- head заполнить
- router

// \! chcp 1251
// document.location.href = `${error.response.data.errors[0].captcha_url}&backurl='http://127.0.0.1:5500/index.html'`
-- SELECT _ FROM date_of_completion;
-- SELECT _ FROM count_in_headhunter;
-- SELECT \* FROM count_in_headhunter;

-- DELETE FROM count_in_indeed WHERE date_of_completion >116;
-- DELETE FROM count_in_headhunter WHERE date_of_completion > 116;
-- DELETE FROM date_of_completion WHERE id_date > 116;

-- DROP TABLE Indeed_Global;
-- DROP TABLE \_tables;
-- DROP TABLE job_boards CASCADE;
-- DROP TABLE regions CASCADE;

-- INSERT INTO job_boards(job_board_name) VALUES('Monster');
-- INSERT INTO regions(region_name) VALUES('Russia');

INSERT INTO regions(region_name) VALUES('Russia');

-- CREATE TABLE job_boards (
-- job_board_id SERIAL PRIMARY KEY,
-- job_board_name varchar(30)
-- );

-- CREATE TABLE regions (
-- region_id SERIAL PRIMARY KEY,
-- region_name varchar(30)
-- );

-- CREATE TABLE \_tables (
-- job_board_id integer REFERENCES job_boards(job_board_id),
-- region_id integer REFERENCES regions(region_id),
-- fk_id_table integer
-- );

-- CREATE TABLE Indeed_Global(
-- id_table SERIAL PRIMARY KEY,
-- id_tool integer REFERENCES tools(id_tool),
-- date_of_completion integer REFERENCES date_of_completion(id_date),
-- \_count int
-- );
