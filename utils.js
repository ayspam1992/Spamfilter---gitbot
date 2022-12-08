const Discord = require("discord.js");
const dur = require("humanize-duration");
const { lang } = require("./config.json");
module.exports = {
    arr: {
        /**
         * @param {Array} a
         * @returns {Array}
         */
        kar(a) {
            var j, x, i;
            for (i = a.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = a[i];
                a[i] = a[j];
                a[j] = x;
            }
            return a;
        },
        /**
         * @param {Array} arr
         */
        rand(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        },
        /**
         * @param {Array} arr
         * @returns {Array}
         */
        sil(arr) {
            var what,
                a = arguments,
                L = a.length,
                ax;
            while (L > 1 && arr.length) {
                what = a[--L];
                while ((ax = arr.indexOf(what)) !== -1) {
                    arr.splice(ax, 1);
                }
            }
            return arr;
        },
    },
    misc: {
        /**
         * @param {Number} length
         * @returns {String}
         */
        randtext(length) {
            var result = [];
            var characters =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result.push(
                    characters.charAt(
                        Math.floor(Math.random() * charactersLength)
                    )
                );
            }
            return result.join("");
        },
        /**
         * @param {Number} min
         * @param {Number} max
         * @returns {Number}
         */
        randInt(min, max) {
            let m = max + 1;
            return Math.floor(Math.random() * (m - min)) + min;
        },
        randColor() {
            var randomColor = Math.floor(Math.random() * 16777215).toString(16);
            return `#${randomColor}`;
        },
    },
    /**
     * @param {Number|Date} dat
     * @returns {Object}
     */
    ms(dat) {
        const diffTime = Math.abs(dat);
        const diffYear = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30 * 12));
        const rawMonth = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30));
        const diffMonth = rawMonth - diffYear * 12;
        const rawDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffDays = rawDays - rawMonth * 30;
        const rawHours = Math.floor(diffTime / (1000 * 60 * 60));
        const diffHours = rawHours - rawDays * 24;
        const rawMinutes = Math.floor(diffTime / (1000 * 60));
        const rawSec = Math.floor(diffTime / 1000);
        const diffMins = Math.floor(diffTime / 60000) - rawHours * 60;
        const diffSec = Math.floor(diffTime / 1000) - rawMinutes * 60;
        const diffMsec = Math.floor(diffTime) - rawSec * 1000;
        return {
            years: diffYear,
            months: diffMonth,
            days: diffDays,
            hours: diffHours,
            minutes: diffMins,
            seconds: diffSec,
            milliseconds: diffMsec,
        };
    },
    /**
     * @param {Object} embed
     * @param {String} embed.title
     * @param {String} embed.desc
     * @param {String} embed.color
     * @param {String} embed.thumb
     * @param {String} embed.image
     * @param {Object} embed.footer
     * @param {String} embed.footer.icon
     * @param {String} embed.footer.text
     * @param {Number|Date} embed.time
     * @param {Array[]} embed.field
     * @returns {Discord.MessageEmbed}
     */
    embed(embed) {
        const embed2 = new Discord.MessageEmbed()
            .setColor(embed.color ? embed.color : this.misc.randColor())
            .setTitle(embed.title ? embed.title : "")
            .setDescription(embed.desc ? embed.desc : "** **");
        if (embed.thumb) embed2.setThumbnail(embed.thumb);
        if (embed.image) embed2.setImage(embed.image);
        if (embed.footer)
            embed2.setFooter(embed.footer.text || "", embed.footer.icon || "");
        if (embed.time) embed2.setTimestamp(embed.time);
        if (embed.field) {
            embed.field.forEach((x) => {
                embed2.addField(x[0], x[1], x[2]);
            });
        }

        return embed2;
    },
    /**
     * @param {Number|Date} time
     * @returns {String}
     */
    okunur_zaman(time) {
        let r = "k";
        if (typeof time == "date") {
            r = time.getTime();
        } else {
            r = time + 0;
        }
        return dur(r, {
            language: lang,
            round: true,
            conjunction: " ve ",
            serialComma: false,
        });
    },
};
