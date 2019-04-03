import * as Discord from 'discord.js'
import { token, prefix } from './config'
// import functions
import sendMessage from './sendMessage'
import kickMember from './kickMember'
import roles from './roles'
import RichEmbed from './RichEmbed'
const client = new Discord.Client({disableEveryone:true});
let botName;
client.once('ready' , ()=> {
	botName = client.user.username;
	client.user.setActivity('silkroad', {type:"PLAYING"});
	console.log(`${botName} is online`)
})

client.on('message', (message):any => {
	// if message from bot than stop
	if (message.author.bot) return;
	// if cmd message in cmd server 
	if(message.content.startsWith(`${prefix}`) && message.channel["name"].search(/welcome/gi) === 0)
	{
		let report:any = message.guild.channels.find(channel => channel.name === "report");
		RichEmbed(message, botName, report);
		kickMember(message, report);
	} else if (message.content.startsWith(`${prefix}`) && message.channel["name"].search(/welcome/gi) === -1) {
		// delete last cmd message if not in right server
		message.delete().then(() => {
			message.reply('cmd in welcome server');
		})
	}
	roles(message);
	sendMessage(message, botName);
})
client.on("guildMemberAdd", (member) => {
  member.send('welocme');
});
client.login(token);