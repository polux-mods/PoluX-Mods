(function(){
  let authInstance = null;

  function configReady(){
    const cfg = window.POLUX_FIREBASE_CONFIG || {};
    return !!(cfg.apiKey && cfg.authDomain && cfg.projectId && cfg.appId);
  }

  function getAuth(languageCode){
    if(!configReady() || !window.firebase || !window.firebase.initializeApp) return null;
    if(!window.firebase.apps.length){
      window.firebase.initializeApp(window.POLUX_FIREBASE_CONFIG);
    }
    authInstance = window.firebase.auth();
    if(languageCode) authInstance.languageCode = languageCode;
    return authInstance;
  }

  function googleProvider(){
    const provider = new window.firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({prompt:'select_account'});
    return provider;
  }

  async function signInWithGoogle(languageCode){
    const auth = getAuth(languageCode);
    if(!auth) throw new Error('Firebase config missing');
    const provider = googleProvider();
    try{
      return await auth.signInWithPopup(provider);
    }catch(error){
      if(error && (error.code === 'auth/popup-blocked' || error.code === 'auth/cancelled-popup-request')){
        await auth.signInWithRedirect(provider);
        return null;
      }
      throw error;
    }
  }

  window.PoluxAuthService = {
    configReady,
    getAuth,
    signInWithGoogle
  };
})();
