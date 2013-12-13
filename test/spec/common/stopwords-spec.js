'use strict';
var StopWords = require('../../../src/common/stop-words');

describe('lib/stopwords', function() {

  it('should load', function() {
    expect(StopWords).toBeDefined();
  });

  it('should accept a space seperated list', function() {
    var spaceSeparatedList = 'a an the he she    it  we go    be';
    var result = StopWords.processStopWords({
      stopWords: spaceSeparatedList
    });
    expect(result.stopWords).toEqual(/^(a|an|the|he|she|it|we|go|be)$/);
  });

  it('should accept a comma seperated list', function() {
    var commaSeparatedList = 'a, an, the, he, she,    it,  we, go,    be';
    var result = StopWords.processStopWords({
      stopWords: commaSeparatedList
    });
    expect(result.stopWords).toEqual(/^(a|an|the|he|she|it|we|go|be)$/);
  });

  it('should accept a regular expression', function() {
    var regexpSeparatedList = /^(a|an|the|he|she|it|we|go|be)$/;
    var result = StopWords.processStopWords({
      stopWords: regexpSeparatedList
    });
    expect(result.stopWords).toEqual(/^(a|an|the|he|she|it|we|go|be)$/);
  });

  it('should throw an error if an invalid regex is provided', function() {
    var regexpSeparatedList = 'a|an|the|he|she|it|we|go|be';
    var e = 'Invalid RegExp a|an|the|he|she|it|we|go|be';

    expect(function() {
      StopWords.processStopWords({
        stopWords: regexpSeparatedList
      });
    }).toThrow(e);

  });

  it('should accept a text', function() {
    var textToTest1 = "A cloud is a visible mass of condensed droplets or frozen crystals suspended in the atmosphere. Cloud(s) may also refer to: Contents  [hide]  1 Information Technology 2 Science 3 Fiction 4 Literature 5 Music 6 Other uses 7 See also Information Technology  Cloud computing, Internet-based development and use of computer technology stored on servers rather than the client computers Cloud (operating system), a browser-based operating system that will instantly be usable after turning on the PC, by the makers of gOS Tag cloud, a visual depiction of user-generated tags used typically to describe the content of web sites Cloud storage, a model of networked online storage Cloud.com, a company that develops open source cloud orchestration software CloudStack, an open source cloud computing software Science  Magellanic Clouds, irregular dwarf galaxies near our galaxy, the Milky Way Interstellar cloud, dense region between stars Molecular cloud, interstellar cloud containing molecules Electron cloud, analogy used to describe an electron that orbits around a nucleus Point cloud, in mathematics, a set of vertices in a three-dimensional coordinate system CLOUD, an experimental facility used to investigate the microphysics between galactic cosmic rays and clouds Cloud chamber, an experimental device used in early studies of particle physics Fiction  Cloud Strife, a character in Final Fantasy VII media Bou Keng Wan ('Cloud'), a Kung Fu character from the Hong Kong comic, Fung Wan Cloud (comics), a Marvel comic book character Cloudbase, the fictional skyborne headquarters of Spectrum, from the science fiction television series Captain Scarlet and the Mysterons Clouds (film), a 2000 film written and directed by Don Thompson and produced by Will Arntz Literature  The Clouds, a comedy by Aristophanes Clouds, a 1977 philosophical comedic play by British playwright Michael Frayn The Clouds, a 1797 play by the British writer Richard Cumberland The Cloud of Unknowing, a medieval mystical text Music  Clouds (60s rock band), a Scottish music group that operated in the late 1960s Clouds (Australian band), an indie rock group based in Sydney, Australia in the 1990s The Clouds (UK band), a British indie pop band from the 1980s Cloud (music), sound mass consisting of statistical clouds of microsounds 'Clouds', a song by Chaka Khan from Naughty 'Clouds', a song by Level 42 on the album Retroglide 'Clouds', a song by Spires That in the Sunset Rise on the album This Is Fire 'Clouds' (Zach Sobiech song) a song by Zach Sobiech Clouds (Joni Mitchell album), 1969 Clouds (Lee Ranaldo album), 1997 Clouds (Tiamat album), 1992 Clouds (EP), an EP by Nosound 'Cloudy', by Average White Band from the album Cut the Cake Other uses  Cloud (dancer), a b-boy, writer, and director from Florida Cloud (surname) Cloud, California, a former settlement in Kings County Clodoald (522–560), better known as Cloud or Saint Cloud, son of King Chlodomer of Orleans Saint-Cloud, a commune in the western suburbs of Paris, France Cloud (video game), a 2005 third-person computer puzzle game See also  The Cloud (disambiguation) Cloud Nine (disambiguation) Red Cloud (disambiguation) St. Cloud (disambiguation) White Cloud (disambiguation) McCloud (disambiguation)";
    var textToTest2 = "Cloud computing, or the cloud, is a colloquial expression used to describe a variety of different types of computing concepts that involve a large number of computers connected through a real-time communication network such as the Internet.[1] Cloud computing is a term without a commonly accepted unequivocal scientific or technical definition. In science, cloud computing is a synonym for distributed computing over a network and means the ability to run a program on many connected computers at the same time. The phrase is also, more commonly used to refer to network-based services which appear to be provided by real server hardware, which in fact are served up by virtual hardware, simulated by software running on one or more real machines. Such virtual servers do not physically exist and can therefore be moved around and scaled up (or down) on the fly without affecting the end user - arguably, rather like a cloud. The popularity of the term can be attributed to its use in marketing to sell hosted services in the sense of application service provisioning that run client server software on a remote location. Advantages Cloud computing relies on sharing of resources to achieve coherence and economies of scale similar to a utility (like the electricity grid) over a network.[2] At the foundation of cloud computing is the broader concept of converged infrastructure and shared services. The cloud also focuses on maximizing the effectiveness of the shared resources. Cloud resources are usually not only shared by multiple users but are also dynamically re-allocated per demand. This can work for allocating resources to users. For example, a cloud computer facility, which serves European users during European business hours with a specific application (e.g. email) while the same resources are getting reallocated and serve North American users during North America's business hours with another application (e.g. web server). This approach should maximize the use of computing powers thus reducing environmental damage as well since less power, air conditioning, rackspace, etc. is required for a variety of functions. The term 'moving to cloud' also refers to an organization moving away from a traditional CAPEX model (buy the dedicated hardware and depreciate it over a period of time) to theOPEX model (use a shared cloud infrastructure and pay as you use it). Proponents claim that cloud computing allows companies to avoid upfront infrastructure costs, and focus on projects that differentiate their businesses instead of infrastructure.[3]Proponents also claim that cloud computing allows enterprises to get their applications up and running faster, with improved manageability and less maintenance, and enables IT to more rapidly adjust resources to meet fluctuating and unpredictable business demand.[3][4][5] Hosted services In marketing, cloud computing is mostly used to sell hosted services in the sense of application service provisioning that run client server software at a remote location. Such services are given popular acronyms like 'SaaS' (Software as a Service), 'PaaS' (Platform as a Service), 'IaaS' (Infrastructure as a Service), 'HaaS' (Hardware as a Service) and finally 'EaaS' (Everything as a Service). End users access cloud-based applications through a web browser, thin client or mobile app while the business software and user's data are stored on servers at a remote location. History The 1950s The underlying concept of cloud computing dates back to the 1950s, when large-scale mainframe computers became available in academia and corporations, accessible via thin clients/terminal computers, often referred to as 'dumb terminals', because they were used for communications but had no internal processing capacities. To make more efficient use of costly mainframes, a practice evolved that allowed multiple users to share both the physical access to the computer from multiple terminals as well as to share the CPU time. This eliminated periods of inactivity on the mainframe and allowed for a greater return on the investment. The practice of sharing CPU time on a mainframe became known in the industry as time-sharing.[6] The 1960s–1990s John McCarthy opined in the 1960s that 'computation may someday be organized as a public utility.'[7] Almost all the modern-day characteristics of cloud computing (elastic provision, provided as a utility, online, illusion of infinite supply), the comparison to the electricity industry and the use of public, private, government, and community forms, were thoroughly explored in Douglas Parkhill's 1966 book, The Challenge of the Computer Utility. Other scholars have shown that cloud computing's roots go all the way back to the 1950s when scientist Herb Grosch (the author of Grosch's law) postulated that the entire world would operate on dumb terminals powered by about 15 large data centers.[8] Due to the expense of these powerful computers, many corporations and other entities could avail themselves of computing capability through time sharing and several organizations, such as GE's GEISCO, IBM subsidiary The Service Bureau Corporation (SBC, founded in 1957), Tymshare (founded in 1966), National CSS (founded in 1967 and bought by Dun & Bradstreet in 1979), Dial Data (bought by Tymshare in 1968), and Bolt, Beranek and Newman (BBN) marketed time sharing as a commercial venture. The 1990s In the 1990s, telecommunications companies,who previously offered";
    expect(true).toBeTruthy();
  });

  it('should accept a text', function() {
    var textToTest = "En météorologie, un nuage est une masse visible constituée initialement d'une grande quantité de gouttelettes d’eau (parfois de cristaux de glace associés à des aérosols chimiques ou des minéraux) en suspension dans l’atmosphère au-dessus de la surface d'une planète. L’aspect d'un nuage dépend de la lumière qu’il reçoit, de la nature, de la dimension, du nombre et de la répartition des particules qui le constituent. Les gouttelettes d’eau d’un nuage proviennent de la condensation de la vapeur d’eau contenue dans l’air. La quantité maximale de vapeur d’eau (gaz invisible) qui peut être contenue dans une masse d'air est fonction de la température : plus l’air est chaud, plus il peut contenir de vapeur d’eau. (Voir les articles Pression de vapeur saturante et Formule de Clapeyron) Sommaire  [masquer]  1 Histoire des représentations des nuages 2 Formation des nuages 3 Dissipation des nuages 4 Types de nuages 5 Classification troposphérique 5.1 Nuages élevés (Famille A) 5.2 Moyens (Famille B) 5.3 Bas (Famille C) 5.4 Moyen développement vertical (Famille D1) 5.5 Grand développement vertical (Famille D2) 5.6 Ambiguïtés liées au mode de formation des nuages 6 Au-dessus de la troposphère 6.1 Nuages stratosphériques 6.2 Nuages mésosphériques 7 Nébulosité et opacité 8 Couleurs des nuages 9 Nuages extraterrestres 10 Notes et références 11 Bibliographie 12 Voir aussi 12.1 Articles connexes 12.2 Liens externes Histoire des représentations des nuages[modifier | modifier le code]    Le Voyageur contemplant une mer de nuages de Caspar David Friedrich, 1818 L'histoire des représentations des nuages présente les différentes perceptions des nuages au cours des siècles. La majorité des philosophes de l'Antiquité considèrent que les nuages sont issus des exhalaisons humides que dégagent la mer et les cours d'eau1. Au Moyen Âge, le nuage appelé nue est perçu dans une perspective théologique comme la « nuée mystique », c'est-à-dire le voile de Dieu (allant jusqu'à dévoiler le paradis lors d'un éclair) ou selon une perspective plus naturelle (classification selon les couleurs2 en nuages noirs apportant la pluie selon la métaphore des nimborum naves, « navires de pluie », nuages lumineux et blancs s'étant vidé de leur eau, éventuellement en nuages rouges de l'aurore et du crépuscule) mais sa nature fait débat3. La renaissance du xiie siècle voit la diffusion des ouvrages d'Aristote, notamment les Météorologiques dans lesquels il décrit les nuages sans parvenir à expliquer pourquoi ces particules restent en suspension dans l'atmosphère4 : à partir du xiiie siècle, les scolastiques et les encyclopédistes envisagent alors le nuage non plus simplement comme un objet dans le ciel mais comme une matière faite d'air, d'eau, voire de feu selon la théorie aristotélicienne des Quatre éléments, tel Barthélemy l'Anglais dans son Livre des propriétés des choses5. À la fin du Moyen Âge, la littérature qui a jusque-là du mal à saisir le caractère éphémère et mobile du nuage, développe ce thème qui correspond encore plus aux inspirations des siècles suivants (période baroque et romantisme, notamment le Sturm und Drang allemand)6. Néanmoins, le nuage représenté dans les arts reste essentiellement du domaine du sacré jusqu'au xixe siècle (hiérophanie de l'ascension du Christ, visions mystiques)7. À partir du xixe siècle et jusqu'à aujourd'hui, les artistes comme Claude Monet, John Constable ou Olafur Eliasson utilisent les observations scientifiques des nuages (notamment à partir de montées en ballons) dans leurs œuvres8. Avant le xixe siècle, les nuages sont donc avant tout des objets esthétiques. Les savants tentent de les décrire subjectivement mais leur nature trop diverse, complexe et leur fugacité est un obstacle à leur catégorisation bien qu'il y ait eu quelques tentatives pour les utiliser dans les prévisions météorologiques. Jean-Baptiste de Lamarck propose en 1802 la première classification scientifique des nuages9 par une liste de termes descriptifs10 en français, mais c'est le système de Luke Howard, utilisant le latin universel de la classification binomiale de Carl von Linné, qui connaît le succès dès sa parution en 1803 et dont la terminologie est toujours utilisée aujourd'hui11. En 1855, Émilien Renou proposa l’ajout des genres Altocumulus et Altostratus. En septembre 1896, cette version élargie de la classification originelle de Howard fut officiellement adoptée et publiée dans le premier Atlas international des nuages de 1896. L’édition actuelle publiée par l’Organisation météorologique mondiale date de 1956 pour le volume I et de 1987 pour le volume II. C’est elle qui fait foi dans les différents services météorologiques nationaux.  Formation des nuages[modifier | modifier le code]  Article détaillé : Physique des nuages.   Un nuage d'orage en formation.   Épaisseur optique des nuages en avril 2001 La formation de nuages résulte du refroidissement d’un volume d’air jusqu’à la condensation d’une partie de sa vapeur d’eau. Si le processus de refroidissement se produit au sol (par contact avec une surface froide, par exemple), on assiste à la formation de brouillard. Dans l’atmosphère libre, le refroidissement se produit généralement par soulèvement, en vertu du comportement des gaz parfaits dans une atmosphère hydrostatique, selon lequel un gaz se refroidit spontanément lorsque la pression baisse. Les nuages peuvent aussi perdre une partie de leur masse sous forme de précipitations, par exemple sous forme de pluie, grêle ou neige. La condensation de la vapeur d’eau, en eau liquide ou en glace, se produit initialement autour de certains types de microparticules de matière solide (aérosols), qu’on appelle des noyaux de condensation ou de congélation. La congélation spontanée de l’eau liquide en glace, dans une atmosphère très pure, ne se produit pas au-dessus de -40 °C. Entre 0 et -40 °C, les gouttes d’eau restent dans un état métastable (surfusion), qui cesse dès qu’elles rentrent en contact avec un noyau de condensation (poussière, cristal de glace, obstacle). Lorsque ce phénomène se produit au sol, on assiste à des brouillards givrants. Juste après la condensation ou la congélation, les particules sont encore très petites. Pour des particules de cette taille, les collisions et l’agrégation ne peuvent pas être les facteurs principaux de croissance. Il se produit plutôt un phénomène connu sous le nom de « effet Bergeron ». Ce mécanisme repose sur le fait que la pression partielle de saturation de la glace est inférieure à celle de l’eau liquide. Ceci signifie que, dans un milieu où coexistent des cristaux de glace et des gouttelettes d’eau surfondue, la vapeur d’eau ambiante se condensera en glace sur les cristaux de glace déjà existants, et que les gouttelettes d’eau s’évaporeront d’autant. On voit ainsi que le soulèvement est doublement important dans la formation de nuages et de précipitation : en premier lieu comme mécanisme de refroidissement, et ensuite comme porteur de gouttelettes d’eau liquide jusqu’au niveau où elles deviennent surfondues. Le soulèvement peut être dû à la convection, à la présence de terrains montagneux faisant obstacle à l’écoulement de l’air ou à des facteurs de la dynamique atmosphérique, comme les ondes baroclines (aussi appelées « ondes frontales »). ";
    expect(true).toBeTruthy();
  });

  it('should accept a text and a weight', function() {
    expect(true).toBeTruthy();
  });

  it('should produce a list of stopwords', function() {
    expect(true).toBeTruthy();
  });

  it('should produce a filtered text', function() {
    expect(true).toBeTruthy();
  });

  it('should produce a weighted list of words (rather than 0/1 stop vs content', function() {
    expect(true).toBeTruthy();
  });

  it('should work with agglutinative languages'), function() {
    var textToTest = "ᐅᔨᔭᐅᖁᕙᕋ ᖃᓄᖅ ᐊᔪᕐᓇᖅᑎᒋᔫᔮᓚᐅᕐᓂᖓᓂᒃ" +
      "ᓈᒻᒪᑦᑎᐊᖅᑐᒃᑯᑦ ᐅᖃᓪᓚᐅᓯᖃᕆᐊᒥᒃ ᐊᔪᕆᖖᒋᑦᑎᐊᖅᑐᒍ ᐃᓕᓴᐃᔨᐅᔫᓚᐅᕐᓂᖓᓂᒃ, ᑐᑭᓯᐅᕆᔨᐅᔫᓂᖓᓄᑦ ᖃᐅᔨᒪᓂᕐᒥᓄᑦ, ᐃᓕᓐᓂᐊᕐᓂᓕᕆᔨᐅᔫᓚᐅᕐᓂᖓᓄᑦ ᐊᒻᒪᓗ ᐃᓚᒋᔭᒥᓂᒃ" +
      "ᑲᒪᑦᑎᐊᖅᑑᓚᐅᕐᓂᖓᓄᑦ. ᐅᑭᐅᓪᓗᐊᖖᒍᑲᐅᑎᒋᓂᐊᓕᕐᐳᖅ ᑕᐃᒪ ᐊᓂᕐᓂᖏᓚᐅᖅᓯᒪᓂᖓᓂᑦ ᐅᑭᐊᒃᓵᖓᓂ 2012 ᐅᑭᐅᖃᓕᖅᑐᓂ 93- ᓂᒃ, ᐊᒻᒪᓗ ᐃᔾᔪᑎᒋᓪᓗᒍ" +
      "ᐃᓕᑕᕆᓯᒪᓕᕈᑎᒋᓂᐊᓚᐅᕋᓗᐊᕋᒃᑯᑦ ᐃᓕᓐᓂᐊᕈᑎᒋᓯᒪᔭᓐᓄᑦ ᓘᑦᑖᖑᓂᕐᒧᑦ ᖃᐅᔨᓴᕈᑎᒋᔭᓐᓂ ᖃᐅᔨᓴᕐᓂᐊᖅᑐᒋᑦ ᐃᓕᓐᓂᐊᖅᑎᑦᑎᔾᔪᑎᒋᕙᓚᐅᖅᑕᖏᑦ, ᐊᔪᓕᓪᓚᑦᑖᑲᓴᓚᐅᕋᒃᑯ ᐃᓗᕕᖅᑕᐅᑎᓪᓗᒍ" +
      "ᐃᖅᑲᐅᒪᔾᔪᑎᒋᔭᓂᒃ ᐅᖃᐅᓯᐅᓂᐊᖅᑐᓂᒃ ᑎᑎᕋᖅᓯᒪᔪᓕᐅᕆᐊᒥᒃ. ᓇᖕᒥᓂᖅᑕᐅᖅ ᐊᑖᑕᒐ ᑐᖁᓵᖅᓯᒪᓚᐅᕐᒪᑦ — ᐱᖃᑎᐊᓗᒋᓚᐅᕐᒪᒍ ᐊᑖᑕᒪ ᐊᐅᐱᓛᕐᔫᑉ ᓄᑲᕆᓚᐅᖅᓯᒪᔭᖓ ᑲᑭᐊᕐᓂᐅᑦ. ᑕᒪᓐᓇᓗ" +
      "ᐱᔾᔪᑎᖏᓪᓗᒍ ᐅᕙᓐᓂᒃ ᖃᐅᔨᓯᒪᓕᕋᒪ ᑕᒪᑐᒪᓂ, ᑎᒍᒥᐊᖅᑎᐅᒋᐊᖃᕐᓂᓐᓂᒃ ᐃᓄᑐᖃᕆᔭᑦᑕ ᐅᓂᒃᑲᐅᓯᕆᕙᒃᓯᒪᔭᖏᓂᒃ, ᐅᓪᓗᒥᐅᓕᖅᑐᒥᓗ ᓯᕗᓂᕕᓂᕆᔭᕆᓕᖅᑕᑦᑎᓐᓄᑦ. ᑎᑎᕋᖅᓯᒪᔪᑎᒍᑦ" +
      "ᐃᓕᑕᕆᓯᒪᔪᓐᓇᖅᐸᕗᑦ ᐊᒻᒪᓗ ᖃᓄᖅ ᐃᓅᓯᒥᓐᓄᑦ ᐊᒃᑐᐃᓯᒪᓂᕆᓚᐅᖅᑕᖏᓂᒃ ᐅᕙᑦᑎᓐᓄᑦ ᓇᖕᒥᓂᖅ, ᐃᓕᑉᐸᓪᓕᐊᑎᑦᑐᓂᑎᒍ, ᐃᑲᔪᖅᑐᕐᓯᒪᓪᓗᓂᑎᒍᑦ ᐊᒻᒪᓗ ᐱᐅᓯᒋᐊᖅᑎᓐᓇᓱᒃᑐᒋᑦ" +
      "ᖃᐅᔨᒪᓂᕆᓕᕈᒫᖅᑕᖏᑕ ᑭᖑᕚᕆᓕᕐᓂᐊᕐᒥᔭᑦᑕᑦᑕᐅᖅ. ᖃᓄᐃᒋᔮᖖᒋᑕᕋ ᐅᓂᒃᑲᐅᓯᖃᕆᐊᒥᒃ ᐃᓅᓯᕆᓚᐅᖅᑕᖓᓄᑦ ᐃᓕᓴᐃᔾᔪᑎᒋᕙᓚᐅᖅᑕᖏᓄᓪᓗ ᐱᔾᔪᑎᖃᖅᑐᓂᒃ ᐱᔾᔪᑎᒋᓪᓗᒍ ᑎᑎᕋᓚᐅᕋᒃᑭᑦ" +
      "ᐃᓄᒃᑎᑑᖅᓯᒪᓪᓗᒋᑦ ᐊᒻᒪᓗ ᕿᒥᕐᕈᓚᐅᖅᓯᒪᒻᒪᒋᑦ ᓈᒻᒪᒋᓯᒪᓕᓚᐅᖅᑐᒋᓪᓗ ᐃᓕᓐᓂᐊᕈᑎᒋᓯᒪᔭᓐᓄᑦ ᑎᑎᕋᖅᓯᒪᔪᓕᐅᕐᓂᐊᓵᖅᑎᓪᓗᖓ ᑎᓯᐱᕆ 2011- ᖑᑎᓪᓗᒍ. ᑖᒃᑯᐊ ᑎᑎᕋᖅᓯᒪᔭᒃᑲ" +
      "ᐋᖅᑭᒃᓱᐊᕆᓕᓚᐅᕐᒥᒐᒃᑭᑦ ᓴᐃᒻᒪᖅᑎᑕᐅᓯᒪᓪᓗᖓ ᐊᒻᒪᓗ ᓈᒻᒪᒋᔭᐅᓯᒪᑎᓪᓗᒋᑦ ᐃᕐᓂᕆᔭᖓᓂᑦ ᑭᖑᕚᕆᔭᖓᓂᓪᓗ ᐱᐊᕆᒥᑦ. ᐊᐅᐱᓛᕐᔪᒃ ᐊᒥᓱᓂᑦ ᐅᐱᒋᔭᐅᑦᑎᐊᖅᑐᓂ ᐃᓄᑐᖃᕆᔭᐅᓚᐅᕐᒪᑦ," +
      "ᐊᒥᓱᓂᓪᓗ ᓇᓗᓇᐃᒻᒪᕆᒃᑐᒃᑯᑦ ᐱᒻᒪᕆᐅᑎᓪᓚᕆᓐᓄᑦ ᐃᓱᒪᒃᓴᖅᓯᐅᖅᑎᐅᓂᖓᓄᑦ ᖃᐅᔨᒪᔭᐅᑦᑎᐊᖅᑕᐅᓂᖓᓄᑦ ᐅᖃᐅᓯᕆᔭᐅᕙᓚᐅᖅᑐᓂ ᑐᕌᖓᑎᓪᓗᒋᑦ ᐃᓄᐃᑦ ᐊᐅᓚᑦᓯᔨᐅᔭᕆᐊᖃᕐᓂᖏᑕ," +
      "ᓄᓇᒋᔭᑐᖃᖏᑕ ᐊᒻᒪᓗ ᓈᒻᒪᑦᑎᖅᑐᒥᒃ ᐃᓅᓯᖃᖅᑎᑕᐅᔭᕆᐊᖃᕐᓂᖏᓄᑦ ᐱᔪᓂᒃ. ᐱᐅᓯᑐᖃᕆᓪᓗᓂᐅᒃ ᐃᓅᓯᓕᒫᒥᓂ ᐅᖃᓪᓚᒃᑎᐅᔪᓐᓇᑦᑎᐊᓚᐅᕐᒪᑦ, ᐅᖃᓪᓚᒋᐊᕐᕕᒋᓯᒪᔭᖏᑦ ᓂᐱᓕᐅᖅᑕᐅᓯᒪᔪᑦ" +
      "ᐱᔭᐅᔪᒪᓪᓚᕆᒃᐸᒻᒪᑕ ᐊᒻᒪᓗ ᐃᓕᓐᓂᐊᖅᑎᑦᑎᔾᔪᑎᒋᕙᓚᐅᖅᑕᖏᑦ ᐊᒥᓱᓄᑦ ᐅᖃᓕᒫᒐᓕᐊᖑᓯᒪᔪᓄᑦ ᐃᓕᔭᐅᖃᑦᑕᖅᓯᒪᓪᓗᑎᒃ, ᐃᓚᖃᖅᑐᒋᑦ ᐅᖃᓗᕋᐃᑦ: ᓄᓇᕗᒻᒧᑦ ᐊᑐᖅᑕᐅᓯᒪᔪᓄᑦ ᐅᓂᒃᑲᐅᓰᑦ" +
      "ᐊᒻᒪᓗ ᓄᓇᕗᑦ ᐅᑭᐅᖅᑕᖅᑐᒥ ᓯᓚᑦᑐᖅᓴᕐᕕᒃᑯᑦ ᐃᓄᑐᖃᕐᓂᒃ ᐊᐱᖅᓱᐃᓂᖃᖃᑦᑕᒪᐅᕐᓂᖏᓄᑦ ᐅᖃᓕᒫᒐᓕᐊᖑᓯᒪᓕᓚᐅᖅᑐᓂ. ᐱᒋᐊᖅᑎᑦᑎᔨᐅᖃᑕᐅᓚᐅᕐᒪᑦ ᐃᓄᑐᖃᐅᖃᑎᒥᓂ ᐱᕈᕐᕕᒃ" +
      "ᐃᓕᓐᓂᐊᕐᕕᒻᒧᑦ ᐃᖃᓗᐃᑦ, ᓄᓇᕗᒻᒥ, ᐱᓕᕆᐊᕆᔭᒥᓐᓂ ᑐᕌᖓᓂᖃᖅᑐᓂᒃ ᐅᖃᐅᓯᓕᕆᓂᕐᒧᑦ, ᐱᐅᓯᑐᖃᓕᕆᓂᕐᒧᑦ ᐊᒻᒪᓗ ᓈᒻᒪᑦᑎᐊᕆᐊᖃᕐᓂᕐᒧᑦ ᐃᓕᓐᓂᐊᖅᑎᑦᑎᓂᐅᓕᕈᓐᓇᖅᑐᓂ" +
      "ᒪᓕᒃᑎᑕᐅᓯᒪᓪᓗᑎᒃ ᐃᓄᑐᖃᕆᔭᐅᔪᑦ ᓯᓚᑐᓂᖏᓐᓂᒃ. ᑕᐃᒪᓐᓇᐃᑦᑐᓄᑦ ᐱᔾᔪᑎᖃᖅᑐᓂᒃ ᓯᕗᓕᖅᑎᐅᓗᓂ ᐃᓱᒪᒃᓴᖅᓯᐅᖅᑎᐅᕙᓚᐅᕐᓂᖓ ᐊᒻᒪᓗ ᐃᓕᓴᐃᔨᐅᓚᐅᕐᓂᖓᓗ ᖃᐅᔨᒪᔭᐅᑦᑎᐊᕋᓗᐊᖅᑎᓪᓗᒋᑦ," +
      "ᑲᑎᓗᒍ ᐃᒻᒥᓂᒃ ᐊᖏᔫᑎᑦᑎᕙᓚᐅᖖᒋᑦᑐᖅ ᐊᒻᒪᓗ ᐃᓚᒋᔭᒥᓂᒃ ᑲᒪᑦᑎᐊᖅᑑᓪᓗᓂ. ᐊᒃᓱᕈᕈᑎᒋᓪᓗᓂᒋᑦ ᓄᓇᐊᓗᒻᒥᒃ ᓇᒡᓕᓱᒍᓐᓂᕐᒥᓄᑦ. ᐃᓄᐃᑦ ᐃᓅᓯᖓᑦ ᓱᕈᓯᐅᓚᐅᖅᓯᒪᓂᕐᒥᓂᑦ" +
      "ᐃᓅᓯᐅᕙᓚᐅᖅᑐᒥᑦ ᓱᒃᑲᓕᓗᐊᒻᒪᕆᒃᑐᒥᒃ ᐊᓯᔾᔨᖅᐸᓪᓕᐊᓂᖃᓚᐅᕐᒪᑦ ᐊᒻᒪᓗ ᑕᑯᖃᑦᑕᖅᓯᒪᓪᓗᓂ ᖃᓄᖅ ᐊᓯᔾᔨᖅᐸᓪᓕᐊᓂᐅᔪᑦ ᐃᓚᒋᔭᒥᓄᑦ ᐊᒃᑐᐃᓂᖃᖅᓯᒪᓂᖏᓐᓄᑦ. ᑐᐊᕕᐅᕐᓇᖅᑎᓯᒪᓚᐅᕐᒪᒋᑦ" +
      "ᐱᓕᕆᐊᒃᓴᒥᓂ ᒪᒃᑯᒃᑑᓕᕐᓂᐊᖅᑐᑦ ᐃᑉᓕᕈᓱᑦᑎᐊᖁᓪᓗᓂᒋᑦ ᓯᕗᓕᕕᓂᕐᒥᑕ ᐱᐅᒻᒪᕆᒃᑐᒥᒃ ᐱᑕᖃᐅᖅᑐᒥᒃ ᐱᐅᓯᕆᕙᓚᐅᖅᑕᖏᓂᒃ — ᐊᒻᒪᓗ ᑕᒪᒃᑯᓂᖓ ᑎᒍᒥᐊᓕᕐᓗᑎᒃ, ᓇᖕᒥᓂᖅᑕᐅᖅ" +
      "ᓴᖖᒋᓂᖃᕐᓂᕐᒥᓐᓂᒃ ᐊᓂᒍᐃᔪᓐᓇᕋᓱᒋᐊᒧᑦ ᖃᐅᔨᓯᒪᓕᖁᓪᓗᓂᒋᑦ. ᑕᐃᔅᓱᒪᓂᒃᑲᓐᓂᖅ ᐅᑭᐅᓂ ᐳᓛᕆᐊᖅᓯᒪᑎᓪᓗᖓ ᐊᐃᐱᓛᕐᔪᒻᒥᒃ, ᐃᓐᓇᐅᓕᖅᑐᑦ ᕿᑐᕐᖓᕆᔭᖏᑦ, ᐃᕐᖑᑕᖏᑦ, ᐊᒻᒪᓗ ᐃᓗᓕᖏᑦ" +
      "ᐊᖏᕐᕋᕆᔭᖓᓄᑦ ᐃᑎᖅᐸᓚᐅᖅᐳᑦ ᐊᓂᓕᖅᐸᒃᑐᑎᓪᓗ ᖁᕕᐊᓱᓐᓂᖅᓴᐅᓕᖅᑐᑎᒃ. ᐅᓂᒃᑲᐅᑎᕙᓚᐅᕐᒪᒋᑦ ᓂᐱᒃᑭᐊᓘᕝᕕᒋᓇᒋᑦ ᓱᓇᑐᐃᓐᓇᓂᒃ ᓴᖖᒋᓂᖃᕐᕕᐅᔪᓂᒃ ᑐᓵᒋᐊᒥᒃ ᖁᕕᐊᒋᓗᒃᑖᖅᑕᑦᑎᓐᓂᒃ." +
      "ᐃᓚᖏᓐᓄᑦ ᐃᓕᓐᓂᐊᕐᓂᓕᕆᔨᒃᑯᑦ ᐃᓕᓐᓂᐊᖅᑎᑦᓯᔾᔪᑎᔅᓴᓕᕆᔨᖏᑕ ᐃᓄᑐᖃᕆᔭᐅᔪᑦ ᖃᐅᔨᒪᔨᐅᓪᓗᑎᒃ ᑲᑎᒪᓂᖃᖅᑎᓪᓗᒋᑦ ᐅᐸᒍᑎᓯᒪᑐᐊᕌᖓᒪ, ᐅᖃᓪᓚᐅᓯᐅᕙᓪᓕᐊᔪᑦ ᐃᓚᖏᓐᓄᑦ ᐊᐅᐱᓛᕐᔪᒃ" +
      "ᐅᖃᐅᓯᒃᓴᒥᓂᒃ ᓴᖅᑮᖏᓐᓇᐅᔭᖅᐸᓚᐅᕐᐳᖅ, ᑕᒪᑦᑕᓗ ᑕᐃᑲᓃᖃᑕᐅᔪᑎᒍᑦ ᑐᓵᑦᑎᐊᕐᓂᖅᓴᐅᓕᕆᐊᖅᐸᒃᑐᑕ, ᐃᓚᒋᓪᓗᒋᑦ, ᖃᐅᔨᖃᑦᑕᓕᖅᑐᖓ, ᐃᓐᓇᕆᔭᐅᖃᑕᐅᔪᑦ. ᓇᓗᓇᖖᒋᒻᒪᕆᓚᐅᕐᐳᖅ," +
      "ᐱᐅᓂᖅᓴᐅᑎᖖᒋᓐᓇᒥ ᐃᒻᒥᓂᒃ ᖃᐅᔨᒪᓇᕋᓗᐊᖅᑐᓂ, ᐊᓯᒥᑕᓗ ᐅᖃᐅᓯᒃᓴᕆᔭᖏᓂᒃ ᓈᓚᑦᑎᐊᖏᓐᓇᖅᐸᒃᑐᓂ, ᓂᓪᓕᐅᓯᕆᒋᐊᖅᑕᖏᑦ ᐅᖃᓪᓚᐅᓯᕆᔭᐅᔪᓄᑦ ᐃᑎᔪᒻᒪᕆᐊᓗᒻᒥᒃ ᑐᑭᓯᓇᖅᑑᕙᓚᐅᕐᒪᑕ" +
      "ᓯᓚᑐᒻᒪᕆᒃᑑᓪᓗᑎᒃᓗ. ᑕᐃᒪᓐᓇᐃᓚᐅᖅᓯᒪᒻᒥᔪᖅ ᐊᓯᖏᓂᑦᑕᐅᖅ ᑲᑎᒪᓂᐅᕙᒃᓯᒪᒻᒥᔪᓂ. 2002- ᖑᑎᓪᓗᒍ ᑲᖏᖅᖠᓂᕐᒥ ᐃᓄᒃᑎᑐᑦ ᐃᓕᓂᐊᖅᑎᑦᑎᓪᓗᖓ ᐅᖃᕆᐅᖅᓴᔪᓄᑦ" +
      "ᐃᓕᓐᓂᐊᖅᑎᑉᐸᓪᓕᐊᔭᕗᑦ ᐊᐱᖅᑯᓯᒃᓴᕆᓂᐊᖅᑕᒥᓐᓂᒃ ᐋᖅᑭᒃᓱᐃᕙᒌᖅᓯᒪᑎᓪᓗᒋᑦ. ᐊᐱᕆᕙᒌᔭᓚᐅᕐᒪᒋᑦ ᓯᕗᕐᖓᓂ ᐊᐱᖅᑯᓯᒃᓴᒥᓐᓂᒃ ᑎᑎᕋᖅᓯᒪᓂᐊᖁᓪᓗᓂᒋᑦ ᐃᓅᓯᕐᒥᓂ ᐃᓚᖏᓂᒃ" +
      "ᐊᑐᖅᓯᒪᔭᒥᓂᒃ ᐅᓂᒃᑲᐅᓯᖃᖅᑳᕐᑎᓪᓗᒍ. ᐅᖃᐅᓯᕆᓂᐊᖅᑕᒥᓂᒃ ᐅᖃᓪᓚᐅᓯᖃᖅᑐᓂ, ᐱᐅᓯᑐᖃᒥ ᓴᓇᕐᕈᑎᒋᕙᒃᑕᒥᓂᒃ ᐅᓂᒃᑲᐅᓯᖃᖅᑎᓪᓗᒍ, ᑕᒪᕐᒥᑲᓴᑦᑎᐊᖅ ᑕᐃᑲᓃᖃᑕᐅᔪᑦ ᐅᔾᔨᕈᓱᓕᓚᐅᖅᐳᑦ" +
      "ᐊᐱᖅᑯᓯᒃᓴᕆᓚᐅᖅᑕᑎᒃ ᑭᐅᔭᐅᕌᓂᒃᓯᒪᓕᕐᒪᑕ ᐅᕝᕙᓘᓐᓃᑦ ᐊᑐᕐᓂᖃᔾᔮᖖᒋᓐᓂᖏᓂᒃ! ᒪᓕᒐᓕᕆᓂᕐᒧᑦ ᖃᐅᔨᓴᖅᑎᐅᔪᒥᒃ ᐃᖃᓗᓐᓂᑦ ᓴᓂᓕᖃᓚᐅᕋᒪ ᑕᑯᓪᓗᖓᓗ ᐊᐱᖅᑯᓯᒃᓴᕆᓂᐊᖅᑕᒥᓂᒃ" +
      "ᑎᑎᕋᕐᓯᒪᖃᑕᐅᒻᒪᑦ. ᑎᑎᕋᕐᕕᒃᓴᒥᓂ ᑎᑎᕋᖅᓯᒪᔪᓂᒃ, “ ᐃᓄᒃᑎᑐᑦ ᐅᖃᐅᓯᖅ ᐃᓕᒋᐊᒥᒃ ᐊᔪᕐᓇᕐᓂᖅᐹᕆᓯᒪᒐᒃᑯ. ᓱᓇᓂᒃᓕ ᐊᔪᕐᓇᕐᓂᖅᐹᖑᔪᓂᒃ ᐃᓕᓯᒪᓕᓚᐅᖅᐱᑦ? ᓲᕐᓗᓘᓐᓃᑦ," +
      "ᐊᐅᐱᓛᕐᔪᒃ ᐅᖃᓪᓚᐅᓯᖃᕆᐊᕋᒥ ᓇᐃᓈᖅᓯᒪᓪᓗᒋᑦ ᐋᖅᑭᒃᓱᖅᐸᓪᓕᐊᓚᐅᕐᒪᒋᑦ ᓴᓇᕐᕈᑎᒋᕙᒃᑕᓂ ᐅᖃᓕᖅᑐᓂᓗ, “ ᐅᑯᐊ ᐊᔪᕐᓇᕐᓂᖅᐹᖑᓚᐅᖅᑐᑦ ᐃᓅᓯᓐᓂ ᐊᑐᕈᓐᓇᓕᕆᐊᒥᒃ. . . \"" +
      "ᑎᒍᒥᐊᖅᑐᓂᐅᒃ ᒥᑭᑦᑐᒻᒪᕆᑯᓗᒃ ᓇᑦᑎᐅᑉ ᐊᓂᕐᓂᖓᓂᒃ ᖃᐅᔨᒋᐊᕈᑎᐅᔪᖅ. ᑕᐃᒪᓕ ᓱᓇᓕᒫᓄᑦ ᖃᓄᐃᓐᓂᐅᔫᒐᓗᐊᓄᑦ, ᑏᑐᖃᑎᖃᕐᓂᕐᒥᓂ ᐊᖏᕐᕋᒥᓂ ᑲᑎᒪᕝᕕᒻᒥ ᑲᑎᒪᔪᓃᓪᓗᓂ ᐊᒻᒪᓗ" +
      "ᐃᓕᓐᓂᐊᕐᕕᓐᓃᓪᓗᓂ — ᑭᓇᑐᐃᓐᓇᖅ ᐃᓄᒃ ᓇᓗᒋᔭᐅᖖᒋᓐᓂᕐᒥᓂᒃ ᐃᒃᐱᒍᓱᓕᖅᐸᓚᐅᖅᑐᑦ, ᑭᓯᐊᓂᓗ ᑕᐃᒪᐃᑎᓪᓗᒋᑦ, ᓇᓗᓇᐃᖅᓯᕝᕕᐅᓂᕐᒥᓐᓂᒃᑕᐅᖅ, ᖃᐅᔨᓪᓗᑎᒃᓗ ᐊᒻᒪᓗ ᑐᑭᓯᓪᓗᑎᒃᓗ" +
      "ᖁᕕᐊᒋᔭᐅᖃᑕᐅᓂᕐᒥᓐᓂᒃ. ᐅᖃᓪᓚᖃᑎᒌᑦᑎᐊᕐᓂᐅᔪᑦ ᐃᖏᕐᕋᑦᑎᐊᖅᐸᓪᓕᐊᕙᓚᐅᖅᓯᒪᔪᑦ ᐊᒃᓱᕈᓕᕐᓇᖅᑐᖃᖖᒋᑦᑎᐊᖅᑐᑎᒃ. ᐅᑭᐅᖃᖃᑎᒋᓪᓗᓂᒋᑦ ᐃᓄᑐᖃᕆᔭᐅᖃᑎᒥᓂᑦ, ᐊᐅᐱᓛᕐᔪᒃ ᓄᓇᒥ" +
      "ᐃᕐᓂᐊᖑᓚᐅᖅᓯᒪᕗᖅ ᓄᓇᖃᖃᑕᐅᓪᓗᓂᓗ ᐃᓄᒋᐊᓗᐊᖖᒋᑦᑐᒥ ᑎᑭᑦᑐᒍ ᐃᓐᓇᐅᓕᕐᓂᕐᒥᓄᑦ ᓇᖕᒥᓂᖅ ᐃᒡᓗᒥᐅᖃᑎᖃᓕᖅᑐᓂ, ᑭᖑᓂᐊᓂᓗ, ᓄᓇᖃᖃᑕᐅᕙᓕᖅᑐᓂ ᐃᓄᒋᐊᖖᒋᒻᒪᕆᒃᑐᓂ" +
      "ᐅᖓᓯᒃᑐᒥᐅᖑᓪᓗᑎᒃ ᓄᓇᓕᐅᔪᓂ. ᑭᓯᐊᓂᓗ ᑕᐃᒪᓐᓇᐃᒃᑲᓗᐊᖅᑎᓪᓗᒋ, ᐅᑭᐅᓄᑦ ᐊᕙᑎᓄᑦ ᑭᖑᓪᓕᕆᓂᐊᖅᑕᖏᓄ ᐃᓅᓂᕐᒥᓂ ᐊᒥᓱᑲᓪᓚᓐᓄᑦ ᓄᓇᓕᐅᔪᓄᑦ ᓂᐅᕐᕈᖃᑦᑕᓕᓚᐅᕐᐳᖅ, ᐱᓗᐊᖅᑐᒥᒃ" +
      "ᑲᓇᑕᐅᑉ ᐃᓗᐊᓂ, ᐱᓕᕆᖃᑎᒋᔭᖅᑐᕐᐸᒃᑐᓂᒋᑦ ᐃᓅᖃᑎᒋᔭᓂ, ᐃᖅᑭᓖᑦ, ᐊᓪᓚᖓᔪᑦ, ᑲᓇᑕᒧᑦ ᓄᒃᑎᖅᑳᓚᐅᖅᓯᒪᔪᕕᓃᑦ ᑭᖑᕚᕆᔭᖏᑦ ᐊᒻᒪᓗ ᓄᓇᑖᕆᐊᖅᓯᒪᔪᓂᒃᓗ, ᐋᖅᑭᒃᓱᖅᐸᓪᓕᐊᓕᖅᑐᓂᒋᑦ" +
      "ᐃᓱᒪᓐᓂᓯᕆᕙᓪᓕᐊᔭᓂ ᐅᐊᔭᖅᐸᓐᓂᕐᒥᓂᑦ ᐃᓕᓴᕙᓪᓕᐊᔾᔪᑎᒃᓴᐅᓂᐊᖅᑐᑎᒃ ᑕᑯᒃᓴᐅᑎᑦᑎᓂᕐᒧᑦ ᐃᓄᐃᑦ ᓯᕗᓂᒃᓴᕆᓕᕐᓂᐊᖅᑕᖏᓄᑦ ᐱᔾᔪᑎᖃᖅᑐᓂᒃ. ᐊᐅᐱᓛᕐᔫᑉ ᐃᓅᓂᕆᓚᐅᖅᑕᖓ" +
      "ᓄᓇᕗᒻᒥᐅᖑᓪᓗᓂ ᐊᑐᕐᕕᒋᓚᐅᖅᐹ ᐊᒥᓱᐃᒻᒪᕆᐅᔪᑎᒍᑦ ᐃᓅᓯᖅ ᐊᓯᔾᔨᖅᐸᓪᓕᐊᓂᖃᖅᑐᓂ, ᐊᑐᖅᓯᒪᔭᖏᑦ ᐃᓅᓯᕐᒥᓂ ᐊᔾᔨᒋᔭᐅᕐᓚᒃᐳᑦ ᐊᑐᖅᑕᐅᓯᒪᒻᒥᔪᓂᑦ ᐃᓄᑐᖃᕆᔭᐅᔪᓂᑦ — ᐃᓄᑐᖃᐅᖃᑎᖏᑦ" +
      "ᐱᕈᖅᓴᔭᐅᓚᐅᖅᓯᒪᒻᒪᑕ ᐊᒻᒪᓗ ᐃᓕᓐᓂᐊᖅᑎᑕᐅᓪᓗᑎᒃ ᓄᓇᒥᐅᑕᐅᓂᖏᓐᓂ ᐃᓐᓇᕈᖅᓯᒪᔪᑐᖃᐅᓕᕐᓂᖏᓐᓄᑦ ᑎᑭᑦᑐᒋᑦ, ᐅᐊᔭᖅᑎᐅᓪᓗᑎᒃ ᐃᓅᓯᖃᖅᑑᓪᓗᑎᒃ ᐊᒻᒪᓗ ᓄᓇᒧᑦ ᑐᖖᒐᕝᕕᖃᖅᑐᑎᒃ" +
      "ᓇᖕᒥᓂᖅ ᐊᐅᓚᑦᑎᓂᖃᕐᕕᐅᔪᓐᓇᖅᑐᑉ ᐃᓗᐊᓂ. ᐃᕐᓂᐊᖑᓚᐅᖅᓯᒪᕗᖅ ᐊᖓᔪᒃᑎᖅᐸᕆᔭᐅᓪᓗᓂ ᐃᕐᓂᖅᑖᕆᔭᐅᓚᐅᕐᐳᖅ ᕼᐃᐅᑎᓐᓄᐊᕐᒥᑦ ᐊᒻᒪᓗ ᑯᒪᒃᕼᐃᐅᒻᒥᑦ ᐊᐅᔭᖓᓂ 1919 — ᑭᒃᑐᕆᔾᔨᖅᑎ'" +
      "ᓗᒍ. ᐊᑕᐅᓯᕐᒥᒃ ᐃᒻᒥᓂᑦ ᐊᖓᔪᒃᑎᐅᔪᒥᒃ ᓇᔭᖃᓚᐅᕐᐳᖅ, ᒪᕐᕉᓐᓂᒃ ᓄᑲᖅᑏᓐᓂᒃ ᓇᔭᖃᖅᑐᓂ ᐊᒻᒪᓗ ᐱᖓᓱᓂᒃ ᓄᑲᖃᖅᑐᓂ. ᐃᕐᓂᐊᖑᓚᐅᖅᓯᒪᕗᖅ ᐃᓚᒋᔭᒥᑕ ᐃᑦᑕᖓᓂ ( ᓇᑦᑎᕐᒥᑦ" +
      "ᑐᐱᓕᐊᕆᔭᐅᓯᒪᔪᖅ) ᑲᔾᔮᓐᓇᒻᒪᕆᒃᑑᓪᓗᓂ ᐱᕈᖅᑐᖃᐅᖅᑑᓪᓗᓂᓗ ᐊᐃᐱᓛᕐᔫᑉ ᑰᖓᑕ ᓯᒡᔭᖓᓂ, ᑰᒑᕈᑉ ( ᑰᒑᕐᔪᒃ) , ᓄᓇᕗᒻᒥ ᓄᓇᓕᖓᑕ ᖃᓂᑦᑐᓂ. ᑕᐃᓐᓇ ᑰᖓ ᑕᐃᔭᐅᒐᔪᒃᑐᖅ “ᑰᒃ" +
      "ᒪᔪᖅᑐᓕᐊᓗᖕᒥᒃ\" ( ᓱᓇᑕᖃᐅᖅᑐᖅ ᑰᒃ) ᓇᑦᑎᓕᖕᒥᐅᓂᑦ ᐱᔾᔪᑎᒋᓪᓗᒍ ᐃᑉᓕᕆᔭᐅᔾᔪᑎᖃᕐᒪᑦ ᐃᖃᓗᒃᐱᒃᑕᖃᐅᖅᐸᓐᓂᖓᓄᑦ ᒪᔪᕋᖅᐸᓪᓕᐊᔪᓂᒃ. ᐊᑦᓯᖅᑕᐅᓚᐅᖅᓯᒪᕗᖅ ᐃᖅᑲᐅᒪᔾᔪᑎᒋᓪᓗᒍ" +
      "ᐊᒃᑲᖓᑕ ᓄᓕᐊᕆᓚᐅᖅᓯᒪᔭᖓᓄᑦ. ᐅᖃᐅᑎᓚᐅᖅᓯᒪᕚᖓ ᐊᓯᖏᓂᒃᑕᐅᖅ ᐊᑎᖃᕋᓗᐊᕐᒥᒐᒥ ᐊᑐᖅᑕᐅᒐᔪᖖᒋᓐᓂᖅᓴᓂᒃ ᓲᕐᓗ ᐃᒻᖏᔾᔭᖅ, ᑭᒃᖢ, ᐊᒻᒪᓗ ᐊᓇᐃᔾᔭᖅ, ᐊᒻᒪᓗ ᐊᕝᕙᖃᕐᒥᒐᒥ (" +
      "ᐊᑎᖃᑎᒥᓂᒃ ᐃᓚᒋᓪᓗᓂᐅᒃ) ᓇᐅᔮᓂᕐᒥᐅᒥᒃ ᐊᑦᓯᖅᑕᐅᓯᒪᔪᒥᒃ ᓴᐅᒥᖕᒥᒃ ᑕᐃᔭᐅᕙᒻᒥᔪᒥᒃᑕᐅᖅ ᕼᐊᐅᓐᓄᐊᕐᒥᒃ. ᑭᖑᓂᐊᓂᓗ ᐸᑉᑎᑕᐅᒐᒥ ᐊᑦᓯᖅᑕᐅᓕᓚᐅᖅᓯᒪᔪᖅ “ ᒫᕆᐋᓄ\" - ᒥᒃ" +
      "ᐃᒃᓯᕋᕐᔪᐊᒥᑦ. ᐊᔾᔨᒌᖖᒍᐅᖅᑐᑎᒍᑦ ᐊᑎᖓ ( ᐊᐅᐱᓛᕐᔪᒃ - Aupilarjuk) ᖃᓪᓗᓈᑎᑐᑦ ᑎᑎᕋᖅᑕᐅᕙᒃᐳᖅ, ᑭᓯᐊᓂᓗ ᑖᓐᓇ ᐃᕐᓂᖓᑕ ᑎᑎᕋᖅᑕᐅᔾᔪᓯᖓᓂ ᓇᓗᓇᐃᖅᑕᐅᓚᐅᕐᐳᖅ. ᐊᑎᖓ" +
      "ᑐᓵᔾᔪᓯᕐᒧᑦ ᒪᓕᒃᑎᑕᐅᓪᓗᓂ ᑎᑎᕋᖅᑕᐅᕙᒃᓯᒪᕗᖅ Aupilaarjuk- ᒥᒃ ᐊᒻᒪᓗ ᒪᓕᒃᑎᑕᐅᓯᒪᖖᒋᑦᑐᓂ Aupilardjuk- ᒥᒃ. ᐱᐅᓯᑐᖃᖓᑦ ᐃᓄᐃᑦ ᒪᓕᒃᑐᒍ ᐃᓅᓚᐅᕐᐳᖅ, ᓯᕗᓕᕕᓂᓂ" +
      "ᒪᓕᒃᑐᒋᑦ, ᐃᓐᓇᑐᖃᐅᓕᕐᓂᕐᒥᓄᑦ ᑎᑭᑦᑐᒍ, ᑭᓯᐊᓂᓗ ᐊᖏᓪᓕᕙᓪᓕᐊᖏᓐᓇᖅᑐᓂ ᓯᓚᑖᓂᕐᒥᐅᓂᑦ ᐃᓅᓯᕆᔭᐅᔪᓂᑦ ᐊᒃᑐᖅᑕᐅᕙᓪᓕᐊᒋᓪᓗᓂ ᑲᑎᓯᕙᓪᓕᐊᓗᓂᓗ. ᑕᐃᔅᓱᒪᓂᐅᓚᐅᕐᑐᖅ," +
      "ᐃᑲᔪᕈᒪᒃᑲᐅᒐᒥ ( ᑕᐃᒪᓐᓇ ᐃᒻᒥᓂᒃ ᐃᓕᖅᑯᓯᖃᕐᓂᕋᖅᐸᒃᑐᓂ) , ᐃᑲᔪᖅᑎᒋᔭᐅᔪᒪᒐᔪᓚᐅᖅᓯᒪᕗᖅ ᑲᔪᐊᓗᒻᒥᑦ ( ᐃᒃᓯᕋᕐᔪᐊᕐᒥᑦ ᐊᑖᑕ ᐱᐊᕆ ᕼᐃᐊᓐᕆ) , ᐃᒃᓯᕋᕐᔪᐊᕐᒥᐅᓂ" +
      "ᐊᔪᕆᖅᓱᐃᔨᐅᓚᐅᖅᑐᒥᑦ ᑰᒑᕈᕐᒥ, ᐊᒻᒪᓗ ᑑᓚᐃᓐᒥ ᓴᓇᔨᐅᔪᓂᑦ ᐊᒻᒪᓗ ᓄᓇᐃᓐᓇᒥ ᖃᐅᔨᓴᖅᑎᐅᔪᓂᑦ. ᐊᔾᔨᒌᖖᒋᐅᖅᑐᑎᒍ ᐱᓕᕆᔨᒋᔭᐅᕙᓚᐅᖅᐳᖅ, ᑭᓯᐊᓂᓗ ᐃᓚᖃᖅᐸᒃᑭᓪᓗᑎᒃ" +
      "ᐊᒃᔭᖅᑐᐃᔨᐅᕙᓐᓂᕐᒧᑦ ᐱᖁᑎᔅᓴᖏᓂᒃ ᐱᓕᕆᔨᐅᔪᑦ, ᐊᐃᒃᖠᖅᑎᒋᔭᐅᕙᒃᑐᓂᓗ ᓯᑯᒥᒃᓗ ᐃᒥᖁᑎᔅᓴᕆᔭᐅᓂᐊᖅᑐᒥᒃ ᐃᒥᖅᑕᕐᑎᐅᕙᒃᑭᓪᓗᓂ, ᐊᒻᒪᓗ ᐃᑲᔪᖅᐸᒃᑐᓂᒋᑦ ᖃᐅᔨᒪᓂᐊᓗᒻᒥᓄᑦ ᓄᓇᒥᒃ" +
      "ᐊᒻᒪᓗ ᓇᐅᒃᑰᕆᐊᖃᕐᓂᖏᓄᑦ. ᐊᐅᐱᓛᕐᔪᒃ ᓄᓕᐊᖅᑖᓚᐅᖅᓯᒪᕗᖅ ᑐᓕᒫᕐᒥᒃ ᑐᒃᓯᐊᕐᕕᒻᒥ ᑲᑎᑎᑕᐅᓪᓗᑎᒃ ᒪᓕᒃᓗᒋᑦ ᑎᑎᖅᑲᖁᑎᒋᔭᐅᔪᑦ 1942- ᒥ. ᑭᓯᐊᓂᓗ, ᓄᑲᑉᐱᐊᑯᓘᑎᓪᓗᒍ ᐊᓈᓇᖓᑕ" +
      "ᐅᖃᐅᑎᓚᐅᖅᓯᒪᓐᓂᖅᑐᓂᐅᒃ “ᓄᑕᕋᓛᖅ ᐸᓂᐅᒃᐸᑦ, ᓄᓕᐊᒃᓴᕆᓂᐊᖅᑕᐃᑦ. . . ” ᑎᒃᑯᐊᖅᑐᕐᑐᓂᐅᒃ ᓯᖓᐃᔪᖅ ᐊᕐᓇᖅ, ᐸᓂᒃᑖᓕᓚᐅᕐᓯᒪᔪᖅ ᑕᐃᓐᓇ ᑐᓕᒫᕐᒥᒃ. ᐅᑭᐅᓪᓗᐊᒥᒃ" +
      "ᓯᕗᓪᓕᐅᓪᓗᓂ ᓄᓕᐊᕆᓚᐅᖅᑕᖓ ᑐᖁᓚᐅᖅᓯᒪᕗᖅ, ᑕᐃᒪᓕ ᐊᐃᑉᐸᕇᓚᐅᕐᑑᒃ 69- ᓂᒃ ᐅᑭᐅᓂᒃ, ᐅᓂᒃᑳᒃᓴᕆᔭᖏᒃ ᐊᒻᒪᓗ ᐃᓅᖃᑎᒌᓚᐅᖅᓯᒪᓂᖏᑦ ᐅᖓᑖᓄᐊᖅᓯᒪᒻᒪᕆᒃᑐᑦ 70 ᐅᑭᐅᓂᑦ" +
      "ᐊᐃᑉᐸᕇᒃᑎᓪᓗᒋᒃ, ᓇᓪᓕᒋᑐᕋᐅᑎᓪᓗᒋᒃ ᐊᒻᒪᓗ ᓱᕈᓯᕐᒥᓐᓂᒃ ᐱᕈᖅᓴᐃᓪᓗᑎᒃ. ᐱᖃᓯᐅᑎᓇᒋᑦ ᑕᐃᒃᑯᐊ ᓱᕈᓰᑦ ᑐᖁᓚᐅᖅᓯᒪᔪᑦ ᓄᑕᕋᓛᖑᓪᓗᑎᒃ, ᐱᕈᖅᓴᐃᖃᑎᒌᓚᐅᖅᐴᒃ ᑲᑎᑦᑐᒋᑦ 8- ᓂᒃ" +
      "ᓱᕈᓯᕐᒥᓐᓂᒃ, ᐃᓚᖃᖅᑐᒋᑦ ᓯᑕᒪᓂᒃ ᐸᓂᒻᒥᓐᓂᒃ ᐊᒻᒪᓗ ᓯᑕᒪᓂᒃ ᐃᕐᓂᕐᒥᓐᓂᒃ. ᑕᒪᕐᒥᒃᓗ ᐆᒪᓚᐅᖅᐳᒃ ᑎᒍᒥᐊᕆᐅᖅᑐᑎᒃ ᖁᕕᐊᓇᒻᒪᕆᒃᑑᓪᓗᓂ ᐃᓗᓕᕆᔭᒥᒃᑕ ᓄᑕᕋᓛᖏᓂᒃ. 40- ᐅᔪᓂ" +
      "ᐅᑭᐅᓂ, ᐊᐅᐱᓛᕐᔪᒃ ᐊᖏᔪᒻᒪᕆᒻᒥᒃ ᐊᒃᓱᕈᕈᑎᒋᒻᒪᕆᒃᑐᓂᐅᒃ ᐃᑲᔪᖅᑐᐃᔨᐅᓚᐅᖅᓯᒪᕗᖅ ᐃᓕᓐᓂᐊᕐᓂᓕᕆᓂᕐᒧᑦ ᑎᒥᖁᑎᒋᔭᐅᔪᓄᑦ, ᐊᒻᒪᓗ ᖃᐅᔨᒪᔨᒋᔭᐅᕙᒃᑐᓂ ᐊᔾᔨᒌᖖᒋᐅᖅᑐᓄᑦ" +
      "ᒐᕙᒪᐅᔪᐃᑦ ᐱᓕᕆᐊᕆᓕᖅᓯᒪᔭᖏᓄᑦ ᐊᒻᒪᓗ ᐃᖅᑲᓇᐃᔭᖅᑎᒋᔭᐅᔪᓄᑦ ᒐᕙᒪᐅᔪᓂ. ᑕᒪᒃᑯᐊ ᐃᓚᖃᓚᐅᖅᐳᑦ ᐃᖅᑲᖅᑐᐃᕝᕕᓕᕆᔨᒃᑯᓐᓂᒃ, ᐋᓐᓂᐊᕐᓇᖃᖖᒋᑦᑐᓕᕆᔨᑦ ᐊᒻᒪᓗ ᐃᓅᓯᓕᕆᔨᒃᑯᑦ," +
      "ᐊᒻᒪᓗ ᐱᕈᒃᑲᓐᓂᕈᓐᓇᖅᑐᓕᕆᔨᒃᑯᓐᓂᒃ, ᑕᐃᑐᐃᓐᓇᕐᓗᒋᑦ ᑖᒃᑯᐊᑐᐃᓐᓇᐃᑦ. ᖁᓕᓪᓗ ᐅᑭᐅᑦ ᐅᖓᑖᓄᐊᖅᑐᒍ ᖃᐅᔨᒪᔨᒋᔭᐅᖃᑦᑕᖅᓯᒪᓪᓗᓂ ᐃᓕᓐᓂᐊᕐᓂᓕᕆᔨᒃᑯᑦ" +
      "ᐃᓕᓐᓂᐊᖅᑎᑦᓯᔾᔪᑎᒃᓴᓕᕆᔨᖏᓄᑦ ᐃᓄᒃᑎᑐᑦ ᐃᓱᒪᔾᔪᓯᓕᕆᓂᕐᒥ ᐊᒻᒪᓗ ᐃᑉᓕᕆᔭᐅᔪᓂᒃ. ᐃᓚᐅᖃᑎᒋᓪᓗᓂᒋᑦ ᐃᓄᑐᖃᐃᑦ ᑎᒥᒋᔭᖏᑦ, ᐃᑲᔪᖅᑎᒋᔭᐅᒻᒪᕆᓚᐅᕐᐳᖅ ᐃᓕᓐᓂᐊᖅᑎᑦᑎᔨᐅᔪᑦ" +
      "ᐋᖅᑭᒃᓱᐃᕙᓪᓕᐊᓂᖏᓂ ᐊᔾᔨᖃᕋᑎᒃ ᐃᓄᒃᑎᑑᖅᑐᓂᒃ ᐃᓕᓐᓂᐊᖅᑎᑦᓯᔾᔪᑎᒃᓴᐃᑦ ᐋᖅᑭᐅᒪᓂᕆᓂᐊᖅᑕᖏᓂᒃ. ᑕᑯᔅᓴᐅᑎᑦᑎᓯᒪᔪᓂᒃ ᐊᑐᕐᓂᖃᒻᒪᕆᒃᑑᓪᓗᑎᒃ ᐃᓱᒪᔾᔪᓯᐅᔪᓄᑦ ᐃᑲᔪᕈᑎᐅᕙᒃᑐᓄᑦ" +
      "ᒪᓕᒐᖁᑎᓕᕆᓂᕐᒥ ᐊᒻᒪ ᐃᖅᑲᖅᑐᐃᔨᓕᕆᓂᕐᓂ ᓄᓇᕗᒻᒥ — ᐊᒻᒪᓗ ᐊᑯᓐᓂᖏᓃᑦᑐᑎᒃ ᐊᒥᓲᓪᓗᑎᒃ ᐊᓯᖏᓄᑦ ᐃᓕᑕᕆᔭᐅᔾᔪᑎᑖᕆᓯᒪᔭᖏᓂᑦ — ᐃᓕᓴᐃᔨᕐᔪᐊᖑᓂᕐᒧᑦ ᐃᓕᑕᕆᔭᐅᔾᔪᑎᑖᓚᐅᖅᓯᒪᕗᖅ" +
      "ᐳᕆᓐᔅ ᐃᑦᕗ ᐊᐃᓚᓐᒥ ᓯᓚᑦᑐᖅᓴᕐᕕᖓᓂᑦ 2009- ᖑᑎᓪᓗᒍ. ᐊᐅᐱᓛᕐᔪᒃ ᓇᓗᓇᐃᒻᒪᕆᒃᑐᒥᒃ ᐃᑲᔪᖅᓯᒪᕗᖅ ᑐᑭᓯᐅᒪᓕᖅᑎᑦᑎᒋᐊᒧᑦ ᐃᓄᐃᑦ ᐃᓅᖃᑎᒌᒃᐸᓐᓂᖏᓄᑦ ᒪᓕᒐᖁᑎᒋᔭᐅᕙᒃᑐᓂᒃ," +
      "ᐱᖁᔭᖁᑎᖏᓂᒃ, ᐊᒻᒪᓗ ᐱᐅᓯᑐᖃᕆᕙᒃᑕᖏᓂᒃ ᑕᒪᕐᒥᒃᓗ ᐊᑕᓪᓚᕆᒃᑑᓚᐅᖅᑐᑎᒃ ᒪᒃᑯᓐᓂᖅᓴᐅᓪᓗᓂ ᐃᓅᓯᖓᓄᑦ ᑭᓯᐊᓂᓗ ᐊᓯᐅᔨᕙᓪᓕᐊᕋᐅᔭᖅᓯᒪᓪᓗᓂᒋᑦ ᐃᓅᓯᕐᒥᓂ. ᐱᔾᔪᑎᖏᓪᓗᒍ ᐃᓄᐃᑦ" +
      "ᐱᐅᓯᑐᖃᑎᒃ ᒪᓕᒃᑐᒍ ᐃᓅᓯᖓᑦ ᐃᓇᖏᖅᑕᐅᕙᓪᓕᐊᓕᓚᐅᕐᒪᑦ ᐅᓪᓗᒥᓂᑕᕐᓂᑦ ᐱᓕᕆᔾᔪᑎᓂᑦ ᐊᒻᒪᓗ ᓴᓇᕝᕕᓐᓂᑦ, ᐊᐅᐱᓛᕐᔪᒃ ᐊᖏᓪᓕᕙᓪᓕᐊᖏᓐᓇᖅᑐᒥᒃ ᐃᖅᑲᐅᒪᓂᖃᖃᑦᑕᓕᓚᐅᖅᐳᖅ" +
      "ᐱᐅᓯᑐᖃᕆᔭᐅᔪᒥᒃ ᐊᒻᒪᓗ ᐱᒻᒪᕆᐅᑎᐅᓂᖏᑕ ᑕᒪᒃᑯᐊ ᐊᓯᔾᔨᖅᐸᓪᓕᐊᓂᐅᔪᐃᑦ ᐃᓅᓯᕐᒧᑦ. ᐅᑭᐅᖏᑦ 1980- ᐃᑦ ᐊᒻᒪᓗ 1990- ᐃᑦ ᐊᑐᖅᑎᓪᓗᒋᑦ ᓄᓇᕗᒻᒥ ᓄᓇᓕᕆᓂᕐᒧᑦ" +
      "ᐅᖃᓪᓚᐅᓯᖃᖃᑎᒌᒃᑎᓪᓗᒋᑦ, ᑲᑎᑎᕆᕙᓪᓕᐊᓕᓚᐅᕐᐳᖅ ᐱᐅᓯᑐᖃᕐᒥ ᐱᓕᕆᔾᔪᓯᐅᕙᒃᑐᓂᒃ ᐊᒻᒪᓗ ᐅᓪᓗᒥᐅᓕᖅᑐᒥ ᐃᓕᖓᓐᓂᐅᓕᖅᓯᒪᔪᓂᒃ. ᓇᓗᓇᐃᔭᐃᓕᓚᐅᕐᐳᖅ ᐊᑐᕐᓂᖃᒻᒪᕆᒃᑑᓪᓗᓂ" +
      "ᐱᐅᓯᖃᖃᑎᒌᖖᒋᑦᑐᑦ ᐃᓱᒪᔾᔪᓯᕆᔭᖏᓐᓂᒃ ᐅᓂᒃᑳᕐᐸᓪᓕᐊᓪᓗᒋᑦ ᐊᐱᖅᓱᕋᒃᑯᑦ ᐅᖃᐅᓯᕆᔭᖏᓂᒃ ᐅᖃᓕᒫᒐᓕᐊᕆᓚᐅᖅᑕᓐᓃᑦᑐᓂ ᑕᐃᔭᐅᓪᓗᑎᒃ ᐃᓄᒃᑎᑐᑦ 2002- ᒥ ᑎᓕᔭᐅᓯᒪᓪᓗᖓ ᔫᓯ" +
      "ᑯᓱᒐᕐᒥᑦ. ᑎᑭᑦᑐᒍ ᑐᖁᒥᓄᑦ ᐊᐅᐱᓛᕐᔪᒃ ᐅᖃᐃᓐᓇᖅᐸᓚᐅᖅᓯᒪᒻᒪᑦ, “ ᓴᓇᐅᒐᒃᑲ ᓱᓕ ᐃᓕᓐᓂᐊᕐᕕᒋᕙᒃᑕᒃᑲ, ᐃᓚᒃᑲᓗ. \" ( ᓴᓇᖖᒍᐊᒐᓕᐊᒃᑲ ᓱᓕ ᐃᓕᑦᓯᕙᓪᓕᐊᔾᔪᑎᒋᕙᖏᑦ" +
      "ᐃᓚᒋᔭᕐᒪ ᓇᖕᒥᓂᕐᓗ) . ᐅᖓᑖᓄᑦ ᖁᓕᑦ ᐅᑭᐅᑦ ᐊᔾᔨᒌᖖᒋᐅᕐᑐᓂᒃ ᐅᖃᓪᓚᖃᑎᒋᖃᑦᑕᖅᓯᒪᓕᓚᐅᖅᐸᕋ ᐱᔾᔪᑎᒋᓪᓗᑎᒍ ᑕᒪᒃᑯᐊ ᓴᓇᖖᒍᐊᒐᓕᐊᕆᓯᒪᔭᖏᑦ. ᓯᕗᓪᓕᖅᐹᒥᒃ ᓴᓇᖖᒍᐊᒐᓕᐊᒥᓂᒃ" +
      "ᐅᖃᓪᓚᐅᓯᖃᓕᕋᒥ ᐅᕙᓐᓄᑦ ᓴᓂᓕᕇᖅᑎᑦᑐᓂᒋᑦ ᐋᖅᑭᔅᓱᓚᐅᖅᓯᒪᕙᐃ. ᐊᑕᐅᓯᖅ ᓴᓇᖖᒍᐊᒐᖅ ᓴᐅᒥᒃᐸᓯᐊᓃᓐᓂᖅᐹᖅ ᐱᔾᔪᑎᖃᖅᑐᓂ ᐃᓄᒻᒪᕆᒃ ᐱᐅᓯᖓ ( ᐱᐅᓯᑐᖃᒃᑯᑦ ᐃᓅᔪᖅ) ; ᕿᑎᐊᓃᑦᑐᖅ" +
      "ᓴᓇᖖᒍᐊᒐᖅ ᐊᓯᐊᓂᑦ ᓄᓇᒥᑦ ᑎᑭᑎᑕᐅᓯᒪᔪᒥᑦ ᓴᓇᓯᒪᔪᓂᑦ ᐅᔭᖅᑲᓂᑦ ᐊᒻᒪᓗ ᓯᑎᔪᓂᑦ ᕿᔪᓐᓂᑦ ᐱᔾᔪᑎᖃᖅᑐᓂ ᖃᑉᓗᓈᖅ ᐱᐅᓯᖓᑦ ( ᐅᓪᓗᒥᐅᓕᖅᑐᒥ ᐃᓅᓯᖅ) ; ᑕᓕᖅᐱᒃᐸᓯᐊᓃᑦᑐᖅ" +
      "ᓴᓇᖖᒍᐊᒐᖅ ᑐᖅᑲᔮᖅᑑᕗᖅ ᐊᒻᒪᓗ ᐱᔭᕇᖅᓯᒪᓇᓂ ᐱᔾᔪᑎᖃᖅᑑᓪᓗᓂ ᓈᒻᒪᖖᒋᓐᓂᖅᑕᖃᓕᖅᐸᓐᓂᖓᓄᑦ ᑖᒃᑯᐊᒃ ᐱᐅᓯᐅᔪᒃ ᓇᓕᖅᑲᕇᒃᓯᒪᖖᒋᓐᓂᖃᓕᕌᖓᑕ. ᓇᓗᓇᐃᖅᓯᒋᐊᖅᑐᓂ" +
      "ᓇᓕᖅᑲᒌᒍᓐᓃᕐᓂᖃᖅᐸᒻᒪᑦ ᐃᓄᒻᒪᕆᒃ ᐱᐅᓯᖓ ᐃᓚᖏᖅᑕᐅᓯᒪᓕᕌᖓᑦ ᖃᑉᓗᓈᖅ ᐱᐅᓯᖓᓂᑦ. ᒪᓕᒃᓗᒋᑦ ᐊᐅᐱᓛᕐᔫᑉ ᐅᖃᐅᓯᖏᑦ, ᓴᖖᒋᑦᑎᐊᖅᑐᓂᒃ ᓄᑖᖑᓗᑎᒃ ᐱᐅᓯᖃᖃᑎᒌᖖᒋᑦᑐᑎᒃ" +
      "ᑐᖖᒐᕝᕕᐅᓕᕋᔭᖅᑐᑦ ᐱᑕᖃᕆᐊᖃᕐᒪᑕ ᐃᓄᒻᒪᕆᒃ ᐱᐅᓯᖓᓂᒃ ᐊᒻᒪᓗ ᖃᑉᓗᓈᖅ ᐱᐅᓯᖓᓂᒃ ᑎᒍᔭᐅᓯᒪᔪᓂᒃ ᐃᓛᒃᑯᑦ ᓴᖖᒋᓂᖃᕐᕕᒋᔭᖏᓐᓂᑦ. ᑕᐃᔅᓱᒪᓂᐅᑎᓪᓗᒍ, ᐊᐱᕆᒪᐅᖅᓯᒪᒐᒃᑯ ᖃᓄᖅ" +
      "ᐱᓕᕆᐊᖑᕙᓪᓕᐊᓇᔭᕐᒪᖔᑦ. ᑭᐅᕙᒃᑐᓂᖓ \" ᐅᓇ ᐲᑦᑎᐊᒻᒪᕆᒡᓗᒍ\" ( ᑖᓐᓇ ᐊᑐᕈᓐᓃᖅᑎᓪᓗᒍ) — ᐅᖃᐅᓯᕆᓪᓗᓂᐅᒃ ᐱᖓᔪᕆᓪᓗᓂᐅᒃ ᑐᖅᑲᔮᕐᑑᖅ ᓴᓇᖖᒍᐊᒐᖅ. ᐊᐱᕆᕙᓕᓚᐅᖅᐸᕋ" +
      "ᐅᑭᐅᖑᕙᓪᓕᐊᔪᓂ ᖃᓄᕐᓕ ᐃᓱᒪᒻᒪᖔᑦ ᖃᓄᖅ ᐲᕈᓐᓇᕋᔭᕐᒪᖔᑦᑎᒎ. ᑭᐅᕙᒪᐅᖅᓯᒪᕚᖓ ᑐᕌᕐᕕᖃᕆᐊᖃᕐᓂᐊᕋᑦᑕ ᐊᑐᓂ ᐱᐅᓂᖅᐹᖑᓂᖃᕐᕕᒋᔭᖏᓄᑦ ᓴᓇᐅᒐᓕᐊᖑᓯᒪᔪᓂ ᒪᕐᕉᓐᓂ," +
      "ᓇᓕᖅᑲᕇᓕᖅᓯᒪᑏᓐᓇᕆᐊᕐᓗᒋᒃ, ᑕᐃᒪᓗ ᐱᖓᔪᕆᔭᖓᑦ ᐱᑕᖃᕈᓐᓃᓕᕋᔭᕐᒪᑦ. ᑭᓯᐊᓂᓗᑦᑕᐅᖅ, ᑕᐃᔅᓱᒪᓂᓵᕐᓕ, ᑭᖑᓪᓕᕐᒥᒃ ᐅᖃᓕᓚᐅᖅᓯᒪᔪᖅ ᓇᓕᖅᑲᕇᓕᖅᑎᑦᑎᓂᐊᕐᓂᕈᑦᑕ ᐱᓪᓚᕆᐅᔪᒃᑯᑦ," +
      "ᐅᔾᔨᕆᔭᕆᐊᖃᕋᑦᑎᒍ ᐃᓄᒻᒪᕆᒃ ᐱᐅᓯᖓᑕ ᐱᒃᑯᒥᓇᖅᑑᓂᖓᓂᒃ ᐱᔾᔪᑎᒋᓪᓗᒍ ᐃᑲᔪᖅᑎᐅᒻᒪᑦ ᐊᑐᕐᓂᖃᒻᒪᕆᒃᑐᒃᑯᑦ ᖃᐅᔨᓴᐃᓂᖃᕐᓂᕐᒥ ᐅᓪᓗᒥᐅᓕᖅᑐᒥ ᐃᓅᖃᑎᒌᑦᑐᑦ ᑮᓇᐅᔭᓕᕆᓗᐊᓕᕐᓂᖏᓂᒃ." +
      "ᓇᓗᓇᐃᕆᐊᕈᑎᒋᓪᓗᒍ ᑖᓐᓇ ᐃᓱᒪᓂᕆᔭᒥᓄᑦ, ᐅᑭᐅᖑᓵᓚᐅᖅᑐᓂ ᐱᓕᕆᖃᑎᒋᓕᕐᒥᒐᒃᑯ ᑕᐃᓐᓇ ᐃᓄᒻᒪᕆᒃ ᐅᔭᕋᒃ ᖁᑦᑎᖕᓂᖅᓴᒧᑦ ᐃᓕᕙᓕᓚᐅᖅᐹ. ᑕᒫᓃᑦᑐᓂ, ᐊᐅᐱᓛᕐᔪᒃ ᓴᖑᓐᓂᐊᕈᑎᖃᖅᓯᒪᕗᖅ" +
      "ᑕᒫᓃᑎᓪᓗᑕ ᑕᑯᓐᓇᕈᓐᓇᕋᑦᑎᒍ ᓱᓇ ᐅᓪᓗᒥᐅᓕᕐᑐᖅ ᓯᓚᕐᔪᐊᕐᒥ ᐱᐅᓂᕆᔭᖏᑦ ᐊᒻᒪᓗ ᓱᓇ ᓈᒻᒪᒍᓐᓃᕈᑕᐅᕙᒻᒪᖔᑕ — ᐱᒻᒪᕆᐅᔪᒃᑯᑦ ᖃᓄᐃᓐᓂᖃᕐᕕᐅᔪᖃᕋᓗᐊᖅᐸᑦ ᓂᕈᐊᖅᓯᓯᒪᓕᕈᓐᓇᕋᑦᑕ." +
      "ᐃᓄᒃᒪᕆᒃ ᐱᐅᓯᖓ ᑐᓂᕐᕈᑎᖃᕐᕕᐅᓯᒪᒻᒪᑦ ᑐᑭᓯᐅᒪᕙᒌᕈᓐᓇᕐᓂᕐᒥᒃ; ᑐᑭᒧᐊᒃᑎᐅᔪᓐᓇᖅᑐᓂ ᐊᒻᒪ ᓇᓕᖅᑲᕇᒃᑎᑦᑎᔨᐅᔪᓐᓇᖅᑐᓂ ᓱᓇᓕᒫᓂᒃ. ᐃᖅᑲᐅᒪᓪᓗᒋᑦ ᑎᑎᕋᖅᓯᒪᔪᓕᐅᖅᐸᓪᓕᐊᓕᕋᒪ" +
      "ᐃᓕᓴᐃᔨᐅᓪᓗᖓ ᑐᑭᓯᕙᒌᖅᓯᒪᓂᓕᕆᓂᕐᒧᑦ ᐊᐅᐱᓛᕐᔫᑉ ᓴᓇᖖᒍᐊᒐᓕᐊᕆᓯᒪᔭᓂ ᐊᑐᖅᑐᓂᒋᑦ ᐃᓕᓐᓂᐊᖅᑎᑦᑎᔾᔪᑎᒋᕙᓚᐅᖅᑕᖏᓂᒃ ᐊᑦᓯᓚᐅᖅᓯᒪᔭᒃᑲ ᐱᒃᑯᒥᓇᖅᑑᑎᖃᖅᑎᑦᑎᓂᕐᒥᒃ ᐃᓄᒻᒪᕆᒃ" +
      "ᐱᐅᓯᖓᓐᓂᒃ “ᐃᓄᓐᓄᑦ ᓵᖖᒐᕝᕕᖃᖅᑎᑦᑎᓪᓗᑎᒃ\" ᐱᓕᕆᐊᖃᕐᓂᕐᒥᒃ. ᑖᒃᑯᓄᖓ ᐋᖅᑭᐅᒪᓕᕈᑎᒃᓴᓂᒃ ᐱᑕᖃᖖᒋᒃᑲᓗᐊᖅᑎᓪᓗᒍ ᑎᑎᕋᐅᔭᒐᓕᐅᓕᓚᐅᖅᐳᖓ ᓇᖕᒥᓂᖅ ᑖᒃᑯᓂᖓ ᐱᔾᔪᑎᖃᖅᑐᓂᒃ." +
      "ᑕᒪᑦᑕᓗᒃᑖᖅ ᐊᔾᔨᒌᖖᒋᐅᖅᑐᓂᒃ ᐃᓅᓯᑦᑎᓐᓂ ᐃᓕᖓᓐᓂᖃᕋᑦᑕ ᐃᓱᒪᔾᔪᓯᖃᖅᑐᐃᓐᓇᐅᓪᓗᑕᓗ ᑐᑭᓯᐅᒪᔭᑦᑎᓐᓄᑦ — ᖃᓪᓗᓈᓂᕐᒥᐅᑦ, ᐅᑭᐅᖅᑕᖅᑐᒥᐅᑦ, ᐃᓄᒃ, ᖃᑉᓗᓈᖅ, ᐃᖅᑭᓖᑦ," +
      "ᐊᓪᓚᖓᔪᐃᑦ, ᒍᐃᒍᐃᑦ, ᐃᖕᓚᓐᒥᐅᑦ, ᓄᓇᑖᕆᐊᖅᓯᒪᓚᐅᖅᑐᑦ, ᓄᒃᑎᖅᓯᒪᓚᐅᖅᑐᑦ, ᐊᒻᒪᓗ ᑕᒪᑦᑕᓗᒃᑖᖅ ᐊᒃᑐᖅᑕᐅᓯᒪᓂᖃᖅᑐᑕ ᐃᓱᒪᔾᔪᓯᕆᔭᑦᑎᒍ ᐊᒥᓱᐃᖑᓪᓗᑎᒃ ᖃᓄᐃᓐᓂᐅᔪᓂᑦ ᓲᕐᓗ" +
      "ᐅᑭᐅᑦᑎᓐᓂᑦ, ᐃᓅᖃᑎᒋᔭᑦᑎᓐᓂᑦ ᐊᒻᒪᓗ ᐊᕐᓇᐅᓂᑦᑎᓐᓂᑦ ᐊᖑᑕᐅᓂᑦᑎᓐᓂᓪᓗ. ᑕᐃᒪᓐᓇᐃᒃᑲᓗᐊᖅᒥᑎᓪᓗᒋᑦ ᑕᒪᒃᑯᐊ ᑕᒪᑦᑕᓗᒃᑖᑦᑎᐊᖅ ᐱᔪᓐᓇᕐᓂᖃᖅᑑᒐᑦᑕ ᐊᒻᒪᓗ ᐱᓕᕆᐊᒃᓴᖃᖅᑑᓪᓗᑕ" +
      "ᓵᖖᒐᓕᕐᓂᖅᓴᐅᔪᓐᓇᕐᓂᕐᒧᑦ ᐃᓄᒻᒪᕆᒃ ᐱᐅᓯᖓᓄᑦ ᐱᔾᔪᑎᖃᖅᑎᓪᓗᑕ ᐃᓄᐃᑦ ᓄᓇᒋᔭᑐᖃᖓᓐᓂᒃ, ᓱᓇᖁᑎᖏᓂᒃ, ᐃᓅᓯᖓᓐᓂᒃ, ᐊᐅᓚᑦᓯᔨᐅᓂᖏᓐᓂᒃ, ᐅᖃᐅᓯᖓᓐᓂᒃ ᐊᒻᒪᓗ ᖃᐅᔨᒪᓂᕆᔭᖏᓂᒃ." +
      "ᖃᓄᖅ ᐱᓕᕆᐊᒃᓴᖃᓕᖅᓯᒪᓂᑦᑎᓐᓂᒃ ᐱᓕᕆᐊᖃᓕᕋᔭᕐᓂᕗᑦ ᐃᓚᖃᕆᐊᖃᕐᒪᑕ ᐅᖃᓪᓚᖃᑎᖃᖅᐸᕐᓯᒪᓂᑦᑎᓐᓂᒃ ᑐᖖᒐᕝᕕᖃᖅᑎᑕᐅᓯᒪᓗᑎᒃ ᐱᓕᕆᐊᖃᖃᑎᒌᓐᓂᐅᔪᓄᑦ ᐊᒻᒪᓗ ᐊᑕᕝᕕᒋᑐᕋᐅᓕᖅᓯᒪᓂᕐᓄᑦ" +
      "ᑐᕌᕐᕕᒃᓴᐅᔪᒧᑦ ᑎᑭᓯᒪᓕᖅᑎᑦᑎᓂᐊᕈᑦᑕ. ᐃᓚᖓᒍᑦ ᐱᐅᒻᒪᕆᒃᑐᓂᒃ ᐱᓕᕆᐊᕆᔭᐅᖃᑦᑕᖅᓯᒪᓕᕐᒪᑕ ᒥᑭᑦᑑᒐᓗᐊᖅᑐᑎᒃ, ᑭᓯᐊᓂᓗᑦᑕᐅᖅ ᐅᑭᐅᖅᑕᖅᑐᑉ ᐊᕕᒃᑐᖅᓯᒪᓂᕆᔭᖓᓂ ᐊᒥᓱᐃᑎᒍᑦ" +
      "ᐊᓯᔾᔨᖅᐸᓪᓕᐊᓂᖃᓕᖅᑎᓪᓗᒍ, ᐊᖏᓂᖅᓴᐅᔪᒃᑯᑦ ᐊᓯᔾᔨᖅᓯᒪᓕᖅᑎᑕᐅᔭᕆᐊᖃᕐᐳᑦ. ᐃᓱᒪᕗᖓ ᓈᒻᒪᓐᓂᖅᓴᐅᓇᔭᕋᓱᒋᓪᓗᒍ ᐊᐅᐱᓛᕐᔪᒻᒥᒃ ᐃᓕᑕᖅᓯᓯᒪᓂᖃᕆᐊᖃᕋᑦᑕ ᒫᓐᓇᐅᓕᖅᑐᖅ" +
      "ᐃᓱᒪᓕᐅᖅᓯᒪᓕᕈᑎᒋᒍᑦᑎᒍ ᐅᖃᓪᓚᐅᓯᖃᖃᑎᒌᖁᔨᓗᑎᑕ ᑐᑭᓯᐅᒪᒪᓕᕈᑎᔅᓴᑦᑎᓐᓂᒃ: ᖃᓄᖅ ᑐᑭᖃᕐᒪᑦ ᐱᒃᑯᒥᓇᕆᔭᖃᕐᓂᖅ ᐃᓄᒻᒪᕆᒃ ᐱᐅᓯᖓᓂᒃ?\" ᐃᓛᒃᑯᑦ ᐃᓄᐃᑦ ᐊᔾᔨᒌᖖᒋᐅᖅᑐᓂᒃ" +
      "ᑭᐅᔾᔪᑎᔅᓴᖃᕐᓂᐊᖅᑐᑦ, ᐱᓯᒪᓕᖅᑎᓪᓗᑕᓗ ᑖᒃᑯᓂᖓ, ᐱᑦᓯᐊᖅᑐᑎᒍᑦ ᓯᕗᒻᒧᒋᐊᕐᕕᒃᓴᖃᓕᖅᑎᑦᑎᓂᐊᕋᑦᑕ.";
  expect(true).toBeTruthy();
});

});
