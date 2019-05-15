import * as Discord from 'discord.js'
import * as ms from 'ms'

export default function (message:Discord.Message, bot, cmd):any {
	let user = message.guild.member(message.mentions.users.first());
	let time = message.content.split(" ")[1];
	let muterole:any = message.guild.roles.find(`name`, "muted");
	if(!user) return message.reply("Couldn't find user.");
	if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("you Can't mute them!");
	// start of create role
	if(!muterole){
		try{
		 muterole = message.guild.createRole({
		  	"name": "muted",
	        "color": "#000000",
	        "permissions":[]
		  });
		} catch(e){
      		console.log(e.message);
      		message.reply(e.message);
    	}
	}
	 message.guild.channels.forEach((channel, id) => {
         channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
	 //end of create role
	 if(!time) return message.reply("You didn't specify a time!");
	 user.addRole(muterole.id).then(() => {
	 	message.channel.send(`<@${user.id}> has been muted for ${ms(time)} milliseconds`);
	 });
	setTimeout(() => {
	    user.removeRole(muterole.id).then(()=> {
	    	message.channel.send(`<@${user.id}> has been unmuted!`);
	    });
	}, ms(time));


  //end of module

}