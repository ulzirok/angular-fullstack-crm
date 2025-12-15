# Проект CRM-системы (учебный проект)

представляет собой **CRM-приложение**, где фронтенд написан на **Angular**, а бэкенд — на **Node.js/Express/MongoDB (Mongoose)**.

## Ссылка: https://astounding-queijadas-f49ea3.netlify.app/login

---

## Структура проекта

- `/client` — Angular фронтенд  
- `/` — Node.js бэкенд с Express и MongoDB  
- `/uploads` — папка для загруженных изображений (на бэкенде)  

---

## Технологии

- Angular 21  
- Node.js / Express  
- MongoDB / Mongoose  
- Passport.js (аутентификация)  
- Materialize CSS  
- Chart.js  

---

## Установка и запуск локально

1. Клонировать репозиторий:
```bash
git clone <ссылка на репозиторий>
cd angular-fullstack-crm

2. Установить зависимости:
cd client
npm install
cd ..
npm install

3. Настроить переменные окружения (для бэкенда):
MONGO_URI — строка подключения к MongoDB
JWT — секретный ключ для JWT аутентификации

4. Запустить бэкенд:
node index.js

5. Запустить фронтенд:
cd client
npm start

## Деплой
Фронтенд — Netlify
Бэкенд — Render
