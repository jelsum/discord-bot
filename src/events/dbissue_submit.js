const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	name: 'interactionCreate',
	async execute(modal) {
		if (modal.isModalSubmit() && modal.customId == 'newIssue') {
			let guild = modal.client.guilds.resolve(process.env.GUILD_ID);
			guild.channels
				.fetch(process.env.DATABASE_ISSUES_CHANNEL_ID)
				.then(async (channel) => {
					const embed = new MessageEmbed()
						.setColor('DARK_BLUE')
						.setTitle('New Database Issue')
						.addFields(
							{
								name: 'Map Name: ',
								value: modal.components[0].components[0].value,
							},
							{
								name: 'Issue: ',
								value: modal.components[1].components[0].value,
							},
							{
								name: 'Visual information: ',
								value: modal.components[2].components[0].value,
							},
						);
					const row = new MessageActionRow()
						.addComponents(
							new MessageButton()
								.setCustomId('issue_accept')
								.setLabel('Accept')
								.setStyle('SUCCESS'),
						)
						.addComponents(
							new MessageButton()
								.setCustomId('issue_deny')
								.setLabel('Deny')
								.setStyle('DANGER'),
						);

					channel.send({ embeds: [embed], components: [row] });
				});

			modal.reply({ content: 'Your issue has been submitted.', ephemeral: true });
		}
	}
}