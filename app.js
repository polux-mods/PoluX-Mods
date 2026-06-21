const $ = (q, root = document) => root.querySelector(q);
const $$ = (q, root = document) => [...root.querySelectorAll(q)];

const STORAGE = {
  theme: 'polux.theme', crt: 'polux.crt', lang: 'polux.lang', user: 'polux.user', profileData: 'polux.profile.data', sessions: 'polux.sessions', thanks: 'polux.thanks', reports: 'polux.reports'
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
  loginShort:'Вхід',profileTitle:'Профіль',loginTitle:'Вхід',registerTitle:'Реєстрація',authHint:'Увійдіть у Polux Mods або створіть акаунт для профілю, обраних модів і майбутніх можливостей спільноти.',loginTab:'Вхід',registerTab:'Реєстрація',displayName:"Ім\'я профілю",password:'Пароль',loginButton:'Увійти',registerButton:'Створити акаунт',logout:'Вийти',profileGuest:'Ви ще не увійшли.',openLogin:'Увійти або зареєструватись',profileEmail:'Email',profileRole:'Роль',userRole:'Користувач',userRole:'Користувач',avatarFuture:'Аватарка профілю автоматично береться з Google-акаунта або профілю користувача.',menuProfile:'Профіль',menuMyMods:'Мої моди',menuSettings:'Налаштування',menuLogout:'Вихід',confirmPassword:'Підтвердження пароля',showPassword:'Показати пароль',hidePassword:'Сховати пароль',fieldRequired:'Це поле обов’язкове.',emailInvalid:'Введіть коректний email у форматі name@example.com.',passwordsDontMatch:'Паролі не збігаються.',passwordTooShort:'Пароль має містити мінімум 6 символів.',emailVerificationSent:'Ми надіслали лист підтвердження на вашу пошту. Перейдіть за посиланням у листі, потім натисніть «Я вже підтвердив».',verifyEmailBeforeLogin:'Спочатку підтвердіть електронну пошту. Ми можемо надіслати лист ще раз.',resendVerification:'Надіслати лист ще раз',checkVerification:'Я вже підтвердив',verificationStillPending:'Пошта ще не підтверджена. Перевірте лист у папці «Вхідні» або «Спам».',verificationSuccess:'Пошта підтверджена. Вхід виконано.',verificationResent:'Лист підтвердження надіслано ще раз.',firebaseConfigMissing:'Firebase не підключився. Перевір scripts/firebase-config.js і домен у Firebase Authorized domains.',authWrongCredentials:'Неправильний email або пароль.',authEmailInUse:'Цей email вже зареєстрований.',authNetworkError:'Немає з’єднання або Firebase недоступний.',emailNotVerifiedBadge:'Пошта очікує підтвердження',emailVerifiedBadge:'Пошта підтверджена'
};

const TRANSLATION_MEMORY = {
  ru: {loading:'Загрузка модуля...',navHome:'Главная',navMods:'Моды',navAbout:'Проект',navContact:'Связь',crtOff:'CRT: вкл.',crtOn:'CRT: выкл.',heroTitle:'Минималистичный гараж модов в старом пиксельном стиле.',heroText:'Polux Mods — будущая база качественных модификаций, техники, карт и обновлений для мобильного Farming Simulator.',viewMods:'Смотреть моды',learnMore:'Подробнее',featureDesign:'Чистый дизайн',featureDesignText:'Минимум шума, максимум атмосферы: сетка, пиксельные акценты, точные отступы.',featureSpa:'SPA-переходы',featureSpaText:'Страницы переключаются без перезагрузки браузера, с ретро-анимацией.',featureFuture:'Онлайн-система',featureFutureText:'Сейчас моды находятся в JS-массиве, но структура подготовлена для API, аккаунтов и админ-панели.',modsTitle:'Каталог модов',modsText:'Официальный каталог модов Polux Mods с техникой, картами, инструментами и обновлениями для FS Mobile.',searchPlaceholder:'Поиск мода...',allCategories:'Все категории',aboutTitle:'О Polux Mods',aboutText:'Polux Mods — полноценный сайт для модов Farming Simulator Mobile: адаптивный каталог, аккаунты пользователей, профили и удобная навигация.',contactTitle:'Связь',contactText:'Здесь позже можно добавить форму, Telegram, Discord, GitHub или админ-панель для заявок на моды.',namePlaceholder:'Ваше имя',emailPlaceholder:'Email',messagePlaceholder:'Сообщение',sendMessage:'Надіслати',open:'Открыть',download:'Скачать',status:'Статус',category:'Категория',version:'Версия',game:'Игра',back:'Назад к каталогу',universalTemplate:'Страница мода содержит описание, версию, статус, требования, список изменений и ссылки на скачивание.',loginShort:'Вход',profileTitle:'Профиль',loginTitle:'Вход',registerTitle:'Регистрация',authHint:'Войдите в Polux Mods или создайте аккаунт для профиля, избранных модов и возможностей сообщества.',loginTab:'Вход',registerTab:'Регистрация',displayName:'Имя профиля',password:'Пароль',loginButton:'Войти',registerButton:'Создать аккаунт',logout:'Выйти',profileGuest:'Вы еще не вошли.',openLogin:'Войти или зарегистрироваться',profileEmail:'Email',profileRole:'Роль',userRole:'Пользователь',userRole:'Пользователь',avatarFuture:'Аватар профиля автоматически берётся из Google-аккаунта или профиля пользователя.',menuProfile:'Профиль',menuMyMods:'Мои моды',menuSettings:'Настройки',menuLogout:'Выход',confirmPassword:'Подтверждение пароля',showPassword:'Показать пароль',hidePassword:'Скрыть пароль',fieldRequired:'Это поле обязательно.',emailInvalid:'Введите корректный email в формате name@example.com.',passwordsDontMatch:'Пароли не совпадают.',passwordTooShort:'Пароль должен содержать минимум 6 символов.',emailVerificationSent:'Мы отправили письмо подтверждения на вашу почту. Перейдите по ссылке в письме, затем нажмите «Я уже подтвердил».',verifyEmailBeforeLogin:'Сначала подтвердите электронную почту. Мы можем отправить письмо еще раз.',resendVerification:'Отправить письмо еще раз',checkVerification:'Я уже подтвердил',verificationStillPending:'Почта еще не подтверждена. Проверьте письмо во «Входящих» или «Спаме».',verificationSuccess:'Почта подтверждена. Вход выполнен.',verificationResent:'Письмо подтверждения отправлено еще раз.',firebaseConfigMissing:'Firebase не подключился. Проверьте scripts/firebase-config.js и домен в Firebase Authorized domains.',authWrongCredentials:'Неправильный email или пароль.',authEmailInUse:'Этот email уже зарегистрирован.',authNetworkError:'Нет соединения или Firebase недоступен.',emailNotVerifiedBadge:'Почта ожидает подтверждения',emailVerifiedBadge:'Почта подтверждена'},
  en: {loading:'Loading module...',navHome:'Home',navMods:'Mods',navAbout:'Project',navContact:'Contact',crtOff:'CRT: on',crtOn:'CRT: off',heroTitle:'A minimalist mod garage in an old pixel style.',heroText:'Polux Mods is a future database of quality modifications, vehicles, maps and updates for mobile Farming Simulator.',viewMods:'View mods',learnMore:'Learn more',featureDesign:'Clean design',featureDesignText:'Less noise, more atmosphere: grid, pixel accents and precise spacing.',featureSpa:'SPA transitions',featureSpaText:'Pages switch without browser reloads, using a retro animation.',featureFuture:'Database-ready',featureFutureText:'Mods are currently stored in a JS array, but the structure is ready for API, accounts and an admin panel.',modsTitle:'Mods catalog',modsText:'A catalog template that can later be filled from a database.',searchPlaceholder:'Search mod...',allCategories:'All categories',aboutTitle:'About Polux Mods',aboutText:'This is a starter site for Farming Simulator Mobile mods. It is built from scratch: responsive, fast, and ready for a future database and account system.',contactTitle:'Contact',contactText:'A form, Telegram, Discord, GitHub or an admin panel for mod requests can be added here later.',namePlaceholder:'Your name',emailPlaceholder:'Email',messagePlaceholder:'Message',sendMessage:'Send',open:'Open',download:'Download',status:'Status',category:'Category',version:'Version',game:'Game',back:'Back to catalog',universalTemplate:'This is a universal mod page template: screenshots, requirements, versions, changelog, download links and comments can be loaded from a database later.',loginShort:'Login',profileTitle:'Profile',loginTitle:'Login',registerTitle:'Registration',authHint:'Sign in to Polux Mods or create an account for your profile, favorite mods, and community features.',loginTab:'Login',registerTab:'Register',displayName:'Profile name',password:'Password',loginButton:'Log in',registerButton:'Create account',logout:'Log out',profileGuest:'You are not logged in yet.',openLogin:'Log in or register',profileEmail:'Email',profileRole:'Role',userRole:'User',userRole:'User',avatarFuture:'The profile avatar is taken automatically from your Google account or user profile.',menuProfile:'Profile',menuMyMods:'My mods',menuSettings:'Settings',menuLogout:'Log out',confirmPassword:'Confirm password',showPassword:'Show password',hidePassword:'Hide password',fieldRequired:'This field is required.',emailInvalid:'Enter a valid email in the format name@example.com.',passwordsDontMatch:'Passwords do not match.',passwordTooShort:'Password must be at least 6 characters.',emailVerificationSent:'We sent a verification email. Open the link in that email, then press “I have confirmed”.',verifyEmailBeforeLogin:'Please verify your email first. We can send the verification email again.',resendVerification:'Send email again',checkVerification:'I have confirmed',verificationStillPending:'Email is not verified yet. Check Inbox or Spam.',verificationSuccess:'Email verified. You are logged in.',verificationResent:'Verification email sent again.',firebaseConfigMissing:'Firebase did not connect. Check scripts/firebase-config.js and Firebase Authorized domains.',authWrongCredentials:'Wrong email or password.',authEmailInUse:'This email is already registered.',authNetworkError:'No connection or Firebase is unavailable.',emailNotVerifiedBadge:'Email verification pending',emailVerifiedBadge:'Email verified'},
  pl: {navHome:'Główna',navMods:'Mody',navAbout:'Projekt',navContact:'Kontakt',loading:'Ładowanie modułu...',crtOff:'CRT: wł.',crtOn:'CRT: wył.',heroTitle:'Minimalistyczny garaż modów w starym pikselowym stylu.',heroText:'Polux Mods to przyszła baza jakościowych modyfikacji, maszyn, map i aktualizacji do mobilnego Farming Simulator.',viewMods:'Zobacz mody',learnMore:'Więcej',modsTitle:'Katalog modów',searchPlaceholder:'Szukaj moda...',allCategories:'Wszystkie kategorie',open:'Otwórz',download:'Pobierz',back:'Powrót do katalogu',confirmPassword:'Potwierdź hasło',showPassword:'Pokaż hasło',hidePassword:'Ukryj hasło',fieldRequired:'To pole jest wymagane.',emailInvalid:'Wpisz poprawny email w formacie name@example.com.',passwordsDontMatch:'Hasła nie są takie same.',passwordTooShort:'Hasło musi mieć co najmniej 6 znaków.',emailVerificationSent:'Wysłaliśmy wiadomość weryfikacyjną. Otwórz link w mailu, potem kliknij „Już potwierdziłem”.',verifyEmailBeforeLogin:'Najpierw potwierdź email. Możemy wysłać wiadomość ponownie.',resendVerification:'Wyślij ponownie',checkVerification:'Już potwierdziłem',verificationStillPending:'Email nie jest jeszcze potwierdzony. Sprawdź Odebrane lub Spam.',verificationSuccess:'Email potwierdzony. Zalogowano.',verificationResent:'Wiadomość weryfikacyjna została wysłana ponownie.',firebaseConfigMissing:'Firebase nie jest jeszcze skonfigurowany. Uzupełnij POLUX_FIREBASE_CONFIG w index.html.',authWrongCredentials:'Nieprawidłowy email lub hasło.',authEmailInUse:'Ten email jest już zarejestrowany.',authNetworkError:'Brak połączenia albo Firebase jest niedostępny.',emailNotVerifiedBadge:'Email oczekuje na potwierdzenie',emailVerifiedBadge:'Email potwierdzony'},
  de: {navHome:'Start',navMods:'Mods',navAbout:'Projekt',navContact:'Kontakt',loading:'Modul wird geladen...',crtOff:'CRT: ein',crtOn:'CRT: aus',heroTitle:'Eine minimalistische Mod-Garage im alten Pixel-Stil.',heroText:'Polux Mods ist eine zukünftige Datenbank für hochwertige Mods, Fahrzeuge, Karten und Updates für Farming Simulator Mobile.',viewMods:'Mods ansehen',learnMore:'Mehr erfahren',modsTitle:'Mod-Katalog',searchPlaceholder:'Mod suchen...',allCategories:'Alle Kategorien',open:'Öffnen',download:'Herunterladen',back:'Zurück zum Katalog',confirmPassword:'Passwort bestätigen',showPassword:'Passwort anzeigen',hidePassword:'Passwort ausblenden',fieldRequired:'Dieses Feld ist erforderlich.',emailInvalid:'Gib eine gültige E-Mail im Format name@example.com ein.',passwordsDontMatch:'Die Passwörter stimmen nicht überein.',passwordTooShort:'Das Passwort muss mindestens 6 Zeichen lang sein.',emailVerificationSent:'Wir haben eine Bestätigungs-E-Mail gesendet. Öffne den Link und klicke danach auf „Ich habe bestätigt“.',verifyEmailBeforeLogin:'Bitte bestätige zuerst deine E-Mail. Wir können die E-Mail erneut senden.',resendVerification:'E-Mail erneut senden',checkVerification:'Ich habe bestätigt',verificationStillPending:'E-Mail ist noch nicht bestätigt. Prüfe Posteingang oder Spam.',verificationSuccess:'E-Mail bestätigt. Du bist angemeldet.',verificationResent:'Bestätigungs-E-Mail erneut gesendet.',firebaseConfigMissing:'Firebase ist noch nicht konfiguriert. Fülle POLUX_FIREBASE_CONFIG in index.html aus.',authWrongCredentials:'Falsche E-Mail oder falsches Passwort.',authEmailInUse:'Diese E-Mail ist bereits registriert.',authNetworkError:'Keine Verbindung oder Firebase ist nicht verfügbar.',emailNotVerifiedBadge:'E-Mail-Bestätigung ausstehend',emailVerifiedBadge:'E-Mail bestätigt'},
  es: {navHome:'Inicio',navMods:'Mods',navAbout:'Proyecto',navContact:'Contacto',loading:'Cargando módulo...',crtOff:'CRT: activado',crtOn:'CRT: desactivado',heroTitle:'Un garaje minimalista de mods con estilo píxel antiguo.',heroText:'Polux Mods será una base de datos de modificaciones, vehículos, mapas y actualizaciones de calidad para Farming Simulator Mobile.',viewMods:'Ver mods',learnMore:'Más detalles',modsTitle:'Catálogo de mods',searchPlaceholder:'Buscar mod...',allCategories:'Todas las categorías',open:'Abrir',download:'Descargar',back:'Volver al catálogo',confirmPassword:'Confirmar contraseña',showPassword:'Mostrar contraseña',hidePassword:'Ocultar contraseña',fieldRequired:'Este campo es obligatorio.',emailInvalid:'Introduce un email válido con el formato name@example.com.',passwordsDontMatch:'Las contraseñas no coinciden.',passwordTooShort:'La contraseña debe tener al menos 6 caracteres.',emailVerificationSent:'Enviamos un email de verificación. Abre el enlace del email y luego pulsa “Ya confirmé”.',verifyEmailBeforeLogin:'Primero confirma tu email. Podemos enviar el email otra vez.',resendVerification:'Enviar otra vez',checkVerification:'Ya confirmé',verificationStillPending:'El email aún no está verificado. Revisa Entrada o Spam.',verificationSuccess:'Email verificado. Sesión iniciada.',verificationResent:'Email de verificación enviado otra vez.',firebaseConfigMissing:'Firebase aún no está configurado. Rellena POLUX_FIREBASE_CONFIG en index.html.',authWrongCredentials:'Email o contraseña incorrectos.',authEmailInUse:'Este email ya está registrado.',authNetworkError:'Sin conexión o Firebase no está disponible.',emailNotVerifiedBadge:'Email pendiente de verificación',emailVerifiedBadge:'Email verificado'},
  fr: {navHome:'Accueil',navMods:'Mods',navAbout:'Projet',navContact:'Contact',loading:'Chargement du module...',crtOff:'CRT : activé',crtOn:'CRT : désactivé',heroTitle:'Un garage de mods minimaliste au style pixel rétro.',heroText:'Polux Mods sera une base de données de modifications, véhicules, cartes et mises à jour de qualité pour Farming Simulator Mobile.',viewMods:'Voir les mods',learnMore:'Détails',modsTitle:'Catalogue de mods',searchPlaceholder:'Rechercher un mod...',allCategories:'Toutes les catégories',open:'Ouvrir',download:'Télécharger',back:'Retour au catalogue',confirmPassword:'Confirmer le mot de passe',showPassword:'Afficher le mot de passe',hidePassword:'Masquer le mot de passe',fieldRequired:'Ce champ est obligatoire.',emailInvalid:'Saisis un email valide au format name@example.com.',passwordsDontMatch:'Les mots de passe ne correspondent pas.',passwordTooShort:'Le mot de passe doit contenir au moins 6 caractères.',emailVerificationSent:'Nous avons envoyé un email de vérification. Ouvre le lien, puis appuie sur « J’ai confirmé ».',verifyEmailBeforeLogin:'Confirme d’abord ton email. Nous pouvons renvoyer le message.',resendVerification:'Renvoyer l’email',checkVerification:'J’ai confirmé',verificationStillPending:'L’email n’est pas encore confirmé. Vérifie la boîte de réception ou les spams.',verificationSuccess:'Email confirmé. Connexion effectuée.',verificationResent:'Email de vérification renvoyé.',firebaseConfigMissing:'Firebase n’est pas encore configuré. Remplis POLUX_FIREBASE_CONFIG dans index.html.',authWrongCredentials:'Email ou mot de passe incorrect.',authEmailInUse:'Cet email est déjà enregistré.',authNetworkError:'Pas de connexion ou Firebase indisponible.',emailNotVerifiedBadge:'Email en attente de confirmation',emailVerifiedBadge:'Email confirmé'}
};


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

const PROFILE_EXTRA_TRANSLATIONS = {
  uk:{profileSettingsTitle:'Налаштування профілю',lastOnline:'Останній онлайн',registrationDate:'Дата реєстрації',todayRegistered:'сьогодні',daysShort:'дн.',monthsShort:'міс.',userRating:'Рейтинг',userMods:'Моди користувача',userComments:'Коментарі',avatarManage:'Аватарка профілю',coverManage:'Фон профілю',addImage:'Додати',replaceImage:'Замінити',deleteImage:'Видалити',fromFile:'з файлу',fromUrl:'з посилання',imageUrlPrompt:'Встав посилання на зображення',coverReplaceDelete:'Змінити / видалити фон',coverAdd:'Додати фон',avatarReplaceDelete:'Змінити / видалити аватарку',avatarAdd:'Додати аватарку',changeName:'Змінити ім’я',changeNameHint:'Ім’я можна змінити не більше 2 разів за 30 днів.',nameChangesLeft:'Залишилось змін',nameLimitReached:'Ліміт зміни імені вичерпано. Наступна зміна після:',profileBio:'Опис акаунту',bioEmpty:'Опис ще не додано.',bioHint:'Опис акаунту, максимум 70 символів.',addBio:'Додати опис',editBio:'Змінити опис',deleteBio:'Видалити опис',security:'Безпека',changePassword:'Змінити пароль',activeSessions:'Активні сесії',dangerZone:'Небезпечна зона',deleteAccount:'Видалити акаунт',deleteAccountWarning:'Після видалення акаунт можна відновити протягом 30 днів. Дані профілю будуть позначені як видалені. Продовжити?',confirmPasswordToDelete:'Введіть пароль для підтвердження видалення акаунту',accountSoftDeletedLocal:'Акаунт позначено як видалений локально. Для повного видалення Firebase може вимагати повторний вхід.',unknownDevice:'Пристрій',noSessions:'Активних сесій не знайдено.',endAllSessions:'Завершити всі',confirmEndSession:'Завершити цю сесію?',confirmEndAllSessions:'Завершити всі сесії та вийти?',otherProfilesLater:'Перегляд інших профілів буде підключено разом із базою користувачів.',thanksLater:'Подяки будуть збережені в базі після підключення Firestore.',reportReasonPrompt:'Вкажіть причину скарги: спам, образи, шахрайство, порушення правил або інше.',reportSaved:'Скаргу збережено для адмін-панелі.'},
  en:{profileSettingsTitle:'Profile settings',lastOnline:'Last online',registrationDate:'Registration date',todayRegistered:'today',daysShort:'days',monthsShort:'mo.',userRating:'Rating',userMods:'User mods',userComments:'Comments',avatarManage:'Profile avatar',coverManage:'Profile cover',addImage:'Add',replaceImage:'Replace',deleteImage:'Delete',fromFile:'from file',fromUrl:'from URL',imageUrlPrompt:'Paste image URL',coverReplaceDelete:'Change / delete cover',coverAdd:'Add cover',avatarReplaceDelete:'Change / delete avatar',avatarAdd:'Add avatar',changeName:'Change name',changeNameHint:'Name can be changed no more than 2 times per 30 days.',nameChangesLeft:'Changes left',nameLimitReached:'Name change limit reached. Next change after:',profileBio:'Account bio',bioEmpty:'No bio added yet.',bioHint:'Account bio, max 70 characters.',addBio:'Add bio',editBio:'Edit bio',deleteBio:'Delete bio',security:'Security',changePassword:'Change password',activeSessions:'Active sessions',dangerZone:'Danger zone',deleteAccount:'Delete account',deleteAccountWarning:'After deletion the account can be restored for 30 days. Profile data will be marked as deleted. Continue?',confirmPasswordToDelete:'Enter password to confirm account deletion',accountSoftDeletedLocal:'Account marked as deleted locally. Firebase may require recent login for full deletion.',unknownDevice:'Device',noSessions:'No active sessions found.',endAllSessions:'End all',confirmEndSession:'End this session?',confirmEndAllSessions:'End all sessions and log out?',otherProfilesLater:'Other user profiles will be connected with the user database.',thanksLater:'Thanks will be stored after Firestore is connected.',reportReasonPrompt:'Enter report reason: spam, insults, fraud, rule violation or other.',reportSaved:'Report saved for admin panel.'},
  ru:{profileSettingsTitle:'Настройки профиля',lastOnline:'Последний онлайн',registrationDate:'Дата регистрации',todayRegistered:'сегодня',daysShort:'дн.',monthsShort:'мес.',userRating:'Рейтинг',userMods:'Моды пользователя',userComments:'Комментарии',avatarManage:'Аватар профиля',coverManage:'Фон профиля',addImage:'Добавить',replaceImage:'Заменить',deleteImage:'Удалить',fromFile:'из файла',fromUrl:'по ссылке',imageUrlPrompt:'Вставьте ссылку на изображение',coverReplaceDelete:'Изменить / удалить фон',coverAdd:'Добавить фон',avatarReplaceDelete:'Изменить / удалить аватар',avatarAdd:'Добавить аватар',changeName:'Изменить имя',changeNameHint:'Имя можно менять не больше 2 раз за 30 дней.',nameChangesLeft:'Осталось изменений',nameLimitReached:'Лимит изменения имени исчерпан. Следующая смена после:',profileBio:'Описание аккаунта',bioEmpty:'Описание еще не добавлено.',bioHint:'Описание аккаунта, максимум 70 символов.',addBio:'Добавить описание',editBio:'Изменить описание',deleteBio:'Удалить описание',security:'Безопасность',changePassword:'Изменить пароль',activeSessions:'Активные сессии',dangerZone:'Опасная зона',deleteAccount:'Удалить аккаунт',deleteAccountWarning:'После удаления аккаунт можно восстановить в течение 30 дней. Данные профиля будут помечены как удаленные. Продолжить?',confirmPasswordToDelete:'Введите пароль для подтверждения удаления аккаунта',accountSoftDeletedLocal:'Аккаунт помечен как удаленный локально. Для полного удаления Firebase может потребовать повторный вход.',unknownDevice:'Устройство',noSessions:'Активные сессии не найдены.',endAllSessions:'Завершить все',confirmEndSession:'Завершить эту сессию?',confirmEndAllSessions:'Завершить все сессии и выйти?',otherProfilesLater:'Просмотр чужих профилей будет подключен вместе с базой пользователей.',thanksLater:'Благодарности будут сохраняться после подключения Firestore.',reportReasonPrompt:'Укажите причину жалобы: спам, оскорбления, мошенничество, нарушение правил или другое.',reportSaved:'Жалоба сохранена для админ-панели.'}
};
Object.entries(PROFILE_EXTRA_TRANSLATIONS).forEach(([lang, pack]) => Object.assign(TRANSLATION_MEMORY[lang] ||= {}, pack));
Object.assign(UI_UK, PROFILE_EXTRA_TRANSLATIONS.uk);


const GLOSSARY = {
  ru: {'Моди':'Моды','модів':'модов','мода':'мода','Каталог':'Каталог','Усі категорії':'Все категории','Трактори':'Тракторы','Причепи':'Прицепы','Карти':'Карты','Інструменти':'Инструменты','В розробці':'В разработке','Шаблон':'Шаблон','Концепт':'Концепт','Заплановано':'Запланировано','гусеничного трактора':'гусеничного трактора','з відвальним обладнанням':'с отвальным оборудованием','для майбутньої бази даних':'для будущей базы данных'},
  en: {'Моди':'Mods','модів':'mods','мода':'mod','Каталог':'Catalog','Усі категорії':'All categories','Трактори':'Tractors','Причепи':'Trailers','Карти':'Maps','Інструменти':'Tools','В розробці':'In progress','Шаблон':'Template','Концепт':'Concept','Заплановано':'Planned','гусеничного трактора':'tracked tractor','з відвальним обладнанням':'with blade equipment','для майбутньої бази даних':'for the future database'},
  pl: {'Моди':'Mody','модів':'modów','Трактори':'Ciągniki','Причепи':'Przyczepy','Карти':'Mapy','Інструменти':'Narzędzia','В розробці':'W trakcie','Шаблон':'Szablon','Концепт':'Koncepcja','Заплановано':'Planowane'},
  de: {'Моди':'Mods','модів':'Mods','Трактори':'Traktoren','Причепи':'Anhänger','Карти':'Karten','Інструменти':'Werkzeuge','В розробці':'In Arbeit','Шаблон':'Vorlage','Концепт':'Konzept','Заплановано':'Geplant'},
  es: {'Моди':'Mods','модів':'mods','Трактори':'Tractores','Причепи':'Remolques','Карти':'Mapas','Інструменти':'Herramientas','В розробці':'En progreso','Шаблон':'Plantilla','Концепт':'Concepto','Заплановано':'Planeado'},
  fr: {'Моди':'Mods','модів':'mods','Трактори':'Tracteurs','Причепи':'Remorques','Карти':'Cartes','Інструменти':'Outils','В розробці':'En cours','Шаблон':'Modèle','Концепт':'Concept','Заплановано':'Prévu'}
};

const categoryKeys = {tractors:'Трактори', trailers:'Причепи', maps:'Карти', tools:'Інструменти'};
const statusKeys = {progress:'В розробці', template:'Доступний', concept:'Концепт', planned:'Заплановано'};

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
  {id:'t4a-bulldozer', author:'Polux Mods', title:'PLX T-4A Bulldozer', category:categoryKeys.tractors, version:'0.9 beta', game:'FS Mobile 20', status:statusKeys.progress, icon:'🚜', desc:'Гусеничний трактор з відвальним обладнанням для важких робіт на фермі.'},
  {id:'grain-trailer', author:'Polux Mods', title:'PLX Grain Trailer', category:categoryKeys.trailers, version:'1.0 draft', game:'FS Mobile 20', status:statusKeys.template, icon:'▰', desc:'Зерновий причіп для перевезення врожаю з детальним описом і характеристиками.'},
  {id:'pixel-map-pack', author:'Polux Mods', title:'Pixel Farm Map Pack', category:categoryKeys.maps, version:'0.1 concept', game:'FS Mobile 20', status:statusKeys.concept, icon:'▦', desc:'Пак карт із піксельною атмосферою, описом, скріншотами та списком змін.'},
  {id:'utility-pack', author:'Polux Mods', title:'Polux Utility Pack', category:categoryKeys.tools, version:'0.2', game:'FS Mobile 20', status:statusKeys.planned, icon:'⚙', desc:'Пак допоміжних модів, виправлень і невеликих доповнень для зручної гри.'}
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
    else if(page === 'about') renderTemplate('aboutTemplate');
    else if(page === 'contact') renderTemplate('contactTemplate');
    else if(page === 'profile' && id === 'settings') renderTemplate('profileTemplate', renderProfileSettings);
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
  if(user && typeof registerSession === 'function') registerSession();
  updateProfileButton();
  if((location.hash.replace('#','') || 'home') === 'profile') renderProfile();
}
function defaultAvatarSvg(){
  return `<svg viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="8" fill="none"/><circle cx="32" cy="24" r="12"/><path d="M12 58c3-15 13-22 20-22s17 7 20 22"/></svg>`;
}
function updateProfileButton(){
  const name = $('#profileName');
  const avatar = $('#profileAvatar');
  if(!name || !avatar) return;
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
function positionProfileMenu(){
  const btn = $('#profileBtn');
  const menu = $('#profileMenu');
  if(!btn || !menu || !$('#profileWrap')?.classList.contains('open')) return;
  const rect = btn.getBoundingClientRect();
  const gap = 8, margin = 10;
  const width = Math.min(190, window.innerWidth - margin * 2);
  const left = Math.min(Math.max(rect.right - width, margin), window.innerWidth - width - margin);
  const top = rect.bottom + gap;
  menu.style.left = left + 'px';
  menu.style.right = 'auto';
  menu.style.top = top + 'px';
  menu.style.width = width + 'px';
  menu.style.maxHeight = Math.max(130, window.innerHeight - top - margin) + 'px';
}


function profileKey(uidOrEmail){ return (uidOrEmail || currentUser?.uid || currentUser?.email || 'guest').replace(/[^a-zA-Z0-9_.@-]/g,'_'); }
function readProfiles(){ try{return JSON.parse(localStorage.getItem(STORAGE.profileData)||'{}')}catch(e){return{}} }
function writeProfiles(data){ localStorage.setItem(STORAGE.profileData, JSON.stringify(data)); }
function defaultProfileData(user=currentUser){
  const now = new Date().toISOString();
  return {uid:user?.uid||'', email:user?.email||'', name:user?.name||user?.displayName||user?.email?.split('@')[0]||t('userRole'), avatar:user?.avatar||user?.photoURL||null, cover:null, bio:'', roleKeys:['userRole'], rating:0, modsCount:0, commentsCount:0, createdAt:now, lastOnline:now, nameChanges:[], deletedUntil:null, deletedAt:null};
}
function ensureProfileRecord(firebaseUser){
  const u = firebaseUser ? firebaseUserToSafe(firebaseUser) : currentUser;
  if(!u) return null;
  const key = profileKey(u.uid || u.email);
  const all = readProfiles();
  if(!all[key]) all[key] = defaultProfileData(u);
  all[key] = {...all[key], uid:u.uid||all[key].uid, email:u.email||all[key].email, name:all[key].name||u.name, avatar:all[key].avatar||u.avatar||null, lastOnline:new Date().toISOString()};
  writeProfiles(all);
  return all[key];
}
function firebaseUserToSafe(user){ return {uid:user?.uid||'', email:user?.email||'', name:user?.displayName||user?.email?.split('@')[0]||'', avatar:user?.photoURL||null}; }
function getMyProfile(){ if(!currentUser) return null; return ensureProfileRecord(); }
function saveMyProfile(p){
  if(!currentUser) return;
  const all = readProfiles();
  all[profileKey(currentUser.uid || currentUser.email)] = p;
  writeProfiles(all);
  currentUser.name = p.name || currentUser.name;
  currentUser.avatar = p.avatar || null;
  saveUser(currentUser);
}
function escapeHtml(v=''){ return String(v).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function fmtDate(iso){ if(!iso) return '—'; try{return new Intl.DateTimeFormat(currentLang,{dateStyle:'medium',timeStyle:'short'}).format(new Date(iso));}catch(e){return iso;} }
function monthAge(iso){
  if(!iso) return '';
  const days = Math.max(0, Math.floor((Date.now()-new Date(iso).getTime())/86400000));
  if(days<1) return t('todayRegistered');
  if(days<30) return `${days} ${t('daysShort')}`;
  const months=Math.floor(days/30); return `${months} ${t('monthsShort')}`;
}
function profileCoverHtml(p){ return p?.cover ? `<img src="${escapeHtml(p.cover)}" alt="">` : `<div class="profile-cover-default">POLUX MODS</div>`; }
function profileAvatarHtml(p, cls='profile-big-avatar'){ return `<div class="${cls}">${p?.avatar ? `<img src="${escapeHtml(p.avatar)}" alt="">` : defaultAvatarSvg()}</div>`; }
function renderProfile(){
  const box = $('#profileView');
  if(!box) return;
  if(!currentUser){
    box.innerHTML = `<div class="profile-empty"><div class="profile-big-avatar">${defaultAvatarSvg()}</div><p>${t('profileGuest')}</p><button class="btn primary" type="button" id="profileLoginBtn">${t('openLogin')}</button></div>`;
    $('#profileLoginBtn').addEventListener('click', () => openAuthModal('login'));
    return;
  }
  const p = getMyProfile();
  box.innerHTML = `
    <article class="profile-full-card">
      <div class="profile-cover">${profileCoverHtml(p)}</div>
      <div class="profile-headline">
        ${profileAvatarHtml(p)}
        <div class="profile-main-info">
          <h2 data-no-translate>${escapeHtml(p.name || currentUser.name || t('userRole'))}</h2>
          <div class="profile-ranks"><span>${t('userRole')}</span></div>
          <p class="verify-badge ${currentUser.emailVerified ? 'ok' : 'warn'}">${t(currentUser.emailVerified ? 'emailVerifiedBadge' : 'emailNotVerifiedBadge')}</p>
        </div>
      </div>
      ${p.bio ? `<p class="profile-bio">${escapeHtml(p.bio)}</p>` : ''}
      <div class="profile-stats-grid">
        <div><strong>${t('lastOnline')}</strong><span>${fmtDate(p.lastOnline)}</span></div>
        <div><strong>${t('registrationDate')}</strong><span>${fmtDate(p.createdAt)} · ${monthAge(p.createdAt)}</span></div>
        <div><strong>${t('userRating')}</strong><span>${Number(p.rating||0)}</span></div>
        <div><strong>${t('userMods')}</strong><span>${Number(p.modsCount||0)}</span></div>
        <div><strong>${t('userComments')}</strong><span>${Number(p.commentsCount||0)}</span></div>
      </div>
      <div class="profile-actions-row">
        <button class="btn primary" id="profileSettingsBtn" type="button">${t('menuSettings')}</button>
        <button class="btn" id="myModsBtn" type="button">${t('menuMyMods')}</button>
        <button class="btn danger-lite" id="logoutBtn" type="button">${t('logout')}</button>
      </div>
    </article>`;
  $('#profileSettingsBtn').addEventListener('click', () => location.hash = '#profile/settings');
  $('#myModsBtn').addEventListener('click', openMyMods);
  $('#logoutBtn').addEventListener('click', () => { getFirebaseAuth()?.signOut?.(); saveUser(null); });
}
function fileToDataUrl(file){ return new Promise((resolve,reject)=>{ const r=new FileReader(); r.onload=()=>resolve(r.result); r.onerror=reject; r.readAsDataURL(file); }); }
function pickImageFromFile(cb){ const input=document.createElement('input'); input.type='file'; input.accept='image/*'; input.onchange=async()=>{ if(input.files?.[0]) cb(await fileToDataUrl(input.files[0])); }; input.click(); }
function promptImageUrl(cb){ const url=prompt(t('imageUrlPrompt')); if(url && /^https?:\/\//i.test(url.trim())) cb(url.trim()); }
function imageActions(kind){
  const p=getMyProfile(); if(!p) return;
  const has=!!p[kind];
  const action=prompt(`${kind==='avatar'?t('avatarManage'):t('coverManage')}\n1 — ${has?t('replaceImage'):t('addImage')} ${t('fromFile')}\n2 — ${has?t('replaceImage'):t('addImage')} ${t('fromUrl')}\n${has?'3 — '+t('deleteImage'):''}`);
  if(action==='1') pickImageFromFile(src=>{ const np=getMyProfile(); np[kind]=src; saveMyProfile(np); renderProfileSettings(); });
  if(action==='2') promptImageUrl(src=>{ const np=getMyProfile(); np[kind]=src; saveMyProfile(np); renderProfileSettings(); });
  if(action==='3' && has){ p[kind]=null; saveMyProfile(p); renderProfileSettings(); }
}
function canChangeName(p){
  const now=Date.now(); const month=30*86400000;
  const recent=(p.nameChanges||[]).filter(x=>now-new Date(x).getTime()<month);
  if(recent.length<2) return {ok:true, recent};
  const next=new Date(new Date(recent[0]).getTime()+month);
  return {ok:false,next,recent};
}
function changeProfileName(){
  const p=getMyProfile(); if(!p) return;
  const limit=canChangeName(p);
  if(!limit.ok){ alert(`${t('nameLimitReached')} ${fmtDate(limit.next.toISOString())}`); return; }
  const next=prompt(`${t('changeNameHint')}\n${t('nameChangesLeft')}: ${2-limit.recent.length}`, p.name||'');
  if(!next) return;
  const cleaned=next.trim().slice(0,32);
  if(!cleaned) return;
  p.name=cleaned; p.nameChanges=[...(limit.recent||[]), new Date().toISOString()]; saveMyProfile(p); renderProfileSettings();
  const auth=getFirebaseAuth(); auth?.currentUser?.updateProfile?.({displayName:cleaned}).catch(()=>{});
}
function editBio(){
  const p=getMyProfile(); if(!p) return;
  const next=prompt(t('bioHint'), p.bio||'');
  if(next===null) return;
  p.bio=next.trim().slice(0,70); saveMyProfile(p); renderProfileSettings();
}
function deleteBio(){ const p=getMyProfile(); if(!p) return; p.bio=''; saveMyProfile(p); renderProfileSettings(); }
function renderProfileSettings(){
  const box=$('#profileView'); if(!box) return;
  if(!currentUser){ renderProfile(); return; }
  const p=getMyProfile(); const limit=canChangeName(p);
  box.innerHTML=`
    <article class="profile-full-card settings-card">
      <p class="eyebrow">/profile/settings</p>
      <h2>${t('profileSettingsTitle')}</h2>
      <div class="profile-cover editable" id="coverEdit">${profileCoverHtml(p)}<button class="media-edit-btn" type="button">${p.cover?t('coverReplaceDelete'):t('coverAdd')}</button></div>
      <div class="profile-headline settings-headline">
        <button class="avatar-edit" id="avatarEdit" type="button">${profileAvatarHtml(p)}<span>${p.avatar?t('avatarReplaceDelete'):t('avatarAdd')}</span></button>
        <div class="profile-main-info"><h2 data-no-translate>${escapeHtml(p.name)}</h2><button class="mini-edit" id="nameEdit" type="button">✎ ${t('changeName')}</button><p class="auth-hint">${t('changeNameHint')} ${limit.ok ? `${t('nameChangesLeft')}: ${2-limit.recent.length}` : `${t('nameLimitReached')} ${fmtDate(limit.next.toISOString())}`}</p></div>
      </div>
      <section class="settings-section"><h3>${t('profileBio')}</h3><p>${p.bio?escapeHtml(p.bio):t('bioEmpty')}</p><div class="profile-actions-row"><button class="btn" id="bioEdit" type="button">${p.bio?t('editBio'):t('addBio')}</button>${p.bio?`<button class="btn danger-lite" id="bioDelete" type="button">${t('deleteBio')}</button>`:''}</div></section>
      <section class="settings-section"><h3>${t('security')}</h3><div class="profile-actions-row"><button class="btn" id="changePasswordBtn" type="button">${t('changePassword')}</button><button class="btn" id="sessionsBtn" type="button">${t('activeSessions')}</button></div></section>
      <section class="settings-section danger-zone"><h3>${t('dangerZone')}</h3><button class="btn danger" id="deleteAccountBtn" type="button">${t('deleteAccount')}</button></section>
    </article>`;
  $('#coverEdit').addEventListener('click',()=>imageActions('cover'));
  $('#avatarEdit').addEventListener('click',()=>imageActions('avatar'));
  $('#nameEdit').addEventListener('click',changeProfileName);
  $('#bioEdit').addEventListener('click',editBio);
  $('#bioDelete')?.addEventListener('click',deleteBio);
  $('#changePasswordBtn').addEventListener('click',()=>openResetModal(false));
  $('#sessionsBtn').addEventListener('click',openSessionsModal);
  $('#deleteAccountBtn').addEventListener('click',openDeleteAccountFlow);
}
function openMyMods(){
  location.hash='#mods';
  setTimeout(()=>{ const q=$('#searchInput'); if(q && currentUser){ q.value=currentUser.name||currentUser.email||''; q.dispatchEvent(new Event('input',{bubbles:true})); } },260);
}
function sessionId(){ let id=localStorage.getItem('polux.session.id'); if(!id){id=(crypto.randomUUID?crypto.randomUUID():String(Date.now())+Math.random());localStorage.setItem('polux.session.id',id)} return id; }
function registerSession(){ if(!currentUser) return; const key=profileKey(currentUser.uid||currentUser.email); let all={}; try{all=JSON.parse(localStorage.getItem(STORAGE.sessions)||'{}')}catch(e){}; all[key] ||= []; const id=sessionId(); const item={id, ua:navigator.userAgent, lang:navigator.language, platform:navigator.platform||'Android', last:new Date().toISOString()}; const idx=all[key].findIndex(x=>x.id===id); if(idx>=0) all[key][idx]=item; else all[key].push(item); localStorage.setItem(STORAGE.sessions,JSON.stringify(all)); }
function openSessionsModal(){
  registerSession(); const key=profileKey(currentUser?.uid||currentUser?.email); let all={}; try{all=JSON.parse(localStorage.getItem(STORAGE.sessions)||'{}')}catch(e){}; const list=all[key]||[];
  const body=list.map(s=>`<div class="session-row"><div><strong>${escapeHtml(s.platform||t('unknownDevice'))}</strong><span>${escapeHtml(s.ua||'')}</span><small>${fmtDate(s.last)}</small></div><button class="btn danger-lite" data-kill-session="${s.id}">×</button></div>`).join('') || `<p>${t('noSessions')}</p>`;
  openInfoModal(t('activeSessions'), `${body}<div class="profile-actions-row"><button class="btn danger" id="killAllSessions">${t('endAllSessions')}</button></div>`);
  $$('[data-kill-session]').forEach(b=>b.addEventListener('click',()=>{ if(confirm(t('confirmEndSession'))){ all[key]=(all[key]||[]).filter(x=>x.id!==b.dataset.killSession); localStorage.setItem(STORAGE.sessions,JSON.stringify(all)); if(b.dataset.killSession===sessionId()){ getFirebaseAuth()?.signOut?.(); saveUser(null); closeInfoModal(); } else openSessionsModal(); }}));
  $('#killAllSessions')?.addEventListener('click',()=>{ if(confirm(t('confirmEndAllSessions'))){ all[key]=[]; localStorage.setItem(STORAGE.sessions,JSON.stringify(all)); getFirebaseAuth()?.signOut?.(); saveUser(null); closeInfoModal(); }});
}
function openInfoModal(title, html){
  let m=$('#infoModal');
  if(!m){ document.body.insertAdjacentHTML('beforeend',`<div class="auth-modal" id="infoModal" aria-hidden="true"><div class="auth-card info-card"><button class="auth-close" id="infoClose" type="button">×</button><h2 id="infoTitle"></h2><div id="infoBody"></div></div></div>`); m=$('#infoModal'); $('#infoClose').addEventListener('click',closeInfoModal); m.addEventListener('click',e=>{if(e.target.id==='infoModal')closeInfoModal();}); }
  $('#infoTitle').textContent=title; $('#infoBody').innerHTML=html; m.classList.add('open'); m.setAttribute('aria-hidden','false');
}
function closeInfoModal(){ $('#infoModal')?.classList.remove('open'); $('#infoModal')?.setAttribute('aria-hidden','true'); }
async function openDeleteAccountFlow(){
  const p=getMyProfile(); if(!p) return;
  if(!confirm(t('deleteAccountWarning'))) return;
  const pass=prompt(t('confirmPasswordToDelete'));
  if(!pass) return;
  p.deletedAt=new Date().toISOString(); p.deletedUntil=new Date(Date.now()+30*86400000).toISOString(); saveMyProfile(p);
  try{
    const auth=getFirebaseAuth();
    if(auth?.currentUser?.delete) await auth.currentUser.delete();
  }catch(e){ alert(t('accountSoftDeletedLocal')); }
  getFirebaseAuth()?.signOut?.(); saveUser(null); location.hash='#home';
}
function renderOtherProfileDemo(){ alert(t('otherProfilesLater')); }
function sendThanksToUser(userKey){ alert(t('thanksLater')); }
function reportUser(userKey){ const reason=prompt(t('reportReasonPrompt')); if(reason){ const reports=JSON.parse(localStorage.getItem(STORAGE.reports)||'[]'); reports.push({userKey,reason,date:new Date().toISOString(),from:currentUser?.uid||currentUser?.email||'guest'}); localStorage.setItem(STORAGE.reports,JSON.stringify(reports)); alert(t('reportSaved')); } }


function positionCustomSelectMenu(box){
  const trigger = $('.custom-select-trigger', box);
  const menu = box && box._customMenu ? box._customMenu : $('.custom-select-menu', box);
  if(!trigger || !menu) return;
  const rect = trigger.getBoundingClientRect();
  const gap = 8;
  const margin = 10;
  const naturalWidth = Math.max(rect.width, 160);
  const width = Math.min(naturalWidth, window.innerWidth - margin * 2);
  const left = Math.min(Math.max(rect.left, margin), window.innerWidth - width - margin);
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
  trigger.textContent = selected ? selected.textContent : '';
  menu.innerHTML = [...select.options].map(opt => `
    <button type="button" class="custom-option${opt.selected ? ' selected' : ''}" data-value="${opt.value}">${opt.textContent}</button>`).join('');
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
window.addEventListener('hashchange', route);
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
  if(action === 'profile') currentUser ? location.hash = '#profile' : openAuthModal('login');
  if(action === 'mods') openMyMods();
  if(action === 'settings') currentUser ? location.hash = '#profile/settings' : openAuthModal('login');
  if(action === 'logout'){ getFirebaseAuth()?.signOut?.(); saveUser(null); }
});


function firebaseUserToLocalUser(user){
  ensureProfileRecord(user);
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

enhanceCustomSelects(document);
applyTheme();
applyI18n();
route();
checkResetActionFromUrl();
