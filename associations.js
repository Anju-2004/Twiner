// associations.js
const User = require('./models/User');
const Tweet = require('./models/tweet');
const TweetActivity = require('./models/TweetActivity');
const Followers = require('./models/followers');

User.hasMany(Tweet);
Tweet.belongsTo(User);

User.hasMany(TweetActivity);
TweetActivity.belongsTo(User);

User.belongsToMany(User, { through: Followers, as: 'followers', foreignKey: 'userid' });
User.belongsToMany(User, { through: Followers, as: 'following', foreignKey: 'followingid' });
