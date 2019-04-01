import * as Discord from 'discord.js'

// add or remove roles 
export default function roles(message: Discord.Message) {
	if(message.author.bot) return null;
	let roleId = message.guild.roles.find(role => role.name === 'agree')
	if(message.content === 'agree'){
		message.member.addRole(roleId.id)
	}
	if(message.content === 'unagree')
	{
		message.member.removeRole(roleId.id)
	}
}