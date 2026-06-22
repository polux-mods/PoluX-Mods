# Polux Mods — FS Mobile Mods

Повноцінний статичний SPA-сайт у pixel/CRT стилі для каталогу модів Farming Simulator Mobile.

## Підключено

- Firebase Web config у `scripts/firebase-config.js`.
- Firebase Authentication у `scripts/firebase-auth-service.js`.
- Email/Password реєстрація та вхід.
- Підтвердження пошти після реєстрації.
- Google Login.
- Відновлення пароля через Firebase.
- Власне вікно введення нового пароля для посилання з Firebase.
- Профіль користувача з ім'ям, email, статусом підтвердження пошти та Google-аватаркою.
- Локалізація незмінних елементів сайту.
- Автоматична система перекладу для змінного контенту з винятками для службових полів.

## Firebase

У Firebase Authentication потрібно увімкнути:

- Email/Password
- Google

Для Google обов'язково вибрати `Support email for project`.

Для GitHub Pages додай домен у Firebase:

`Authentication → Settings → Authorized domains`

Наприклад:

`vitaliysh0705.github.io`

Для власного вікна введення нового пароля на сайті налаштуй email template:

`Authentication → Templates → Password reset → Customize action URL`

і вкажи URL сайту, наприклад:

`https://vitaliysh0705.github.io/polux-mods-site/`

Тоді посилання з листа відкриє сайт з параметрами `mode=resetPassword&oobCode=...`, і сайт покаже власне вікно нового пароля.

## Структура скриптів

- `scripts/firebase-config.js` — конфіг Firebase.
- `scripts/firebase-auth-service.js` — сервіс авторизації Firebase/Google.
- `app.js` — основна логіка інтерфейсу, маршрути, каталог, локалізація.


## Free image mode

Profile avatars and covers do not require Firebase Storage. Images selected from files are compressed in the browser and saved as data URLs in the user document in Firestore. The URL option can still be used for external image links. Enable only Firebase Authentication and Firestore Database for this mode.
