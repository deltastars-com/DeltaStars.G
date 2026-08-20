# دليل التوقيع والène Keys — Delta Stars Trading Co.
# Keystore & Signing Guide — نجوم دلتا للتجارة

> ⚠️ **تحذير أمني حرج:** ملفات التوقيع (Keystore) وكلمات المرور المرتبطة بها حساسة للغاية.
> لا تُ程式 قط في Git أو أي نظام إدارة أصداد. احتفظ بها في مكان آمن خارج المستودع.

---

## أولاً: توقيع تطبيق Android

### 1. إنشاء Keystore جديد

```bash
keytool -genkey -v \
  -keystore deltastars-release.jks \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000 \
  -alias deltastars \
  -storepass YOUR_STORE_PASSWORD \
  -keypass YOUR_KEY_PASSWORD
```

**أثناء الإنشاء، أدخل:**
```
ما هو اسمك واسم عائلتك؟     → Delta Stars Trading Co.
ما هو اسم الوحدة التنظيمية؟  → IT Department
ما هو اسم مؤسستك؟           → Delta Stars Trading Co.
ما هو اسم مدينتك؟           → Jeddah
ما هي ولايتك/محافظتك؟      → Makkah Region
ما هو رمز بلدك؟             → SA (المملكة العربية السعودية)
```

### 2. فحص Keystore

```bash
keytool -list -v -keystore deltastars-release.jks -alias deltastars
```

### 3. تحويل Keystore إلى Base64 (لـ CodeMagic)

```bash
# Linux / macOS
base64 -i deltastars-release.jks | tr -d '\n' > deltastars-release-base64.txt

# Windows
certutil -encodehex deltastars-release.jks deltastars-release-base64.txt
```

### 4. إعداد Firebase App Signing (موصى به)

1. افتح [Firebase Console](https://console.firebase.google.com)
2. اختر مشروعك → Project Settings → Android App
3. اضغط "Upload certificate" → ارفع ملف `.jks`
4. Firebase سيقوم بتوقيع التطبيق بدلاً منك

### 5. متطلبات Google Play

| البند | المتطلب |
|-------|---------|
| SHA-1 Certificate | الحصول عليه من `keytool -list` |
| SHA-256 Certificate | الحصول عليه من `keytool -list -v` |
| App Bundle (AAB) | ملف `.aab` موقَّع |
| Target API Level | 34+ (Android 14) |
| Minimum API Level | 24 (Android 7) |

---

## ثانياً: توقيع تطبيق iOS

### 1. متطلبات Apple Developer

- حساب Apple Developer ($99/سنة)
- Apple Developer Team
- App Store Connect API Key (اختياري — عبر CodeMagic)

### 2. إعداد Xcode Signing

1. افتح `ios/App/App.xcworkspace` في Xcode
2. اختر مشروع `App`
3. تبويب "Signing & Capabilities"
4. اختر Team الخاص بك
5.毅ّر "Automatically manage signing"

### 3. App Store Connect API Key (لـ CodeMagic)

```bash
# من https://appstoreconnect.apple.com/access/integrations/api
# 1. أنشئ API Key جديد بصلاحية "Developer"
# 2. حمّل ملف .p8
# 3. احفظ Issuer ID و Key Identifier
```

### 4. متطلبات App Store

| البند | المتطلب |
|-------|---------|
| Bundle ID | `com.deltastars.store` |
| Minimum iOS | 15.0+ |
| App Icon | 1024x1024 PNG |
| Screenshots | iPhone 6.7", 6.5", 5.5" + iPad |
| Privacy Manifest | PrivacyInfo.xcprivacy |
| Privacy Policy URL | `https://deltastars.store/privacy-policy.html` |

---

## ثالثاً: ملفات Firebase المطلوبة

### google-services.json (Android)

1. افتح [Firebase Console](https://console.firebase.google.com)
2. Project Settings → Android App
3. اضغط "google-services.json"
4. احفظه في: `android/app/google-services.json`

### GoogleService-Info.plist (iOS)

1. افتح Firebase Console
2. Project Settings → iOS App
3. اضغط "GoogleService-Info.plist"
4. احفظه في: `ios/App/App/`

---

## رابعاً: نص توليد التوقيعات تلقائياً

```bash
#!/bin/sh
# scripts/generate-signing.sh

echo "🔑 Delta Stars — Keystore Generator"

# إعدادات
STORE_NAME="deltastars-release.jks"
ALIAS="deltastars"
VALIDITY=10000
KEY_SIZE=2048

# طلب كلمة المرور
read -p "Enter store password: " STORE_PASS
read -p "Enter key password: " KEY_PASS

# توليد Keystore
keytool -genkey -v \
  -keystore "$STORE_NAME" \
  -keyalg RSA \
  -keysize $KEY_SIZE \
  -validity $VALIDITY \
  -alias "$ALIAS" \
  -storepass "$STORE_PASS" \
  -keypass "$KEY_PASS" \
  -dname "CN=Delta Stars Trading Co., OU=IT, O=Delta Stars, L=Jeddah, ST=Makkah, C=SA"

echo "✅ Keystore generated: $STORE_NAME"
echo "📋 SHA-1:"
keytool -list -v -keystore "$STORE_NAME" -alias "$ALIAS" -storepass "$STORE_PASS" | grep SHA1
echo "📋 SHA-256:"
keytool -list -v -keystore "$STORE_NAME" -alias "$ALIAS" -storepass "$STORE_PASS" | grep SHA256
```

---

## ⚠️ قواعد أمنية إلزامية:

1. **لا ت程式** ملف Keystore أو كلمة المرور في Git
2. **أضف** `*.jks` و `*.keystore` إلى `.gitignore`
3. **استخدم** Environment Variables لكلمات المرور في CI/CD
4. **احتفظ** بنسخة احتياطية في مكان آمن (Vault أو Password Manager)
5. **لا تشارك** كلمة المرور إلا مع مسؤولي DevOps المخوّلين

---

**© 2026 شركة نجوم دلتا للتجارة — جميع الحقوق محفوظة**
