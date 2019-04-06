import * as Discord from 'discord.js'
import * as fs from 'fs';
import * as path from 'path'
import { token, prefix } from './config'
// import message functions
import sendMessage from './message/sendMessage'
import agree from './message/agree'
// bot
const helium = new Discord.Client({disableEveryone:true});
const commands = new Discord.Collection();
let location = path.join(__dirname,"./commands/"); 
fs.readdir(location, "utf8",(err, dir) => {
	if(err) return console.log(err);
	let files = dir.filter(file => file.split(".").pop() === "js") 
	files.forEach((file, index) =>{
    	let props = require(`./commands/${file}`);
    	console.log(`${file} loaded!`);
   		commands.set(props.help.name, props)
  });
})


helium.once('ready' , ()=> {
	let botName = helium.user.username;
	helium.user.setActivity('silkroad', {type:"PLAYING"});
	console.log(`${botName} is online`)
})

helium.on('message', (message):any => {
	// if message from bot than stop
	if (message.author.bot) return;
	// if cmd message in cmd server 
	if(message.content.startsWith(`${prefix}`) && message.channel["name"].search(/welcome/gi) === 0)
	{
		let cmd = message.content.split(" ")[0].slice(1);
		let commandFile:any = commands.get(cmd);
		if(commandFile) commandFile.run(message, helium, cmd)
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
helium.login(token);helium