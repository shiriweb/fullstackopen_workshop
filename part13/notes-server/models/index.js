const Note = require("./note");
const User = require("./user");
const Team = require("./team");
const Membership = require("./membership");
const userNotes = require("./userNote");
const UserNotes = require("./userNote");

User.hasMany(Note);
Note.belongsTo(User);

User.belongsToMany(Team, { through: Membership });
Team.belongsToMany(User, { through: Membership });

User.belongsToMany(Note, { through: UserNotes, as: "marked_notes" });
Note.belongsToMany(User, { through: UserNotes, as: "users_notes" });

module.exports = {
  Note,
  User,
  Team,
  Membership,
};
