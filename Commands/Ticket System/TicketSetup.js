const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const DB = require('../../Structures/Schemas/TicketSetup')

module.exports = {
    name: "ticketsetup",
    description: "Setup your ticketing message.",
    permission: "ADMINISTRATOR",
    options: [
        { 
            name: "channel",
            description: "Select the ticket creation channel",
            required: true,
            type: "CHANNEL",
            channelType: ["GUILD_TEXT"]
        },
        { 
            name: "category",
            description: "Select the ticket channels's creation category",
            required: true,
            type: "CHANNEL",
            channelType: ["GUILD_CATEGORY"]
        },
        { 
            name: "transcripts",
            description: "Select the transcripts channels",
            required: true,
            type: "CHANNEL",
            channelType: ["GUILD_TEXT"]
        },
        { 
            name: "handlers",
            description: "Select the ticket handler's role.",
            required: true,
            type: "ROLE"
        },
        { 
            name: "everyone",
            description: "Provide the @everyone role. ITS IMPORTANT!",
            required: true,
            type: "ROLE"
        },
        { 
            name: "description",
            description: "Set the description of the ticket creation channel.",
            required: true,
            type: "STRING"
        },
        { 
            name: "firstbutton",
            description: "Give your first button a name and add an emoji by adding a coma followed by the emoji.",
            required: true,
            type: "STRING"
        },
        { 
            name: "secondbutton",
            description: "Give your second button a name and add an emoji by adding a coma followed by the emoji.",
            required: true,
            type: "STRING"
        },
        { 
            name: "thirdbutton",
            description: "Give your third button a name and add an emoji by adding a coma followed by the emoji.",
            required: true,
            type: "STRING"
        },
        { 
            name: "fourthbutton",
            description: "Give your third button a name and add an emoji by adding a coma followed by the emoji.",
            required: true,
            type: "STRING"
        },
        { 
            name: "fifthbutton",
            description: "Give your third button a name and add an emoji by adding a coma followed by the emoji.",
            required: true,
            type: "STRING"
        },
        { 
            name: "sixthbutton",
            description: "Give your third button a name and add an emoji by adding a coma followed by the emoji.",
            required: true,
            type: "STRING"
        },
        { 
            name: "seventhbutton",
            description: "Give your third button a name and add an emoji by adding a coma followed by the emoji.",
            required: true,
            type: "STRING"
        },
        { 
            name: "eighthbutton",
            description: "Give your third button a name and add an emoji by adding a coma followed by the emoji.",
            required: true,
            type: "STRING"
        },
        { 
            name: "ninthbutton",
            description: "Give your third button a name and add an emoji by adding a coma followed by the emoji.",
            required: true,
            type: "STRING"
        },
        { 
            name: "tenthbutton",
            description: "Give your third button a name and add an emoji by adding a coma followed by the emoji.",
            required: true,
            type: "STRING"
        },
        { 
            name: "11button",
            description: "Give your third button a name and add an emoji by adding a coma followed by the emoji.",
            required: true,
            type: "STRING"
        },
        { 
            name: "12button",
            description: "Give your third button a name and add an emoji by adding a coma followed by the emoji.",
            required: true,
            type: "STRING"
        },
        { 
            name: "13button",
            description: "Give your third button a name and add an emoji by adding a coma followed by the emoji.",
            required: true,
            type: "STRING"
        },
        { 
            name: "14button",
            description: "Give your third button a name and add an emoji by adding a coma followed by the emoji.",
            required: true,
            type: "STRING"
        },
        { 
            name: "15button",
            description: "Give your third button a name and add an emoji by adding a coma followed by the emoji.",
            required: true,
            type: "STRING"
        },
    ],

    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { guild, options } = interaction;

        try {
            const Channel = options.getChannel("channel");
            const Category = options.getChannel("category");
            const Transcripts = options.getChannel("transcripts");
            const Handlers = options.getRole("handlers");
            const Everyone = options.getRole("everyone");

            const Description = options.getString("description");

            const Button1 = options.getString("firstbutton").split(",");
            const Button2 = options.getString("secondbutton").split(",");
            const Button3 = options.getString("thirdbutton").split(",");
            const Button4 = options.getString("fourthbutton").split(",");
            const Button5 = options.getString("fifthbutton").split(",");
            const Button6 = options.getString("sixthbutton").split(",");
            const Button7 = options.getString("seventhbutton").split(",");
            const Button8 = options.getString("eighthbutton").split(",");
            const Button9 = options.getString("ninthbutton").split(",");
            const Button10 = options.getString("tenthbutton").split(",");
            const Button11 = options.getString("11button").split(",");
            const Button12 = options.getString("12button").split(",");
            const Button13 = options.getString("13button").split(",");
            const Button14 = options.getString("14button").split(",");
            const Button15 = options.getString("15button").split(",");

            const Emoji1 = Button1[1];
            const Emoji2 = Button2[1];
            const Emoji3 = Button3[1];
            const Emoji4 = Button4[1];
            const Emoji5 = Button5[1];
            const Emoji6 = Button6[1];
            const Emoji7 = Button7[1];
            const Emoji8 = Button8[1];
            const Emoji9 = Button9[1];
            const Emoji10 = Button10[1];
            const Emoji11 = Button11[1];
            const Emoji12 = Button12[1];
            const Emoji13 = Button13[1];
            const Emoji14 = Button14[1];
            const Emoji15 = Button15[1];

            await DB.findOneAndUpdate(
                { GuildID: guild.id },
                {
                    Channel: Channel.id,
                    Category: Category.id,
                    Transcripts: Transcripts.id,
                    Handlers: Handlers.id,
                    Everyone: Everyone.id,
                    Description: Description,
                    Buttons: [Button1[0], Button2[0], Button3[0], Button4[0], Button5[0],
                              Button6[0], Button7[0], Button8[0], Button9[0], Button10[0],
                              Button11[0], Button12[0], Button13[0], Button14[0], Button15[0]]
                },
                {
                    new: true,
                    upsert: true
                }
            );

            const Buttons0 = new MessageActionRow();
            Buttons0.addComponents(
                new MessageButton().setCustomId(Button1[0]).setLabel(Button1[0]).setStyle("PRIMARY").setEmoji(Emoji1),
                new MessageButton().setCustomId(Button2[0]).setLabel(Button2[0]).setStyle("SECONDARY").setEmoji(Emoji2),
                new MessageButton().setCustomId(Button3[0]).setLabel(Button3[0]).setStyle("SUCCESS").setEmoji(Emoji3),
                new MessageButton().setCustomId(Button4[0]).setLabel(Button4[0]).setStyle("SECONDARY").setEmoji(Emoji4),
                new MessageButton().setCustomId(Button5[0]).setLabel(Button5[0]).setStyle("PRIMARY").setEmoji(Emoji5),
            );
            const Buttons1 = new MessageActionRow();
            Buttons1.addComponents(
                new MessageButton().setCustomId(Button6[0]).setLabel(Button6[0]).setStyle("PRIMARY").setEmoji(Emoji6),
                new MessageButton().setCustomId(Button7[0]).setLabel(Button7[0]).setStyle("SECONDARY").setEmoji(Emoji7),
                new MessageButton().setCustomId(Button8[0]).setLabel(Button8[0]).setStyle("SUCCESS").setEmoji(Emoji8),
                new MessageButton().setCustomId(Button9[0]).setLabel(Button9[0]).setStyle("SECONDARY").setEmoji(Emoji9),
                new MessageButton().setCustomId(Button10[0]).setLabel(Button10[0]).setStyle("PRIMARY").setEmoji(Emoji10),
            );
            const Buttons2 = new MessageActionRow();
            Buttons2.addComponents(
                new MessageButton().setCustomId(Button11[0]).setLabel(Button11[0]).setStyle("PRIMARY").setEmoji(Emoji11),
                new MessageButton().setCustomId(Button12[0]).setLabel(Button12[0]).setStyle("SECONDARY").setEmoji(Emoji12),
                new MessageButton().setCustomId(Button13[0]).setLabel(Button13[0]).setStyle("SUCCESS").setEmoji(Emoji13),
                new MessageButton().setCustomId(Button14[0]).setLabel(Button14[0]).setStyle("SECONDARY").setEmoji(Emoji14),
                new MessageButton().setCustomId(Button15[0]).setLabel(Button15[0]).setStyle("PRIMARY").setEmoji(Emoji15),
            );
            
            const Embed = new MessageEmbed()
            .setAuthor({ 
                    name: guild.name + " | Ticketing System",
                    iconURL: guild.iconURL({ dynamic: true })
            })
            .setDescription(Description)
            .setColor("#36393f")
            .setFooter({ text: "\u3000".repeat(100/*any big number works too*/)+"|" });

            await guild.channels.cache
            .get(Channel.id)
            .send({ embeds: [Embed], components: [Buttons0, Buttons1, Buttons2]
            })

            return interaction.reply({content: "Done", ephemeral: true})

        } catch (err) {
            const errEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription(
                `🛑 | An error occured while setting up your ticket system.\n**what to make sure of?
                1. Make sure non of your buttonsnames are duplicated
                2. Make sure your use this format for your buttons => Name,Emoji
                3. Make sure your buttons names do not exceed 200 characters
                4. Make sure your button emojis, are actually emojis, not ids`
            );
            console.log(err);
            interaction.reply({ embeds: [errEmbed] });
        }

        
    }
}