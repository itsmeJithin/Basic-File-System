const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("./../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"]
    },
    function (accessToken, refreshToken, profile, callback) {
      const email = profile.emails[0].value;
      const name = profile.displayName;
      const avatarUrl = profile.photos[0].value;
      User.findOne({email: email}, (err, user) => {
        if (!user) {
          const user = new User({name, email, avatarUrl})
          user.save((err, user) => {
            if (err) {
              console.log("User creation failed", err);
              return callback(err, user)
            } else {
              return callback(null, user)
            }
          })
        } else {
          callback(null, user)
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});