# دليل النشر الشامل — Delta Stars Trading Co.
# Complete Deployment Guide — نجوم دلتا للتجارة

**الإصدار:** 1.0.0 | **آخر تحديث:** يوليو 2026

---

## 📋 جدول المحتويات

1. [متطلبات النشر العامة](#1-متطلبات-النشر-العامة)
2. [النشر على Netlify](#2-النشر-على-netlify)
3. [النشر على Vercel](#3-النشر-على-vercel)
4. [النشر على EdgeOne (Tencent Cloud)](#4-النشر-على-edgeone)
5. [بناء تطبيق Android (APK/AAB)](#5-بناء-تطبيق-android)
6. [بناء تطبيق iOS (IPA)](#6-بناء-تطبيق-ios)
7. [رفع على Google Play Store](#7-رفع-على-google-play-store)
8. [رفع على Apple App Store](#8-رفع-على-apple-app-store)
9. [إعداد CodeMagic للبناء التلقائي](#9-إعداد-codemagic)
10. [اختبار ما بعد النشر](#10-اختبار-ما-بعد-النشر)

---

## 1. متطلبات النشر العامة

### المفاتيح البيئية المطلوبة

| المتغير | الوصف | متجر | EdgeOne | Vercel |
|---------|-------|------|---------|--------|
| `VITE_SUPABASE_URL` | رابط Supabase | ✅ | ✅ | ✅ |
| `VITE_SUPABASE_ANON_KEY` | مفتاح Supabase العام | ✅ | ✅ | ✅ |
| `VITE_GEMINI_API_KEY` | مفتاح Gemini AI | ✅ | ✅ | ✅ |
| `VITE_GOOGLE_MAPS_API_KEY` | مفتاح خرائط Google | ✅ | ✅ | ✅ |
| `VITE_MOYASAR_PUBLISHABLE_KEY` | مفتاح ميسر للدفع | ✅ | ✅ | ✅ |
| `VITE_FIREBASE_API_KEY` | مفتاح Firebase | ✅ | ✅ | ✅ |
| `VITE_FIREBASE_AUTH_DOMAIN` | نطاق Firebase Auth | ✅ | ✅ | ✅ |
| `VITE_FIREBASE_PROJECT_ID` | مشروع Firebase | ✅ | ✅ | ✅ |

### مفاتيح الخادم (Netlify Functions)

| المتغير | الوصف |
|---------|-------|
| `MOYASAR_SECRET_KEY` | مفتاح ميسر السري |
| `SUPABASE_SERVICE_ROLE_KEY` | مفتاح Supabase الخادم |
| `AUTHENTICA_API_KEY` | مفتاح بوابة SMS |
| `AUTHENTICA_API_SECRET` | سر بوابة SMS |

---

## 2. النشر على Netlify

### الخطوات:

1. **تسجيل الدخول** إلى [app.netlify.com](https://app.netlify.com)
2. **إضافة الموقع:** اضغط "Add new site" → "Import an existing project"
3. **اختيار GitHub:** اختر مستودع `delta-stars`
4. **إعدادات البناء:**

```
Build command:  bun run build:web
Publish dir:    dist
```

5. **إضافة المفاتيح البيئية:** اذهب إلى Site Settings → Environment Variables
6. **اضغط Deploy**

### ملاحظات Netlify:
- يدعم Netlify Functions للدفع والـ OTP
- يتوفر `netlify.toml` بالفعل في المشروع
- URLs النهاية: `https://your-site.netlify.app`

---

## 3. النشر على Vercel

### الخطوات:

1. **تسجيل الدخول** إلى [vercel.com](https://vercel.com)
2. **إضافة المشروع:** اضغط "Add New..." → "Project"
3. **اختر GitHub** وحدد مستودع `delta-stars`
4. **الإعدادات:**

```
Framework:      Vite
Build Command:  vite build
Output Dir:     dist
Install Cmd:    bun install
```

5. **الموقع:** اختر المنطقة الشرق الأوسط (dxb1)
6. **إضافة المفاتيح البيئية** في Production Environment
7. **اضغط Deploy**

### مɜ�صيات Vercel:
- `vercel.json` بالفعل موجود بالمشروع
- Edge Functions جاهزة للتحويلات
- URLs النهاية: `https://your-project.vercel.app`

---

## 4. النشر على EdgeOne (Tencent Cloud)

### الخطوات:

1. **تسجيل الدخول** إلى [console.cloud.tencent.com/edgeone](https://console.cloud.tencent.com/edgeone)
2. **إنشاء مشروع EdgeOne Pages**
3. **ربط مستودع GitHub** (`delta-stars`)
4. **إعدادات البناء:**

```
Framework:      Vite (Custom)
Node Version:   18+
Build Command:  vite build
Output Dir:     dist
Install Cmd:    bun install
```

5. **إضافة المفاتيح البيئية** في Environment Variables
6. **إعداد CDN Cache Rules:**
   - `/assets/*` → Cache 365 days
   - `/index.html` → No cache
   - `service-worker.js` → No cache

7. **إعداد Security Headers** من Dashboard
8. **ربط النطاق:** `deltastars.store`

### ملاحظات EdgeOne:
- الإعدادات موجودة في `.edgeone/deployment.yaml`
- EdgeOne يوفر CDN عالمي + DDoS Protection

---

## 5. بناء تطبيق Android

### المتطلبات:
- Android Studio (latest)
- Java JDK 17
- Android SDK 34

### بناء APK:

```bash
# 1. بناء الويب
bun run build:web

# 2. مزامنة Capacitor
npx cap sync android

# 3. فتح Android Studio
npx cap open android

# 4. بناء APK من Android Studio:
# Build → Build Bundle(s) / APK(s) → Build APK(s)
# الملف الناتج: android/app/build/outputs/apk/release/app-release.apk
```

### بناء AAB (للمتجر):

```bash
# من Android Studio:
# Build → Generate Signed Bundle / APK → Android App Bundle
# أو:
cd android
./gradlew bundleRelease
# الملف الناتج: android/app/build/outputs/bundle/release/app-release.aab
```

### توقيع التطبيق:

```bash
# إنشاء Keystore جديد:
keytool -genkey -v -keystore deltastars-release.jks \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias deltastars

# أسئلته:
# الاسم: Delta Stars Trading Co.
# الوحدة: IT
# المنظمة: Delta Stars
# المدينة: Jeddah
# الولاية: Makkah
# الدولة: SA
```

> **ملاحظة مهمة:** احتفظ بملف Keystore و-cap- في مكان آمن! لا يمكن استرجاع كلمة المرور.

---

## 6. بناء تطبيق iOS

### المتطلبات:
- macOS مع Xcode (latest)
- Apple Developer Account ($99/سنة)

### بناء IPA:

```bash
# 1. بناء الويب
bun run build:web

# 2. مزامنة Capacitor
npx cap sync ios

# 3. فتح Xcode
npx cap open:ios

# 4. من Xcode:
# - اختر App
# - Signing & Capabilities → اختر Team
# - Product → Archive → Distribute App → App Store Connect
```

---

## 7. رفع على Google Play Store

### المتطلبات:
- حساب مطور Google Play ($25 مرة واحدة)
- ملف `app-release.aab` موقَّع
- لوجو 512x512 PNG
- لوجو 1024x500 Feature Graphic
- لقطات شاشة (2-8)
- وصف التطبيق بالعربية والإنجليزية

### خطوات الرفع:

1. سجل الدخول إلى [play.google.com/console](https://play.google.com/console)
2. أنشئ تطبيق جديد → أدخل الاسم وال nack
3. ارفع ملف `.aab` من Configuration → Release → Production
4. أكمل صفحة المتجر (الصور، الوصف،_classification)
5. أرسل للمراجعة

### سياسات Google Play المُراعاة:
- ✅ سياسة الخصوصية (في `public/privacy-policy.html`)
- ✅ تصميم Material Design متوافق
- ✅ PWA support
- ✅ لا محتوى ضار
- ✅ بيانات آمنة مع TLS/AES

---

## 8. رفع على Apple App Store

### المتطلبات:
- حساب Apple Developer ($99/سنة)
- ملف `.ipa` موقَّع
- لوجو 1024x1024 PNG
- لقطات شاشة iPhone + iPad
- وصف التطبيق بالعربية والإنجليزية

### خطوات الرفع:

1. سجل الدخول إلى [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
2. أنشئ تطبيق جديد → Bundle ID: `com.deltastars.store`
3. ارفع IPA عبر Xcode أو Transporter
4. أكمل صفحة المتجر
5. أرسل للمراجعة

### سياسات App Store المُراعاة:
- ✅ سياسة الخصوصية (رابط:`https://deltastars.store/privacy-policy.html`)
- ✅ واجهة Human Interface Guidelines
- ✅ لا محتوى ضار أو مخالف
- ✅ بيانات المستخدم مشفرة

---

## 9. إعداد CodeMagic

### أول مرة:

1. سجل الدخول إلى [codemagic.io](https://codemagic.io)
2. اربط حساب GitHub
3. اختر المشروع `delta-stars`
4. قم بتعيين ملف `.codemagic.yaml` (موجود في المشروع)

### إعداد Secrets في CodeMagic:

| المفتاح | الوصف |
|---------|-------|
| `CM_KEYSTORE` | ملف Keystore base64-encoded |
| `CM_KEYSTORE_PASSWORD` | كلمة مرور Keystore |
| `CM_KEY_ALIAS` | اسم alias |
| `CM_KEY_PASSWORD` | كلمة مرور alias |
| `GCLOUD_SERVICE_ACCOUNT_CREDENTIALS` | حساب Google Play Console |
| `APP_STORE_CONNECT_ISSUER_ID` | Apple Connect Issuer |
| `APP_STORE_CONNECT_KEY_IDENTIFIER` | Apple Connect Key ID |
| `APP_STORE_CONNECT_PRIVATE_KEY` | Apple Connect Private Key |
| `NETLIFY_TOKEN` | رمز Netlify |
| `NETLIFY_SITE_ID` | معرف موقع Netlify |

### تحويل Keystore إلى base64:

```bash
base64 -i deltastars-release.jks | tr -d '\n'
```

### تفعيل البناء التلقائي:

- **Android:** يُبنى تلقائياً عند الدفع لـ `main` أو عند إنشاء tag
- **iOS:** يُبنى تلقائياً عند الدفع لـ `main` أو عند إنشاء tag
- **Web:** يُبنى ويُنشر تلقائياً على Netlify

### إنشاء Release tag:

```bash
git tag -a v1.0.0 -m "Release 1.0.0"
git push origin v1.0.0
```

---

## 10. اختبار ما بعد النشر

### اختبار الويب:
- [ ] الصفحة الرئيسية تعمل بشكل سليم
- [ ] تسجيل الدخول والخروج يعمل
- [ ] المنتجات تظهر وتعمل السلة
- [ ] الدفع عبر ميسر يعمل
- [ ] تتبع الطلبات يعمل
- [ ] لوحة التحكم للمسؤول تعمل
- [ ] بوابة المطور (PIN: 321666) تعمل
- [ ] الخريطة والتتبع المباشر يعمل
- [ ] المساعد الذكي "عدي" يعمل
- [ ] PWA يعمل في وضع عدم الاتصال

### اختبار Android:
- [ ] التثبيت يعمل على جهاز حقيقي
- [ ] شاشة البداية تعمل
- [ ] جميع الصور والشعارات تظهر
- [ ] الإشعارات تعمل
- [ ] التتبع الجغرافي يعمل

### اختبار iOS:
- [ ] التثبيت يعمل على جهاز حقيقي
- [ ] شاشة البداية تعمل
- [ ] جميع الصور والشعارات تظهر
- [ ] Face ID / Touch ID يعمل

---

**© 2026 شركة نجوم دلتا للتجارة — جميع الحقوق محفوظة**
