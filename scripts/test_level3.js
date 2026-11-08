import assert from "node:assert";

// Mock del diccionario para test
const mockDictionary = {
  es: {
    greeting: "Hola",
    only_spanish: "Solo en español"
  },
  en: {
    greeting: "Hello"
  }
};

let currentLang = "en";

function t(key, lang = currentLang, dict = mockDictionary) {
  if (!key || typeof key !== "string") return "";
  const currentDict = dict[lang];
  if (currentDict && typeof currentDict[key] === "string") {
    return currentDict[key];
  }

  const fallbackDict = dict.es;
  if (fallbackDict && typeof fallbackDict[key] === "string") {
    return fallbackDict[key];
  }

  return key;
}

// 1. Traducción directa en idioma seleccionado
assert.strictEqual(t("greeting", "en"), "Hello");
assert.strictEqual(t("greeting", "es"), "Hola");

// 2. Fallback a español cuando no existe en inglés
assert.strictEqual(t("only_spanish", "en"), "Solo en español");

// 3. Fallback a la clave si no existe en ningún idioma
assert.strictEqual(t("non_existing_key", "en"), "non_existing_key");

// 4. Protección ante entradas no válidas
assert.strictEqual(t(null), "");
assert.strictEqual(t(undefined), "");
assert.strictEqual(t(123), "");

console.log("==> Test Unitario Nivel 3: Superado con éxito (I18n multi-tier resolution & fallbacks)");
