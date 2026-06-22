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

  function cleanObject(obj){
    return JSON.parse(JSON.stringify(obj || {}));
  }

  async function getUserProfile(uid){
    const db = getDb();
    if(!db || !uid) return null;
    const snap = await db.collection('users').doc(uid).get();
    return snap.exists ? snap.data() : null;
  }

  async function saveUserProfile(profile){
    const db = getDb();
    if(!db || !profile || !profile.uid) return null;
    const clean = cleanObject(profile);
    clean.updatedAt = new Date().toISOString();
    await db.collection('users').doc(profile.uid).set(clean, {merge:true});
    return clean;
  }

  async function listUsers(limit){
    const db = getDb();
    if(!db) return [];
    const snap = await db.collection('users').orderBy('updatedAt', 'desc').limit(limit || 80).get();
    const rows = [];
    snap.forEach(doc => rows.push({uid:doc.id, ...doc.data()}));
    return rows;
  }

  async function updateUserModeration(uid, patch, action){
    const db = getDb();
    if(!db || !uid) return null;
    const payload = {...cleanObject(patch), updatedAt:new Date().toISOString()};
    await db.collection('users').doc(uid).set(payload, {merge:true});
    if(action) await saveAdminAction(action);
    return payload;
  }

  async function saveAdminAction(action){
    const db = getDb();
    if(!db || !action) return null;
    const payload = {...cleanObject(action), createdAt:new Date().toISOString()};
    await db.collection('adminActions').add(payload);
    return payload;
  }

  async function saveUserReport(report){
    const db = getDb();
    if(!db || !report) return null;
    const payload = {...cleanObject(report), status:'new', createdAt:new Date().toISOString()};
    await db.collection('reports').add(payload);
    return payload;
  }

  async function saveThanks(thanks){
    const db = getDb();
    if(!db || !thanks) return null;
    const id = `${thanks.fromUid}_${thanks.toUid}`;
    const payload = {...cleanObject(thanks), createdAt:new Date().toISOString()};
    await db.collection('thanks').doc(id).set(payload, {merge:false});
    return payload;
  }

  async function updateSiteSettings(settings){
    const db = getDb();
    if(!db || !settings) return null;
    await db.collection('site').doc('settings').set({...cleanObject(settings), updatedAt:new Date().toISOString()}, {merge:true});
    return settings;
  }

  window.PoluxDbService = {
    configReady,
    getDb,
    getUserProfile,
    saveUserProfile,
    listUsers,
    updateUserModeration,
    saveAdminAction,
    saveUserReport,
    saveThanks,
    updateSiteSettings
  };
})();
