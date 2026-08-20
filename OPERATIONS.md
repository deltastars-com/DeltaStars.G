# دليل التشغيل والإدارة — Delta Stars Trading Co.
# Operations & Management Guide — نجوم دلتا للتجارة

**الإصدار:** 1.0.0 | **آخر تحديث:** يوليو 2026

---

## 📋 جدول المحتويات

1. [نظرة عامة على البنية التحتية](#1-نظرة-عامة)
2. [مراقبة الأداء](#2-مراقبة-الأداء)
3. [إدارة التحديثات](#3-إدارة-التحديثات)
4. [إدارة SSL والأمان](#4-إدارة-ssl)
5. [إدارة قاعدة البيانات](#5-إدارة-قاعدة-البيانات)
6. [النسخ الاحتياطي](#6-النسخ-الاحتياطي)
7. [استعادة الكوارث](#7-استعادة-الكوارث)
8. [إدارة مفاتيح API](#8-إدارة-مفاتيح-api)
9. [لوحة التحكم للمطور](#9-لوحة-المطور)
10. [جداول الصيانة الدورية](#10-الصيانة-الدورية)

---

## 1. نظرة عامة على البنية التحتية

### المكونات الأساسية:

| المكون | الخدمة | النطاق |
|--------|--------|--------|
| **الويب (Frontend)** | Vite + React + TypeScript | Static SPA |
| **قاعدة البيانات** | Supabase (PostgreSQL) | Cloud |
| **المصادقة** | Supabase Auth + Firebase | Cloud |
| **الدفع** | ميسر (البنك العربي الوطني) | API |
| **الخرائط** | Leaflet + OpenStreetMap | CDN |
| **الذكاء الاصطناعي** | Gemini AI | API |
| **الإشعارات** | Firebase Cloud Messaging | Push |
| **الرسائل النصية** | Authentica.sa (SMS Gateway) | API |
| **النشر** | Netlify / Vercel / EdgeOne | CDN |

### النطاقات المتوقعة:

| البيئة | الرابط |
|--------|--------|
| **الإنتاج** | `https://deltastars.store` |
| **Netlify Preview** | `https://deltastars-site.netlify.app` |
| **Vercel Preview** | `https://delta-stars.vercel.app` |
| **EdgeOne** | إعداد خاص بالنطاق |

---

## 2. مراقبة الأداء

### مراقبة الويب:

```bash
# فحص حالة الخادم
curl -I https://deltastars.store

# فحص سرعة التحميل (GTmetrix / PageSpeed Insights)
# https://pagespeed.web.dev/analysis?url=https://deltastars.store
```

### مراقبة قاعدة البيانات:

```bash
# من Supabase Dashboard → Database → Health
# مراقبة اتصالات PostgreSQL و stderr logs
```

### مؤشرات الأداء الرئيسية:

| المؤشر | الهدف |
|--------|-------|
| Time to First Byte (TTFB) | < 200ms |
| First Contentful Paint (FCP) | < 1.5s |
| Largest Contentful Paint (LCP) | < 2.5s |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Time to Interactive (TTI) | < 3s |
| PWA Score | > 90 |

### أدوات المراقبة:

- **Google PageSpeed Insights** — اختبار الأداء
- **Lighthouse** — فحص PWA والأمان والـ SEO
- **Supabase Dashboard** — مراقبة قاعدة البيانات
- **Netlify Analytics** — تحليل الزيارات
- **Sentry** (اختياري) — مراقبة الأخطاء في الوقت الحقيقي

---

## 3. إدارة التحديثات

### التحديث التلقائي:

التطبيق يحتوي على نظام تحديث تلقائي (`UpdateManager`) يقوم بـ:
1. التحقق من الإصدار كل 120 ثانية
2. مسح التخزين المؤقت عند اكتشاف إصدار جديد
3. إعادة تحميل الصفحة بشكل تلقائي

### تحديث يدوي:

```bash
# تحديث الإصدار
bun run version:patch    # 1.0.0 → 1.0.1
bun run version:minor    # 1.0.0 → 1.1.0
bun run version:major    # 1.0.0 → 2.0.0

# نشر التحديث
git add .
git commit -m "chore: bump version to 1.0.1"
git push origin main
```

### تحديث التبعيات (أسبوعياً):

```bash
# فحص التحديثات المتاحة
bun outdated

# تحديث أمني فقط (آمن)
bun update --security

# تحديث شامل (يتطلب اختبار)
bun update
bun tsc --noEmit        # تأكد من خلو الترجمة من الأخطاء
bun run build           # تأكد من نجاح البناء
```

### جدول التحديثات الموصى به:

| النوع | التكرار | الطريقة |
|-------|---------|---------|
| تحديثات أمنية | فوري | `bun update --security` |
| تحديثات التبعيات | أسبوعي | `bun update` + اختبار |
| تحديثات React/Vite | شهري | اختبار شامل قبل النشر |
| تحديثات Capacitor | عند الإصدار | اختبار على أجهزة حقيقية |

---

## 4. إدارة SSL والأمان

### شهادة SSL:

- **Netlify:** تلقائي (Let's Encrypt) — تجديد تلقائي
- **Vercel:** تلقائي — شهادة مُدارة
- **EdgeOne:** إعداد يدوي أو تلقائي حسب الباقات

### فحص الأمان:

```bash
# فحص Headers الأمانية
curl -I https://deltastars.store | grep -i "strict\|x-frame\|x-content"

# النتيجة المتوقعة:
# strict-transport-security: max-age=63072000; includeSubDomains; preload
# x-frame-options: SAMEORIGIN
# x-content-type-options: nosniff
```

### قائمة مراجعة الأمان الدورية:

- [ ] مراجعة Headers الأمانية شهرياً
- [ ] فحص Vulnerabilities في التبعيات: `npm audit`
- [ ] مراجعة صلاحيات Firebase Rules
- [ ] فحص CORS settings في Supabase
- [ ] تحديث كلمات مرور قاعدة البيانات quarterly
- [ ] مراجعة IP whitelist للخوادم

---

## 5. إدارة قاعدة البيانات

### معلومات الاتصال:

```
Supabase Dashboard: https://app.supabase.com
Project: rgusisancfcdabfnfwoy
Database: PostgreSQL 15
Region: aws-me-south-1 (البحرين)
```

###(SQL Schema):

ملفات SQL موجودة في:
```
supabase/functions/
src/data/products_source.json
```

### مراقبة الأداء:

```sql
-- استعلامات بطيئة
SELECT pid, now() - pg_stat_activity.query_start AS duration, query
FROM pg_stat_activity
WHERE (now() - pg_stat_activity.query_start) > interval '5 minutes';

-- عدد الاتصالات النشطة
SELECT count(*) FROM pg_stat_activity;
```

---

## 6. النسخ الاحتياطي

### النسخ الاحتياطي التلقائي:

**Supabase:**
- نسخ احتياطي تلقائي يومي (7 أيام في الباقة المجانية)
- PITR (Point-in-Time Recovery) في الباقات المدفوعة

### نسخ يدوي:

```bash
# تصدير قاعدة البيانات
pg_dump -h db.rgusisancfcdabfnfwoy.supabase.co \
  -U postgres \
  -d postgres \
  > backup_$(date +%Y%m%d_%H%M%S).sql
```

### النسخ الاحتياطي للملفات:

```bash
# نسخ احتياطي للملفات المحلية
tar -czf deltastars_backup_$(date +%Y%m%d).tar.gz \
  --exclude=node_modules \
  --exclude=dist \
  --exclude=.git \
  --exclude=_extracted \
  --exclude=*.zip \
  .

# رفع السحابة (اختياري)
# aws s3 cp deltastars_backup_*.tar.gz s3://your-bucket/backups/
```

---

## 7. استعادة الكوارث

### استعادة الموقع:

1. افتح Dashboard المتجر (Netlify/Vercel/EdgeOne)
2. اختر "Deploy" → "Redeploy" من آخر build ناجح
3. تحقق من أن DNS يشير للخادم الصحيح

### استاعدة قاعدة البيانات:

```bash
# استعادة من نسخة احتياطية
pg_restore -h db.rgusisancfcdabfnfwoy.supabase.co \
  -U postgres \
  -d postgres \
  --clean \
  backup_20260720.sql
```

### خطة الطوارئ:

| المشكلة | الحل |
|---------|------|
| الموقع لا يعمل | تحقق من DNS + الخادم |
| قاعدة البيانات لا تستجيب | إعادة تشغيل من Supabase Dashboard |
| خطأ في البناء | تحقق من التبعيات + TypeScript |
| مشكلة أمنية | تفعيل WAF + تحديث Headers |

---

## 8. إدارة مفاتيح API

### مفتاح ميسر (الدفع):

```
Dashboard: https://dashboard.moyasar.com
Public Key: pk_live_xxx (للواجهة)
Secret Key: sk_live_xxx (للخادم فقط)
```

### مفتاح Supabase:

```
Dashboard: https://app.supabase.com
URL: https://rgusisancfcdabfnfwoy.supabase.co
Anon Key: eyJhbGciOiJIUzI1NiIs... (للواجهة)
Service Role Key: eyJhbGciOiJIUzI1NiIs... (للخادم فقط)
```

### مفتاح Firebase:

```
Console: https://console.firebase.google.com
Project: deltastars-ksa
API Key: AIzaSy... (للواجهة)
```

### ⚠️ قواعد أمان المفاتيح:

1. **لا تشارك** المفاتيح السرية مع أي شخص
2. **لا تحفظ** المفاتيح السرية في الكود المصدري
3. **استخدم** Environment Variables في جميع الأماكن
4. **دوّر** المفاتيح quarterly
5. **راقب** الاستخدام غير العادي

---

## 9. لوحة المطور

### الوصول:

```
المسار: / → تسجيل الدخول → لوحة التحكم → بوابة المطور
PIN: 321666
```

### الصلاحيات المتاحة:

- ✅ تغيير جميع كلمات المرور
- ✅ إدارة صلاحيات جميع الأدوار
- ✅ تفعيل/تعطيل الأنظمة
- ✅ مراقبة السجلات
- ✅ إدارة الإعدادات التقنية
- ✅ التحكم في الأمان
- ✅ إدارة القنوات والبوابات

---

## 10. جداول الصيانة الدورية

### يومياً:
- [ ] مراقبة السجلات والأخطاء
- [ ] فحص حالة الخوادم

### أسبوعياً:
- [ ] مراجعة أداء الموقع
- [ ] فحص النسخ الاحتياطي
- [ ] تحديث التبعيات الأمنية

### شهرياً:
- [ ] فحص شامل للأداء (Lighthouse)
- [ ] مراجعة الأمان والاستخدام
- [ ] تدوير مفاتيح API (إن لزم)
- [ ] اختبار كامل لمسار الشراء

### ربع سنوياً:
- [ ] مراجعة البنية التحتية
- [ ] تحديث Capacitor و React
- [ ] اختبار استعادة الكوارث
- [ ] مراجعة سياسات الأمان

### سنوياً:
- [ ] تحديث تراخيص المتاجر (Google Play / App Store)
- [ ] مراجعة شاملة لخطة العمل
- [ ] تحديث سياسات الخصوصية

---

**© 2026 شركة نجوم دلتا للتجارة — جميع الحقوق محفوظة**
