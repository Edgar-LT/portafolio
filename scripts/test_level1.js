import assert from "node:assert";

const HTML_ENTITY_MAP = Object.freeze({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#039;"
});

function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str).replace(/[&<>"']/g, (char) => HTML_ENTITY_MAP[char] || char);
}

const ALLOWED_PROTOCOLS = new Set(["http:", "https:", "mailto:", "tel:"]);

function sanitizeUrl(rawUrl, fallback = "#") {
  if (!rawUrl || typeof rawUrl !== "string") return fallback;
  const trimmed = rawUrl.trim();
  if (!trimmed) return fallback;

  if (trimmed.startsWith("#") || trimmed.startsWith("./") || trimmed.startsWith("/") || trimmed.startsWith("assets/")) {
    return encodeURI(trimmed);
  }

  try {
    const parsed = new URL(trimmed, "https://edgar-lt.github.io/portafolio/");
    return ALLOWED_PROTOCOLS.has(parsed.protocol) ? parsed.href : fallback;
  } catch {
    return fallback;
  }
}

// Tests
assert.strictEqual(escapeHtml("<script>alert(1)</script>"), "&lt;script&gt;alert(1)&lt;/script&gt;");
assert.strictEqual(escapeHtml('"Hello & World\''), "&quot;Hello &amp; World&#039;");
assert.strictEqual(sanitizeUrl("javascript:alert(1)"), "#");
assert.strictEqual(sanitizeUrl("vbscript:msgbox(1)"), "#");
assert.strictEqual(sanitizeUrl("data:text/html,<script>alert(1)</script>"), "#");
assert.strictEqual(sanitizeUrl("https://github.com/Edgar-LT"), "https://github.com/Edgar-LT");
assert.strictEqual(sanitizeUrl("assets/projects/test.png"), "assets/projects/test.png");
assert.strictEqual(sanitizeUrl("mailto:test@example.com"), "mailto:test@example.com");
assert.strictEqual(sanitizeUrl("tel:+584129640005"), "tel:+584129640005");

console.log("==> Test Unitario Nivel 1: Superado con éxito (100% de aserciones validadas)");
