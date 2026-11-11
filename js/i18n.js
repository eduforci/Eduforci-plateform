/* EDUFORCI - Traduction du site (FR, EN, DE, ES, AR, ZH)
 * Principe : le site reste écrit en français dans le HTML. Ce script remplace
 * les textes connus (clé = texte français) par leur traduction.
 * Pour ajouter un texte : ajouter une ligne dans DICO avec [en, de, es, ar, zh].
 * À charger APRES notify.js. */
(function () {
  "use strict";
  var LANGS = { fr: "Français", en: "English", de: "Deutsch", es: "Español", ar: "العربية", zh: "中文" };
  var ORDRE = ["en", "de", "es", "ar", "zh"];
  var SP = "       ";

  var DICO = {
    "Bienvenue sur EDUFORCI – Trouvez rapidement un enseignant qualifié partout en Côte d'Ivoire.📞 Infoline : 0507938547 / 0747327309 Des enseignants vérifiés et certifiés, pour la réussite de vos enfants.": [
      "Welcome to EDUFORCI – Quickly find a qualified teacher anywhere in Côte d'Ivoire.📞 Infoline: 0507938547 / 0747327309" + SP + "Verified and certified teachers, for your children's success.",
      "Willkommen bei EDUFORCI – Finden Sie schnell eine qualifizierte Lehrkraft in ganz Côte d'Ivoire.📞 Infoline: 0507938547 / 0747327309" + SP + "Geprüfte und zertifizierte Lehrkräfte für den Erfolg Ihrer Kinder.",
      "Bienvenido a EDUFORCI – Encuentre rápidamente un profesor cualificado en toda Costa de Marfil.📞 Infolínea: 0507938547 / 0747327309" + SP + "Profesores verificados y certificados, para el éxito de sus hijos.",
      "مرحبًا بكم في EDUFORCI – اعثروا بسرعة على معلّم مؤهَّل في جميع أنحاء كوت ديفوار.📞 خط المعلومات: 0507938547 / 0747327309" + SP + "معلّمون موثَّقون ومعتمَدون من أجل نجاح أبنائكم.",
      "欢迎来到 EDUFORCI——在科特迪瓦各地快速找到合格的教师。📞 咨询热线：0507938547 / 0747327309" + SP + "经过审核和认证的教师，助力您孩子的成功。"
    ],
    "Trouver l'enseignant idéal à Abidjan et partout en Côte d'Ivoire.": [
      "Find the ideal teacher in Abidjan and all across Côte d'Ivoire.",
      "Finden Sie die ideale Lehrkraft in Abidjan und in ganz Côte d'Ivoire.",
      "Encuentre al profesor ideal en Abiyán y en toda Costa de Marfil.",
      "اعثروا على المعلّم المثالي في أبيدجان وفي جميع أنحاء كوت ديفوار.",
      "在阿比让和科特迪瓦各地找到理想的教师。"
    ],
    "Cours à domicile • Cours en ligne • Cours d'alphabétisation • Préparation CEPE • BEPC • BAC • Préparation aux concours": [
      "Home tutoring • Online classes • Literacy classes • CEPE • BEPC • BAC preparation • Competitive exam preparation",
      "Nachhilfe zu Hause • Online-Unterricht • Alphabetisierungskurse • Vorbereitung auf CEPE • BEPC • BAC • Aufnahmeprüfungen",
      "Clases a domicilio • Clases en línea • Clases de alfabetización • Preparación CEPE • BEPC • BAC • Preparación de oposiciones",
      "دروس منزلية • دروس عبر الإنترنت • دروس محو الأمية • التحضير لشهادات CEPE وBEPC وBAC • التحضير للمسابقات",
      "上门辅导 • 在线课程 • 扫盲课程 • CEPE、BEPC、BAC 备考 • 竞争性考试备考"
    ],
    "📍 Présents à Abidjan, Bouaké, Yamoussoukro, San-Pédro, Korhogo, Daloa, Man et partout ailleurs en Côte d'Ivoire": [
      "📍 Present in Abidjan, Bouaké, Yamoussoukro, San-Pédro, Korhogo, Daloa, Man and everywhere else in Côte d'Ivoire",
      "📍 Vertreten in Abidjan, Bouaké, Yamoussoukro, San-Pédro, Korhogo, Daloa, Man und überall sonst in Côte d'Ivoire",
      "📍 Presentes en Abiyán, Bouaké, Yamoussoukro, San-Pédro, Korhogo, Daloa, Man y en el resto de Costa de Marfil",
      "📍 حاضرون في أبيدجان وبواكي وياموسوكرو وسان بيدرو وكورهوغو ودالوا ومان وفي كل مكان في كوت ديفوار",
      "📍 服务覆盖阿比让、布瓦凯、亚穆苏克罗、圣佩德罗、科尔霍戈、达洛亚、芒以及科特迪瓦各地"
    ],
    "Parents": ["Parents", "Eltern", "Padres", "أولياء الأمور", "家长"],
    "Trouvez rapidement un professeur qualifié pour votre enfant.": [
      "Quickly find a qualified teacher for your child.",
      "Finden Sie schnell eine qualifizierte Lehrkraft für Ihr Kind.",
      "Encuentre rápidamente un profesor cualificado para su hijo.",
      "اعثروا بسرعة على معلّم مؤهَّل لطفلكم.",
      "快速为您的孩子找到合格的教师。"
    ],
    "Espace Parent": ["Parent Area", "Elternbereich", "Espacio para padres", "فضاء أولياء الأمور", "家长专区"],
    "Enseignants": ["Teachers", "Lehrkräfte", "Profesores", "المعلّمون", "教师"],
    "Inscrivez-vous et proposez vos services partout en Côte d'Ivoire.": [
      "Sign up and offer your services anywhere in Côte d'Ivoire.",
      "Registrieren Sie sich und bieten Sie Ihre Dienste in ganz Côte d'Ivoire an.",
      "Regístrese y ofrezca sus servicios en toda Costa de Marfil.",
      "سجّلوا وقدّموا خدماتكم في جميع أنحاء كوت ديفوار.",
      "注册并在科特迪瓦各地提供您的教学服务。"
    ],
    "Espace Enseignant": ["Teacher Area", "Lehrkräfte-Bereich", "Espacio para profesores", "فضاء المعلّمين", "教师专区"],
    "Établissements": ["Schools", "Schulen", "Centros educativos", "المؤسسات التعليمية", "学校"],
    "Publiez vos besoins et recrutez les meilleurs enseignants.": [
      "Post your needs and recruit the best teachers.",
      "Veröffentlichen Sie Ihren Bedarf und stellen Sie die besten Lehrkräfte ein.",
      "Publique sus necesidades y contrate a los mejores profesores.",
      "انشروا احتياجاتكم وقوموا بتوظيف أفضل المعلّمين.",
      "发布您的需求，招聘最优秀的教师。"
    ],
    "Espace École": ["School Area", "Schulbereich", "Espacio para centros", "فضاء المؤسسات", "学校专区"],
    "📍 Trouvez un enseignant près de chez vous": [
      "📍 Find a teacher near you", "📍 Finden Sie eine Lehrkraft in Ihrer Nähe",
      "📍 Encuentre un profesor cerca de usted", "📍 اعثروا على معلّم قريب منكم", "📍 在您附近找到教师"
    ],
    "Choisissez ou écrivez votre commune ou votre ville.": [
      "Choose or type your district or city.", "Wählen Sie Ihren Stadtteil oder Ihre Stadt aus oder geben Sie ihn ein.",
      "Elija o escriba su municipio o ciudad.", "اختاروا أو اكتبوا بلديتكم أو مدينتكم.", "请选择或输入您所在的区或城市。"
    ],
    "Ex : Cocody, Yopougon, Bouaké...": [
      "E.g. Cocody, Yopougon, Bouaké...", "z. B. Cocody, Yopougon, Bouaké...",
      "Ej.: Cocody, Yopougon, Bouaké...", "مثال: كوكودي، يوبوغون، بواكي...", "例如：科科迪、约普贡、布瓦凯……"
    ],
    "🔍 Voir les enseignants": ["🔍 See teachers", "🔍 Lehrkräfte ansehen", "🔍 Ver profesores", "🔍 عرض المعلّمين", "🔍 查看教师"],
    "Nos enseignants disponibles": ["Our available teachers", "Unsere verfügbaren Lehrkräfte", "Nuestros profesores disponibles", "معلّمونا المتاحون", "我们的可约教师"],
    "Des professeurs vérifiés, prêts à donner des cours particuliers.": [
      "Verified teachers, ready to give private lessons.", "Geprüfte Lehrkräfte, bereit für Privatunterricht.",
      "Profesores verificados, listos para dar clases particulares.", "معلّمون موثَّقون، مستعدون لتقديم دروس خصوصية.", "经过审核的教师，随时可以提供一对一辅导。"
    ],
    "Chargement des enseignants...": ["Loading teachers...", "Lehrkräfte werden geladen...", "Cargando profesores...", "جارٍ تحميل المعلّمين...", "正在加载教师……"],
    "Aucun enseignant approuvé pour le moment.": [
      "No approved teachers at the moment.", "Derzeit keine freigegebenen Lehrkräfte.",
      "Ningún profesor aprobado por el momento.", "لا يوجد معلّمون معتمدون حاليًا.", "目前暂无已通过审核的教师。"
    ],
    "👨‍🏫 Voir le profil des autres enseignants disponibles": [
      "👨‍🏫 See the profiles of other available teachers", "👨‍🏫 Profile weiterer verfügbarer Lehrkräfte ansehen",
      "👨‍🏫 Ver el perfil de otros profesores disponibles", "👨‍🏫 عرض ملفات المعلّمين المتاحين الآخرين", "👨‍🏫 查看其他可约教师的资料"
    ],
    "Comment ça marche ?": ["How does it work?", "So funktioniert es", "¿Cómo funciona?", "كيف يعمل الموقع؟", "如何使用？"],
    "Trouvez votre enseignant en trois étapes simples.": [
      "Find your teacher in three simple steps.", "Finden Sie Ihre Lehrkraft in drei einfachen Schritten.",
      "Encuentre a su profesor en tres sencillos pasos.", "اعثروا على معلّمكم في ثلاث خطوات بسيطة.", "只需三步，轻松找到您的教师。"
    ],
    "Choisissez": ["Choose", "Auswählen", "Elija", "اختاروا", "选择"],
    "Cherchez par ville, matière ou niveau et parcourez les profils d'enseignants vérifiés.": [
      "Search by city, subject or level and browse verified teacher profiles.",
      "Suchen Sie nach Stadt, Fach oder Niveau und durchstöbern Sie die Profile geprüfter Lehrkräfte.",
      "Busque por ciudad, materia o nivel y consulte los perfiles de profesores verificados.",
      "ابحثوا حسب المدينة أو المادة أو المستوى وتصفّحوا ملفات المعلّمين الموثَّقين.",
      "按城市、科目或年级搜索，浏览经过审核的教师资料。"
    ],
    "Contactez": ["Get in touch", "Kontaktieren", "Contacte", "تواصلوا", "联系"],
    "Écrivez-nous sur WhatsApp ou ouvrez le profil de l'enseignant pour réserver.": [
      "Write to us on WhatsApp or open the teacher's profile to book.",
      "Schreiben Sie uns auf WhatsApp oder öffnen Sie das Profil der Lehrkraft, um zu buchen.",
      "Escríbanos por WhatsApp o abra el perfil del profesor para reservar.",
      "راسلونا عبر واتساب أو افتحوا ملف المعلّم للحجز.",
      "通过 WhatsApp 联系我们，或打开教师资料进行预订。"
    ],
    "Les cours commencent": ["Lessons begin", "Der Unterricht beginnt", "Empiezan las clases", "تبدأ الدروس", "开始上课"],
    "L'enseignant se met d'accord avec vous sur les horaires, et le suivi de votre enfant démarre.": [
      "The teacher agrees on the schedule with you, and your child's follow-up begins.",
      "Die Lehrkraft stimmt die Zeiten mit Ihnen ab, und die Betreuung Ihres Kindes beginnt.",
      "El profesor acuerda los horarios con usted y comienza el seguimiento de su hijo.",
      "يتفق المعلّم معكم على المواعيد، ثم تبدأ متابعة طفلكم.",
      "教师与您商定上课时间，您孩子的学习跟进随即开始。"
    ],
    "Trouver un enseignant": ["Find a teacher", "Lehrkraft finden", "Encontrar un profesor", "اعثروا على معلّم", "寻找教师"],
    "Pourquoi faire confiance à EDUFORCI ?": [
      "Why trust EDUFORCI?", "Warum EDUFORCI vertrauen?", "¿Por qué confiar en EDUFORCI?", "لماذا تثقون في EDUFORCI؟", "为什么信赖 EDUFORCI？"
    ],
    "Chaque enseignant passe par l'équipe avant d'être présenté aux familles.": [
      "Every teacher goes through our team before being presented to families.",
      "Jede Lehrkraft wird von unserem Team geprüft, bevor sie den Familien vorgestellt wird.",
      "Cada profesor pasa por nuestro equipo antes de ser presentado a las familias.",
      "يمرّ كل معلّم عبر فريقنا قبل تقديمه للعائلات.",
      "每位教师在向家庭推荐之前，都要经过我们团队的审核。"
    ],
    "Profils vérifiés": ["Verified profiles", "Geprüfte Profile", "Perfiles verificados", "ملفات موثَّقة", "已审核的资料"],
    "Un enseignant n'apparaît sur le site qu'après approbation de son profil par l'équipe EDUFORCI.": [
      "A teacher only appears on the site after the EDUFORCI team has approved their profile.",
      "Eine Lehrkraft erscheint erst auf der Website, nachdem das EDUFORCI-Team ihr Profil freigegeben hat.",
      "Un profesor solo aparece en el sitio tras la aprobación de su perfil por el equipo de EDUFORCI.",
      "لا يظهر المعلّم على الموقع إلا بعد موافقة فريق EDUFORCI على ملفه.",
      "教师的资料必须经 EDUFORCI 团队批准后，才会显示在网站上。"
    ],
    "Recrutement rigoureux": ["Rigorous recruitment", "Strenge Auswahl", "Contratación rigurosa", "توظيف صارم", "严格的招聘流程"],
    "Étude du dossier, validation des documents et test avant toute admission.": [
      "File review, document validation and a test before any admission.",
      "Prüfung der Bewerbung, Validierung der Dokumente und ein Test vor jeder Zulassung.",
      "Estudio del expediente, validación de documentos y prueba antes de cualquier admisión.",
      "دراسة الملف والتحقق من الوثائق واختبار قبل أي قبول.",
      "录取前须经过材料审查、文件核验和测试。"
    ],
    "Certificat EDUFORCI": ["EDUFORCI certificate", "EDUFORCI-Zertifikat", "Certificado EDUFORCI", "شهادة EDUFORCI", "EDUFORCI 证书"],
    "Les enseignants admis reçoivent un certificat de recrutement vérifiable.": [
      "Admitted teachers receive a verifiable recruitment certificate.",
      "Aufgenommene Lehrkräfte erhalten ein überprüfbares Einstellungszertifikat.",
      "Los profesores admitidos reciben un certificado de contratación verificable.",
      "يحصل المعلّمون المقبولون على شهادة توظيف يمكن التحقق منها.",
      "被录取的教师将获得可核验的招聘证书。"
    ],
    "Équipe à l'écoute": ["A team that listens", "Ein Team, das zuhört", "Un equipo a su escucha", "فريق يصغي إليكم", "贴心的服务团队"],
    "Une question ? Notre équipe vous répond sur WhatsApp au +225 05 07 93 85 47.": [
      "A question? Our team answers you on WhatsApp at +225 05 07 93 85 47.",
      "Eine Frage? Unser Team antwortet Ihnen auf WhatsApp unter +225 05 07 93 85 47.",
      "¿Una pregunta? Nuestro equipo le responde por WhatsApp al +225 05 07 93 85 47.",
      "هل لديكم سؤال؟ يجيبكم فريقنا عبر واتساب على الرقم +225 05 07 93 85 47.",
      "有问题吗？我们的团队会通过 WhatsApp 回复您：+225 05 07 93 85 47。"
    ],
    "Questions fréquentes": ["Frequently asked questions", "Häufig gestellte Fragen", "Preguntas frecuentes", "الأسئلة الشائعة", "常见问题"],
    "Les réponses aux questions que se posent le plus souvent les parents.": [
      "Answers to the questions parents ask most often.", "Antworten auf die Fragen, die Eltern am häufigsten stellen.",
      "Respuestas a las preguntas que los padres se hacen con más frecuencia.", "إجابات عن الأسئلة التي يطرحها أولياء الأمور أكثر من غيرها.", "家长最常问的问题解答。"
    ],
    "Comment réserver un enseignant ?": ["How do I book a teacher?", "Wie buche ich eine Lehrkraft?", "¿Cómo reservar un profesor?", "كيف أحجز معلّمًا؟", "如何预订教师？"],
    "Ouvrez le profil de l'enseignant ou touchez « Réserver via WhatsApp ». Notre équipe vous aide à finaliser la réservation.": [
      "Open the teacher's profile or tap “Book via WhatsApp”. Our team helps you complete the booking.",
      "Öffnen Sie das Profil der Lehrkraft oder tippen Sie auf „Über WhatsApp buchen“. Unser Team hilft Ihnen bei der Buchung.",
      "Abra el perfil del profesor o pulse «Reservar por WhatsApp». Nuestro equipo le ayuda a finalizar la reserva.",
      "افتحوا ملف المعلّم أو اضغطوا على «الحجز عبر واتساب». يساعدكم فريقنا على إتمام الحجز.",
      "打开教师资料，或点击“通过 WhatsApp 预订”。我们的团队会协助您完成预订。"
    ],
    "Que veut dire « Vérifié » ?": ["What does “Verified” mean?", "Was bedeutet „Geprüft“?", "¿Qué significa «Verificado»?", "ماذا تعني كلمة «موثَّق»؟", "“已验证”是什么意思？"],
    "Le profil a été examiné et approuvé par l'équipe EDUFORCI avant d'être affiché sur le site.": [
      "The profile was reviewed and approved by the EDUFORCI team before being shown on the site.",
      "Das Profil wurde vom EDUFORCI-Team geprüft und freigegeben, bevor es auf der Website angezeigt wurde.",
      "El perfil fue examinado y aprobado por el equipo de EDUFORCI antes de mostrarse en el sitio.",
      "تمت مراجعة الملف والموافقة عليه من قبل فريق EDUFORCI قبل عرضه على الموقع.",
      "该资料在显示于网站之前，已由 EDUFORCI 团队审核并批准。"
    ],
    "Quel est le tarif d'un cours ?": ["How much does a lesson cost?", "Was kostet eine Unterrichtsstunde?", "¿Cuál es el precio de una clase?", "ما هو سعر الدرس؟", "一节课多少钱？"],
    "Chaque enseignant fixe son tarif (à l'heure ou au mois), indiqué sur son profil. Certains préfèrent le discuter directement avec la famille.": [
      "Each teacher sets their own rate (hourly or monthly), shown on their profile. Some prefer to discuss it directly with the family.",
      "Jede Lehrkraft legt ihren Tarif selbst fest (pro Stunde oder pro Monat), er steht im Profil. Manche besprechen ihn lieber direkt mit der Familie.",
      "Cada profesor fija su tarifa (por hora o por mes), indicada en su perfil. Algunos prefieren hablarlo directamente con la familia.",
      "يحدّد كل معلّم سعره (بالساعة أو بالشهر) ويظهر في ملفه. ويفضّل بعضهم الاتفاق عليه مباشرة مع العائلة.",
      "每位教师自行设定收费（按小时或按月），并显示在其资料中。部分教师更愿意直接与家庭商议。"
    ],
    "Proposez-vous des cours en ligne ?": ["Do you offer online classes?", "Bieten Sie Online-Unterricht an?", "¿Ofrecen clases en línea?", "هل تقدّمون دروسًا عبر الإنترنت؟", "你们提供在线课程吗？"],
    "Oui. Nous proposons des cours à domicile et des cours en ligne, ainsi que des cours d'alphabétisation.": [
      "Yes. We offer home tutoring and online classes, as well as literacy classes.",
      "Ja. Wir bieten Unterricht zu Hause und Online-Unterricht sowie Alphabetisierungskurse an.",
      "Sí. Ofrecemos clases a domicilio y en línea, así como clases de alfabetización.",
      "نعم. نقدّم دروسًا منزلية ودروسًا عبر الإنترنت، إضافةً إلى دروس محو الأمية.",
      "有。我们提供上门辅导和在线课程，也提供扫盲课程。"
    ],
    "Je suis enseignant : comment rejoindre EDUFORCI ?": [
      "I am a teacher: how do I join EDUFORCI?", "Ich bin Lehrkraft: Wie kann ich EDUFORCI beitreten?",
      "Soy profesor: ¿cómo me uno a EDUFORCI?", "أنا معلّم: كيف أنضمّ إلى EDUFORCI؟", "我是教师：如何加入 EDUFORCI？"
    ],
    "Créez votre compte dans l'espace Enseignant, complétez votre profil et déposez votre candidature. L'équipe étudie votre dossier.": [
      "Create your account in the Teacher area, complete your profile and submit your application. The team reviews your file.",
      "Erstellen Sie Ihr Konto im Lehrkräfte-Bereich, vervollständigen Sie Ihr Profil und reichen Sie Ihre Bewerbung ein. Das Team prüft Ihre Unterlagen.",
      "Cree su cuenta en el espacio para profesores, complete su perfil y presente su candidatura. El equipo estudiará su expediente.",
      "أنشئوا حسابكم في فضاء المعلّمين، وأكملوا ملفكم وقدّموا ترشحكم. يدرس الفريق ملفكم.",
      "在教师专区创建账户，完善个人资料并提交申请。团队将审核您的材料。"
    ],
    "Je dirige un établissement : comment recruter ?": [
      "I run a school: how do I recruit?", "Ich leite eine Schule: Wie kann ich Lehrkräfte einstellen?",
      "Dirijo un centro educativo: ¿cómo contratar?", "أدير مؤسسة تعليمية: كيف أوظّف؟", "我负责一所学校：如何招聘？"
    ],
    "Créez un compte dans l'espace Établissement, publiez vos besoins et recevez les candidatures d'enseignants qualifiés.": [
      "Create an account in the School area, post your needs and receive applications from qualified teachers.",
      "Erstellen Sie ein Konto im Schulbereich, veröffentlichen Sie Ihren Bedarf und erhalten Sie Bewerbungen qualifizierter Lehrkräfte.",
      "Cree una cuenta en el espacio para centros, publique sus necesidades y reciba candidaturas de profesores cualificados.",
      "أنشئوا حسابًا في فضاء المؤسسات، وانشروا احتياجاتكم واستقبلوا ترشحات معلّمين مؤهَّلين.",
      "在学校专区创建账户，发布您的需求，即可收到合格教师的申请。"
    ],
    "🛠️ Nos services": ["🛠️ Our services", "🛠️ Unsere Leistungen", "🛠️ Nuestros servicios", "🛠️ خدماتنا", "🛠️ 我们的服务"],
    "Des solutions éducatives adaptées à tous vos besoins.": [
      "Educational solutions tailored to all your needs.", "Bildungslösungen für alle Ihre Bedürfnisse.",
      "Soluciones educativas adaptadas a todas sus necesidades.", "حلول تعليمية تناسب جميع احتياجاتكم.", "满足您各种需求的教育解决方案。"
    ],
    "Recrutement d'enseignants": ["Teacher recruitment", "Lehrkräfte-Vermittlung", "Contratación de profesores", "توظيف المعلّمين", "教师招聘"],
    "Nous mettons à la disposition des établissements des enseignants qualifiés.": [
      "We provide schools with qualified teachers.", "Wir stellen Schulen qualifizierte Lehrkräfte zur Verfügung.",
      "Ponemos a disposición de los centros educativos profesores cualificados.", "نضع تحت تصرّف المؤسسات التعليمية معلّمين مؤهَّلين.", "我们为学校提供合格的教师。"
    ],
    "Découvrir": ["Discover", "Entdecken", "Descubrir", "اكتشفوا", "了解更多"],
    "Cours d'alphabétisation": ["Literacy classes", "Alphabetisierungskurse", "Clases de alfabetización", "دروس محو الأمية", "扫盲课程"],
    "Lecture, écriture et calcul de base pour enfants, jeunes et adultes.": [
      "Basic reading, writing and arithmetic for children, young people and adults.",
      "Grundlagen in Lesen, Schreiben und Rechnen für Kinder, Jugendliche und Erwachsene.",
      "Lectura, escritura y cálculo básico para niños, jóvenes y adultos.",
      "القراءة والكتابة والحساب الأساسي للأطفال والشباب والكبار.",
      "面向儿童、青少年和成年人的基础阅读、写作和算术。"
    ],
    "S'inscrire": ["Sign up", "Registrieren", "Inscribirse", "التسجيل", "注册"],
    "🖼️ Galerie": ["🖼️ Gallery", "🖼️ Galerie", "🖼️ Galería", "🖼️ معرض الصور", "🖼️ 图库"],
    "Découvrez EDUFORCI à travers nos activités et nos services éducatifs.": [
      "Discover EDUFORCI through our activities and educational services.",
      "Lernen Sie EDUFORCI durch unsere Aktivitäten und Bildungsangebote kennen.",
      "Descubra EDUFORCI a través de nuestras actividades y servicios educativos.",
      "اكتشفوا EDUFORCI من خلال أنشطتنا وخدماتنا التعليمية.",
      "通过我们的活动和教育服务了解 EDUFORCI。"
    ],
    "Cours à domicile": ["Home tutoring", "Unterricht zu Hause", "Clases a domicilio", "دروس منزلية", "上门辅导"],
    "Cours en ligne": ["Online classes", "Online-Unterricht", "Clases en línea", "دروس عبر الإنترنت", "在线课程"],
    "Nos enseignants": ["Our teachers", "Unsere Lehrkräfte", "Nuestros profesores", "معلّمونا", "我们的教师"],
    "Nos élèves": ["Our students", "Unsere Schülerinnen und Schüler", "Nuestros alumnos", "تلاميذنا", "我们的学生"],
    "Nos activités": ["Our activities", "Unsere Aktivitäten", "Nuestras actividades", "أنشطتنا", "我们的活动"],
    "Nos réussites": ["Our successes", "Unsere Erfolge", "Nuestros logros", "نجاحاتنا", "我们的成就"],
    "📞 Contactez-nous": ["📞 Contact us", "📞 Kontakt", "📞 Contáctenos", "📞 اتصلوا بنا", "📞 联系我们"],
    "Notre équipe est à votre écoute pour répondre à toutes vos questions.": [
      "Our team is here to answer all your questions.", "Unser Team beantwortet gerne alle Ihre Fragen.",
      "Nuestro equipo está a su disposición para responder a todas sus preguntas.", "فريقنا في خدمتكم للإجابة عن جميع أسئلتكم.", "我们的团队随时为您解答所有问题。"
    ],
    "Téléphone": ["Phone", "Telefon", "Teléfono", "الهاتف", "电话"],
    "Email": ["Email", "E-Mail", "Correo electrónico", "البريد الإلكتروني", "电子邮件"],
    "Adresse": ["Address", "Adresse", "Dirección", "العنوان", "地址"],
    "Côte d'Ivoire": ["Côte d'Ivoire", "Côte d'Ivoire", "Costa de Marfil", "كوت ديفوار", "科特迪瓦"],
    "Envoyez-nous un message": ["Send us a message", "Schreiben Sie uns", "Envíenos un mensaje", "أرسلوا لنا رسالة", "给我们留言"],
    "Votre nom": ["Your name", "Ihr Name", "Su nombre", "اسمكم", "您的姓名"],
    "Votre e-mail": ["Your email", "Ihre E-Mail-Adresse", "Su correo electrónico", "بريدكم الإلكتروني", "您的电子邮箱"],
    "Votre téléphone": ["Your phone number", "Ihre Telefonnummer", "Su teléfono", "رقم هاتفكم", "您的电话"],
    "Votre message": ["Your message", "Ihre Nachricht", "Su mensaje", "رسالتكم", "您的留言"],
    "Envoyer le message": ["Send message", "Nachricht senden", "Enviar mensaje", "إرسال الرسالة", "发送留言"],
    "Merci de remplir au moins votre nom, votre e-mail et votre message.": [
      "Please fill in at least your name, your email and your message.",
      "Bitte geben Sie mindestens Ihren Namen, Ihre E-Mail-Adresse und Ihre Nachricht an.",
      "Por favor, rellene al menos su nombre, su correo electrónico y su mensaje.",
      "يرجى ملء الاسم والبريد الإلكتروني والرسالة على الأقل.",
      "请至少填写您的姓名、电子邮箱和留言。"
    ],
    "EDUFORCI | Cours à domicile et recrutement d'enseignants en Côte d'Ivoire": [
      "EDUFORCI | Home tutoring and teacher recruitment in Côte d'Ivoire",
      "EDUFORCI | Nachhilfe zu Hause und Lehrkräfte-Vermittlung in Côte d'Ivoire",
      "EDUFORCI | Clases a domicilio y contratación de profesores en Costa de Marfil",
      "EDUFORCI | دروس منزلية وتوظيف المعلّمين في كوت ديفوار",
      "EDUFORCI | 科特迪瓦上门辅导与教师招聘"
    ]
  };

  var HTML_LANG = { fr: "fr", en: "en", de: "de", es: "es", ar: "ar", zh: "zh-CN" };
  var ATTRS = ["placeholder", "alt", "title"];
  var records = [];          // {node, attr|null, raw}
  var courante = "fr";
  var applique = false;

  function norm(s) {
    return String(s).replace(/ /g, " ").replace(/[’‘]/g, "'").replace(/\s+/g, " ").trim();
  }
  function traduire(cle, lang) {
    if (lang === "fr") return null;
    var e = DICO[cle];
    if (!e) return null;
    var i = ORDRE.indexOf(lang);
    return i < 0 ? null : (e[i] || null);
  }
  function valeur(rec) {
    var t = traduire(norm(rec.raw), courante);
    if (t === null) return rec.raw;
    if (rec.attr) return t;
    var d = rec.raw.match(/^\s*/)[0], f = rec.raw.match(/\s*$/)[0];
    return d + t + f;
  }
  function ecrire(rec) {
    var v = valeur(rec);
    if (rec.attr) { if (rec.node.getAttribute(rec.attr) !== v) rec.node.setAttribute(rec.attr, v); }
    else if (rec.node.nodeValue !== v) rec.node.nodeValue = v;
  }
  function ignorer(el) {
    var t = el && el.nodeName;
    return t === "SCRIPT" || t === "STYLE" || t === "NOSCRIPT" || t === "TEXTAREA";
  }
  function connu(n, attr) {
    for (var i = 0; i < records.length; i++) if (records[i].node === n && records[i].attr === attr) return true;
    return false;
  }
  function scanner(racine) {
    if (!racine || racine.nodeType === 8) return;
    if (racine.nodeType === 3) {
      if (!ignorer(racine.parentNode) && DICO[norm(racine.nodeValue)] && !connu(racine, null)) {
        var r = { node: racine, attr: null, raw: racine.nodeValue }; records.push(r); ecrire(r);
      }
      return;
    }
    if (racine.nodeType !== 1 || ignorer(racine)) return;
    ATTRS.forEach(function (a) {
      if (racine.hasAttribute(a) && DICO[norm(racine.getAttribute(a))] && !connu(racine, a)) {
        var r = { node: racine, attr: a, raw: racine.getAttribute(a) }; records.push(r); ecrire(r);
      }
    });
    for (var c = racine.firstChild; c; c = c.nextSibling) scanner(c);
  }
  function appliquerTout() {
    records = records.filter(function (r) { return r.node.isConnected !== false && document.contains(r.node); });
    records.forEach(ecrire);
    scanner(document.body);
    var cleTitre = norm(titreOrigine);
    var t = traduire(cleTitre, courante);
    document.title = t === null ? titreOrigine : t;
  }

  var titreOrigine = "";
  var obs = null;
  function surveiller() {
    if (obs || !window.MutationObserver) return;
    obs = new MutationObserver(function (muts) {
      if (courante === "fr" && !records.length) return;
      obs.disconnect();
      muts.forEach(function (m) { m.addedNodes && m.addedNodes.forEach(function (n) { scanner(n); }); });
      obs.observe(document.body, { childList: true, subtree: true });
    });
    obs.observe(document.body, { childList: true, subtree: true });
  }

  function styleLangue() {
    var s = document.createElement("style");
    s.textContent =
      "html[lang=ar] body, html[lang=ar] *:not(.fas):not(.fab):not(.far):not([class*='fa-']){font-family:'Noto Sans Arabic',Poppins,sans-serif;}" +
      "html[lang='zh-CN'] *:not(.fas):not(.fab):not(.far):not([class*='fa-']){font-family:Poppins,'PingFang SC','Microsoft YaHei','Noto Sans SC',sans-serif;}" +
      "html[dir=rtl] .fa-arrow-right,html[dir=rtl] .arrow-icon i{transform:scaleX(-1);}" +
      "html[dir=rtl] .hero-content,html[dir=rtl] .contact-form,html[dir=rtl] .sa-faq details p,html[dir=rtl] .sa-faq summary{text-align:right;}" +
      "#eduforci-lang{position:fixed;bottom:18px;left:18px;z-index:99990;background:#153A73;color:#fff;border-radius:30px;padding:6px 12px;display:flex;align-items:center;gap:6px;box-shadow:0 8px 20px rgba(0,0,0,.25);font-family:Poppins,sans-serif;}" +
      "#eduforci-lang select{background:transparent;color:#fff;border:none;font-size:14px;font-weight:600;font-family:inherit;cursor:pointer;outline:none;max-width:120px;}" +
      "#eduforci-lang select option{color:#153A73;}" +
      "html[dir=rtl] #eduforci-lang{left:auto;right:18px;}";
    document.head.appendChild(s);
  }

  function charger(lang) {
    if (lang === "ar" && !document.getElementById("eduforci-font-ar")) {
      var l = document.createElement("link");
      l.id = "eduforci-font-ar"; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;600;700&display=swap";
      document.head.appendChild(l);
    }
  }

  function definir(lang, memoriser) {
    if (!LANGS[lang]) lang = "fr";
    courante = lang;
    charger(lang);
    var h = document.documentElement;
    h.setAttribute("lang", HTML_LANG[lang]);
    h.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    appliquerTout();
    var sel = document.querySelector("#eduforci-lang select");
    if (sel && sel.value !== lang) sel.value = lang;
    if (memoriser) { try { localStorage.setItem("eduforci_lang", lang); } catch (e) {} }
  }

  function langueInitiale() {
    try { var m = localStorage.getItem("eduforci_lang"); if (m && LANGS[m]) return m; } catch (e) {}
    var prefs = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || "fr"];
    for (var i = 0; i < prefs.length; i++) {
      var p = String(prefs[i]).toLowerCase().slice(0, 2);
      if (LANGS[p]) return p;
    }
    return "fr";
  }

  function creerSelecteur() {
    var box = document.createElement("div");
    box.id = "eduforci-lang";
    box.innerHTML = "<span aria-hidden='true'>🌐</span>";
    var sel = document.createElement("select");
    sel.setAttribute("aria-label", "Langue / Language");
    Object.keys(LANGS).forEach(function (k) {
      var o = document.createElement("option"); o.value = k; o.textContent = LANGS[k]; sel.appendChild(o);
    });
    sel.addEventListener("change", function () { definir(sel.value, true); });
    box.appendChild(sel);
    document.body.appendChild(box);
  }

  // Les alertes (notify.js) : on traduit le message connu avant affichage.
  function brancherAlertes() {
    var ancienne = window.alert;
    window.alert = function (msg) {
      var t = traduire(norm(msg), courante);
      if (t !== null && typeof window.notify === "function") return window.notify(t, "avertissement");
      return ancienne.call(window, msg);
    };
  }

  function demarrer() {
    titreOrigine = document.title;
    styleLangue();
    creerSelecteur();
    brancherAlertes();
    surveiller();
    definir(langueInitiale(), false);
  }
  window.EDUFORCI_I18N = { definir: function (l) { definir(l, true); }, dico: DICO };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", demarrer);
  else demarrer();
})();
