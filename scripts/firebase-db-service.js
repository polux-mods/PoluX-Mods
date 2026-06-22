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

  function clean(data){ return JSON.parse(JSON.stringify(data || {})); }
  function serverStamped(data){ return {...clean(data), updatedAt:new Date().toISOString()}; }

  async function getDoc(collection, id){
    const db = getDb();
    if(!db || !collection || !id) return null;
    const snap = await db.collection(collection).doc(id).get();
    return snap.exists ? {id:snap.id, ...snap.data()} : null;
  }

  async function setDoc(collection, id, data, merge=true){
    const db = getDb();
    if(!db || !collection || !id || !data) return null;
    const payload = serverStamped(data);
    await db.collection(collection).doc(id).set(payload, {merge});
    return payload;
  }

  async function addDoc(collection, data){
    const db = getDb();
    if(!db || !collection || !data) return null;
    const payload = {...clean(data), createdAt:data.createdAt || new Date().toISOString(), updatedAt:new Date().toISOString()};
    const ref = await db.collection(collection).add(payload);
    return {id:ref.id, ...payload};
  }

  async function listDocs(collection, options={}){
    const db = getDb();
    if(!db || !collection) return [];
    let ref = db.collection(collection);
    if(options.where){
      for(const w of options.where){ ref = ref.where(w[0], w[1], w[2]); }
    }
    if(options.orderBy) ref = ref.orderBy(options.orderBy[0], options.orderBy[1] || 'desc');
    if(options.limit) ref = ref.limit(options.limit);
    const snap = await ref.get();
    return snap.docs.map(doc => ({id:doc.id, ...doc.data()}));
  }

  async function deleteDoc(collection, id){
    const db = getDb();
    if(!db || !collection || !id) return null;
    await db.collection(collection).doc(id).delete();
    return true;
  }

  // Legacy-compatible helpers already used by earlier versions of app.js.
  async function getUserProfile(uid){ return getDoc('users', uid); }
  async function getAllUserProfiles(limit=80){ return listDocs('users', {orderBy:['updatedAt','desc'], limit}); }
  async function updateUserProfile(uid, patch){ return setDoc('users', uid, patch, true); }
  async function saveUserProfile(profile){ return profile?.uid ? setDoc('users', profile.uid, profile, true) : null; }
  async function saveAdminAction(action){ return addDoc('adminActions', action); }
  async function saveUserReport(report){ return addDoc('reports', {...report, status:report.status || 'new'}); }
  async function updateSiteSettings(settings){ return setDoc('siteSettings', 'main', settings, true); }

  // Normalized Polux schema helpers.
  const api = {
    configReady, getDb, getDoc, setDoc, addDoc, listDocs, deleteDoc,
    getUserProfile, saveUserProfile, getAllUserProfiles, updateUserProfile,
    saveAdminAction, saveUserReport, updateSiteSettings,
    getSiteSettings: () => getDoc('siteSettings', 'main'),
    saveSiteSettings: settings => setDoc('siteSettings', 'main', settings, true),
    listRoles: () => listDocs('roles', {orderBy:['level','desc']}),
    saveRole: role => setDoc('roles', role.id, role, true),
    deleteRole: id => deleteDoc('roles', id),
    listPublishedMods: limit => listDocs('mods', {where:[['status','in',['published','approved']]], orderBy:['publishedAt','desc'], limit}),
    saveMod: mod => setDoc('mods', mod.id, mod, true),
    listPublishedNews: limit => listDocs('news', {where:[['status','==','published']], orderBy:['publishedAt','desc'], limit}),
    saveNews: item => setDoc('news', item.id, item, true),
    saveComment: comment => setDoc('comments', comment.id, comment, true),
    saveRating: rating => setDoc('ratings', `${rating.userId}_${rating.itemId}`, rating, true),
    saveFavorite: fav => setDoc('favorites', `${fav.userId}_${fav.itemId}`, fav, true),
    deleteFavorite: (userId, itemId) => deleteDoc('favorites', `${userId}_${itemId}`),
    saveTicket: ticket => setDoc('tickets', ticket.id, ticket, true),
    saveNotification: note => setDoc('notifications', note.id, note, true)
  };

  window.PoluxDbService = api;
})();
