const tmi = require('tmi.js');
// npm install tmi.js
// node.js and npm installation required

// Define configuration options
const opts = {
  identity: {
    username: "Maskedflame073",
    password: "d8ea0nppsx3elo2kpx5nurd1wzjash"
  },
  channels: [
    "c0w0kie"
  ]
};
// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

var wins = 0;
var losses = 0;

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  console.log(context.toString());
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  console.log(msg);
  const commandName = msg.trim();

  // If the command is known, execute it and log it to the console
  if (commandName === '!w'){
    wins += 1;
    client.say(target, `W: ${wins} L: ${losses}`);
    console.log(`* Executed ${commandName} command`);
  }
  
  else if (commandName === '!l'){
    losses += 1;
    client.say(target, `W: ${wins} L: ${losses}`);
    console.log(`* Executed ${commandName} command`);
  }

  else if (commandName === '!wlclear'){
    wins = 0;
    losses = 0;
    client.say(target, `Win/Loss record cleared`);
    console.log(`* Executed ${commandName} command`);
  }

  else if (commandName === '!dice') {
    const num = rollDice();
    client.say(target, `You rolled a ${num}`);
    console.log(`* Executed ${commandName} command`);
  } 

  else {
    console.log(`* Unknown command ${commandName}`);
  }
}

// Function called when the "dice" command is issued
function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}