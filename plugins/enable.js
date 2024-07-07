let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  let isEnable = /true|enable|(turn)?on|1/i.test(command)
  let chat = global.db.data.chats[m.chat]
  let user = global.db.data.users[m.sender]
  let set = global.db.data.settings[conn.user.jid]
  let type = (args[0] || '').toLowerCase()
  let isAll = false
  let isUser = false
  switch (type) {
    case 'welcome':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.welcome = isEnable
      break
    case 'detect':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.detect = isEnable
      break
    case 'delete':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.delete = isEnable
      break
    case 'autojpm':
        if (!isROwner) {
          global.dfail('rowner', m, conn)
          throw false
        }
      chat.autoJpm = isEnable
      break
    case 'ngetik':
       if (!isROwner) {
          global.dfail('rowner', m, conn)
          throw false
        }
        chat.ngetik = isEnable
        break
    case 'antidelete':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.delete = !isEnable
      break
    case 'captcha':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.captcha = isEnable
      break
    case 'antibadword':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.antiBadword = isEnable
      break
       case 'antiporn':
            if (m.isGroup) {
                if (!(isAdmin || isOwner)) {
                    global.dfail('admin', m, conn)
                    throw false
                }
            }
            chat.antiPorn = isEnable
      break
    case 'autosticker':
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail('admin', m, conn)
					throw false
				}
			}
			chat.stiker = isEnable
			break
    case 'autodelvn':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.autodelvn = isEnable
      break
      case 'autodownload':
           if (!(isAdmin || isOwner)) {
                global.dfail('admin', m, conn)
                throw false
           }
           chat.autoDownload = isEnable
           break
      case 'simi':
            if (!(isAdmin || isOwner)) {
                global.dfail('admin', m, conn)
                throw false
            }
            chat.simi = isEnable
            break
    case 'ai':
          if (!(isAdmin || isOwner)) {
               global.dfail('admin', m, conn)
               throw false
            }
            chat.ai = isEnable
    break
    case 'document':
      chat.useDocument = isEnable
      break
    case 'public':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['self'] = !isEnable
      break
    case 'antibot':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiBot = isEnable
    break
    case 'antispam':
      if (m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.antiSpam = isEnable
      break
    case 'antilink':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiLink = isEnable
      break 
      case 'antilinkbitly':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiLinkBitly = isEnable
      break
      case 'antilinktik':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiLinkTik = isEnable
      break
      case 'antilinkyt':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiLinkYt = isEnable
      break
      case 'antilinktel':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiLinkTel = isEnable
      break
      case 'antilinkfb':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiLinkFb = isEnable
      break
      case 'antilinkig':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiLinkIg = isEnable
      break
      case 'antilinkwa':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiLinkWa = isEnable
      break
      case 'antihatetepe':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiLinkHttp = isEnable
      break
      case 'nsfw':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.nsfw = isEnable
      break
    case 'antisticker':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiSticker = isEnable
      break
    case 'autosticker':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.stiker = isEnable
      break
      case 'antifoto':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiFoto = isEnable
      break
      case 'antividio':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiVideo = isEnable
      break
      case 'autovn':
        if (!isROwner) {
          global.dfail('rowner', m, conn)
          throw false
        }
      chat.autoVn = isEnable
      break
      case 'autopresence':
        if (!isROwner) {
          global.dfail('rowner', m, conn)
          throw false
        }
      chat.autoPesence = isEnable
      break
      case 'freply':
        if (!isROwner) {
          global.dfail('rowner', m, conn)
          throw false
        }
      chat.freply = isEnable
      break
    case 'toxic':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiToxic = !isEnable
      break
    case 'antitoxic':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiToxic = isEnable
    case 'antivirtex':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiVirtex = isEnable
      break
    case 'autolevelup':
      isUser = true
      user.autolevelup = isEnable
      break
    case 'mycontact':
    case 'mycontacts':
    case 'whitelistcontact':
    case 'whitelistcontacts':
    case 'whitelistmycontact':
    case 'whitelistmycontacts':
      if (!isOwner) {
        global.dfail('owner', m, conn)
        throw false
      }
      conn.callWhitelistMode = isEnable
      break
    case 'restrict':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['restrict'] = isEnable
      break
    case 'nyimak':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['nyimak'] = isEnable
      break
    case 'autoread':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['autoread'] = isEnable
      break
    case 'pconly':
    case 'privateonly':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['pconly'] = isEnable
      break
    case 'gconly':
    case 'grouponly':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['gconly'] = isEnable
      break
    case 'swonly':
    case 'statusonly':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['swonly'] = isEnable
      break
    case 'viewonce':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.viewonce = isEnable
      break
      default:
  let list = [
    {
        title: 'Select Options Of Welcome',
        rows: [
            { title: 'Enable Welcome', id: '.enable welcome' },
            { title: 'Disable Welcome', id: '.disable welcome' }
        ]
    },
    {
        title: 'Select Options Of Delete',
        rows: [
            { title: 'Enable Delete', id: '.enable delete' },
            { title: 'Disable Delete', id: '.disable delete' }
        ]
    },
    {
        title: 'Select Options Of Antiporn',
        rows: [
            { title: 'Enable Antiporn', id: '.enable antiporn' },
            { title: 'Disable Antiporn', id: '.disable antiporn' }
        ]
    },
    {
        title: 'Select Options Of Public Bot',
        rows: [
            { title: 'Enable Public Bot', id: '.enable public' },
            { title: 'Disable Public Bot (Self)', id: '.disable public' }
        ]
    },
    {
        title: 'Select Options Of Antilink',
        rows: [
            { title: 'Enable Anti Link', id: '.enable antilink' },
            { title: 'Disable Anti Link', id: '.disable antilink' }
        ]
    },
    {
        title: 'Select Options Of Anti Photo',
        rows: [
            { title: 'Enable Anti Photo', id: '.enable antifoto' },
            { title: 'Disable Anti Photo', id: '.disable antifoto' }
        ]
    },
    {
        title: 'Select Options Of Antidelete',
        rows: [
            { title: 'Enable Antidelete', id: '.enable antidelete' },
            { title: 'Disable Antidelete', id: '.disable antidelete' }
        ]
    },
    {
        title: 'Select Options Of Antisticker',
        rows: [
            { title: 'Enable Antisticker', id: '.enable antisticker' },
            { title: 'Disable Antisticker', id: '.disable antisticker' }
        ]
    },
    {
        title: 'Select Options Of Autosticker',
        rows: [
            { title: 'Enable Autosticker', id: '.enable autosticker' },
            { title: 'Disable Autosticker', id: '.disable autosticker' }
        ]
    },
    {
        title: 'Select Options Of Autolevelup',
        rows: [
            { title: 'Enable Autolevelup', id: '.enable autolevelup' },
            { title: 'Disable Autolevelup', id: '.disable autolevelup' }
        ]
    },
    {
        title: 'Select Options Of Ngetik',
        rows: [
            { title: 'Enable Ngetik', id: '.enable ngetik' },
            { title: 'Disable Ngetik', id: '.disable ngetik' }
        ]
    },
    {
        title: 'Select Options Of Simi',
        rows: [
            { title: 'Enable Simi', id: '.enable simi' },
            { title: 'Disable Simi', id: '.disable simi' }
        ]
    },
    {
        title: 'Select Options Of Detect',
        rows: [
            { title: 'Enable Detect', id: '.enable detect' },
            { title: 'Disable Detect', id: '.disable detect' }
        ]
    },
    {
        title: 'Select Options Of AI',
        rows: [
            { title: 'Enable AI', id: '.enable ai' },
            { title: 'Disable AI', id: '.disable ai' }
        ]
    },
    {
        title: 'Select Options Of Antibadword',
        rows: [
            { title: 'Enable Antibadword', id: '.enable antibadword' },
            { title: 'Disable Antibadword', id: '.disable antibadword' }
        ]
    },
    {
        title: 'Select Options Of Viewonce',
        rows: [
            { title: 'Enable Viewonce', id: '.enable viewonce' },
            { title: 'Disable Viewonce', id: '.disable viewonce' }
        ]
    },
    {
        title: 'Select Options Of Document',
        rows: [
            { title: 'Enable Document', id: '.enable document' },
            { title: 'Disable Document', id: '.disable document' }
        ]
    },
    {
        title: 'Select Options Of Whitelistmycontacts',
        rows: [
            { title: 'Enable Whitelistmycontacts', id: '.enable whitelistmycontacts' },
            { title: 'Disable Whitelistmycontacts', id: '.disable whitelistmycontacts' }
        ]
    },
    {
        title: 'Select Options Of Restrict',
        rows: [
            { title: 'Enable Restrict', id: '.enable restrict' },
            { title: 'Disable Restrict', id: '.disable restrict' }
        ]
    },
    {
        title: 'Select Options Of Nyimak',
        rows: [
            { title: 'Enable Nyimak', id: '.enable nyimak' },
            { title: 'Disable Nyimak', id: '.disable nyimak' }
        ]
    },
    {
        title: 'Select Options Of Autoread',
        rows: [
            { title: 'Enable Autoread', id: '.enable autoread' },
            { title: 'Disable Autoread', id: '.disable autoread' }
        ]
    },
    {
        title: 'Select Options Of Antibot',
        rows: [
            { title: 'Enable Antibot', id: '.enable antibot' },
            { title: 'Disable Antibot', id: '.disable antibot' }
        ]
    },
    {
        title: 'Select Options Of Captcha',
        rows: [
            { title: 'Enable Captcha', id: '.enable captcha' },
            { title: 'Disable Captcha', id: '.disable captcha' }
        ]
    },
    {
        title: 'Select Options Of Pconly',
        rows: [
            { title: 'Enable Pconly', id: '.enable pconly' },
            { title: 'Disable Pconly', id: '.disable pconly' }
        ]
    },
    {
        title: 'Select Options Of Gconly',
        rows: [
            { title: 'Enable Gconly', id: '.enable gconly' },
            { title: 'Disable Gconly', id: '.disable gconly' }
        ]
    },
    {
        title: 'Select Options Of Swonly',
        rows: [
            { title: 'Enable Swonly', id: '.enable swonly' },
            { title: 'Disable Swonly', id: '.disable swonly' }
        ]
    }
];
conn.sendListMsg(m.chat, 'Pilih Opsi Di Bawah Ini!', 'Powered By *Dev. Expertise*', 'List Options', list, m);
   throw false
   }
   conn.reply(m.chat, `Fitur ${type} Sukses Di ${isEnable ? 'nyala' : 'mati'}kan`, m)
 }
handler.help = ['en', 'dis'].map(v => v + 'able *<option>*')
handler.tags = ['group', 'owner']
handler.command = /^(enable|disable)$/i

module.exports = handler