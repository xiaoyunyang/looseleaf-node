// expose our config directly to our application using module.exports
// hold all our client secret keys (facebook, twitter, google)
module.exports = {
  'facebookAuth' : {
      'clientID'      : '571817163177517', // your App ID
      'clientSecret'  : '837c6a4c3796742368bffeab3ad9967c', // your App Secret
      'callbackURL'   : 'http://localhost:3001/auth/facebook/callback',
      'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
      'profileFields' : ['id', 'email', 'name', 'gender', 'location'] // For requesting permissions from Facebook API
  },
  'githubAuth': {
    'clientID'        : '109b7395ca40874cde5d',
    'clientSecret'    : '90a2bff0cdcbe0cad2c8a173d682eb742e3693ae',
    'callbackURL'     : 'http://localhost:3001/auth/github/callback',
    'scope'           : [ 'user:email' ] 
  }
};
