(function(){
  let dbInstance = null;

  function configReady(){
    const cfg = window.POLUX_FIREBASE_CONFIG || {};
    return !!(cfg.apiKey && cfg.authDomain && cfg.projectId && cfg.appId);
  }

  function getDb(){
    if(!configReady() || !window.firebase || !window.firebase.initializeApp || !window.firebase.firestore) return null;
    if(!window.firebase.apps.length){
      window.firebase.initializeApp(window.POLUX_FIREBASE_CONFIG);
    }
    dbInstance = window.firebase.firestore();
    return dbInstance;
  }

  async function getUserProfile(uid){
    const db = getDb();
    if(!db || !uid) return null;
    const snap = await db.collection('users').doc(uid).get();
    return snap.exists ? snap.data() : null;
  }

  async function getAllUserProfiles(limit=80){
    const db = getDb();
    if(!db) return [];
    const snap = await db.collection('users').orderBy('updatedAt','desc').limit(limit).get();
    return snap.docs.map(doc => ({uid:doc.id, ...doc.data()}));
  }

  async function updateUserProfile(uid, patch){
    const db = getDb();
    if(!db || !uid || !patch) return null;
    const clean = JSON.parse(JSON.stringify({...patch, updatedAt:new Date().toISOString()}));
    await db.collection('users').doc(uid).set(clean, {merge:true});
    return clean;
  }

  async function saveUserProfile(profile){
    const db = getDb();
    if(!db || !profile || !profile.uid) return null;
    const clean = JSON.parse(JSON.stringify(profile));
    clean.updatedAt = new Date().toISOString();
    await db.collection('users').doc(profile.uid).set(clean, {merge:true});
    return clean;
  }

  async function saveAdminAction(action){
    const db = getDb();
    if(!db || !action) return null;
    const payload = {...action, createdAt:new Date().toISOString()};
    await db.collection('adminActions').add(payload);
    return payload;
  }

  async function saveUserReport(report){
    const db = getDb();
    if(!db || !report) return null;
    const payload = {...report, status:'new', createdAt:new Date().toISOString()};
    await db.collection('reports').add(payload);
    return payload;
  }

  async function updateSiteSettings(settings){
    const db = getDb();
    if(!db || !settings) return null;
    await db.collection('site').doc('settings').set({...settings, updatedAt:new Date().toISOString()}, {merge:true});
    return settings;
  }

  async function savePublication(type, item){
    const db = getDb();
    if(!db || !type || !item) return null;
    const clean = JSON.parse(JSON.stringify({...item, updatedAt:new Date().toISOString()}));
    const col = type === 'news' ? 'news' : type === 'mod' ? 'mods' : 'home';
    if(clean.id){ await db.collection(col).doc(clean.id).set(clean, {merge:true}); return clean; }
    const ref = await db.collection(col).add(clean);
    return {id:ref.id, ...clean};
  }

  async function saveAppeal(appeal){
    const db = getDb();
    if(!db || !appeal) return null;
    const payload = {...appeal, status:appeal.status || 'new', createdAt:appeal.createdAt || new Date().toISOString()};
    await db.collection('appeals').doc(payload.id || String(Date.now())).set(payload, {merge:true});
    return payload;
  }

  async function saveNotification(uid, notification){
    const db = getDb();
    if(!db || !uid || !notification) return null;
    const payload = {...notification, read:false, createdAt:notification.createdAt || new Date().toISOString()};
    await db.collection('users').doc(uid).collection('notifications').doc(payload.id || String(Date.now())).set(payload, {merge:true});
    return payload;
  }

  window.PoluxDbService = {
    configReady,
    getDb,
    getUserProfile,
    saveUserProfile,
    getAllUserProfiles,
    updateUserProfile,
    saveAdminAction,
    saveUserReport,
    updateSiteSettings,
    savePublication,
    saveAppeal,
    saveNotification
  };
})();
