const $ = (q, root = document) => root.querySelector(q);
const $$ = (q, root = document) => [...root.querySelectorAll(q)];

const STORAGE = {
  theme: 'polux.theme', crt: 'polux.crt', lang: 'polux.lang', user: 'polux.user'
};

const LANGS = ['uk','ru','en','pl','de','es','fr'];
const DEFAULT_LANG = 'uk';
const languageNames = {uk:'Українська',ru:'Русский',en:'English',pl:'Polski',de:'Deutsch',es:'Español',fr:'Français'};
const NO_TRANSLATE_FIELDS = new Set(['id','slug','code','url','email','author','authors','creator','username','brand','file','filename','icon']);
const NO_TRANSLATE_TERMS = ['Polux Mods','PLX','T-4A','FS Mobile 20','Farming Simulator Mobile','Farming Simulator Mobile 20','Telegram','Discord','GitHub','Email'];

/*
  Polux translation core.
  Еталонна мова тільки українська: весь текст сайту, модів і майбутніх заявок
  зберігається в одному джерелі українською. Російська додана як звичайна мова
  сайту в списку мов. Усі інші мови отримують текст через translateText().

  Для майбутнього бекенду: поля author, id, slug, code, url, email та елементи з
  data-no-translate не перекладаються. Опис, назва, статус, категорія, вимоги,
  changelog, коментарі й заявки можна проганяти через PoluxTranslator.translateContent().
*/
const UI_UK = {
  loading:'Завантаження модуля...',navHome:'Головна',navMods:'Моди',navAbout:'Проєкт',navContact:"Зв'язок",crtOff:'CRT: увімк.',crtOn:'CRT: вимк.',
  heroTitle:'Мінімалістичний гараж модів у старому піксельному стилі.',
  heroText:'Polux Mods — база якісних модифікацій, техніки, карт і оновлень для мобільного Farming Simulator.',
  viewMods:'Дивитись моди',learnMore:'Детальніше',featureDesign:'Чистий дизайн',
  featureDesignText:'Мінімум шуму, максимум атмосфери: сітка, піксельні акценти, точні відступи.',
  featureSpa:'SPA-переходи',featureSpaText:'Сторінки перемикаються без перезавантаження браузера, з ретро-анімацією.',
  featureFuture:'Онлайн-система',featureFutureText:'Каталог, профілі та авторизація працюють як єдина система Polux Mods.',
  modsTitle:'Каталог модів',modsText:'Офіційний каталог модів Polux Mods з технікою, картами, інструментами та оновленнями для FS Mobile.',searchPlaceholder:'Пошук мода...',allCategories:'Усі категорії',
  aboutTitle:'Про Polux Mods',aboutText:'Polux Mods — повноцінний сайт для модів Farming Simulator Mobile: адаптивний каталог, акаунти користувачів, профілі та зручна навігація.',
  contactTitle:"Зв'язок",contactText:'Зв’яжіться з командою Polux Mods, запропонуйте мод, повідомте про проблему або надішліть ідею для розвитку проєкту.',
  namePlaceholder:"Ваше ім'я",emailPlaceholder:'Email',messagePlaceholder:'Повідомлення',sendMessage:'Надіслати',open:'Відкрити',download:'Завантажити',status:'Статус',category:'Категорія',version:'Версія',game:'Гра',back:'Назад до каталогу',
  universalTemplate:'Сторінка мода містить опис, версію, статус, вимоги, список змін і посилання на завантаження.',
  loginShort:'Вхід',profileTitle:'Профіль',loginTitle:'Вхід',registerTitle:'Реєстрація',authHint:'Увійдіть у Polux Mods або створіть акаунт для профілю, обраних модів і майбутніх можливостей спільноти.',loginTab:'Вхід',registerTab:'Реєстрація',displayName:"Ім\'я профілю",password:'Пароль',loginButton:'Увійти',registerButton:'Створити акаунт',logout:'Вийти',profileGuest:'Ви ще не увійшли.',openLogin:'Увійти або зареєструватись',profileEmail:'Email',profileRole:'Роль',userRole:'Користувач',userRole:'Користувач',avatarFuture:'Аватарка профілю автоматично береться з Google-акаунта або профілю користувача.',menuProfile:'Профіль',menuMyMods:'Мої моди',menuSettings:'Налаштування',menuLogout:'Вихід',confirmPassword:'Підтвердження пароля',showPassword:'Показати пароль',hidePassword:'Сховати пароль',fieldRequired:'Це поле обов’язкове.',emailInvalid:'Введіть коректний email у форматі name@example.com.',passwordsDontMatch:'Паролі не збігаються.',passwordTooShort:'Пароль має містити мінімум 6 символів.',emailVerificationSent:'Ми надіслали лист підтвердження на вашу пошту. Перейдіть за посиланням у листі, потім натисніть «Я вже підтвердив».',verifyEmailBeforeLogin:'Спочатку підтвердіть електронну пошту. Ми можемо надіслати лист ще раз.',resendVerification:'Надіслати лист ще раз',checkVerification:'Я вже підтвердив',verificationStillPending:'Пошта ще не підтверджена. Перевірте лист у папці «Вхідні» або «Спам».',verificationSuccess:'Пошта підтверджена. Вхід виконано.',verificationResent:'Лист підтвердження надіслано ще раз.',firebaseConfigMissing:'Firebase ще не налаштований. Заповни POLUX_FIREBASE_CONFIG в index.html.',authWrongCredentials:'Неправильний email або пароль.',authEmailInUse:'Цей email вже зареєстрований.',authNetworkError:'Немає з’єднання або Firebase недоступний.',emailNotVerifiedBadge:'Пошта очікує підтвердження',emailVerifiedBadge:'Пошта підтверджена'
};

const TRANSLATION_MEMORY = {
  ru: {loading:'Загрузка модуля...',navHome:'Главная',navMods:'Моды',navAbout:'Проект',navContact:'Связь',crtOff:'CRT: вкл.',crtOn:'CRT: выкл.',heroTitle:'Минималистичный гараж модов в старом пиксельном стиле.',heroText:'Polux Mods — будущая база качественных модификаций, техники, карт и обновлений для мобильного Farming Simulator.',viewMods:'Смотреть моды',learnMore:'Подробнее',featureDesign:'Чистый дизайн',featureDesignText:'Минимум шума, максимум атмосферы: сетка, пиксельные акценты, точные отступы.',featureSpa:'SPA-переходы',featureSpaText:'Страницы переключаются без перезагрузки браузера, с ретро-анимацией.',featureFuture:'Онлайн-система',featureFutureText:'Сейчас моды находятся в JS-массиве, но структура подготовлена для API, аккаунтов и админ-панели.',modsTitle:'Каталог модов',modsText:'Официальный каталог модов Polux Mods с техникой, картами, инструментами и обновлениями для FS Mobile.',searchPlaceholder:'Поиск мода...',allCategories:'Все категории',aboutTitle:'О Polux Mods',aboutText:'Polux Mods — полноценный сайт для модов Farming Simulator Mobile: адаптивный каталог, аккаунты пользователей, профили и удобная навигация.',contactTitle:'Связь',contactText:'Здесь позже можно добавить форму, Telegram, Discord, GitHub или админ-панель для заявок на моды.',namePlaceholder:'Ваше имя',emailPlaceholder:'Email',messagePlaceholder:'Сообщение',sendMessage:'Надіслати',open:'Открыть',download:'Скачать',status:'Статус',category:'Категория',version:'Версия',game:'Игра',back:'Назад к каталогу',universalTemplate:'Страница мода содержит описание, версию, статус, требования, список изменений и ссылки на скачивание.',loginShort:'Вход',profileTitle:'Профиль',loginTitle:'Вход',registerTitle:'Регистрация',authHint:'Войдите в Polux Mods или создайте аккаунт для профиля, избранных модов и возможностей сообщества.',loginTab:'Вход',registerTab:'Регистрация',displayName:'Имя профиля',password:'Пароль',loginButton:'Войти',registerButton:'Создать аккаунт',logout:'Выйти',profileGuest:'Вы еще не вошли.',openLogin:'Войти или зарегистрироваться',profileEmail:'Email',profileRole:'Роль',userRole:'Пользователь',userRole:'Пользователь',avatarFuture:'Аватар профиля автоматически берётся из Google-аккаунта или профиля пользователя.',menuProfile:'Профиль',menuMyMods:'Мои моды',menuSettings:'Настройки',menuLogout:'Выход',confirmPassword:'Подтверждение пароля',showPassword:'Показать пароль',hidePassword:'Скрыть пароль',fieldRequired:'Это поле обязательно.',emailInvalid:'Введите корректный email в формате name@example.com.',passwordsDontMatch:'Пароли не совпадают.',passwordTooShort:'Пароль должен содержать минимум 6 символов.',emailVerificationSent:'Мы отправили письмо подтверждения на вашу почту. Перейдите по ссылке в письме, затем нажмите «Я уже подтвердил».',verifyEmailBeforeLogin:'Сначала подтвердите электронную почту. Мы можем отправить письмо еще раз.',resendVerification:'Отправить письмо еще раз',checkVerification:'Я уже подтвердил',verificationStillPending:'Почта еще не подтверждена. Проверьте письмо во «Входящих» или «Спаме».',verificationSuccess:'Почта подтверждена. Вход выполнен.',verificationResent:'Письмо подтверждения отправлено еще раз.',firebaseConfigMissing:'Firebase еще не настроен. Заполните POLUX_FIREBASE_CONFIG в index.html.',authWrongCredentials:'Неправильный email или пароль.',authEmailInUse:'Этот email уже зарегистрирован.',authNetworkError:'Нет соединения или Firebase недоступен.',emailNotVerifiedBadge:'Почта ожидает подтверждения',emailVerifiedBadge:'Почта подтверждена'},
  en: {loading:'Loading module...',navHome:'Home',navMods:'Mods',navAbout:'Project',navContact:'Contact',crtOff:'CRT: on',crtOn:'CRT: off',heroTitle:'A minimalist mod garage in an old pixel style.',heroText:'Polux Mods is a future database of quality modifications, vehicles, maps and updates for mobile Farming Simulator.',viewMods:'View mods',learnMore:'Learn more',featureDesign:'Clean design',featureDesignText:'Less noise, more atmosphere: grid, pixel accents and precise spacing.',featureSpa:'SPA transitions',featureSpaText:'Pages switch without browser reloads, using a retro animation.',featureFuture:'Database-ready',featureFutureText:'Mods are currently stored in a JS array, but the structure is ready for API, accounts and an admin panel.',modsTitle:'Mods catalog',modsText:'A catalog template that can later be filled from a database.',searchPlaceholder:'Search mod...',allCategories:'All categories',aboutTitle:'About Polux Mods',aboutText:'This is a starter site for Farming Simulator Mobile mods. It is built from scratch: responsive, fast, and ready for a future database and account system.',contactTitle:'Contact',contactText:'A form, Telegram, Discord, GitHub or an admin panel for mod requests can be added here later.',namePlaceholder:'Your name',emailPlaceholder:'Email',messagePlaceholder:'Message',sendMessage:'Send',open:'Open',download:'Download',status:'Status',category:'Category',version:'Version',game:'Game',back:'Back to catalog',universalTemplate:'This is a universal mod page template: screenshots, requirements, versions, changelog, download links and comments can be loaded from a database later.',loginShort:'Login',profileTitle:'Profile',loginTitle:'Login',registerTitle:'Registration',authHint:'Sign in to Polux Mods or create an account for your profile, favorite mods, and community features.',loginTab:'Login',registerTab:'Register',displayName:'Profile name',password:'Password',loginButton:'Log in',registerButton:'Create account',logout:'Log out',profileGuest:'You are not logged in yet.',openLogin:'Log in or register',profileEmail:'Email',profileRole:'Role',userRole:'User',userRole:'User',avatarFuture:'The profile avatar is taken automatically from your Google account or user profile.',menuProfile:'Profile',menuMyMods:'My mods',menuSettings:'Settings',menuLogout:'Log out',confirmPassword:'Confirm password',showPassword:'Show password',hidePassword:'Hide password',fieldRequired:'This field is required.',emailInvalid:'Enter a valid email in the format name@example.com.',passwordsDontMatch:'Passwords do not match.',passwordTooShort:'Password must be at least 6 characters.',emailVerificationSent:'We sent a verification email. Open the link in that email, then press “I have confirmed”.',verifyEmailBeforeLogin:'Please verify your email first. We can send the verification email again.',resendVerification:'Send email again',checkVerification:'I have confirmed',verificationStillPending:'Email is not verified yet. Check Inbox or Spam.',verificationSuccess:'Email verified. You are logged in.',verificationResent:'Verification email sent again.',firebaseConfigMissing:'Firebase is not configured yet. Fill POLUX_FIREBASE_CONFIG in index.html.',authWrongCredentials:'Wrong email or password.',authEmailInUse:'This email is already registered.',authNetworkError:'No connection or Firebase is unavailable.',emailNotVerifiedBadge:'Email verification pending',emailVerifiedBadge:'Email verified'},
  pl: {navHome:'Główna',navMods:'Mody',navAbout:'Projekt',navContact:'Kontakt',loading:'Ładowanie modułu...',crtOff:'CRT: wł.',crtOn:'CRT: wył.',heroTitle:'Minimalistyczny garaż modów w starym pikselowym stylu.',heroText:'Polux Mods to przyszła baza jakościowych modyfikacji, maszyn, map i aktualizacji do mobilnego Farming Simulator.',viewMods:'Zobacz mody',learnMore:'Więcej',modsTitle:'Katalog modów',searchPlaceholder:'Szukaj moda...',allCategories:'Wszystkie kategorie',open:'Otwórz',download:'Pobierz',back:'Powrót do katalogu',confirmPassword:'Potwierdź hasło',showPassword:'Pokaż hasło',hidePassword:'Ukryj hasło',fieldRequired:'To pole jest wymagane.',emailInvalid:'Wpisz poprawny email w formacie name@example.com.',passwordsDontMatch:'Hasła nie są takie same.',passwordTooShort:'Hasło musi mieć co najmniej 6 znaków.',emailVerificationSent:'Wysłaliśmy wiadomość weryfikacyjną. Otwórz link w mailu, potem kliknij „Już potwierdziłem”.',verifyEmailBeforeLogin:'Najpierw potwierdź email. Możemy wysłać wiadomość ponownie.',resendVerification:'Wyślij ponownie',checkVerification:'Już potwierdziłem',verificationStillPending:'Email nie jest jeszcze potwierdzony. Sprawdź Odebrane lub Spam.',verificationSuccess:'Email potwierdzony. Zalogowano.',verificationResent:'Wiadomość weryfikacyjna została wysłana ponownie.',firebaseConfigMissing:'Firebase nie jest jeszcze skonfigurowany. Uzupełnij POLUX_FIREBASE_CONFIG w index.html.',authWrongCredentials:'Nieprawidłowy email lub hasło.',authEmailInUse:'Ten email jest już zarejestrowany.',authNetworkError:'Brak połączenia albo Firebase jest niedostępny.',emailNotVerifiedBadge:'Email oczekuje na potwierdzenie',emailVerifiedBadge:'Email potwierdzony'},
  de: {navHome:'Start',navMods:'Mods',navAbout:'Projekt',navContact:'Kontakt',loading:'Modul wird geladen...',crtOff:'CRT: ein',crtOn:'CRT: aus',heroTitle:'Eine minimalistische Mod-Garage im alten Pixel-Stil.',heroText:'Polux Mods ist eine zukünftige Datenbank für hochwertige Mods, Fahrzeuge, Karten und Updates für Farming Simulator Mobile.',viewMods:'Mods ansehen',learnMore:'Mehr erfahren',modsTitle:'Mod-Katalog',searchPlaceholder:'Mod suchen...',allCategories:'Alle Kategorien',open:'Öffnen',download:'Herunterladen',back:'Zurück zum Katalog',confirmPassword:'Passwort bestätigen',showPassword:'Passwort anzeigen',hidePassword:'Passwort ausblenden',fieldRequired:'Dieses Feld ist erforderlich.',emailInvalid:'Gib eine gültige E-Mail im Format name@example.com ein.',passwordsDontMatch:'Die Passwörter stimmen nicht überein.',passwordTooShort:'Das Passwort muss mindestens 6 Zeichen lang sein.',emailVerificationSent:'Wir haben eine Bestätigungs-E-Mail gesendet. Öffne den Link und klicke danach auf „Ich habe bestätigt“.',verifyEmailBeforeLogin:'Bitte bestätige zuerst deine E-Mail. Wir können die E-Mail erneut senden.',resendVerification:'E-Mail erneut senden',checkVerification:'Ich habe bestätigt',verificationStillPending:'E-Mail ist noch nicht bestätigt. Prüfe Posteingang oder Spam.',verificationSuccess:'E-Mail bestätigt. Du bist angemeldet.',verificationResent:'Bestätigungs-E-Mail erneut gesendet.',firebaseConfigMissing:'Firebase ist noch nicht konfiguriert. Fülle POLUX_FIREBASE_CONFIG in index.html aus.',authWrongCredentials:'Falsche E-Mail oder falsches Passwort.',authEmailInUse:'Diese E-Mail ist bereits registriert.',authNetworkError:'Keine Verbindung oder Firebase ist nicht verfügbar.',emailNotVerifiedBadge:'E-Mail-Bestätigung ausstehend',emailVerifiedBadge:'E-Mail bestätigt'},
  es: {navHome:'Inicio',navMods:'Mods',navAbout:'Proyecto',navContact:'Contacto',loading:'Cargando módulo...',crtOff:'CRT: activado',crtOn:'CRT: desactivado',heroTitle:'Un garaje minimalista de mods con estilo píxel antiguo.',heroText:'Polux Mods será una base de datos de modificaciones, vehículos, mapas y actualizaciones de calidad para Farming Simulator Mobile.',viewMods:'Ver mods',learnMore:'Más detalles',modsTitle:'Catálogo de mods',searchPlaceholder:'Buscar mod...',allCategories:'Todas las categorías',open:'Abrir',download:'Descargar',back:'Volver al catálogo',confirmPassword:'Confirmar contraseña',showPassword:'Mostrar contraseña',hidePassword:'Ocultar contraseña',fieldRequired:'Este campo es obligatorio.',emailInvalid:'Introduce un email válido con el formato name@example.com.',passwordsDontMatch:'Las contraseñas no coinciden.',passwordTooShort:'La contraseña debe tener al menos 6 caracteres.',emailVerificationSent:'Enviamos un email de verificación. Abre el enlace del email y luego pulsa “Ya confirmé”.',verifyEmailBeforeLogin:'Primero confirma tu email. Podemos enviar el email otra vez.',resendVerification:'Enviar otra vez',checkVerification:'Ya confirmé',verificationStillPending:'El email aún no está verificado. Revisa Entrada o Spam.',verificationSuccess:'Email verificado. Sesión iniciada.',verificationResent:'Email de verificación enviado otra vez.',firebaseConfigMissing:'Firebase aún no está configurado. Rellena POLUX_FIREBASE_CONFIG en index.html.',authWrongCredentials:'Email o contraseña incorrectos.',authEmailInUse:'Este email ya está registrado.',authNetworkError:'Sin conexión o Firebase no está disponible.',emailNotVerifiedBadge:'Email pendiente de verificación',emailVerifiedBadge:'Email verificado'},
  fr: {navHome:'Accueil',navMods:'Mods',navAbout:'Projet',navContact:'Contact',loading:'Chargement du module...',crtOff:'CRT : activé',crtOn:'CRT : désactivé',heroTitle:'Un garage de mods minimaliste au style pixel rétro.',heroText:'Polux Mods sera une base de données de modifications, véhicules, cartes et mises à jour de qualité pour Farming Simulator Mobile.',viewMods:'Voir les mods',learnMore:'Détails',modsTitle:'Catalogue de mods',searchPlaceholder:'Rechercher un mod...',allCategories:'Toutes les catégories',open:'Ouvrir',download:'Télécharger',back:'Retour au catalogue',confirmPassword:'Confirmer le mot de passe',showPassword:'Afficher le mot de passe',hidePassword:'Masquer le mot de passe',fieldRequired:'Ce champ est obligatoire.',emailInvalid:'Saisis un email valide au format name@example.com.',passwordsDontMatch:'Les mots de passe ne correspondent pas.',passwordTooShort:'Le mot de passe doit contenir au moins 6 caractères.',emailVerificationSent:'Nous avons envoyé un email de vérification. Ouvre le lien, puis appuie sur « J’ai confirmé ».',verifyEmailBeforeLogin:'Confirme d’abord ton email. Nous pouvons renvoyer le message.',resendVerification:'Renvoyer l’email',checkVerification:'J’ai confirmé',verificationStillPending:'L’email n’est pas encore confirmé. Vérifie la boîte de réception ou les spams.',verificationSuccess:'Email confirmé. Connexion effectuée.',verificationResent:'Email de vérification renvoyé.',firebaseConfigMissing:'Firebase n’est pas encore configuré. Remplis POLUX_FIREBASE_CONFIG dans index.html.',authWrongCredentials:'Email ou mot de passe incorrect.',authEmailInUse:'Cet email est déjà enregistré.',authNetworkError:'Pas de connexion ou Firebase indisponible.',emailNotVerifiedBadge:'Email en attente de confirmation',emailVerifiedBadge:'Email confirmé'}
};



Object.assign(UI_UK, {
  adminPanel:'Адмін панель',
  adminPanelTitle:'Адмін панель',
  adminPanelText:'Інструменти модерації користувачів, ролей, скарг і стану сайту.',
  adminOnly:'Доступ тільки для адміністратора або модератора.',
  userModeration:'Модерація користувачів',
  userSearchPlaceholder:'UID, email або ім’я користувача',
  targetUser:'Користувач',
  adminAction:'Дія',
  adminActionBan:'Заблокувати',
  adminActionMute:'Видати мут',
  adminActionUnban:'Зняти блокування',
  adminActionUnmute:'Зняти мут',
  adminActionDelete:'Позначити акаунт видаленим',
  adminActionRole:'Видати роль',
  adminRole:'Роль',
  roleAdministrator:'Адміністратор',
  roleModerator:'Модератор',
  roleUser:'Користувач',
  ratingRoles:'Звання рейтингу',
  roleRookie:'Новачок',
  roleMechanic:'Механік',
  roleDriver:'Водій',
  roleFarmer:'Фермер',
  roleMaster:'Майстер модів',
  roleLegend:'Легенда Polux',
  moderationReason:'Причина',
  moderationSaved:'Дію модерації збережено в базі.',
  moderationLocalSaved:'Дію збережено локально. Firebase/Firestore недоступний.',
  complaints:'Скарги',
  complaintsHint:'Тут будуть скарги користувачів для майбутньої адмін-панелі.',
  siteControls:'Керування сайтом',
  siteMaintenance:'Технічне обслуговування',
  siteHolidayTheme:'Святкова тема',
  publishModsSoon:'Публікація модів і редагування блоків сайту буде додана пізніше.',
  loginOrRegister:'Вхід / Реєстрація'
});

Object.assign(UI_UK, {
  googleLogin:'Увійти через Google', googleRegister:'Зареєструватися через Google', orText:'або', forgotPassword:'Забули пароль?',
  resetTitle:'Відновлення пароля', resetEmailText:'Введіть email, і ми надішлемо посилання для відновлення пароля.', sendResetLink:'Надіслати посилання',
  newPassword:'Новий пароль', confirmNewPassword:'Підтвердження нового пароля', resetPasswordButton:'Змінити пароль', resetEmailSent:'Лист для відновлення пароля надіслано. Перевірте пошту.', resetPasswordSuccess:'Пароль успішно змінено. Тепер можна увійти з новим паролем.', resetLinkInvalid:'Посилання для відновлення недійсне або застаріле.', authPopupClosed:'Вхід через Google скасовано.', googleLoginFailed:'Не вдалося увійти через Google.'
});
const AUTH_EXTRA_TRANSLATIONS = {
  ru:{googleLogin:'Войти через Google',googleRegister:'Зарегистрироваться через Google',orText:'или',forgotPassword:'Забыли пароль?',resetTitle:'Восстановление пароля',resetEmailText:'Введите email, и мы отправим ссылку для восстановления пароля.',sendResetLink:'Отправить ссылку',newPassword:'Новый пароль',confirmNewPassword:'Подтверждение нового пароля',resetPasswordButton:'Изменить пароль',resetEmailSent:'Письмо для восстановления пароля отправлено. Проверьте почту.',resetPasswordSuccess:'Пароль успешно изменен. Теперь можно войти с новым паролем.',resetLinkInvalid:'Ссылка восстановления недействительна или устарела.',authPopupClosed:'Вход через Google отменен.',googleLoginFailed:'Не удалось войти через Google.'},
  en:{googleLogin:'Continue with Google',googleRegister:'Sign up with Google',orText:'or',forgotPassword:'Forgot password?',resetTitle:'Password recovery',resetEmailText:'Enter your email and we will send a password reset link.',sendResetLink:'Send reset link',newPassword:'New password',confirmNewPassword:'Confirm new password',resetPasswordButton:'Change password',resetEmailSent:'Password reset email sent. Check your inbox.',resetPasswordSuccess:'Password changed successfully. You can now log in with the new password.',resetLinkInvalid:'The reset link is invalid or expired.',authPopupClosed:'Google sign-in was cancelled.',googleLoginFailed:'Could not sign in with Google.'},
  pl:{googleLogin:'Zaloguj przez Google',googleRegister:'Zarejestruj przez Google',orText:'albo',forgotPassword:'Nie pamiętasz hasła?',resetTitle:'Odzyskiwanie hasła',resetEmailText:'Wpisz email, a wyślemy link do resetowania hasła.',sendResetLink:'Wyślij link',newPassword:'Nowe hasło',confirmNewPassword:'Potwierdź nowe hasło',resetPasswordButton:'Zmień hasło',resetEmailSent:'Email resetowania hasła został wysłany. Sprawdź pocztę.',resetPasswordSuccess:'Hasło zostało zmienione. Możesz się zalogować nowym hasłem.',resetLinkInvalid:'Link resetowania jest nieprawidłowy lub wygasł.',authPopupClosed:'Logowanie przez Google anulowane.',googleLoginFailed:'Nie udało się zalogować przez Google.'},
  de:{googleLogin:'Mit Google anmelden',googleRegister:'Mit Google registrieren',orText:'oder',forgotPassword:'Passwort vergessen?',resetTitle:'Passwort wiederherstellen',resetEmailText:'Gib deine E-Mail ein, wir senden einen Link zum Zurücksetzen.',sendResetLink:'Link senden',newPassword:'Neues Passwort',confirmNewPassword:'Neues Passwort bestätigen',resetPasswordButton:'Passwort ändern',resetEmailSent:'E-Mail zum Zurücksetzen wurde gesendet. Prüfe deinen Posteingang.',resetPasswordSuccess:'Passwort erfolgreich geändert. Du kannst dich nun anmelden.',resetLinkInvalid:'Der Reset-Link ist ungültig oder abgelaufen.',authPopupClosed:'Google-Anmeldung abgebrochen.',googleLoginFailed:'Anmeldung mit Google fehlgeschlagen.'},
  es:{googleLogin:'Entrar con Google',googleRegister:'Registrarse con Google',orText:'o',forgotPassword:'¿Olvidaste la contraseña?',resetTitle:'Recuperar contraseña',resetEmailText:'Introduce tu email y enviaremos un enlace para restablecer la contraseña.',sendResetLink:'Enviar enlace',newPassword:'Nueva contraseña',confirmNewPassword:'Confirmar nueva contraseña',resetPasswordButton:'Cambiar contraseña',resetEmailSent:'Email de recuperación enviado. Revisa tu correo.',resetPasswordSuccess:'Contraseña cambiada correctamente. Ya puedes entrar con la nueva contraseña.',resetLinkInvalid:'El enlace no es válido o ha caducado.',authPopupClosed:'Inicio con Google cancelado.',googleLoginFailed:'No se pudo iniciar sesión con Google.'},
  fr:{googleLogin:'Continuer avec Google',googleRegister:'S’inscrire avec Google',orText:'ou',forgotPassword:'Mot de passe oublié ?',resetTitle:'Récupération du mot de passe',resetEmailText:'Saisis ton email et nous enverrons un lien de réinitialisation.',sendResetLink:'Envoyer le lien',newPassword:'Nouveau mot de passe',confirmNewPassword:'Confirmer le nouveau mot de passe',resetPasswordButton:'Changer le mot de passe',resetEmailSent:'Email de réinitialisation envoyé. Vérifie ta boîte mail.',resetPasswordSuccess:'Mot de passe modifié. Tu peux maintenant te connecter.',resetLinkInvalid:'Le lien de réinitialisation est invalide ou expiré.',authPopupClosed:'Connexion Google annulée.',googleLoginFailed:'Impossible de se connecter avec Google.'}
};
Object.entries(AUTH_EXTRA_TRANSLATIONS).forEach(([lang, pack]) => Object.assign(TRANSLATION_MEMORY[lang] ||= {}, pack));


// Profile module translations: immutable UI labels are localized here.
const PROFILE_UI_UK = {
  profileSettingsTitle:'Налаштування профілю', profileViewTitle:'Мій профіль', editProfile:'Налаштування', myProfile:'Мій профіль', myModsTitle:'Мої моди',
  addAvatar:'Додати аватарку', replaceAvatar:'Замінити аватарку', removeAvatar:'Видалити аватарку', addCover:'Додати фон', replaceCover:'Замінити фон', removeCover:'Видалити фон',
  chooseFromFile:'З файлу', chooseFromUrl:'З посилання', imageUrl:'Посилання на зображення', save:'Зберегти', cancel:'Скасувати', deleteText:'Видалити', replace:'Замінити', add:'Додати',
  accountName:'Ім’я акаунту', editName:'Змінити ім’я', nameLimitHint:'Ім’я можна змінити не більше 2 разів на місяць.', nameLimitReached:'Ліміт зміни імені вичерпано.', nameAvailableAt:'Наступна зміна буде доступна:', nameTooLong:'Ім’я не може бути довшим за 32 символи.',
  accountBio:'Опис акаунту', addBio:'Додати опис', editBio:'Змінити опис', removeBio:'Видалити опис', bioLimit:'Опис може містити не більше 70 символів.', bioTooLong:'Опис не може бути довшим за 70 символів.', noBio:'Опис ще не додано.',
  changePassword:'Змінити пароль', passwordChangeHint:'Після зміни пароля буде виконано вихід з акаунта.', currentPassword:'Поточний пароль', passwordChangedLogout:'Пароль змінено. Потрібно увійти ще раз.',
  activeSessions:'Активні сесії', sessionsHint:'Сесії фіксуються сайтом Polux Mods для цього браузера. Повне завершення інших пристроїв потребує серверної перевірки Firestore/Cloud Functions.', currentSession:'Поточна сесія', closeSession:'Завершити сесію', closeAllSessions:'Завершити всі', confirmCloseSession:'Завершити цю сесію?', confirmCloseAll:'Завершити всі сесії? Ви вийдете з акаунта на цьому пристрої.',
  deleteAccount:'Видалити акаунт', deleteAccountTitle:'Видалення акаунта', deleteAccountText:'Акаунт буде позначено як видалений. Його можна відновити протягом 30 днів. Після цього дані можуть бути остаточно видалені.', confirmPasswordToDelete:'Підтвердіть пароль для видалення акаунта.', accountDeleted:'Акаунт позначено як видалений. Ви вийшли з системи.', recoverAccount:'Відновити акаунт', recoverAccountText:'Якщо акаунт був видалений менше 30 днів тому, його можна відновити після входу.', accountRecovered:'Акаунт відновлено.',
  userTitles:'Звання', titleUser:'Користувач', titleVerified:'Підтверджений акаунт', titleAuthor:'Автор модів', lastOnline:'Останній онлайн', registeredAt:'Дата реєстрації', registeredFor:'Зареєстрований вже', userRating:'Рейтинг користувача', userMods:'Моди користувача', viewUserMods:'Переглянути моди', comments:'Коментарі', viewComments:'Переглянути коментарі', noComments:'Коментарів поки немає.',
  reportUser:'Поскаржитись', thanksUser:'Надіслати подяку', reportReason:'Причина скарги', reportSpam:'Спам або реклама', reportInsult:'Образи або токсична поведінка', reportFake:'Фейковий профіль або обман', reportRules:'Порушення правил сайту', reportOther:'Інше', reportDetails:'Деталі скарги', reportSent:'Скаргу збережено для адмін-панелі.', thanksConfirm:'Надіслати подяку цьому користувачу? Це додасть +10 до рейтингу.', thanksSent:'Подяку надіслано. Рейтинг користувача підвищено.', thanksLimit:'Ліміт подяк вичерпано або цьому користувачу вже надсилалась подяка.', cantThankSelf:'Не можна надіслати подяку самому собі.',
  defaultCover:'Стандартний фон профілю', accountActions:'Дії акаунта', month:'місяць', day:'день', days:'днів', today:'сьогодні', never:'невідомо', backToProfile:'Назад до профілю', noUserMods:'У цього користувача поки немає модів у базі.', filteredByAuthor:'Фільтр автора активний:', openSettings:'Відкрити налаштування', signOut:'Вийти'
};
Object.assign(UI_UK, PROFILE_UI_UK);
const PROFILE_TRANSLATIONS = {
  ru:{profileSettingsTitle:'Настройки профиля',profileViewTitle:'Мой профиль',editProfile:'Настройки',myProfile:'Мой профиль',myModsTitle:'Мои моды',addAvatar:'Добавить аватар',replaceAvatar:'Заменить аватар',removeAvatar:'Удалить аватар',addCover:'Добавить фон',replaceCover:'Заменить фон',removeCover:'Удалить фон',chooseFromFile:'Из файла',chooseFromUrl:'По ссылке',imageUrl:'Ссылка на изображение',save:'Сохранить',cancel:'Отмена',deleteText:'Удалить',replace:'Заменить',add:'Добавить',accountName:'Имя аккаунта',editName:'Изменить имя',nameLimitHint:'Имя можно изменить не больше 2 раз в месяц.',nameLimitReached:'Лимит смены имени исчерпан.',nameAvailableAt:'Следующая смена будет доступна:',nameTooLong:'Имя не может быть длиннее 32 символов.',accountBio:'Описание аккаунта',addBio:'Добавить описание',editBio:'Изменить описание',removeBio:'Удалить описание',bioLimit:'Описание может содержать не больше 70 символов.',bioTooLong:'Описание не может быть длиннее 70 символов.',noBio:'Описание еще не добавлено.',changePassword:'Изменить пароль',passwordChangeHint:'После смены пароля будет выполнен выход из аккаунта.',currentPassword:'Текущий пароль',passwordChangedLogout:'Пароль изменен. Нужно войти заново.',activeSessions:'Активные сессии',currentSession:'Текущая сессия',closeSession:'Завершить сессию',closeAllSessions:'Завершить все',confirmCloseSession:'Завершить эту сессию?',confirmCloseAll:'Завершить все сессии? Вы выйдете из аккаунта на этом устройстве.',deleteAccount:'Удалить аккаунт',deleteAccountTitle:'Удаление аккаунта',deleteAccountText:'Аккаунт будет отмечен как удаленный. Его можно восстановить в течение 30 дней.',confirmPasswordToDelete:'Подтвердите пароль для удаления аккаунта.',accountDeleted:'Аккаунт отмечен как удаленный. Вы вышли из системы.',recoverAccount:'Восстановить аккаунт',recoverAccountText:'Если аккаунт был удален меньше 30 дней назад, его можно восстановить после входа.',accountRecovered:'Аккаунт восстановлен.',userTitles:'Звания',titleUser:'Пользователь',titleVerified:'Подтвержденный аккаунт',titleAuthor:'Автор модов',lastOnline:'Последний онлайн',registeredAt:'Дата регистрации',registeredFor:'Зарегистрирован уже',userRating:'Рейтинг пользователя',userMods:'Моды пользователя',viewUserMods:'Посмотреть моды',comments:'Комментарии',viewComments:'Посмотреть комментарии',noComments:'Комментариев пока нет.',reportUser:'Пожаловаться',thanksUser:'Отправить благодарность',reportReason:'Причина жалобы',reportSpam:'Спам или реклама',reportInsult:'Оскорбления или токсичное поведение',reportFake:'Фейковый профиль или обман',reportRules:'Нарушение правил сайта',reportOther:'Другое',reportDetails:'Детали жалобы',reportSent:'Жалоба сохранена для админ-панели.',thanksConfirm:'Отправить благодарность этому пользователю? Это добавит +10 к рейтингу.',thanksSent:'Благодарность отправлена. Рейтинг повышен.',thanksLimit:'Лимит благодарностей исчерпан или этому пользователю уже отправлялась благодарность.',cantThankSelf:'Нельзя отправить благодарность самому себе.',defaultCover:'Стандартный фон профиля',accountActions:'Действия аккаунта',month:'месяц',day:'день',days:'дней',today:'сегодня',never:'неизвестно',backToProfile:'Назад к профилю',noUserMods:'У этого пользователя пока нет модов в базе.',filteredByAuthor:'Фильтр автора активен:',openSettings:'Открыть настройки',signOut:'Выйти'},
  en:{profileSettingsTitle:'Profile settings',profileViewTitle:'My profile',editProfile:'Settings',myProfile:'My profile',myModsTitle:'My mods',addAvatar:'Add avatar',replaceAvatar:'Replace avatar',removeAvatar:'Remove avatar',addCover:'Add cover',replaceCover:'Replace cover',removeCover:'Remove cover',chooseFromFile:'From file',chooseFromUrl:'From URL',imageUrl:'Image URL',save:'Save',cancel:'Cancel',deleteText:'Delete',replace:'Replace',add:'Add',accountName:'Account name',editName:'Change name',nameLimitHint:'You can change your name up to 2 times per month.',nameLimitReached:'Name change limit reached.',nameAvailableAt:'Next change will be available:',nameTooLong:'Name cannot be longer than 32 characters.',accountBio:'Account bio',addBio:'Add bio',editBio:'Edit bio',removeBio:'Remove bio',bioLimit:'Bio can contain up to 70 characters.',bioTooLong:'Bio cannot be longer than 70 characters.',noBio:'Bio has not been added yet.',changePassword:'Change password',passwordChangeHint:'After changing the password you will be signed out.',currentPassword:'Current password',passwordChangedLogout:'Password changed. Please sign in again.',activeSessions:'Active sessions',currentSession:'Current session',closeSession:'End session',closeAllSessions:'End all',confirmCloseSession:'End this session?',confirmCloseAll:'End all sessions? You will be signed out on this device.',deleteAccount:'Delete account',deleteAccountTitle:'Delete account',deleteAccountText:'The account will be marked as deleted. It can be restored within 30 days.',confirmPasswordToDelete:'Confirm your password to delete the account.',accountDeleted:'Account marked as deleted. You have been signed out.',recoverAccount:'Recover account',recoverAccountText:'If the account was deleted less than 30 days ago, it can be restored after sign-in.',accountRecovered:'Account recovered.',userTitles:'Titles',titleUser:'User',titleVerified:'Verified account',titleAuthor:'Mod author',lastOnline:'Last online',registeredAt:'Registration date',registeredFor:'Registered for',userRating:'User rating',userMods:'User mods',viewUserMods:'View mods',comments:'Comments',viewComments:'View comments',noComments:'No comments yet.',reportUser:'Report user',thanksUser:'Send thanks',reportReason:'Report reason',reportSpam:'Spam or ads',reportInsult:'Insults or toxic behavior',reportFake:'Fake profile or fraud',reportRules:'Site rules violation',reportOther:'Other',reportDetails:'Report details',reportSent:'Report saved for the admin panel.',thanksConfirm:'Send thanks to this user? This adds +10 rating.',thanksSent:'Thanks sent. User rating increased.',thanksLimit:'Thanks limit reached or thanks already sent to this user.',cantThankSelf:'You cannot thank yourself.',defaultCover:'Default profile cover',accountActions:'Account actions',month:'month',day:'day',days:'days',today:'today',never:'unknown',backToProfile:'Back to profile',noUserMods:'This user has no mods in the database yet.',filteredByAuthor:'Author filter active:',openSettings:'Open settings',signOut:'Sign out'}
};
Object.entries(PROFILE_TRANSLATIONS).forEach(([lang, pack]) => Object.assign(TRANSLATION_MEMORY[lang] ||= {}, pack));

Object.assign(UI_UK, {
  profileId:'ID профілю', adminUserSearch:'Пошук користувача...', adminPickAction:'Виберіть дію', adminMenu:'Меню', moderateUser:'Модерувати', openUserProfile:'Профіль користувача', adminQuickActions:'Швидке адміністрування', adminUsersList:'Користувачі сайту', adminNoUsers:'Користувачів ще немає.', roleSavedToDb:'Роль і дія збережені в базі даних.', userListSynced:'Список підтягнуто з бази даних.', cloudImageSaved:'Фото збережено в профілі Firestore.', cloudUnavailable:'Firebase недоступний — зміни тимчасово збережені локально.', userIdHint:'Короткий публічний номер акаунта Polux Mods.'
});

['pl','de','es','fr'].forEach(lang => Object.assign(TRANSLATION_MEMORY[lang] ||= {}, PROFILE_TRANSLATIONS.en));

const GLOSSARY = {
  ru: {'Моди':'Моды','модів':'модов','мода':'мода','Каталог':'Каталог','Усі категорії':'Все категории','Трактори':'Тракторы','Причепи':'Прицепы','Карти':'Карты','Інструменти':'Инструменты','В розробці':'В разработке','Шаблон':'Шаблон','Концепт':'Концепт','Заплановано':'Запланировано','гусеничного трактора':'гусеничного трактора','з відвальним обладнанням':'с отвальным оборудованием','для майбутньої бази даних':'для будущей базы данных'},
  en: {'Моди':'Mods','модів':'mods','мода':'mod','Каталог':'Catalog','Усі категорії':'All categories','Трактори':'Tractors','Причепи':'Trailers','Карти':'Maps','Інструменти':'Tools','В розробці':'In progress','Шаблон':'Template','Концепт':'Concept','Заплановано':'Planned','гусеничного трактора':'tracked tractor','з відвальним обладнанням':'with blade equipment','для майбутньої бази даних':'for the future database'},
  pl: {'Моди':'Mody','модів':'modów','Трактори':'Ciągniki','Причепи':'Przyczepy','Карти':'Mapy','Інструменти':'Narzędzia','В розробці':'W trakcie','Шаблон':'Szablon','Концепт':'Koncepcja','Заплановано':'Planowane'},
  de: {'Моди':'Mods','модів':'Mods','Трактори':'Traktoren','Причепи':'Anhänger','Карти':'Karten','Інструменти':'Werkzeuge','В розробці':'In Arbeit','Шаблон':'Vorlage','Концепт':'Konzept','Заплановано':'Geplant'},
  es: {'Моди':'Mods','модів':'mods','Трактори':'Tractores','Причепи':'Remolques','Карти':'Mapas','Інструменти':'Herramientas','В розробці':'En progreso','Шаблон':'Plantilla','Концепт':'Concepto','Заплановано':'Planeado'},
  fr: {'Моди':'Mods','модів':'mods','Трактори':'Tracteurs','Причепи':'Remorques','Карти':'Cartes','Інструменти':'Outils','В розробці':'En cours','Шаблон':'Modèle','Концепт':'Concept','Заплановано':'Prévu'}
};

const categoryKeys = {tractors:'Трактори', trailers:'Причепи', maps:'Карти', tools:'Інструменти'};
const statusKeys = {progress:'В розробці', template:'Шаблон', concept:'Концепт', planned:'Заплановано'};

function normalizeLang(lang){
  const code = String(lang || '').slice(0,2).toLowerCase();
  return LANGS.includes(code) ? code : DEFAULT_LANG;
}
function detectLang(){
  const saved = localStorage.getItem(STORAGE.lang);
  if(saved && LANGS.includes(saved)) return saved;
  const browser = normalizeLang(navigator.language || DEFAULT_LANG);
  return LANGS.includes(browser) ? browser : DEFAULT_LANG;
}
function protectNoTranslateTerms(text){
  const protectedValues = [];
  let out = String(text);
  NO_TRANSLATE_TERMS.forEach((term, i) => {
    const token = `__PLX_KEEP_${i}_${protectedValues.length}__`;
    if(out.includes(term)){
      protectedValues.push([token, term]);
      out = out.split(term).join(token);
    }
  });
  return {text: out, protectedValues};
}
function restoreNoTranslateTerms(text, protectedValues){
  let out = String(text);
  protectedValues.forEach(([token, value]) => out = out.split(token).join(value));
  return out;
}
function translateText(text, targetLang = currentLang, sourceLang = DEFAULT_LANG){
  if(text === null || text === undefined || text === '') return '';
  targetLang = normalizeLang(targetLang);
  sourceLang = normalizeLang(sourceLang);
  if(targetLang === sourceLang || targetLang === DEFAULT_LANG) return String(text);

  const protectedText = protectNoTranslateTerms(text);
  const ukKey = sourceLang === DEFAULT_LANG ? protectedText.text : findUkrainianEquivalent(protectedText.text, sourceLang);
  const exact = Object.entries(UI_UK).find(([,v]) => v === ukKey)?.[0];
  if(exact && TRANSLATION_MEMORY[targetLang]?.[exact]){
    return restoreNoTranslateTerms(TRANSLATION_MEMORY[targetLang][exact], protectedText.protectedValues);
  }

  let out = ukKey;
  Object.entries(GLOSSARY[targetLang] || {}).sort((a,b)=>b[0].length-a[0].length).forEach(([from,to]) => {
    out = out.split(from).join(to);
  });
  return restoreNoTranslateTerms(out, protectedText.protectedValues);
}
function findUkrainianEquivalent(text, sourceLang){
  const pack = TRANSLATION_MEMORY[sourceLang] || {};
  const item = Object.entries(pack).find(([,v]) => v === text);
  return item ? UI_UK[item[0]] : text;
}
function t(key){ return currentLang === DEFAULT_LANG ? UI_UK[key] || key : TRANSLATION_MEMORY[currentLang]?.[key] || translateText(UI_UK[key] || key, currentLang); }
function shouldTranslateField(key, value){
  if(NO_TRANSLATE_FIELDS.has(key)) return false;
  if(value === null || value === undefined) return false;
  if(typeof value === 'number' || typeof value === 'boolean') return false;
  return true;
}
function translateContent(value, targetLang = currentLang, sourceLang = DEFAULT_LANG){
  if(Array.isArray(value)) return value.map(item => translateContent(item, targetLang, sourceLang));
  if(value && typeof value === 'object'){
    const out = {};
    Object.entries(value).forEach(([key, val]) => {
      out[key] = shouldTranslateField(key, val) ? translateContent(val, targetLang, value.sourceLang || sourceLang) : val;
    });
    return out;
  }
  if(typeof value === 'string') return translateText(value, targetLang, sourceLang);
  return value;
}
function translateRecord(record, targetLang = currentLang){
  return translateContent(record, targetLang, record.sourceLang || DEFAULT_LANG);
}
function createTranslatedContent(record){
  const sourceLang = normalizeLang(record.sourceLang || DEFAULT_LANG);
  const source = {...record, sourceLang};
  const translations = {};
  LANGS.forEach(lang => translations[lang] = translateRecord(source, lang));
  return {sourceLang, translations};
}
window.PoluxTranslator = {LANGS, DEFAULT_LANG, languageNames, NO_TRANSLATE_FIELDS, NO_TRANSLATE_TERMS, translateText, translateContent, translateRecord, createTranslatedContent};

const modsSource = [
  {id:'t4a-bulldozer', author:'Polux Mods', title:'PLX T-4A Bulldozer', category:categoryKeys.tractors, version:'0.9 beta', game:'FS Mobile 20', status:statusKeys.progress, icon:'🚜', desc:'Концепт гусеничного трактора з відвальним обладнанням для майбутньої бази даних.'},
  {id:'grain-trailer', author:'Polux Mods', title:'PLX Grain Trailer', category:categoryKeys.trailers, version:'1.0 draft', game:'FS Mobile 20', status:statusKeys.template, icon:'▰', desc:'Універсальна картка зернового причепа, підготовлена для майбутньої бази даних.'},
  {id:'pixel-map-pack', author:'Polux Mods', title:'Pixel Farm Map Pack', category:categoryKeys.maps, version:'0.1 concept', game:'FS Mobile 20', status:statusKeys.concept, icon:'▦', desc:'Картка-заглушка для майбутніх карт, скріншотів і списку змін.'},
  {id:'utility-pack', author:'Polux Mods', title:'Polux Utility Pack', category:categoryKeys.tools, version:'0.2', game:'FS Mobile 20', status:statusKeys.planned, icon:'⚙', desc:'Підготовлена сторінка для допоміжних модів, виправлень і невеликих доповнень.'}
];

let currentLang = detectLang();
let currentTheme = localStorage.getItem(STORAGE.theme) || 'amber';
let crtOn = localStorage.getItem(STORAGE.crt) !== 'off';
let authMode = 'login';
let currentUser = readUser();


let firebaseAuth = null;
let pendingVerificationUser = null;

function firebaseConfigReady(){
  const cfg = window.POLUX_FIREBASE_CONFIG || {};
  return !!(cfg.apiKey && cfg.authDomain && cfg.projectId && cfg.appId);
}
function getFirebaseAuth(){
  if(window.PoluxAuthService){
    firebaseAuth = window.PoluxAuthService.getAuth(currentLang);
    return firebaseAuth;
  }
  if(firebaseAuth) return firebaseAuth;
  if(!firebaseConfigReady() || !window.firebase?.initializeApp) return null;
  if(!firebase.apps?.length) firebase.initializeApp(window.POLUX_FIREBASE_CONFIG);
  firebaseAuth = firebase.auth();
  firebaseAuth.languageCode = currentLang;
  return firebaseAuth;
}
function showAuthStatus(message, type='info'){
  const el = $('#authStatus');
  if(!el) return;
  el.textContent = message || '';
  el.className = 'auth-status' + (message ? ' show ' + type : '');
}
function setVerifyActionsVisible(visible){
  $('#verifyActions')?.classList.toggle('hidden', !visible);
}
function authErrorMessage(error){
  const code = error?.code || '';
  if(code.includes('email-already-in-use')) return t('authEmailInUse');
  if(code.includes('wrong-password') || code.includes('invalid-credential') || code.includes('user-not-found')) return t('authWrongCredentials');
  if(code.includes('popup-closed-by-user') || code.includes('cancelled-popup-request')) return t('authPopupClosed');
  if(code.includes('expired-action-code') || code.includes('invalid-action-code')) return t('resetLinkInvalid');
  if(code.includes('network')) return t('authNetworkError');
  return error?.message || t('authNetworkError');
}
async function sendVerification(user){
  if(!user?.sendEmailVerification) return;
  await user.sendEmailVerification({url: location.href.split('#')[0] + '#profile'});
}

function currentMods(){ return modsSource.map(m => translateRecord(m, currentLang)); }

function applyI18n(){
  renderProfileMenuItems?.();
  document.documentElement.lang = currentLang;
  $$('[data-i18n]').forEach(el => { if(!el.closest('[data-no-translate]')) el.textContent = t(el.dataset.i18n); });
  $$('[data-i18n-placeholder]').forEach(el => el.placeholder = t(el.dataset.i18nPlaceholder));
  $$('[data-i18n-title]').forEach(el => { const txt = t(el.dataset.i18nTitle); el.title = txt; el.setAttribute('aria-label', txt); });
  if(firebaseAuth) firebaseAuth.languageCode = currentLang;
  $('#langSelect').value = currentLang;
  $('#crtToggle').textContent = crtOn ? t('crtOff') : t('crtOn');
  
function updateViewportHeight(){
  const h = window.visualViewport ? window.visualViewport.height : window.innerHeight;
  document.documentElement.style.setProperty('--app-height', `${h}px`);
}
function liftFocusedField(){
  const el = document.activeElement;
  if(!el || !el.matches('input, textarea, select')) return;
  setTimeout(() => el.scrollIntoView({block:'center', inline:'nearest', behavior:'smooth'}), 160);
}
updateViewportHeight();
window.visualViewport?.addEventListener('resize', () => { updateViewportHeight(); liftFocusedField(); });
window.visualViewport?.addEventListener('scroll', liftFocusedField);
document.addEventListener('focusin', e => { if(e.target.matches('input, textarea')) liftFocusedField(); });

enhanceCustomSelects(document);
  $$('select').forEach(syncCustomSelect);
  updateProfileButton();
  updateAuthTexts();
}

function applyTheme(){
  document.body.dataset.theme = currentTheme;
  $('#themeSelect').value = currentTheme;
  document.body.classList.toggle('crt-on', crtOn);
  syncCustomSelect($('#themeSelect'));
}

function showBoot(){
  $('#boot').classList.remove('hide');
  setTimeout(() => $('#boot').classList.add('hide'), 520);
}

function route(){
  const hash = location.hash.replace('#','') || 'home';
  showBoot();
  setTimeout(() => {
    const [page, id] = hash.split('/');
    if(page === 'mods' && id) renderMod(id);
    else if(page === 'mods') renderTemplate('modsTemplate', renderMods);
    else if(page === 'my-mods') renderMyModsPage();
    else if(page === 'profile-settings') renderProfileSettingsPage();
    else if(page === 'admin' || page.startsWith('admin?')) renderAdminPanelPage();
    else if(page === 'user' && id) renderTemplate('profileTemplate', () => renderProfile(id));
    else if(page === 'about') renderTemplate('aboutTemplate');
    else if(page === 'contact') renderTemplate('contactTemplate');
    else if(page === 'profile') renderTemplate('profileTemplate', renderProfile);
    else renderTemplate('homeTemplate');
    applyI18n();
    $('#app').focus({preventScroll:true});
    $('#nav').classList.remove('open');
  }, 180);
}

function renderTemplate(templateId, after){
  $('#app').innerHTML = $('#' + templateId).innerHTML;
  if(after) after();
}

function renderMods(){
  const mods = currentMods();
  const sourceCategories = ['all', ...new Set(modsSource.map(m => m.category))];
  $('#categoryFilter').innerHTML = sourceCategories.map(c => `<option value="${c}">${c === 'all' ? t('allCategories') : translateText(c, currentLang)}</option>`).join('');
  enhanceSelect($('#categoryFilter'));
  syncCustomSelect($('#categoryFilter'));
  const paint = () => {
    const q = ($('#searchInput').value || '').toLowerCase();
    const cat = $('#categoryFilter').value;
    const filtered = mods.filter((m, i) => (cat === 'all' || modsSource[i].category === cat) && `${m.title} ${m.desc} ${m.category} ${modsSource[i].title} ${modsSource[i].desc}`.toLowerCase().includes(q));
    $('#modsGrid').innerHTML = filtered.map(m => `
      <article class="mod-card">
        <span class="tag">${m.category}</span>
        <div class="pixel-art">${m.icon}</div>
        <h3>${m.title}</h3>
        <p>${m.desc}</p>
        <footer><span class="status">${m.status}</span><a class="btn" href="#mods/${m.id}" data-link>${t('open')}</a></footer>
      </article>`).join('');
  };
  $('#searchInput').addEventListener('input', paint);
  $('#categoryFilter').addEventListener('change', paint);
  paint();
}

function renderMod(id){
  renderTemplate('modTemplate');
  const base = modsSource.find(x => x.id === id) || modsSource[0];
  const m = translateRecord(base, currentLang);
  $('#modDetail').innerHTML = `
    <a class="btn" href="#mods" data-link>← ${t('back')}</a>
    <div class="mod-detail-cover">${m.icon}</div>
    <p class="eyebrow">${m.category} / ${m.game}</p>
    <h1>${m.title}</h1>
    <p>${m.desc} ${t('universalTemplate')}</p>
    <div class="specs">
      <div><strong>${t('category')}</strong><br>${m.category}</div>
      <div><strong>${t('version')}</strong><br>${m.version}</div>
      <div><strong>${t('game')}</strong><br>${m.game}</div>
      <div><strong>${t('status')}</strong><br>${m.status}</div>
      <div><strong>Author</strong><br><span data-no-translate>${base.author || 'Polux Mods'}</span></div>
    </div>
    <div class="hero-actions"><button class="btn primary" type="button">${t('download')}</button></div>`;
}


function readUser(){
  try { return JSON.parse(localStorage.getItem(STORAGE.user) || 'null'); }
  catch(e){ return null; }
}
function saveUser(user){
  currentUser = user;
  if(user) localStorage.setItem(STORAGE.user, JSON.stringify(user));
  else localStorage.removeItem(STORAGE.user);
  updateProfileButton();
  if(['profile','profile-settings'].includes((location.hash.replace('#','') || 'home'))) route();
}
function defaultAvatarSvg(){
  return `<svg viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="8" fill="none"/><circle cx="32" cy="24" r="12"/><path d="M12 58c3-15 13-22 20-22s17 7 20 22"/></svg>`;
}
function updateProfileButton(){
  const name = $('#profileName');
  const avatar = $('#profileAvatar');
  if(!name || !avatar) return;
  renderProfileMenuItems();
  name.textContent = currentUser ? (currentUser.name || t('userRole')) : t('loginShort');
  if(currentUser?.avatar){
    avatar.innerHTML = `<img src="${currentUser.avatar}" alt="">`;
  } else {
    avatar.innerHTML = defaultAvatarSvg();
  }
}
function setAuthMode(mode){
  authMode = mode === 'register' ? 'register' : 'login';
  $$('.auth-tab').forEach(btn => btn.classList.toggle('active', btn.dataset.mode === authMode));
  $('#nameWrap')?.classList.toggle('hidden', authMode !== 'register');
  $('#confirmWrap')?.classList.toggle('hidden', authMode !== 'register');
  clearAuthErrors();
  updateAuthTexts();
}
function updateAuthTexts(){
  if(!$('#authTitle')) return;
  $('#authTitle').textContent = authMode === 'register' ? t('registerTitle') : t('loginTitle');
  $('#authSubmit').textContent = authMode === 'register' ? t('registerButton') : t('loginButton');
  $('#resendVerificationBtn') && ($('#resendVerificationBtn').textContent = t('resendVerification'));
  $('#checkVerificationBtn') && ($('#checkVerificationBtn').textContent = t('checkVerification'));
  $('#googleAuthBtn [data-i18n]') && ($('#googleAuthBtn [data-i18n]').textContent = t(authMode === 'register' ? 'googleRegister' : 'googleLogin'));
  $('#forgotPasswordBtn') && ($('#forgotPasswordBtn').textContent = t('forgotPassword'));
  $('#resetTitle') && ($('#resetTitle').textContent = t('resetTitle'));
  $('#resetHint') && ($('#resetHint').textContent = t('resetEmailText'));
  $('#sendResetBtn') && ($('#sendResetBtn').textContent = t('sendResetLink'));
  $('#confirmResetBtn') && ($('#confirmResetBtn').textContent = t('resetPasswordButton'));
}
function openAuthModal(mode='login'){
  setAuthMode(mode);
  showAuthStatus('');
  setVerifyActionsVisible(false);
  $('#authModal').classList.add('open');
  $('#authModal').setAttribute('aria-hidden','false');
  setTimeout(() => $('#authEmail')?.focus(), 80);
}
function closeAuthModal(){
  $('#authModal').classList.remove('open');
  $('#authModal').setAttribute('aria-hidden','true');
  clearAuthErrors();
  showAuthStatus('');
  setVerifyActionsVisible(false);
}
function clearAuthErrors(){
  $$('.field').forEach(f => f.classList.remove('invalid'));
  $$('.field-error').forEach(e => e.textContent = '');
}
function setFieldError(inputId, errorId, message){
  const input = $('#' + inputId);
  const err = $('#' + errorId);
  input?.closest('.field')?.classList.add('invalid');
  if(err) err.textContent = message;
}
function isValidEmail(email){
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}
function validateAuthForm(){
  clearAuthErrors();
  let ok = true;
  const name = $('#authName')?.value.trim() || '';
  const email = $('#authEmail')?.value.trim() || '';
  const pass = $('#authPassword')?.value || '';
  const confirm = $('#authPasswordConfirm')?.value || '';
  if(authMode === 'register' && !name){ setFieldError('authName','nameError',t('fieldRequired')); ok = false; }
  if(!email){ setFieldError('authEmail','emailError',t('fieldRequired')); ok = false; }
  else if(!isValidEmail(email)){ setFieldError('authEmail','emailError',t('emailInvalid')); ok = false; }
  if(!pass){ setFieldError('authPassword','passwordError',t('fieldRequired')); ok = false; }
  else if(pass.length < 6){ setFieldError('authPassword','passwordError',t('passwordTooShort')); ok = false; }
  if(authMode === 'register'){
    if(!confirm){ setFieldError('authPasswordConfirm','confirmError',t('fieldRequired')); ok = false; }
    else if(pass && confirm !== pass){ setFieldError('authPasswordConfirm','confirmError',t('passwordsDontMatch')); ok = false; }
  }
  return ok;
}
function renderProfileMenuItems(){
  const menu = $('#profileMenu');
  if(!menu) return;
  if(currentUser){
    menu.innerHTML = `
      <button type="button" role="menuitem" data-profile-action="profile">${t('menuProfile')}</button>
      <button type="button" role="menuitem" data-profile-action="mods">${t('menuMyMods')}</button>
      <button type="button" role="menuitem" data-profile-action="settings">${t('menuSettings')}</button>
      <button type="button" role="menuitem" data-profile-action="logout">${t('menuLogout')}</button>`;
  }else{
    menu.innerHTML = `<button type="button" role="menuitem" data-profile-action="login">${t('loginOrRegister')}</button>`;
  }
}

function positionProfileMenu(){
  const btn = $('#profileBtn');
  const menu = $('#profileMenu');
  const wrap = $('#profileWrap');
  if(!btn || !menu || !wrap?.classList.contains('open')) return;
  const rect = btn.getBoundingClientRect();
  const gap = 8, margin = 10;
  const width = Math.min(190, window.innerWidth - margin * 2);
  const left = Math.min(Math.max(rect.right - width, margin), window.innerWidth - width - margin);
  const top = rect.bottom + gap;
  menu.style.position = 'fixed';
  menu.style.left = left + 'px';
  menu.style.right = 'auto';
  menu.style.top = top + 'px';
  menu.style.width = width + 'px';
  menu.style.maxHeight = Math.max(130, window.innerHeight - top - margin) + 'px';
}
function profileKey(uid){ return 'polux.profile.' + (uid || currentUser?.uid || currentUser?.email || 'guest'); }
function allProfilesKey(){ return 'polux.profiles.index'; }
function publicUserId(uid){
  const src = String(uid || 'local'); let hash = 0;
  for(let i=0;i<src.length;i++) hash = ((hash << 5) - hash + src.charCodeAt(i)) >>> 0;
  return 'PLX-' + String(hash % 1000000).padStart(6,'0');
}
function escapeHtml(value){ return String(value ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
async function compressImageToDataUrl(file, kind='avatar'){
  const maxSide = kind === 'cover' ? 1280 : 420;
  const quality = kind === 'cover' ? .78 : .82;
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const ctx = canvas.getContext('2d');
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL('image/jpeg', quality);
}
function upsertProfileIndex(profile){
  const index = JSON.parse(localStorage.getItem(allProfilesKey()) || '{}');
  index[profile.uid] = {uid:profile.uid, publicId:profile.publicId || publicUserId(profile.uid), name:profile.name, avatar:profile.avatar, cover:profile.cover, rating:profile.rating, email:profile.email, roles:profile.roles, mutedUntil:profile.mutedUntil || null, bannedUntil:profile.bannedUntil || null, deletedAt:profile.deletedAt || null, updatedAt:profile.updatedAt || profile.lastOnline || ''};
  localStorage.setItem(allProfilesKey(), JSON.stringify(index));
}

const POLUX_OWNER_EMAILS = ['vitaliysh0705@gmail.com'];
function normalizeRole(role){ return String(role || '').trim(); }
function hasRole(profile, role){ return (profile?.roles || []).includes(role); }
function isAdminProfile(profile){ return hasRole(profile, 'roleAdministrator') || hasRole(profile, 'roleModerator'); }
function ratingRoleKeys(rating=0){
  const score = Number(rating || 0);
  if(score >= 1000) return ['roleLegend'];
  if(score >= 500) return ['roleMaster'];
  if(score >= 250) return ['roleFarmer'];
  if(score >= 100) return ['roleDriver'];
  if(score >= 30) return ['roleMechanic'];
  return ['roleRookie'];
}
function baseAccessRoles(user=currentUser, base={}){
  const roles = new Set(base.roles || []);
  roles.add('roleUser');
  if(user?.emailVerified) roles.add('titleVerified');
  if(user?.email && POLUX_OWNER_EMAILS.includes(String(user.email).toLowerCase())) roles.add('roleAdministrator');
  return [...roles];
}
async function syncProfileToCloud(profile){
  try{ await window.PoluxDbService?.saveUserProfile?.(profile); }catch(_){}
}
async function pullProfileFromCloud(uid=currentUser?.uid){
  try{
    const cloud = await window.PoluxDbService?.getUserProfile?.(uid);
    if(cloud && uid){
      const local = readProfile(uid);
      const merged = {...local, ...cloud, uid, publicId:cloud.publicId || publicUserId(uid)};
      localStorage.setItem(profileKey(uid), JSON.stringify(merged));
      upsertProfileIndex(merged);
      return merged;
    }
  }catch(_){}
  return null;
}
async function syncUsersIndexFromCloud(){
  try{
    const list = await window.PoluxDbService?.getAllUserProfiles?.(100);
    if(!list?.length) return [];
    list.forEach(profile => {
      const p = {...profile, uid:profile.uid, publicId:profile.publicId || publicUserId(profile.uid)};
      localStorage.setItem(profileKey(p.uid), JSON.stringify({...readProfile(p.uid), ...p}));
      upsertProfileIndex(p);
    });
    return list;
  }catch(_){ return []; }
}
function sessionId(){
  let id = localStorage.getItem('polux.session.id');
  if(!id){ id = 's_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2,8); localStorage.setItem('polux.session.id', id); }
  return id;
}
function readProfile(uid=currentUser?.uid){
  const own = !uid || uid === currentUser?.uid || uid === currentUser?.email;
  const user = own ? (currentUser || {}) : {};
  const keyUid = uid || user.uid || user.email || 'local';
  const raw = localStorage.getItem(profileKey(keyUid));
  const now = new Date().toISOString();
  const base = raw ? JSON.parse(raw) : {};
  const profileUid = uid || user.uid || base.uid || user.email || 'local';
  return {
    uid: profileUid,
    publicId: base.publicId || publicUserId(profileUid),
    name: base.name || user.name || user.email?.split('@')[0] || (own ? t('userRole') : profileUid),
    email: base.email || user.email || '',
    avatar: base.avatar || user.avatar || '', cover: base.cover || '', bio: base.bio || '',
    roles: [...new Set([...baseAccessRoles(user, base), ...ratingRoleKeys(Number(base.rating || 0))])],
    rating: Number(base.rating || 0), modsCount: Number(base.modsCount || 0), comments: base.comments || [],
    createdAt: base.createdAt || user.metadata?.creationTime || now, lastOnline: base.lastOnline || now,
    nameChanges: base.nameChanges || [], deletedAt: base.deletedAt || null,
    thanksFrom: base.thanksFrom || {}, reports: base.reports || [], sessions: base.sessions || [],
    mutedUntil: base.mutedUntil || null, bannedUntil: base.bannedUntil || null, updatedAt: base.updatedAt || now
  };
}
function writeProfile(profile){
  profile.lastOnline = new Date().toISOString();
  localStorage.setItem(profileKey(profile.uid), JSON.stringify(profile));
  profile.publicId = profile.publicId || publicUserId(profile.uid);
  upsertProfileIndex(profile);
  syncProfileToCloud(profile);
  if(currentUser && (profile.uid === currentUser.uid || profile.email === currentUser.email)){
    currentUser = {...currentUser, name:profile.name, avatar:profile.avatar};
    localStorage.setItem(STORAGE.user, JSON.stringify(currentUser));
    updateProfileButton();
  }
}
function touchSession(){
  if(!currentUser) return;
  const p = readProfile();
  const ua = navigator.userAgent;
  const item = {id:sessionId(), userAgent:ua, browser:detectBrowser(), platform:navigator.platform || 'Android', language:navigator.language || currentLang, lastSeen:new Date().toISOString(), current:true};
  p.sessions = [item, ...(p.sessions || []).filter(s => s.id !== item.id)].slice(0, 8);
  writeProfile(p);
}
function detectBrowser(){ const ua=navigator.userAgent; if(/Edg/i.test(ua)) return 'Edge'; if(/Firefox/i.test(ua)) return 'Firefox'; if(/OPR|Opera/i.test(ua)) return 'Opera'; if(/Chrome/i.test(ua)) return 'Chrome'; if(/Safari/i.test(ua)) return 'Safari'; return 'Browser'; }
function formatDateShort(value){ if(!value) return t('never'); try{return new Date(value).toLocaleDateString(currentLang,{year:'numeric',month:'short',day:'numeric'});}catch(e){return value;} }
function daysRegistered(value){ const d=value?new Date(value):new Date(); const days=Math.max(0,Math.floor((Date.now()-d.getTime())/86400000)); return days===0?t('today'):`${days} ${days===1?t('day'):t('days')}`; }
function defaultCover(){ return `<div class="profile-cover-default"><span>POLUX MODS</span><small>${t('defaultCover')}</small></div>`; }
function profileAvatarHtml(p, big=true){ return p.avatar ? `<img src="${p.avatar}" alt="">` : defaultAvatarSvg(); }
function ensureCurrentProfile(){ if(!currentUser) return null; const p=readProfile(); writeProfile(p); touchSession(); return readProfile(); }

async function renderProfile(viewUid){
  const box = $('#profileView');
  if(!box) return;
  if(!currentUser){
    box.innerHTML = `<div class="profile-empty"><div class="profile-big-avatar">${defaultAvatarSvg()}</div><p>${t('profileGuest')}</p><button class="btn primary" type="button" id="profileLoginBtn">${t('openLogin')}</button></div>`;
    $('#profileLoginBtn').addEventListener('click', () => openAuthModal('login'));
    return;
  }
  const ownProfile = ensureCurrentProfile();
  let p = ownProfile;
  if(viewUid && viewUid !== ownProfile.uid){
    p = readProfile(viewUid);
    const cloud = await pullProfileFromCloud(viewUid);
    if(cloud) p = cloud;
  }
  if(p.deletedAt){
    const canRecover = Date.now() - new Date(p.deletedAt).getTime() <= 30*86400000;
    box.innerHTML = `<div class="profile-empty"><div class="profile-big-avatar">${profileAvatarHtml(p)}</div><h2>${t('recoverAccount')}</h2><p>${t('recoverAccountText')}</p>${canRecover?`<button class="btn primary" id="recoverAccountBtn">${t('recoverAccount')}</button>`:''}</div>`;
    $('#recoverAccountBtn')?.addEventListener('click', () => { p.deletedAt=null; writeProfile(p); alert(t('accountRecovered')); renderProfile(); });
    return;
  }
  const isOwn = !viewUid || viewUid === ownProfile.uid;
  const canModerate = !isOwn && isAdminProfile(ownProfile);
  const roles = (p.roles || ['titleUser']).map(r => `<span class="profile-rank">${t(r)}</span>`).join('');
  const commentsCount = (p.comments || []).length;
  const modsByUser = modsSource.filter(m => (m.author || '').toLowerCase() === (p.name || '').toLowerCase());
  box.innerHTML = `
    <div class="profile-hero-card">
      <div class="profile-cover">${p.cover ? `<img src="${p.cover}" alt="">` : defaultCover()}</div>
      <div class="profile-headline">
        <div class="profile-big-avatar floating">${profileAvatarHtml(p)}</div>
        <div class="profile-main-info">
          <h2 data-no-translate>${escapeHtml(p.name)}</h2>
          <div class="profile-public-id"><span>${t('profileId')}</span><b>${p.publicId || publicUserId(p.uid)}</b></div>
          <div class="profile-ranks">${roles}</div>
          ${p.bio ? `<p class="profile-bio" data-auto-translate>${translateText(p.bio,currentLang)}</p>` : ''}
        </div>
      </div>
      <div class="profile-stats-grid">
        <div><strong>${t('lastOnline')}</strong><span>${formatDateShort(p.lastOnline)}</span></div>
        <div><strong>${t('registeredAt')}</strong><span>${formatDateShort(p.createdAt)} · ${t('registeredFor')} ${daysRegistered(p.createdAt)}</span></div>
        <div><strong>${t('profileId')}</strong><span>${p.publicId || publicUserId(p.uid)}</span><small>${t('userIdHint')}</small></div>
        <div><strong>${t('userRating')}</strong><span>${p.rating}</span></div>
        <button class="stat-button" type="button" id="viewUserMods"><strong>${t('userMods')}</strong><span>${modsByUser.length || p.modsCount} · ${t('viewUserMods')}</span></button>
        <button class="stat-button" type="button" id="viewUserComments"><strong>${t('comments')}</strong><span>${commentsCount} · ${t('viewComments')}</span></button>
      </div>
      <div class="profile-actions-row">
        ${isOwn ? `${isAdminProfile(p)?`<button class="btn admin-panel-btn" id="openAdminPanel">${t('adminPanel')}</button>`:''}<button class="btn primary" id="openProfileSettings">${t('openSettings')}</button><button class="btn" id="profileLogoutBtn">${t('signOut')}</button>` : `${canModerate?`<button class="btn admin-panel-btn" id="moderateViewedUser">${t('moderateUser')}</button>`:''}<button class="btn danger-soft" id="reportUserBtn">${t('reportUser')}</button><button class="btn primary" id="thanksUserBtn">${t('thanksUser')}</button>`}
      </div>
    </div>`;
  $('#openAdminPanel')?.addEventListener('click', () => location.hash = '#admin');
  $('#openProfileSettings')?.addEventListener('click', () => location.hash = '#profile-settings');
  $('#moderateViewedUser')?.addEventListener('click', () => location.hash = '#admin?user=' + encodeURIComponent(p.uid));
  $('#profileLogoutBtn')?.addEventListener('click', () => { getFirebaseAuth()?.signOut?.(); saveUser(null); });
  $('#viewUserMods')?.addEventListener('click', () => location.hash = '#my-mods');
  $('#viewUserComments')?.addEventListener('click', () => openCommentsModal(p));
  $('#reportUserBtn')?.addEventListener('click', () => openReportModal(p));
  $('#thanksUserBtn')?.addEventListener('click', () => sendThanks(p));
}

function positionCustomSelectMenu(box){
  const trigger = $('.custom-select-trigger', box);
  const menu = box && box._customMenu ? box._customMenu : $('.custom-select-menu', box);
  if(!trigger || !menu) return;
  const rect = trigger.getBoundingClientRect();
  const gap = 8;
  const margin = 10;
  const width = Math.min(190, window.innerWidth - margin * 2);
  const left = Math.min(Math.max(rect.right - width, margin), window.innerWidth - width - margin);
  const top = rect.bottom + gap;
  menu.style.width = width + 'px';
  menu.style.left = left + 'px';
  menu.style.top = top + 'px';
  menu.style.maxHeight = Math.max(140, window.innerHeight - top - margin) + 'px';
}

function closeCustomSelects(except){
  $$('.custom-select.open').forEach(box => {
    if(box !== except){
      box.classList.remove('open');
      (box._customMenu || $('.custom-select-menu', box))?.classList.remove('open');
      $('.custom-select-trigger', box)?.setAttribute('aria-expanded','false');
    }
  });
}

function syncCustomSelect(select){
  if(!select) return;
  const box = select.closest('.custom-select');
  if(!box) return;
  const trigger = $('.custom-select-trigger', box);
  const menu = box._customMenu || $('.custom-select-menu', box);
  const selected = select.options[select.selectedIndex];
  const optionHtml = opt => select.id === 'langSelect' ? `<span class="retro-flag retro-flag-${opt.value}"><i></i></span><b>${String(opt.value).toUpperCase()}</b>` : opt.textContent;
  if(select.id === 'langSelect') trigger.innerHTML = selected ? optionHtml(selected) : '';
  else trigger.textContent = selected ? selected.textContent : '';
  menu.innerHTML = [...select.options].map(opt => `
    <button type="button" class="custom-option${select.id === 'langSelect' ? ' lang-option' : ''}${opt.selected ? ' selected' : ''}" data-value="${opt.value}">${optionHtml(opt)}</button>`).join('');
}

function enhanceSelect(select){
  if(!select || select.dataset.customReady === 'yes') { if(select) syncCustomSelect(select); return; }
  select.dataset.customReady = 'yes';
  select.classList.add('native-select-hidden');
  const box = document.createElement('div');
  box.className = 'custom-select';
  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'custom-select-trigger';
  trigger.setAttribute('aria-haspopup','listbox');
  trigger.setAttribute('aria-expanded','false');
  const menu = document.createElement('div');
  menu.className = 'custom-select-menu';
  menu.setAttribute('role','listbox');
  select.parentNode.insertBefore(box, select);
  box.appendChild(select);
  box.appendChild(trigger);
  document.body.appendChild(menu);
  box._customMenu = menu;
  syncCustomSelect(select);
  trigger.addEventListener('click', () => {
    const willOpen = !box.classList.contains('open');
    closeCustomSelects(box);
    box.classList.toggle('open', willOpen);
    menu.classList.toggle('open', willOpen);
    trigger.setAttribute('aria-expanded', String(willOpen));
    if(willOpen) requestAnimationFrame(() => positionCustomSelectMenu(box));
  });
  menu.addEventListener('click', e => {
    const option = e.target.closest('.custom-option');
    if(!option) return;
    select.value = option.dataset.value;
    select.dispatchEvent(new Event('change', {bubbles:true}));
    syncCustomSelect(select);
    box.classList.remove('open');
    menu.classList.remove('open');
    trigger.setAttribute('aria-expanded','false');
  });
  select.addEventListener('change', () => syncCustomSelect(select));
}
function enhanceCustomSelects(root = document){ $$('select', root).forEach(enhanceSelect); }

window.addEventListener('scroll', () => $$('.custom-select.open').forEach(positionCustomSelectMenu), true);
window.addEventListener('resize', () => $$('.custom-select.open').forEach(positionCustomSelectMenu));
window.addEventListener('scroll', positionProfileMenu, true);
window.addEventListener('resize', positionProfileMenu);
window.addEventListener('hashchange', () => route());
$('#menuBtn').addEventListener('click', () => $('#nav').classList.toggle('open'));
$('#themeSelect').addEventListener('change', e => {currentTheme=e.target.value;localStorage.setItem(STORAGE.theme,currentTheme);applyTheme();});
$('#langSelect').addEventListener('change', e => {currentLang=normalizeLang(e.target.value);localStorage.setItem(STORAGE.lang,currentLang);applyI18n();route();});
$('#crtToggle').addEventListener('click', () => {crtOn=!crtOn;localStorage.setItem(STORAGE.crt,crtOn?'on':'off');applyTheme();applyI18n();});

function closeProfileMenu(){
  $('#profileWrap')?.classList.remove('open');
  $('#profileBtn')?.setAttribute('aria-expanded','false');
  $('#profileMenu')?.setAttribute('aria-hidden','true');
}
function toggleProfileMenu(){
  closeCustomSelects();
  const wrap = $('#profileWrap');
  const btn = $('#profileBtn');
  const menu = $('#profileMenu');
  const open = !wrap.classList.contains('open');
  wrap.classList.toggle('open', open);
  btn.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-hidden', String(!open));
  if(open) requestAnimationFrame(positionProfileMenu);
}
$('#profileBtn').addEventListener('click', toggleProfileMenu);
$('#profileMenu').addEventListener('click', e => {
  const action = e.target.closest('[data-profile-action]')?.dataset.profileAction;
  if(!action) return;
  closeProfileMenu();
  if(action === 'login') openAuthModal('login');
  if(action === 'profile') currentUser ? location.hash = '#profile' : openAuthModal('login');
  if(action === 'mods') currentUser ? location.hash = '#my-mods' : openAuthModal('login');
  if(action === 'settings') currentUser ? location.hash = '#profile-settings' : openAuthModal('login');
  if(action === 'news') location.hash = '#news';
  if(action === 'feedback') currentUser ? location.hash = '#feedback' : openAuthModal('login');
  if(action === 'about') location.hash = '#about';
  if(action === 'notifications') currentUser ? location.hash = '#notifications' : openAuthModal('login');
  if(action === 'logout'){ getFirebaseAuth()?.signOut?.(); saveUser(null); }
});


function firebaseUserToLocalUser(user){
  return {
    name: user?.displayName || user?.email?.split('@')[0] || t('userRole'),
    email: user?.email || '',
    avatar: user?.photoURL || null,
    uid: user?.uid || '',
    emailVerified: !!user?.emailVerified,
    firebase: true,
    provider: user?.providerData?.[0]?.providerId || 'firebase'
  };
}
async function loginWithGoogle(){
  showAuthStatus('', 'info');
  const btn = $('#googleAuthBtn');
  if(btn) btn.disabled = true;
  try{
    let cred = null;
    if(window.PoluxAuthService){
      cred = await window.PoluxAuthService.signInWithGoogle(currentLang);
    }else{
      const auth = getFirebaseAuth();
      if(!auth) throw new Error(t('firebaseConfigMissing'));
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({prompt:'select_account'});
      cred = await auth.signInWithPopup(provider);
    }
    if(!cred) return;
    saveUser(firebaseUserToLocalUser(cred.user));
    pullProfileFromCloud(cred.user.uid).then(p=>{ if(p) updateProfileButton(); });
    closeAuthModal();
    location.hash = '#profile';
  }catch(err){
    showAuthStatus(authErrorMessage(err) || t('googleLoginFailed'), 'error');
  }finally{
    if(btn) btn.disabled = false;
  }
}
function showResetStatus(message, type='info'){
  const el = $('#resetStatus');
  if(!el) return;
  el.textContent = message || '';
  el.className = 'auth-status' + (message ? ' show ' + type : '');
}
function openResetModal(newPasswordMode=false){
  $('#resetModal')?.classList.add('open');
  $('#resetModal')?.setAttribute('aria-hidden','false');
  $('#resetRequestForm')?.classList.toggle('hidden', !!newPasswordMode);
  $('#newPasswordForm')?.classList.toggle('hidden', !newPasswordMode);
  $('#resetHint') && ($('#resetHint').textContent = newPasswordMode ? t('newPassword') : t('resetEmailText'));
  showResetStatus('');
  clearAuthErrors();
  setTimeout(() => (newPasswordMode ? $('#newPassword') : $('#resetEmail'))?.focus(), 80);
}
function closeResetModal(){
  $('#resetModal')?.classList.remove('open');
  $('#resetModal')?.setAttribute('aria-hidden','true');
  showResetStatus('');
  clearAuthErrors();
}
function getActionCode(){
  const params = new URLSearchParams(location.search);
  return params.get('oobCode') || '';
}
function checkResetActionFromUrl(){
  const params = new URLSearchParams(location.search);
  if(params.get('mode') === 'resetPassword' && params.get('oobCode')) openResetModal(true);
}

$('#authClose').addEventListener('click', closeAuthModal);
$('#authModal').addEventListener('click', e => { if(e.target.id === 'authModal') closeAuthModal(); });
$$('.auth-tab').forEach(btn => btn.addEventListener('click', () => setAuthMode(btn.dataset.mode)));

$('#googleAuthBtn')?.addEventListener('click', loginWithGoogle);
$('#forgotPasswordBtn')?.addEventListener('click', () => { closeAuthModal(); openResetModal(false); });
$('#resetClose')?.addEventListener('click', closeResetModal);
$('#resetModal')?.addEventListener('click', e => { if(e.target.id === 'resetModal') closeResetModal(); });
$('#resetRequestForm')?.addEventListener('submit', async e => {
  e.preventDefault();
  clearAuthErrors();
  const email = $('#resetEmail')?.value.trim() || '';
  if(!email){ setFieldError('resetEmail','resetEmailError',t('fieldRequired')); return; }
  if(!isValidEmail(email)){ setFieldError('resetEmail','resetEmailError',t('emailInvalid')); return; }
  const auth = getFirebaseAuth();
  if(!auth){ showResetStatus(t('firebaseConfigMissing'), 'warn'); return; }
  $('#sendResetBtn').disabled = true;
  try{
    await auth.sendPasswordResetEmail(email, {url: location.origin + location.pathname});
    showResetStatus(t('resetEmailSent'), 'ok');
  }catch(err){ showResetStatus(authErrorMessage(err), 'error'); }
  finally{ $('#sendResetBtn').disabled = false; }
});
$('#newPasswordForm')?.addEventListener('submit', async e => {
  e.preventDefault();
  clearAuthErrors();
  const pass = $('#newPassword')?.value || '';
  const confirm = $('#newPasswordConfirm')?.value || '';
  if(!pass){ setFieldError('newPassword','newPasswordError',t('fieldRequired')); return; }
  if(pass.length < 6){ setFieldError('newPassword','newPasswordError',t('passwordTooShort')); return; }
  if(!confirm){ setFieldError('newPasswordConfirm','newPasswordConfirmError',t('fieldRequired')); return; }
  if(pass !== confirm){ setFieldError('newPasswordConfirm','newPasswordConfirmError',t('passwordsDontMatch')); return; }
  const auth = getFirebaseAuth();
  const code = getActionCode();
  if(!auth || !code){ showResetStatus(t('resetLinkInvalid'), 'error'); return; }
  $('#confirmResetBtn').disabled = true;
  try{
    await auth.confirmPasswordReset(code, pass);
    showResetStatus(t('resetPasswordSuccess'), 'ok');
    history.replaceState({}, document.title, location.origin + location.pathname + location.hash);
    setTimeout(() => { closeResetModal(); openAuthModal('login'); }, 900);
  }catch(err){ showResetStatus(authErrorMessage(err), 'error'); }
  finally{ $('#confirmResetBtn').disabled = false; }
});

$('#authForm').addEventListener('submit', async e => {
  e.preventDefault();
  if(!validateAuthForm()) return;
  const email = $('#authEmail').value.trim();
  const pass = $('#authPassword').value;
  const base = email.split('@')[0] || t('userRole');
  const name = authMode === 'register' ? $('#authName').value.trim() : (currentUser?.name || base);
  const auth = getFirebaseAuth();
  $('#authSubmit').disabled = true;
  showAuthStatus('');
  try{
    if(auth){
      if(authMode === 'register'){
        const cred = await auth.createUserWithEmailAndPassword(email, pass);
        if(name && cred.user.updateProfile) await cred.user.updateProfile({displayName:name});
        await sendVerification(cred.user);
        pendingVerificationUser = cred.user;
        showAuthStatus(t('emailVerificationSent'), 'ok');
        setVerifyActionsVisible(true);
        return;
      }
      const cred = await auth.signInWithEmailAndPassword(email, pass);
      await cred.user.reload();
      if(!cred.user.emailVerified){
        pendingVerificationUser = cred.user;
        showAuthStatus(t('verifyEmailBeforeLogin'), 'warn');
        setVerifyActionsVisible(true);
        return;
      }
      saveUser({name:cred.user.displayName || name, email:cred.user.email, avatar:cred.user.photoURL || null, uid:cred.user.uid, emailVerified:true, firebase:true});
      pullProfileFromCloud(cred.user.uid).then(p=>{ if(p) updateProfileButton(); });
      closeAuthModal();
      location.hash = '#profile';
      return;
    }
    showAuthStatus(t('firebaseConfigMissing'), 'error');
  }catch(err){
    showAuthStatus(authErrorMessage(err), 'error');
  }finally{
    $('#authSubmit').disabled = false;
  }
});

$('#resendVerificationBtn')?.addEventListener('click', async () => {
  const auth = getFirebaseAuth();
  const user = pendingVerificationUser || auth?.currentUser;
  if(!auth || !user){ showAuthStatus(t('firebaseConfigMissing'), 'warn'); return; }
  try{ await sendVerification(user); showAuthStatus(t('verificationResent'), 'ok'); }
  catch(err){ showAuthStatus(authErrorMessage(err), 'error'); }
});
$('#checkVerificationBtn')?.addEventListener('click', async () => {
  const auth = getFirebaseAuth();
  const user = pendingVerificationUser || auth?.currentUser;
  if(!auth || !user){ showAuthStatus(t('firebaseConfigMissing'), 'warn'); return; }
  try{
    await user.reload();
    if(user.emailVerified){
      saveUser({name:user.displayName || user.email.split('@')[0], email:user.email, avatar:user.photoURL || null, uid:user.uid, emailVerified:true, firebase:true});
      showAuthStatus(t('verificationSuccess'), 'ok');
      closeAuthModal();
      location.hash = '#profile';
    } else {
      showAuthStatus(t('verificationStillPending'), 'warn');
    }
  }catch(err){ showAuthStatus(authErrorMessage(err), 'error'); }
});

document.addEventListener('input', e => { if(e.target.closest('#authForm')) validateAuthForm(); });
document.addEventListener('click', e => {
  const eye = e.target.closest('[data-toggle-password]');
  if(!eye) return;
  const input = $('#' + eye.dataset.togglePassword);
  if(!input) return;
  const show = input.type === 'password';
  input.type = show ? 'text' : 'password';
  eye.classList.toggle('active', show);
  const label = t(show ? 'hidePassword' : 'showPassword');
  eye.title = label;
  eye.setAttribute('aria-label', label);
});

document.addEventListener('click', e => {
  if(!e.target.closest('.custom-select') && !e.target.closest('.custom-select-menu')) closeCustomSelects();
  if(!e.target.closest('#profileWrap')) closeProfileMenu();
  if(!e.target.closest('.admin-user-menu-wrap')) $$('.admin-user-row.menu-open').forEach(r=>r.classList.remove('menu-open'));
  const link = e.target.closest('[data-link]');
  if(link && link.getAttribute('href')?.startsWith('#')) e.preventDefault(), location.hash = link.getAttribute('href');
});


function updateViewportHeight(){
  const h = window.visualViewport ? window.visualViewport.height : window.innerHeight;
  document.documentElement.style.setProperty('--app-height', `${h}px`);
}
function liftFocusedField(){
  const el = document.activeElement;
  if(!el || !el.matches('input, textarea, select')) return;
  setTimeout(() => el.scrollIntoView({block:'center', inline:'nearest', behavior:'smooth'}), 160);
}
updateViewportHeight();
window.visualViewport?.addEventListener('resize', () => { updateViewportHeight(); liftFocusedField(); });
window.visualViewport?.addEventListener('scroll', liftFocusedField);
document.addEventListener('focusin', e => { if(e.target.matches('input, textarea')) liftFocusedField(); });



/* === Polux full community/admin update: publications, reports, notifications, adaptive pages === */
Object.assign(UI_UK, {
  navNews:'Новини', navFeedback:'Зворотній зв’язок', notifications:'Сповіщення', noNotifications:'Сповіщень поки немає.',
  homeNewMods:'Нові моди', homePopularMods:'Найпопулярніші моди', homeNews:'Новини', viewAll:'Усі', addedAt:'Дата додавання', addedBy:'Додав', favorite:'Додати до обраного', report:'Поскаржитись',
  rating:'Рейтинг', modAuthor:'Автор моду', gameVersions:'Версії гри', screenshots:'Скріншоти', comments:'Коментарі', addComment:'Написати коментар', reply:'Відповісти', deletedComment:'Коментар було видалено.',
  publication:'Публікація', publishArea:'Область публікування', publishNews:'Новина', publishHome:'Редагування головної', publishMod:'Мод', clear:'Стерти', publish:'Опублікувати', blockType:'Тип блока', addBlock:'Додати блок',
  userModerationFull:'Модерація користувачів', reportsModeration:'Модерація скарг і пропозицій', suggestedMods:'Модерація запропонованих модів', siteSettings:'Налаштування сайту',
  openFull:'Відкрити повністю', goToTarget:'Перейти до поста/профілю', replyUser:'Відповісти користувачу', reporterProfile:'Профіль автора звернення', markNew:'Нове', markWork:'В роботі', markClosed:'Закрите', appealType:'Тип звернення', appealTarget:'Об’єкт звернення', feedback:'Зворотній зв’язок', complaint:'Скарга',
  approve:'Схвалити', edit:'Редагувати', reject:'Відхилити', viewSuggested:'Продивитись', serviceMode:'Сервісне обслуговування сайту', serviceText:'Сайт знаходиться на сервісному обслуговуванні. Вибачте за незручності.', holidayDesign:'Новорічне оформлення', headerBanner:'Банер у шапці', bannerText:'Текст банера', bannerLink:'Посилання банера',
  submitAppeal:'Подати звернення', myAppeals:'Мої звернення', appealTopic:'Тема звернення', appealMessage:'Текст звернення', attachImages:'Прикріпити картинки', charsLimit:'до 300 символів',
  aboutProject:'Про нас', roleEdited:'Ролі оновлено.', ratingEdited:'Рейтинг оновлено.', softDeleted:'Акаунт позначено видаленим на 30 днів.', actionDone:'Дію виконано.',
  roleAdministrator:'Адміністратор', roleModerator:'Модератор', roleUser:'Користувач'
});
['ru','en','pl','de','es','fr'].forEach(lang => Object.assign(TRANSLATION_MEMORY[lang] ||= {}, Object.fromEntries(Object.keys(UI_UK).map(k => [k, TRANSLATION_MEMORY[lang]?.[k] || (lang==='en'?k.replace(/([A-Z])/g,' $1').trim():UI_UK[k])]))));

const POLUX_STORE = {
  mods:'polux.db.mods', news:'polux.db.news', comments:'polux.db.comments', appeals:'polux.db.appeals', suggested:'polux.db.suggestedMods', settings:'polux.db.siteSettings', notifications:'polux.db.notifications', favorites:'polux.db.favorites', ratings:'polux.db.ratings'
};
function readJson(key, fallback){ try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback));}catch(_){return fallback;} }
function writeJson(key, value){ localStorage.setItem(key, JSON.stringify(value)); }
function nowIso(){ return new Date().toISOString(); }
function shortText(text, n=140){ text=String(text||''); return text.length>n?text.slice(0,n).trim()+'…':text; }
function publicRoleLabel(u){ const roles=u.roles||[]; const order=['roleAdministrator','roleModerator','roleUser','roleLegend','roleMaster','roleFarmer','roleDriver','roleMechanic','roleRookie']; return t(order.find(r=>roles.includes(r)) || 'roleUser'); }
function allPublishedMods(){ const stored=readJson(POLUX_STORE.mods,[]); return [...stored, ...modsSource.map((m,i)=>({...m, publishedAt:m.publishedAt||new Date(Date.now()-i*86400000).toISOString(), rating:m.rating??(42-i*7), images:m.images||[], authorUid:m.authorUid||'system'}))]; }
function allNews(){ const demo=[]; return readJson(POLUX_STORE.news,demo); }
function commentsFor(type,id){ return readJson(POLUX_STORE.comments,{}).filter?.(x=>x.type===type&&x.targetId===id) || Object.values(readJson(POLUX_STORE.comments,{})).flat().filter(x=>x.type===type&&x.targetId===id); }
function saveComment(c){ const list=readJson(POLUX_STORE.comments,[]); list.push(c); writeJson(POLUX_STORE.comments,list); }
function notify(uid, text, url='#home'){ if(!uid) return; const all=readJson(POLUX_STORE.notifications,{}); (all[uid] ||= []).unshift({id:'n'+Date.now(), text, url, read:false, createdAt:nowIso()}); writeJson(POLUX_STORE.notifications, all); updateProfileButton(); }
function myNotifications(){ return currentUser?readJson(POLUX_STORE.notifications,{})[currentUser.uid]||[]:[]; }
function siteSettings(){ return readJson(POLUX_STORE.settings,{maintenance:false, holiday:false, banner:false, bannerText:'', bannerLink:''}); }

function ensureSiteBanner(){
  $('.site-banner')?.remove();
  const st=siteSettings();
  document.body.classList.toggle('holiday-mode', !!st.holiday);
  document.body.classList.toggle('maintenance-mode', !!st.maintenance && !isAdminProfile(ensureCurrentProfile?.()||{}));
  if(st.banner && st.bannerText){
    const html=st.bannerLink?`<a href="${escapeHtml(st.bannerLink)}" target="_blank" rel="noopener">${escapeHtml(st.bannerText)}</a>`:escapeHtml(st.bannerText);
    document.body.insertAdjacentHTML('afterbegin', `<div class="site-banner">${html}</div>`);
  }
}

const oldUpdateProfileButton = updateProfileButton;
updateProfileButton = function(){
  oldUpdateProfileButton();
  const btn=$('#profileBtn'); if(!btn) return;
  btn.classList.toggle('has-notifications', myNotifications().some(n=>!n.read));
};
const oldRenderProfileMenuItems = renderProfileMenuItems;
renderProfileMenuItems = function(){
  oldRenderProfileMenuItems?.();
  const menu=$('#profileMenu'); if(!menu) return;
  if(!menu.querySelector('[data-profile-action="notifications"]')){
    const before=menu.querySelector('[data-profile-action="settings"]') || menu.lastElementChild;
    [['news','navNews'],['feedback','navFeedback'],['about','navAbout'],['notifications','notifications']].forEach(([action,key])=>{
      const b=document.createElement('button'); b.type='button'; b.setAttribute('role','menuitem'); b.dataset.profileAction=action; b.textContent=t(key); menu.insertBefore(b,before);
    });
  }
};

function modCard(m){ const x=translateRecord(m,currentLang); return `<article class="mod-card community-card"><button class="icon-btn card-dots" data-card-menu="${m.id}">⋯</button><div class="card-menu"><button data-fav="${m.id}">${t('favorite')}</button><button data-report-content="mod:${m.id}">${t('report')}</button></div><div class="pixel-art">${x.icon||'▦'}</div><h3>${x.title}</h3><p>${shortText(x.desc,120)}</p><small>${t('addedAt')}: ${formatDateShort(x.publishedAt||m.publishedAt)} · ${t('addedBy')}: <span data-no-translate>${escapeHtml(m.author||'Polux Mods')}</span></small><footer><span class="status">★ ${m.rating||0}</span><a class="btn" href="#mods/${m.id}" data-link>${t('open')}</a></footer></article>`; }
function newsCard(n){ return `<article class="mod-card community-card"><h3>${translateText(n.title,currentLang)}</h3><p>${shortText(translateText(n.summary||n.text||'',currentLang),140)}</p><small>${t('addedAt')}: ${formatDateShort(n.publishedAt)} · ${t('addedBy')}: <span data-no-translate>${escapeHtml(n.author||'Polux Mods')}</span></small><footer><span class="status">${t('navNews')}</span><a class="btn" href="#news/${n.id}" data-link>${t('open')}</a></footer></article>`; }

function renderHomePage(){
  renderTemplate('homeTemplate');
  const mods=allPublishedMods();
  const newest=[...mods].sort((a,b)=>String(b.publishedAt).localeCompare(String(a.publishedAt))).slice(0,5);
  const popular=[...mods].sort((a,b)=>(b.rating||0)-(a.rating||0)).slice(0,5);
  const news=allNews().sort((a,b)=>String(b.publishedAt).localeCompare(String(a.publishedAt))).slice(0,5);
  $('#app').insertAdjacentHTML('beforeend', `<section class="home-feed reveal"><div class="section-title"><h2>${t('homeNewMods')}</h2><a class="btn" href="#mods?sort=new" data-link>${t('viewAll')}</a></div><div class="mods-grid">${newest.map(modCard).join('')}</div><div class="section-title"><h2>${t('homePopularMods')}</h2><a class="btn" href="#mods?sort=popular" data-link>${t('viewAll')}</a></div><div class="mods-grid">${popular.map(modCard).join('')}</div><div class="section-title"><h2>${t('homeNews')}</h2><a class="btn" href="#news" data-link>${t('viewAll')}</a></div><div class="mods-grid">${news.length?news.map(newsCard).join(''):`<article class="card"><h3>${t('navNews')}</h3><p>${t('publishModsSoon')}</p></article>`}</div></section><footer class="footer">© Polux Mods · FS Mobile 20</footer>`);
}

renderMods = function(){
  const params=new URLSearchParams((location.hash.split('?')[1]||''));
  const source=allPublishedMods();
  const sourceCategories=['all',...new Set(source.map(m=>m.category))];
  $('#categoryFilter').innerHTML=sourceCategories.map(c=>`<option value="${c}">${c==='all'?t('allCategories'):translateText(c,currentLang)}</option>`).join('');
  enhanceSelect($('#categoryFilter')); syncCustomSelect($('#categoryFilter'));
  const paint=()=>{ let list=source.map(m=>translateRecord(m,currentLang).id?m:m); const q=($('#searchInput').value||'').toLowerCase(); const cat=$('#categoryFilter').value; list=list.filter(m=>(cat==='all'||m.category===cat)&&`${m.title} ${m.desc} ${m.author}`.toLowerCase().includes(q)); if(params.get('sort')==='popular') list.sort((a,b)=>(b.rating||0)-(a.rating||0)); else list.sort((a,b)=>String(b.publishedAt).localeCompare(String(a.publishedAt))); $('#modsGrid').innerHTML=list.map(modCard).join('')||`<p>${t('adminNoUsers')}</p>`; bindCardMenus(); };
  $('#searchInput').addEventListener('input',paint); $('#categoryFilter').addEventListener('change',paint); paint();
};
function bindCardMenus(){ $$('[data-card-menu]').forEach(b=>b.onclick=e=>{e.stopPropagation(); b.closest('.community-card').classList.toggle('menu-open');}); $$('[data-fav]').forEach(b=>b.onclick=()=>alert(t('favorite'))); $$('[data-report-content]').forEach(b=>b.onclick=()=>openContentReportModal(b.dataset.reportContent)); }

renderMod = function(id){
  renderTemplate('modTemplate'); const base=allPublishedMods().find(x=>x.id===id)||allPublishedMods()[0]; const m=translateRecord(base,currentLang); const imgs=base.images?.length?base.images:[base.icon||'🚜'];
  $('#modDetail').innerHTML=`<a class="btn" href="#mods" data-link>← ${t('back')}</a><div class="mod-page-grid"><div><div class="mod-detail-cover big-cover" id="mainModImage">${String(imgs[0]).startsWith('data:')||String(imgs[0]).startsWith('http')?`<img src="${imgs[0]}" alt="">`:imgs[0]}</div><div class="thumb-row">${imgs.map((im,i)=>`<button class="thumb" data-thumb="${i}">${String(im).startsWith('data:')||String(im).startsWith('http')?`<img src="${im}" alt="">`:im}</button>`).join('')}</div></div><div><p class="eyebrow">${m.category} / ${m.game}</p><h1>${m.title}</h1><p>${m.desc}</p><div class="specs"><div><strong>${t('category')}</strong><br>${m.category}</div><div><strong>${t('version')}</strong><br>${m.version}</div><div><strong>${t('gameVersions')}</strong><br>${m.game}</div><div><strong>${t('modAuthor')}</strong><br><span data-no-translate>${escapeHtml(base.author||'Polux Mods')}</span></div><div><strong>${t('rating')}</strong><br><span class="stars" id="ratingStars">★★★★★</span> ${base.rating||0}</div></div><div class="hero-actions"><button class="btn primary">${t('download')}</button></div></div></div><section class="comments-box"><h2>${t('comments')}</h2><div id="commentsList"></div>${currentUser?`<form class="comment-form" id="commentForm"><textarea id="commentText" maxlength="800" placeholder="${t('addComment')}"></textarea><button class="btn primary">${t('sendMessage')}</button></form>`:`<p>${t('profileGuest')}</p>`}</section>`;
  function paintComments(){ const rows=commentsFor('mod',base.id); $('#commentsList').innerHTML=rows.map(c=>commentHtml(c)).join('')||`<p>${t('noComments')}</p>`; bindCommentActions(); }
  $('#commentForm')?.addEventListener('submit',e=>{e.preventDefault(); const txt=$('#commentText').value.trim(); if(!txt)return; const p=ensureCurrentProfile(); saveComment({id:'c'+Date.now(), type:'mod', targetId:base.id, uid:p.uid, name:p.name, avatar:p.avatar, role:publicRoleLabel(p), text:txt, score:0, createdAt:nowIso()}); notify(base.authorUid, `${p.name}: ${shortText(txt,60)}`, `#mods/${base.id}`); $('#commentText').value=''; paintComments();});
  $$('.thumb').forEach(btn=>btn.onclick=()=>{const im=imgs[+btn.dataset.thumb]; $('#mainModImage').innerHTML=String(im).startsWith('data:')||String(im).startsWith('http')?`<img src="${im}" alt="">`:im;});
  $('#mainModImage').onclick=()=>modalShell('imageModal', t('screenshots'), `<div class="image-viewer">${$('#mainModImage').innerHTML}</div>`);
  paintComments();
};
function commentHtml(c){ const deleted=c.deleted; return `<article class="comment ${deleted?'deleted':''}" data-comment="${c.id}"><div class="comment-avatar">${c.avatar?`<img src="${c.avatar}" alt="">`:defaultAvatarSvg()}</div><div class="comment-body"><strong data-no-translate>${escapeHtml(c.name||'User')}</strong> <small>#${escapeHtml(publicUserId(c.uid||''))}</small><small>${escapeHtml(c.role||t('userRole'))}</small><p>${deleted?t('deletedComment'):linkify(escapeHtml(c.text||''))}</p><button class="mini-link" data-reply="${c.id}">${t('reply')}</button><span class="score ${c.score>=0?'good':'bad'}">▲▼ ${c.score||0}</span></div><div class="admin-user-menu-wrap"><button class="icon-btn admin-dots" data-comment-dots>⋯</button><div class="admin-user-menu"><button data-report-comment="${c.id}">${t('report')}</button>${currentUser&&(currentUser.uid===c.uid||isAdminProfile(ensureCurrentProfile()))?`<button data-delete-comment="${c.id}">${t('deleteText')}</button>`:''}</div></div></article>`; }
function linkify(text){ return text.replace(/(https?:\/\/\S+)/g,'<a href="$1" target="_blank" rel="noopener">$1</a>').replace(/@(\w+)/g,'<span class="mention">@$1</span>'); }
function bindCommentActions(){ $$('[data-comment-dots]').forEach(b=>b.onclick=e=>{e.stopPropagation(); b.closest('.comment').classList.toggle('menu-open');}); $$('[data-delete-comment]').forEach(b=>b.onclick=()=>{let list=readJson(POLUX_STORE.comments,[]); const c=list.find(x=>x.id===b.dataset.deleteComment); if(c)c.deleted=true; writeJson(POLUX_STORE.comments,list); route();}); $$('[data-reply]').forEach(b=>b.onclick=()=>{$('#commentText')?.focus(); $('#commentText').value='@'+b.closest('.comment').querySelector('strong').textContent+', ';}); }

function renderNewsList(){ $('#app').innerHTML=`<section class="page-head page-panel"><p class="eyebrow">/news</p><h1>${t('navNews')}</h1></section><section class="mods-grid reveal">${allNews().map(newsCard).join('')||`<article class="card"><p>${t('publishModsSoon')}</p></article>`}</section><footer class="footer">© Polux Mods</footer>`; }
function renderNewsPage(id){ const n=allNews().find(x=>x.id===id); if(!n){renderNewsList();return;} $('#app').innerHTML=`<section class="page-panel narrow"><p class="eyebrow">/news/${id}</p><h1>${translateText(n.title,currentLang)}</h1><p>${t('addedBy')}: <span data-no-translate>${escapeHtml(n.author||'Polux Mods')}</span> · ${formatDateShort(n.publishedAt)}</p>${(n.blocks||[]).map(b=>b.type==='image'?`<img class="news-image" src="${b.value}" alt="">`:`<p>${translateText(b.value,currentLang)}</p>`).join('')||`<p>${translateText(n.text||'',currentLang)}</p>`}<section class="comments-box"><h2>${t('comments')}</h2><div id="commentsList">${commentsFor('news',id).map(commentHtml).join('')||`<p>${t('noComments')}</p>`}</div></section></section>`; }

function renderFeedbackPage(){ if(!currentUser){openAuthModal('login'); location.hash='#home'; return;} const items=readJson(POLUX_STORE.appeals,[]).filter(a=>a.uid===currentUser.uid); $('#app').innerHTML=`<section class="page-panel narrow feedback-page"><p class="eyebrow">/feedback</p><h1>${t('navFeedback')}</h1><div class="tabs-line"><button class="btn primary" data-tab="new">${t('submitAppeal')}</button><button class="btn" data-tab="mine">${t('myAppeals')}</button></div><form class="auth-form" id="appealForm"><label class="field"><span>${t('appealTopic')}</span><select id="appealTopic"><option>Питання</option><option>Пропозиція</option><option>Помилка</option><option>Інше</option></select></label><label class="field"><span>${t('appealMessage')} (${t('charsLimit')})</span><textarea id="appealText" maxlength="300"></textarea></label><label class="field"><span>${t('attachImages')}</span><input type="file" id="appealImages" multiple accept="image/*"></label><button class="btn primary">${t('sendMessage')}</button></form><div id="myAppeals" class="hidden">${items.map(a=>`<article class="appeal status-${a.status||'new'}"><strong>${escapeHtml(a.topic)}</strong><p>${linkify(escapeHtml(a.text))}</p><small>${t(a.status==='closed'?'markClosed':a.status==='work'?'markWork':'markNew')} · ${formatDateShort(a.createdAt)}</small>${a.reply?`<p class="auth-status show ok">${escapeHtml(a.reply)}</p>`:''}</article>`).join('')||`<p>${t('noComments')}</p>`}</div></section>`; enhanceCustomSelects($('#app')); $('[data-tab="new"]').onclick=()=>{$('#appealForm').classList.remove('hidden');$('#myAppeals').classList.add('hidden')}; $('[data-tab="mine"]').onclick=()=>{$('#appealForm').classList.add('hidden');$('#myAppeals').classList.remove('hidden')}; $('#appealForm').onsubmit=e=>{e.preventDefault(); const p=ensureCurrentProfile(); const list=readJson(POLUX_STORE.appeals,[]); list.unshift({id:'a'+Date.now(), uid:p.uid, name:p.name, topic:$('#appealTopic').value, text:$('#appealText').value.trim(), type:'feedback', status:'new', createdAt:nowIso()}); writeJson(POLUX_STORE.appeals,list); window.PoluxDbService?.saveAppeal?.(list[0]); alert(t('reportSent')); renderFeedbackPage();}; }
function renderNotificationsPage(){ if(!currentUser){openAuthModal('login');return;} const all=readJson(POLUX_STORE.notifications,{}); const list=all[currentUser.uid]||[]; all[currentUser.uid]=list.map(n=>({...n,read:true})); writeJson(POLUX_STORE.notifications,all); $('#app').innerHTML=`<section class="page-panel narrow"><p class="eyebrow">/notifications</p><h1>${t('notifications')}</h1><div class="notification-list">${list.map(n=>`<a class="notification" href="${n.url||'#home'}"><span>${escapeHtml(n.text)}</span><small>${formatDateShort(n.createdAt)}</small></a>`).join('')||`<p>${t('noNotifications')}</p>`}</div></section>`; updateProfileButton(); }

function openContentReportModal(target){ if(!currentUser){openAuthModal('login');return;} modalShell('contentReportModal', t('report'), `<form class="auth-form" id="contentReportForm"><label class="field"><span>${t('reportReason')}</span><select id="contentReportReason"><option>${t('reportSpam')}</option><option>${t('reportRules')}</option><option>${t('reportOther')}</option></select></label><label class="field"><span>${t('reportDetails')}</span><textarea id="contentReportDetails"></textarea></label><button class="btn primary">${t('sendMessage')}</button></form>`); enhanceCustomSelects($('#contentReportModal')); $('#contentReportForm').onsubmit=e=>{e.preventDefault(); const list=readJson(POLUX_STORE.appeals,[]); list.unshift({id:'r'+Date.now(), uid:currentUser.uid, name:ensureCurrentProfile().name, type:'complaint', target, reason:$('#contentReportReason').value, text:$('#contentReportDetails').value, status:'new', createdAt:nowIso()}); writeJson(POLUX_STORE.appeals,list); $('#contentReportModal').remove(); alert(t('reportSent'));}; }

function renderAdminUsersList(filter=''){
  const q=String(filter||'').toLowerCase(); const index=JSON.parse(localStorage.getItem(allProfilesKey())||'{}'); const users=Object.values(index).filter(u=>!q||`${u.publicId||''} ${u.email||''} ${u.name||''} ${u.uid||''}`.toLowerCase().includes(q)).sort((a,b)=>String(b.updatedAt||'').localeCompare(String(a.updatedAt||''))).slice(0,120);
  return users.map(u=>`<div class="admin-user-row" data-admin-user-row="${u.uid}"><a class="admin-user-avatar" href="#user/${u.uid}">${u.avatar?`<img src="${u.avatar}" alt="">`:defaultAvatarSvg()}</a><div class="admin-user-main"><strong data-no-translate>${escapeHtml(u.name||u.email||u.uid)}</strong><small>ID: ${u.publicId||publicUserId(u.uid)} · ${escapeHtml(u.email||'—')}</small><small>${publicRoleLabel(u)} · ${t('lastOnline')}: ${formatDateShort(u.lastOnline||u.updatedAt)}</small></div><div class="admin-user-menu-wrap"><button class="icon-btn admin-dots" data-admin-dots="${u.uid}">⋯</button><div class="admin-user-menu"><a href="#user/${u.uid}">${t('openUserProfile')}</a><button data-admin-action="mute" data-uid="${u.uid}">${u.mutedUntil?t('adminActionUnmute'):t('adminActionMute')}</button><button data-admin-action="ban" data-uid="${u.uid}">${u.bannedUntil?t('adminActionUnban'):t('adminActionBan')}</button><button data-admin-action="rating" data-uid="${u.uid}">${t('rating')}</button><button data-admin-action="role" data-uid="${u.uid}">${t('adminActionRole')}</button><button data-admin-action="delete" data-uid="${u.uid}">${t('deleteAccount')}</button></div></div></div>`).join('')||`<p>${t('adminNoUsers')}</p>`;
}
renderAdminPanelPage = function(){
  if(!currentUser){openAuthModal('login');location.hash='#home';return;} const me=ensureCurrentProfile(); if(!isAdminProfile(me)){ $('#app').innerHTML=`<section class="page-head page-panel"><h1>${t('adminPanelTitle')}</h1><p>${t('adminOnly')}</p></section>`; return; }
  const st=siteSettings();
  $('#app').innerHTML=`<section class="page-head page-panel admin-page"><p class="eyebrow">/admin</p><h1>${t('adminPanelTitle')}</h1><p>${t('adminPanelText')}</p></section><section class="admin-blocks"><nav class="admin-tabs"><button class="active" data-admin-tab="publish">${t('publication')}</button><button data-admin-tab="users">${t('userModerationFull')}</button><button data-admin-tab="reports">${t('reportsModeration')}</button><button data-admin-tab="suggested">${t('suggestedMods')}</button><button data-admin-tab="settings">${t('siteSettings')}</button></nav><div class="admin-tab-panel" id="adminTabPanel"></div></section>`;
  const paint=tab=>{ $$('.admin-tabs button').forEach(b=>b.classList.toggle('active',b.dataset.adminTab===tab)); const box=$('#adminTabPanel');
    if(tab==='publish') box.innerHTML=`<article class="admin-card admin-card-wide"><h3>${t('publication')}</h3><label class="field"><span>${t('publishArea')}</span><select id="publishArea"><option value="mod">${t('publishMod')}</option><option value="news">${t('publishNews')}</option><option value="home">${t('publishHome')}</option></select></label><div id="publishEditor"></div><div class="hero-actions"><button class="btn danger-soft" id="clearPublish">${t('clear')}</button><button class="btn primary" id="doPublish">${t('publish')}</button></div></article>`;
    if(tab==='users') box.innerHTML=`<article class="admin-card admin-card-wide"><h3>${t('userModerationFull')}</h3><label class="field"><span>${t('adminUserSearch')}</span><input id="adminUsersSearch" class="site-input" type="search" placeholder="ID / Email / ${t('namePlaceholder')}"></label><div class="admin-users-list" id="adminUsersList">${renderAdminUsersList()}</div></article>`;
    if(tab==='reports'){ const a=readJson(POLUX_STORE.appeals,[]); box.innerHTML=`<article class="admin-card admin-card-wide"><h3>${t('reportsModeration')}</h3><div class="appeals-list">${a.map(ap=>adminAppealHtml(ap)).join('')||`<p>${t('complaintsHint')}</p>`}</div></article>`; }
    if(tab==='suggested'){ const list=readJson(POLUX_STORE.suggested,[]); box.innerHTML=`<article class="admin-card admin-card-wide"><h3>${t('suggestedMods')}</h3>${list.map(m=>`<div class="admin-user-row"><div><strong>${escapeHtml(m.title)}</strong><small>${escapeHtml(m.author||'')}</small></div><div class="hero-actions"><a class="btn" href="#mods/${m.id}">${t('viewSuggested')}</a><button class="btn primary" data-suggest-approve="${m.id}">${t('approve')}</button><button class="btn" data-suggest-edit="${m.id}">${t('edit')}</button><button class="btn danger-soft" data-suggest-reject="${m.id}">${t('reject')}</button></div></div>`).join('')||`<p>${t('adminNoUsers')}</p>`}</article>`; }
    if(tab==='settings') box.innerHTML=`<article class="admin-card admin-card-wide"><h3>${t('siteSettings')}</h3><label class="switch-row"><input type="checkbox" id="setHoliday" ${st.holiday?'checked':''}> <span>${t('holidayDesign')}</span></label><label class="switch-row"><input type="checkbox" id="setMaintenance" ${st.maintenance?'checked':''}> <span>${t('serviceMode')}</span></label><label class="switch-row"><input type="checkbox" id="setBanner" ${st.banner?'checked':''}> <span>${t('headerBanner')}</span></label><label class="field"><span>${t('bannerText')}</span><input id="bannerText" value="${escapeHtml(st.bannerText||'')}"></label><label class="field"><span>${t('bannerLink')}</span><input id="bannerLink" value="${escapeHtml(st.bannerLink||'')}"></label><button class="btn primary" id="saveSiteSettings">${t('save')}</button></article>`;
    enhanceCustomSelects(box); bindAdminPanel(tab); };
  $$('.admin-tabs button').forEach(b=>b.onclick=()=>paint(b.dataset.adminTab)); paint('publish'); syncUsersIndexFromCloud().then(()=>{ if($('#adminUsersList')) $('#adminUsersList').innerHTML=renderAdminUsersList($('#adminUsersSearch')?.value||''); });
};
function publishEditorHtml(type){ if(type==='news') return `<label class="field"><span>Заголовок</span><input id="pubTitle"></label><label class="field"><span>Короткий опис</span><textarea id="pubDesc"></textarea></label><div id="newsBlocks"></div><button class="btn" id="addNewsBlock" type="button">${t('addBlock')}</button>`; if(type==='home') return `<label class="field"><span>Головна новина</span><input id="homeMain"></label><label class="field"><span>Сезонна пропозиція</span><textarea id="homeSeason"></textarea></label>`; return `<label class="field"><span>Назва моду</span><input id="pubTitle"></label><label class="field"><span>${t('category')}</span><input id="pubCategory"></label><label class="field"><span>${t('version')}</span><input id="pubVersion"></label><label class="field"><span>${t('gameVersions')}</span><input id="pubGame" value="FS Mobile 20"></label><label class="field"><span>Опис</span><textarea id="pubDesc"></textarea></label><label class="field"><span>${t('download')}</span><input id="pubDownload"></label>`; }
function bindAdminPanel(tab){ if(tab==='publish'){ const sel=$('#publishArea'), ed=$('#publishEditor'); const draw=()=>{ed.innerHTML=publishEditorHtml(sel.value);}; sel.onchange=draw; draw(); $('#clearPublish').onclick=()=>draw(); $('#doPublish').onclick=()=>{ const type=sel.value; if(type==='news'){ const list=readJson(POLUX_STORE.news,[]); list.unshift({id:'news-'+Date.now(),title:$('#pubTitle')?.value||'Новина',summary:$('#pubDesc')?.value||'',blocks:[{type:'text',value:$('#pubDesc')?.value||''}],author:ensureCurrentProfile().name,publishedAt:nowIso()}); writeJson(POLUX_STORE.news,list); } else if(type==='mod'){ const list=readJson(POLUX_STORE.mods,[]); list.unshift({id:'mod-'+Date.now(),title:$('#pubTitle')?.value||'Новий мод',category:$('#pubCategory')?.value||categoryKeys.tools,version:$('#pubVersion')?.value||'1.0',game:$('#pubGame')?.value||'FS Mobile 20',desc:$('#pubDesc')?.value||'',download:$('#pubDownload')?.value||'',author:ensureCurrentProfile().name,authorUid:currentUser.uid,publishedAt:nowIso(),rating:0,icon:'▦'}); writeJson(POLUX_STORE.mods,list); } alert(t('actionDone')); }; }
  if(tab==='users'){ $('#adminUsersSearch').oninput=e=>{$('#adminUsersList').innerHTML=renderAdminUsersList(e.target.value); bindAdminPanel('users');}; $$('[data-admin-dots]').forEach(b=>b.onclick=e=>{e.stopPropagation(); b.closest('.admin-user-row').classList.toggle('menu-open')}); $$('[data-admin-action]').forEach(b=>b.onclick=()=>handleAdminUserAction(b.dataset.uid,b.dataset.adminAction)); }
  if(tab==='reports'){ $$('[data-appeal-action]').forEach(b=>b.onclick=()=>handleAppealAction(b.dataset.id,b.dataset.appealAction)); }
  if(tab==='settings'){ $('#saveSiteSettings').onclick=()=>{ const st={holiday:$('#setHoliday').checked, maintenance:$('#setMaintenance').checked, banner:$('#setBanner').checked, bannerText:$('#bannerText').value, bannerLink:$('#bannerLink').value}; writeJson(POLUX_STORE.settings,st); window.PoluxDbService?.updateSiteSettings?.(st); ensureSiteBanner(); alert(t('actionDone')); }; }}
function adminAppealHtml(a){ const label=a.status==='closed'?'markClosed':a.status==='work'?'markWork':'markNew'; return `<article class="appeal status-${a.status||'new'}"><strong>${t(a.type==='complaint'?'complaint':'feedback')} · ${escapeHtml(a.topic||a.reason||'')}</strong><p>${escapeHtml(a.text||'')}</p><small>${t('appealTarget')}: ${escapeHtml(a.target||'—')} · ${t(label)} · ${formatDateShort(a.createdAt)}</small><div class="hero-actions"><a class="btn" href="${a.target?.startsWith('mod:')?'#mods/'+a.target.split(':')[1]:'#user/'+(a.targetUid||a.uid)}">${t('goToTarget')}</a><button class="btn" data-appeal-action="work" data-id="${a.id}">${t('markWork')}</button><button class="btn" data-appeal-action="closed" data-id="${a.id}">${t('markClosed')}</button><button class="btn danger-soft" data-appeal-action="delete" data-id="${a.id}">${t('deleteText')}</button></div></article>`; }
function handleAppealAction(id,action){ let list=readJson(POLUX_STORE.appeals,[]); const a=list.find(x=>x.id===id); if(action==='delete') list=list.filter(x=>x.id!==id); else if(a&&a.status!=='closed') a.status=action; writeJson(POLUX_STORE.appeals,list); renderAdminPanelPage(); setTimeout(()=>document.querySelector('[data-admin-tab="reports"]')?.click(),100); }
function handleAdminUserAction(uid,action){ const p=readProfile(uid); if(!p?.uid)return; if(action==='mute'){p.mutedUntil=p.mutedUntil?null:'permanent'; notify(uid,p.mutedUntil?t('adminActionMute'):t('adminActionUnmute'),'#profile');} if(action==='ban'){p.bannedUntil=p.bannedUntil?null:'permanent'; notify(uid,p.bannedUntil?t('adminActionBan'):t('adminActionUnban'),'#profile');} if(action==='delete'){p.deletedAt=nowIso(); notify(uid,t('softDeleted'),'#profile');} if(action==='rating'){const n=Number(prompt(t('rating'), '0')||0); p.rating=(p.rating||0)+n; notify(uid,t('ratingEdited'),'#profile');} if(action==='role'){const role=prompt(`${t('adminRole')}: roleAdministrator / roleModerator / roleUser`,'roleUser'); if(role)p.roles=[role,...ratingRoleKeys(p.rating||0)]; notify(uid,t('roleEdited'),'#profile');} writeProfile(p); window.PoluxDbService?.updateUserProfile?.(uid,p); renderAdminPanelPage(); }

const oldRoute = route;
route = function(){
  const hash=location.hash.replace('#','')||'home'; showBoot(); ensureSiteBanner(); setTimeout(()=>{ const [page,id]=hash.split('/'); const st=siteSettings(); if(st.maintenance && !isAdminProfile(ensureCurrentProfile?.()||{}) && page!=='profile'){ $('#app').innerHTML=`<section class="page-panel narrow"><h1>${t('serviceMode')}</h1><p>${t('serviceText')}</p></section>`; return; } if(page==='home') renderHomePage(); else if(page==='news'&&id) renderNewsPage(id); else if(page==='news') renderNewsList(); else if(page==='feedback'||page==='contact') renderFeedbackPage(); else if(page==='notifications') renderNotificationsPage(); else if(page==='mods'&&id) renderMod(id); else if(page==='mods') renderTemplate('modsTemplate', renderMods); else if(page==='about') renderTemplate('aboutTemplate'); else if(page==='profile') renderTemplate('profileTemplate', renderProfile); else if(page==='profile-settings') renderProfileSettingsPage(); else if(page==='my-mods') renderMyModsPage(); else if(page==='admin'||page.startsWith('admin?')) renderAdminPanelPage(); else if(page==='user'&&id) renderTemplate('profileTemplate',()=>renderProfile(id)); else renderHomePage(); applyI18n(); $('#app').focus({preventScroll:true}); $('#nav').classList.remove('open'); },180);
};

enhanceCustomSelects(document);
applyTheme();
applyI18n();
route();

function renderProfileSettingsPage(){
  if(!currentUser){ openAuthModal('login'); location.hash='#home'; return; }
  const p = ensureCurrentProfile();
  $('#app').innerHTML = `
    <section class="page-panel narrow reveal profile-settings-page">
      <p class="eyebrow">/profile/settings</p>
      <h1>${t('profileSettingsTitle')}</h1>
      <div class="profile-editor-card">
        <button class="profile-cover editable-cover" id="coverPickerBtn" type="button" title="${t(p.cover?'replaceCover':'addCover')}">${p.cover ? `<img src="${p.cover}" alt="">` : defaultCover()}<span class="edit-dot">✎</span></button>
        <button class="profile-big-avatar editable-avatar" id="avatarPickerBtn" type="button" title="${t(p.avatar?'replaceAvatar':'addAvatar')}">${profileAvatarHtml(p)}<span class="edit-dot">✎</span></button>
        <div class="settings-block">
          <label>${t('accountName')}</label>
          <div class="inline-edit"><strong data-no-translate>${p.name}</strong><button class="icon-btn" id="editNameBtn" type="button">✎</button></div>
          <small>${t('nameLimitHint')}</small>
        </div>
        <div class="settings-block">
          <label>${t('accountBio')}</label>
          <p class="settings-muted">${p.bio ? translateText(p.bio,currentLang) : t('noBio')}</p>
          <div class="hero-actions"><button class="btn" id="editBioBtn" type="button">${p.bio?t('editBio'):t('addBio')}</button>${p.bio?`<button class="btn danger-soft" id="removeBioBtn" type="button">${t('removeBio')}</button>`:''}</div>
          <small>${t('bioLimit')}</small>
        </div>
        <div class="settings-block"><label>${t('changePassword')}</label><p class="settings-muted">${t('passwordChangeHint')}</p><button class="btn" id="changePasswordBtn" type="button">${t('changePassword')}</button></div>
        <div class="settings-block"><label>${t('activeSessions')}</label><p class="settings-muted">${t('sessionsHint')}</p><button class="btn" id="sessionsBtn" type="button">${t('activeSessions')}</button></div>
        <div class="settings-block danger-zone"><label>${t('deleteAccount')}</label><p class="settings-muted">${t('deleteAccountText')}</p><button class="btn danger-soft" id="deleteAccountBtn" type="button">${t('deleteAccount')}</button></div>
      </div>
    </section>`;
  $('#avatarPickerBtn').addEventListener('click', () => openImageChoice('avatar', p));
  $('#coverPickerBtn').addEventListener('click', () => openImageChoice('cover', p));
  $('#editNameBtn').addEventListener('click', () => openNameModal(p));
  $('#editBioBtn').addEventListener('click', () => openBioModal(p));
  $('#removeBioBtn')?.addEventListener('click', () => { p.bio=''; writeProfile(p); renderProfileSettingsPage(); });
  $('#changePasswordBtn').addEventListener('click', () => openChangePasswordModal());
  $('#sessionsBtn').addEventListener('click', () => openSessionsModal(p));
  $('#deleteAccountBtn').addEventListener('click', () => openDeleteAccountModal(p));
  applyI18n();
}

function findLocalProfileByQuery(query){
  const q = String(query || '').trim().toLowerCase();
  const index = JSON.parse(localStorage.getItem(allProfilesKey()) || '{}');
  const found = Object.values(index).find(u =>
    String(u.uid || '').toLowerCase() === q ||
    String(u.publicId || '').toLowerCase() === q ||
    String(u.email || '').toLowerCase() === q ||
    String(u.name || '').toLowerCase().includes(q)
  );
  return found ? readProfile(found.uid) : null;
}
function roleOptions(selected='roleUser'){
  const roles = ['roleAdministrator','roleModerator','roleUser'];
  return roles.map(r => `<option value="${r}" ${r===selected?'selected':''}>${t(r)}</option>`).join('');
}
function adminActionOptions(){
  return `<option value="ban">${t('adminActionBan')}</option><option value="mute">${t('adminActionMute')}</option><option value="unban">${t('adminActionUnban')}</option><option value="unmute">${t('adminActionUnmute')}</option><option value="delete">${t('adminActionDelete')}</option><option value="role">${t('adminActionRole')}</option>`;
}
function renderAdminUsersList(filter=''){
  const q = String(filter || '').trim().toLowerCase();
  const index = JSON.parse(localStorage.getItem(allProfilesKey()) || '{}');
  const users = Object.values(index).sort((a,b)=>String(b.updatedAt||'').localeCompare(String(a.updatedAt||''))).filter(u => !q || `${u.name||''} ${u.email||''} ${u.uid||''} ${u.publicId||''}`.toLowerCase().includes(q)).slice(0,80);
  return users.length ? users.map(u => `
    <div class="admin-user-row" data-admin-user-row="${u.uid}">
      <a class="admin-user-avatar" href="#user/${u.uid}">${u.avatar?`<img src="${u.avatar}" alt="">`:defaultAvatarSvg()}</a>
      <div><strong data-no-translate>${escapeHtml(u.name || u.email || u.uid)}</strong><small>${u.publicId || publicUserId(u.uid)} · ${(u.roles||[]).map(r=>t(r)).join(' · ') || t('roleUser')} · ${t('userRating')}: ${u.rating || 0}</small></div>
      <div class="admin-user-menu-wrap"><button class="icon-btn admin-dots" type="button" data-admin-dots="${u.uid}" aria-label="${t('adminMenu')}">⋯</button><div class="admin-user-menu"><button type="button" data-admin-load-user="${u.uid}">${t('moderateUser')}</button><a href="#user/${u.uid}">${t('openUserProfile')}</a></div></div>
    </div>`).join('') : `<p>${t('adminNoUsers')}</p>`;
}
async function applyModerationAction(target, action, reason, role, moderator){
  if(action === 'ban') target.bannedUntil = 'permanent';
  if(action === 'mute') target.mutedUntil = 'permanent';
  if(action === 'unban') target.bannedUntil = null;
  if(action === 'unmute') target.mutedUntil = null;
  if(action === 'delete') target.deletedAt = new Date().toISOString();
  if(action === 'role'){
    const rating = ratingRoleKeys(target.rating);
    target.roles = [...new Set([role, ...rating, ...(target.emailVerified?['titleVerified']:[])])];
  }
  writeProfile(target);
  const payload = {action, reason, targetUid:target.uid, targetEmail:target.email || '', moderatorUid:moderator.uid, moderatorEmail:moderator.email || '', role};
  await window.PoluxDbService?.updateUserProfile?.(target.uid, target);
  await window.PoluxDbService?.saveAdminAction?.(payload);
  return payload;
}
function renderAdminPanelPage(){
  if(!currentUser){ openAuthModal('login'); location.hash = '#home'; return; }
  const me = ensureCurrentProfile();
  if(!isAdminProfile(me)){
    $('#app').innerHTML = `<section class="page-head page-panel"><p class="eyebrow">/admin</p><h1>${t('adminPanelTitle')}</h1><p>${t('adminOnly')}</p></section>`;
    return;
  }
  $('#app').innerHTML = `
    <section class="page-head page-panel admin-page">
      <p class="eyebrow">/admin</p>
      <h1>${t('adminPanelTitle')}</h1>
      <p>${t('adminPanelText')}</p>
    </section>
    <section class="admin-grid reveal">
      <article class="admin-card">
        <h3>${t('userModeration')}</h3>
        <form class="auth-form" id="adminUserForm">
          <label class="field"><span>${t('targetUser')}</span><input id="adminUserQuery" class="site-input" placeholder="${t('userSearchPlaceholder')}"></label>
          <label class="field"><span>${t('adminAction')}</span><select id="adminActionSelect">
${adminActionOptions()}
          </select></label>
          <label class="field" id="adminRoleWrap"><span>${t('adminRole')}</span><select id="adminRoleSelect">${roleOptions()}</select></label>
          <label class="field"><span>${t('moderationReason')}</span><textarea id="adminReason" class="site-input" maxlength="300"></textarea></label>
          <button class="btn primary" type="submit">${t('save')}</button>
          <div class="auth-status" id="adminStatus" aria-live="polite"></div>
        </form>
      </article>
      <article class="admin-card">
        <h3>${t('ratingRoles')}</h3>
        <div class="role-ladder">
          <span>${t('roleRookie')} · 0+</span>
          <span>${t('roleMechanic')} · 30+</span>
          <span>${t('roleDriver')} · 100+</span>
          <span>${t('roleFarmer')} · 250+</span>
          <span>${t('roleMaster')} · 500+</span>
          <span>${t('roleLegend')} · 1000+</span>
        </div>
      </article>
      <article class="admin-card">
        <h3>${t('complaints')}</h3>
        <p>${t('complaintsHint')}</p>
        <div class="admin-mini-list">${renderReportsPreview()}</div>
      </article>
      <article class="admin-card">
        <h3>${t('siteControls')}</h3>
        <label class="switch-row"><input type="checkbox" id="maintenanceToggle"> <span>${t('siteMaintenance')}</span></label>
        <label class="switch-row"><input type="checkbox" id="holidayToggle"> <span>${t('siteHolidayTheme')}</span></label>
        <p>${t('publishModsSoon')}</p>
      </article>
      <article class="admin-card admin-card-wide">
        <h3>${t('adminUsersList')}</h3>
        <label class="field admin-search-field"><span>${t('adminUserSearch')}</span><input id="adminUsersSearch" class="site-input" type="search" placeholder="${t('adminUserSearch')}"></label>
        <div class="admin-users-list" id="adminUsersList">${renderAdminUsersList()}</div>
      </article>
    </section>`;
  enhanceCustomSelects($('#app'));
  $('#adminActionSelect').addEventListener('change', () => $('#adminRoleWrap').classList.toggle('hidden', $('#adminActionSelect').value !== 'role'));
  $('#adminActionSelect').dispatchEvent(new Event('change'));
  const adminUserFromHash = new URLSearchParams((location.hash.split('?')[1] || '')).get('user');
  if(adminUserFromHash) $('#adminUserQuery').value = adminUserFromHash;
  function bindAdminUserList(){
    $$('[data-admin-dots]').forEach(btn => btn.addEventListener('click', e => { e.stopPropagation(); const row = btn.closest('.admin-user-row'); $$('.admin-user-row.menu-open').forEach(r=>{if(r!==row) r.classList.remove('menu-open')}); row.classList.toggle('menu-open'); }));
    $$('[data-admin-load-user]').forEach(btn => btn.addEventListener('click', () => { $('#adminUserQuery').value = btn.dataset.adminLoadUser; window.scrollTo({top:0,behavior:'smooth'}); $$('.admin-user-row.menu-open').forEach(r=>r.classList.remove('menu-open')); }));
  }
  bindAdminUserList();
  $('#adminUsersSearch')?.addEventListener('input', e => { $('#adminUsersList').innerHTML = renderAdminUsersList(e.target.value); bindAdminUserList(); });
  syncUsersIndexFromCloud().then(list => { if(list.length && $('#adminUsersList')){ $('#adminUsersList').innerHTML = renderAdminUsersList($('#adminUsersSearch')?.value || ''); bindAdminUserList(); } });
  $('#maintenanceToggle').addEventListener('change', e => window.PoluxDbService?.updateSiteSettings?.({maintenance:e.target.checked}));
  $('#holidayToggle').addEventListener('change', e => window.PoluxDbService?.updateSiteSettings?.({holidayTheme:e.target.checked}));
  $('#adminUserForm').addEventListener('submit', async e => {
    e.preventDefault();
    const status = $('#adminStatus');
    const target = findLocalProfileByQuery($('#adminUserQuery').value) || readProfile($('#adminUserQuery').value);
    const action = $('#adminActionSelect').value;
    const reason = $('#adminReason').value.trim();
    if(!target?.uid){ status.textContent = t('fieldRequired'); status.className='auth-status show error'; return; }
    let cloudOk = false;
    try{ await applyModerationAction(target, action, reason, $('#adminRoleSelect').value, me); cloudOk = true; }
    catch(_){ writeProfile(target); }
    $('#adminUsersList') && ($('#adminUsersList').innerHTML = renderAdminUsersList($('#adminUsersSearch')?.value || ''));
    status.textContent = cloudOk ? t('roleSavedToDb') : t('moderationLocalSaved');
    status.className = 'auth-status show ok';
  });
}
function renderReportsPreview(){
  const index = JSON.parse(localStorage.getItem(allProfilesKey()) || '{}');
  const rows = [];
  Object.values(index).forEach(u => {
    const p = readProfile(u.uid);
    (p.reports || []).slice(-3).forEach(r => rows.push(`<div class="admin-report-row"><strong data-no-translate>${p.name}</strong><small>${r.reason || ''} · ${formatDateShort(r.createdAt)}</small></div>`));
  });
  return rows.length ? rows.slice(-8).join('') : `<p>${t('complaintsHint')}</p>`;
}

function renderMyModsPage(){
  if(!currentUser){ openAuthModal('login'); location.hash='#home'; return; }
  const p = ensureCurrentProfile();
  const list = modsSource.filter(m => (m.author || '').toLowerCase() === (p.name || '').toLowerCase() || (m.author || '').toLowerCase()==='polux mods');
  $('#app').innerHTML = `<section class="page-head page-panel"><p class="eyebrow">/my-mods</p><h1>${t('myModsTitle')}</h1><p>${t('filteredByAuthor')} <strong data-no-translate>${p.name}</strong></p></section><section class="mods-grid reveal">${list.length?list.map(m=>{const x=translateRecord(m,currentLang);return `<article class="mod-card"><span class="tag">${x.category}</span><div class="pixel-art">${x.icon}</div><h3>${x.title}</h3><p>${x.desc}</p><footer><span class="status">${x.status}</span><a class="btn" href="#mods/${x.id}" data-link>${t('open')}</a></footer></article>`}).join(''):`<div class="page-panel narrow"><p>${t('noUserMods')}</p></div>`}</section>`;
}
function modalShell(id, title, body){
  let m = $('#'+id); if(m) m.remove();
  document.body.insertAdjacentHTML('beforeend', `<div class="auth-modal open profile-modal" id="${id}" aria-hidden="false"><div class="auth-card" role="dialog"><button class="auth-close" type="button" data-close-modal="${id}">×</button><p class="eyebrow">/profile</p><h2>${title}</h2>${body}</div></div>`);
  $('#'+id).addEventListener('click', e => { if(e.target.id===id || e.target.closest('[data-close-modal]')) $('#'+id).remove(); });
  return $('#'+id);
}
function openImageChoice(kind, p){
  const has = !!p[kind];
  const title = kind==='avatar' ? (has?t('replaceAvatar'):t('addAvatar')) : (has?t('replaceCover'):t('addCover'));
  const m = modalShell('imageChoiceModal', title, `<div class="auth-form"><button class="btn" id="imgFileBtn">${t('chooseFromFile')}</button><button class="btn" id="imgUrlBtn">${t('chooseFromUrl')}</button>${has?`<button class="btn danger-soft" id="imgRemoveBtn">${kind==='avatar'?t('removeAvatar'):t('removeCover')}</button>`:''}</div><input class="hidden" id="profileImageFile" type="file" accept="image/*">`);
  $('#imgFileBtn').onclick=()=>$('#profileImageFile').click();
  $('#profileImageFile').onchange=async e=>{ const file=e.target.files?.[0]; if(!file) return; try{ p[kind]=await compressImageToDataUrl(file, kind); writeProfile(p); m.remove(); renderProfileSettingsPage(); }catch(_){ const r=new FileReader(); r.onload=()=>{p[kind]=r.result; writeProfile(p); m.remove(); renderProfileSettingsPage();}; r.readAsDataURL(file); } };
  $('#imgUrlBtn').onclick=()=>{ const url=prompt(t('imageUrl')); if(url){p[kind]=url.trim(); writeProfile(p); m.remove(); renderProfileSettingsPage();} };
  $('#imgRemoveBtn') && ($('#imgRemoveBtn').onclick=()=>{p[kind]=''; writeProfile(p); m.remove(); renderProfileSettingsPage();});
}
function nameChangeWindow(p){ const monthAgo=Date.now()-30*86400000; return (p.nameChanges||[]).filter(d=>new Date(d).getTime()>monthAgo); }
function openNameModal(p){
  const changes = nameChangeWindow(p);
  const nextDate = changes.length>=2 ? new Date(new Date(changes[0]).getTime()+30*86400000) : null;
  const body = `<form class="auth-form" id="nameForm"><p class="auth-hint">${t('nameLimitHint')}</p>${nextDate?`<div class="auth-status show warn">${t('nameLimitReached')} ${t('nameAvailableAt')} ${formatDateShort(nextDate)}</div>`:''}<label class="field"><span>${t('accountName')}</span><input id="newProfileName" maxlength="32" value="${p.name.replace(/"/g,'&quot;')}"><small class="field-error" id="nameChangeError"></small></label><button class="btn primary" ${nextDate?'disabled':''}>${t('save')}</button></form>`;
  modalShell('nameModal', t('editName'), body);
  $('#nameForm').onsubmit=async e=>{e.preventDefault(); const v=$('#newProfileName').value.trim(); if(!v){$('#nameChangeError').textContent=t('fieldRequired');return;} if(v.length>32){$('#nameChangeError').textContent=t('nameTooLong');return;} p.name=v; p.nameChanges=[...changes,new Date().toISOString()]; writeProfile(p); try{ await getFirebaseAuth()?.currentUser?.updateProfile?.({displayName:v}); }catch(_){} $('#nameModal').remove(); renderProfileSettingsPage();};
}
function openBioModal(p){
  modalShell('bioModal', p.bio?t('editBio'):t('addBio'), `<form class="auth-form" id="bioForm"><label class="field"><span>${t('accountBio')}</span><textarea id="bioText" maxlength="70">${p.bio||''}</textarea><small class="field-error" id="bioError"></small></label><button class="btn primary">${t('save')}</button></form>`);
  $('#bioForm').onsubmit=e=>{e.preventDefault(); const v=$('#bioText').value.trim(); if(v.length>70){$('#bioError').textContent=t('bioTooLong');return;} p.bio=v; writeProfile(p); $('#bioModal').remove(); renderProfileSettingsPage();};
}
function openChangePasswordModal(){
  modalShell('changePasswordModal', t('changePassword'), `<form class="auth-form" id="changePasswordForm"><p class="auth-hint">${t('passwordChangeHint')}</p><label class="field"><span>${t('newPassword')}</span><div class="password-box"><input id="profileNewPassword" type="password"><button class="password-eye" type="button" data-toggle-password="profileNewPassword">◉</button></div><small class="field-error" id="profileNewPasswordError"></small></label><label class="field"><span>${t('confirmNewPassword')}</span><div class="password-box"><input id="profileNewPasswordConfirm" type="password"><button class="password-eye" type="button" data-toggle-password="profileNewPasswordConfirm">◉</button></div><small class="field-error" id="profileNewPasswordConfirmError"></small></label><button class="btn primary">${t('resetPasswordButton')}</button></form>`);
  $('#changePasswordForm').onsubmit=async e=>{e.preventDefault(); const a=$('#profileNewPassword').value,b=$('#profileNewPasswordConfirm').value; if(a.length<6){$('#profileNewPasswordError').textContent=t('passwordTooShort');return;} if(a!==b){$('#profileNewPasswordConfirmError').textContent=t('passwordsDontMatch');return;} try{ await getFirebaseAuth()?.currentUser?.updatePassword(a); alert(t('passwordChangedLogout')); getFirebaseAuth()?.signOut?.(); saveUser(null); $('#changePasswordModal').remove(); }catch(err){ alert(authErrorMessage(err)); }};
}
function openSessionsModal(p){
  touchSession(); p=readProfile();
  const rows=(p.sessions||[]).map(s=>`<div class="session-row"><div><strong>${s.current?t('currentSession'):s.browser}</strong><small>${s.browser} · ${s.platform} · ${formatDateShort(s.lastSeen)}<br>${s.userAgent}</small></div><button class="icon-btn" data-kill-session="${s.id}">×</button></div>`).join('');
  modalShell('sessionsModal', t('activeSessions'), `<div class="auth-form"><p class="auth-hint">${t('sessionsHint')}</p>${rows}<button class="btn danger-soft" id="killAllSessions">${t('closeAllSessions')}</button></div>`);
  $$('[data-kill-session]').forEach(b=>b.onclick=()=>{ if(confirm(t('confirmCloseSession'))){ const p=readProfile(); p.sessions=(p.sessions||[]).filter(s=>s.id!==b.dataset.killSession); writeProfile(p); if(b.dataset.killSession===sessionId()){getFirebaseAuth()?.signOut?.(); saveUser(null);} $('#sessionsModal').remove(); }});
  $('#killAllSessions').onclick=()=>{ if(confirm(t('confirmCloseAll'))){ p.sessions=[]; writeProfile(p); getFirebaseAuth()?.signOut?.(); saveUser(null); $('#sessionsModal').remove(); }};
}
function openDeleteAccountModal(p){
  modalShell('deleteAccountModal', t('deleteAccountTitle'), `<form class="auth-form" id="deleteAccountForm"><p class="auth-hint">${t('deleteAccountText')}</p><label class="field"><span>${t('password')}</span><div class="password-box"><input id="deletePassword" type="password"><button class="password-eye" type="button" data-toggle-password="deletePassword">◉</button></div><small class="field-error" id="deletePasswordError"></small></label><button class="btn danger-soft">${t('deleteAccount')}</button></form>`);
  $('#deleteAccountForm').onsubmit=async e=>{e.preventDefault(); if(!$('#deletePassword').value){$('#deletePasswordError').textContent=t('fieldRequired');return;} p.deletedAt=new Date().toISOString(); writeProfile(p); alert(t('accountDeleted')); getFirebaseAuth()?.signOut?.(); saveUser(null); $('#deleteAccountModal').remove(); location.hash='#home';};
}
function openCommentsModal(p){
  const items=(p.comments||[]).length ? p.comments.map(c=>`<a class="session-row" href="${c.url||'#mods'}"><span>${translateText(c.text||'',currentLang)}</span><small>${formatDateShort(c.createdAt)}</small></a>`).join('') : `<p>${t('noComments')}</p>`;
  modalShell('commentsModal', `${t('comments')} · ${(p.comments||[]).length}`, `<div class="auth-form">${items}</div>`);
}
function openReportModal(p){
  modalShell('reportModal', t('reportUser'), `<form class="auth-form" id="reportForm"><label class="field"><span>${t('reportReason')}</span><select id="reportReason"><option>${t('reportSpam')}</option><option>${t('reportInsult')}</option><option>${t('reportFake')}</option><option>${t('reportRules')}</option><option value="other">${t('reportOther')}</option></select></label><label class="field hidden" id="reportOtherWrap"><span>${t('reportDetails')}</span><textarea id="reportDetails"></textarea></label><button class="btn primary">${t('sendMessage')}</button></form>`);
  $('#reportReason').onchange=()=>$('#reportOtherWrap').classList.toggle('hidden',$('#reportReason').value!=='other');
  $('#reportForm').onsubmit=e=>{e.preventDefault(); const report={from:currentUser.uid, targetUid:p.uid, reason:$('#reportReason').value, details:$('#reportDetails')?.value||'', createdAt:new Date().toISOString()}; p.reports.push(report); writeProfile(p); window.PoluxDbService?.saveUserReport?.(report); alert(t('reportSent')); $('#reportModal').remove();};
}
function sendThanks(p){
  if(!currentUser || p.uid===currentUser.uid){alert(t('cantThankSelf'));return;}
  const month = new Date().toISOString().slice(0,7); const key=currentUser.uid+'_'+month; const sent=JSON.parse(localStorage.getItem('polux.thanks.sent')||'{}');
  if(sent[p.uid] || Object.keys(sent).filter(k=>k.endsWith('_'+month)).length>=3){alert(t('thanksLimit'));return;}
  if(confirm(t('thanksConfirm'))){ sent[p.uid]=true; sent[key]=true; localStorage.setItem('polux.thanks.sent',JSON.stringify(sent)); p.rating+=10; writeProfile(p); alert(t('thanksSent')); renderProfile(p.uid); }
}

checkResetActionFromUrl();
