import React, { useState, useEffect, useRef } from "react";

const AC = "#E8702C";
const AC2 = "rgba(232,112,44,0.12)";
const FF = "-apple-system,BlinkMacSystemFont,'Helvetica Neue',sans-serif";

const PERIODS = [
  {id:"p1",label:"Ежелгі заман", icon:"🏛", from:1,  to:12 },
  {id:"p2",label:"Ортағасыр",    icon:"⚔️",from:13, to:53 },
  {id:"p3",label:"Жаңа заман",   icon:"⚙️",from:54, to:88 },
  {id:"p4",label:"Қазіргі заман",icon:"🌐",from:89, to:189},
];

const HIGH=new Set([1,2,3,4,5,6,7,8,9,17,18,22,34,37,38,39,40,44,45,47,48,49,50,51,52,53,56,57,59,61,62,64,66,67,70,71,72,73,77,78,79,80,82,85,86,87,88,91,92,93,94,95,96,98,102,103,105,106,107,109,110,111,112,115,116,117,118,119,120,121,122,123,124,125,126,128,129,131,132,133,135,137,138,139,140,141,142,143,144,145,147,148,152,154,160,163,164,173,174,175,176,181,182]);
const MID=new Set([10,11,12,13,14,15,16,19,20,21,23,24,25,26,27,28,29,30,31,32,35,36,42,46,54,55,68,69,74,76,81,83,84,97,100,114,127,130,134,136,149,150,158,159,165,177,178,179]);
const gp=id=>HIGH.has(id)?"high":MID.has(id)?"mid":"low";

const TOPICS=[
  [1,"Ежелгі Египет","10 сын. 1-бөл. §3"],[2,"Ежелгі Қосөзен","10 сын. 1-бөл. §4"],[3,"Ежелгі Қытай","10 сын. 1-бөл. §5"],[4,"Ежелгі Үндістан","10 сын. 1-бөл. §6"],[5,"Ежелгі Парсы мемлекеті","10 сын. 2-бөл. §42-43(A)"],[6,"Ежелгі Грекия өркениеті","10 сын. 1-бөл. §7-8"],[7,"Александр Македонскийдің империясы","10 сын. 2-бөл. §42-43(Ә)"],[8,"Ежелгі Рим өркениеті","10 сын. 1-бөл. §9"],[9,"Рим империясы","10 сын. 2-бөл. §42-42(Б)"],[10,"Ежелгі діни нанымдар","10 сын. 1-бөл. §13"],[11,"Көне философиялық ілімдер","10 сын. 1-бөл. §14"],[12,"Әлемдік діндер мен өркениеттердің дамуы","10 сын. 1-бөл. §15-16"],
  [13,"«Орта ғасырлар түсінігі»","Атамұра, 7 сын. §1"],[14,"Феодалдық қоғамның негізгі белгілері","Атамұра, 7 сын. §5"],[15,"Феодалдық қоғамның әлеуметтік құрылымы","Атамұра, 7 сын. §6"],[16,"Ортағасырлық қалалар мен өнер дамуы","Атамұра, 7 сын. §7"],[17,"Ғұндардың жаулап алу жорықтары — Батыс Рим құлауының факторы","10 сын. 2-бөл. §44"],[18,"Халықтардың ұлы қоныс аударуы және Батыс Рим империясының құлауы","Атамұра, 7 сын. §2"],[19,"Византия — Римнің мұрагері","Атамұра, 7 сын. §3"],[20,"Киев Русінің құрылуы","Атамұра, 7 сын. §4"],[21,"Ислам дінінің пайда болуы. Араб халифаты","Атамұра, 7 сын. §8"],[22,"Мұсылман әлемі мәдениетінің дамуы","Атамұра, 7 сын. §9"],[23,"Араб жаулаушылары. Араб Халифатының құрылуы мен ыдырауы","10 сын. 2-бөл. §45"],[24,"Крест жорықтарының себептері, барысы мен салдары","Атамұра, 7 сын. §10"],[25,"XI–XIII ғасырлардағы крест жорықтары","10 сын. 1-бөл. §21-23(A)"],[26,"Шыңғыс хан","Атамұра, 7 сын. §12"],[27,"Моңғол империясы","Атамұра, 7 сын. §13"],[28,"Моңғолдардың әскери өнері","Атамұра, 7 сын. §14"],[29,"Еуразияның этносаяси картасының қалыптасуына моңғол шапқыншылығының әсері","Атамұра, 7 сын. §15"],[30,"Еуразия картасының өзгеруіне Шыңғыс хан жорықтарының ықпалы","10 сын. 2-бөл. §46-48"],[31,"Әмір Темір мемлекеті","10 сын. 2-бөл. §46-48(Ә)"],[32,"Мәскеу мемлекеті","10 сын. 2-бөл. §46-48(Б)"],[33,"Құбылай мемлекеті, Ильханат","10 сын. 2-бөл. §46-48(B)"],[34,"Франция мен Англиядағы шаруалар көтерілісі","Атамұра, 7 сын. §16"],[35,"Феодалдық соғыстар","Атамұра, 7 сын. §17"],[36,"Еуропадағы орталықтанған мемлекеттердің құрылуы","Атамұра, 7 сын. §18-19"],[37,"Франциядағы абсолютизмнің қалыптасуы","Атамұра, 7 сын. §20"],[38,"Англия мен Ресейдегі абсолютизм","Атамұра, 7 сын. §21"],[39,"Қытай мен Жапония абсолютизм кезеңінде","Атамұра, 7 сын. §22"],[40,"Осман империясының дамуы","Атамұра, 7 сын. §23"],[41,"Өркениеттер арасындағы сауда-экономикалық қарым-қатынас (Жібек жолы)","10 сын. 1-бөл. §19"],[42,"Африка дәстүрлі өркениеті","10 сын. 1-бөл. §10"],[43,"Америка, Аустралия және Мұхит аралдарындағы дәстүрлі өркениет","10 сын. 1-бөл. §11-12"],[44,"Халықаралық саяхаттар. Ұлы географиялық ашылудың қажеттілігі","Атамұра, 7 сын. §24-25"],[45,"Ұлы географиялық ашылулар мен олардың нәтижелері","Атамұра, 7 сын. §26"],[46,"XVI–XVII ғасырлардағы отарлық экспансия","10 сын. 1-бөл. §21-23(Ә)"],[47,"Реформацияның себептері","Атамұра, 7 сын. §30"],[48,"Католик шіркеуіне қарсы күрес. Мартин Лютер мен Томас Мюнцер","Атамұра, 7 сын. §31"],[49,"Реформацияның Еуропа елдеріне таралуы","Атамұра, 7 сын. §32"],[50,"Батыс Еуропада қайта өрлеу мәдениетінің қалыптасуы","Атамұра, 7 сын. §27"],[51,"Гуманизм идеялары","Атамұра, 7 сын. §28"],[52,"Шығыстың ортағасырлық мәдениеті","Атамұра, 7 сын. §29"],[53,"Ғылыми білімдердің дамуы","Атамұра, 7 сын. §33-34"],
  [54,"Жаңа заман дәуірі туралы түсінік және оның ерекшеліктері","8 сын. §1"],[55,"Өнеркәсіп төңкерісі және индустриалды қоғамның әлеуметтік құрылымы","8 сын. §3"],[56,"Ағартушылық кезеңі. Революциялық идеялардың таралуындағы рөлі","8 сын. §6"],[57,"XVII ғасырдағы ағылшын буржуазиялық революциясы","8 сын. §2"],[58,"Буржуазиялық революция — индустриалды қоғам (Англия)","10 сын. §52-53(A)"],[59,"Солтүстік Америкадағы Британ отарлары. Тәуелсіздік соғысы және АҚШ-тың құрылуы","8 сын. §7"],[60,"Буржуазиялық революция — индустриалды қоғам (Солт. Америка)","10 сын. §52-53(Ә)"],[61,"Абсолютизмнің дағдарысы және француз революциясының басталуы","8 сын. §8"],[62,"XVIII ғасырдағы француз буржуазиялық революциясының негізгі кезеңдері","8 сын. §9"],[63,"Буржуазиялық революция — индустриалды қоғам (Франция)","10 сын. §52-53(Б)"],[64,"Наполеон Бонапарт дәуіріндегі Францияның жаулаушылық соғыстары","8 сын. §10"],[65,"Еуропаның өзгеруіне Наполеон жорығының әсері","10 сын. 2-бөл. §49"],[66,"Ресей империясының қалыптасу мен жүргізген саясаты","8 сын. §11"],[67,"Ұлы Моғол империясының дағдарысы. XVII–XVIII ғасырлардағы Үндістан","8 сын. §4"],[68,"Шығыс елдеріндегі еуропалықтардың отаршылдық саясаты","8 сын. §5"],[69,"Иранның әлеуметтік-экономикалық жағдайы. Ирандағы ағылшын-орыс бәсекелестігі","8 сын. §12"],[70,"Осман империясындағы дағдарыс және Танзимат реформалары","8 сын. §13"],[71,"Қырым соғысы: себептері мен салдары","8 сын. §14"],[72,"Цин әулетінің оқшаулану саясаты. Апиын соғыстары","8 сын. §15"],[73,"Қытайдағы ихэтуаньдар көтерілісі","8 сын. §16"],[74,"XIX ғасырдағы Еуропа. 1848 жылғы революциялар және жаңа саяси идеялар","8 сын. §17"],[75,"Буржуазиялық революция — индустриалды қоғам (1848 Еуропа)","10 сын. §52-53(В)"],[76,"Франция-Пруссия соғысы. Германияның бірігуі. Италияның бірігуі","8 сын. §18"],[77,"XIX ғасырдағы Ресейдің дамуы. Ресей самодержавиесінің дағдарысы","8 сын. §19"],[78,"Жаңа қоғамдық-саяси ағымдар мен ұйымдардың пайда болуы","8 сын. §20"],[79,"XIX ғасырдың бірінші жартысындағы АҚШ. «Монро доктринасы»","8 сын. §24"],[80,"1861–1865 жж. азамат соғысы және АҚШ-тағы Қайта құрылымдау","8 сын. §25"],[81,"Жапонияның дамуы. Еуропалықтардың Жапонияны «ашуы»","8 сын. §26"],[82,"Үндістандағы сипайлар көтерілісі","8 сын. §21"],[83,"Үндістандағы басқарудағы өзгерістер. Үнді Ұлттық Конгресінің құрылуы","8 сын. §22"],[84,"Дүниежүзін аумақтық тұрғыдан бөлуді аяқтау","8 сын. §23"],[85,"XIX ғасырдағы өнер мен оның бағыттары","8 сын. §27"],[86,"Әдеби шығармалардағы әлеуметтік теңсіздік туралы идеялар","8 сын. §28"],[87,"Батыстық ғалымдар мен ойшылдардың ашқан ғылыми жаңалықтары","8 сын. §29"],[88,"Шығыс елдеріндегі ғылым мен мәдениеттің дамуы","8 сын. §30"],
  [89,"«Қазіргі заман» ұғымы және оның ерекшеліктері","9 сын. 1-бөл. §1"],[90,"XX ғасырдың басындағы әлемді аумақтық бөлісу","9 сын. 1-бөл. §2"],[91,"Индустриалды қоғамнан ақпараттық қоғамға өту. ҒТП","9 сын. 1-бөл. §3"],[92,"Жетекші капиталистік елдер арасындағы қайшылықтар. 1-ші ДС себептері","9 сын. 1-бөл. §5"],[93,"1914–1918 жж. негізгі әскери қимылдар және соғыс салдары","9 сын. 1-бөл. §6"],[94,"Дүниежүзілік соғыстар және халықаралық қатынастар жүйесі (1-ші ДС)","10 сын. 2-бөл. §50-51(A)"],[95,"Бірінші дүниежүзілік соғыстан кейінгі әлем","9 сын. 1-бөл. §7"],[96,"Дүниежүзілік соғыстар және халықаралық қатынастар жүйесі (Версаль-Вашингтон)","10 сын. 2-бөл. §50-51(A)"],[97,"Осман империясының бұрынғы отарларындағы сұлтан билігінің жойылуы","9 сын. 1-бөл. §10"],[98,"Осман империясында сұлтандық биліктің құлатылуы. Мұстафа Кемалдың тарихи орны","9 сын. 1-бөл. §11"],[99,"Мұстафа Кемал Ататүрік — Түрік мемлекетінің негізін қалаушы","11 сын. 2-бөл. §34-35"],[100,"Бірінші дүниежүзілік соғыстан кейінгі Үндістан. М.Ганди мен М.Джиннаның көзқарастары","9 сын. 1-бөл. §16"],[101,"М.Ганди және оның бейбіт жолмен қарсыласу идеясы","11 сын. 2-бөл. §31"],[102,"Бірінші дүниежүзілік соғыстан кейінгі Қытай. Синьхай революциясы. Сунь Ятсен","9 сын. 1-бөл. §12"],[103,"Гоминьданның қызметі. Азамат соғысы. Чан Кайши үкіметінің саясаты","9 сын. 1-бөл. §13"],[104,"Социалистік революциялар (Қытайдағы 1946–1949 жж. азамат соғысы)","10 сын. 2-бөл. §54-56(Ә)"],[105,"Бірінші дүниежүзілік соғыстан кейінгі Жапония. «Танака меморандумы»","9 сын. 1-бөл. §14"],[106,"Жапонияның Қытай мен Оңтүстік-Шығыс Азиядағы басқыншылық әрекеттері","9 сын. 1-бөл. §15"],[107,"1917 жылғы Ресей империясындағы революциялық оқиғалар. Азамат соғысы","9 сын. 1-бөл. §8"],[108,"Социалистік революциялар (1917 жылғы Ресейдегі Қазан революциясы)","10 сын. 2-бөл. §54-56(A)"],[109,"Әскери коммунизм саясатынан ЖЭС-ке көшу. КСРО-ның құрылуы","9 сын. 1-бөл. §9"],[110,"И.В.Сталин және КСРО-дағы тоталитаризм. Индустрияландыру. Ұжымдастыру","9 сын. 1-бөл. §21"],[111,"«Просперити» кезеңіндегі АҚШ. Дүниежүзілік экономикалық дағдарыс","9 сын. 1-бөл. §17"],[112,"Ф.Д.Рузвельттің «Жаңа бағыты». Соғыс аралығы кезеңіндегі АҚШ-тың сыртқы саясаты","9 сын. 1-бөл. §18"],[113,"Франклин Делано Рузвельт және оның «Жаңа бағыты»","11 сын. 2-бөл. §36"],[114,"Германия, Франция және Жапонияның экономикалық дағдарыстан шығу жолдары","9 сын. 1-бөл. §19"],[115,"Бірінші дүниежүзілік соғыстан кейінгі Францияның дамуы","9 сын. 1-бөл. §20"],[116,"Бірінші дүниежүзілік соғыстан кейінгі Италия","9 сын. 1-бөл. §22"],[117,"Германия. Фашистік партия мен тоталитарлық режімнің орнауы","9 сын. 1-бөл. §23"],[118,"Испания соғысаралық кезеңде","9 сын. 1-бөл. §24"],[119,"Екінші дүниежүзілік соғыстың себептері","9 сын. 1-бөл. §25"],[120,"Дүниежүзілік соғыстар және халықаралық қатынастар жүйесі (2-ші ДС)","10 сын. 2-бөл. §50-51(Ә)"],[121,"Екінші дүниежүзілік соғыстың басталуы. Германияның Батыс Еуропаны оккупациялауы","9 сын. 1-бөл. §26"],[122,"АҚШ-тың соғысқа кіруі. Екінші майданды ашу мәселесі","9 сын. 1-бөл. §27"],[123,"Кеңес халқының Ұлы Отан соғысы. Екінші ДС нәтижелері мен салдары","9 сын. 1-бөл. §28"],[124,"ХХ ғасырдың бірінші жартысындағы мәдениет пен қоғамдық ойдың дамуы","9 сын. 1-бөл. §4"],[125,"Мәдениеттің даму ерекшеліктері. Қоғамдық мәдениет. Дін рөлінің өзгеруі","9 сын. 1-бөл. §29"],[126,"XX ғасырдың бірінші жартысындағы жаратылыстану, ғылым мен техника жетістіктері","9 сын. 1-бөл. §30"],[127,"Тарихи процестер контекстіндегі өнердің бағыттары мен стильдері","10 сын. 2-бөл. §62"],[128,"Отарсыздану үдерісінің күшеюі. Әлемдік отарлау жүйесінің күйреуі","9 сын. 2-бөл. §1"],[129,"Африка жылы. Франциядағы отаршылдық мәселелерінің шиеленісуі","9 сын. 2-бөл. §3"],[130,"Дамушы елдердің мәдени-техникалық даму ерекшеліктері. Байқоңыр. Білім берудің рөлі","9 сын. 2-бөл. §28"],[131,"«Қырғиқабақ соғыстың» басталуы","9 сын. 2-бөл. §4"],[132,"Биполярлы әлем. НАТО мен ВШҰ-ның текетіресі","9 сын. 2-бөл. §5"],[133,"Әлемдік социалистік лагерьдің қалыптасуы. 1948–1962 жж. «қырғиқабақ соғыс»","9 сын. 2-бөл. §6"],[134,"Социалистік революциялар (Куба революциясы)","10 сын. 2-бөл. §54-56(Б)"],[135,"Екінші ДС-тан кейінгі араб елдерінің дамуы. Таяу Шығыс шиеленісі","9 сын. 2-бөл. §15"],[136,"Өркениеттер арасындағы әскери-саяси қатынастар. Араб-израиль қақтығысы","10 сын. 1-бөл. §21-23(Б)"],[137,"Екінші ДС-тың экономикалық салдары. «Экономикалық керемет»","9 сын. 2-бөл. §9"],[138,"АҚШ және Батыс Еуропада «әлеуметтік мемлекет» негізінің қалыптасуы","9 сын. 2-бөл. §10"],[139,"Соғыстан кейінгі қайта құру және КСРО. «Хрущев жылымығы»","9 сын. 2-бөл. §11"],[140,"Кеңес экономикасын реформалау сәтсіздігінің себептері. Тоқырау кезеңі","9 сын. 2-бөл. §12"],[141,"Франциядағы консерватизмнің неоконсерватизмге ауысуы","9 сын. 2-бөл. §18"],[142,"Шарль де Голль: Франция ұлылығының жаңғыруы","11 сын. 2-бөл. §37"],[143,"Британдық неоконсерватизм және социализмнің шведтік үлгісі","9 сын. 2-бөл. §19"],[144,"Германиядағы әлеуметтік-нарықтық шаруашылық белгілері","9 сын. 2-бөл. §20"],[145,"Коммунистік Қытай: саяси және әлеуметтік-экономикалық жүйе сипаттамасы","9 сын. 2-бөл. §21"],[146,"Дэн Сяопин — көрнекті Қытай реформаторы","11 сын. 2-бөл. §38"],[147,"Британдық Үндістанды бөлу. Тәуелсіз Үндістан мен Пәкістанның жариялануы","9 сын. 2-бөл. §2"],[148,"Үндістанның тәуелсіз дамуы: мәселелер және шешілу жолдары","9 сын. 2-бөл. §22"],[149,"XX ғасырдың екінші жартысындағы кемализм эволюциясы","9 сын. 2-бөл. §23"],[150,"1950–1960 жж. жапондық және оңтүстіккореялық «экономикалық ғажайыптардың» себептері","9 сын. 2-бөл. §24"],[151,"Ли Куан Ю мен Махатхир Мохаммад: «Үшінші әлемнен бірінші әлемге»","11 сын. 2-бөл. §39-41"],[152,"1979–1985 жж. «қырғиқабақ соғыстың» негізгі оқиғалары және оның аяқталуы","9 сын. 2-бөл. §13"],[153,"1989–1990 жж. Шығыс Еуропадағы «Барқыт революциясы»","10 сын. 2-бөл. §57-58(A)"],[154,"«Қырғиқабақ соғыстың» салдары","9 сын. 2-бөл. §14"],[155,"Халықаралық қатынастардағы биполярлық жүйенің ыдырауы (1985–1996 жж.)","11 сын. 1-бөл. §20"],[156,"Әлем құрылысының постбиполярлық жүйесі","11 сын. 1-бөл. §21"],[157,"Халықаралық қауіпсіздікке төнген қазіргі кездегі қауіп-қатерлер","11 сын. 1-бөл. §23-24"],[158,"Жаһандану үдерісінің мәні. Бүгінгі әлемдегі лаңкестік пен экстремизмнің қаупі","9 сын. 2-бөл. §25"],[159,"Жаһандану жағдайында ұлттық бірегейлікті сақтау мәселесі","9 сын. 2-бөл. §26"],[160,"«Араб көктемі» себептері мен оның әлемдік саясат үшін салдары","9 сын. 2-бөл. §17"],[161,"Таяу Шығыстағы 2010–2011 жылдардағы «Араб көктемі»","10 сын. 2-бөл. §57-58(Ә)"],[162,"Посткеңестік елдердегі «Түрлі түсті революциялар»","10 сын. 2-бөл. §57-58(Ә)"],[163,"БҰҰ-ның құрылуы мен қызметі. Халықаралық мәселелерді шешу жолдары","9 сын. 2-бөл. §7"],[164,"Еуропалық интеграция. ЕҚЫҰ","9 сын. 2-бөл. §8"],[165,"Халықаралық шиеленістерді реттеудегі БҰҰ-ның қызметі","9 сын. 2-бөл. §16"],[166,"Бейбітшілік пен қауіпсіздікті сақтауда мемлекеттердің бірлескен әрекеттері","11 сын. 1-бөл. §25-27"],[167,"Мартин Лютер Кингтің ұлы арманы","11 сын. 2-бөл. §32"],[168,"Н.Мандела — апартеидке қарсы күресуші","11 сын. 2-бөл. §33"],[169,"Өркениеттер арасындағы сауда-экономикалық қарым-қатынастар","10 сын. 1-бөл. §19"],[170,"Өркениеттер арасындағы дипломатиялық қарым-қатынастар","10 сын. 1-бөл. §20"],[171,"Қазіргі кездегі халықаралық қатынастардың даму тенденциялары","11 сын. 1-бөл. §22"],[172,"Мемлекеттердің саяси-құқықтық жүйесі дамуының қазіргі тенденциялары","11 сын. 1-бөл. §18-19"],[173,"Ғылыми-техникалық революция — ғылыми-техникалық прогрестің жаңа кезеңі","9 сын. 2-бөл. §27"],[174,"Ғылыми-техникалық прогрестің тарихи кезеңдері","11 сын. 2-бөл. §52-53"],[175,"Ғылыми-техникалық прогресс және қазіргі заманның жаһандық проблемалары","11 сын. 2-бөл. §54-56"],[176,"Қазіргі кездегі ақпараттық технологиялар","11 сын. 2-бөл. §57"],[177,"Ақпараттық технологиялардың қоғам дамуына әсері","11 сын. 2-бөл. §56-57"],[178,"Қазіргі ғылымның перспективті салалары","11 сын. 2-бөл. §58-60"],[179,"XX ғасырдың екінші жартысы мен XXI ғасырдың басындағы мәдениет дамуы. ЮНЕСКО","9 сын. 2-бөл. §29"],[180,"ЮНЕСКО-ның адамзаттың тарихи-мәдени мұрасын сақтау жөніндегі қызметі","10 сын. 2-бөл. §59"],[181,"Мәдениеттің негізгі даму бағыттары. Заманауи ақпараттық қоғам","9 сын. 2-бөл. §30"],[182,"Бұқаралық мәдениет және оның қазіргі қоғамдағы әсері","10 сын. 2-бөл. §63"],[183,"Мәдениеттер диалогі","10 сын. 1-бөл. §24"],[184,"Мұражай ісі. Мұражайлардың тарихи-мәдени мұраны сақтаудағы рөлі","10 сын. 2-бөл. §60"],[185,"Дүниежүзінің ең ірі мұражайлары","10 сын. 2-бөл. §61"],[186,"Жаңа заман жәнe қазіргі кездегі қоғамдық ойдың дамуының негізгі бағыттары","11 сын. 2-бөл. §28-30"],[187,"Жазу жәнe кітап басып шығару — адамзаттың ең жоғарғы жетістігі","11 сын. 2-бөл. §44-45"],[188,"Мектептегі білім беру: ежелгі заманнан бүгінгі күнге дейін","11 сын. 2-бөл. §46-48"],[189,"Жоғары білім беру жүйесі: өткені мен бүгіні","11 сын. 2-бөл. §49-51"],
];

const LEVELS=[{id:"red",e:"🔴",label:"Білмеймін",color:"#FF3B30",bg:"rgba(255,59,48,0.1)"},{id:"yellow",e:"🟡",label:"Оқып жатырмын",color:"#9A6F00",bg:"rgba(255,204,0,0.15)"},{id:"orange",e:"🟠",label:"Қайталау керек",color:"#C05A00",bg:"rgba(255,149,0,0.12)"},{id:"green",e:"🟢",label:"Жақсы білемін",color:"#1E8A3A",bg:"rgba(52,199,89,0.12)"}];
const LVF=[{id:"all",label:"Барлығы"},{id:"red",e:"🔴",label:"Тек білмейтіндерді көрсету",c:"#FF3B30"},{id:"yellow",e:"🟡",label:"Тек оқып жатырғандарды көрсету",c:"#9A6F00"},{id:"orange",e:"🟠",label:"Тек қайталау керектерді көрсету",c:"#C05A00"},{id:"green",e:"🟢",label:"Тек жақсы білетіндерді көрсету",c:"#1E8A3A"}];
const PRF=[{id:"all",label:"Барлығы"},{id:"high",e:"🔥",label:"Тек жоғары ықтималдықтыларды",c:AC},{id:"mid",e:"⚡",label:"Тек орташа ықтималдықтыларды",c:"#9A6F00"},{id:"low",e:"—",label:"Тек төмен ықтималдықтыларды",c:"#8E8E93"}];
const STEPS=[{id:"read",e:"📖",label:"Кітап оқыдым"},{id:"test",e:"📝",label:"Тест тапсырдым"},{id:"errors",e:"❌",label:"Қатемен жұмыс жасадым"},{id:"repeat",e:"🔁",label:"Қайта қайталадым"}];
const MATS=[{id:"video",e:"🎬",label:"Нұсқа талдау"},{id:"test",e:"📄",label:"Тест тапсырмалары"},{id:"checklist",e:"📋",label:"Чеклист файлдары"},{id:"other",e:"📌",label:"Басқа"}];
const PB={high:{e:"🔥",label:"Жоғары",color:"#C05A00",bg:"rgba(232,112,44,0.13)"},mid:{e:"⚡",label:"Орташа",color:"#9A6F00",bg:"rgba(255,204,0,0.13)"},low:{e:"—",label:"Төмен",color:"#999",bg:"rgba(0,0,0,0.05)"}};

const def=()=>({level:null,steps:{},materials:{}});

export default function App(){
  const [td,setTd]=useState({});
  const [open,setOpen]=useState({p1:true});
  const [exp,setExp]=useState(null);
  const [lvF,setLvF]=useState("all");
  const [prF,setPrF]=useState("all");
  const [ubt1,setUbt1]=useState("");
  const [ubt2,setUbt2]=useState("");
  const [ready,setReady]=useState(false);
  const [addMat,setAddMat]=useState(null);
  const [mUrl,setMUrl]=useState("");
  const [mLbl,setMlbl]=useState("");
  const tmr=useRef(null);

  useEffect(()=>{
    (async()=>{
      try{
        const r=await window.storage.get("okysai_v3");
        if(r){
          const d=JSON.parse(r.value);
          if(d.td)setTd(d.td);
          if(d.open)setOpen(d.open);
          if(d.ubt1)setUbt1(d.ubt1);
          if(d.ubt2)setUbt2(d.ubt2);
        }
      }catch(e){}
      setReady(true);
    })();
  },[]);

  useEffect(()=>{
    if(!ready)return;
    if(tmr.current)clearTimeout(tmr.current);
    tmr.current=setTimeout(async()=>{
      try{await window.storage.set("okysai_v3",JSON.stringify({td,open,ubt1,ubt2}));}catch(e){}
    },800);
  },[td,open,ubt1,ubt2,ready]);

  const upd=(id,fn)=>setTd(p=>{const c=p[id]||def();return{...p,[id]:fn(c)};});
  const setLv=(id,lv)=>upd(id,c=>({...c,level:c.level===lv?null:lv}));
  const togSt=(id,st)=>upd(id,c=>({...c,steps:{...c.steps,[st]:!c.steps?.[st]}}));
  const addM=(id,cat,url,lbl)=>upd(id,c=>{const ms=c.materials||{};return{...c,materials:{...ms,[cat]:[...(ms[cat]||[]),{url,lbl:lbl||url}]}};});
  const delM=(id,cat,i)=>upd(id,c=>{const ms={...c.materials};const a=[...(ms[cat]||[])];a.splice(i,1);return{...c,materials:{...ms,[cat]:a}};});

  const days=ds=>{if(!ds)return null;const d=new Date(ds),n=new Date();n.setHours(0,0,0,0);d.setHours(0,0,0,0);return Math.ceil((d-n)/86400000);};
  const ptFor=p=>TOPICS.filter(([id])=>id>=p.from&&id<=p.to);
  const filt=pts=>pts.filter(([id])=>(lvF==="all"||(td[id]?.level||null)===lvF)&&(prF==="all"||gp(id)===prF));
  const pStat=p=>{const pts=ptFor(p);const g=pts.filter(([id])=>td[id]?.level==="green").length;return{g,t:pts.length,pct:Math.round(g/pts.length*100)};};
  const totG=TOPICS.filter(([id])=>td[id]?.level==="green").length;
  const totP=Math.round(totG/189*100);
  const d1=days(ubt1),d2=days(ubt2);

  if(!ready){
    return React.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh",color:"#8E8E93",fontFamily:FF}},"Жүктелуде...");
  }

  return (
    <div style={{minHeight:"100vh",backgroundColor:"#F2F2F7",backgroundImage:"radial-gradient(rgba(0,0,0,0.09) 1px,transparent 1px)",backgroundSize:"22px 22px",paddingBottom:60,fontFamily:FF}}>

      {/* HEADER */}
      <div style={{background:"#1C1C1E",padding:"28px 18px 20px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(rgba(232,112,44,0.15) 1.5px,transparent 1.5px)",backgroundSize:"18px 18px",pointerEvents:"none"}}/>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{display:"flex",alignItems:"flex-end",gap:4,marginBottom:5}}>
            <span style={{fontSize:36,fontWeight:900,color:"#fff",letterSpacing:-2,lineHeight:1,fontStyle:"italic"}}>okysai</span>
            <div style={{width:7,height:7,borderRadius:"50%",background:AC,marginBottom:7}}/>
          </div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.45)",letterSpacing:0.5}}>дүниежүзі тарихы пәнінен дайындық трекері</div>
        </div>
      </div>

      <div style={{padding:"0 12px"}}>

        {/* PROGRESS */}
        <div style={{background:"#fff",borderRadius:20,padding:"16px 18px",marginTop:14,boxShadow:"0 1px 8px rgba(0,0,0,0.07)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <span style={{fontSize:15,fontWeight:700,color:"#1C1C1E"}}>Жалпы прогресс</span>
            <span style={{fontSize:26,fontWeight:800,color:AC}}>{totP}%</span>
          </div>
          <div style={{background:"#F2F2F7",borderRadius:10,height:10,overflow:"hidden"}}>
            <div style={{width:`${totP}%`,height:"100%",background:`linear-gradient(90deg,${AC},#F0A060)`,borderRadius:10,transition:"width 0.6s"}}/>
          </div>
          <div style={{fontSize:12,color:"#8E8E93",marginTop:7}}>{totG} / 189 тақырып — «Жақсы білемін» деңгейінде</div>
        </div>

        {/* UBT */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:10}}>
          {[{label:"1-ші Нағыз ҰБТ",val:ubt1,set:setUbt1,d:d1},{label:"2-ші Нағыз ҰБТ",val:ubt2,set:setUbt2,d:d2}].map((u,i)=>(
            <div key={i} style={{background:"#fff",borderRadius:18,padding:"12px 14px",boxShadow:"0 1px 8px rgba(0,0,0,0.07)"}}>
              <div style={{fontSize:9,fontWeight:700,color:"#8E8E93",textTransform:"uppercase",letterSpacing:0.6,marginBottom:4}}>{u.label}</div>
              {u.val&&u.d!==null?(
                <div>
                  <div style={{fontSize:28,fontWeight:800,color:u.d<=7?"#FF3B30":AC,lineHeight:1}}>{u.d}</div>
                  <div style={{fontSize:11,color:"#8E8E93"}}>күн қалды</div>
                  <div style={{fontSize:10,color:"#C7C7CC"}}>{new Date(u.val).toLocaleDateString("ru-RU",{day:"numeric",month:"long"})}</div>
                </div>
              ):(
                <div style={{fontSize:11,color:"#C7C7CC",margin:"6px 0 4px"}}>Күн таңдаңыз:</div>
              )}
              <input type="date" value={u.val} onChange={e=>u.set(e.target.value)}
                style={{marginTop:6,width:"100%",padding:"5px 6px",borderRadius:8,border:`1px solid ${AC2}`,fontSize:11,color:AC,fontWeight:600,background:"#FFF8F4",boxSizing:"border-box",outline:"none",cursor:"pointer",fontFamily:FF}}/>
            </div>
          ))}
        </div>

        {/* LEVEL FILTER */}
        <div style={{background:"#fff",borderRadius:18,padding:"14px",marginTop:10,boxShadow:"0 1px 8px rgba(0,0,0,0.07)"}}>
          <div style={{fontSize:13,fontWeight:700,color:"#1C1C1E",marginBottom:9}}>Тақырыптар фильтрі</div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {LVF.map(f=>{
              const cnt=f.id==="all"?189:TOPICS.filter(([id])=>(td[id]?.level||null)===f.id).length;
              const active=lvF===f.id;
              return (
                <button key={f.id} onClick={()=>setLvF(active&&f.id!=="all"?"all":f.id)}
                  style={{padding:"9px 12px",borderRadius:12,border:"none",cursor:"pointer",background:active?(f.c||AC):"#F2F2F7",color:active?"#fff":"#3C3C43",fontWeight:600,fontSize:13,textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center",fontFamily:FF,width:"100%"}}>
                  <span>{f.e?f.e+" ":""}{f.label}</span>
                  <span style={{fontSize:12,opacity:0.8}}>{cnt}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* PROB FILTER */}
        <div style={{background:"#fff",borderRadius:18,padding:"14px",marginTop:10,boxShadow:"0 1px 8px rgba(0,0,0,0.07)"}}>
          <div style={{fontSize:13,fontWeight:700,color:"#1C1C1E",marginBottom:2}}>Тақырыптардың ықтималдық деңгейі фильтрі</div>
          <div style={{fontSize:11,color:"#8E8E93",marginBottom:9}}>🔥 103 жоғары · ⚡ 48 орташа · — 38 төмен</div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {PRF.map(f=>{
              const cnt=f.id==="all"?189:TOPICS.filter(([id])=>gp(id)===f.id).length;
              const active=prF===f.id;
              return (
                <button key={f.id} onClick={()=>setPrF(active&&f.id!=="all"?"all":f.id)}
                  style={{padding:"9px 12px",borderRadius:12,border:"none",cursor:"pointer",background:active?(f.c||AC):"#F2F2F7",color:active?"#fff":"#3C3C43",fontWeight:600,fontSize:13,textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center",fontFamily:FF,width:"100%"}}>
                  <span>{f.e?f.e+" ":""}{f.label}</span>
                  <span style={{fontSize:12,opacity:0.8}}>{cnt}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* PERIODS */}
        {PERIODS.map(p=>{
          const isO=open[p.id];
          const st=pStat(p);
          const fps=filt(ptFor(p));
          return (
            <div key={p.id} style={{marginTop:12}}>
              <button onClick={()=>setOpen(v=>({...v,[p.id]:!v[p.id]}))}
                style={{width:"100%",background:"#1C1C1E",borderRadius:isO?"18px 18px 0 0":18,padding:"13px 16px",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:10,boxShadow:"0 2px 10px rgba(0,0,0,0.14)",fontFamily:FF}}>
                <span style={{fontSize:20}}>{p.icon}</span>
                <div style={{flex:1,textAlign:"left"}}>
                  <div style={{fontSize:15,fontWeight:700,color:"#fff"}}>{p.label}</div>
                  <div style={{fontSize:11,color:"#8E8E93",marginTop:1}}>{st.g} / {st.t} тақырып аяқталды</div>
                </div>
                <div style={{textAlign:"right",minWidth:52}}>
                  <div style={{fontSize:13,fontWeight:700,color:AC,marginBottom:3}}>{st.pct}%</div>
                  <div style={{background:"#3A3A3C",borderRadius:4,height:4,width:52}}>
                    <div style={{width:`${st.pct}%`,height:"100%",background:AC,borderRadius:4}}/>
                  </div>
                </div>
                <span style={{fontSize:13,color:"#636366",marginLeft:2,display:"inline-block",transform:isO?"rotate(180deg)":"none",transition:"transform 0.25s"}}>▼</span>
              </button>

              {isO&&(
                <div style={{background:"#fff",borderRadius:"0 0 18px 18px",boxShadow:"0 4px 14px rgba(0,0,0,0.08)",overflow:"hidden"}}>
                  {fps.length===0
                    ?<div style={{padding:24,textAlign:"center",color:"#8E8E93",fontSize:14}}>Бұл фильтрде тақырып жоқ</div>
                    :fps.map(([id,title,book],idx)=>{
                      const t=td[id]||def();
                      const isE=exp===id;
                      const lv=LEVELS.find(l=>l.id===t.level);
                      const pb=PB[gp(id)];
                      const sd=STEPS.filter(s=>t.steps?.[s.id]).length;
                      return (
                        <div key={id}>
                          {idx>0&&<div style={{height:1,background:"#F2F2F7",marginLeft:56}}/>}
                          <button onClick={()=>setExp(isE?null:id)}
                            style={{width:"100%",padding:"11px 14px",border:"none",cursor:"pointer",background:isE?"#FFF8F4":"#fff",display:"flex",alignItems:"center",gap:10,textAlign:"left",fontFamily:FF}}>
                            <div style={{width:34,height:34,borderRadius:9,background:lv?lv.bg:"#F2F2F7",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:lv?lv.color:AC,flexShrink:0}}>{id}</div>
                            <div style={{flex:1,minWidth:0}}>
                              <div style={{fontSize:13,fontWeight:600,color:"#1C1C1E",lineHeight:1.35,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{title}</div>
                              <div style={{display:"flex",alignItems:"center",gap:5,marginTop:3}}>
                                <span style={{fontSize:10,color:"#8E8E93",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:130}}>📚 {book}</span>
                                <span style={{fontSize:10,fontWeight:700,color:pb.color,background:pb.bg,borderRadius:5,padding:"1px 5px",whiteSpace:"nowrap",flexShrink:0}}>{pb.e} {pb.label}</span>
                              </div>
                            </div>
                            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,flexShrink:0}}>
                              {lv?<span style={{fontSize:18}}>{lv.e}</span>:<div style={{width:18,height:18,borderRadius:"50%",border:"2px dashed #C7C7CC"}}/>}
                              {sd>0&&<div style={{fontSize:9,color:"#8E8E93",fontWeight:700}}>{sd}/4</div>}
                            </div>
                          </button>

                          {isE&&(
                            <div style={{background:"#FFF8F4",padding:"14px 14px 16px",borderTop:"1px solid rgba(232,112,44,0.15)"}}>
                              <div style={{marginBottom:14}}>
                                <div style={{fontSize:10,fontWeight:700,color:"#8E8E93",textTransform:"uppercase",letterSpacing:0.6,marginBottom:8}}>Меңгеру деңгейі</div>
                                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                                  {LEVELS.map(lv=>(
                                    <button key={lv.id} onClick={()=>setLv(id,lv.id)}
                                      style={{padding:"8px",borderRadius:12,border:`2px solid ${t.level===lv.id?lv.color:"transparent"}`,background:t.level===lv.id?lv.bg:"#fff",cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:6,fontFamily:FF}}>
                                      <span style={{fontSize:16}}>{lv.e}</span>
                                      <span style={{fontSize:11,fontWeight:600,color:t.level===lv.id?lv.color:"#3C3C43"}}>{lv.label}</span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                              <div style={{marginBottom:14}}>
                                <div style={{fontSize:10,fontWeight:700,color:"#8E8E93",textTransform:"uppercase",letterSpacing:0.6,marginBottom:8}}>Меңгеру қадамдары</div>
                                <div style={{display:"flex",flexDirection:"column",gap:5}}>
                                  {STEPS.map(st=>{
                                    const ck=t.steps?.[st.id];
                                    return (
                                      <button key={st.id} onClick={()=>togSt(id,st.id)}
                                        style={{padding:"9px 12px",borderRadius:12,border:"none",cursor:"pointer",background:ck?AC2:"#fff",display:"flex",alignItems:"center",gap:10,textAlign:"left",fontFamily:FF}}>
                                        <div style={{width:22,height:22,borderRadius:6,background:ck?AC:"#E5E5EA",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                                          {ck&&<span style={{color:"#fff",fontSize:14,fontWeight:900}}>✓</span>}
                                        </div>
                                        <span style={{fontSize:13,fontWeight:500,color:"#1C1C1E"}}>{st.e} {st.label}</span>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                              <div>
                                <div style={{fontSize:10,fontWeight:700,color:"#8E8E93",textTransform:"uppercase",letterSpacing:0.6,marginBottom:10}}>Қосымша материалдар</div>
                                {MATS.map(mc=>{
                                  const ml=t.materials?.[mc.id]||[];
                                  const isA=addMat?.id===id&&addMat?.cat===mc.id;
                                  return (
                                    <div key={mc.id} style={{marginBottom:12}}>
                                      <div style={{fontSize:12,fontWeight:600,color:"#3C3C43",marginBottom:5}}>{mc.e} {mc.label}</div>
                                      {ml.map((m,i)=>(
                                        <div key={i} style={{display:"flex",alignItems:"center",gap:6,background:"#fff",borderRadius:10,padding:"7px 10px",marginBottom:4}}>
                                          <a href={m.url} target="_blank" rel="noreferrer" style={{flex:1,fontSize:12,color:AC,textDecoration:"none",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>🔗 {m.lbl}</a>
                                          <button onClick={()=>delM(id,mc.id,i)} style={{background:"none",border:"none",cursor:"pointer",fontSize:13,color:"#FF3B30",padding:"0 2px",flexShrink:0}}>✕</button>
                                        </div>
                                      ))}
                                      {isA?(
                                        <div style={{background:"#fff",borderRadius:12,padding:10}}>
                                          <input placeholder="Сілтеме (URL)" value={mUrl} onChange={e=>setMUrl(e.target.value)} style={{width:"100%",padding:"8px 10px",borderRadius:8,border:"1px solid #E5E5EA",fontSize:12,marginBottom:5,boxSizing:"border-box",outline:"none",fontFamily:FF}}/>
                                          <input placeholder="Атауы (міндетті емес)" value={mLbl} onChange={e=>setMlbl(e.target.value)} style={{width:"100%",padding:"8px 10px",borderRadius:8,border:"1px solid #E5E5EA",fontSize:12,marginBottom:8,boxSizing:"border-box",outline:"none",fontFamily:FF}}/>
                                          <div style={{display:"flex",gap:6}}>
                                            <button onClick={()=>{if(mUrl.trim()){addM(id,mc.id,mUrl.trim(),mLbl.trim());setMUrl("");setMlbl("");setAddMat(null);}}} style={{flex:1,padding:8,borderRadius:8,border:"none",background:AC,color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:FF}}>Қосу</button>
                                            <button onClick={()=>{setAddMat(null);setMUrl("");setMlbl("");}} style={{flex:1,padding:8,borderRadius:8,border:"none",background:"#E5E5EA",color:"#3C3C43",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:FF}}>Бас тарту</button>
                                          </div>
                                        </div>
                                      ):(
                                        <button onClick={()=>{setAddMat({id,cat:mc.id});setMUrl("");setMlbl("");}} style={{padding:"6px 12px",borderRadius:10,border:`1.5px dashed ${AC}`,background:"transparent",color:AC,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:FF}}>+ Материал қос</button>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  }
                </div>
              )}
            </div>
          );
        })}

        {/* FOOTER */}
        <div style={{marginTop:20,background:"#1C1C1E",borderRadius:20,padding:"18px 18px 20px",boxShadow:"0 2px 12px rgba(0,0,0,0.15)"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
            <div style={{width:46,height:46,borderRadius:14,background:AC,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>👨‍🏫</div>
            <div>
              <div style={{fontSize:15,fontWeight:700,color:"#fff"}}>Ардақ Райханов</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.5)"}}>JUZ40 · Дүниежүзі тарихы мұғалімі</div>
            </div>
          </div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.55)",marginBottom:12,lineHeight:1.6}}>Барлық сұрақтар бойынша мұғаліммен тікелей байланыса аласыз:</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <a href="https://www.instagram.com/ardak_raikhan" target="_blank" rel="noreferrer" style={{fontSize:12,color:"#fff",textDecoration:"none",background:"rgba(255,255,255,0.1)",padding:"8px 14px",borderRadius:12,fontWeight:600}}>📸 ardak_raikhan</a>
            <a href="https://t.me/dzht_araldary" target="_blank" rel="noreferrer" style={{fontSize:12,color:"#fff",textDecoration:"none",background:"rgba(255,255,255,0.1)",padding:"8px 14px",borderRadius:12,fontWeight:600}}>✈️ Telegram арна</a>
          </div>
          <div style={{marginTop:14,paddingTop:12,borderTop:"1px solid rgba(255,255,255,0.07)",fontSize:10,color:"rgba(255,255,255,0.25)",textAlign:"center"}}>okysai · Прогресс осы құрылғыда сақталады</div>
        </div>

      </div>
    </div>
  );
}
