const fs = require("fs");
let file = fs.readFileSync("/home/container/NeosVR/Config/Config.json");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const db = low(new FileSync("/home/container/Config/Users.json"));
db.defaults({ Users: ["U-ChangeMe"] }).write();
//let Users = JSON.parse(fs.readFileSync(`Config/Users.json`))
let config = JSON.parse(file);
const Neos = require("@bombitmanbomb/neosjs");
const { CommandManager } = require("neosjs-commands");
const neos = new Neos();
const Commands = CommandManager.CreateCommands(neos);
const DirectPathToHeadlessFolder = "/home/container/NeosVR";
const ConfigPathRelative = null; //Use Default
const LaunchParameters = ["-LoadAssembly", "nml_mods/NeosSimpleUtilities.dll"];
const { HeadlessInterface } = require("neosjs-headless-interface");
const { arch } = require("os");
neos.Options.StatusInterval = null;
neos.Options.AutoReadMessages = true;
const { v4: uuidv4 } = require("uuid");
const { List } = require("@bombitmanbomb/utils");
const AllowedUsers = List.ToList(db.get("Users").value());

function getAllFuncs(toCheck) {
  const props = [];
  let obj = toCheck;
  do {
    props.push(...Object.getOwnPropertyNames(obj));
  } while ((obj = Object.getPrototypeOf(obj)));

  return props.sort().filter((e, i, arr) => {
    if (e != arr[i + 1] && typeof toCheck[e] == "function") return true;
  });
}

//console.log(Users)
id = uuidv4();

const NeosVR = new HeadlessInterface(
  DirectPathToHeadlessFolder,
  ConfigPathRelative,
  LaunchParameters
);

NeosVR.on("ready", () => {
  neos.Login(config.loginCredential, config.loginPassword, null, id);
  const commands = new List();
  //commands.Add({command: "saveConfig", help:"Saves the current settings into the original config file", usage: Commands.Options.Prefix + "saveconfig <filename> (optional, will save in place without)"});
  //commands.Add({command: "login", help:"Login into a Neos account", usage: Commands.Options.Prefix + "login <username/email> <password>"});
  //commands.Add({command: "logout", help:"Log out from the current Neos account", usage: Commands.Options.Prefix + "logout"});
  commands.Add({
    command: "message",
    help: "Message user in friends list",
    usage: Commands.Options.Prefix + "message <friend name> <message>",
  });
  commands.Add({
    command: "invite",
    help: "Invite a friend to the currently focused world",
    usage: Commands.Options.Prefix + "invite <friend name>",
  });
  commands.Add({
    command: "friendRequests",
    help: "Lists all incoming friend requests",
    usage: Commands.Options.Prefix + "friendrequests",
  });
  commands.Add({
    command: "acceptFriendRequest",
    help: "Accepts a friend request",
    usage: Commands.Options.Prefix + "acceptfriendrequest <friend name>",
  });
  commands.Add({
    command: "worlds",
    help: "Lists all active worlds",
    usage: Commands.Options.Prefix + "worlds",
  });
  commands.Add({
    command: "focus",
    help: "Focus world",
    usage: Commands.Options.Prefix + "focus <world name or number>",
  });
  commands.Add({
    command: "startWorldURL",
    help: "Start a new world from URL",
    usage: Commands.Options.Prefix + "startworldurl <record URL>",
  });
  commands.Add({
    command: "startWorldTemplate",
    help: "Start a new world from template",
    usage: Commands.Options.Prefix + "startworldtemplate <template name>",
  });
  commands.Add({
    command: "status",
    help: "Shows the status of the current world",
    usage: Commands.Options.Prefix + "status",
  });
  commands.Add({
    command: "sessionUrl",
    help: "Prints the URL of the current session",
    usage: Commands.Options.Prefix + "sessionurl",
  });
  commands.Add({
    command: "sessionID",
    help: "Prints the ID of the current session",
    usage: Commands.Options.Prefix + "sessionid",
  });
  commands.Add({
    command: "copySessionURL",
    help: "Copies the URL of the current session to clipboard",
    usage: Commands.Options.Prefix + "copysessionurl",
  });
  commands.Add({
    command: "copySessionID",
    help: "Copies the ID of the current session to clipboard",
    usage: Commands.Options.Prefix + "copysessionid",
  });
  commands.Add({
    command: "users",
    help: "Lists all users in the world",
    usage: Commands.Options.Prefix + "users",
  });
  commands.Add({
    command: "close",
    help: "Closes the currnetly focused world",
    usage: Commands.Options.Prefix + "close",
  });
  //commands.Add({command: "save", help:"Saves the currnetly focused world", usage: Commands.Options.Prefix + "save"});
  commands.Add({
    command: "restart",
    help: "Restarts the current world",
    usage: Commands.Options.Prefix + "restart",
  });
  commands.Add({
    command: "kick",
    help: "Kicks given user from the session",
    usage: Commands.Options.Prefix + "kick <username>",
  });
  commands.Add({
    command: "silence",
    help: "Silences given user in the session",
    usage: Commands.Options.Prefix + "silence <username>",
  });
  commands.Add({
    command: "unsilence",
    help: "Removes silence from given user in the session",
    usage: Commands.Options.Prefix + "unsilence <username>",
  });
  commands.Add({
    command: "ban",
    help: "Bans the user from all sessions hosted by this server",
    usage: Commands.Options.Prefix + "ban <username>",
  });
  commands.Add({
    command: "unban",
    help: "Removes ban for user with given username",
    usage: Commands.Options.Prefix + "unban <username>",
  });
  commands.Add({
    command: "listbans",
    help: "Lists all active bans",
    usage: Commands.Options.Prefix + "listbans",
  });
  commands.Add({
    command: "banByName",
    help: "Bans user with given Neos username from all sessions hosted by this server",
    usage: Commands.Options.Prefix + "banbyname <Neos username>",
  });
  commands.Add({
    command: "unbanByName",
    help: "Unbans user with given Neos username from all sessions hosted by this server",
    usage: Commands.Options.Prefix + "unbanbyname <Neos username>",
  });
  commands.Add({
    command: "banByID",
    help: "Bans user with given Neos User ID from all sessions hosted by this server",
    usage: Commands.Options.Prefix + "banbyid <user ID>",
  });
  commands.Add({
    command: "unbanByID",
    help: "Unbans user with given Neos User ID from all sessions hosted by this server",
    usage: Commands.Options.Prefix + "unbanbyid <user ID>",
  });
  commands.Add({
    command: "respawn",
    help: "Respawns given user",
    usage: Commands.Options.Prefix + "respawn <username>",
  });
  commands.Add({
    command: "role",
    help: "Assigns a role to given user",
    usage: Commands.Options.Prefix + "role <username> <role>",
  });
  commands.Add({
    command: "name",
    help: "Sets a new world name",
    usage: Commands.Options.Prefix + "name <new name>",
  });
  commands.Add({
    command: "accessLevel",
    help: "Sets a new world access level",
    usage: Commands.Options.Prefix + "accesslevel <access level name>",
  });
  commands.Add({
    command: "hideFromListing",
    help: "Sets whether the session should be hidden from listing or not",
    usage: Commands.Options.Prefix + "hidefromlisting <true/false>",
  });
  commands.Add({
    command: "description",
    help: "Sets a new world description",
    usage: Commands.Options.Prefix + "description <new description>",
  });
  commands.Add({
    command: "maxUsers",
    help: "Sets user limit",
    usage: Commands.Options.Prefix + "maxusers <max users>",
  });
  commands.Add({
    command: "awayKickInterval",
    help: "Sets the away kick interval",
    usage: Commands.Options.Prefix + "awaykickinterval <interval in minutes>",
  });
  commands.Add({
    command: "import",
    help: "Import an asset into the focused world",
    usage: Commands.Options.Prefix + "import <file path or URL>",
  });
  commands.Add({
    command: "importMinecraft",
    help: "Import a Minecraft world. Requires Mineways to be installed.",
    usage:
      Commands.Options.Prefix +
      "importminecraft <folder containing Minecraft world with the level.dat file>",
  });
  commands.Add({
    command: "dynamicImpulse",
    help: "Sends a dynamic impulse with given tag to the scene root",
    usage: Commands.Options.Prefix + "dynamicimpulse <tag>",
  });
  commands.Add({
    command: "dynamicImpulseString",
    help: "Sends a dynamic impulse with given tag and string value to the scene root",
    usage: Commands.Options.Prefix + "dynamicimpulsestring <tag> <value>",
  });
  commands.Add({
    command: "dynamicImpulseInt",
    help: "Sends a dynamic impulse with given tag and integer value to the scene root",
    usage: Commands.Options.Prefix + "dynamicimpulseint <tag> <value>",
  });
  commands.Add({
    command: "dynamicImpulseFloat",
    help: "Sends a dynamic impulse with given tag and float value to the scene root",
    usage: Commands.Options.Prefix + "dynamicimpulsefloat <tag> <value>",
  });
  commands.Add({
    command: "spawn",
    help: "Spawns a saved item from the inventory into the root",
    usage: Commands.Options.Prefix + "spawn <url> <active state>",
  });
  commands.Add({
    command: "gc",
    help: "Forces full garbage collection",
    usage: Commands.Options.Prefix + "gc",
  });
  //commands.Add({command: "shutdown", help:"Shuts down the headless client", usage: Commands.Options.Prefix + "shutdown"});
  commands.Add({
    command: "tickRate",
    help: "Sets the maximum simulation rate for the servers",
    usage: Commands.Options.Prefix + "tickrate <ticks per second>",
  });
  //commands.Add({command: "log", help:"Switches the interactive shell to logging output. Press enter again to restore interactive.", usage: Commands.Options.Prefix + "log"});

  commands.forEach((command) => {
    Commands.Add(
      command.command,
      (Handler, Sender, Args, Id) => {
        let TempCommand = [command.command];
        for (let argument of Args) TempCommand.push(`"${argument}"`);
        NeosVR.RunCommand(TempCommand.join(" ")).then((response) =>
          Handler.Reply(response)
        );
      },
      {
        index: command.help,
        usage: command.usage,
      },
      AllowedUsers
    );
  });
});
neos.on("login", (obj) => {
 console.log('Nodejs Layer Logged in.')
});
neos.on("friendAdded", (friend) => {
  if (friend.FriendStatus == "Requested") {
    neos.AddFriend(friend); // Accept the Friend Request
  }
  //console.log(friend) //New Friend
});
let UpdateTimer = setInterval(() => {
  AllowedUsers.TrimExcess();
  db.set("Users", AllowedUsers);
}, 120000);
// Commands
Commands.Add(
  "check",
  (Handler, Sender, Args, Id) =>
    Handler.Reply(
      `you ${
        AllowedUsers.Contains(Sender)
          ? "<color=green>ARE</color>"
          : "are <color=red> NOT</color>"
      } whitelisted 👌`
    ),
  {
    index: "Checks to see if your on the whitelist",
    usage: `${Commands.Options.Prefix}check`,
  }
);
Commands.Add(
  "auth",
  (Handler, Sender, Args, Id) => {
    if (Args.length != 1) return Handler.Usage();
    let UserID = Args[0];
    Handler.Reply(
      "<color=green>Added " + Args[0] + " To the Whitelist</color>"
    );
    AllowedUsers.AddUnique(Args[0]);
  },
  {
    index: "Add a user to the Whitelist",
    usage: `${Commands.Options.Prefix}auth <UserID>`,
  },
  AllowedUsers
);
Commands.Add(
  "deauth",
  (Handler, Sender, Args, Id) => {
    if (Args.length != 1) return Handler.Usage();
    let UserID = Args[0];
    Handler.Reply(
      "<color=red>Removed " + Args[0] + " from the Whitelist</color>"
    );
    AllowedUsers.Remove(Args[0]);
  },
  {
    index: "Remove a user to the Whitelist",
    usage: `${Commands.Options.Prefix}deauth <UserID>`,
  },
  db.get("allowed").value()
);
//Not Commands

// Message Checking
neos.on("messageReceived", (Message) => {
  switch (Message.MessageType) {
    case "Text":
      Commands.Run(Message);
      break;
    case "Object":
      break;
    case "CreditTransfer":
      neos.SendTextMessage(Message.SenderId, "I love you ❤️");

      break;
  }
});
