const $ = (q, root = document) => root.querySelector(q);
const $$ = (q, root = document) => [...root.querySelectorAll(q)];

const STORAGE = {
  theme: 'polux.theme', crt: 'polux.crt', lang: 'polux.lang', user: 'polux.user', db: 'polux.normalized.db.v2', localUsers: 'polux.local.users'
};

const LANGS = ['uk','ru','en','pl','de','es','fr'];
const DEFAULT_LANG = 'uk';
const languageNames = {uk:'Українська',ru:'Русский',en:'English',pl:'Polski',de:'Deutsch',es:'Español',fr:'Français'};
const OWNER_EMAILS = ['vitaliysh0705@gmail.com'];
const GAME_VERSIONS = ['FS Mobile 20','FS Mobile 23','FS Mobile 25'];
const ROLE_LEVELS = ['roleUser','roleVerified','rolePublisher','roleModerator','roleAdministrator','roleOwner'];
const ROLE_WEIGHT = Object.fromEntries(ROLE_LEVELS.map((r,i)=>[r,i]));

const UI = {
  uk: {
    loading:'Завантаження модуля...', navHome:'Головна', navMods:'Моди', navNews:'Новини', navAbout:'Про нас', navContact:"Зв'язок", navFeedback:'Зворотній зв’язок',
    crtOff:'CRT: увімк.', crtOn:'CRT: вимк.', loginShort:'Вхід', menuProfile:'Мій профіль', menuNotifications:'Сповіщення', menuFavorites:'Обране', menuMyMods:'Мої моди', menuSettings:'Налаштування', menuAdmin:'Адмін-панель', menuLogout:'Вихід', loginOrRegister:'Увійти або зареєструватись',
    heroTitle:'Офіційний гараж Polux Mods для Farming Simulator Mobile.', heroText:'Каталог модів, новини, профілі, обране, рейтинг, звернення та модерація — в одному адаптивному сайті.', viewMods:'Дивитись моди', learnMore:'Детальніше', viewAll:'Переглянути всі',
    newMods:'Нові моди', popularMods:'Найбільш популярні', latestNews:'Новини', noPublishedMods:'Опубліковані моди ще готуються. Після публікації через адмін-панель вони автоматично з’являться тут.', noPublishedNews:'Новини ще готуються до релізу.',
    modsTitle:'Каталог модів', modsText:'Усі схвалені або опубліковані адміністрацією модифікації Polux Mods.', searchPlaceholder:'Пошук мода...', allCategories:'Усі категорії', sortNewest:'Нові спочатку', sortRating:'За рейтингом', open:'Перейти', download:'Завантажити', back:'Назад',
    aboutTitle:'Про Polux Mods', aboutText:'Polux Mods — сайт спільноти для модів Farming Simulator Mobile. Проєкт об’єднує каталог модифікацій, новини, профілі користувачів, систему звернень, обране та модерацію контенту.',
    feedbackTitle:'Зворотній зв’язок', feedbackText:'Надішліть пропозицію або звернення до команди Polux Mods.', feedbackLogin:'Розділ доступний тільки для зареєстрованих користувачів.', submitTicket:'Подати звернення', myTickets:'Мої звернення', topic:'Тема', topicOther:'Інше', ticketMessage:'Текст звернення', ticketLimit:'до 300 символів', addImages:'Посилання на зображення', sendMessage:'Надіслати', ticketSent:'Звернення надіслано.', noTickets:'Звернень поки немає.',
    newsTitle:'Стрічка новин', newsText:'Останні публікації Polux Mods.', comments:'Коментарі', addComment:'Додати коментар', reply:'Відповісти', edit:'Редагувати', delete:'Видалити', report:'Поскаржитись', deletedComment:'Коментар було видалено', writeComment:'Напишіть коментар...', commentLogin:'Щоб писати коментарі, увійдіть у акаунт.',
    category:'Категорія', version:'Версія', game:'Гра', status:'Статус', author:'Автор', devAuthor:'Автор розробки', gameVersions:'Сумісні версії гри', rating:'Рейтинг', favoriteAdd:'Додати до обраного', favoriteRemove:'Видалити з обраного', favoritesTitle:'Обране', noFavorites:'Обраних модів поки немає.',
    profileTitle:'Профіль', profileGuest:'Ви ще не увійшли.', openLogin:'Увійти або зареєструватись', profileEmail:'Email', profileRole:'Роль', profileId:'ID профілю', lastOnline:'Останній онлайн', registeredAt:'Зареєстровано', userRating:'Рейтинг', recoverAccount:'Відновити акаунт', recoverAccountText:'Акаунт позначено як видалений. Протягом 30 днів його можна відновити.', accountRecovered:'Акаунт відновлено.', profileSettings:'Налаштування профілю', displayName:"Ім'я профілю", accountBio:'Опис профілю', save:'Зберегти', cancel:'Скасувати',
    notificationsTitle:'Сповіщення', noNotifications:'Немає нових сповіщень.', markAllRead:'Позначити всі прочитаними', notificationRole:'Адміністрація змінила вашу роль.', notificationReply:'Відповідь адміністрації на звернення.', notificationComment:'Новий коментар у вашій публікації.', notificationThanks:'Користувач подякував вам.',
    loginTitle:'Вхід', registerTitle:'Реєстрація', authHint:'Увійдіть у Polux Mods або створіть акаунт для профілю, обраних модів і майбутніх можливостей спільноти.', loginTab:'Вхід', registerTab:'Реєстрація', password:'Пароль', confirmPassword:'Підтвердження пароля', loginButton:'Увійти', registerButton:'Створити акаунт', forgotPassword:'Забули пароль?', orText:'або', googleLogin:'Увійти через Google', googleRegister:'Зареєструватись через Google', fieldRequired:'Це поле обов’язкове.', emailInvalid:'Введіть коректний email.', passwordTooShort:'Пароль має містити мінімум 6 символів.', passwordsDontMatch:'Паролі не збігаються.', authWrongCredentials:'Неправильний email або пароль.', authEmailInUse:'Цей email вже зареєстрований.', authNetworkError:'Немає з’єднання або Firebase недоступний.', firebaseConfigMissing:'Firebase недоступний, увімкнено локальний режим.', emailVerificationSent:'Лист підтвердження надіслано.', verifyEmailBeforeLogin:'Спочатку підтвердіть пошту.', resendVerification:'Надіслати лист ще раз', checkVerification:'Я вже підтвердив', resetTitle:'Відновлення пароля', resetEmailText:'Введіть email, і ми надішлемо посилання для відновлення пароля.', sendResetLink:'Надіслати посилання', resetEmailSent:'Посилання надіслано.', newPassword:'Новий пароль', confirmNewPassword:'Підтвердження нового пароля', resetPasswordButton:'Змінити пароль', showPassword:'Показати пароль', hidePassword:'Сховати пароль',
    adminPanelTitle:'Адмін-панель', adminPanelText:'Блочна система керування сайтом Polux Mods.', adminOnly:'Цей розділ доступний лише адміністраторам і модераторам.', blockPublication:'Публікація', blockUsers:'Модерація користувачів', blockTickets:'Скарги і пропозиції', blockSuggested:'Запропоновані моди', blockSiteSettings:'Налаштування сайту',
    publishArea:'Область публікування', editHome:'Редагування головної сторінки', publishNews:'Публікація новин', publishMods:'Публікація модів', clear:'Очистити', publish:'Опублікувати', title:'Назва', shortDescription:'Короткий опис', fullText:'Повний текст', mainImage:'Головне зображення URL', galleryUrls:'Галерея URL, через кому', downloadUrl:'URL завантаження', addBlock:'Додати блок', blockType:'Тип блоку', textBlock:'Текст', imageBlock:'Фото', pollBlock:'Опитування', blocksLimit:'До 10 блоків в одному дописі.', published:'Опубліковано.', saved:'Збережено.',
    userSearchPlaceholder:'ID, Email або Ім’я', avatar:'Аватарка', name:'Ім’я', email:'Email', role:'Роль', actions:'Дії', viewProfile:'Переглянути профіль', mute:'Замутити', unmute:'Розмутити', ban:'Заблокувати', unban:'Розблокувати', editRating:'Редагування рейтингу', editRoles:'Редагування ролей', deleteAccount:'Видалити акаунт', restoreAccount:'Відновити акаунт', softDeleted:'Акаунт м’яко видалено на 30 днів.', points:'Бали', reason:'Причина', confirm:'Підтвердити',
    complaint:'Скарга', feedback:'Зворотний зв’язок', new:'Нове', inProgress:'В роботі', closed:'Закрите', closeTicket:'Позначити як закрите', workTicket:'Позначити як в роботі', deleteTicket:'Видалити звернення', object:'Об’єкт', answerAuthor:'Відповісти автору', ticketClosedInfo:'Звернення закрите: редагування заблоковане, але аналітика доступна.',
    suggestedMods:'Запропоновані моди', review:'Переглянути', approve:'Схвалити', reject:'Відхилити', goAuthor:'Перейти на профіль автора', noSuggested:'Запропонованих модів поки немає.',
    holidayTheme:'Новорічне оформлення', maintenance:'Режим технічного обслуговування', maintenanceText:'Сайт знаходиться на сервісному обслуговуванні. Вибачте за незручності.', bannerActive:'Інформаційний банер', bannerText:'Текст оголошення', bannerUrl:'URL-посилання', roles:'Ролі', addRole:'Додати роль', viewRoleUsers:'Переглянути користувачів', changeRole:'Змінити роль', deleteRole:'Видалити роль', roleName:'Назва ролі', roleColor:'Колір ролі', permissions:'Права', usersWithRole:'Користувачі з роллю', noUsers:'Користувачів не знайдено.', confirmDeleteRole:'Видалити цю роль?',
    roleOwner:'Власник', roleAdministrator:'Адміністратор', roleModerator:'Модератор', rolePublisher:'Автор публікацій', roleVerified:'Перевірений', roleUser:'Користувач', permPublish:'Публікація контенту', permModerateUsers:'Модерація користувачів', permModerateReports:'Модерація скарг', permModerateMods:'Модерація модів', permManageSettings:'Керування сайтом', permManageRoles:'Керування ролями',
    imageZoom:'Натисніть, щоб відкрити на весь екран', poll:'Опитування', vote:'Голосувати', thank:'Подякувати', reportSent:'Скаргу надіслано.', objectLink:'Посилання на об’єкт', dateAdded:'Дата додавання', more:'Ще', activeBanner:'Оголошення', localMode:'Локальний режим', dbSchema:'Структура БД нормалізована в колекції users, mods, news, comments, ratings, favorites, tickets, reports, notifications, roles та siteSettings.'
  }
};

const OVERRIDES = {
  ru: {navHome:'Главная',navMods:'Моды',navNews:'Новости',navAbout:'О нас',navFeedback:'Обратная связь',loginShort:'Вход',menuProfile:'Мой профиль',menuNotifications:'Уведомления',menuFavorites:'Избранное',menuMyMods:'Мои моды',menuSettings:'Настройки',menuAdmin:'Админ-панель',menuLogout:'Выход',viewMods:'Смотреть моды',learnMore:'Подробнее',viewAll:'Смотреть все',modsTitle:'Каталог модов',newsTitle:'Лента новостей',feedbackTitle:'Обратная связь',aboutTitle:'О Polux Mods',adminPanelTitle:'Админ-панель',blockPublication:'Публикация',blockUsers:'Модерация пользователей',blockTickets:'Жалобы и предложения',blockSuggested:'Предложенные моды',blockSiteSettings:'Настройки сайта',save:'Сохранить',cancel:'Отмена',publish:'Опубликовать',open:'Перейти',download:'Скачать',comments:'Комментарии',favoriteAdd:'Добавить в избранное',favoriteRemove:'Удалить из избранного',noPublishedMods:'Опубликованные моды пока готовятся.',noPublishedNews:'Новости готовятся к релизу.',roleOwner:'Владелец',roleAdministrator:'Администратор',roleModerator:'Модератор',rolePublisher:'Автор публикаций',roleVerified:'Проверенный',roleUser:'Пользователь'},
  en: {navHome:'Home',navMods:'Mods',navNews:'News',navAbout:'About',navFeedback:'Feedback',loginShort:'Sign in',menuProfile:'My profile',menuNotifications:'Notifications',menuFavorites:'Favorites',menuMyMods:'My mods',menuSettings:'Settings',menuAdmin:'Admin panel',menuLogout:'Log out',heroTitle:'Official Polux Mods garage for Farming Simulator Mobile.',heroText:'Mods catalog, news, profiles, favorites, ratings, feedback and moderation in one responsive site.',viewMods:'View mods',learnMore:'Learn more',viewAll:'View all',newMods:'New mods',popularMods:'Most popular',latestNews:'News',modsTitle:'Mods catalog',modsText:'All mods approved or published by the Polux Mods administration.',newsTitle:'News feed',newsText:'Latest Polux Mods posts.',feedbackTitle:'Feedback',feedbackText:'Send a suggestion or request to the Polux Mods team.',aboutTitle:'About Polux Mods',aboutText:'Polux Mods is a community website for Farming Simulator Mobile mods.',adminPanelTitle:'Admin panel',adminPanelText:'Block-based site management system.',adminOnly:'This section is available only to administrators and moderators.',blockPublication:'Publication',blockUsers:'User moderation',blockTickets:'Reports and feedback',blockSuggested:'Suggested mods',blockSiteSettings:'Site settings',save:'Save',cancel:'Cancel',publish:'Publish',clear:'Clear',open:'Open',download:'Download',comments:'Comments',addComment:'Add comment',reply:'Reply',edit:'Edit',delete:'Delete',report:'Report',favoriteAdd:'Add to favorites',favoriteRemove:'Remove from favorites',noPublishedMods:'Published mods are being prepared.',noPublishedNews:'News is being prepared.',roleOwner:'Owner',roleAdministrator:'Administrator',roleModerator:'Moderator',rolePublisher:'Publisher',roleVerified:'Verified',roleUser:'User'},
  pl: {navHome:'Główna',navMods:'Mody',navNews:'Aktualności',navAbout:'O nas',navFeedback:'Kontakt',loginShort:'Login',viewMods:'Zobacz mody',learnMore:'Więcej',viewAll:'Zobacz wszystko',modsTitle:'Katalog modów',newsTitle:'Aktualności',feedbackTitle:'Kontakt',adminPanelTitle:'Panel admina',save:'Zapisz',cancel:'Anuluj',publish:'Opublikuj',open:'Otwórz',download:'Pobierz',comments:'Komentarze',roleAdministrator:'Administrator',roleModerator:'Moderator',roleUser:'Użytkownik'},
  de: {navHome:'Start',navMods:'Mods',navNews:'News',navAbout:'Über uns',navFeedback:'Feedback',loginShort:'Login',viewMods:'Mods ansehen',learnMore:'Mehr erfahren',viewAll:'Alle anzeigen',modsTitle:'Mod-Katalog',newsTitle:'News',feedbackTitle:'Feedback',adminPanelTitle:'Adminbereich',save:'Speichern',cancel:'Abbrechen',publish:'Veröffentlichen',open:'Öffnen',download:'Download',comments:'Kommentare',roleAdministrator:'Administrator',roleModerator:'Moderator',roleUser:'Benutzer'},
  es: {navHome:'Inicio',navMods:'Mods',navNews:'Noticias',navAbout:'Sobre nosotros',navFeedback:'Comentarios',loginShort:'Entrar',viewMods:'Ver mods',learnMore:'Más detalles',viewAll:'Ver todo',modsTitle:'Catálogo de mods',newsTitle:'Noticias',feedbackTitle:'Comentarios',adminPanelTitle:'Panel admin',save:'Guardar',cancel:'Cancelar',publish:'Publicar',open:'Abrir',download:'Descargar',comments:'Comentarios',roleAdministrator:'Administrador',roleModerator:'Moderador',roleUser:'Usuario'},
  fr: {navHome:'Accueil',navMods:'Mods',navNews:'Actualités',navAbout:'À propos',navFeedback:'Retour',loginShort:'Connexion',viewMods:'Voir les mods',learnMore:'Détails',viewAll:'Tout voir',modsTitle:'Catalogue des mods',newsTitle:'Actualités',feedbackTitle:'Retour',adminPanelTitle:'Admin',save:'Enregistrer',cancel:'Annuler',publish:'Publier',open:'Ouvrir',download:'Télécharger',comments:'Commentaires',roleAdministrator:'Administrateur',roleModerator:'Modérateur',roleUser:'Utilisateur'}
};
for(const lang of Object.keys(OVERRIDES)) UI[lang] = {...UI.uk, ...OVERRIDES[lang]};

const NO_TRANSLATE_TERMS = ['Polux Mods','PLX','FS Mobile','Farming Simulator Mobile','Firebase','GitHub','Google','Email','T-4A'];
const TRANSLATE_WORDS = {
  en: {'Назва':'Title','Категорія':'Category','Версія':'Version','Автор':'Author','Новини':'News','Моди':'Mods','Профіль':'Profile','Налаштування':'Settings','Зберегти':'Save'},
  ru: {'Назва':'Название','Категорія':'Категория','Версія':'Версия','Автор':'Автор','Новини':'Новости','Моди':'Моды','Профіль':'Профиль','Налаштування':'Настройки','Зберегти':'Сохранить'},
  pl: {'Назва':'Nazwa','Категорія':'Kategoria','Версія':'Wersja','Автор':'Autor','Новини':'Aktualności','Моди':'Mody'},
  de: {'Назва':'Titel','Категорія':'Kategorie','Версія':'Version','Автор':'Autor','Новини':'News','Моди':'Mods'},
  es: {'Назва':'Título','Категорія':'Categoría','Версія':'Versión','Автор':'Autor','Новини':'Noticias','Моди':'Mods'},
  fr: {'Назва':'Titre','Категорія':'Catégorie','Версія':'Version','Автор':'Auteur','Новини':'Actualités','Моди':'Mods'}
};
function normalizeLang(lang){ return LANGS.includes(lang) ? lang : DEFAULT_LANG; }
function detectLang(){ return normalizeLang(localStorage.getItem(STORAGE.lang) || (navigator.language || DEFAULT_LANG).slice(0,2)); }
function translateText(text, targetLang = currentLang){
  if(!text || targetLang === DEFAULT_LANG) return text || '';
  let out = String(text);
  const dict = TRANSLATE_WORDS[targetLang] || {};
  for(const [k,v] of Object.entries(dict)) out = out.replaceAll(k, v);
  return out;
}
function t(key){ return UI[currentLang]?.[key] || UI.uk[key] || key; }

let currentLang = detectLang();
let currentTheme = localStorage.getItem(STORAGE.theme) || 'amber';
let crtOn = localStorage.getItem(STORAGE.crt) !== 'off';
let currentUser = readUser();
let authMode = 'login';
let pendingVerificationUser = null;
let firebaseAuth = null;
let modalStack = [];

function makeId(prefix='id'){ return prefix + '_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2,8); }
function nowIso(){ return new Date().toISOString(); }
function escapeHtml(value){ return String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function safeUrl(url){ const s=String(url||'').trim(); return /^(https?:|data:image\/)/i.test(s) ? s : ''; }
function clampText(text, len=150){ text=String(text||''); return text.length>len ? text.slice(0,len-1).trim()+'…' : text; }
function formatDate(value){ if(!value) return '—'; try{return new Date(value).toLocaleDateString(currentLang,{year:'numeric',month:'short',day:'numeric'});}catch(e){return value;} }
function fullDate(value){ if(!value) return '—'; try{return new Date(value).toLocaleString(currentLang,{year:'numeric',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'});}catch(e){return value;} }
function bool(v){ return !!v; }
function readUser(){ try{return JSON.parse(localStorage.getItem(STORAGE.user)||'null');}catch(e){return null;} }
function saveUser(user){ currentUser = user; if(user) localStorage.setItem(STORAGE.user, JSON.stringify(user)); else localStorage.removeItem(STORAGE.user); updateProfileButton(); }
function firebaseConfigReady(){ const cfg = window.POLUX_FIREBASE_CONFIG || {}; return !!(cfg.apiKey && cfg.authDomain && cfg.projectId && cfg.appId); }
function getFirebaseAuth(){
  if(firebaseAuth) return firebaseAuth;
  try{
    if(window.PoluxAuthService?.getAuth) firebaseAuth = window.PoluxAuthService.getAuth(currentLang);
    else if(firebaseConfigReady() && window.firebase?.auth){ if(!firebase.apps.length) firebase.initializeApp(window.POLUX_FIREBASE_CONFIG); firebaseAuth = firebase.auth(); }
    if(firebaseAuth) firebaseAuth.languageCode = currentLang;
  }catch(_){ firebaseAuth = null; }
  return firebaseAuth;
}
function firebaseUserToLocalUser(user){ return {uid:user?.uid || makeId('user'), name:user?.displayName || user?.email?.split('@')[0] || t('roleUser'), email:user?.email || '', avatar:user?.photoURL || '', emailVerified:!!user?.emailVerified, firebase:true}; }

function defaultDb(){
  const ownerId = 'owner_vitaliysh0705';
  return {
    version: 2,
    siteSettings: {
      maintenance:false, holidayTheme:false, banner:{active:false,text:'',url:''},
      homeHero:{title:UI.uk.heroTitle,text:UI.uk.heroText,tractor:'▁▂▃▅🚜▅▃▂▁'},
      homeBlocks:{newMods:true,popularMods:true,news:true}
    },
    roles: [
      {id:'roleOwner', name:'Власник', color:'#ffcf5a', level:100, permissions:['permPublish','permModerateUsers','permModerateReports','permModerateMods','permManageSettings','permManageRoles'], protected:true},
      {id:'roleAdministrator', name:'Адміністратор', color:'#ff6b4a', level:90, permissions:['permPublish','permModerateUsers','permModerateReports','permModerateMods','permManageSettings','permManageRoles'], protected:true},
      {id:'roleModerator', name:'Модератор', color:'#5db7ff', level:70, permissions:['permModerateUsers','permModerateReports','permModerateMods'], protected:true},
      {id:'rolePublisher', name:'Автор публікацій', color:'#69e58d', level:55, permissions:['permPublish'], protected:false},
      {id:'roleVerified', name:'Перевірений', color:'#d96bff', level:20, permissions:[], protected:false},
      {id:'roleUser', name:'Користувач', color:'#b89258', level:10, permissions:[], protected:true}
    ],
    users: {
      [ownerId]: {uid:ownerId, publicId:publicUserId(ownerId), name:'Віталій', email:'vitaliysh0705@gmail.com', avatar:'', roles:['roleOwner','roleAdministrator'], rating:0, mutedUntil:null, bannedUntil:null, deletedAt:null, createdAt:nowIso(), lastOnline:nowIso(), bio:'', cover:''}
    },
    mods: {}, news: {}, comments: {}, ratings: {}, favorites: {}, tickets: {}, reports: {}, suggestions: {}, notifications: {}, adminActions: {}
  };
}
function loadDb(){
  try{
    const raw = JSON.parse(localStorage.getItem(STORAGE.db)||'null');
    const db = raw && raw.version ? raw : defaultDb();
    const base = defaultDb();
    db.siteSettings = {...base.siteSettings, ...(db.siteSettings||{}), banner:{...base.siteSettings.banner, ...(db.siteSettings?.banner||{})}, homeHero:{...base.siteSettings.homeHero, ...(db.siteSettings?.homeHero||{})}};
    db.roles = Array.isArray(db.roles)&&db.roles.length ? db.roles : base.roles;
    ['users','mods','news','comments','ratings','favorites','tickets','reports','suggestions','notifications','adminActions'].forEach(k => db[k] = db[k] || {});
    return db;
  }catch(e){ return defaultDb(); }
}
let DB = loadDb();
function persistDb(){ localStorage.setItem(STORAGE.db, JSON.stringify(DB)); }
function publicUserId(uid){ const src=String(uid||'local'); let h=0; for(let i=0;i<src.length;i++) h=((h<<5)-h+src.charCodeAt(i))>>>0; return 'PLX-' + String(h%1000000).padStart(6,'0'); }
function currentUid(){ return currentUser?.uid || ''; }
function currentProfile(){ if(!currentUser) return null; return ensureUser(currentUser); }
function ensureUser(user=currentUser){
  if(!user) return null;
  const uid = user.uid || user.email || makeId('user');
  let p = DB.users[uid];
  if(!p){ p = {uid, publicId:publicUserId(uid), name:user.name || user.displayName || user.email?.split('@')[0] || t('roleUser'), email:user.email||'', avatar:user.avatar||'', roles:['roleUser'], rating:0, mutedUntil:null, bannedUntil:null, deletedAt:null, createdAt:nowIso(), lastOnline:nowIso(), bio:'', cover:''}; }
  p.name = p.name || user.name || user.email?.split('@')[0] || t('roleUser');
  p.email = p.email || user.email || '';
  p.avatar = p.avatar || user.avatar || '';
  p.publicId = p.publicId || publicUserId(uid);
  p.roles = [...new Set([...(p.roles||[]), ...ownerRoles(p.email)])];
  p.lastOnline = nowIso();
  DB.users[uid] = p;
  persistDb();
  return p;
}
function ownerRoles(email){ return OWNER_EMAILS.includes(String(email||'').toLowerCase()) ? ['roleOwner','roleAdministrator'] : []; }
function roleById(id){ return DB.roles.find(r=>r.id===id) || {id, name:t(id), color:'var(--accent)', level:0, permissions:[]}; }
function highestRole(profile){ return (profile?.roles||['roleUser']).map(roleById).sort((a,b)=>(b.level||0)-(a.level||0))[0] || roleById('roleUser'); }
function hasPermission(profile, perm){ if(!profile) return false; return (profile.roles||[]).some(r => (roleById(r).permissions||[]).includes(perm) || r==='roleOwner'); }
function canAdmin(profile=currentProfile()){ return hasPermission(profile,'permModerateUsers') || hasPermission(profile,'permManageSettings') || (profile?.roles||[]).includes('roleAdministrator'); }
function canPublish(profile=currentProfile()){ return hasPermission(profile,'permPublish') || canAdmin(profile); }
function userName(uid){ return DB.users[uid]?.name || t('roleUser'); }
function userAvatar(uid){ return DB.users[uid]?.avatar || ''; }
function defaultAvatarSvg(){ return `<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="22" r="13"/><path d="M10 58c4-16 15-24 22-24s18 8 22 24"/></svg>`; }
function avatarHtml(uidOrUser, cls='avatar-mini'){
  const p = typeof uidOrUser === 'string' ? DB.users[uidOrUser] : uidOrUser;
  const img = p?.avatar ? `<img src="${escapeHtml(p.avatar)}" alt="">` : defaultAvatarSvg();
  return `<span class="${cls}">${img}</span>`;
}
function publishedMods(){ return Object.values(DB.mods).filter(m => m.status === 'published' || m.status === 'approved'); }
function publishedNews(){ return Object.values(DB.news).filter(n => n.status === 'published'); }
function itemRating(itemId){ const rows = Object.values(DB.ratings).filter(r=>r.itemId===itemId); if(!rows.length) return {avg:0,count:0}; const avg = rows.reduce((a,b)=>a+Number(b.value||0),0)/rows.length; return {avg, count:rows.length}; }
function isFavorite(itemId){ return !!DB.favorites[currentUid() + ':' + itemId]; }
function addNotification(userId, type, text, url='#notifications'){
  if(!userId) return;
  const id = makeId('note');
  DB.notifications[id] = {id, userId, type, text, url, read:false, createdAt:nowIso()};
  persistDb();
}
function unreadCount(){ if(!currentUser) return 0; return Object.values(DB.notifications).filter(n=>n.userId===currentUid() && !n.read).length; }
function makeLocalUser(email, name){
  const uid = 'local_' + String(email||name||Date.now()).toLowerCase().replace(/[^a-z0-9]+/g,'_');
  const user = {uid, email, name:name||email.split('@')[0], avatar:'', emailVerified:true, local:true};
  ensureUser(user);
  return user;
}

window.PoluxTranslator = {LANGS, DEFAULT_LANG, languageNames, translateText};
window.PoluxStore = {get db(){return DB;}, save:persistDb, schema:'users, mods, news, comments, ratings, favorites, tickets, reports, suggestions, notifications, roles, siteSettings'};

function applyTheme(){
  document.body.dataset.theme = currentTheme;
  $('#themeSelect') && ($('#themeSelect').value = currentTheme);
  document.body.classList.toggle('crt-on', crtOn);
  $('#crtToggle') && ($('#crtToggle').textContent = crtOn ? t('crtOff') : t('crtOn'));
  syncCustomSelect($('#themeSelect'));
}
function applyI18n(root=document){
  document.documentElement.lang = currentLang;
  $$('[data-i18n]', root).forEach(el => el.textContent = t(el.dataset.i18n));
  $$('[data-i18n-placeholder]', root).forEach(el => el.placeholder = t(el.dataset.i18nPlaceholder));
  $$('[data-i18n-title]', root).forEach(el => { const txt=t(el.dataset.i18nTitle); el.title=txt; el.setAttribute('aria-label',txt); });
  $('#langSelect') && ($('#langSelect').value = currentLang);
  applyTheme();
  updateProfileButton();
}
function updateViewportHeight(){ const h = window.visualViewport ? window.visualViewport.height : window.innerHeight; document.documentElement.style.setProperty('--app-height', `${h}px`); }
function liftFocusedField(){ const el=document.activeElement; if(!el || !el.matches('input,textarea,select')) return; setTimeout(()=>el.scrollIntoView({block:'center', inline:'nearest', behavior:'smooth'}),140); }

function showBoot(){ const b=$('#boot'); if(!b) return; b.classList.remove('hide'); setTimeout(()=>b.classList.add('hide'), 360); }
function renderTemplateHtml(html){ $('#app').innerHTML = html; enhanceCustomSelects($('#app')); applyI18n($('#app')); }
function shell(title, eyebrow, body, cls=''){
  return `<section class="page-head page-panel ${cls}"><p class="eyebrow">${eyebrow}</p><h1>${title}</h1></section>${body}`;
}
function maintenanceGate(){
  const me = currentProfile();
  return DB.siteSettings.maintenance && !canAdmin(me);
}
function renderMaintenance(){
  renderTemplateHtml(`<section class="page-panel narrow maintenance-page"><p class="eyebrow">/maintenance</p><h1>${t('maintenance')}</h1><p>${t('maintenanceText')}</p></section>`);
}
function route(){
  showBoot();
  setTimeout(() => {
    ensureUser(currentUser);
    renderBanner();
    const raw = (location.hash || '#home').slice(1);
    const cleanRoute = raw.split('?')[0];
    const [page, id] = cleanRoute.split('/');
    if(maintenanceGate() && !['profile','notifications'].includes(page)){ renderMaintenance(); return; }
    if(page === 'mods' && id) renderModDetail(id);
    else if(page === 'mods') renderModsPage();
    else if(page === 'news' && id) renderNewsDetail(id);
    else if(page === 'news') renderNewsPage();
    else if(page === 'feedback' || page === 'contact') renderFeedbackPage();
    else if(page === 'about') renderAboutPage();
    else if(page === 'profile') renderProfilePage(currentUid());
    else if(page === 'user' && id) renderProfilePage(id);
    else if(page === 'profile-settings') renderProfileSettingsPage();
    else if(page === 'my-mods') renderMyModsPage();
    else if(page === 'favorites') renderFavoritesPage();
    else if(page === 'notifications') renderNotificationsPage();
    else if(page === 'admin' || page?.startsWith('admin?')) renderAdminPanelPage();
    else renderHomePage();
    $('#app')?.focus({preventScroll:true});
    $('#nav')?.classList.remove('open');
  }, 130);
}

function renderBanner(){
  document.body.classList.toggle('holiday-on', !!DB.siteSettings.holidayTheme);
  let bar = $('#siteBanner');
  const b = DB.siteSettings.banner || {};
  if(!b.active || !b.text){ bar?.remove(); return; }
  if(!bar){
    bar = document.createElement('div'); bar.id = 'siteBanner'; bar.className = 'site-banner';
    document.querySelector('.topbar')?.insertAdjacentElement('afterend', bar);
  }
  const text = escapeHtml(translateText(b.text, currentLang));
  bar.innerHTML = b.url ? `<a href="${escapeHtml(safeUrl(b.url))}" target="_blank" rel="noopener"><b>${t('activeBanner')}:</b> ${text}</a>` : `<span><b>${t('activeBanner')}:</b> ${text}</span>`;
}
function renderHomePage(){
  const settings = DB.siteSettings;
  const modsNew = publishedMods().sort((a,b)=>String(b.publishedAt||b.createdAt).localeCompare(String(a.publishedAt||a.createdAt))).slice(0,4);
  const popular = publishedMods().sort((a,b)=>itemRating(b.id).avg-itemRating(a.id).avg).slice(0,4);
  const news = publishedNews().sort((a,b)=>String(b.publishedAt||b.createdAt).localeCompare(String(a.publishedAt||a.createdAt))).slice(0,5);
  renderTemplateHtml(`
    <section class="hero page-panel">
      <div class="hero-copy">
        <p class="eyebrow">Farming Simulator Mobile</p>
        <h1>${escapeHtml(translateText(settings.homeHero.title, currentLang))}</h1>
        <p>${escapeHtml(translateText(settings.homeHero.text, currentLang))}</p>
        <div class="hero-actions"><a class="btn primary" href="#mods">${t('viewMods')}</a><a class="btn" href="#about">${t('learnMore')}</a></div>
      </div>
      <div class="pixel-device" aria-hidden="true"><div class="screen"><span class="blink">POLUX/READY</span><div class="tiny-tractor">${escapeHtml(settings.homeHero.tractor || '🚜')}</div></div></div>
    </section>
    <section class="home-dynamic reveal">
      ${renderHomeSection('newMods', modsNew, '#mods?sort=newest', renderModMiniCard, t('noPublishedMods'))}
      ${renderHomeSection('popularMods', popular, '#mods?sort=rating', renderModMiniCard, t('noPublishedMods'))}
      ${renderHomeSection('latestNews', news, '#news', renderNewsMiniCard, t('noPublishedNews'))}
    </section>`);
}
function renderHomeSection(key, items, url, renderer, empty){
  return `<article class="home-section page-panel"><header class="section-title"><h2>${t(key)}</h2><a href="${url}" class="btn tiny">${t('viewAll')}</a></header><div class="home-row">${items.length ? items.map(renderer).join('') : `<div class="empty-state">${empty}</div>`}</div></article>`;
}
function renderModMiniCard(m){
  const r=itemRating(m.id);
  return `<a class="mini-card" href="#mods/${m.id}">${modImage(m,'mini-thumb')}<strong>${escapeHtml(translateText(m.title,currentLang))}</strong><small>${escapeHtml(translateText(m.category,currentLang))} · ★ ${r.avg.toFixed(1)} (${r.count})</small></a>`;
}
function renderNewsMiniCard(n){ return `<a class="mini-card" href="#news/${n.id}">${newsImage(n,'mini-thumb')}<strong>${escapeHtml(translateText(n.title,currentLang))}</strong><small>${formatDate(n.publishedAt || n.createdAt)} · ${escapeHtml(userName(n.authorId))}</small></a>`; }
function modImage(m, cls='mod-preview'){ const url = safeUrl((m.images||[])[0] || m.mainImage || ''); return url ? `<img class="${cls}" src="${escapeHtml(url)}" alt="">` : `<div class="${cls} pixel-placeholder">🚜</div>`; }
function newsImage(n, cls='mod-preview'){ const url = safeUrl(n.mainImage || (n.blocks||[]).find(b=>b.type==='image')?.content || ''); return url ? `<img class="${cls}" src="${escapeHtml(url)}" alt="">` : `<div class="${cls} pixel-placeholder">PX</div>`; }

function renderModsPage(){
  const categories = ['all', ...new Set(publishedMods().map(m=>m.category).filter(Boolean))];
  renderTemplateHtml(shell(t('modsTitle'), '/mods', `
    <section class="filters reveal"><input id="searchInput" type="search" placeholder="${t('searchPlaceholder')}"><select id="categoryFilter">${categories.map(c=>`<option value="${escapeHtml(c)}">${c==='all'?t('allCategories'):escapeHtml(translateText(c,currentLang))}</option>`).join('')}</select><select id="sortFilter"><option value="new">${t('sortNewest')}</option><option value="rating">${t('sortRating')}</option></select></section>
    <section class="mods-grid reveal" id="modsGrid"></section>`));
  const paint=()=>{
    const q=($('#searchInput').value||'').toLowerCase(); const cat=$('#categoryFilter').value; const sort=$('#sortFilter').value;
    let list = publishedMods().filter(m => (cat==='all'||m.category===cat) && `${m.title} ${m.shortDesc} ${m.category} ${m.devAuthor}`.toLowerCase().includes(q));
    if(sort==='rating') list.sort((a,b)=>itemRating(b.id).avg-itemRating(a.id).avg); else list.sort((a,b)=>String(b.publishedAt||b.createdAt).localeCompare(String(a.publishedAt||a.createdAt)));
    $('#modsGrid').innerHTML = list.length ? list.map(renderModCard).join('') : `<div class="empty-state span-all">${t('noPublishedMods')}</div>`;
  };
  $('#searchInput').addEventListener('input', paint); $('#categoryFilter').addEventListener('change', paint); $('#sortFilter').addEventListener('change', paint); paint(); enhanceCustomSelects($('#app'));
}
function renderModCard(m){
  const r=itemRating(m.id); const fav=isFavorite(m.id); const author=DB.users[m.authorId];
  return `<article class="mod-card rich-card" data-card-id="${m.id}">
    <button class="card-menu-btn" data-card-menu="${m.id}" aria-label="${t('more')}">⋯</button>
    <div class="card-menu" data-menu-for="${m.id}"><button data-toggle-fav="${m.id}">${fav?t('favoriteRemove'):t('favoriteAdd')}</button><button data-open-report="mod:${m.id}">${t('report')}</button></div>
    ${modImage(m)}<h3>${escapeHtml(translateText(m.title,currentLang))}</h3><p>${escapeHtml(clampText(translateText(m.shortDesc || m.description,currentLang), 120))}</p>
    <div class="card-meta"><span>${formatDate(m.publishedAt||m.createdAt)}</span><span>${escapeHtml(author?.name || 'Polux Mods')}</span></div>
    <footer><span class="status">★ ${r.avg.toFixed(1)} · ${r.count}</span><a class="btn" href="#mods/${m.id}">${t('open')}</a></footer>
  </article>`;
}
function renderModDetail(id, preview=null){
  const m = preview || DB.mods[id] || DB.suggestions[id];
  if(!m){ renderTemplateHtml(`<section class="page-panel narrow"><h1>404</h1><p>${t('noPublishedMods')}</p></section>`); return; }
  const images = (m.images||[]).filter(safeUrl);
  const main = images[0] || safeUrl(m.mainImage) || '';
  const r = itemRating(m.id);
  const fav = isFavorite(m.id);
  renderTemplateHtml(`
    <section class="mod-detail page-panel reveal" data-detail-id="${m.id}">
      <a class="btn" href="#mods">← ${t('back')}</a>
      <div class="detail-layout">
        <div class="gallery">
          <div class="gallery-main" id="galleryMain" data-zoom-src="${escapeHtml(main)}">${main?`<img src="${escapeHtml(main)}" alt="">`:`<div class="pixel-placeholder big">🚜</div>`}</div>
          <div class="gallery-thumbs">${images.map((img,i)=>`<button class="thumb ${i===0?'active':''}" data-gallery-src="${escapeHtml(img)}"><img src="${escapeHtml(img)}" alt=""></button>`).join('')}</div>
          <small>${t('imageZoom')}</small>
        </div>
        <div class="detail-info">
          <p class="eyebrow">${escapeHtml(translateText(m.category||'',currentLang))}</p><h1>${escapeHtml(translateText(m.title,currentLang))}</h1>
          <p>${richText(m.description || m.shortDesc || '')}</p>
          <div class="specs">
            <div><strong>${t('dateAdded')}</strong><br>${formatDate(m.publishedAt||m.createdAt)}</div><div><strong>${t('author')}</strong><br><a href="#user/${m.authorId}">${escapeHtml(userName(m.authorId))}</a></div>
            <div><strong>${t('version')}</strong><br>${escapeHtml(m.version||'1.0')}</div><div><strong>${t('devAuthor')}</strong><br>${escapeHtml(m.devAuthor||'Polux Mods')}</div>
            <div><strong>${t('gameVersions')}</strong><br>${(m.gameVersions||['FS Mobile 20']).map(escapeHtml).join(', ')}</div><div><strong>${t('rating')}</strong><br>★ ${r.avg.toFixed(1)} (${r.count})</div>
          </div>
          <div class="rating-box" data-rating-for="${m.id}">${[1,2,3,4,5].map(v=>`<button class="star" data-rate="${v}">★</button>`).join('')}<span>${r.count}</span></div>
          <div class="hero-actions"><a class="btn primary" href="${escapeHtml(safeUrl(m.downloadUrl)||'#')}" ${safeUrl(m.downloadUrl)?'target="_blank" rel="noopener"':''}>${t('download')}</a><button class="btn" data-toggle-fav="${m.id}">${fav?t('favoriteRemove'):t('favoriteAdd')}</button><button class="btn" data-open-report="mod:${m.id}">${t('report')}</button></div>
        </div>
      </div>
    </section>
    ${renderCommentsSection('mod', m.id, m.authorId)}`);
  bindComments('mod', m.id, m.authorId);
}

function renderNewsPage(){
  const list = publishedNews().sort((a,b)=>String(b.publishedAt||b.createdAt).localeCompare(String(a.publishedAt||a.createdAt)));
  renderTemplateHtml(shell(t('newsTitle'), '/news', `<section class="mods-grid reveal">${list.length?list.map(renderNewsCard).join(''):`<div class="empty-state span-all">${t('noPublishedNews')}</div>`}</section>`));
}
function renderNewsCard(n){ return `<article class="mod-card rich-card">${newsImage(n)}<h3>${escapeHtml(translateText(n.title,currentLang))}</h3><p>${escapeHtml(clampText(translateText(n.excerpt||'',currentLang),120))}</p><div class="card-meta"><span>${formatDate(n.publishedAt||n.createdAt)}</span><span>${escapeHtml(userName(n.authorId))}</span></div><footer><span class="status">${t('comments')}: ${commentRoots('news', n.id).length}</span><a class="btn" href="#news/${n.id}">${t('open')}</a></footer></article>`; }
function renderNewsDetail(id){
  const n = DB.news[id];
  if(!n){ renderNewsPage(); return; }
  renderTemplateHtml(`
    <article class="page-panel narrow news-detail"><a class="btn" href="#news">← ${t('back')}</a><p class="eyebrow">/news · ${formatDate(n.publishedAt||n.createdAt)}</p><h1>${escapeHtml(translateText(n.title,currentLang))}</h1><p class="news-author">${t('author')}: <a href="#user/${n.authorId}">${escapeHtml(userName(n.authorId))}</a></p>${renderContentBlocks(n.blocks||[{type:'text',content:n.body||n.excerpt||''}])}</article>
    ${renderCommentsSection('news', n.id, n.authorId)}`);
  bindComments('news', n.id, n.authorId);
}
function renderContentBlocks(blocks){
  return `<div class="content-blocks">${blocks.slice(0,10).map((b,i)=>{
    if(b.type==='image') return `<figure><img src="${escapeHtml(safeUrl(b.content))}" alt=""><figcaption>${escapeHtml(translateText(b.caption||'',currentLang))}</figcaption></figure>`;
    if(b.type==='poll') return `<div class="poll-box"><strong>${escapeHtml(translateText(b.question||b.content||t('poll'),currentLang))}</strong>${(b.options||[]).map((o,j)=>`<button class="btn tiny" data-poll-vote="${i}:${j}">${escapeHtml(translateText(o,currentLang))}</button>`).join('')}</div>`;
    return `<div class="text-block">${richText(b.content||'')}</div>`;
  }).join('')}</div>`;
}

function richText(text){
  let html = escapeHtml(translateText(String(text||''), currentLang));
  html = html.replace(/!\[([^\]]*)\]\((https?:\/\/[^\s)]+)\)/g, '<img class="inline-image" src="$2" alt="$1">');
  html = html.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  html = html.replace(/@([\wА-Яа-яІіЇїЄєҐґ.-]{2,32})/g, (m,name)=>`<a href="#${findUserHashByName(name)}">@${name}</a>`);
  return html.replace(/\n/g,'<br>');
}
function findUserHashByName(name){ const u=Object.values(DB.users).find(x=>(x.name||'').toLowerCase()===String(name).toLowerCase()); return u ? `user/${u.uid}` : 'mods'; }
function commentRoots(type, itemId){ return Object.values(DB.comments).filter(c=>c.type===type && c.itemId===itemId && !c.parentId).sort((a,b)=>String(a.createdAt).localeCompare(String(b.createdAt))); }
function commentChildren(parentId){ return Object.values(DB.comments).filter(c=>c.parentId===parentId).sort((a,b)=>String(a.createdAt).localeCompare(String(b.createdAt))); }
function renderCommentsSection(type, itemId, ownerId){
  return `<section class="page-panel comments-panel" id="commentsPanel"><header class="section-title"><h2>${t('comments')}</h2></header>${currentUser?`<form class="comment-form" data-comment-form><textarea maxlength="800" placeholder="${t('writeComment')}"></textarea><button class="btn primary">${t('addComment')}</button></form>`:`<p>${t('commentLogin')}</p><button class="btn primary" type="button" data-open-login>${t('openLogin')}</button>`}<div class="comments-tree">${commentRoots(type,itemId).map(c=>renderComment(c, ownerId)).join('')}</div></section>`;
}
function renderComment(c, ownerId){
  const p=DB.users[c.authorId]||{}; const score=Number(c.up||0)-Number(c.down||0); const canEdit=currentUid()===c.authorId; const canDelete=canEdit||canAdmin(); const role=highestRole(p);
  return `<article class="comment-card ${c.deletedAt?'deleted':''}" data-comment-id="${c.id}">${avatarHtml(p)}<div class="comment-body"><header><strong><a href="#user/${p.uid}">${escapeHtml(p.name||t('roleUser'))}</a></strong><small>${p.publicId||publicUserId(p.uid)} · <span style="color:${escapeHtml(role.color)}">${escapeHtml(translateText(role.name,currentLang))}</span> · ${fullDate(c.createdAt)}</small></header><div class="comment-text">${c.deletedAt?`<span class="deleted-text">${t('deletedComment')}</span>`:richText(c.text)}</div><footer><button data-comment-reply="${c.id}">${t('reply')}</button><button data-comment-vote="up:${c.id}">▲</button><span class="score ${score>=0?'pos':'neg'}">${score}</span><button data-comment-vote="down:${c.id}">▼</button>${canEdit&&!c.deletedAt?`<button data-comment-edit="${c.id}">${t('edit')}</button>`:''}${canDelete&&!c.deletedAt?`<button data-comment-delete="${c.id}">${t('delete')}</button>`:''}${!canEdit&&!c.deletedAt?`<button data-open-report="comment:${c.id}">${t('report')}</button>`:''}</footer><div class="reply-slot" data-reply-slot="${c.id}"></div><div class="comment-children">${commentChildren(c.id).map(ch=>renderComment(ch, ownerId)).join('')}</div></div></article>`;
}
function bindComments(type, itemId, ownerId){
  const root=$('#commentsPanel'); if(!root) return;
  root.addEventListener('submit', e=>{
    const form=e.target.closest('[data-comment-form]'); if(!form) return; e.preventDefault();
    const text=form.querySelector('textarea')?.value.trim(); if(!text) return;
    const parentId=form.dataset.parentId || null;
    const mentioned = parentId ? DB.comments[parentId]?.authorId : null;
    const id=makeId('comment'); DB.comments[id]={id,type,itemId,parentId,authorId:currentUid(),text,up:0,down:0,createdAt:nowIso(),updatedAt:nowIso(),deletedAt:null}; persistDb();
    if(mentioned && mentioned!==currentUid()) addNotification(mentioned,'comment',`${userName(currentUid())}: ${t('notificationComment')}`, `#${type==='mod'?'mods':'news'}/${itemId}`);
    if(ownerId && ownerId!==currentUid()) addNotification(ownerId,'comment',`${userName(currentUid())}: ${t('notificationComment')}`, `#${type==='mod'?'mods':'news'}/${itemId}`);
    type==='mod' ? renderModDetail(itemId) : renderNewsDetail(itemId);
  });
}

function renderFeedbackPage(){
  if(!currentUser){ renderTemplateHtml(shell(t('feedbackTitle'), '/feedback', `<section class="page-panel narrow"><p>${t('feedbackLogin')}</p><button class="btn primary" data-open-login>${t('openLogin')}</button></section>`)); return; }
  const mine = Object.values(DB.tickets).filter(x=>x.authorId===currentUid()).sort((a,b)=>String(b.createdAt).localeCompare(String(a.createdAt)));
  renderTemplateHtml(shell(t('feedbackTitle'), '/feedback', `
    <section class="page-panel tabs-panel"><div class="admin-tabs"><button class="active" data-tab-open="submitTicket">${t('submitTicket')}</button><button data-tab-open="myTickets">${t('myTickets')}</button></div>
      <div class="tab-body" data-tab="submitTicket"><form class="auth-form" id="ticketForm"><label class="field"><span>${t('topic')}</span><select id="ticketTopic"><option>Моди</option><option>Акаунт</option><option>Скарга</option><option value="other">${t('topicOther')}</option></select></label><label class="field hidden" id="customTopicWrap"><span>${t('topicOther')}</span><input id="customTopic"></label><label class="field"><span>${t('ticketMessage')} (${t('ticketLimit')})</span><textarea id="ticketText" maxlength="300"></textarea></label><label class="field"><span>${t('addImages')}</span><input id="ticketImages" placeholder="https://..."></label><button class="btn primary">${t('sendMessage')}</button></form></div>
      <div class="tab-body hidden" data-tab="myTickets"><div class="ticket-list">${mine.length?mine.map(renderTicketCard).join(''):`<p>${t('noTickets')}</p>`}</div></div>
    </section>`));
  $('#ticketTopic').addEventListener('change',()=>$('#customTopicWrap').classList.toggle('hidden',$('#ticketTopic').value!=='other'));
  $('#ticketForm').addEventListener('submit', e=>{ e.preventDefault(); const text=$('#ticketText').value.trim(); if(!text) return alert(t('fieldRequired')); const id=makeId('ticket'); DB.tickets[id]={id,type:'feedback',topic:$('#ticketTopic').value==='other'?$('#customTopic').value.trim():$('#ticketTopic').value,text,images:$('#ticketImages').value.split(',').map(x=>x.trim()).filter(Boolean),authorId:currentUid(),status:'new',answer:'',objectUrl:'',createdAt:nowIso(),updatedAt:nowIso()}; persistDb(); alert(t('ticketSent')); route(); });
}
function renderTicketCard(ticket){ return `<article class="ticket-card ${ticket.status==='closed'?'is-closed':''}" data-ticket-id="${ticket.id}"><span class="ticket-type">${ticket.type==='complaint'?t('complaint'):t('feedback')}</span><span class="status status-${ticket.status}">${t(ticket.status==='in_progress'?'inProgress':ticket.status)}</span><h3>${escapeHtml(translateText(ticket.topic,currentLang))}</h3><p>${richText(ticket.text)}</p>${ticket.answer?`<div class="ticket-answer"><strong>${t('answerAuthor')}:</strong><p>${richText(ticket.answer)}</p></div>`:''}<small>${fullDate(ticket.createdAt)}</small></article>`; }

function renderAboutPage(){ renderTemplateHtml(shell(t('aboutTitle'), '/about', `<section class="page-panel narrow"><p>${t('aboutText')}</p><div class="terminal-box"><p>&gt; database_schema: normalized</p><p>&gt; collections: users/mods/news/comments/tickets/reports</p><p>&gt; mobile_layout: responsive</p></div></section>`)); }
function renderProfilePage(uid){
  if(!currentUser && !uid){ renderTemplateHtml(`<section class="page-panel narrow profile-page"><h1>${t('profileTitle')}</h1><div class="profile-empty"><div class="profile-big-avatar">${defaultAvatarSvg()}</div><p>${t('profileGuest')}</p><button class="btn primary" data-open-login>${t('openLogin')}</button></div></section>`); return; }
  const own = !uid || uid===currentUid(); const p = own ? currentProfile() : DB.users[uid];
  if(!p){ renderTemplateHtml(`<section class="page-panel narrow"><h1>404</h1><p>${t('noUsers')}</p></section>`); return; }
  if(p.deletedAt){ const recover = own && (Date.now()-new Date(p.deletedAt).getTime() <= 30*86400000); renderTemplateHtml(`<section class="page-panel narrow profile-page"><h1>${t('recoverAccount')}</h1><p>${t('recoverAccountText')}</p>${recover?`<button class="btn primary" data-recover-account>${t('recoverAccount')}</button>`:''}</section>`); return; }
  const role=highestRole(p); const mods=publishedMods().filter(m=>m.authorId===p.uid); const canMod=!own && canAdmin();
  renderTemplateHtml(`<section class="page-panel narrow profile-page"><div class="profile-hero-card"><div class="profile-cover">${p.cover?`<img src="${escapeHtml(p.cover)}" alt="">`:`<div class="profile-cover-default"><span>POLUX MODS</span></div>`}</div><div class="profile-headline"><div class="profile-big-avatar floating">${avatarHtml(p,'avatar-big')}</div><div class="profile-main-info"><h1>${escapeHtml(p.name)}</h1><div class="profile-public-id"><span>${t('profileId')}</span><b>${p.publicId}</b></div><div class="profile-ranks"><span style="border-color:${escapeHtml(role.color)};color:${escapeHtml(role.color)}">${escapeHtml(translateText(role.name,currentLang))}</span></div>${p.bio?`<p>${richText(p.bio)}</p>`:''}</div></div><div class="profile-stats-grid"><div><strong>${t('lastOnline')}</strong><span>${fullDate(p.lastOnline)}</span></div><div><strong>${t('registeredAt')}</strong><span>${formatDate(p.createdAt)}</span></div><div><strong>${t('userRating')}</strong><span>${p.rating||0}</span></div></div><div class="profile-actions-row">${own?`<a class="btn primary" href="#profile-settings">${t('profileSettings')}</a>`:''}${canMod?`<a class="btn primary" href="#admin?user=${p.uid}">${t('blockUsers')}</a>`:''}</div></div></section><section class="mods-grid reveal">${mods.length?mods.map(renderModCard).join(''):`<div class="empty-state span-all">${t('noPublishedMods')}</div>`}</section>`);
}
function renderProfileSettingsPage(){
  const p=currentProfile(); if(!p){ openAuthModal('login'); location.hash='#home'; return; }
  renderTemplateHtml(`<section class="page-panel narrow"><p class="eyebrow">/settings</p><h1>${t('profileSettings')}</h1><form class="auth-form" id="profileSettingsForm"><label class="field"><span>${t('displayName')}</span><input id="profileNameInput" value="${escapeHtml(p.name)}"></label><label class="field"><span>${t('accountBio')}</span><textarea id="profileBioInput" maxlength="120">${escapeHtml(p.bio||'')}</textarea></label><label class="field"><span>${t('avatar')}</span><input id="profileAvatarInput" placeholder="https://..." value="${escapeHtml(p.avatar||'')}"></label><button class="btn primary">${t('save')}</button></form></section>`);
  $('#profileSettingsForm').addEventListener('submit', e=>{ e.preventDefault(); p.name=$('#profileNameInput').value.trim()||p.name; p.bio=$('#profileBioInput').value.trim(); p.avatar=$('#profileAvatarInput').value.trim(); DB.users[p.uid]=p; persistDb(); saveUser({...currentUser,name:p.name,avatar:p.avatar}); route(); });
}
function renderMyModsPage(){
  if(!currentUser){ openAuthModal('login'); return; }
  const list = Object.values(DB.mods).filter(m=>m.authorId===currentUid() || DB.suggestions[m.id]?.authorId===currentUid());
  renderTemplateHtml(shell(t('menuMyMods'), '/my-mods', `<section class="mods-grid reveal">${list.length?list.map(renderModCard).join(''):`<div class="empty-state span-all">${t('noPublishedMods')}</div>`}</section>`));
}
function renderFavoritesPage(){
  if(!currentUser){ openAuthModal('login'); return; }
  const ids=Object.values(DB.favorites).filter(f=>f.userId===currentUid()).map(f=>f.itemId); const list=publishedMods().filter(m=>ids.includes(m.id));
  renderTemplateHtml(shell(t('favoritesTitle'), '/favorites', `<section class="mods-grid reveal">${list.length?list.map(renderModCard).join(''):`<div class="empty-state span-all">${t('noFavorites')}</div>`}</section>`));
}
function renderNotificationsPage(){
  if(!currentUser){ openAuthModal('login'); return; }
  const list=Object.values(DB.notifications).filter(n=>n.userId===currentUid()).sort((a,b)=>String(b.createdAt).localeCompare(String(a.createdAt)));
  renderTemplateHtml(shell(t('notificationsTitle'), '/notifications', `<section class="page-panel narrow"><button class="btn" data-mark-notifications>${t('markAllRead')}</button><div class="notification-list">${list.length?list.map(n=>`<a class="notification-card ${n.read?'read':'unread'}" href="${escapeHtml(n.url||'#notifications')}"><strong>${escapeHtml(translateText(n.text,currentLang))}</strong><small>${fullDate(n.createdAt)}</small></a>`).join(''):`<p>${t('noNotifications')}</p>`}</div></section>`));
}

function requireAdmin(){ const me=currentProfile(); return currentUser && canAdmin(me); }
function renderAdminPanelPage(){
  if(!requireAdmin()){ renderTemplateHtml(`<section class="page-panel narrow"><h1>${t('adminPanelTitle')}</h1><p>${t('adminOnly')}</p></section>`); return; }
  const tabs = [['publication','blockPublication'],['users','blockUsers'],['tickets','blockTickets'],['suggested','blockSuggested'],['settings','blockSiteSettings']];
  renderTemplateHtml(`<section class="page-head page-panel admin-page"><p class="eyebrow">/admin</p><h1>${t('adminPanelTitle')}</h1><p>${t('adminPanelText')}</p><small>${t('dbSchema')}</small></section><section class="admin-block-shell"><div class="admin-carousel">${tabs.map(([id,key],i)=>`<button class="admin-block-tab ${i===0?'active':''}" data-admin-block="${id}"><span>0${i+1}</span><b>${t(key)}</b></button>`).join('')}</div><div class="admin-block-content" id="adminBlockContent"></div></section>`);
  renderAdminBlock('publication');
}
function renderAdminBlock(block){
  $$('.admin-block-tab').forEach(b=>b.classList.toggle('active', b.dataset.adminBlock===block));
  const box=$('#adminBlockContent'); if(!box) return;
  if(block==='publication') box.innerHTML=adminPublicationHtml();
  if(block==='users') box.innerHTML=adminUsersHtml();
  if(block==='tickets') box.innerHTML=adminTicketsHtml();
  if(block==='suggested') box.innerHTML=adminSuggestedHtml();
  if(block==='settings') box.innerHTML=adminSettingsHtml();
  enhanceCustomSelects(box); bindAdminBlock(block);
}
function adminPublicationHtml(){
  return `<article class="admin-card admin-wide"><h2>${t('blockPublication')}</h2><label class="field"><span>${t('publishArea')}</span><select id="publishArea"><option value="home">${t('editHome')}</option><option value="news">${t('publishNews')}</option><option value="mod">${t('publishMods')}</option></select></label><div id="publishFormHost"></div></article>`;
}
function publicationForm(area){
  if(area==='home') return `<form class="auth-form" id="homePublishForm"><label class="field"><span>${t('heroTitle')}</span><input id="homeHeroTitle" value="${escapeHtml(DB.siteSettings.homeHero.title)}"></label><label class="field"><span>${t('heroText')}</span><textarea id="homeHeroText">${escapeHtml(DB.siteSettings.homeHero.text)}</textarea></label><label class="field"><span>Pixel tractor</span><input id="homeHeroTractor" value="${escapeHtml(DB.siteSettings.homeHero.tractor||'')}"></label><div class="hero-actions"><button class="btn" type="button" id="homeClearBtn">${t('clear')}</button><button class="btn primary">${t('publish')}</button></div></form>`;
  if(area==='news') return `<form class="auth-form" id="newsPublishForm"><label class="field"><span>${t('title')}</span><input id="newsTitleInput"></label><label class="field"><span>${t('shortDescription')}</span><textarea id="newsExcerptInput"></textarea></label><label class="field"><span>${t('mainImage')}</span><input id="newsImageInput" placeholder="https://..."></label><div class="builder-head"><strong>${t('blocksLimit')}</strong><button class="btn tiny" type="button" data-add-content-block>${t('addBlock')}</button></div><div class="content-builder" id="contentBuilder"></div><button class="btn primary">${t('publish')}</button></form>`;
  return `<form class="auth-form" id="modPublishForm"><label class="field"><span>${t('title')}</span><input id="modTitleInput"></label><label class="field"><span>${t('shortDescription')}</span><textarea id="modShortInput"></textarea></label><label class="field"><span>${t('fullText')}</span><textarea id="modDescInput"></textarea></label><div class="form-grid"><label class="field"><span>${t('category')}</span><input id="modCategoryInput" placeholder="Трактори"></label><label class="field"><span>${t('version')}</span><input id="modVersionInput" value="1.0"></label><label class="field"><span>${t('devAuthor')}</span><input id="modDevAuthorInput" value="Polux Mods"></label></div><label class="field"><span>${t('gameVersions')}</span><div class="checks-row">${GAME_VERSIONS.map(v=>`<label><input type="checkbox" name="gameVersion" value="${v}" ${v==='FS Mobile 20'?'checked':''}> ${v}</label>`).join('')}</div></label><label class="field"><span>${t('galleryUrls')}</span><textarea id="modImagesInput" placeholder="https://img1, https://img2"></textarea></label><label class="field"><span>${t('downloadUrl')}</span><input id="modDownloadInput" placeholder="https://..."></label><button class="btn primary">${t('publish')}</button></form>`;
}
function addBuilderBlock(type='text', content=''){
  const host=$('#contentBuilder'); if(!host || host.children.length>=10) return;
  const idx=host.children.length+1;
  host.insertAdjacentHTML('beforeend', `<div class="builder-block" data-builder-block><header><strong>${idx}</strong><select data-block-type><option value="text">${t('textBlock')}</option><option value="image">${t('imageBlock')}</option><option value="poll">${t('pollBlock')}</option></select><button type="button" class="icon-btn" data-remove-block>×</button></header><textarea data-block-content placeholder="${t('fullText')}">${escapeHtml(content)}</textarea><input data-block-poll-options class="hidden" placeholder="Варіанти через кому"></div>`);
  const last=host.lastElementChild; last.querySelector('[data-block-type]').value=type; enhanceCustomSelects(last);
}
function collectBlocks(){ return $$('[data-builder-block]').map(block=>{ const type=block.querySelector('[data-block-type]').value; const content=block.querySelector('[data-block-content]').value.trim(); if(type==='poll') return {type, question:content, options:block.querySelector('[data-block-poll-options]').value.split(',').map(x=>x.trim()).filter(Boolean)}; return {type, content}; }).filter(b=>b.content || b.question); }
function adminUsersHtml(){ return `<article class="admin-card admin-wide"><h2>${t('blockUsers')}</h2><label class="field"><span>${t('userSearchPlaceholder')}</span><input id="adminUserSearch" type="search" placeholder="${t('userSearchPlaceholder')}"></label><div class="admin-users-table" id="adminUsersTable"></div></article>`; }
function renderAdminUsers(filter=''){
  const q=String(filter).toLowerCase(); const users=Object.values(DB.users).filter(u=>!q || `${u.publicId} ${u.email} ${u.name} ${u.uid}`.toLowerCase().includes(q)).sort((a,b)=>String(b.lastOnline).localeCompare(String(a.lastOnline)));
  $('#adminUsersTable').innerHTML = users.length ? users.map(u=>{ const role=highestRole(u); return `<div class="admin-user-row modern" data-user-row="${u.uid}">${avatarHtml(u)}<div><strong>${escapeHtml(u.name)}</strong><small>${u.publicId} · ${escapeHtml(u.email||'—')} · <span style="color:${escapeHtml(role.color)}">${escapeHtml(translateText(role.name,currentLang))}</span> · ${t('lastOnline')}: ${fullDate(u.lastOnline)}</small></div><button class="icon-btn" data-user-dots="${u.uid}">⋯</button><div class="admin-user-menu"><a href="#user/${u.uid}">${t('viewProfile')}</a><button data-user-action="mute:${u.uid}">${u.mutedUntil?t('unmute'):t('mute')}</button><button data-user-action="ban:${u.uid}">${u.bannedUntil?t('unban'):t('ban')}</button><button data-user-action="rating:${u.uid}">${t('editRating')}</button><button data-user-action="roles:${u.uid}">${t('editRoles')}</button><button data-user-action="delete:${u.uid}">${u.deletedAt?t('restoreAccount'):t('deleteAccount')}</button></div></div>`; }).join('') : `<p>${t('noUsers')}</p>`;
}
function adminTicketsHtml(){ const list=[...Object.values(DB.tickets), ...Object.values(DB.reports)].sort((a,b)=>String(b.createdAt).localeCompare(String(a.createdAt))); return `<article class="admin-card admin-wide"><h2>${t('blockTickets')}</h2><div class="ticket-list admin-ticket-list">${list.length?list.map(ti=>renderAdminTicket(ti)).join(''):`<p>${t('noTickets')}</p>`}</div></article>`; }
function renderAdminTicket(ticket){ const st=ticket.status||'new'; return `<article class="ticket-card status-border-${st} ${st==='closed'?'is-closed':''}" data-admin-ticket="${ticket.id}" data-ticket-source="${DB.tickets[ticket.id]?'tickets':'reports'}"><span class="ticket-type">${ticket.type==='complaint'?t('complaint'):t('feedback')}</span><span class="status status-${st}">${t(st==='in_progress'?'inProgress':st)}</span><h3>${escapeHtml(ticket.topic||ticket.objectType||t('complaint'))}</h3><p>${richText(ticket.text||ticket.reason||'')}</p><button class="btn tiny" data-ticket-open="${ticket.id}">${t('actions')}</button></article>`; }
function adminSuggestedHtml(){ const list=Object.values(DB.suggestions).filter(m=>m.status==='pending'||m.status==='rejected').sort((a,b)=>String(b.createdAt).localeCompare(String(a.createdAt))); return `<article class="admin-card admin-wide"><h2>${t('suggestedMods')}</h2><div class="mods-grid">${list.length?list.map(m=>`<article class="mod-card rich-card">${modImage(m)}<h3>${escapeHtml(m.title)}</h3><p>${escapeHtml(clampText(m.shortDesc||m.description,120))}</p><footer><button class="btn" data-preview-suggestion="${m.id}">${t('review')}</button><button class="btn primary" data-approve-suggestion="${m.id}">${t('approve')}</button><button class="btn" data-edit-suggestion="${m.id}">${t('edit')}</button><button class="btn danger-soft" data-reject-suggestion="${m.id}">${t('reject')}</button></footer></article>`).join(''):`<div class="empty-state span-all">${t('noSuggested')}</div>`}</div></article>`; }
function adminSettingsHtml(){ return `<article class="admin-card admin-wide"><h2>${t('blockSiteSettings')}</h2><div class="settings-grid"><label class="switch-row"><input type="checkbox" id="holidayToggle" ${DB.siteSettings.holidayTheme?'checked':''}> <span>${t('holidayTheme')}</span></label><label class="switch-row"><input type="checkbox" id="maintenanceToggle" ${DB.siteSettings.maintenance?'checked':''}> <span>${t('maintenance')}</span></label><label class="switch-row"><input type="checkbox" id="bannerActiveToggle" ${DB.siteSettings.banner.active?'checked':''}> <span>${t('bannerActive')}</span></label><label class="field"><span>${t('bannerText')}</span><input id="bannerTextInput" value="${escapeHtml(DB.siteSettings.banner.text||'')}"></label><label class="field"><span>${t('bannerUrl')}</span><input id="bannerUrlInput" value="${escapeHtml(DB.siteSettings.banner.url||'')}"></label></div><button class="btn primary" id="saveSiteSettings">${t('save')}</button><hr><header class="section-title"><h3>${t('roles')}</h3><button class="btn tiny" data-role-add>${t('addRole')}</button></header><div class="roles-list">${DB.roles.sort((a,b)=>(b.level||0)-(a.level||0)).map(renderRoleRow).join('')}</div></article>`; }
function renderRoleRow(role){ return `<div class="role-row" data-role-row="${role.id}"><span class="role-dot" style="background:${escapeHtml(role.color)}"></span><strong>${escapeHtml(translateText(role.name,currentLang))}</strong><small>${(role.permissions||[]).map(p=>t(p)).join(' · ')||'—'}</small><button class="icon-btn" data-role-dots="${role.id}">⋯</button><div class="admin-user-menu"><button data-role-users="${role.id}">${t('viewRoleUsers')}</button><button data-role-edit="${role.id}">${t('changeRole')}</button><button data-role-delete="${role.id}">${t('deleteRole')}</button></div></div>`; }
function bindAdminBlock(block){
  if(block==='publication'){
    const host=$('#publishFormHost'); const select=$('#publishArea'); const render=()=>{host.innerHTML=publicationForm(select.value); enhanceCustomSelects(host); if(select.value==='news') addBuilderBlock('text');}; render(); select.addEventListener('change',render);
  }
  if(block==='users'){ renderAdminUsers(); $('#adminUserSearch').addEventListener('input',e=>renderAdminUsers(e.target.value)); }
}

function openModal(title, body, opts={}){
  const id=makeId('modal'); modalStack.push(id);
  document.body.insertAdjacentHTML('beforeend', `<div class="auth-modal open profile-modal" id="${id}" aria-hidden="false"><div class="auth-card ${opts.wide?'wide':''}" role="dialog"><button class="auth-close" type="button" data-close-modal="${id}">×</button><p class="eyebrow">/dialog</p><h2>${title}</h2>${body}</div></div>`);
  const modal=$('#'+id); modal.addEventListener('click', e=>{ if(e.target.id===id || e.target.closest('[data-close-modal]')) modal.remove(); }); enhanceCustomSelects(modal); return modal;
}
function openReportModal(target){
  if(!currentUser){ openAuthModal('login'); return; }
  const m=openModal(t('report'), `<form class="auth-form" id="reportForm"><label class="field"><span>${t('reason')}</span><textarea id="reportReason" maxlength="300"></textarea></label><button class="btn primary">${t('sendMessage')}</button></form>`);
  $('#reportForm',m).addEventListener('submit',e=>{ e.preventDefault(); const id=makeId('report'); const [type,itemId]=target.split(':'); DB.reports[id]={id,type:'complaint',objectType:type,objectId:itemId,objectUrl:'#'+(type==='mod'?'mods/':'')+itemId,authorId:currentUid(),text:$('#reportReason',m).value.trim(),status:'new',createdAt:nowIso(),updatedAt:nowIso()}; persistDb(); m.remove(); alert(t('reportSent')); });
}
function openRatingModal(uid){ const p=DB.users[uid]; const m=openModal(t('editRating'), `<form class="auth-form" id="ratingForm"><label class="field"><span>${t('points')}</span><input id="ratingPoints" type="number" value="0"></label><label class="field"><span>${t('reason')}</span><input id="ratingReason"></label><button class="btn primary">${t('save')}</button></form>`); $('#ratingForm',m).onsubmit=e=>{e.preventDefault(); p.rating=Number(p.rating||0)+Number($('#ratingPoints',m).value||0); DB.users[uid]=p; DB.adminActions[makeId('action')]={type:'rating',uid,delta:Number($('#ratingPoints',m).value||0),reason:$('#ratingReason',m).value,adminId:currentUid(),createdAt:nowIso()}; persistDb(); m.remove(); renderAdminUsers($('#adminUserSearch')?.value||'');}; }
function openRolesModal(uid){ const p=DB.users[uid]; const m=openModal(t('editRoles'), `<form class="auth-form" id="rolesForm"><div class="checks-list">${DB.roles.map(r=>`<label><input type="checkbox" name="roles" value="${r.id}" ${(p.roles||[]).includes(r.id)?'checked':''}> <span style="color:${escapeHtml(r.color)}">${escapeHtml(translateText(r.name,currentLang))}</span></label>`).join('')}</div><div class="hero-actions"><button class="btn" type="button" data-cancel-modal>${t('cancel')}</button><button class="btn primary">${t('confirm')}</button></div></form>`); m.querySelector('[data-cancel-modal]').onclick=()=>m.remove(); $('#rolesForm',m).onsubmit=e=>{e.preventDefault(); p.roles=$$('input[name="roles"]:checked',m).map(x=>x.value); if(!p.roles.length) p.roles=['roleUser']; DB.users[uid]=p; addNotification(uid,'role',t('notificationRole'),'#profile'); persistDb(); m.remove(); renderAdminUsers($('#adminUserSearch')?.value||'');}; }
function openTicketModal(id, source){ const ticket=DB[source]?.[id]; if(!ticket) return; const closed=ticket.status==='closed'; const m=openModal(`${ticket.type==='complaint'?t('complaint'):t('feedback')} · ${t(ticket.status==='in_progress'?'inProgress':ticket.status||'new')}`, `<div class="ticket-modal-body"><p><strong>${t('object')}:</strong> ${ticket.objectUrl?`<a href="${escapeHtml(ticket.objectUrl)}">${escapeHtml(ticket.objectUrl)}</a>`:'—'}</p><p>${richText(ticket.text||ticket.reason||'')}</p>${closed?`<div class="auth-status show warn">${t('ticketClosedInfo')}</div>`:''}<label class="field"><span>${t('answerAuthor')}</span><textarea id="ticketAnswer" ${closed?'disabled':''}>${escapeHtml(ticket.answer||'')}</textarea></label><div class="hero-actions"><button class="btn" data-ticket-status="in_progress" ${closed?'disabled':''}>${t('workTicket')}</button><button class="btn" data-ticket-status="closed">${t('closeTicket')}</button><button class="btn danger-soft" data-ticket-delete>${t('deleteTicket')}</button><button class="btn primary" data-ticket-save ${closed?'disabled':''}>${t('save')}</button></div></div>`, {wide:true}); m.dataset.ticketId=id; m.dataset.ticketSource=source; }
function openRoleEditor(roleId=null){ const role=roleId?roleById(roleId):{id:'role_'+Date.now(),name:'Нова роль',color:'#69e58d',level:30,permissions:[]}; const perms=['permPublish','permModerateUsers','permModerateReports','permModerateMods','permManageSettings','permManageRoles']; const m=openModal(roleId?t('changeRole'):t('addRole'), `<form class="auth-form" id="roleForm"><label class="field"><span>${t('roleName')}</span><input id="roleNameInput" value="${escapeHtml(role.name)}"></label><label class="field"><span>${t('roleColor')}</span><input id="roleColorInput" type="color" value="${escapeHtml(role.color||'#69e58d')}"></label><label class="field"><span>Level</span><input id="roleLevelInput" type="number" value="${Number(role.level||30)}"></label><div class="checks-list">${perms.map(p=>`<label><input type="checkbox" name="perms" value="${p}" ${(role.permissions||[]).includes(p)?'checked':''}> ${t(p)}</label>`).join('')}</div><button class="btn primary">${t('save')}</button></form>`); $('#roleForm',m).onsubmit=e=>{e.preventDefault(); role.name=$('#roleNameInput',m).value.trim()||role.name; role.color=$('#roleColorInput',m).value; role.level=Number($('#roleLevelInput',m).value||30); role.permissions=$$('input[name="perms"]:checked',m).map(x=>x.value); if(!roleId) DB.roles.push(role); else DB.roles=DB.roles.map(r=>r.id===roleId?{...r,...role}:r); persistDb(); m.remove(); renderAdminBlock('settings');}; }
function openRoleUsers(roleId){ const users=Object.values(DB.users).filter(u=>(u.roles||[]).includes(roleId)); openModal(t('usersWithRole'), `<div class="admin-users-list">${users.length?users.map(u=>`<a class="admin-user-row" href="#user/${u.uid}">${avatarHtml(u)}<div><strong>${escapeHtml(u.name)}</strong><small>${escapeHtml(u.email||'')} · ${u.publicId}</small></div></a>`).join(''):`<p>${t('noUsers')}</p>`}</div>`, {wide:true}); }

function updateProfileButton(){
  const name=$('#profileName'), avatar=$('#profileAvatar'), wrap=$('#profileWrap'); if(!name||!avatar) return;
  const p=currentProfile(); name.textContent = currentUser ? (p?.name || currentUser.name || t('roleUser')) : t('loginShort'); avatar.innerHTML = p?.avatar ? `<img src="${escapeHtml(p.avatar)}" alt="">` : defaultAvatarSvg();
  wrap?.classList.toggle('has-notifications', unreadCount()>0); renderProfileMenuItems();
}
function renderProfileMenuItems(){
  const menu=$('#profileMenu'); if(!menu) return;
  if(!currentUser){ menu.innerHTML=`<button type="button" role="menuitem" data-profile-action="login">${t('loginOrRegister')}</button>`; return; }
  menu.innerHTML = `<button type="button" role="menuitem" data-profile-action="profile">${t('menuProfile')}</button><button type="button" role="menuitem" data-profile-action="notifications">${t('menuNotifications')}${unreadCount()?` <span class="menu-badge">${unreadCount()}</span>`:''}</button><button type="button" role="menuitem" data-profile-action="favorites">${t('menuFavorites')}</button><button type="button" role="menuitem" data-profile-action="mods">${t('menuMyMods')}</button><button type="button" role="menuitem" data-profile-action="settings">${t('menuSettings')}</button>${canAdmin(currentProfile())?`<button type="button" role="menuitem" data-profile-action="admin">${t('menuAdmin')}</button>`:''}<button type="button" role="menuitem" data-profile-action="logout">${t('menuLogout')}</button>`;
}
function closeProfileMenu(){ $('#profileWrap')?.classList.remove('open'); $('#profileBtn')?.setAttribute('aria-expanded','false'); $('#profileMenu')?.setAttribute('aria-hidden','true'); }
function positionProfileMenu(){ const btn=$('#profileBtn'), menu=$('#profileMenu'), wrap=$('#profileWrap'); if(!btn||!menu||!wrap?.classList.contains('open')) return; const rect=btn.getBoundingClientRect(), gap=8, margin=10; const width=Math.min(220, window.innerWidth-margin*2); menu.style.position='fixed'; menu.style.left=Math.min(Math.max(rect.right-width, margin), window.innerWidth-width-margin)+'px'; menu.style.top=(rect.bottom+gap)+'px'; menu.style.width=width+'px'; menu.style.maxHeight=Math.max(130, window.innerHeight-rect.bottom-24)+'px'; }
function toggleProfileMenu(){ closeCustomSelects(); const wrap=$('#profileWrap'), menu=$('#profileMenu'), btn=$('#profileBtn'); const open=!wrap.classList.contains('open'); wrap.classList.toggle('open', open); menu.setAttribute('aria-hidden', String(!open)); btn.setAttribute('aria-expanded', String(open)); if(open) requestAnimationFrame(positionProfileMenu); }

function setAuthMode(mode){ authMode=mode==='register'?'register':'login'; $$('.auth-tab').forEach(b=>b.classList.toggle('active',b.dataset.mode===authMode)); $('#nameWrap')?.classList.toggle('hidden', authMode!=='register'); $('#confirmWrap')?.classList.toggle('hidden', authMode!=='register'); $('#authTitle') && ($('#authTitle').textContent=authMode==='register'?t('registerTitle'):t('loginTitle')); $('#authSubmit') && ($('#authSubmit').textContent=authMode==='register'?t('registerButton'):t('loginButton')); }
function openAuthModal(mode='login'){ setAuthMode(mode); $('#authModal')?.classList.add('open'); $('#authModal')?.setAttribute('aria-hidden','false'); setTimeout(()=>$('#authEmail')?.focus(),80); }
function closeAuthModal(){ $('#authModal')?.classList.remove('open'); $('#authModal')?.setAttribute('aria-hidden','true'); }
function showAuthStatus(message,type='info'){ const el=$('#authStatus'); if(el){ el.textContent=message||''; el.className='auth-status' + (message?' show '+type:''); } }
function clearAuthErrors(){ $$('.field-error').forEach(e=>e.textContent=''); $$('.field.invalid').forEach(f=>f.classList.remove('invalid')); }
function setFieldError(inputId,errorId,msg){ $('#'+inputId)?.closest('.field')?.classList.add('invalid'); const e=$('#'+errorId); if(e) e.textContent=msg; }
function validateAuthForm(){ clearAuthErrors(); let ok=true; const email=$('#authEmail')?.value.trim()||'', pass=$('#authPassword')?.value||'', name=$('#authName')?.value.trim()||'', c=$('#authPasswordConfirm')?.value||''; if(authMode==='register'&&!name){setFieldError('authName','nameError',t('fieldRequired'));ok=false;} if(!/^\S+@\S+\.\S+$/.test(email)){setFieldError('authEmail','emailError',t('emailInvalid'));ok=false;} if(pass.length<6){setFieldError('authPassword','passwordError',t('passwordTooShort'));ok=false;} if(authMode==='register'&&pass!==c){setFieldError('authPasswordConfirm','confirmError',t('passwordsDontMatch'));ok=false;} return ok; }
function authErrorMessage(error){ const code=error?.code||''; if(code.includes('email-already-in-use')) return t('authEmailInUse'); if(code.includes('wrong-password')||code.includes('invalid-credential')||code.includes('user-not-found')) return t('authWrongCredentials'); if(code.includes('network')) return t('authNetworkError'); return error?.message || t('authNetworkError'); }
async function sendVerification(user){ if(user?.sendEmailVerification) await user.sendEmailVerification({url: location.href.split('#')[0]+'#profile'}); }
function setVerifyActionsVisible(v){ $('#verifyActions')?.classList.toggle('hidden', !v); }

function renderFlagOption(value, text){ const cls={uk:'uk',ru:'ru',en:'en',pl:'pl',de:'de',es:'es',fr:'fr'}[value]||'uk'; return `<span class="lang-option"><span class="retro-flag retro-flag-${cls}"></span><b>${value.toUpperCase()}</b><span>${text}</span></span>`; }
function positionCustomSelectMenu(box){ if(!box?.classList.contains('open')) return; const trigger=box.querySelector('.custom-select-trigger'), menu=box.querySelector('.custom-select-menu'); const r=trigger.getBoundingClientRect(); menu.style.position='fixed'; menu.style.left=r.left+'px'; menu.style.top=(r.bottom+7)+'px'; menu.style.width=Math.max(r.width,180)+'px'; }
function closeCustomSelects(except){ $$('.custom-select.open').forEach(b=>{ if(b!==except){ b.classList.remove('open'); b.querySelector('.custom-select-trigger')?.setAttribute('aria-expanded','false'); }}); }
function syncCustomSelect(select){ if(!select) return; const box=select.closest('.custom-select'), label=box?.querySelector('.custom-select-label'); if(!box||!label) return; const opt=select.selectedOptions[0]; label.innerHTML = select.id==='langSelect' ? renderFlagOption(select.value, languageNames[select.value]||select.value) : escapeHtml(opt?.textContent||''); }
function enhanceSelect(select){ if(!select || select.dataset.enhanced) return; select.dataset.enhanced='1'; const box=document.createElement('div'); box.className='custom-select'; select.parentNode.insertBefore(box,select); box.appendChild(select); select.classList.add('native-select-hidden'); const btn=document.createElement('button'); btn.type='button'; btn.className='custom-select-trigger'; btn.setAttribute('aria-expanded','false'); btn.innerHTML='<span class="custom-select-label"></span><span>▾</span>'; const menu=document.createElement('div'); menu.className='custom-select-menu'; box.append(btn,menu); const rebuild=()=>{ menu.innerHTML=[...select.options].map(o=>`<button type="button" data-value="${escapeHtml(o.value)}">${select.id==='langSelect'?renderFlagOption(o.value, languageNames[o.value]||o.textContent):escapeHtml(o.textContent)}</button>`).join(''); syncCustomSelect(select); }; rebuild(); btn.addEventListener('click',e=>{ e.stopPropagation(); const open=!box.classList.contains('open'); closeCustomSelects(box); box.classList.toggle('open', open); btn.setAttribute('aria-expanded',String(open)); if(open) positionCustomSelectMenu(box); }); menu.addEventListener('click',e=>{ const item=e.target.closest('[data-value]'); if(!item) return; select.value=item.dataset.value; select.dispatchEvent(new Event('change',{bubbles:true})); closeCustomSelects(); syncCustomSelect(select); }); select.addEventListener('change',()=>{rebuild(); syncCustomSelect(select);}); }
function enhanceCustomSelects(root=document){ $$('select',root).forEach(enhanceSelect); }

// Global delegated events
document.addEventListener('click', e=>{
  if(e.target.closest('[data-open-login]')) openAuthModal('login');
  const link=e.target.closest('[data-link]'); if(link) closeProfileMenu();
  const tab=e.target.closest('[data-tab-open]'); if(tab){ const panel=tab.closest('.tabs-panel'); $$('.admin-tabs button', panel).forEach(b=>b.classList.toggle('active', b===tab)); $$('[data-tab]', panel).forEach(body=>body.classList.toggle('hidden', body.dataset.tab!==tab.dataset.tabOpen)); }
  const block=e.target.closest('[data-admin-block]'); if(block) renderAdminBlock(block.dataset.adminBlock);
  const close=e.target.closest('[data-close-modal]'); if(close) $('#'+close.dataset.closeModal)?.remove();
  const menuBtn=e.target.closest('[data-card-menu]'); if(menuBtn){ const id=menuBtn.dataset.cardMenu; $$(`.rich-card.menu-open`).forEach(x=>{if(x.dataset.cardId!==id)x.classList.remove('menu-open')}); menuBtn.closest('.rich-card')?.classList.toggle('menu-open'); }
  const fav=e.target.closest('[data-toggle-fav]'); if(fav){ if(!currentUser){ openAuthModal('login'); return; } const itemId=fav.dataset.toggleFav; const key=currentUid()+':'+itemId; if(DB.favorites[key]) delete DB.favorites[key]; else DB.favorites[key]={userId:currentUid(), itemId, createdAt:nowIso()}; persistDb(); route(); }
  const report=e.target.closest('[data-open-report]'); if(report) openReportModal(report.dataset.openReport);
  const rate=e.target.closest('[data-rate]'); if(rate){ if(!currentUser){ openAuthModal('login'); return; } const itemId=rate.closest('[data-rating-for]')?.dataset.ratingFor; const key=currentUid()+':'+itemId; DB.ratings[key]={userId:currentUid(), itemId, value:Number(rate.dataset.rate), createdAt:DB.ratings[key]?.createdAt||nowIso(), updatedAt:nowIso()}; persistDb(); route(); }
  const gallery=e.target.closest('[data-gallery-src]'); if(gallery){ const src=gallery.dataset.gallerySrc; $('#galleryMain').innerHTML=`<img src="${escapeHtml(src)}" alt="">`; $('#galleryMain').dataset.zoomSrc=src; $$('.thumb').forEach(t=>t.classList.toggle('active', t===gallery)); }
  const zoom=e.target.closest('[data-zoom-src]'); if(zoom?.dataset.zoomSrc) openModal('', `<div class="zoom-box"><img src="${escapeHtml(zoom.dataset.zoomSrc)}" alt=""></div>`, {wide:true});
  const reply=e.target.closest('[data-comment-reply]'); if(reply){ if(!currentUser){ openAuthModal('login'); return; } const id=reply.dataset.commentReply; const slot=$(`[data-reply-slot="${id}"]`); const to=DB.comments[id]; slot.innerHTML=`<form class="comment-form compact" data-comment-form data-parent-id="${id}"><textarea maxlength="800">@${userName(to.authorId)}, </textarea><button class="btn primary">${t('reply')}</button></form>`; slot.querySelector('textarea').focus(); }
  const vote=e.target.closest('[data-comment-vote]'); if(vote){ const [dir,id]=vote.dataset.commentVote.split(':'); if(DB.comments[id]){ DB.comments[id][dir]=(DB.comments[id][dir]||0)+1; persistDb(); route(); }}
  const del=e.target.closest('[data-comment-delete]'); if(del && DB.comments[del.dataset.commentDelete]){ DB.comments[del.dataset.commentDelete].deletedAt=nowIso(); persistDb(); route(); }
  const edit=e.target.closest('[data-comment-edit]'); if(edit){ const c=DB.comments[edit.dataset.commentEdit]; const text=prompt(t('edit'), c.text); if(text!==null){ c.text=text; c.updatedAt=nowIso(); persistDb(); route(); } }
  const mark=e.target.closest('[data-mark-notifications]'); if(mark){ Object.values(DB.notifications).filter(n=>n.userId===currentUid()).forEach(n=>n.read=true); persistDb(); updateProfileButton(); route(); }
  const recover=e.target.closest('[data-recover-account]'); if(recover){ const p=currentProfile(); p.deletedAt=null; persistDb(); alert(t('accountRecovered')); route(); }
  const userDots=e.target.closest('[data-user-dots]'); if(userDots){ userDots.closest('.admin-user-row')?.classList.toggle('menu-open'); }
  const ua=e.target.closest('[data-user-action]'); if(ua){ const [action,uid]=ua.dataset.userAction.split(':'); const p=DB.users[uid]; if(!p) return; if(action==='mute') p.mutedUntil=p.mutedUntil?null:'permanent'; if(action==='ban') p.bannedUntil=p.bannedUntil?null:'permanent'; if(action==='delete'){ p.deletedAt=p.deletedAt?null:nowIso(); alert(t('softDeleted')); } if(action==='rating') openRatingModal(uid); if(action==='roles') openRolesModal(uid); DB.users[uid]=p; persistDb(); renderAdminUsers($('#adminUserSearch')?.value||''); }
  const ticketOpen=e.target.closest('[data-ticket-open]'); if(ticketOpen){ const card=ticketOpen.closest('[data-admin-ticket]'); openTicketModal(ticketOpen.dataset.ticketOpen, card.dataset.ticketSource); }
  const ticketSave=e.target.closest('[data-ticket-save]'); if(ticketSave){ const modal=ticketSave.closest('.auth-modal'); const src=modal.dataset.ticketSource, id=modal.dataset.ticketId; const ticket=DB[src][id]; ticket.answer=$('#ticketAnswer',modal).value; ticket.updatedAt=nowIso(); if(ticket.authorId) addNotification(ticket.authorId,'reply',t('notificationReply'),'#feedback'); persistDb(); modal.remove(); renderAdminBlock('tickets'); }
  const ticketStatus=e.target.closest('[data-ticket-status]'); if(ticketStatus){ const modal=ticketStatus.closest('.auth-modal'); const ticket=DB[modal.dataset.ticketSource][modal.dataset.ticketId]; ticket.status=ticketStatus.dataset.ticketStatus; ticket.updatedAt=nowIso(); persistDb(); modal.remove(); renderAdminBlock('tickets'); }
  const ticketDelete=e.target.closest('[data-ticket-delete]'); if(ticketDelete){ const modal=ticketDelete.closest('.auth-modal'); delete DB[modal.dataset.ticketSource][modal.dataset.ticketId]; persistDb(); modal.remove(); renderAdminBlock('tickets'); }
  const homeClear=e.target.closest('#homeClearBtn'); if(homeClear){ $('#homeHeroTitle').value=''; $('#homeHeroText').value=''; $('#homeHeroTractor').value=''; }
  const addBlock=e.target.closest('[data-add-content-block]'); if(addBlock) addBuilderBlock('text');
  const removeBlock=e.target.closest('[data-remove-block]'); if(removeBlock) removeBlock.closest('[data-builder-block]').remove();
  const prev=e.target.closest('[data-preview-suggestion]'); if(prev) renderModDetail(prev.dataset.previewSuggestion, DB.suggestions[prev.dataset.previewSuggestion]);
  const approve=e.target.closest('[data-approve-suggestion]'); if(approve){ const s=DB.suggestions[approve.dataset.approveSuggestion]; if(s){ s.status='published'; s.publishedAt=nowIso(); DB.mods[s.id]=s; delete DB.suggestions[s.id]; persistDb(); renderAdminBlock('suggested'); }}
  const reject=e.target.closest('[data-reject-suggestion]'); if(reject && DB.suggestions[reject.dataset.rejectSuggestion]){ DB.suggestions[reject.dataset.rejectSuggestion].status='rejected'; persistDb(); renderAdminBlock('suggested'); }
  const roleDots=e.target.closest('[data-role-dots]'); if(roleDots){ roleDots.closest('.role-row')?.classList.toggle('menu-open'); }
  const roleAdd=e.target.closest('[data-role-add]'); if(roleAdd) openRoleEditor();
  const roleEdit=e.target.closest('[data-role-edit]'); if(roleEdit) openRoleEditor(roleEdit.dataset.roleEdit);
  const roleUsers=e.target.closest('[data-role-users]'); if(roleUsers) openRoleUsers(roleUsers.dataset.roleUsers);
  const roleDelete=e.target.closest('[data-role-delete]'); if(roleDelete){ const role=roleById(roleDelete.dataset.roleDelete); if(role.protected) return alert('Protected'); if(confirm(t('confirmDeleteRole'))){ DB.roles=DB.roles.filter(r=>r.id!==role.id); Object.values(DB.users).forEach(u=>u.roles=(u.roles||[]).filter(r=>r!==role.id)); persistDb(); renderAdminBlock('settings'); }}
});
document.addEventListener('change', e=>{
  const blockType=e.target.closest('[data-block-type]'); if(blockType){ const b=blockType.closest('[data-builder-block]'); b.querySelector('[data-block-content]').placeholder=blockType.value==='image'?'https://...':t('fullText'); b.querySelector('[data-block-poll-options]').classList.toggle('hidden', blockType.value!=='poll'); }
});
document.addEventListener('submit', e=>{
  if(e.target.id==='homePublishForm'){ e.preventDefault(); DB.siteSettings.homeHero={title:$('#homeHeroTitle').value.trim(),text:$('#homeHeroText').value.trim(),tractor:$('#homeHeroTractor').value.trim()}; persistDb(); alert(t('saved')); route(); }
  if(e.target.id==='newsPublishForm'){ e.preventDefault(); const title=$('#newsTitleInput').value.trim(); if(!title) return alert(t('fieldRequired')); const id=makeId('news'); DB.news[id]={id,title,excerpt:$('#newsExcerptInput').value.trim(),mainImage:$('#newsImageInput').value.trim(),blocks:collectBlocks(),authorId:currentUid(),status:'published',createdAt:nowIso(),publishedAt:nowIso()}; persistDb(); alert(t('published')); location.hash='#news/'+id; }
  if(e.target.id==='modPublishForm'){ e.preventDefault(); const title=$('#modTitleInput').value.trim(); if(!title) return alert(t('fieldRequired')); const id=makeId('mod'); DB.mods[id]={id,title,shortDesc:$('#modShortInput').value.trim(),description:$('#modDescInput').value.trim(),category:$('#modCategoryInput').value.trim()||'FS Mobile',version:$('#modVersionInput').value.trim()||'1.0',devAuthor:$('#modDevAuthorInput').value.trim()||'Polux Mods',gameVersions:$$('input[name="gameVersion"]:checked').map(x=>x.value),images:$('#modImagesInput').value.split(',').map(x=>x.trim()).filter(Boolean),downloadUrl:$('#modDownloadInput').value.trim(),authorId:currentUid(),status:'published',createdAt:nowIso(),publishedAt:nowIso()}; persistDb(); alert(t('published')); location.hash='#mods/'+id; }
});
document.addEventListener('input', e=>{ if(e.target.closest('#authForm')) validateAuthForm(); });
document.addEventListener('focusin', e=>{ if(e.target.matches('input,textarea')) liftFocusedField(); });
document.addEventListener('click', e=>{ if(!e.target.closest('.custom-select')) closeCustomSelects(); if(!e.target.closest('#profileWrap')) closeProfileMenu(); });

$('#menuBtn')?.addEventListener('click',()=>{ const nav=$('#nav'); const open=!nav.classList.contains('open'); nav.classList.toggle('open',open); $('#menuBtn').setAttribute('aria-expanded',String(open)); });
$('#themeSelect')?.addEventListener('change', e=>{ currentTheme=e.target.value; localStorage.setItem(STORAGE.theme,currentTheme); applyTheme(); });
$('#langSelect')?.addEventListener('change', e=>{ currentLang=normalizeLang(e.target.value); localStorage.setItem(STORAGE.lang,currentLang); applyI18n(); route(); });
$('#crtToggle')?.addEventListener('click',()=>{ crtOn=!crtOn; localStorage.setItem(STORAGE.crt,crtOn?'on':'off'); applyTheme(); });
$('#profileBtn')?.addEventListener('click', toggleProfileMenu);
$('#profileMenu')?.addEventListener('click', e=>{ const a=e.target.closest('[data-profile-action]')?.dataset.profileAction; if(!a) return; closeProfileMenu(); if(a==='login') openAuthModal('login'); if(a==='profile') location.hash='#profile'; if(a==='notifications') location.hash='#notifications'; if(a==='favorites') location.hash='#favorites'; if(a==='mods') location.hash='#my-mods'; if(a==='settings') location.hash='#profile-settings'; if(a==='admin') location.hash='#admin'; if(a==='logout'){ getFirebaseAuth()?.signOut?.(); saveUser(null); location.hash='#home'; }});
$('#authClose')?.addEventListener('click', closeAuthModal);
$('#authModal')?.addEventListener('click',e=>{ if(e.target.id==='authModal') closeAuthModal(); });
$$('.auth-tab').forEach(btn=>btn.addEventListener('click',()=>setAuthMode(btn.dataset.mode)));
$('#authForm')?.addEventListener('submit', async e=>{
  e.preventDefault(); if(!validateAuthForm()) return; const email=$('#authEmail').value.trim(), pass=$('#authPassword').value, name=authMode==='register'?$('#authName').value.trim():email.split('@')[0]; const auth=getFirebaseAuth(); $('#authSubmit').disabled=true;
  try{
    if(auth){
      if(authMode==='register'){ const cred=await auth.createUserWithEmailAndPassword(email,pass); if(name&&cred.user.updateProfile) await cred.user.updateProfile({displayName:name}); await sendVerification(cred.user); pendingVerificationUser=cred.user; showAuthStatus(t('emailVerificationSent'),'ok'); setVerifyActionsVisible(true); return; }
      const cred=await auth.signInWithEmailAndPassword(email,pass); await cred.user.reload(); if(!cred.user.emailVerified){ pendingVerificationUser=cred.user; showAuthStatus(t('verifyEmailBeforeLogin'),'warn'); setVerifyActionsVisible(true); return; }
      saveUser(firebaseUserToLocalUser(cred.user)); ensureUser(currentUser); closeAuthModal(); location.hash='#profile'; return;
    }
    showAuthStatus(t('firebaseConfigMissing'),'warn'); const local=makeLocalUser(email,name); saveUser(local); closeAuthModal(); location.hash='#profile';
  }catch(err){ showAuthStatus(authErrorMessage(err),'error'); }
  finally{ $('#authSubmit').disabled=false; }
});
$('#googleAuthBtn')?.addEventListener('click', async()=>{ try{ const cred=await window.PoluxAuthService?.signInWithGoogle?.(currentLang); if(cred?.user){ saveUser(firebaseUserToLocalUser(cred.user)); ensureUser(currentUser); closeAuthModal(); location.hash='#profile'; }}catch(err){ showAuthStatus(authErrorMessage(err),'error'); }});
$('#forgotPasswordBtn')?.addEventListener('click',()=>{ closeAuthModal(); $('#resetModal')?.classList.add('open'); });
$('#resetClose')?.addEventListener('click',()=>$('#resetModal')?.classList.remove('open'));
$('#resetModal')?.addEventListener('click',e=>{ if(e.target.id==='resetModal') $('#resetModal')?.classList.remove('open'); });
$('#resetRequestForm')?.addEventListener('submit', async e=>{ e.preventDefault(); const email=$('#resetEmail').value.trim(); const auth=getFirebaseAuth(); if(auth){ try{await auth.sendPasswordResetEmail(email,{url:location.origin+location.pathname}); $('#resetStatus').textContent=t('resetEmailSent'); $('#resetStatus').className='auth-status show ok';}catch(err){$('#resetStatus').textContent=authErrorMessage(err); $('#resetStatus').className='auth-status show error';} } else { $('#resetStatus').textContent=t('firebaseConfigMissing'); $('#resetStatus').className='auth-status show warn'; }});
$('#resendVerificationBtn')?.addEventListener('click', async()=>{ try{ await sendVerification(pendingVerificationUser || getFirebaseAuth()?.currentUser); showAuthStatus(t('emailVerificationSent'),'ok'); }catch(err){ showAuthStatus(authErrorMessage(err),'error'); }});
$('#checkVerificationBtn')?.addEventListener('click', async()=>{ const user=pendingVerificationUser || getFirebaseAuth()?.currentUser; if(!user) return; await user.reload(); if(user.emailVerified){ saveUser(firebaseUserToLocalUser(user)); ensureUser(currentUser); closeAuthModal(); location.hash='#profile'; } else showAuthStatus(t('verifyEmailBeforeLogin'),'warn'); });
$$('[data-toggle-password]').forEach(btn=>btn.addEventListener('click',()=>{ const input=$('#'+btn.dataset.togglePassword); if(!input) return; const show=input.type==='password'; input.type=show?'text':'password'; btn.title=t(show?'hidePassword':'showPassword'); }));
window.addEventListener('hashchange', route); window.addEventListener('resize',()=>{ positionProfileMenu(); $$('.custom-select.open').forEach(positionCustomSelectMenu); }); window.addEventListener('scroll',()=>{ positionProfileMenu(); $$('.custom-select.open').forEach(positionCustomSelectMenu); }, true); window.visualViewport?.addEventListener('resize',()=>{ updateViewportHeight(); liftFocusedField(); }); window.visualViewport?.addEventListener('scroll', liftFocusedField);

function syncFirebaseAuth(){
  const auth=getFirebaseAuth();
  try{ auth?.onAuthStateChanged?.(user=>{ if(user){ saveUser(firebaseUserToLocalUser(user)); ensureUser(currentUser); } }); }catch(_){}
}
function init(){ updateViewportHeight(); enhanceCustomSelects(document); applyI18n(); ensureUser(currentUser); syncFirebaseAuth(); renderBanner(); route(); setTimeout(()=>$('#boot')?.classList.add('hide'), 520); }
init();
