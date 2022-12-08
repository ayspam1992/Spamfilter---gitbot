const Discord = require("discord.js");
const u = require("../utils.js");
const { server, emojis } = require("../config.json");
const emojiRegex = require("emoji-regex/RGI_Emoji.js");

module.exports = {
  name: "add",
  //? İsmi
  description: "pingini söyler",
  //? Açıklama
  options: [
    {
      type: 1,
      name: "a",
      description: "belirtilen özelliklere göre emoji ekler.",
      options: [
        {
          type: 3,
          name: "filtre",
          description: "Neyi içeren mesajlara tepki eklensin.",
          required: true,
        },
      ],
    },
    {
      type: 1,
      name: "s",
      description: "belirtilen özelliklere göre emoji ekler.",
      options: [
        {
          type: 3,
          name: "filtre",
          description: "Neyi içeren mesajlara tepki eklensin.",
          required: true,
        },
      ],
    },
  ],
  //? Eğer Tetiklenme tipi "command" ise ana komut dışındaki tetiklenmeler.
  workOnly: "dm", //? "guild" , "dm" , "all"
  //? Sadece Sunucularda'mı Çalışsın
  ignoreBots: true, //?Botlar umursanmasın mı
  /**
   * * 0: Herkes
   * * 1: Alt Yetkililer (Mesajları yönet vb.)
   * * 2: Orta Yetkililer (Kanalları veya Rolleri yönet vb.)
   * * 3: Üst Yetkililer (BAN veya KICK)
   * * 4: Yöneticiler (ADMINSTRATORS)
   * * 5: Botun Sahipleri (config.json)
   */
  permLevel: 5,
  cooldown: {
    enable: true, //? true false
    timeout: 5, //? SANİYE | Seconds
    type: "user", //? "any", "guild", "user", "member"
    errormsg: "{time} bekler misin.",
  },
  //* Bekleme Süresi
  //* enable: Açıksa true Kapalı İse False
  //* timeout: kaç saniye beklesinler
  //* type: ne kadar kapsamlı olsun Kullanılabilir: "any" (heryerde) "guild" (sunucu başına) "user" (kullanıcı başına) "member" (sunucudaki üye başına)
  //! guildOnly kapalı ise "guild" ve "member" çalışmaz!!!!
  //* errormsg: Hata Mesajı, {time} yazdığınız yere kalan bekleme süresi gelmektedir.

  /**
   * @param {Discord.Client} client
   * @param {Object} obj
   * @param {Discord.User} obj.author
   * @param {Discord.GuildMember} obj.member
   * @param {Discord.Guild} obj.guild
   * @param {Discord.TextChannel} obj.channel
   * @param {Discord.Collection} boo
   */
  async execute(i, client, obj, boo) {
    let main = i.data.options[0];

    if (main.name == "a") {
      let filtre = main.options[0].value;
      let guild = await client.guilds.cache.get(server);
      let msgsize = 0;
      let channels = await guild.channels.cache.filter(
        (x) => x.type == "text" || x.type == "news"
      );
      boo.set(filtre, { filtre: filtre });
      await channels.forEach(async (c) => {
        let msgs2 = await c.messages.fetch({ limit: 50 });
        let msgs = await msgs2.filter((m) => m.content.includes(filtre));
        await msgs.forEach((m) => {
          emojis.forEach((e) => {
            m.react(e);
          });
        });
      });
      return `Tepkiler bırakılıyor.`;
    } else {
      let filtre = main.options[0].value;
      let c = boo.get(filtre);
      if (c) {
        boo.delete(filtre);
        return `İşlem başarıyla durduruldu!`;
      } else {
        return "O filtre ile çalışan mevcut bir işlem bulunamadı.";
      }
    }
  },
};
