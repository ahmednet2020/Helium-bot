import * as Discord from 'discord.js'
import * as fs from 'fs';
import * as path from 'path'
import { token, prefix } from './config'
// import message functions
import sendMessage from './message/sendMessage'
import agree from './message/agree'
//
import * as commands from './commands'
// bot
const helium = new Discord.Client({disableEveryone:true});

helium.once('ready' , ()=> {
	let botName = helium.user.username;
	helium.user.setActivity('brew start', {type:"PLAYING"});
	console.log(`${botName} is online`)
})

helium.on('message', (message):any => {
	// if message from bot than stop
	if (message.author.bot) return;
	// if cmd message in cmd server 
	if(message.content.startsWith(`${prefix}`) && message.channel["name"].search(/welcome/gi) === 0)
	{
		let cmd = message.content.split(" ")[0].slice(1);
		let command:any = commands[cmd];
		if(command) command(message, helium, cmd)
		else console.log('command not find', cmd, command)
	} else if (message.content.startsWith(`${prefix}`) && message.channel["name"].search(/welcome/gi) === -1) {
		// delete last cmd message if not in right server
		message.delete().then(() => {
			message.reply('cmd in welcome server');
		})
	}
	agree(message)
	sendMessage(message, helium)
})
helium.on("guildMemberAdd", (member) => {
  member.send('welocme');
});
helium.login(token);