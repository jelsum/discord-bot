const { SlashCommandBuilder } = require('@discordjs/builders');
const { Modal, MessageActionRow, TextInputComponent } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dbissue')
		.setDescription('Report an issue with the database to database managers'),
	async execute(interaction) {
		const modal = new Modal()
			.setCustomId('newIssue')
			.setTitle('Report a database issue')
			.addComponents([
				new MessageActionRow().addComponents(
					new TextInputComponent()
						.setCustomId('mapname')
						.setLabel('Map name')
						.setStyle('SHORT')
						.setPlaceholder('eg: bhop_eazy')
						.setRequired(true),
				),
				new MessageActionRow().addComponents(
					new TextInputComponent()
						.setCustomId('description')
						.setLabel('Description of the issue')
						.setStyle('PARAGRAPH')
						.setMaxLength(1024)
						.setPlaceholder('Explain the issue clearly')
						.setRequired(true),
				),
				new MessageActionRow().addComponents(
					new TextInputComponent()
						.setCustomId('visual')
						.setLabel('Link to video/screenshot of the issue')
						.setStyle('SHORT')
						.setPlaceholder('YouTube link/Imgur link etc')
						.setRequired(false),
				),
			]);
			interaction.showModal(modal);
	}
}