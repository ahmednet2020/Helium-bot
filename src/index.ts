import * as Discord from 'discord.js'
import { token } from './config'
// import functions
import sendMessage from './sendMessage'
import kickMember from './kickMember'
const client = new Discord.Client();
let botName;
client.once( 'ready' , ()=> {
	console.log('bot is ready')
	botName = client.user.username;
})

client.on('message', (message) => {
	sendMessage(message, botName);
	kickMember(message);
})
client.on("guildMemberAdd", (member) => {
  member.send('welocme');
});
client.login(token);