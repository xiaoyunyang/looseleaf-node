// expose our config directly to our application using module.exports
// hold all our client secret keys (facebook, twitter, google)
module.exports = {
  'facebookAuth' : {
      'clientID'      : '571817163177517', // your App ID
      'clientSecret'  : '837c6a4c3796742368bffeab3ad9967c', // your App Secret
      'callbackURL'   : 'http://localhost:8080/auth/facebook/callback',
      'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
      'profileFields' : ['id', 'email', 'name'] // For requesting permissions from Facebook API
  }
};
