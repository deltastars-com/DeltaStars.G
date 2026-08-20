#!/bin/bash
# ================================================================
# generate-keystore.sh — Delta Stars Android Keystore Generator
# شركة نجوم دلتا للتجارة (Delta Stars Trading Co.)
# ================================================================
#
# USAGE:
#   chmod +x scripts/generate-keystore.sh
#   ./scripts/generate-keystore.sh
#
# This script generates a release keystore for signing the Android APK/AAB.
# Run this ONCE on a secure machine. Keep the output files safe!
#
# REQUIRED: Java JDK (keytool is included with JDK)
# ================================================================

set -e

KEYSTORE_DIR="keystore"
KEYSTORE_FILE="${KEYSTORE_DIR}/deltastars-release.jks"
ALIAS="deltastars"
VALIDITY=10000  # ~27 years

echo "🔑 Delta Stars — Android Keystore Generator"
echo "============================================"
echo ""

# Check for keytool
if ! command -v keytool &> /dev/null; then
    echo "❌ Error: keytool not found. Install Java JDK first."
    echo "   Ubuntu/Debian: sudo apt install openjdk-17-jdk"
    echo "   macOS: brew install openjdk@17"
    echo "   Windows: Download from https://adoptium.net/"
    exit 1
fi

# Create keystore directory
mkdir -p "${KEYSTORE_DIR}"

echo "📋 This will generate a new release keystore for Android."
echo "   Keystore: ${KEYSTORE_FILE}"
echo "   Alias: ${ALIAS}"
echo "   Validity: ${VALIDITY} days (~27 years)"
echo ""
echo "⚠️  IMPORTANT: You will be prompted to create a password."
echo "   Remember this password — you need it for every release build!"
echo ""

# Generate keystore
keytool -genkeypair \
    -v \
    -keystore "${KEYSTORE_FILE}" \
    -alias "${ALIAS}" \
    -keyalg RSA \
    -keysize 2048 \
    -validity "${VALIDITY}" \
    -storepass "${KEYSTORE_PASSWORD:-changeme}" \
    -keypass "${KEY_PASSWORD:-changeme}" \
    -dname "CN=Delta Stars Trading Co., O=نجوم دلتا للتجارة, L=Jeddah, ST=Makkah, C=SA"

echo ""
echo "✅ Keystore generated successfully!"
echo ""
echo "📁 Files created:"
echo "   ${KEYSTORE_FILE}"
echo ""
echo "🔑 Configure these in your CI/CD (CodeMagic / GitHub Actions):"
echo "   KEYSTORE_PATH=${KEYSTORE_FILE}"
echo "   KEYSTORE_PASSWORD=<your-store-password>"
echo "   KEY_ALIAS=${ALIAS}"
echo "   KEY_PASSWORD=<your-key-password>"
echo ""
echo "⚠️  SECURITY WARNING:"
echo "   - NEVER commit the keystore file to git (already in .gitignore)"
echo "   - NEVER commit passwords to git"
echo "   - Store backup copies in a secure location (e.g., encrypted USB)"
echo "   - If you lose this keystore, you CANNOT update your app on Play Store!"
echo ""
echo "📋 To use in local build:"
echo "   export KEYSTORE_PATH=${KEYSTORE_FILE}"
echo "   export KEYSTORE_PASSWORD=<your-password>"
echo "   export KEY_ALIAS=${ALIAS}"
echo "   export KEY_PASSWORD=<your-password>"
echo "   cd android && ./gradlew assembleRelease"
