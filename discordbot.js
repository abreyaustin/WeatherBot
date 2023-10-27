import { Client, GatewayIntentBits } from 'discord.js';
import { REST, Routes } from 'discord.js';

const weather = require('weather-js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
console.log(process.env.USER);

const commands = [
    {
      name: 'ping',
      description: 'Replies with Pong!',
    },
    {
        name: 'weather',
        description: 'Returns the weather for a specified city',
        options: [
            {
                name: 'city',
                description: 'City name',
                type: 'STRING',
                required: true,
            },
        ],
    }
  ];
  
  const rest = new REST({ version: '10' }).setToken(TOKEN);
  
  try {
    console.log('Started refreshing application (/) commands.');
  
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
  
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

// ADD WEATHER COMMAND

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.login(TOKEN);


