# Polux Mods — FS Mobile Mods

Статичний SPA-шаблон у старому pixel/CRT стилі.

## Що змінено
- Українська лишається еталонною мовою сайту.
- Російська додана як звичайна мова в списку мов на сайті.
- Увесь текст сайту, модів і майбутніх заявок проходить через єдину систему перекладу.
- Поля, які не треба перекладати, захищені: `author`, `id`, `slug`, `code`, `url`, `email`, `brand`, `file`, `filename`, `icon`.
- Для HTML можна додати `data-no-translate`, щоб текст не перекладався.
- Для майбутньої бази даних є готові функції:
  - `PoluxTranslator.translateText(text, targetLang, sourceLang)`
  - `PoluxTranslator.translateContent(object, targetLang, sourceLang)`
  - `PoluxTranslator.createTranslatedContent(record)`

## Важливо
Зараз це статичний шаблон без сервера. Для справжнього автоматичного перекладу будь-якого нового тексту від користувачів потрібно буде підключити бекенд/API перекладу. Структура вже підготовлена: українська — джерело, інші мови — результат перекладу, а імена авторів та службові поля не змінюються.


## Демо-акаунти
Додано локальну демо-систему входу/реєстрації без бекенду. Стан користувача зберігається в localStorage (`polux.user`). Пізніше цей модуль можна підключити до API, бази даних і реальних аватарок.

## Firebase / GitHub Pages

Firebase config винесений окремо у `scripts/firebase-config.js`.
Логіка Firebase Auth винесена у `scripts/firebase-auth-service.js`, а UI сайту лишився в `app.js`.

У Firebase Authentication потрібно увімкнути:

- Email/Password
- Google

Для Google обов'язково вибрати `Support email for project`.

Для GitHub Pages додай домен у Firebase:

`Authentication → Settings → Authorized domains`

Наприклад:

`vitaliysh0705.github.io`

Для власного вікна введення нового пароля на сайті потрібно в Firebase налаштувати email template:

`Authentication → Templates → Password reset → Customize action URL`

і вказати URL сайту, наприклад:

`https://vitaliysh0705.github.io/polux-mods-site/`

Тоді посилання з листа відкриє сайт з параметрами `mode=resetPassword&oobCode=...`, і сайт покаже власне вікно нового пароля.
