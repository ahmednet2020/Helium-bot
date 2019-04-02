import * as Discord from 'discord.js'
import { token } from './config'
// import functions
import sendMessage from './sendMessage'
import kickMember from './kickMember'
import roles from './roles'
import RichEmbed from './RichEmbed'
const client = new Discord.Client({disableEveryone:true});
let botName;
client.once('ready' , ()=> {
	botName = client.user.username;
	console.log(`${botName} is online`)
})

client.on('message', (message) => {
	sendMessage(message, botName);
	RichEmbed(message, botName);
	kickMember(message);
	roles(message)
})
client.on("guildMemberAdd", (member) => {
  member.send('welocme');
});
client.login(token);