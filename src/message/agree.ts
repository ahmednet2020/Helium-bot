import * as Discord from 'discord.js'

// add or remove roles 
export default function agree(message: Discord.Message) {
	if(message.channel.type === 'dm')  return;
	if(message.content === 'agree'){
		let roleId = message.guild.roles.find(role => role.name === 'agree')
		message.member.addRole(roleId.id)
	}
	if(message.content === 'unagree')
	{
		let roleId = message.guild.roles.find(role => role.name === 'agree')
		message.member.removeRole(roleId.id)
	}
}
