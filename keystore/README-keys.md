# 🔑 دليل توقيع التطبيقات — Android & iOS Signing Guide
## شركة نجوم دلتا للتجارة (Delta Stars Trading Co.)

---

## 📱 Android — توقيع APK/AAB

### 1. إنشاء ملف التوقيع (Keystore)

```bash
# تشغيل السكربت المُرفق
chmod +x scripts/generate-keystore.sh
./scripts/generate-keystore.sh
```

أو يدوياً:
```bash
keytool -genkeypair -v \
  -keystore keystore/deltastars-release.jks \
  -alias deltastars \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000 \
  -storepass YOUR_STORE_PASSWORD \
  -keypass YOUR_KEY_PASSWORD \
  -dname "CN=Delta Stars Trading Co., O=نجوم دلتا للتجارة, L=Jeddah, ST=Makkah, C=SA"
```

### 2. إعدادات التوقيع للـ CI/CD

**CodeMagic Secrets:**
| الاسم | الوصف |
|-------|-------|
| `CM_KEYSTORE` | محتوى ملف .jks مشفر بـ base64 |
| `CM_KEYSTORE_PASSWORD` | كلمة مرور الـ keystore |
| `CM_KEY_ALIAS` | اسم الـ alias (deltastars) |
| `CM_KEY_PASSWORD` | كلمة مرور المفتاح |
| `GCLOUD_SERVICE_ACCOUNT_CREDENTIALS` | حساب Google Play Console |

**GitHub Actions Secrets:**
| الاسم | الوصف |
|-------|-------|
| `KEYSTORE_BASE64` | `base64 -w 0 keystore/deltastars-release.jks` |
| `KEYSTORE_PASSWORD` | كلمة مرور الـ keystore |
| `KEY_ALIAS` | deltastars |
| `KEY_PASSWORD` | كلمة مرور المفتاح |

### 3. بناء APK/AAB محلياً

```bash
# بناء APK (لتثبيت مباشر)
export KEYSTORE_PATH=keystore/deltastars-release.jks
export KEYSTORE_PASSWORD=your_password
export KEY_ALIAS=deltastars
export KEY_PASSWORD=your_password

bun run build:cap
cd android
./gradlew assembleRelease
# النتيجة: android/app/build/outputs/apk/release/DeltaStars-v1.1.0-release.apk

# بناء AAB (لمتجر Google Play)
./gradlew bundleRelease
# النتيجة: android/app/build/outputs/bundle/release/app-release.aab
```

### 4. رفع AAB إلى Google Play Console

1. افتح [Google Play Console](https://play.google.com/console)
2. أنشئ تطبيقاً جديداً بـ Package Name: `com.deltastars.store`
3. ارفع ملف `app-release.aab` في قسم **Production → App bundles**
4. أكمل جميع الحقول المطلوبة (وصف، لقطات شاشة، إلخ)
5. أرسل للمراجعة

### ⚠️ تحذيرات مهمة
- **لا تفقد ملف الـ keystore!** إذا فقده، لن تتمكن من تحديث تطبيقك على Google Play
- احتفظ بنسخة احتياطية مشفرة في مكان آمن
- لا ترفع ملف الـ keystore أو كلمات المرور إلى Git

---

## 🍎 iOS — توقيع IPA

### 1. متطلبات Apple Developer

- حساب **Apple Developer Program** ($99/سنة)
- **Xcode 15+** على macOS
- **CocoaPods** (يُثبّت عبر `brew install cocoapods`)

### 2. إعدادات التوقيع

#### Option A: App Store Connect API Key (موصى به للـ CI/CD)

1. اذهب إلى [App Store Connect → Users and Access → Keys](https://appstoreconnect.apple.com/access/api)
2. أنشئ مفتاحاً جديداً بدور **App Manager**
3. حمّل ملف `.p8` واحفظ `Issuer ID` و `Key ID`

**CodeMagic Secrets:**
| الاسم | الوصف |
|-------|-------|
| `APP_STORE_CONNECT_ISSUER_ID` | Issuer ID من App Store Connect |
| `APP_STORE_CONNECT_KEY_IDENTIFIER` | Key ID |
| `APP_STORE_CONNECT_PRIVATE_KEY` | محتوى ملف .p8 |

#### Option B: Xcode手动 التوقيع (للتطوير المحلي)

1. افتح `ios/App/App.xcworkspace` في Xcode
2. اختر **Signing & Capabilities**
3. حدد **Automatically manage signing**
4. اختر **Team** (حساب Apple Developer)

### 3. بناء IPA

```bash
# بناء IPA محلياً
bun run build:cap
cd ios/App
pod install

# بناء عبر Xcode
xcodebuild -workspace App.xcworkspace \
  -scheme App \
  -configuration Release \
  -archivePath build/App.xcarchive \
  archive

# تصدير IPA
xcodebuild -exportArchive \
  -archivePath build/App.xcarchive \
  -exportOptionsPlist ExportOptions.plist \
  -exportPath build/ipa
```

### 4. رفع إلى App Store Connect

1. افتح **Transporter** أو استخدم `altool`
2. ارفع ملف `.ipa`
3. اذهب إلى [App Store Connect](https://appstoreconnect.apple.com)
4. أكمل جميع الحقول المتطلبة
5. أرسل للمراجعة

### متطلبات App Store
- ✅ لقطات شاشة لأحجام شاشات مختلفة (6.7", 6.5", 5.5")
- ✅ أيقونة 1024x1024 بدون عناصر شفافة
- ✅ وصف التطبيق (30 حرف كحد أقصى للعنوان)
- ✅ رابط سياسة الخصوصية (Privacy Policy URL)
- ✅ رابط دعم (Support URL)
- ✅ فئة التطبيق

---

## 🔗 روابط مهمة

| الرابط | الوصف |
|--------|-------|
| [Google Play Console](https://play.google.com/console) | إدارة تطبيق Android |
| [App Store Connect](https://appstoreconnect.apple.com) | إدارة تطبيق iOS |
| [Privacy Policy](https://deltastars.store/privacy-policy.html) | سياسة الخصوصية |
| [Delta Stars Website](https://deltastars.store) | الموقع الرسمي |

---

© 2026 شركة نجوم دلتا للتجارة — Delta Stars Trading Co.
