const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const cookieParser = require('cookie-parser');
const DsJwtAuth = require('./lib/DSJwtAuth.js');
const DSAuthCodeGrant = require('./lib/DSAuthCodeGrant');
const dsConfig = require('./config/index.js').config;
const passport = require('passport');
const DocusignStrategy = require('passport-docusign');
const path = require('path');
const helmet = require('helmet');

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || 'localhost';
const max_session_min = 180;

function dsLoginCB1(req, res, next) {
  req.dsAuthCodeGrant.oauth_callback1(req, res, next);
}
function dsLoginCB2(req, res, next) {
  req.dsAuthCodeGrant.oauth_callback2(req, res, next);
}

let hostUrl = 'http://' + HOST + ':' + PORT;
if (dsConfig.appUrl !== '' && dsConfig.appUrl !== '{APP_URL}') {
  hostUrl = dsConfig.appUrl;
}

const app = express()
  .use(helmet())
  .use(express.static(path.join(__dirname, 'public')))
  .use(cookieParser())
  .use(
    session({
      secret: dsConfig.sessionSecret,
      name: 'ds-launcher-session',
      cookie: { maxAge: max_session_min * 60000 },
      saveUninitialized: true,
      resave: true,
      store: new MemoryStore({
        checkPeriod: 86400000, // prune expired entries every 24h
      }),
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use(bodyParser.urlencoded({ extended: true }))
  .use((req, res, next) => {
    res.locals.session = req.session;
    res.locals.dsConfig = {
      ...dsConfig,
    };
    res.locals.hostUrl = hostUrl; // Used by DSAuthCodeGrant#logout

    next();
  })
  .use((req, res, next) => {
    req.dsAuthCodeGrant = new DSAuthCodeGrant(req);
    req.dsAuthJwt = new DsJwtAuth(req);
    // req.dsAuth = req.dsAuthCodeGrant;
    req.dsAuth = req.dsAuthJwt; // jwt
    next();
  })
  .get('/', (req, res, next) => {
    const auth = new DsJwtAuth(req);
    if (!auth.checkToken()) {
      res.redirect('/ds/login');
    } else {
      res.json({ data: 'Welcome', auth: auth });
    }
  })
  .get('/login', (req, res, next) => {
    const auth = new DsJwtAuth(req);
    if (!auth.checkToken()) {
      auth.login(req, res, next);
    } else {
      res.json(auth);
    }
  })
  .get('/ds/login', (req, res, next) => {
    const auth = new DsJwtAuth(req);
    if (!auth.checkToken()) {
      auth.login(req, res, next);
    } else {
      res.redirect('/');
    }
  })
  .get('/user-info', async (req, res, next) => {
    const auth = new DsJwtAuth(req);

    if (!auth.checkToken()) {
      res.json({ message: 'Not logged in' });
    } else {
      const user = await auth.getUserInfo();
      res.json({ user });
      //   {
      //     "accountId": "b1324bfe-b39f-46b7-b14b-51f0177c9958",
      //     "basePath": "https://demo.docusign.net/restapi",
      //     "accountName": "derbysoft"
      // }
    }
  })
  .get('/ds/callback', [dsLoginCB1, dsLoginCB2]) // OAuth callbacks. See below
  .listen(PORT, () => {
    console.info(`==> 🍺  Express server running at localhost:${PORT}`);
  });

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

const SCOPES = ['signature'];
const ROOM_SCOPES = [
  'signature',
  'dtr.rooms.read',
  'dtr.rooms.write',
  'dtr.documents.read',
  'dtr.documents.write',
  'dtr.profile.read',
  'dtr.profile.write',
  'dtr.company.read',
  'dtr.company.write',
  'room_forms',
];
const CLICK_SCOPES = ['signature', 'click.manage', 'click.send'];
const MONITOR_SCOPES = ['signature', 'impersonation'];
const ADMIN_SCOPES = [
  'organization_read',
  'group_read',
  'permission_read',
  'user_read',
  'user_write',
  'account_read',
  'domain_read',
  'identity_provider_read',
  'signature',
  'user_data_redact',
  'asset_group_account_read',
  'asset_group_account_clone_write',
  'asset_group_account_clone_read',
  'organization_sub_account_write',
  'organization_sub_account_read',
];
const WEBFORMS_SCOPES = [
  'webforms_read',
  'webforms_instance_read',
  'webforms_instance_write',
];

const scope = [
  ...ROOM_SCOPES,
  ...CLICK_SCOPES,
  ...MONITOR_SCOPES,
  ...ADMIN_SCOPES,
  ...SCOPES,
  ...WEBFORMS_SCOPES,
];

// Configure passport for DocusignStrategy
const docusignStrategyOptions = {
  production: dsConfig.production,
  clientID: dsConfig.dsClientId,
  scope: scope.join(' '),
  clientSecret: dsConfig.dsClientSecret,
  callbackURL: hostUrl + '/callback',
  state: true, // automatic CSRF protection.
  // See https://github.com/jaredhanson/passport-oauth2/blob/master/lib/state/session.js
};
function processDsResult(accessToken, refreshToken, params, profile, done) {
  // The params arg will be passed additional parameters of the grant.
  // See https://github.com/jaredhanson/passport-oauth2/pull/84
  //
  // Here we're just assigning the tokens to the account object
  // We store the data in DSAuthCodeGrant.getDefaultAccountInfo
  let user = profile;
  user.accessToken = accessToken;
  user.refreshToken = refreshToken;
  user.expiresIn = params.expires_in;
  user.tokenExpirationTimestamp = moment().add(user.expiresIn, 's'); // The dateTime when the access token will expire
  return done(null, user);
}
const docusignStrategy = new DocusignStrategy(
  docusignStrategyOptions,
  processDsResult
);
const docusignStrategyPKCE = new DocusignStrategy(
  {
    ...docusignStrategyOptions,
    pkce: true,
  },
  processDsResult
);

/**
 * The DocuSign OAuth default is to allow silent authentication.
 * An additional OAuth query parameter is used to not allow silent authentication
 */
if (!dsConfig.allowSilentAuthentication) {
  // See https://stackoverflow.com/a/32877712/64904
  docusignStrategy.authorizationParams = function (options) {
    return { prompt: 'login' };
  };
}
passport.use('docusign', docusignStrategy);
passport.use('docusign_pkce', docusignStrategyPKCE);
