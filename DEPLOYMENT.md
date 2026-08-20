# 🚀 دليل النشر الشامل — Delta Stars Deployment Guide
## شركة نجوم دلتا للتجارة

---

## 📋 ملخص المتطلبات

| المنصة | الأداة | الحساب المطلوب |
|--------|--------|----------------|
| 🌐 PWA (ويب) | Vercel / Netlify / EdgeOne | مجاني |
| 🤖 Android APK/AAB | CodeMagic CI/CD | مجاني (1000 دقيقة/شهر) |
| 🍎 iOS IPA | CodeMagic CI/CD | Apple Developer ($99/سنة) |
| 📱 GitHub Pages | GitHub | مجاني |

---

## 🌐 1. النشر كتطبيق ويب تقدمي (PWA)

### Vercel (الموصى به)
```bash
# 1. اربط المستودع بـ Vercel
# 2. سيقوم Vercel تلقائياً بتشغيل: bun install && vite build
# 3. الإعدادات:
#    - Framework: Vite
#    - Build Command: vite build
#    - Output Directory: dist
```

### Netlify
```bash
# ملف netlify.toml موجود بالمشروع
# اربط المستودع → Netlify سيكتشف الإعدادات تلقائياً
```

### EdgeOne (Tencent Cloud)
```bash
# راجع .edgeone/deployment.yaml للإعدادات
```

### GitHub Pages
```bash
# النشر يتم تلقائياً عبر فرع gh-pages
# اللينك: https://deltastars-com.github.io/DeltaStars.G/
```

---

## 🤖 2. بناء تطبيق Android (APK + AAB)

### الطريقة الأولى: CodeMagic CI/CD (موصى بها)

#### الخطوة 1: إنشاء Keystore
```bash
chmod +x scripts/generate-keystore.sh
./scripts/generate-keystore.sh
```

#### الخطوة 2: إعداد CodeMagic
1. سجل الدخول إلى [codemagic.io](https://codemagic.io)
2. اربط مستودع GitHub
3. أضف **Workflow** من ملف `.codemagic.yaml`
4. أضف **Environment Groups:**

| الاسم | القيمة |
|-------|--------|
| `CM_KEYSTORE` | `base64 -w 0 keystore/deltastars-release.jks` |
| `CM_KEYSTORE_PASSWORD` | كلمة مرور الـ keystore |
| `CM_KEY_ALIAS` | deltastars |
| `CM_KEY_PASSWORD` | كلمة مرور المفتاح |
| `GCLOUD_SERVICE_ACCOUNT_CREDENTIALS` | JSON من Google Cloud |

#### الخطوة 3: رفع Google Play Console
1. اذهب إلى [Google Play Console](https://play.google.com/console)
2. أنشئ تطبيق جديد:
   - **App Name:** نجوم دلتا | Delta Stars
   - **Package Name:** `com.deltastars.store`
   - **Default Language:** Arabic (Saudi Arabia)
3. أكمل قسم **Store Listing** (الوصف، لقطات الشاشة، صورة feature graphic)
4. أكمل قسم **Content Rating** (استبيان تصنيف المحتوى)
5. أكمل قسم **Pricing & Distribution** (مجاني / المملكة العربية السعودية)
6. في **App signing by Google Play** — فعّل التوقيع_managed (أو استخدم توقيعك الخاص)
7. ارفع **AAB** في **Production → App bundles**

### الطريقة الثانية: بناء محلي
```bash
# تثبيت المتطلبات
# - Android Studio
# - Java JDK 17+
# - Android SDK (API 34+)

# بناء APK
bun run build:apk
# النتيجة: android/app/build/outputs/apk/release/DeltaStars-v1.1.0-release.apk

# بناء AAB (للمتجر)
bun run build:aab
# النتيجة: android/app/build/outputs/bundle/release/app-release.aab
```

---

## 🍎 3. بناء تطبيق iOS (IPA)

### الطريقة الأولى: CodeMagic CI/CD

#### الخطوة 1: إعداد Apple Developer
1. سجّل في [Apple Developer Program](https://developer.apple.com/programs/) ($99/سنة)
2. أنشئ App ID في [Certificates, Identifiers & Profiles](https://developer.apple.com/account/resources/identifiers/list):
   - **Bundle ID:** `com.deltastars.store`
   - **Capabilities:** Push Notifications, Associated Domains
3. أنشئ **App Store Connect API Key** في [App Store Connect → Keys](https://appstoreconnect.apple.com/access/api):
   - دور: App Manager
   - حمّل ملف `.p8`

#### الخطوة 2: إعداد CodeMagic Secrets
| الاسم | القيمة |
|-------|--------|
| `APP_STORE_CONNECT_ISSUER_ID` | Issuer ID |
| `APP_STORE_CONNECT_KEY_IDENTIFIER` | Key ID |
| `APP_STORE_CONNECT_PRIVATE_KEY` | محتوى ملف .p8 كاملاً |

#### الخطوة 3: رفع إلى App Store Connect
1. اذهب إلى [App Store Connect](https://appstoreconnect.apple.com)
2. أنشئ تطبيقاً جديداً
3. أكمل:
   - **App Information** (اسم التطبيق، الفئة، الب نية)
   - **Pricing and Availability** (السعر/مجاني، الدول)
   - **App Privacy** (رابط سياسة الخصوصية: https://deltastars.store/privacy-policy.html)
   - **Version Information** (الوصف، لقطات الشاشة، كلمات مفتاحية)
4. في **TestFlight** — اختبر التطبيق أولاً
5. أرسل للمراجعة في **App Store → Production**

### متطلبات App Store
- ✅ لقطات شاشة: 6.7" (iPhone 15 Pro Max)، 6.5" (iPhone 11 Pro Max)، 5.5" (iPhone 8 Plus)
- ✅ أيقونة 1024x1024 بدون عناصر شفافة (بدون أطراو ظلال)
- ✅ وصف التطبيق بالعربية والإنجليزية
- ✅ رابط سياسة الخصوصية
- ✅ رابط دعم / تواصل
- ✅ إجابات استبيان تصنيف المحتوى
- ✅ Age Rating: 4+ (لا محتوى حساس)

### الطريقة الثانية: بناء محلي (macOS فقط)
```bash
# يتطلب: Xcode 15+, CocoaPods
bun run build:cap
cd ios/App
pod install
open App.xcworkspace
# Build → Archive → Export IPA
```

---

## 📦 4. ملفات النشر المطلوبة لكل متجر

### Google Play Store
| الملف | الوصف |
|-------|-------|
| `app-release.aab` | ملف التطبيق الرئيسي (AAB) |
| `keystore/deltastars-release.jks` | ملف التوقيع (لا يُرفع للمتجر) |
| Feature Graphic (1024x500) | صورة بانر المتجر |
| Screenshots (باحجام متعددة) | لقطات شاشة للتطبيق |
| Icon 512x512 | أيقونة المتجر |
| Privacy Policy URL | https://deltastars.store/privacy-policy.html |

### Apple App Store
| الملف | الوصف |
|-------|-------|
| `App.ipa` | ملف التطبيق (IPA) |
| Screenshots (باحجام متعددة) | لقطات شاشة |
| App Icon 1024x1024 | أيقونة المتجر |
| Privacy Policy URL | https://deltastars.store/privacy-policy.html |
| Support URL | https://deltastars.store |
| App Description | وصف التطبيق |

---

## 🔄 5. التحديثات التلقائية

### PWA Service Worker
- يتحقق من التحديثات كل **120 ثانية**
- يُ�新ّث تلقائياً عند توفر نسخة جديدة
- المستخدم يرى إشعار "تحديث متاح"

### Android (Play Store)
- التحديثات تلقائية عبر Play Store
- يمكن إرسال تحديثات فورية عبر Internal Track

### iOS (App Store)
- مراجعة Apple قد تأخّر 24-48 ساعة
- استخدم TestFlight لل测试 السريع

---

## 🛡️ 6. أمان النشر

### قائمة التحقق الأمنية
- [ ] تم حذف `.env` وملفات السر من Git
- [ ] Keystore غير مرفوع للمستودع
- [ ] كلمات المرور في CI/CD فقط (ليست في الكود)
- [ ] CSP headers مُعدّة على الخادم
- [ ] HTTPS مفعّل على كل النطاقات
- [ ] Firebase/Supabase rules مُعدّة بشكل آمن

---

## 📞 الدعم

| القناة | التفاصيل |
|--------|----------|
| 📧 البريد | marketing@deltastars-ksa.com |
| 📞 الهاتف | 920023204 |
| 💬 واتساب | 0558828009 |
| 🌐 الموقع | https://deltastars.store |
| 📍 العنوان | المملكة العربية السعودية — جدة — حي المنار |

---

© 2026 شركة نجوم دلتا للتجارة — Delta Stars Trading Co. — جميع الحقوق محفوظة
