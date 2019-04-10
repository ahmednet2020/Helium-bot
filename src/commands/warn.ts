import * as Discord from 'discord.js'
import * as fs from 'fs'
import * as path from 'path'
import * as ms from 'ms'
let warnFile = path.join(__dirname, './../../warn.json');
let warns = JSON.parse(fs.readFileSync(warnFile, 'utf8'))
export const run = (message:Discord.Message, bot, cmd):any => {
	if(!message.member.hasPermission(["MANAGE_ROLES", "MANAGE_MESSAGES"])) return message.reply("no can't do")
	let user = message.guild.member(message.mentions.users.first());
	if(!user) return message.reply("mention user bro")
	if(user.hasPermission("MANAGE_MESSAGES")) return message.reply("he is npc")
	if(!warns[user.id]){
		warns[user.id] = {
			"name":`${user.user.username}`,
			"warns": 0
		}
	}
	warns[user.id].warns += 1;
	let warnsUser = warns[user.id].warns;
	let warnEmbed = new Discord.RichEmbed()
	.setDescription("Warns")
	.setAuthor(message.author.username)
	.setColor("#fc6400")
	.addField("Warned User", `<@${user.id}>`)
	.addField("Warned In", message.channel)
	.addField("Number of Warnings", warnsUser)
	.addField("by", `<@${message.author.id}>`);

	let report:any = message.guild.channels.find(channel => channel.name === "report");
	if(!report) return message.channel.send('cant find report server');
	report.send(warnEmbed);

	if(warnsUser === 3 || warnsUser === 4) {
		let muterole = message.guild.roles.find(role => role.name === "muted");
		if(!muterole) return message.reply("You should create that role dude.");
		user.addRole(muterole.id).then(()=> {
			message.channel.send(`<@${user.id}> has been temporarily muted`);
		});
		setTimeout(() => {
			user.removeRole(muterole.id).then(() => {
				message.channel.send(`<@${user.id}> has been unmuted.`)
			})
		}, ms("10s"))
		user.sendMessage("next warn will ban you")
	}
	if(warnsUser === 5) {
		warns[user.id] = {ban:true, warns: 0}
		user.ban('spam').then(()=> {
			report.send(`<@${user.id}> has be ban for spam`)
		})
	}
	fs.writeFile(warnFile, JSON.stringify(warns), 'utf8', (err)=> {
		if(err){
			let errchan:any = message.guild.channels.find(channel => channel.name === "error");
			if(errchan) errchan.send(`warn ${err.message}`);
			return console.log(err.message)
		} 
	})
}

export const help = {
	name: "warn"
}