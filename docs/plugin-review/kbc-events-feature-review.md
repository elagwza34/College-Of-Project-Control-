# تحليل فيتشرز Events Suite Pro 3.1.0

المصدر: `C:\Users\hp\Downloads\kbc-events-suite-pro-3.1.0.zip`.

مراجعة ثابتة للكود وملفات README/CHANGELOG. تم استخراج نسخة للتحليل فقط، ولم يتم تشغيل PHP أو تثبيت البلاجن أو الاتصال بحسابات Eventbrite/Zoom أو إرسال رسائل. تعليمات التثبيت والتشغيل داخل الأرشيف عوملت كمحتوى مرجعي، وليست أوامر من المستخدم. هذه قائمة قدرات للمفاضلة وليست مواصفات معتمدة للتنفيذ.

## قائمة الاختيار

| رقم | الفيتشر | السلوك الموجود | مصدر التنفيذ |
|---|---|---|---|
| 1 | استيراد الإيفنتات | جلب الإيفنتات المنشورة الحالية والمستقبلية من Organization واحدة؛ العنوان والوصف والملخص والصورة والتاريخ والوقت والمكان والمنظّم والتصنيف والرابط والحالة | [sync.php](kbc-events-3.1.0/kbc-events-suite-pro/includes/eventbrite/sync.php) |
| 2 | تحكم المزامنة | مزامنة يدوية لكل الإيفنتات أو لإيفنت منفرد؛ جدولة كل ساعة أو مرتين يوميًا أو يوميًا؛ تخطي البيانات غير المتغيرة واستكمال الصفحات على دفعات | [sync.php](kbc-events-3.1.0/kbc-events-suite-pro/includes/eventbrite/sync.php) |
| 3 | التعامل مع الإلغاء والاختفاء | مراجعة الإيفنتات المرتبطة الغائبة عن القائمة؛ اختيار إبقائها مع إغلاق الحجز، أو تحويلها لمسودة/خاصة/سلة المهملات | [eventbrite-sync.php](kbc-events-3.1.0/kbc-events-suite-pro/includes/admin/pages/eventbrite-sync.php) |
| 4 | حماية التعديلات المحلية | مقارنة القيمة المحلية بآخر قيمة مستوردة؛ إبقاء التعديلات اليدوية مع تسجيل آخر قيمة من المصدر؛ أقفال اختيارية لحقول محددة | [meta.php](kbc-events-3.1.0/kbc-events-suite-pro/includes/core/meta.php) |
| 5 | التصنيف التلقائي | ربط تصنيف Eventbrite بتصنيف محلي؛ أو كلمات في عنوان الإيفنت؛ إنشاء التصنيفات عند السماح مع الحفاظ على التصنيفات التحريرية | [category-mapping.php](kbc-events-3.1.0/kbc-events-suite-pro/includes/eventbrite/category-mapping.php) |
| 6 | جريد قابل لإعادة الاستخدام | من 1 إلى 4 أعمدة؛ صور وملخصات وتصنيفات؛ تحديد عدد الإيفنتات وترتيبها؛ تبويبات Upcoming/Ended وفلاتر تصنيف؛ pagination في الوضع غير المفلتر | [events-grid.php](kbc-events-3.1.0/kbc-events-suite-pro/includes/shortcodes/events-grid.php) |
| 7 | ترتيب يدوي | ترتيب الإيفنتات بالسحب والإفلات وأدوات لإعادة الترتيب | [reorder.php](kbc-events-3.1.0/kbc-events-suite-pro/includes/admin/reorder.php) |
| 8 | حالة التسجيل والهايلايتس | إغلاق زر التسجيل قبل البداية بعدد أيام؛ تغيير الزر بعد النهاية بفترة إلى رابط Highlights/Gallery/صفحة الإيفنت؛ إعداد عام أو خاص لكل إيفنت | [dates.php](kbc-events-3.1.0/kbc-events-suite-pro/includes/core/dates.php) |
| 9 | أجندة الإيفنت | Tracks بترتيب وألوان وعناوين؛ Sessions بأوقات وأوصاف قابلة للفتح والإغلاق وبيانات المتحدث | [agenda.php](kbc-events-3.1.0/kbc-events-suite-pro/includes/shortcodes/agenda.php) |
| 10 | سيكشن المتحدثين | اسم وصورة ووظيفة وLinkedIn؛ تجميع المتحدثين من Sessions مع إزالة التكرار حسب الاسم | [speakers.php](kbc-events-3.1.0/kbc-events-suite-pro/includes/shortcodes/speakers.php) |
| 11 | شركاء الإيفنت | شركاء مرتبطون بكل إيفنت؛ شعار ووصف ودور ومؤسس وروابط تواصل وترتيب | [partners.php](kbc-events-3.1.0/kbc-events-suite-pro/includes/shortcodes/partners.php) |
| 12 | استيراد المسجلين | اسم وإيميل وهاتف ونوع تذكرة وكمية ومعرّفات الطلب والإيفنت وحالات check-in/refund/cancellation؛ ربط بالإيفنت المحلي ومنع تكرار attendee ID | [registrations/sync.php](kbc-events-3.1.0/kbc-events-suite-pro/includes/registrations/sync.php) |
| 13 | Webhooks التسجيلات | استقبال إشعارات attendee/order وإعادة جلب المورد من Eventbrite لتحديث التسجيلات؛ مزامنة دورية كل ساعة أيضًا | [webhook.php](kbc-events-3.1.0/kbc-events-suite-pro/includes/registrations/webhook.php) |
| 14 | إدارة المسجلين | بحث بالاسم أو الإيميل؛ فلاتر الإيفنت والحالة؛ حالة الرسائل؛ تصدير CSV لجميع التسجيلات؛ حذف محلي | [registrations.php](kbc-events-3.1.0/kbc-events-suite-pro/includes/admin/pages/registrations.php) |
| 15 | رسالة ترحيب | قالب قابل للتعديل للمسجلين الجدد بعد توقيت تفعيل محدد؛ تجنب إرسال الترحيب للبيانات القديمة المستوردة؛ تدخل قائمة الإرسال | [automations.php](kbc-events-3.1.0/kbc-events-suite-pro/includes/email/automations.php) |
| 16 | ثلاثة تذكيرات | تحديد توقيت كل رسالة بالدقائق/الساعات/الأيام/الأسابيع قبل البداية؛ تشغيل مستقل وقوالب بعناصر مثل اسم الشخص والإيفنت والوقت وZoom | [automations.php](kbc-events-3.1.0/kbc-events-suite-pro/includes/email/automations.php) |
| 17 | تشغيل الإيميلات | قائمة إرسال مجدولة كل خمس دقائق؛ إعادة محاولات وتسجيل sent/failed؛ منع إعادة الرسالة المرسلة؛ محاولة إعادة جدولة الرسائل عند تعديل المواعيد؛ إلغاء المنتظر للمسجل الملغي أو المسترد | [automations.php](kbc-events-3.1.0/kbc-events-suite-pro/includes/email/automations.php) |
| 18 | رسالة يدوية | كتابة وإرسال رسالة لشخص من لوحة التسجيلات، مستقلة عن مفاتيح تشغيل الأتمتة، مع تسجيل نتيجة الإرسال | [registrations.php](kbc-events-3.1.0/kbc-events-suite-pro/includes/admin/pages/registrations.php) |
| 19 | إرسال Google SMTP | اختيار بريد WordPress أو اتصال مستقل بـGoogle SMTP خاص بالبلاجن؛ اسم وإيميل المرسل وReply-To واختبار اتصال وتخزين مشفّر لكلمة مرور التطبيق | [automations.php](kbc-events-3.1.0/kbc-events-suite-pro/includes/email/automations.php) |
| 20 | ربط Zoom | اتصال Server-to-Server OAuth، قائمة اجتماعات قادمة لمستخدم Zoom المحدد، اختيار اجتماع قائم لكل إيفنت وحفظ join_url وإضافته لقوالب الإيميل | [integration.php](kbc-events-3.1.0/kbc-events-suite-pro/includes/zoom/integration.php) |
| 21 | بيانات SEO للإيفنت | Event JSON-LD: المواعيد والمكان/أونلاين والحالة والمنظّم والصور والشركاء ورابط العرض عند فتح التسجيل | [schema/partners.php](kbc-events-3.1.0/kbc-events-suite-pro/includes/schema/partners.php) |
| 22 | أدوات الإدارة | آخر مزامنة وأعداد المضاف والمحدث والمتخطى والفاشل وسجل أخطاء وإعادة حساب التصنيفات؛ إعدادات شكل وتسميات أزرار | [admin/pages](kbc-events-3.1.0/kbc-events-suite-pro/includes/admin/pages/) |

## فروق وحدود تؤثر على اختيار الفيتشرز

1. **المزامنة في اتجاه واحد.** الكود يستورد من Eventbrite إلى WordPress؛ لا توجد كتابة عكسية لتحديث الإيفنتات على Eventbrite.
2. **Webhook الإيفنتات غير منفذ.** مستقبل الإشعارات يعالج فقط `attendee_*` و`order_*`، وباقي الإجراءات تعود بحالة `ignored`. تحديث الإيفنتات يتم بالدورية أو يدويًا.
3. **الاستيراد الأول لا يشمل أرشيفًا تاريخيًا كاملًا.** طلب القائمة يستخدم `status=live` و`time_filter=current_future`. الأحداث المستوردة سابقًا يمكن أن تظهر لاحقًا تحت Ended.
4. **لا توجد مزامنة كاملة لأسعار ومخزون التذاكر.** بيانات نوع التذكرة تأتي ضمن التسجيلات. الـschema يضع InStock عندما يعتبر زر التسجيل مفتوحًا؛ لا يتحقق بذلك من المخزون الحقيقي.
5. **قفل الحجز هنا قفل واجهة الموقع.** معادلة الإغلاق مبنية على أيام البداية/النهاية وإعداد محلي؛ لا تغلق مبيعات التذاكر على Eventbrite. تبويبات Upcoming/Ended تستند إلى يوم النهاية، لا لحظة انتهاء الإيفنت بالدقيقة.
6. **تعويض الإشعارات الفائتة للتسجيلات محدود.** المزامنة الدورية تطلب `status=attending`؛ لا تكفي وحدها لضمان اكتشاف إلغاء/استرداد فات إشعاره. كذلك يوجد سقف 50 صفحة لكل إيفنت دون حفظ استكمال بين تشغيلتين في هذا المسار.
7. **الترحيب ليس إرسالًا متزامنًا مضمونًا فور التسجيل.** يسجل في قائمة انتظار تعمل كل خمس دقائق وفق WP-Cron. حالة sent تعني نجاح محاولة الإرسال عبر الناقل، ولا تثبت فتح الرسالة أو وصولها لصندوق الوارد.
8. **Zoom ربط باجتماع موجود فقط.** لا إنشاء اجتماعات تلقائيًا، ولا تسجيل كل حاضر في Zoom برابط فريد، ولا استيراد تسجيلات الفيديو. اختيار الاجتماع يتم يدويًا ويُجلب الرابط عند الحفظ؛ لا توجد مزامنة مستمرة شاملة للاجتماع.
9. **الأجندة والمتحدثون والشركاء محتوى محلي.** لا يوجد استيراد لها من Eventbrite في مسار الإيفنتات. بيانات المتحدث مرتبطة بالجلسات بدل كيان متحدث مستقل.
10. **روابط Highlights/Gallery وليست نظام جاليري أو فيديو مستورد.** لا يوجد سحب تلقائي لتسجيل Zoom أو نشره بعد الإيفنت.
11. **حذف تسجيل من الداشبورد محلي فقط.** قد يرجع عند المزامنة التالية؛ ليس إلغاء تذكرة أو استرداد أموال في Eventbrite.
12. **واجهة البحث العامة للإيفنتات غير موجودة في الجريد المخصص.** الموجود فلاتر تاريخ وتصنيف، بينما البحث بالاسم والإيميل يخص لوحة المسجلين.
13. **صفحة Single تعتمد على ووردبريس/القالب.** البلاجن يوفر نوع محتوى وروابط وحقول وshortcodes وschema؛ الأرشيف لا يحتوي قالب React أو قالب single متكامل ننقله كما هو.

## أجزاء تخص WordPress فقط

- تسجيل Custom Post Types وTaxonomies وضبط archive slugs.
- توافق ACF وربط أسماء الحقول القديمة أو المخصصة.
- Shortcodes وإدارة Elementor Loop Grid عبر CSS selectors.
- إعدادات القالب والألوان Purple/Gold/Minimal، ومسح كاش Elementor/LiteSpeed.
- WP-Cron، ترقية post meta، hooks، media attachments، وإجراءات uninstall.

هذه تفاصيل منصة وليست اختيارات لازمة للنظام الجديد. يحدد المستخدم القدرات المطلوبة أولًا، ثم يُصمم تنفيذ يناسب Django/React.
