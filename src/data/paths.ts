import type { Path } from "@/lib/types";

export const paths: Path[] = [
  {
    slug: "naissance-de-la-philosophie",
    title: "La naissance de la philosophie",
    subtitle: "Des présocratiques à Aristote",
    description:
      "Comment, en Grèce, des hommes ont cessé d'expliquer le monde par les mythes pour l'interroger par la raison. Le point de départ de tout parcours.",
    hue: 38,
    icon: "Landmark",
    lessons: [
      {
        slug: "du-mythe-au-logos",
        title: "Du mythe au logos",
        minutes: 8,
        philosophers: ["heraclite", "parmenide"],
        intro:
          "Au VIe siècle av. J.-C., sur les côtes d'Ionie, quelques penseurs posent une question inouïe : de quoi le monde est-il fait, et selon quelle loi ? Ils cherchent la réponse non dans les dieux, mais dans la nature elle-même.",
        sections: [
          {
            title: "L'étonnement",
            body: "Platon et Aristote le diront : la philosophie commence par l'étonnement (thaumazein). Thalès de Milet propose que tout vient de l'eau, Anaximandre de l'illimité (apeiron), Anaximène de l'air. Peu importe la réponse : ce qui compte, c'est le geste. On cherche un principe (arkhè) unique, accessible à la raison, et l'on accepte d'être critiqué par ses successeurs.",
          },
          {
            title: "Héraclite : tout s'écoule",
            body: "Pour Héraclite, le monde est un feu toujours vivant, s'allumant et s'éteignant selon une mesure. Rien n'est stable : on ne se baigne jamais deux fois dans le même fleuve. Mais ce flux n'est pas un chaos ; il obéit à un Logos, une raison commune, qui fait l'unité des contraires — la tension de l'arc et de la lyre.",
          },
          {
            title: "Parménide : l'être est",
            body: "À l'opposé, Parménide affirme que le changement est impensable : ce qui est ne peut venir de ce qui n'est pas. L'être est un, continu, immobile. Les sens nous trompent ; seule la raison suit la « voie de la vérité ». Ce coup de force invente l'ontologie, la science de l'être, et pose un défi que Platon et Aristote devront relever.",
          },
        ],
        keyIdeas: [
          "La philosophie naît quand on cherche des explications rationnelles plutôt que mythiques.",
          "Héraclite pense le devenir et l'unité des contraires.",
          "Parménide pense l'être immuable et oppose vérité et opinion.",
        ],
        meditation:
          "Dans ta vie, qu'est-ce qui change sans cesse, et qu'est-ce qui demeure ? Es-tu plutôt Héraclite ou Parménide ?",
        quiz: [
          {
            q: "Quel mot grec désigne le principe premier recherché par les penseurs de Milet ?",
            options: ["Arkhè", "Ataraxie", "Eudaimonia", "Polis"],
            answer: 0,
            explanation: "L'arkhè est le principe, le commencement et le fondement de toute chose.",
          },
          {
            q: "Selon Héraclite, que gouverne le Logos ?",
            options: ["Le devenir et l'unité des contraires", "Le salut de l'âme", "La cité idéale", "Les atomes et le vide"],
            answer: 0,
            explanation: "Le Logos est la raison commune qui ordonne le flux des choses et la tension des contraires.",
          },
          {
            q: "Pour Parménide, que valent les témoignages des sens ?",
            options: ["Ils sont la seule source de vérité", "Ils relèvent de l'opinion trompeuse", "Ils révèlent les Idées", "Ils sont infaillibles s'ils sont nombreux"],
            answer: 1,
            explanation: "Les sens montrent du changement, ce que la raison juge impensable : ils relèvent de la doxa.",
          },
        ],
      },
      {
        slug: "socrate-et-l-examen",
        title: "Socrate : la vie examinée",
        minutes: 9,
        philosophers: ["socrate", "platon"],
        intro:
          "Socrate n'a rien écrit, et pourtant toute la philosophie occidentale se divise en « avant » et « après » lui. Il fait descendre la philosophie du ciel sur la terre : la grande question devient comment vivre.",
        sections: [
          {
            title: "Je sais que je ne sais rien",
            body: "L'oracle de Delphes déclare que nul n'est plus sage que Socrate. Perplexe, il interroge les politiques, les poètes, les artisans réputés savants, et découvre qu'ils croient savoir ce qu'ils ignorent. Sa seule supériorité : savoir qu'il ne sait pas. Cette ignorance assumée n'est pas un aveu d'échec, mais le point de départ de toute recherche.",
          },
          {
            title: "La méthode : questionner",
            body: "Socrate demande « qu'est-ce que… ? » : qu'est-ce que le courage, la piété, la justice ? L'interlocuteur propose une définition ; Socrate en tire des conséquences jusqu'à la contradiction. Cette réfutation (elenchos) purge l'esprit de ses faux savoirs. Il se dit accoucheur des esprits : c'est la maïeutique. L'ironie — feindre l'ignorance — sert ce travail.",
          },
          {
            title: "Mourir pour la philosophie",
            body: "En 399 av. J.-C., Socrate est accusé de ne pas reconnaître les dieux de la cité et de corrompre la jeunesse. Dans l'Apologie, il refuse de renoncer à philosopher : « une vie sans examen ne vaut pas d'être vécue ». Condamné, il refuse l'évasion que lui propose Criton, par respect des lois, et boit la ciguë entouré de ses amis.",
          },
        ],
        keyIdeas: [
          "La sagesse commence par la reconnaissance de son ignorance.",
          "Le dialogue réfutatif et la maïeutique font accoucher les esprits.",
          "Nul n'est méchant volontairement : la vertu est un savoir.",
        ],
        meditation:
          "Choisis une conviction à laquelle tu tiens. Saurais-tu en donner une définition qui résiste à trois questions de Socrate ?",
        quiz: [
          {
            q: "Comment s'appelle l'art socratique d'« accoucher » les esprits ?",
            options: ["La dialectique hégélienne", "La maïeutique", "La rhétorique", "L'herméneutique"],
            answer: 1,
            explanation: "Socrate, fils d'une sage-femme, se compare à une accoucheuse des âmes.",
          },
          {
            q: "Pourquoi Socrate refuse-t-il de s'évader de prison ?",
            options: ["Il est trop âgé", "Par respect pour les lois de la cité", "Il croit être gracié", "Ses amis l'en dissuadent"],
            answer: 1,
            explanation: "Dans le Criton, il fait parler les Lois d'Athènes : s'évader serait commettre une injustice.",
          },
          {
            q: "Selon Socrate, pourquoi fait-on le mal ?",
            options: ["Par méchanceté naturelle", "Par ignorance du bien", "Par la volonté des dieux", "Par excès de raison"],
            answer: 1,
            explanation: "« Nul n'est méchant volontairement » : celui qui connaît vraiment le bien le fait.",
          },
        ],
      },
      {
        slug: "platon-et-aristote",
        title: "Platon et Aristote : le ciel et la terre",
        minutes: 11,
        philosophers: ["platon", "aristote"],
        intro:
          "Sur la fresque de Raphaël, Platon montre le ciel et Aristote la terre. Le maître et l'élève incarnent deux grandes manières de philosopher qui vont dialoguer pendant deux millénaires.",
        sections: [
          {
            title: "Platon : le monde des Idées",
            body: "Pour Platon, les choses sensibles changent et périssent ; elles ne sont que des copies imparfaites de réalités éternelles, les Idées (le Beau, le Juste, l'Égal…). L'allégorie de la caverne montre l'éducation comme une conversion du regard : des ombres vers la lumière du Bien. Connaître, c'est se ressouvenir de ce que l'âme a contemplé.",
          },
          {
            title: "Aristote : partir de l'expérience",
            body: "Aristote refuse de séparer les Idées des choses : la forme est dans la matière. Il faut observer, classer, remonter aux causes — matérielle, formelle, motrice, finale. Il fonde la logique (le syllogisme), la biologie, la physique, la poétique. « Tous les hommes désirent naturellement savoir. »",
          },
          {
            title: "Deux éthiques, deux cités",
            body: "Platon conçoit une cité juste où chacun est à sa place et où gouvernent les philosophes. Aristote, plus réaliste, compare 158 constitutions et définit l'homme comme un « animal politique ». Son éthique de la vertu comme juste milieu et du bonheur comme activité reste une référence vivante.",
          },
        ],
        keyIdeas: [
          "Platon distingue monde sensible et monde intelligible des Idées.",
          "Aristote cherche la forme dans les choses et explique par les quatre causes.",
          "Pour Aristote, la vertu est un juste milieu acquis par l'habitude.",
        ],
        meditation:
          "Quelle est ta « caverne » : quelles ombres prends-tu peut-être pour la réalité (écrans, opinions, habitudes) ?",
        quiz: [
          {
            q: "Dans quelle œuvre trouve-t-on l'allégorie de la caverne ?",
            options: ["Le Banquet", "La République", "L'Éthique à Nicomaque", "Le Phédon"],
            answer: 1,
            explanation: "Au livre VII de La République.",
          },
          {
            q: "Pour Aristote, le courage est le juste milieu entre…",
            options: ["La peur et l'angoisse", "La lâcheté et la témérité", "La prudence et la sagesse", "L'amour et la haine"],
            answer: 1,
            explanation: "La vertu est un milieu entre deux vices, l'un par défaut, l'autre par excès.",
          },
          {
            q: "Laquelle n'est PAS une des quatre causes d'Aristote ?",
            options: ["Cause finale", "Cause formelle", "Cause accidentelle", "Cause matérielle"],
            answer: 2,
            explanation: "Les quatre causes sont matérielle, formelle, motrice (efficiente) et finale.",
          },
        ],
      },
    ],
  },
  {
    slug: "art-de-vivre",
    title: "L'art de vivre",
    subtitle: "Stoïciens, épicuriens, cyniques",
    description:
      "La philosophie comme médecine de l'âme : des exercices concrets pour affronter la peur, la colère, le deuil et le manque de temps.",
    hue: 160,
    icon: "Sprout",
    lessons: [
      {
        slug: "le-stoicisme",
        title: "Le stoïcisme : ce qui dépend de nous",
        minutes: 10,
        philosophers: ["epictete", "seneque", "marc-aurele"],
        intro:
          "Un esclave, un ministre et un empereur ont pratiqué la même philosophie. Le stoïcisme enseigne une liberté que nul ne peut nous ôter.",
        sections: [
          {
            title: "La dichotomie du contrôle",
            body: "Le Manuel d'Épictète s'ouvre sur cette distinction : certaines choses dépendent de nous (nos jugements, nos désirs, nos actions), d'autres non (le corps, la réputation, les biens, les événements). Le malheur vient de vouloir maîtriser ce qui ne dépend pas de nous. La sérénité vient de se concentrer sur ce qui en dépend.",
          },
          {
            title: "Nos jugements nous troublent",
            body: "« Ce qui trouble les hommes, ce ne sont pas les choses, mais les jugements qu'ils portent sur les choses. » Une insulte n'est qu'un son ; c'est mon interprétation qui la rend blessante. Les stoïciens analysent les passions comme des jugements erronés que l'on peut corriger par l'exercice.",
          },
          {
            title: "Les exercices spirituels",
            body: "Sénèque pratique l'examen de conscience chaque soir. Marc Aurèle se prépare le matin à rencontrer des gens difficiles. On s'exerce à la prémeditation des maux (imaginer la perte pour ne pas être pris au dépourvu), à la vue d'en haut (contempler sa vie depuis le cosmos), à l'attention au présent. La philosophie devient une pratique quotidienne.",
          },
        ],
        keyIdeas: [
          "Distinguer ce qui dépend de nous de ce qui n'en dépend pas.",
          "Les passions viennent de jugements que l'on peut réformer.",
          "La philosophie est un ensemble d'exercices quotidiens.",
        ],
        meditation:
          "Ce soir, fais l'examen de Sénèque : quel défaut ai-je combattu aujourd'hui ? En quoi suis-je meilleur ?",
        quiz: [
          {
            q: "Selon Épictète, lequel de ces éléments dépend de nous ?",
            options: ["Notre réputation", "Notre santé", "Nos jugements", "La météo"],
            answer: 2,
            explanation: "Nos jugements, désirs et aversions sont « nôtres » ; le reste ne l'est pas.",
          },
          {
            q: "Quelle œuvre Marc Aurèle écrivait-il pour lui-même ?",
            options: ["Le Manuel", "Les Pensées", "Les Lettres à Lucilius", "La Consolation"],
            answer: 1,
            explanation: "Les Pensées pour moi-même, rédigées en grec pendant ses campagnes.",
          },
          {
            q: "Qu'est-ce que la « prémeditation des maux » ?",
            options: ["Planifier une vengeance", "Imaginer à l'avance les épreuves pour s'y préparer", "Prédire l'avenir", "Ruminer ses erreurs passées"],
            answer: 1,
            explanation: "Envisager la perte rend moins vulnérable et fait apprécier le présent.",
          },
        ],
      },
      {
        slug: "epicure-et-le-plaisir",
        title: "Épicure : le plaisir bien compris",
        minutes: 8,
        philosophers: ["epicure"],
        intro:
          "« Épicurien » évoque aujourd'hui la bonne chère. Rien n'est plus éloigné d'Épicure, qui se contentait d'eau et de pain et demandait un petit pot de fromage pour faire bombance.",
        sections: [
          {
            title: "Le quadruple remède",
            body: "Le tetrapharmakon résume la sagesse épicurienne : les dieux ne sont pas à craindre (ils ne s'occupent pas de nous), la mort n'est rien pour nous (là où elle est, nous ne sommes pas), le bien est facile à obtenir, le mal facile à supporter.",
          },
          {
            title: "Trier ses désirs",
            body: "Il y a des désirs naturels et nécessaires (manger, boire, s'abriter, l'amitié, la philosophie), naturels mais non nécessaires (mets raffinés), et vains (richesse, gloire, pouvoir) qui n'ont pas de limite. Le sage satisfait les premiers et se libère des derniers. Le plaisir stable — ataraxie de l'âme, aponie du corps — l'emporte sur le plaisir en mouvement.",
          },
          {
            title: "Le Jardin et l'amitié",
            body: "Épicure vivait avec ses amis dans un jardin aux portes d'Athènes, où femmes et esclaves étaient admis. « De tous les biens que la sagesse procure pour le bonheur de toute la vie, le plus grand de beaucoup est l'amitié. » Sa physique atomiste, reprise par Lucrèce, montre que tout est atomes et vide : rien de surnaturel à craindre.",
          },
        ],
        keyIdeas: [
          "Le tetrapharmakon guérit des quatre grandes peurs.",
          "Distinguer désirs naturels et nécessaires, naturels, et vains.",
          "L'amitié est le plus grand des biens.",
        ],
        meditation:
          "Liste trois désirs qui t'occupent en ce moment. Lesquels sont naturels et nécessaires, lesquels sont vains ?",
        quiz: [
          {
            q: "Comment Épicure raisonne-t-il sur la mort ?",
            options: ["Elle est un passage vers l'au-delà", "Quand elle est là, nous ne sommes plus", "Il faut s'y préparer par l'ascèse", "Elle est une punition divine"],
            answer: 1,
            explanation: "La mort est privation de sensation ; elle ne nous concerne donc pas.",
          },
          {
            q: "Le désir de gloire est, pour Épicure…",
            options: ["Naturel et nécessaire", "Naturel non nécessaire", "Vain", "Divin"],
            answer: 2,
            explanation: "Gloire et richesse sont des désirs vides, sans limite naturelle.",
          },
          {
            q: "Comment s'appelait l'école d'Épicure ?",
            options: ["Le Portique", "Le Lycée", "Le Jardin", "L'Académie"],
            answer: 2,
            explanation: "Le Jardin, aux portes d'Athènes.",
          },
        ],
      },
      {
        slug: "diogene-et-les-cyniques",
        title: "Diogène : la philosophie insolente",
        minutes: 6,
        philosophers: ["diogene"],
        intro:
          "Un homme vit dans une jarre, se promène en plein jour avec une lanterne « cherchant un homme », et demande à Alexandre le Grand de s'ôter de son soleil. Bienvenue chez les cyniques.",
        sections: [
          {
            title: "Vivre comme un chien",
            body: "Les cyniques (de kuôn, chien) revendiquent une vie conforme à la nature, sans honte ni artifices. Diogène jette son bol en voyant un enfant boire dans ses mains : même ce bol était superflu. Réduire ses besoins, c'est accroître sa liberté.",
          },
          {
            title: "La provocation comme pédagogie",
            body: "Diogène « falsifie la monnaie » des valeurs : il renverse les conventions pour montrer leur arbitraire. Ses gestes scandaleux en public visent à réveiller les consciences. Quand Platon définit l'homme comme un « bipède sans plumes », il lui apporte un coq plumé : « Voici l'homme de Platon ! »",
          },
          {
            title: "Citoyen du monde",
            body: "Interrogé sur sa patrie, Diogène répond : « Je suis citoyen du monde » (kosmopolitès). Ce cosmopolitisme radical, repris par les stoïciens, est l'une des premières affirmations d'une humanité commune au-delà des cités.",
          },
        ],
        keyIdeas: [
          "L'autarcie : la liberté passe par la réduction des besoins.",
          "La provocation dévoile l'arbitraire des conventions.",
          "Le cosmopolitisme : appartenir au monde entier.",
        ],
        meditation:
          "Si tu devais, comme Diogène, jeter un objet devenu superflu, lequel serait-ce ?",
        quiz: [
          {
            q: "D'où vient le mot « cynique » ?",
            options: ["Du grec kuôn, chien", "Du nom d'une ville", "D'un dieu grec", "Du latin cynicus, savant"],
            answer: 0,
            explanation: "Les cyniques revendiquaient de vivre sans honte, comme les chiens.",
          },
          {
            q: "Que répond Diogène à Alexandre qui lui offre ce qu'il désire ?",
            options: ["« Donne-moi un royaume »", "« Ôte-toi de mon soleil »", "« Libère les esclaves »", "« Apprends-moi la guerre »"],
            answer: 1,
            explanation: "Rien de ce qu'un roi peut donner ne lui manquait.",
          },
          {
            q: "Qu'affirme Diogène en se disant « citoyen du monde » ?",
            options: ["Son mépris de toute morale", "Une appartenance à l'humanité au-delà des cités", "Son désir de voyager", "Sa fidélité à Athènes"],
            answer: 1,
            explanation: "C'est l'origine du cosmopolitisme.",
          },
        ],
      },
    ],
  },
  {
    slug: "sagesses-d-orient",
    title: "Sagesses d'Asie",
    subtitle: "Confucius, le Tao, le Bouddha",
    description:
      "Pendant que la Grèce s'étonnait, la Chine et l'Inde inventaient d'autres chemins : l'harmonie des relations, le non-agir, la délivrance de la souffrance.",
    hue: 0,
    icon: "Flower2",
    lessons: [
      {
        slug: "confucius",
        title: "Confucius : devenir humain",
        minutes: 8,
        philosophers: ["confucius"],
        intro:
          "Pour Confucius, on ne naît pas pleinement humain : on le devient par l'étude, les rites et la bienveillance envers autrui.",
        sections: [
          {
            title: "Le ren, la bienveillance",
            body: "La vertu suprême, ren, s'écrit avec les caractères « homme » et « deux » : l'humanité se réalise dans la relation. Interrogé sur le ren, Confucius répond : « aimer les autres ». Sa règle d'or : « Ce que tu ne veux pas qu'on te fasse, ne le fais pas aux autres. »",
          },
          {
            title: "Les rites et la rectification des noms",
            body: "Les rites (li) — salutations, deuil, fêtes — ne sont pas des formalités vides : ils cultivent le respect et donnent forme aux émotions. Pour gouverner, il faut d'abord « rectifier les noms » : qu'un père soit vraiment un père, un prince vraiment un prince. Quand les mots ne correspondent plus aux réalités, tout se dérègle.",
          },
          {
            title: "L'homme de bien",
            body: "Le junzi (homme de bien) s'oppose à l'homme de peu : il cherche ce qui est juste plutôt que le profit, s'exige beaucoup à lui-même et peu des autres. Le gouvernement idéal repose sur l'exemple moral des dirigeants plutôt que sur la peur des châtiments.",
          },
        ],
        keyIdeas: [
          "Le ren : l'humanité se cultive dans la relation.",
          "Les rites façonnent le respect et l'harmonie sociale.",
          "Gouverner par la vertu et l'exemple.",
        ],
        meditation:
          "Dans tes relations, quel « rite » (petit geste répété) entretient le respect ? Lequel aurais-tu besoin d'inventer ?",
        quiz: [
          {
            q: "Quel texte rassemble les paroles de Confucius ?",
            options: ["Le Tao Te King", "Les Entretiens (Lunyu)", "Le Dhammapada", "Le Yi King"],
            answer: 1,
            explanation: "Les Entretiens ont été compilés par ses disciples.",
          },
          {
            q: "Que désigne le ren ?",
            options: ["L'énergie vitale", "La bienveillance, l'humanité", "Le vide", "La guerre juste"],
            answer: 1,
            explanation: "Le ren est la vertu d'humanité, d'amour d'autrui.",
          },
          {
            q: "Que signifie « rectifier les noms » ?",
            options: ["Changer de nom", "Faire correspondre les mots et les rôles réels", "Apprendre l'écriture", "Inventer une langue"],
            answer: 1,
            explanation: "L'ordre social exige que chacun soit ce que son titre dit qu'il est.",
          },
        ],
      },
      {
        slug: "le-tao",
        title: "Le Tao : la voie de l'eau",
        minutes: 7,
        philosophers: ["lao-tseu", "zhuangzi"],
        intro:
          "« Le Tao qui peut être dit n'est pas le Tao éternel. » Dès sa première ligne, le Tao Te King nous prévient : ce qui compte ne se laisse pas enfermer dans des mots.",
        sections: [
          {
            title: "La Voie indicible",
            body: "Le Tao est l'origine de toute chose, le cours naturel du monde, le vide fécond dont tout naît. Il produit le yin et le yang, dont l'alternance fait la vie. On ne peut le saisir par concept, seulement s'y accorder.",
          },
          {
            title: "Le non-agir",
            body: "Le wu wei n'est pas l'inaction, mais l'action qui ne force pas. L'eau est le modèle : souple, elle prend la forme du vase, contourne l'obstacle et finit par user la pierre. Le sage gouverne comme on fait frire un petit poisson : sans trop y toucher.",
          },
          {
            title: "Zhuangzi et le papillon",
            body: "Zhuangzi pousse plus loin la relativité des points de vue. Il rêve qu'il est un papillon et, éveillé, ne sait plus s'il est Zhuang Zhou qui rêvait d'être un papillon ou un papillon qui rêve d'être Zhuang Zhou. Le boucher Ding, qui découpe un bœuf sans émousser sa lame en suivant les jointures, montre la maîtrise spontanée.",
          },
        ],
        keyIdeas: [
          "Le Tao est la voie indicible de toutes choses.",
          "Le wu wei : agir sans forcer, comme l'eau.",
          "Zhuangzi relativise les points de vue et célèbre la spontanéité.",
        ],
        meditation:
          "Dans quelle situation forces-tu les choses ? À quoi ressemblerait une manière d'agir « comme l'eau » ?",
        quiz: [
          {
            q: "Quel élément sert de modèle au non-agir ?",
            options: ["Le feu", "L'eau", "La pierre", "Le métal"],
            answer: 1,
            explanation: "L'eau est souple mais vient à bout du dur.",
          },
          {
            q: "Que veut montrer le rêve du papillon de Zhuangzi ?",
            options: ["Que les insectes pensent", "La relativité des points de vue et l'incertitude du soi", "Qu'il faut dormir davantage", "Que les rêves prédisent l'avenir"],
            answer: 1,
            explanation: "Les frontières entre rêve et veille, moi et autre, sont moins nettes qu'on le croit.",
          },
          {
            q: "Le wu wei signifie…",
            options: ["Ne rien faire du tout", "Agir sans forcer, en accord avec le cours naturel", "Faire la guerre", "Méditer immobile"],
            answer: 1,
            explanation: "C'est une action efficace parce que non contrainte.",
          },
        ],
      },
      {
        slug: "le-bouddha",
        title: "Le Bouddha : l'éveil",
        minutes: 9,
        philosophers: ["bouddha", "nagarjuna"],
        intro:
          "Un prince quitte son palais après avoir vu un vieillard, un malade, un mort et un ascète. Sa quête : comprendre la souffrance et s'en libérer.",
        sections: [
          {
            title: "Les Quatre Nobles Vérités",
            body: "Comme un médecin, le Bouddha pose un diagnostic : la vie est marquée par la souffrance (dukkha), l'insatisfaction. Elle a une cause : la soif (tanha), l'attachement. Elle peut cesser : c'est le nirvana, l'extinction. Et il y a un remède : le Noble Chemin octuple (compréhension, intention, parole, action, moyens d'existence, effort, attention, concentration justes).",
          },
          {
            title: "Impermanence et non-soi",
            body: "Tout ce qui est composé est impermanent (anicca). Il n'y a pas de soi permanent (anatta) : ce que j'appelle « moi » est un flux de sensations, perceptions, formations mentales, conscience. S'accrocher à un moi fixe produit la souffrance. Le Bouddha refuse les spéculations métaphysiques inutiles : l'homme blessé par une flèche ne doit pas demander qui l'a tirée avant de se faire soigner.",
          },
          {
            title: "Nāgārjuna et la vacuité",
            body: "Six siècles plus tard, Nāgārjuna radicalise : toute chose est vide (śūnya) d'existence propre, car tout naît en dépendance du reste. Même la vacuité est vide : ce n'est pas une thèse de plus, mais un remède à toutes les thèses. Cette « voie du milieu » échappe à l'être comme au néant.",
          },
        ],
        keyIdeas: [
          "Les Quatre Nobles Vérités : diagnostic et remède de la souffrance.",
          "Impermanence et absence de soi permanent.",
          "La vacuité : rien n'existe par soi-même.",
        ],
        meditation:
          "Observe une émotion pendant une minute sans la juger : naît-elle, change-t-elle, passe-t-elle ? Qui l'observe ?",
        quiz: [
          {
            q: "Selon la deuxième Noble Vérité, quelle est la cause de la souffrance ?",
            options: ["Les dieux", "La soif, l'attachement", "Le corps", "La société"],
            answer: 1,
            explanation: "La tanha, la soif ou l'avidité, est l'origine de dukkha.",
          },
          {
            q: "Que signifie anatta ?",
            options: ["L'âme éternelle", "L'absence de soi permanent", "La compassion", "Le paradis"],
            answer: 1,
            explanation: "Le « moi » est un agrégat changeant, non une substance.",
          },
          {
            q: "Quel concept est central chez Nāgārjuna ?",
            options: ["La volonté de puissance", "La vacuité", "Le contrat social", "Le cogito"],
            answer: 1,
            explanation: "La śūnyatā, vacuité d'existence propre.",
          },
        ],
      },
    ],
  },
  {
    slug: "foi-et-raison",
    title: "Foi et raison",
    subtitle: "Bagdad, Cordoue, Paris",
    description:
      "Comment la philosophie grecque, traduite en arabe puis en latin, a nourri les penseurs juifs, chrétiens et musulmans — et pourquoi le Moyen Âge n'a rien d'obscur.",
    hue: 280,
    icon: "BookOpen",
    lessons: [
      {
        slug: "augustin",
        title: "Augustin : le maître intérieur",
        minutes: 8,
        philosophers: ["augustin"],
        intro:
          "Avec les Confessions, un homme d'Afrique du Nord invente l'introspection : chercher la vérité au fond de soi.",
        sections: [
          {
            title: "Une vie inquiète",
            body: "Jeune rhéteur brillant et passionné, Augustin cherche longtemps : manichéisme, scepticisme, néoplatonisme. Sa conversion à Milan, en 386, est racontée dans une scène célèbre où une voix d'enfant lui dit : « Prends et lis ». « Notre cœur est sans repos tant qu'il ne repose en toi. »",
          },
          {
            title: "Qu'est-ce que le temps ?",
            body: "Au livre XI des Confessions : « Si personne ne me le demande, je le sais ; si je veux l'expliquer, je ne le sais plus. » Le passé n'est plus, le futur pas encore, le présent n'a pas d'étendue. Le temps existe dans l'âme comme mémoire, attention et attente : une « distension de l'âme ».",
          },
          {
            title: "Le mal et la liberté",
            body: "Contre les manichéens qui voient deux principes opposés, Augustin soutient que le mal n'est pas une substance, mais une privation de bien. Le mal moral vient du libre arbitre qui se détourne du bien suprême vers des biens inférieurs.",
          },
        ],
        keyIdeas: [
          "Chercher la vérité en rentrant en soi-même.",
          "Le temps est une distension de l'âme.",
          "Le mal est une privation de bien.",
        ],
        meditation:
          "Comment ton passé existe-t-il encore en toi aujourd'hui ? Et ton avenir ?",
        quiz: [
          {
            q: "Où, selon Augustin, existe le temps ?",
            options: ["Dans les astres", "Dans l'âme", "Dans les horloges", "Nulle part"],
            answer: 1,
            explanation: "Mémoire, attention et attente : le temps est dans l'esprit.",
          },
          {
            q: "Qu'est-ce que le mal pour Augustin ?",
            options: ["Une substance rivale de Dieu", "Une privation de bien", "Une illusion des sens", "Un principe nécessaire"],
            answer: 1,
            explanation: "Contre le dualisme manichéen.",
          },
          {
            q: "Quel livre d'Augustin est une autobiographie ?",
            options: ["La Cité de Dieu", "Les Confessions", "La Somme théologique", "Le Guide des égarés"],
            answer: 1,
            explanation: "Les Confessions, écrites vers 397-401.",
          },
        ],
      },
      {
        slug: "la-falsafa",
        title: "La falsafa : l'âge d'or de la philosophie arabe",
        minutes: 11,
        philosophers: ["al-farabi", "avicenne", "al-ghazali", "averroes"],
        intro:
          "Au IXe siècle, la Maison de la sagesse de Bagdad fait traduire Aristote, Platon, Galien. Pendant quatre siècles, la philosophie se pense en arabe.",
        sections: [
          {
            title: "Al-Fârâbî et Avicenne",
            body: "Al-Fârâbî, le « second maître » après Aristote, classe les sciences et pense une cité vertueuse. Avicenne, médecin génial, distingue l'essence (ce qu'est une chose) et l'existence (le fait qu'elle soit) : Dieu seul est l'Existant nécessaire. Son « homme volant », créé en l'air sans percevoir son corps, sait pourtant qu'il est : l'âme se connaît directement.",
          },
          {
            title: "La critique d'Al-Ghazâlî",
            body: "Professeur adulé à Bagdad, Al-Ghazâlî traverse un doute radical et devient soufi. Dans L'Incohérence des philosophes, il montre que leurs thèses sur l'éternité du monde ne sont pas démontrées, et que nous n'observons jamais de lien nécessaire entre cause et effet — une idée que Hume retrouvera.",
          },
          {
            title: "Averroès : le vrai ne contredit pas le vrai",
            body: "À Cordoue, le juge Ibn Rushd répond dans L'Incohérence de l'incohérence. Son Discours décisif soutient que la Loi elle-même commande de philosopher : la vérité démontrée et la vérité révélée ne peuvent se contredire. Ses commentaires d'Aristote, traduits en latin, font de lui « le Commentateur » pour l'Europe.",
          },
        ],
        keyIdeas: [
          "La falsafa transmet et transforme l'héritage grec.",
          "Avicenne distingue essence et existence.",
          "Averroès défend l'accord entre philosophie et révélation.",
        ],
        meditation:
          "Peut-on accepter une vérité d'où qu'elle vienne, même d'une culture ou d'une croyance très différente de la sienne ?",
        quiz: [
          {
            q: "Qui fut surnommé « le Commentateur » d'Aristote en Europe ?",
            options: ["Avicenne", "Averroès", "Al-Ghazâlî", "Al-Kindî"],
            answer: 1,
            explanation: "Ibn Rushd de Cordoue.",
          },
          {
            q: "Que veut montrer l'« homme volant » d'Avicenne ?",
            options: ["Que l'homme peut voler", "Que l'âme se connaît sans passer par le corps", "Que les anges existent", "Que les sens sont fiables"],
            answer: 1,
            explanation: "Une intuition voisine du cogito cartésien, six siècles plus tôt.",
          },
          {
            q: "Quel ouvrage d'Al-Ghazâlî critique les philosophes ?",
            options: ["Le Discours décisif", "L'Incohérence des philosophes", "Le Canon de la médecine", "La Muqaddima"],
            answer: 1,
            explanation: "Tahâfut al-falâsifa, auquel Averroès répondra.",
          },
        ],
      },
      {
        slug: "thomas-et-maimonide",
        title: "Maïmonide et Thomas d'Aquin : les grandes synthèses",
        minutes: 9,
        philosophers: ["maimonide", "thomas-d-aquin"],
        intro:
          "Un rabbin de Cordoue et un dominicain de Naples : deux esprits immenses qui cherchent à accorder la Bible et Aristote.",
        sections: [
          {
            title: "Le Guide des égarés",
            body: "Maïmonide écrit pour ceux que la philosophie rend perplexes face à l'Écriture. Les expressions qui prêtent à Dieu un corps ou des émotions doivent être lues comme des métaphores. On ne peut dire de Dieu que ce qu'il n'est pas : c'est la théologie négative.",
          },
          {
            title: "La méthode scolastique",
            body: "À l'université de Paris, on enseigne par disputes : on pose une question, on expose les objections, on cite une autorité contraire, on répond, puis on réfute chaque objection. La Somme théologique de Thomas suit ce plan rigoureux sur des milliers d'articles.",
          },
          {
            title: "Les cinq voies",
            body: "Thomas propose cinq preuves de l'existence de Dieu à partir du monde : le mouvement exige un premier moteur ; les causes, une cause première ; les êtres contingents, un être nécessaire ; les degrés de perfection, un maximum ; l'ordre de la nature, une intelligence ordonnatrice. « La grâce ne détruit pas la nature, elle l'accomplit. »",
          },
        ],
        keyIdeas: [
          "Théologie négative : dire ce que Dieu n'est pas.",
          "La disputatio scolastique comme méthode rationnelle.",
          "Les cinq voies remontent du monde à Dieu.",
        ],
        meditation:
          "Une objection forte à tes convictions : saurais-tu la formuler aussi bien que celui qui la défend, comme le faisait Thomas ?",
        quiz: [
          {
            q: "En quelle langue Maïmonide a-t-il écrit le Guide des égarés ?",
            options: ["En hébreu", "En latin", "En arabe", "En grec"],
            answer: 2,
            explanation: "En judéo-arabe, la langue savante de son monde.",
          },
          {
            q: "Par quoi commence un article de la Somme théologique ?",
            options: ["Par la conclusion", "Par les objections", "Par une prière", "Par une anecdote"],
            answer: 1,
            explanation: "Thomas expose d'abord les arguments contraires à sa thèse.",
          },
          {
            q: "Combien de « voies » vers Dieu Thomas propose-t-il ?",
            options: ["Trois", "Quatre", "Cinq", "Sept"],
            answer: 2,
            explanation: "Mouvement, causalité, contingence, degrés, finalité.",
          },
        ],
      },
    ],
  },
  {
    slug: "la-raison-moderne",
    title: "La raison moderne",
    subtitle: "De Montaigne à Kant",
    description:
      "Le doute, la méthode, l'expérience, la critique : comment l'Europe moderne a refondé le savoir, la morale et la politique sur la raison humaine.",
    hue: 210,
    icon: "Compass",
    lessons: [
      {
        slug: "montaigne-et-descartes",
        title: "Du « Que sais-je ? » au « Je pense »",
        minutes: 10,
        philosophers: ["montaigne", "descartes"],
        intro:
          "Deux Français, deux doutes. Montaigne doute pour vivre sagement ; Descartes doute pour trouver une certitude inébranlable.",
        sections: [
          {
            title: "Montaigne, l'essai de soi",
            body: "Dans sa tour, Montaigne s'essaie : il pèse ses opinions, se peint lui-même dans ses contradictions. « Chaque homme porte la forme entière de l'humaine condition. » Son scepticisme est une école de tolérance : en découvrant les « cannibales » du Brésil, il remarque que « chacun appelle barbarie ce qui n'est pas de son usage ».",
          },
          {
            title: "Descartes, le doute méthodique",
            body: "Descartes décide de rejeter tout ce qui peut être mis en doute : les sens trompent parfois, je pourrais rêver, un malin génie pourrait me tromper même en mathématiques. Mais même si je me trompe, il faut que je sois pour me tromper : « Je pense, donc je suis. » Ce cogito est le premier principe de la philosophie.",
          },
          {
            title: "L'esprit et le corps",
            body: "Descartes distingue deux substances : la pensée (inétendue) et l'étendue (matière). Le corps est une machine. Cette séparation pose un problème redoutable, que lui posera la princesse Élisabeth de Bohême : comment une âme immatérielle peut-elle mouvoir un corps ?",
          },
        ],
        keyIdeas: [
          "Montaigne : le scepticisme comme art de vivre et de tolérer.",
          "Descartes : le doute méthodique mène au cogito.",
          "Le dualisme cartésien et le problème de l'union de l'âme et du corps.",
        ],
        meditation:
          "De quoi es-tu absolument certain ? Essaie d'en douter honnêtement pendant cinq minutes.",
        quiz: [
          {
            q: "Quelle est la devise de Montaigne ?",
            options: ["Sapere aude", "Que sais-je ?", "Carpe diem", "Cogito ergo sum"],
            answer: 1,
            explanation: "Elle résume son scepticisme bienveillant.",
          },
          {
            q: "Quelle hypothèse Descartes utilise-t-il pour douter même des mathématiques ?",
            options: ["Le malin génie", "La caverne", "L'homme volant", "Le voile d'ignorance"],
            answer: 0,
            explanation: "Un être tout-puissant et trompeur, dans la Première Méditation.",
          },
          {
            q: "Qui a objecté à Descartes le problème de l'union de l'âme et du corps ?",
            options: ["Pascal", "Élisabeth de Bohême", "Spinoza", "Hobbes"],
            answer: 1,
            explanation: "Dans leur correspondance de 1643.",
          },
        ],
      },
      {
        slug: "spinoza-et-la-joie",
        title: "Spinoza : la liberté par la joie",
        minutes: 9,
        philosophers: ["spinoza", "leibniz"],
        intro:
          "Excommunié à 23 ans, polisseur de lentilles, Spinoza a écrit l'un des livres les plus audacieux de l'histoire : une éthique démontrée comme un traité de géométrie.",
        sections: [
          {
            title: "Dieu, c'est-à-dire la Nature",
            body: "Il n'existe qu'une seule substance, infinie : Dieu ou la Nature. Tout ce qui existe en est une modification. Dieu n'est pas un roi qui juge et récompense ; il ne poursuit aucune fin. Tout découle nécessairement de sa nature, comme les propriétés du triangle découlent de sa définition.",
          },
          {
            title: "Le conatus et les affects",
            body: "Chaque chose s'efforce de persévérer dans son être : c'est le conatus. Chez l'homme, il s'appelle désir. La joie est le passage à une plus grande puissance d'agir ; la tristesse, à une moindre. Les passions tristes (haine, envie, crainte) nous affaiblissent ; les tyrans et les prêtres en jouent.",
          },
          {
            title: "La liberté",
            body: "Nous nous croyons libres parce que nous ignorons les causes qui nous déterminent, comme une pierre lancée qui croirait voler. La vraie liberté est de comprendre la nécessité : en connaissant les causes de nos affects, nous cessons de les subir. Leibniz, qui lui rendit visite, chercha à concilier ce rationalisme avec la liberté divine.",
          },
        ],
        keyIdeas: [
          "Deus sive Natura : une seule substance infinie.",
          "Le conatus, la joie et la tristesse comme variations de puissance.",
          "La liberté est la compréhension de la nécessité.",
        ],
        meditation:
          "Quelle passion triste t'affaiblit en ce moment ? En comprendre les causes la transforme-t-elle ?",
        quiz: [
          {
            q: "Comment Spinoza définit-il la joie ?",
            options: ["Le plaisir des sens", "Le passage à une plus grande perfection", "L'absence de douleur", "La grâce divine"],
            answer: 1,
            explanation: "Éthique III, définition des affects.",
          },
          {
            q: "Pourquoi les hommes se croient-ils libres, selon Spinoza ?",
            options: ["Parce qu'ils le sont", "Parce qu'ils ignorent les causes qui les déterminent", "Parce que Dieu le veut", "Parce qu'ils votent"],
            answer: 1,
            explanation: "Ils sont conscients de leurs désirs mais ignorent leurs causes.",
          },
          {
            q: "Selon quel ordre l'Éthique est-elle démontrée ?",
            options: ["Chronologique", "Géométrique", "Alphabétique", "Dialogué"],
            answer: 1,
            explanation: "More geometrico : définitions, axiomes, propositions.",
          },
        ],
      },
      {
        slug: "hume-et-kant",
        title: "Hume, Kant et la révolution critique",
        minutes: 12,
        philosophers: ["locke", "hume", "kant"],
        intro:
          "« Hume m'a réveillé de mon sommeil dogmatique », écrit Kant. Entre l'empirisme britannique et la critique allemande se joue le sort de la métaphysique.",
        sections: [
          {
            title: "L'empirisme : tout vient de l'expérience",
            body: "Pour Locke, l'esprit est à la naissance une table rase. Hume va plus loin : toutes nos idées dérivent d'impressions. Or nous n'avons jamais l'impression d'une connexion nécessaire entre une cause et son effet : nous voyons seulement que la boule de billard B bouge après que A l'a heurtée. La causalité est une habitude de l'esprit.",
          },
          {
            title: "La révolution copernicienne de Kant",
            body: "Si toute connaissance vient de l'expérience, comment la science peut-elle énoncer des lois universelles ? Kant renverse la perspective : ce n'est pas l'esprit qui se règle sur les objets, mais les objets sur les formes de l'esprit (espace, temps, catégories). Nous connaissons les phénomènes, jamais la chose en soi.",
          },
          {
            title: "La loi morale",
            body: "En morale, Kant cherche un principe valable pour tout être raisonnable : l'impératif catégorique. « Agis seulement d'après la maxime grâce à laquelle tu peux vouloir en même temps qu'elle devienne une loi universelle. » Et : traite l'humanité toujours comme une fin, jamais simplement comme un moyen. Les Lumières, c'est oser penser par soi-même : Sapere aude !",
          },
        ],
        keyIdeas: [
          "Hume : la causalité est une habitude, pas une nécessité perçue.",
          "Kant : les objets se règlent sur les formes de notre esprit.",
          "L'impératif catégorique fonde une morale universelle.",
        ],
        meditation:
          "Pense à un petit mensonge récent. Pourrais-tu vouloir que tout le monde mente dans la même situation ?",
        quiz: [
          {
            q: "Pour Hume, la causalité est…",
            options: ["Une loi divine", "Une habitude de l'esprit", "Une Idée éternelle", "Une illusion collective volontaire"],
            answer: 1,
            explanation: "Elle naît de la répétition de conjonctions constantes.",
          },
          {
            q: "Que signifie « Sapere aude » ?",
            options: ["Connais-toi toi-même", "Ose savoir / aie le courage de penser par toi-même", "Cueille le jour", "Souviens-toi que tu vas mourir"],
            answer: 1,
            explanation: "La devise des Lumières selon Kant (1784).",
          },
          {
            q: "Selon Kant, que ne pouvons-nous jamais connaître ?",
            options: ["Les phénomènes", "Les mathématiques", "La chose en soi", "Les lois de la physique"],
            answer: 2,
            explanation: "Nous connaissons les choses telles qu'elles nous apparaissent.",
          },
        ],
      },
    ],
  },
  {
    slug: "maitres-du-soupcon",
    title: "Histoire, volonté, soupçon",
    subtitle: "Hegel, Schopenhauer, Kierkegaard, Marx, Nietzsche",
    description:
      "Le XIXe siècle construit le plus grand des systèmes, puis le fait voler en éclats. L'histoire, l'économie, l'inconscient et la volonté entrent en philosophie.",
    hue: 350,
    icon: "Flame",
    lessons: [
      {
        slug: "hegel",
        title: "Hegel : l'Esprit dans l'histoire",
        minutes: 10,
        philosophers: ["hegel"],
        intro:
          "Pour Hegel, la vérité n'est pas un résultat figé : c'est un processus, et l'histoire humaine est le chemin par lequel l'Esprit prend conscience de lui-même.",
        sections: [
          {
            title: "La dialectique",
            body: "« Le bouton disparaît dans l'éclosion de la fleur, et l'on pourrait dire qu'il est réfuté par elle. » Chaque moment est nié par le suivant, qui pourtant le conserve et l'élève : c'est l'Aufhebung, le dépassement. Le vrai est le tout, le mouvement entier.",
          },
          {
            title: "Le maître et l'esclave",
            body: "Deux consciences s'affrontent pour être reconnues. L'une risque sa vie et devient maître ; l'autre, par peur de la mort, devient esclave. Mais le maître dépend de l'esclave, et l'esclave, par le travail qui transforme le monde, conquiert sa liberté. Cette page a inspiré Marx, Sartre, Fanon et bien d'autres.",
          },
          {
            title: "La raison dans l'histoire",
            body: "L'histoire est le progrès dans la conscience de la liberté : en Orient, un seul est libre ; en Grèce et à Rome, quelques-uns ; dans le monde moderne, tous. Les grands hommes sont les instruments d'une « ruse de la raison ». Et la philosophie arrive toujours trop tard : la chouette de Minerve prend son envol au crépuscule.",
          },
        ],
        keyIdeas: [
          "La dialectique : négation et dépassement qui conserve.",
          "La conscience de soi exige la reconnaissance d'autrui.",
          "L'histoire est le progrès de la conscience de la liberté.",
        ],
        meditation:
          "Une crise que tu as traversée : qu'a-t-elle détruit, et qu'a-t-elle conservé en le transformant ?",
        quiz: [
          {
            q: "Que signifie l'Aufhebung hégélienne ?",
            options: ["L'abolition pure et simple", "Un dépassement qui supprime et conserve", "Le retour à l'origine", "La répétition"],
            answer: 1,
            explanation: "Le mot allemand signifie à la fois supprimer, conserver et élever.",
          },
          {
            q: "Par quoi l'esclave conquiert-il sa liberté chez Hegel ?",
            options: ["Par la révolte armée", "Par le travail", "Par la prière", "Par la fuite"],
            answer: 1,
            explanation: "En transformant le monde, il se forme lui-même.",
          },
          {
            q: "Que symbolise la chouette de Minerve ?",
            options: ["La philosophie qui comprend après coup", "La prophétie", "La sagesse antique", "La science expérimentale"],
            answer: 0,
            explanation: "La philosophie pense une époque quand elle s'achève.",
          },
        ],
      },
      {
        slug: "kierkegaard-et-schopenhauer",
        title: "L'individu contre le système",
        minutes: 9,
        philosophers: ["schopenhauer", "kierkegaard"],
        intro:
          "Face à Hegel, deux solitaires : l'un voit dans le monde une volonté aveugle, l'autre défend l'individu singulier et son angoisse.",
        sections: [
          {
            title: "Schopenhauer : le monde comme volonté",
            body: "Derrière nos représentations, la chose en soi est une Volonté aveugle, un vouloir-vivre sans but. Désirer, c'est manquer, donc souffrir ; satisfait, le désir laisse place à l'ennui. La vie oscille comme un pendule entre les deux. Délivrance : l'art (surtout la musique), la compassion, l'ascèse — Schopenhauer est l'un des premiers Européens nourris des Upanishads et du bouddhisme.",
          },
          {
            title: "Kierkegaard : exister, c'est choisir",
            body: "« Le système » de Hegel explique tout, sauf l'existence de celui qui doit vivre et mourir. Kierkegaard distingue trois stades : esthétique (le plaisir, la dispersion), éthique (l'engagement, le devoir), religieux (le saut de la foi, illustré par Abraham). On ne passe de l'un à l'autre que par un choix.",
          },
          {
            title: "L'angoisse et le désespoir",
            body: "L'angoisse est le vertige de la liberté devant le possible. Le désespoir est la « maladie à la mort » : ne pas vouloir être soi, ou vouloir désespérément être soi tout seul. Kierkegaard annonce l'existentialisme du XXe siècle.",
          },
        ],
        keyIdeas: [
          "Schopenhauer : la vie oscille entre souffrance et ennui.",
          "Kierkegaard : trois stades de l'existence et le choix.",
          "L'angoisse comme vertige de la liberté.",
        ],
        meditation:
          "Dans quel « stade » vis-tu le plus souvent : esthétique, éthique ou religieux (au sens large d'un engagement absolu) ?",
        quiz: [
          {
            q: "Entre quoi la vie oscille-t-elle selon Schopenhauer ?",
            options: ["Joie et tristesse", "Souffrance et ennui", "Raison et passion", "Guerre et paix"],
            answer: 1,
            explanation: "Le désir insatisfait fait souffrir, satisfait il ennuie.",
          },
          {
            q: "Quel art délivre le mieux de la volonté selon Schopenhauer ?",
            options: ["L'architecture", "La musique", "La peinture", "Le théâtre"],
            answer: 1,
            explanation: "La musique exprime la volonté elle-même et nous en libère un instant.",
          },
          {
            q: "Lequel n'est PAS un stade de l'existence chez Kierkegaard ?",
            options: ["Esthétique", "Éthique", "Religieux", "Politique"],
            answer: 3,
            explanation: "Les trois stades sont esthétique, éthique et religieux.",
          },
        ],
      },
      {
        slug: "marx-et-nietzsche",
        title: "Marx et Nietzsche : philosopher au marteau",
        minutes: 12,
        philosophers: ["marx", "nietzsche", "mill"],
        intro:
          "Ricœur les a appelés, avec Freud, les « maîtres du soupçon » : derrière nos idées nobles, ils débusquent des intérêts, des rapports de force, des instincts.",
        sections: [
          {
            title: "Marx : transformer le monde",
            body: "« Les philosophes n'ont fait qu'interpréter le monde ; ce qui importe, c'est de le transformer. » Pour Marx, ce ne sont pas les idées qui mènent l'histoire mais les conditions matérielles de production. Le capitalisme sépare le travailleur de son produit et de lui-même : c'est l'aliénation. Le profit naît de la plus-value, le travail non payé.",
          },
          {
            title: "Nietzsche : la mort de Dieu",
            body: "« Dieu est mort, et c'est nous qui l'avons tué. » Les valeurs suprêmes se dévalorisent : c'est le nihilisme. Nietzsche fait la généalogie de la morale : la morale chrétienne de l'humilité serait née du ressentiment des faibles contre les forts. Il faut « transvaluer » les valeurs.",
          },
          {
            title: "Affirmer la vie",
            body: "Contre le nihilisme, Nietzsche propose de dire « oui » à la vie : la volonté de puissance comme force créatrice, l'éternel retour comme épreuve (pourrais-tu vouloir revivre ta vie à l'infini ?), le surhumain comme celui qui crée ses valeurs. Pendant ce temps, Mill défend en Angleterre une voie libérale : la liberté individuelle et le plus grand bonheur du plus grand nombre.",
          },
        ],
        keyIdeas: [
          "Marx : les conditions matérielles déterminent la conscience.",
          "Nietzsche : la mort de Dieu ouvre la crise du nihilisme.",
          "Affirmer la vie par la création de valeurs.",
        ],
        meditation:
          "L'épreuve de l'éternel retour : si tu devais revivre exactement cette année à l'infini, qu'est-ce que tu changerais dès aujourd'hui ?",
        quiz: [
          {
            q: "Qu'est-ce que la plus-value chez Marx ?",
            options: ["Une taxe d'État", "La valeur produite par le travail non payé", "Le prix des machines", "Les économies des ouvriers"],
            answer: 1,
            explanation: "Le travailleur produit plus de valeur qu'il n'en reçoit en salaire.",
          },
          {
            q: "Quelle œuvre de Nietzsche met en scène un prophète perse ?",
            options: ["Le Gai Savoir", "Ainsi parlait Zarathoustra", "Ecce Homo", "La Naissance de la tragédie"],
            answer: 1,
            explanation: "Zarathoustra annonce le surhumain.",
          },
          {
            q: "Selon Mill, quand peut-on limiter la liberté d'un individu ?",
            options: ["Quand il se nuit à lui-même", "Pour empêcher qu'il nuise à autrui", "Quand la majorité le veut", "Jamais"],
            answer: 1,
            explanation: "C'est le principe de non-nuisance (harm principle).",
          },
        ],
      },
    ],
  },
  {
    slug: "penser-aujourd-hui",
    title: "Penser aujourd'hui",
    subtitle: "Existence, langage, pouvoir, altérité",
    description:
      "Le XXe siècle pense après deux guerres mondiales, les totalitarismes et la colonisation. Des outils indispensables pour comprendre notre présent.",
    hue: 265,
    icon: "Sparkles",
    lessons: [
      {
        slug: "existentialisme",
        title: "L'existentialisme : condamnés à être libres",
        minutes: 11,
        philosophers: ["sartre", "beauvoir", "camus"],
        intro:
          "Dans les cafés de Saint-Germain-des-Prés, après la guerre, une philosophie devient un phénomène de société : l'homme n'est rien d'autre que ce qu'il se fait.",
        sections: [
          {
            title: "L'existence précède l'essence",
            body: "Un coupe-papier est conçu avant d'être fabriqué : son essence précède son existence. L'homme, lui, existe d'abord, surgit dans le monde, et se définit ensuite. Il n'y a pas de nature humaine donnée. Nous sommes donc « condamnés à être libres » et responsables de tout ce que nous faisons. Fuir cette liberté, c'est la mauvaise foi.",
          },
          {
            title: "On ne naît pas femme",
            body: "Avec Le Deuxième Sexe (1949), Beauvoir applique cette idée à la condition des femmes : « On ne naît pas femme : on le devient. » La féminité n'est pas un destin biologique mais une situation construite par la société, qui a fait de la femme l'Autre de l'homme. Sa morale de l'ambiguïté affirme : vouloir sa liberté, c'est vouloir celle des autres.",
          },
          {
            title: "Camus et l'absurde",
            body: "Camus refuse l'étiquette existentialiste. Pour lui, l'absurde naît de la confrontation entre notre exigence de sens et le silence du monde. Sisyphe, condamné à rouler éternellement son rocher, devient le héros absurde : lucide, il méprise son destin. « Il faut imaginer Sisyphe heureux. » La révolte fonde une solidarité : « Je me révolte, donc nous sommes. »",
          },
        ],
        keyIdeas: [
          "L'existence précède l'essence : nous nous faisons par nos actes.",
          "Beauvoir : la féminité est une construction sociale.",
          "Camus : vivre l'absurde dans la révolte et la lucidité.",
        ],
        meditation:
          "Quelle phrase commençant par « Je suis comme ça » utilises-tu parfois pour éviter un choix ?",
        quiz: [
          {
            q: "Quel exemple Sartre donne-t-il de la mauvaise foi ?",
            options: ["Le garçon de café", "Le boucher Ding", "Le malin génie", "Le coq plumé"],
            answer: 0,
            explanation: "Il joue à être garçon de café comme s'il n'était que cela.",
          },
          {
            q: "Qui a écrit « On ne naît pas femme : on le devient » ?",
            options: ["Simone Weil", "Simone de Beauvoir", "Hannah Arendt", "Mary Wollstonecraft"],
            answer: 1,
            explanation: "Dans Le Deuxième Sexe, 1949.",
          },
          {
            q: "Quel mythe Camus utilise-t-il pour penser l'absurde ?",
            options: ["Prométhée", "Sisyphe", "Œdipe", "Icare"],
            answer: 1,
            explanation: "Le Mythe de Sisyphe, 1942.",
          },
        ],
      },
      {
        slug: "langage-et-etre",
        title: "Le langage et l'être",
        minutes: 10,
        philosophers: ["wittgenstein", "heidegger", "bergson"],
        intro:
          "Au XXe siècle, la philosophie se divise entre une tradition analytique qui scrute le langage et une tradition continentale qui interroge l'existence. Deux géants nés la même année : Wittgenstein et Heidegger.",
        sections: [
          {
            title: "Wittgenstein : les limites du langage",
            body: "Le Tractatus soutient que le langage représente le monde comme une image logique, et que ce qui ne peut se dire — l'éthique, le sens de la vie — doit se montrer : « Ce dont on ne peut parler, il faut le taire. » Plus tard, les Recherches abandonnent cette idée : le sens d'un mot est son usage dans des jeux de langage variés. Beaucoup de problèmes philosophiques sont des « crampes » du langage à dénouer.",
          },
          {
            title: "Heidegger : l'oubli de l'être",
            body: "Pour Heidegger, la métaphysique a oublié la question du sens de l'être. L'homme, Dasein, est « jeté » dans le monde, préoccupé, tenté par le « On » anonyme. L'angoisse devant la mort révèle la possibilité d'une existence authentique. Il faut lire Heidegger en sachant son engagement nazi, qui reste une question pour sa pensée.",
          },
          {
            title: "Bergson : la durée",
            body: "Pour Bergson, la science spatialise le temps en instants juxtaposés. Mais le temps vécu, la durée, est continu et qualitatif, comme une mélodie. « Si je veux me préparer un verre d'eau sucrée, je dois attendre que le sucre fonde » : ce temps-là ne se compresse pas. Seule l'intuition saisit le mouvant.",
          },
        ],
        keyIdeas: [
          "Wittgenstein : le sens d'un mot est son usage.",
          "Heidegger : le Dasein et l'existence authentique.",
          "Bergson : la durée vécue contre le temps des horloges.",
        ],
        meditation:
          "Prends un mot comme « liberté » ou « amour » : dans combien de « jeux de langage » différents l'utilises-tu cette semaine ?",
        quiz: [
          {
            q: "Comment s'appelle le premier livre de Wittgenstein ?",
            options: ["Être et Temps", "Tractatus logico-philosophicus", "Les Mots et les Choses", "L'Évolution créatrice"],
            answer: 1,
            explanation: "Publié en 1921.",
          },
          {
            q: "Quel terme désigne l'existence humaine chez Heidegger ?",
            options: ["Conatus", "Dasein", "Logos", "Junzi"],
            answer: 1,
            explanation: "L'« être-là », l'étant pour qui il y va de son être.",
          },
          {
            q: "Que veut illustrer le verre d'eau sucrée de Bergson ?",
            options: ["La chimie des solutions", "La durée vécue irréductible", "Le plaisir épicurien", "La causalité"],
            answer: 1,
            explanation: "Le temps de l'attente est un temps vécu, qualitatif.",
          },
        ],
      },
      {
        slug: "pouvoir-et-alterite",
        title: "Pouvoir, mal et altérité",
        minutes: 12,
        philosophers: ["arendt", "foucault", "fanon", "levinas", "simone-weil"],
        intro:
          "Comment penser après Auschwitz, le goulag, la colonisation ? Ces penseurs nous donnent des outils pour comprendre la domination et y résister.",
        sections: [
          {
            title: "Arendt : la banalité du mal",
            body: "Analysant les Origines du totalitarisme, Arendt montre comment la terreur et l'idéologie détruisent la pluralité humaine. Au procès Eichmann, elle découvre un fonctionnaire ordinaire, incapable de penser : le mal extrême peut être « banal ». D'où l'importance vitale de penser, juger, agir ensemble.",
          },
          {
            title: "Foucault et Fanon : les visages du pouvoir",
            body: "Foucault montre que le pouvoir moderne n'est pas seulement interdiction : il produit des normes, discipline les corps (prison, école, hôpital) et gère la vie des populations (biopolitique). Fanon, psychiatre en Algérie, analyse l'aliénation coloniale qui s'inscrit jusque dans la psyché et le corps, et appelle à une décolonisation des esprits.",
          },
          {
            title: "Levinas et Weil : le visage et l'attention",
            body: "Levinas fait de l'éthique la philosophie première : le visage d'autrui, nu et vulnérable, me dit « Tu ne tueras point » et m'oblige avant toute décision. Simone Weil, qui travailla en usine, fait de l'attention à autrui la forme la plus rare et la plus pure de la générosité.",
          },
        ],
        keyIdeas: [
          "La banalité du mal : l'absence de pensée peut produire le pire.",
          "Le pouvoir discipline, normalise et peut aliéner jusque dans la psyché.",
          "Le visage d'autrui et l'attention fondent l'éthique.",
        ],
        meditation:
          "Quand t'est-il arrivé d'obéir sans penser ? Qu'aurait changé une minute de vraie réflexion ?",
        quiz: [
          {
            q: "À quel procès Arendt a-t-elle assisté ?",
            options: ["Nuremberg", "Eichmann à Jérusalem", "Dreyfus", "Socrate"],
            answer: 1,
            explanation: "En 1961, pour le New Yorker.",
          },
          {
            q: "Quel dispositif architectural Foucault prend-il comme modèle de la société disciplinaire ?",
            options: ["Le labyrinthe", "Le panoptique", "L'agora", "La pyramide"],
            answer: 1,
            explanation: "Imaginé par Bentham : voir sans être vu.",
          },
          {
            q: "Pour Levinas, que me dit le visage d'autrui ?",
            options: ["« Connais-toi toi-même »", "« Tu ne tueras point »", "« Ose savoir »", "« Deviens ce que tu es »"],
            answer: 1,
            explanation: "Le visage est une injonction éthique.",
          },
        ],
      },
    ],
  },
];

export const pathBySlug = Object.fromEntries(paths.map((p) => [p.slug, p])) as Record<string, Path>;

export function getLesson(pathSlug: string, lessonSlug: string) {
  const path = pathBySlug[pathSlug];
  if (!path) return undefined;
  const index = path.lessons.findIndex((l) => l.slug === lessonSlug);
  if (index === -1) return undefined;
  return { path, lesson: path.lessons[index], index };
}

export const totalLessons = paths.reduce((n, p) => n + p.lessons.length, 0);
