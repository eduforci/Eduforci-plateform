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

  var FAM = "👨\u200d👩\u200d👧";
  var PROF = "👨\u200d🏫";

  var DICO = {
    "Recherche de professeurs | EDUFORCI": ["Teacher search | EDUFORCI", "Lehrkräftesuche | EDUFORCI", "Búsqueda de profesores | EDUFORCI", "البحث عن معلّمين | EDUFORCI", "教师搜索 | EDUFORCI"],
    "🔍 Rechercher un professeur": ["🔍 Search for a teacher", "🔍 Lehrkraft suchen", "🔍 Buscar un profesor", "🔍 البحث عن معلّم", "🔍 搜索教师"],
    "Toutes les matières": ["All subjects", "Alle Fächer", "Todas las materias", "جميع المواد", "所有科目"],
    "Allemand": ["German", "Deutsch", "Alemán", "الألمانية", "德语"],
    "Espagnol": ["Spanish", "Spanisch", "Español", "الإسبانية", "西班牙语"],
    "Tous les niveaux": ["All levels", "Alle Niveaus", "Todos los niveles", "جميع المستويات", "所有年级"],
    "1er cycle": ["1st cycle (lower secondary)", "1. Zyklus (Sekundarstufe I)", "1.er ciclo (secundaria)", "الدورة الأولى (الإعدادي)", "第一阶段（初中）"],
    "2nd cycle": ["2nd cycle (upper secondary)", "2. Zyklus (Sekundarstufe II)", "2.º ciclo (bachillerato)", "الدورة الثانية (الثانوي)", "第二阶段（高中）"],
    "Toutes les villes": ["All cities", "Alle Städte", "Todas las ciudades", "جميع المدن", "所有城市"],
    "Communes d'Abidjan": ["Abidjan districts", "Stadtteile von Abidjan", "Municipios de Abiyán", "بلديات أبيدجان", "阿比让各区"],
    "Grandes villes": ["Major cities", "Großstädte", "Grandes ciudades", "المدن الكبرى", "主要城市"],
    "🔍 Rechercher": ["🔍 Search", "🔍 Suchen", "🔍 Buscar", "🔍 بحث", "🔍 搜索"],
    "📍 Chercher par commune ou ville :": ["📍 Search by district or city:", "📍 Nach Stadtteil oder Stadt suchen:", "📍 Buscar por municipio o ciudad:", "📍 البحث حسب البلدية أو المدينة:", "📍 按区或城市搜索："],
    "Voir": ["View", "Ansehen", "Ver", "عرض", "查看"],
    "Résultats de la recherche": ["Search results", "Suchergebnisse", "Resultados de la búsqueda", "نتائج البحث", "搜索结果"],
    "⏳ Chargement des enseignants...": ["⏳ Loading teachers...", "⏳ Lehrkräfte werden geladen...", "⏳ Cargando profesores...", "⏳ جارٍ تحميل المعلّمين...", "⏳ 正在加载教师……"],
    "Aucun enseignant vérifié pour le moment": ["No verified teachers at the moment", "Derzeit keine geprüften Lehrkräfte", "Ningún profesor verificado por el momento", "لا يوجد معلّمون موثَّقون حاليًا", "目前暂无已验证的教师"],
    "Revenez bientôt.": ["Come back soon.", "Schauen Sie bald wieder vorbei.", "Vuelva pronto.", "عودوا قريبًا.", "请稍后再来。"],
    "Aucun enseignant trouvé": ["No teachers found", "Keine Lehrkräfte gefunden", "No se encontró ningún profesor", "لم يتم العثور على أي معلّم", "未找到教师"],
    "Essayez une autre matière, un autre niveau ou une autre ville.": ["Try another subject, level or city.", "Versuchen Sie ein anderes Fach, Niveau oder eine andere Stadt.", "Pruebe con otra materia, otro nivel u otra ciudad.", "جرّبوا مادة أو مستوى أو مدينة أخرى.", "请尝试其他科目、年级或城市。"],
    "Impossible de charger les enseignants": ["Unable to load teachers", "Lehrkräfte konnten nicht geladen werden", "No se pudieron cargar los profesores", "تعذّر تحميل المعلّمين", "无法加载教师"],
    "Vérifiez votre connexion et réessayez.": ["Check your connection and try again.", "Prüfen Sie Ihre Verbindung und versuchen Sie es erneut.", "Compruebe su conexión e inténtelo de nuevo.", "تحقّقوا من اتصالكم وأعيدوا المحاولة.", "请检查网络连接后重试。"],
    "Inscription Parent | EDUFORCI": ["Parent Registration | EDUFORCI", "Registrierung Eltern | EDUFORCI", "Registro de padres | EDUFORCI", "تسجيل ولي الأمر | EDUFORCI", "家长注册 | EDUFORCI"],
    "Inscription Établissement | EDUFORCI": ["School Registration | EDUFORCI", "Registrierung Schule | EDUFORCI", "Registro de centro educativo | EDUFORCI", "تسجيل المؤسسة | EDUFORCI", "学校注册 | EDUFORCI"],
    "Nom de l'établissement": ["School name", "Name der Schule", "Nombre del centro educativo", "اسم المؤسسة", "学校名称"],
    "Nom du responsable": ["Name of the person in charge", "Name der verantwortlichen Person", "Nombre del responsable", "اسم المسؤول", "负责人姓名"],
    "Type d'établissement": ["Type of school", "Schulart", "Tipo de centro", "نوع المؤسسة", "学校类型"],
    "Public": ["Public", "Öffentlich", "Público", "عمومي", "公立"],
    "Privé": ["Private", "Privat", "Privado", "خاص", "私立"],
    "Niveaux enseignés": ["Levels taught", "Unterrichtete Niveaus", "Niveles que se imparten", "المستويات المدرَّسة", "开设年级"],
    "Description": ["Description", "Beschreibung", "Descripción", "الوصف", "简介"],
    "Logo de l'établissement": ["School logo", "Schullogo", "Logotipo del centro", "شعار المؤسسة", "学校标志"],
    "Créer le compte Établissement": ["Create the School account", "Schulkonto erstellen", "Crear la cuenta del centro educativo", "إنشاء حساب المؤسسة", "创建学校账户"],
    "Créer un mot de passe": ["Create a password", "Passwort erstellen", "Crear una contraseña", "أنشئوا كلمة مرور", "设置密码"],
    "Créer mon compte": ["Create my account", "Mein Konto erstellen", "Crear mi cuenta", "إنشاء حسابي", "创建我的账户"],
    "Inscription Enseignant": ["Teacher Registration", "Registrierung Lehrkraft", "Registro de profesor", "تسجيل المعلّم", "教师注册"],
    "Inscription Parent": ["Parent Registration", "Registrierung Eltern", "Registro de padres", "تسجيل ولي الأمر", "家长注册"],
    "Inscription Établissement": ["School Registration", "Registrierung Schule", "Registro de centro educativo", "تسجيل المؤسسة", "学校注册"],
    "Inscription Enseignant | EDUFORCI": ["Teacher Registration | EDUFORCI", "Registrierung Lehrkraft | EDUFORCI", "Registro de profesor | EDUFORCI", "تسجيل المعلّم | EDUFORCI", "教师注册 | EDUFORCI"],
    "Nom et prénom": ["Full name", "Vor- und Nachname", "Nombre y apellidos", "الاسم الكامل", "姓名"],
    "Ville": ["City", "Stadt", "Ciudad", "المدينة", "城市"],
    "Matière enseignée": ["Subject taught", "Unterrichtetes Fach", "Materia que imparte", "المادة التي تدرّسونها", "任教科目"],
    "Ex : Mathématiques, Anglais...": ["E.g. Mathematics, English...", "z. B. Mathematik, Englisch...", "Ej.: Matemáticas, Inglés...", "مثال: الرياضيات، الإنجليزية...", "例如：数学、英语……"],
    "Niveau enseigné": ["Level taught", "Unterrichtetes Niveau", "Nivel que imparte", "المستوى الذي تدرّسونه", "任教年级"],
    "Choisir...": ["Choose...", "Auswählen...", "Elegir...", "اختاروا...", "请选择……"],
    "Université": ["University", "Universität", "Universidad", "الجامعة", "大学"],
    "Années d'expérience": ["Years of experience", "Jahre Berufserfahrung", "Años de experiencia", "سنوات الخبرة", "工作经验（年）"],
    "Diplôme le plus élevé": ["Highest qualification", "Höchster Abschluss", "Titulación más alta", "أعلى شهادة", "最高学历"],
    "Présentation": ["About you", "Vorstellung", "Presentación", "نبذة تعريفية", "自我介绍"],
    "Présentez-vous en quelques lignes...": ["Introduce yourself in a few lines...", "Stellen Sie sich in wenigen Zeilen vor...", "Preséntese en unas líneas...", "عرّفوا بأنفسكم في بضعة أسطر...", "请用几句话介绍一下自己……"],
    "Mode d'enseignement": ["Teaching mode", "Unterrichtsform", "Modalidad de enseñanza", "طريقة التدريس", "授课方式"],
    "À domicile": ["At home", "Zu Hause", "A domicilio", "في المنزل", "上门"],
    "En ligne": ["Online", "Online", "En línea", "عبر الإنترنت", "在线"],
    "Photo de profil": ["Profile photo", "Profilfoto", "Foto de perfil", "صورة الملف الشخصي", "头像"],
    "CV (PDF)": ["CV (PDF)", "Lebenslauf (PDF)", "CV (PDF)", "السيرة الذاتية (PDF)", "简历（PDF）"],
    "Confirmer le mot de passe": ["Confirm password", "Passwort bestätigen", "Confirmar contraseña", "تأكيد كلمة المرور", "确认密码"],
    "Créer mon compte Enseignant": ["Create my Teacher account", "Mein Lehrkräfte-Konto erstellen", "Crear mi cuenta de profesor", "إنشاء حساب المعلّم", "创建我的教师账户"],
    "Créer mon compte Parent": ["Create my Parent account", "Mein Eltern-Konto erstellen", "Crear mi cuenta de padre o madre", "إنشاء حساب ولي الأمر", "创建我的家长账户"],
    "Créer mon compte Établissement": ["Create my School account", "Mein Schulkonto erstellen", "Crear mi cuenta de centro educativo", "إنشاء حساب المؤسسة", "创建我的学校账户"],
    "J'ai déjà un compte": ["I already have an account", "Ich habe bereits ein Konto", "Ya tengo una cuenta", "لدي حساب بالفعل", "我已有账户"],
    "Les mots de passe ne correspondent pas.": ["The passwords do not match.", "Die Passwörter stimmen nicht überein.", "Las contraseñas no coinciden.", "كلمتا المرور غير متطابقتين.", "两次输入的密码不一致。"],

    "Ce compte n'est pas un compte Parent.": ["This account is not a Parent account.", "Dies ist kein Eltern-Konto.", "Esta cuenta no es una cuenta de padre o madre.", "هذا الحساب ليس حساب ولي أمر.", "该账户不是家长账户。"],
    "Ce compte n'est pas un compte Enseignant.": ["This account is not a Teacher account.", "Dies ist kein Lehrkräfte-Konto.", "Esta cuenta no es una cuenta de profesor.", "هذا الحساب ليس حساب معلّم.", "该账户不是教师账户。"],
    "Ce compte n'est pas un compte Établissement.": ["This account is not a School account.", "Dies ist kein Schulkonto.", "Esta cuenta no es una cuenta de centro educativo.", "هذا الحساب ليس حساب مؤسسة تعليمية.", "该账户不是学校账户。"],
    "Accès refusé : ce compte n'a pas les droits administrateur.": ["Access denied: this account does not have administrator rights.", "Zugriff verweigert: Dieses Konto hat keine Administratorrechte.", "Acceso denegado: esta cuenta no tiene derechos de administrador.", "تم رفض الوصول: هذا الحساب لا يملك صلاحيات المسؤول.", "访问被拒绝：该账户没有管理员权限。"],
    "Votre session a été fermée à distance par un administrateur.": ["Your session was closed remotely by an administrator.", "Ihre Sitzung wurde von einem Administrator aus der Ferne beendet.", "Un administrador cerró su sesión a distancia.", "تم إغلاق جلستكم عن بُعد من قبل أحد المسؤولين.", "您的会话已被管理员远程关闭。"],
    "🏠 Accueil": ["🏠 Home", "🏠 Startseite", "🏠 Inicio", "🏠 الرئيسية", "🏠 首页"],
    "Retour à l'accueil": ["Back to home", "Zurück zur Startseite", "Volver al inicio", "العودة إلى الرئيسية", "返回首页"],
    "Connexion Enseignant": ["Teacher Login", "Anmeldung Lehrkraft", "Acceso de profesor", "تسجيل دخول المعلّم", "教师登录"],
    "Connexion Parent": ["Parent Login", "Anmeldung Eltern", "Acceso de padres", "تسجيل دخول ولي الأمر", "家长登录"],
    "Connexion Établissement": ["School Login", "Anmeldung Schule", "Acceso de centro educativo", "تسجيل دخول المؤسسة", "学校登录"],
    "Adresse e-mail": ["Email address", "E-Mail-Adresse", "Correo electrónico", "البريد الإلكتروني", "电子邮箱"],
    "Mot de passe": ["Password", "Passwort", "Contraseña", "كلمة المرور", "密码"],
    "Afficher le mot de passe": ["Show password", "Passwort anzeigen", "Mostrar contraseña", "إظهار كلمة المرور", "显示密码"],
    "Masquer le mot de passe": ["Hide password", "Passwort verbergen", "Ocultar contraseña", "إخفاء كلمة المرور", "隐藏密码"],
    "Se connecter": ["Log in", "Anmelden", "Iniciar sesión", "تسجيل الدخول", "登录"],
    "Mot de passe oublié ?": ["Forgot your password?", "Passwort vergessen?", "¿Olvidó su contraseña?", "هل نسيتم كلمة المرور؟", "忘记密码？"],
    "Créer un compte Enseignant": ["Create a Teacher account", "Lehrkräfte-Konto erstellen", "Crear una cuenta de profesor", "إنشاء حساب معلّم", "创建教师账户"],
    "Créer un compte Parent": ["Create a Parent account", "Eltern-Konto erstellen", "Crear una cuenta de padre o madre", "إنشاء حساب ولي أمر", "创建家长账户"],
    "Créer un compte Établissement": ["Create a School account", "Schulkonto erstellen", "Crear una cuenta de centro educativo", "إنشاء حساب مؤسسة", "创建学校账户"],
    "Veuillez saisir votre adresse e-mail.": ["Please enter your email address.", "Bitte geben Sie Ihre E-Mail-Adresse ein.", "Por favor, introduzca su correo electrónico.", "يرجى إدخال بريدكم الإلكتروني.", "请输入您的电子邮箱。"],
    "Connexion Enseignant | EDUFORCI": ["Teacher Login | EDUFORCI", "Anmeldung Lehrkraft | EDUFORCI", "Acceso de profesor | EDUFORCI", "تسجيل دخول المعلّم | EDUFORCI", "教师登录 | EDUFORCI"],
    "Navigation": ["Navigation", "Navigation", "Navegación", "التنقّل", "导航"],
    "Accueil": ["Home", "Startseite", "Inicio", "الرئيسية", "首页"],
    "Trouver un professeur": ["Find a teacher", "Lehrkraft finden", "Encontrar un profesor", "اعثروا على معلّم", "寻找教师"],
    "Services": ["Services", "Leistungen", "Servicios", "الخدمات", "服务"],
    "Galerie": ["Gallery", "Galerie", "Galería", "معرض الصور", "图库"],
    "Contact": ["Contact", "Kontakt", "Contacto", "اتصال", "联系方式"],
    "connexion": ["Log in", "Anmelden", "Iniciar sesión", "تسجيل الدخول", "登录"],
    "inscription": ["Sign up", "Registrierung", "Registro", "إنشاء حساب", "注册"],
    [FAM + " Parent"]: [FAM + " Parent", FAM + " Elternteil", FAM + " Padre o madre", FAM + " ولي أمر", FAM + " 家长"],
    [PROF + " Enseignant"]: [PROF + " Teacher", PROF + " Lehrkraft", PROF + " Profesor", PROF + " معلّم", PROF + " 教师"],
    "🏫 Établissement": ["🏫 School", "🏫 Schule", "🏫 Centro educativo", "🏫 مؤسسة تعليمية", "🏫 学校"],
    "🏫 Etablissement": ["🏫 School", "🏫 Schule", "🏫 Centro educativo", "🏫 مؤسسة تعليمية", "🏫 学校"],
    "La plateforme qui connecte élèves, parents, enseignants et établissements partout en Côte d'Ivoire.": [
      "The platform connecting students, parents, teachers and schools across Côte d'Ivoire.",
      "Die Plattform, die Schüler, Eltern, Lehrkräfte und Schulen in ganz Côte d'Ivoire verbindet.",
      "La plataforma que conecta a alumnos, padres, profesores y centros educativos en toda Costa de Marfil.",
      "المنصّة التي تربط التلاميذ وأولياء الأمور والمعلّمين والمؤسسات التعليمية في جميع أنحاء كوت ديفوار.",
      "连接科特迪瓦各地学生、家长、教师和学校的平台。"
    ],
    "Espaces": ["Areas", "Bereiche", "Espacios", "الفضاءات", "专区"],
    "Espace Établissement": ["School Area", "Schulbereich", "Espacio para centros", "فضاء المؤسسات", "学校专区"],
    "Conditions d'utilisation": ["Terms of use", "Nutzungsbedingungen", "Condiciones de uso", "شروط الاستخدام", "使用条款"],
    "Politique de confidentialité": ["Privacy policy", "Datenschutzerklärung", "Política de privacidad", "سياسة الخصوصية", "隐私政策"],
    "EDUFORCI. Tous droits réservés.": ["EDUFORCI. All rights reserved.", "EDUFORCI. Alle Rechte vorbehalten.", "EDUFORCI. Todos los derechos reservados.", "EDUFORCI. جميع الحقوق محفوظة.", "EDUFORCI. 版权所有。"],
    "Bonjour 👋, bienvenue chez": ["Hello 👋, welcome to", "Hallo 👋, willkommen bei", "Hola 👋, bienvenido a", "مرحبًا 👋، أهلًا بكم في", "你好 👋，欢迎来到"],
    "Comment puis-je vous aider ?": ["How can I help you?", "Wie kann ich Ihnen helfen?", "¿En qué puedo ayudarle?", "كيف يمكنني مساعدتكم؟", "请问有什么可以帮您？"],
    "Ouvrir le chat": ["Open chat", "Chat öffnen", "Abrir el chat", "فتح المحادثة", "打开聊天"],
    "Discuter sur WhatsApp": ["Chat on WhatsApp", "Auf WhatsApp chatten", "Chatear por WhatsApp", "الدردشة عبر واتساب", "在 WhatsApp 上聊天"],
    "Expert": ["Expert", "Experte", "Experto", "خبير", "专家"],
    "Vérifié": ["Verified", "Geprüft", "Verificado", "موثَّق", "已验证"],
    "Disponible": ["Available", "Verfügbar", "Disponible", "متاح", "可预约"],
    "Indisponible": ["Unavailable", "Nicht verfügbar", "No disponible", "غير متاح", "暂不可约"],
    "Tarif à discuter": ["Rate to be discussed", "Tarif nach Absprache", "Tarifa a convenir", "السعر بالاتفاق", "价格面议"],
    "Enseignant": ["Teacher", "Lehrkraft", "Profesor", "معلّم", "教师"],
    "Réserver via WhatsApp": ["Book via WhatsApp", "Über WhatsApp buchen", "Reservar por WhatsApp", "الحجز عبر واتساب", "通过 WhatsApp 预订"],
    "Voir le profil": ["View profile", "Profil ansehen", "Ver perfil", "عرض الملف", "查看资料"],
    "Erreur lors du chargement des enseignants.": ["Error while loading teachers.", "Fehler beim Laden der Lehrkräfte.", "Error al cargar los profesores.", "حدث خطأ أثناء تحميل المعلّمين.", "加载教师时出错。"],
    "📚 Choisissez une matière": ["📚 Choose a subject", "📚 Fach auswählen", "📚 Elija una materia", "📚 اختاروا مادة", "📚 选择科目"],
    "Cliquez sur une matière pour voir les enseignants correspondants.": [
      "Click a subject to see the matching teachers.", "Klicken Sie auf ein Fach, um die passenden Lehrkräfte zu sehen.",
      "Pulse una materia para ver los profesores correspondientes.", "اضغطوا على مادة لعرض المعلّمين المناسبين.", "点击科目即可查看相应的教师。"
    ],
    "Mathématiques": ["Mathematics", "Mathematik", "Matemáticas", "الرياضيات", "数学"],
    "Maths": ["Maths", "Mathe", "Mates", "رياضيات", "数学"],
    "Français": ["French", "Französisch", "Francés", "الفرنسية", "法语"],
    "Anglais": ["English", "Englisch", "Inglés", "الإنجليزية", "英语"],
    "Physique-Chimie": ["Physics-Chemistry", "Physik-Chemie", "Física y Química", "الفيزياء والكيمياء", "物理化学"],
    "PC": ["Physics-Chem.", "Physik-Chemie", "Física-Química", "فيزياء-كيمياء", "物理化学"],
    "SVT": ["Life & Earth Sciences", "Biologie und Geowissenschaften", "Ciencias de la vida y de la Tierra", "علوم الحياة والأرض", "生命与地球科学"],
    "Philosophie": ["Philosophy", "Philosophie", "Filosofía", "الفلسفة", "哲学"],
    "Histoire-Géo": ["History-Geography", "Geschichte-Geografie", "Historia y Geografía", "التاريخ والجغرافيا", "历史地理"],
    "Histoire-Géographie": ["History-Geography", "Geschichte-Geografie", "Historia y Geografía", "التاريخ والجغرافيا", "历史地理"],
    "Informatique": ["Computer science", "Informatik", "Informática", "المعلوماتية", "信息技术"],
    "Primaire": ["Primary", "Grundschule", "Primaria", "الابتدائي", "小学"],
    "Collège": ["Lower secondary", "Sekundarstufe I", "Secundaria (collège)", "الإعدادي", "初中"],
    "Lycée": ["Upper secondary", "Sekundarstufe II", "Bachillerato (lycée)", "الثانوي", "高中"],
    "Concours": ["Competitive exams", "Aufnahmeprüfungen", "Oposiciones y concursos", "المسابقات", "竞争性考试"],
    "Préparation au CEPE": ["CEPE preparation", "Vorbereitung auf das CEPE", "Preparación al CEPE", "التحضير لشهادة CEPE", "CEPE 备考"],
    "Préparation au BEPC": ["BEPC preparation", "Vorbereitung auf das BEPC", "Preparación al BEPC", "التحضير لشهادة BEPC", "BEPC 备考"],
    "Préparation au BAC": ["BAC preparation", "Vorbereitung auf das BAC", "Preparación al BAC", "التحضير لشهادة BAC", "BAC 备考"],
    "Préparation aux concours": ["Competitive exam preparation", "Vorbereitung auf Aufnahmeprüfungen", "Preparación de oposiciones", "التحضير للمسابقات", "竞争性考试备考"],
    [PROF + " Vous êtes enseignant ?"]: [PROF + " Are you a teacher?", PROF + " Sind Sie Lehrkraft?", PROF + " ¿Es usted profesor?", PROF + " هل أنتم معلّمون؟", PROF + " 您是教师吗？"],
    "Rejoignez EDUFORCI, présentez votre profil aux parents et trouvez de nouveaux élèves partout en Côte d'Ivoire.": [
      "Join EDUFORCI, present your profile to parents and find new students across Côte d'Ivoire.",
      "Treten Sie EDUFORCI bei, präsentieren Sie Ihr Profil den Eltern und finden Sie neue Schüler in ganz Côte d'Ivoire.",
      "Únase a EDUFORCI, presente su perfil a los padres y encuentre nuevos alumnos en toda Costa de Marfil.",
      "انضمّوا إلى EDUFORCI، وقدّموا ملفكم لأولياء الأمور واعثروا على تلاميذ جدد في جميع أنحاء كوت ديفوار.",
      "加入 EDUFORCI，向家长展示您的资料，在科特迪瓦各地找到新的学生。"
    ],
    "Postuler comme enseignant": ["Apply as a teacher", "Als Lehrkraft bewerben", "Postular como profesor", "التقدّم كمعلّم", "申请成为教师"],
    "🏫 Vous êtes un établissement ?": ["🏫 Are you a school?", "🏫 Sind Sie eine Schule?", "🏫 ¿Es usted un centro educativo?", "🏫 هل أنتم مؤسسة تعليمية؟", "🏫 您是学校吗？"],
    "Publiez vos besoins et recrutez des enseignants qualifiés pour votre école.": [
      "Post your needs and recruit qualified teachers for your school.", "Veröffentlichen Sie Ihren Bedarf und stellen Sie qualifizierte Lehrkräfte für Ihre Schule ein.",
      "Publique sus necesidades y contrate profesores cualificados para su centro.", "انشروا احتياجاتكم ووظّفوا معلّمين مؤهَّلين لمدرستكم.", "发布您的需求，为您的学校招聘合格的教师。"
    ],
    "Recruter des enseignants": ["Recruit teachers", "Lehrkräfte einstellen", "Contratar profesores", "توظيف معلّمين", "招聘教师"],
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


  // Textes avec des nombres (cartes d'enseignants)
  var MOTIFS = [

    // Messages de js/auth.js (avec l'adresse e-mail de la personne)
    { re: /^Compte créé avec succès ! Un e-mail de confirmation a été envoyé à (.+?)\. Merci de cliquer sur le lien reçu avant de vous connecter\. ⚠️ Si vous ne le voyez pas d'ici quelques minutes, regardez dans le dossier "Spam" ou "Courrier indésirable" de votre boîte mail : c'est souvent là qu'il atterrit la première fois\.$/, t: [
      "Account created successfully! A confirmation email has been sent to $1. Please click the link you received before logging in.\n\n⚠️ If you don't see it within a few minutes, check your \"Spam\" or \"Junk\" folder: that is often where it lands the first time.",
      "Konto erfolgreich erstellt! Eine Bestätigungs-E-Mail wurde an $1 gesendet. Bitte klicken Sie auf den erhaltenen Link, bevor Sie sich anmelden.\n\n⚠️ Falls Sie sie nach einigen Minuten nicht sehen, prüfen Sie Ihren Spam-Ordner: Dort landet sie beim ersten Mal oft.",
      "¡Cuenta creada con éxito! Se ha enviado un correo de confirmación a $1. Haga clic en el enlace recibido antes de iniciar sesión.\n\n⚠️ Si no lo ve en unos minutos, revise la carpeta «Spam» o «Correo no deseado»: suele llegar allí la primera vez.",
      "تم إنشاء الحساب بنجاح! تم إرسال رسالة تأكيد إلى $1. يرجى الضغط على الرابط الذي وصلكم قبل تسجيل الدخول.\n\n⚠️ إذا لم تجدوها خلال بضع دقائق، فتحقّقوا من مجلد الرسائل غير المرغوب فيها (Spam)، فغالبًا ما تصل إليه في المرة الأولى.",
      "账户创建成功！确认邮件已发送至 $1。登录前请点击您收到的链接。\n\n⚠️ 如果几分钟内没有看到，请查看邮箱的“垃圾邮件”文件夹：第一次邮件常常会被放在那里。"
    ] },
    { re: /^Votre adresse e-mail n'est pas encore confirmée\. Un lien de confirmation vient de vous être envoyé à (.+?)\. Merci de cliquer dessus avant de vous connecter\. ⚠️ Pensez à regarder dans le dossier "Spam" ou "Courrier indésirable" de votre boîte mail\.$/, t: [
      "Your email address has not been confirmed yet. A confirmation link has just been sent to $1. Please click it before logging in.\n\n⚠️ Remember to check your \"Spam\" or \"Junk\" folder as well.",
      "Ihre E-Mail-Adresse wurde noch nicht bestätigt. Ein Bestätigungslink wurde soeben an $1 gesendet. Bitte klicken Sie darauf, bevor Sie sich anmelden.\n\n⚠️ Prüfen Sie bitte auch Ihren Spam-Ordner.",
      "Su correo electrónico aún no está confirmado. Se acaba de enviar un enlace de confirmación a $1. Haga clic en él antes de iniciar sesión.\n\n⚠️ Recuerde revisar también la carpeta «Spam» o «Correo no deseado».",
      "لم يتم تأكيد بريدكم الإلكتروني بعد. تم إرسال رابط التأكيد إلى $1 للتو. يرجى الضغط عليه قبل تسجيل الدخول.\n\n⚠️ تذكّروا أيضًا فحص مجلد الرسائل غير المرغوب فيها (Spam).",
      "您的电子邮箱尚未确认。确认链接刚刚发送至 $1。登录前请先点击该链接。\n\n⚠️ 也请查看邮箱的“垃圾邮件”文件夹。"
    ] },
    { re: /^Votre adresse e-mail n'est pas encore confirmée\. Un lien de confirmation vient de vous être envoyé à (.+?)\. ⚠️ Pensez à vérifier également votre dossier Spam ou Courrier indésirable\. Après avoir confirmé votre adresse e-mail, revenez vous connecter\.$/, t: [
      "Your email address has not been confirmed yet.\n\nA confirmation link has just been sent to $1.\n\n⚠️ Remember to check your Spam or Junk folder as well.\n\nAfter confirming your email address, come back and log in.",
      "Ihre E-Mail-Adresse wurde noch nicht bestätigt.\n\nEin Bestätigungslink wurde soeben an $1 gesendet.\n\n⚠️ Prüfen Sie bitte auch Ihren Spam-Ordner.\n\nKehren Sie nach der Bestätigung zurück und melden Sie sich an.",
      "Su correo electrónico aún no está confirmado.\n\nSe acaba de enviar un enlace de confirmación a $1.\n\n⚠️ Recuerde revisar también la carpeta de Spam o Correo no deseado.\n\nTras confirmar su correo, vuelva a iniciar sesión.",
      "لم يتم تأكيد بريدكم الإلكتروني بعد.\n\nتم إرسال رابط التأكيد إلى $1 للتو.\n\n⚠️ تذكّروا أيضًا فحص مجلد الرسائل غير المرغوب فيها (Spam).\n\nبعد تأكيد بريدكم الإلكتروني، عودوا لتسجيل الدخول.",
      "您的电子邮箱尚未确认。\n\n确认链接刚刚发送至 $1。\n\n⚠️ 也请查看邮箱的“垃圾邮件”文件夹。\n\n确认邮箱后，请返回登录。"
    ] },
    { re: /^Un e-mail de réinitialisation a été envoyé à (.+?)\. Vérifiez également le dossier Spam\.$/, t: [
      "A password reset email has been sent to $1. Also check your Spam folder.",
      "Eine E-Mail zum Zurücksetzen des Passworts wurde an $1 gesendet. Prüfen Sie auch Ihren Spam-Ordner.",
      "Se ha enviado un correo para restablecer la contraseña a $1. Revise también la carpeta de Spam.",
      "تم إرسال رسالة إعادة تعيين كلمة المرور إلى $1. تحقّقوا أيضًا من مجلد الرسائل غير المرغوب فيها (Spam).",
      "重置密码的邮件已发送至 $1。也请查看垃圾邮件文件夹。"
    ] },
    { re: /^([01]) avis$/, t: ["$1 review", "$1 Bewertung", "$1 opinión", "$1 تقييم", "$1 条评价"] },
    { re: /^(\d+) avis$/, t: ["$1 reviews", "$1 Bewertungen", "$1 opiniones", "$1 تقييمات", "$1 条评价"] },
    { re: /^(\d+) an d'expérience$/, t: ["$1 year of experience", "$1 Jahr Erfahrung", "$1 año de experiencia", "خبرة $1 سنة", "$1 年经验"] },
    { re: /^(\d+) ans d'expérience$/, t: ["$1 years of experience", "$1 Jahre Erfahrung", "$1 años de experiencia", "خبرة $1 سنوات", "$1 年经验"] },
    { re: /^(.+) FCFA \/ mois$/, t: ["$1 FCFA / month", "$1 FCFA / Monat", "$1 FCFA / mes", "$1 فرنك / شهر", "$1 FCFA / 月"] },
    { re: /^(.+) FCFA \/ h$/, t: ["$1 FCFA / hour", "$1 FCFA / Std.", "$1 FCFA / hora", "$1 فرنك / ساعة", "$1 FCFA / 小时"] }
  ];

  // Cherche la traduction d'un texte : dictionnaire, puis motifs, puis listes "Maths, PC, ..."
  function entree(cle) {
    if (Object.prototype.hasOwnProperty.call(DICO, cle)) return DICO[cle];
    var i, m;
    for (i = 0; i < MOTIFS.length; i++) {
      m = cle.match(MOTIFS[i].re);
      if (m) return MOTIFS[i].t.map(function (t) { return t.replace("$1", m[1]); });
    }
    var pre = cle.match(/^(📚|📍|🎓) (.+)$/);
    if (pre) {
      var sous = entree(pre[2]);
      if (sous) return sous.map(function (x) { return pre[1] + " " + x; });
    }
    if (cle.indexOf(",") > -1) {
      var parts = cle.split(/\s*,\s*/), connus = 0;
      var trad = ORDRE.map(function () { return []; });
      parts.forEach(function (p) {
        var e = Object.prototype.hasOwnProperty.call(DICO, p) ? DICO[p] : null;
        if (e) connus++;
        ORDRE.forEach(function (_, k) { trad[k].push(e ? e[k] : p); });
      });
      if (connus) return trad.map(function (a) { return a.join(", "); });
    }
    return null;
  }


  // Erreurs Firebase (alert(error.code + "\n\n" + error.message))
  var ERR_AUTH = [
    { re: /network-request-failed/, t: ["Unable to connect: check your internet connection and try again.", "Verbindung nicht möglich: Prüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.", "No se puede conectar: compruebe su conexión a internet e inténtelo de nuevo.", "تعذّر الاتصال: تحقّقوا من اتصالكم بالإنترنت وأعيدوا المحاولة.", "无法连接：请检查网络连接后重试。"] },
    { re: /invalid-credential|wrong-password/, t: ["Incorrect email or password.", "E-Mail oder Passwort falsch.", "Correo electrónico o contraseña incorrectos.", "البريد الإلكتروني أو كلمة المرور غير صحيحة.", "邮箱或密码不正确。"] },
    { re: /user-not-found/, t: ["No account found with this email.", "Kein Konto mit dieser E-Mail-Adresse gefunden.", "No se encontró ninguna cuenta con este correo.", "لا يوجد حساب بهذا البريد الإلكتروني.", "未找到使用此邮箱的账户。"] },
    { re: /email-already-in-use/, t: ["An account already exists with this email address.", "Mit dieser E-Mail-Adresse existiert bereits ein Konto.", "Ya existe una cuenta con este correo electrónico.", "يوجد حساب بهذا البريد الإلكتروني بالفعل.", "此邮箱已被注册。"] },
    { re: /weak-password/, t: ["The password must contain at least 6 characters.", "Das Passwort muss mindestens 6 Zeichen enthalten.", "La contraseña debe tener al menos 6 caracteres.", "يجب أن تتكوّن كلمة المرور من 6 أحرف على الأقل.", "密码至少需要 6 个字符。"] },
    { re: /invalid-email/, t: ["This email address is not valid.", "Diese E-Mail-Adresse ist ungültig.", "Este correo electrónico no es válido.", "هذا البريد الإلكتروني غير صالح.", "此邮箱地址无效。"] },
    { re: /too-many-requests/, t: ["Too many attempts. Please try again in a few minutes.", "Zu viele Versuche. Bitte versuchen Sie es in einigen Minuten erneut.", "Demasiados intentos. Inténtelo de nuevo en unos minutos.", "محاولات كثيرة جدًا. يرجى إعادة المحاولة بعد بضع دقائق.", "尝试次数过多，请几分钟后再试。"] },
    { re: /user-disabled/, t: ["This account has been disabled.", "Dieses Konto wurde deaktiviert.", "Esta cuenta ha sido desactivada.", "تم تعطيل هذا الحساب.", "该账户已被停用。"] },
    { re: /.*/, t: ["An error occurred. Please try again.", "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.", "Se produjo un error. Inténtelo de nuevo.", "حدث خطأ. يرجى إعادة المحاولة.", "发生错误，请重试。"] }
  ];

  // Traduit un message de notification : renvoie {text, type} ou null
  function traduireNotif(msg) {
    if (courante === "fr") return null;
    var i = ORDRE.indexOf(courante);
    if (i < 0) return null;
    var m = String(msg).match(/^\s*(auth\/[a-z-]+)/);
    if (m) {
      for (var j = 0; j < ERR_AUTH.length; j++) {
        if (ERR_AUTH[j].re.test(m[1])) return { text: ERR_AUTH[j].t[i], type: "erreur" };
      }
    }
    var k = norm(msg), e = entree(k);
    if (!e) return null;
    var type = /succès/i.test(k) ? "succes" : (/refusé|n'est pas un compte/i.test(k) ? "erreur" : "avertissement");
    return { text: e[i], type: type };
  }

  var HTML_LANG = { fr: "fr", en: "en", de: "de", es: "es", ar: "ar", zh: "zh-CN" };
  var ATTRS = ["placeholder", "alt", "title", "aria-label", "label"];
  var records = [];          // {node, attr|null, raw}
  var courante = "fr";
  var applique = false;

  function norm(s) {
    return String(s).replace(/ /g, " ").replace(/[’‘]/g, "'").replace(/\s+/g, " ").trim();
  }
  function traduire(cle, lang) {
    if (lang === "fr") return null;
    var e = entree(cle);
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
      if (!ignorer(racine.parentNode) && !(racine.parentNode && racine.parentNode.closest && racine.parentNode.closest("#eduforci-lang")) && entree(norm(racine.nodeValue)) && !connu(racine, null)) {
        var pn = racine.parentNode;
        if (pn && pn.nodeName === "OPTION" && !pn.hasAttribute("value")) pn.setAttribute("value", racine.nodeValue.trim());
        var r = { node: racine, attr: null, raw: racine.nodeValue }; records.push(r); ecrire(r);
      }
      return;
    }
    if (racine.nodeType !== 1 || /^(SCRIPT|STYLE|NOSCRIPT)$/.test(racine.nodeName) || racine.id === "eduforci-lang") return;
    ATTRS.forEach(function (a) {
      if (racine.hasAttribute(a) && entree(norm(racine.getAttribute(a))) && !connu(racine, a)) {
        var r = { node: racine, attr: a, raw: racine.getAttribute(a) }; records.push(r); ecrire(r);
      }
    });
    if (racine.nodeName === "TEXTAREA") return;
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

  // Les alertes et notifications (notify.js) : on traduit les messages connus avant affichage.
  function brancherAlertes() {
    var ancienneAlert = window.alert;
    var ancienneNotify = window.notify;
    window.alert = function (msg) {
      var r = traduireNotif(msg);
      if (r && typeof ancienneNotify === "function") return ancienneNotify(r.text, r.type);
      return ancienneAlert.call(window, msg);
    };
    if (typeof ancienneNotify === "function") {
      window.notify = function (msg, type) {
        var r = traduireNotif(msg);
        return ancienneNotify(r ? r.text : msg, r ? (type || r.type) : type);
      };
    }
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
