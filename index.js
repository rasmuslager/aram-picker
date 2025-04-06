const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
  if (message.content.startsWith('!ping')) {
    message.reply('Pong!');
  }

  if (message.content.startsWith('!pick')) {
    const version = '15.7.1'
    const teamSize = message.content.match(/^!pick\s+(\d+)/)[1];
    const req = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`);
    const champs = Object.keys((await req.json()).data);
    const shuffled = [...champs].sort(() => Math.random() - 0.5);
    const [team1, team2] = [shuffled.slice(0, teamSize*3), shuffled.slice(teamSize*3, (teamSize*3)*2)];

    message.reply(`
    \n Team 1: \n ${team1.join(', ')}. 
    \n
    -----
    \n
    \n Team 2: \n ${team2.join(', ')}
    `);
  }
});

client.login(process.env.CLIENT_KEY);