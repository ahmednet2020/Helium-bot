import * as Discord from 'discord.js'
import { prefix } from './config'


export default function kickMember(message:Discord.Message) {
	if (message.content.startsWith(`${prefix}kick`)) {
		if(!message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) return null;
		let member = message.mentions.members.first()
		if(member) {
			member.kick().then(()=>{
				message.reply(`has ben kick <@${member.id}>`)
			}).catch((err) => console.log(err))
		} else {
			message.reply('mentions member you need to kick')
		}
	}
}