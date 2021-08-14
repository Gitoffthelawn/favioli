/**
 * Used for enableAutofillFavicon.
 * Automatically selects an emoji,and uses it to replace the favicon.
 */

const isWindows = /^Win\d+$/.test(navigator.platform);

// deno-fmt-ignore
const emojis = ("\
😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 🙂 🤗 🤩 🤔 🤨 😐 \
😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 \
😲 ☹️ 🙁 😖 😞 😟 😤 😢 😦 😧 😨 😩 🤯 😬 😰 😳 🤪 😵 😡 😠 🤬 😷 🤒 \
🤕 🤢 🤮 🤧 😇 🤠 🤡 🤥 🤫 🤭 🧐 🤓 😈 👿 👹 👺 💀 👻 👽 🤖 💩 😺 😸 \
😹 😻 😼 😽 🙀 😿 😾 👶 👦 👧 👨 👩 👴 👵 🤳 💪 👈 👉 ☝️ 👆 🖕 👇 ✌️ \
🤞 🖖 🤘 🖐 ✋ 👌 👍 👎 👊 🤛 🤜 🤚 👋 🤟 ✍️ 👏 👐 🙌 🤲 🙏 🤝 💅 👂 \
👃 👣 👀 👁 🧠 👅 👄 💋 👓 🕶 👔 👕 👖 🧣 🧤 🧥 🧦 👗 👘 👙 👚 👛 👜 \
👝 🎒 👞 👟 👠 👡 👢 👑 👒 🎩 🎓 🧢 ⛑ 💄 💍 🌂 💼 🐶 🐱 🐭 🐹 🐰 🦊 \
🐻 🐼 🐨 🐯 🦁 🐮 🐷 🐽 🐸 🐵 🙊 🙉 🙊 🐒 🐔 🐧 🐦 🐤 🐣 🐥 🦆 🦅 🦉 \
🦇 🐺 🐗 🐴 🦄 🐝 🐛 🦋 🐌 🐚 🐞 🐜 🕷 🕸 🐢 🐍 🦎 🦂 🦀 🦑 🐙 🦐 🐟 \
🐡 🐬 🦈 🐳 🐋 🐊 🐆 🐅 🐃 🐂 🐄 🦌 🐪 🐫 🐘 🦏 🦍 🐎 🐖 🐐 🐏 🐑 🐕 \
🐩 🐈 🐓 🦃 🕊 🐇 🐁 🐀 🐿 🐾 🐉 🐲 🌵 🎄 🌲 🌳 🌴 🌱 🌿 ☘️ 🍀 🎍 🎋 \
🍃 🍂 🍁 🍄 🌾 💐 🌷 🌹 🥀 🌻 🌼 🌸 🌺 🌎 🌕 🌚 🌝 🌞 🌜 🌙 💫 ⭐️ 🌟 \
✨ ⚡️ 🔥 💥 ☄️ ☀️ 🌤 ⛅️ 🌥 🌦 🌈 ☁️ ⛄️ ❄️ 🌬 💨 🌪 🌫 🌊 💧 💦 ☔ 🍏 \
🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🍈 🍒 🍑 🍍 🥝 🥑 🍅 🍆 🥒 🥕 🌽 🌶 🥔 🍠 🌰 \
🥜 🍯 🥐 🍞 🥖 🧀 🥚 🍳 🥓 🥞 🍤 🍗 🍖 🍕 🌭 🍔 🍟 🥙 🌮 🌯 🥗 🥘 🍝 \
🍜 🍲 🍥 🍣 🍱 🍛 🍚 🍙 🍘 🍢 🍡 🍧 🍨 🍦 🍰 🎂 🍮 🍭 🍬 🍫 🍿 🍩 🍪 \
🥛 🍼 ☕️ 🍵 🍶 🍺 🥂 🍷 🥃 🍸 🍹 🍾 🥄 🍴 🍽 ⚽️ 🏀 🏈 ⚾️ 🎾 🏐 🏉 🎱 \
🏓 🏸 🥅 🏒 🏑 🏏 ⛳️ 🏹 🎣 🥊 🥋 ⛸ 🏆 🎪 🤹‍ 🎭 🎨 🎬 🎤 🎧 🎼 🎹 🥁 \
🎷 🎺 🎸 🎻 🎲 🎯 🎳 🎮 🎰 🚗 🚕 🚙 🚌 🚎 🏎 🚓 🚑 🚒 🚐 🚚 🚛 🚜 🛴 \
🚲 🛵 🏍 🚨 🚔 🚍 🚘 🚖 🚡 🚠 🚟 🚃 🚋 🚞 🚝 🚄 🚅 🚈 🚂 🚆 🚇 🚊 🚉 \
🚁 🛩 ✈️ 🛫 🛬 🚀 🛰 💺 🛶 ⛵️ 🛥 🚤 🛳 ⛴ 🚢 ⚓️ 🚧 ⛽️ 🚏 🚦 🚥 🗺 🗿 \
🗽 ⛲️ 🗼 🏰 🏯 🏟 🎡 🎢 🎠 ⛱ 🏖 🏝 🏔 🗻 🌋 🏜 🏕 ⛺️ 🛤 🛣 🏗 🏭 🏠 \
🏢 🏛 ⛪️ 🕌 🕍 🕋 ⛩ ❤️ 💔 🙎 🙅 🙆 💁 🙋 🙇 🤦 🤷 💆 💇 🚶 🏃 💃 🕺 \
👯 🧖‍ 👩‍👧‍👧")
  .concat(isWindows ? "🐱‍💻" : "") // Only Windows has hacker cat
  .filter(emoji => emoji && emoji.trim());

/**
 * Create an emoji, based on our location
 */
export default function pickAutofillFavicon() {
  const host = location.host;
  const emojiIndex = Math.abs(sdbm(host)) % emojis.length;
  return emojis[emojiIndex];
}

/* tslint:disable no-bitwise */
/**
 *  Non-cryptographic hashing to get the same emoji index for different keys
 *  @source http://www.cse.yorku.ca/~oz/hash.html
 *  @source https://github.com/sindresorhus/sdbm
 *  @param {any} key
 *  @return {number} index
 */
function sdbm(key) {
  return String(key).split("").reduce((hash, char, i) => {
    const charCode = key.charCodeAt(i);
    return charCode + (hash << 6) + (hash << 16) - hash;
  }, 0) >>> 0;
}
/* tslint:enable no-bitwise */
