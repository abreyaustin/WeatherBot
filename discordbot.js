import { Client, GatewayIntentBits } from 'discord.js';
import { REST, Routes } from 'discord.js';

import weather from 'weather-js';


const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

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
            type: 3, // String
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

  const { commandName } = interaction;

  // ping command
  if (commandName === 'ping') {
    await interaction.reply('Pong!');
  }

  // weather comand
  if (commandName === 'weather') {
    const city = interaction.options.getString('city');

    // Fetch weather data with weather-js
    weather.find({ search: city, degreeType: 'F' }, function(err, result) {
        if (err) {
            console.log(err);
            interaction.reply('Error occured while fetching weather data');
        } else if (result && result[0]) {
            const weatherData = result[0];
            const reply = `Weather in ${weatherData.location.name}:
            - Temperature: ${weatherData.current.temperature}°C
            - Condition: ${weatherData.current.skytext}`;
            interaction.reply(reply);
        } else {
            interaction.reply('No weather data found for ${city}');
        }
    });
  }

});

client.login(TOKEN);