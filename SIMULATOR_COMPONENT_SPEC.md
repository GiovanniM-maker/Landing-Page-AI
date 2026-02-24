# Simulatore prodotto – specifica tecnica per replicazione

Specifica completa per replicare il componente "Simulatore" di una landing page. Include: carosello prodotti, upload custom, chiamata webhook multipart, stati loading/result, form lead capture e anteprima HTML in iframe.

---

## 1. Costanti

```javascript
const WEBHOOK_URL = "https://giovannimavilla.app.n8n.cloud/webhook/598963fd-c7c5-41ca-b0cf-27a9c9f2b229";
const LEAD_WEBHOOK_URL = "https://giovannimavilla.app.n8n.cloud/webhook/f5d0fd75-8c72-4c61-8029-cd6c46832039";
const CUSTOM_ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];
const MAX_CUSTOM_IMAGES = 6;
const LOADING_STEPS = [
  "Analisi della struttura in corso...",
  "Verifica attributi tecnici...",
  "Controllo ottimizzazione SEO...",
  "Confronto benchmark di settore...",
  "Generazione report..."
];

const SIM_PRODUCTS = [
  { id: "wine-zolla", name: "La Zolla Toscana Sangiovese 2023", category: "Food & Beverage", frontImage: "/products/wine-front.png", backImage: "/products/wine-back.png" },
  { id: "gift-wild-turkey", name: "Wild Turkey Gift Box", category: "Spirits", frontImage: "/products/box-front.png", backImage: "/products/box-back.png" },
];

const SIMULATOR_EXTRACTION_TEXT = `Analizza l'immagine/le immagini di questo prodotto alimentare ed estrai tutte le informazioni visibili.
... (testo completo prompt estrazione JSON - vedi sotto) ...
RISPONDI SOLO CON IL JSON, NIENT ALTRO. NO spiegazioni. NO markdown. NO \`\`\`json\`\`\`.`;
```

---

## 2. State (React)

```javascript
const [simState, setSimState] = useState<"idle" | "loading" | "result" | "unlocked">("idle");
const [loadingStep, setLoadingStep] = useState(0);
const [selectedProductId, setSelectedProductId] = useState(SIM_PRODUCTS[0].id);
const [customFiles, setCustomFiles] = useState<File[]>([]);
const [customUploadError, setCustomUploadError] = useState("");
const [webhookTextResponse, setWebhookTextResponse] = useState("");
const [webhookHtmlResponse, setWebhookHtmlResponse] = useState("");
const [webhookIsHtml, setWebhookIsHtml] = useState(false);
const [webhookTextStatus, setWebhookTextStatus] = useState<"idle" | "ok" | "error">("idle");
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [email, setEmail] = useState("");
const [emailError, setEmailError] = useState("");
const customFileInputRef = useRef<HTMLInputElement | null>(null);

const hasCustomFiles = customFiles.length > 0;
const selectedProduct = SIM_PRODUCTS.find((p) => p.id === selectedProductId) || SIM_PRODUCTS[0];
```

---

## 3. Helper functions

```javascript
const normalizeText = (v) => String(v ?? "").replace(/\s+/g, " ").trim();
const isLikelyHtml = (v) => /<!doctype html|<html[\s>]|<head[\s>]|<body[\s>]/i.test(v);
const validateEmail = (e) => {
  const v = e.trim().toLowerCase();
  if (!v || !v.includes("@")) return "Inserisci un'email valida.";
  const [local, domain] = v.split("@");
  if (!local || !domain || !domain.includes(".")) return "Inserisci un'email valida.";
  return "";
};

const imageUrlToFile = async (url, fallbackName) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Impossibile leggere ${url}`);
  const blob = await res.blob();
  const fileName = url.split("/").pop() || fallbackName;
  return new File([blob], fileName, { type: blob.type || "image/png" });
};
```

---

## 4. Webhook – invio multipart

```javascript
const sendSimulatorWebhook = async (event, providedEmail = "") => {
  const filesToSend = hasCustomFiles
    ? customFiles
    : [
        await imageUrlToFile(selectedProduct.frontImage, `${selectedProduct.id}-front.png`),
        await imageUrlToFile(selectedProduct.backImage, `${selectedProduct.id}-back.png`),
      ];

  const payload = {
    event,
    text: SIMULATOR_EXTRACTION_TEXT,
    inputMode: hasCustomFiles ? "custom_upload" : "sample_carousel",
    selectedProduct: {
      id: hasCustomFiles ? null : selectedProduct.id,
      name: hasCustomFiles ? "Upload custom utente" : selectedProduct.name,
      category: hasCustomFiles ? "Custom" : selectedProduct.category,
      frontImage: hasCustomFiles ? null : selectedProduct.frontImage,
      backImage: hasCustomFiles ? null : selectedProduct.backImage,
    },
    email: providedEmail,
    filesMeta: filesToSend.map((f) => ({ filename: f.name, mimeType: f.type, sizeBytes: f.size })),
    sentAt: new Date().toISOString(),
    source: "auiki-landing-simulator",
  };

  const formData = new FormData();
  formData.append("payload", JSON.stringify(payload));
  formData.append("event", event);
  formData.append("text", SIMULATOR_EXTRACTION_TEXT);
  formData.append("inputMode", hasCustomFiles ? "custom_upload" : "sample_carousel");
  formData.append("productId", hasCustomFiles ? "custom-upload" : selectedProduct.id);
  formData.append("productName", hasCustomFiles ? "Upload custom utente" : selectedProduct.name);
  formData.append("productCategory", hasCustomFiles ? "Custom" : selectedProduct.category);
  formData.append("email", providedEmail);
  formData.append("sentAt", payload.sentAt);
  formData.append("source", payload.source);
  filesToSend.forEach((file) => formData.append("files", file, file.name));

  const res = await fetch(WEBHOOK_URL, { method: "POST", body: formData });
  const rawText = (await res.text().catch(() => "")) || "";
  const cleaned = normalizeText(rawText).slice(0, 12000);
  const htmlMode = isLikelyHtml(rawText);

  setWebhookIsHtml(htmlMode);
  setWebhookHtmlResponse(htmlMode ? rawText.slice(0, 50000) : "");
  setWebhookTextResponse(cleaned || "(Webhook senza body testuale)");
  setWebhookTextStatus(res.ok ? "ok" : "error");
};
```

---

## 5. Handlers

```javascript
const onOpenCustomPicker = () => customFileInputRef.current?.click();

const onCustomFilesChange = (e) => {
  const selected = Array.from(e.target.files || []);
  if (!selected.length) return;
  const valid = [];
  for (const file of selected) {
    if (!CUSTOM_ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setCustomUploadError("Formato non supportato. Carica immagini PNG, JPG/JPEG o WEBP.");
      continue;
    }
    valid.push(file);
    if (valid.length >= MAX_CUSTOM_IMAGES) break;
  }
  if (!valid.length) return;
  setCustomFiles(valid.slice(0, MAX_CUSTOM_IMAGES));
  setCustomUploadError("");
  e.target.value = "";
};

const runSimulator = async () => {
  if (!selectedProduct && !hasCustomFiles) return;
  setWebhookTextResponse("");
  setWebhookHtmlResponse("");
  setWebhookIsHtml(false);
  setWebhookTextStatus("idle");
  setSimState("loading");
  setLoadingStep(0);
  const iv = setInterval(() => setLoadingStep((prev) => (prev + 1) % LOADING_STEPS.length), 1100);
  try {
    await sendSimulatorWebhook("simulator_submit");
    setSimState("result");
  } finally {
    clearInterval(iv);
  }
};

const sendLeadWebhook = async () => {
  const res = await fetch(LEAD_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome: firstName.trim(), cognome: lastName.trim(), email: email.trim().toLowerCase() }),
  });
  if (!res.ok) throw new Error(`Lead webhook fallito: ${res.status}`);
};

const submitEmail = async () => {
  if (!firstName.trim()) return setEmailError("Inserisci il nome.");
  if (!lastName.trim()) return setEmailError("Inserisci il cognome.");
  const err = validateEmail(email);
  if (err) return setEmailError(err);
  setEmailError("");
  try {
    await sendLeadWebhook();
    setSimState("unlocked");
  } catch {
    setEmailError("Errore invio contatto. Riprova.");
  }
};
```

---

## 6. JSX – struttura

```jsx
<section style={{ paddingBottom: 78, background: "#070b0e", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
  <div className="container grid-bg" style={{ paddingTop: 24, color: "#f5f5f7" }}>
    <p className="kicker" style={{ color: "#9ca3af" }}>Il simulatore</p>
    <h2>Prova il motore sulla tua scheda prodotto</h2>
    <p className="muted">Seleziona un prodotto dal carosello. Passa il mouse per vedere la seconda foto e avvia l'analisi.</p>

    <div style={{ color: "var(--ink)", paddingTop: 16 }}>
      {/* IDLE: carosello + bottone Generate */}
      {simState === "idle" && (
        <div>
          <p className="muted">Seleziona un prodotto dal carosello oppure carica immagini custom da inviare al webhook.</p>
          <div className="product-carousel">
            {SIM_PRODUCTS.map((product) => (
              <article
                key={product.id}
                className={`product-card ${selectedProductId === product.id ? "is-selected" : ""} ${hasCustomFiles ? "is-disabled" : ""}`}
                onClick={() => { if (!hasCustomFiles) setSelectedProductId(product.id); }}
              >
                <img src={product.frontImage} alt={`${product.name} fronte`} style={{ width: "100%", height: 190, objectFit: "cover" }} />
                <div className="product-hover">
                  <img src={product.backImage} alt={`${product.name} retro`} style={{ width: "100%", height: 190, objectFit: "cover" }} />
                </div>
                <div style={{ padding: 10 }}>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: 13 }}>{product.name}</p>
                  <p className="muted" style={{ margin: "4px 0 0", fontSize: 12 }}>{product.category}</p>
                </div>
              </article>
            ))}
            <article className="product-card product-upload" onClick={onOpenCustomPicker}>
              <div style={{ position: "relative", height: 190, overflow: "hidden" }}>
                <img src={selectedProduct.frontImage} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "blur(4px)", transform: "scale(1.06)", opacity: 0.52 }} />
                <div style={{ position: "absolute", inset: 0, background: "rgba(5,6,7,.5)" }} />
              </div>
              <div style={{ padding: 10, minHeight: 58, display: "grid", placeItems: "center" }}>
                <p>Carica la foto del tuo prodotto</p>
              </div>
            </article>
          </div>
          <input ref={customFileInputRef} type="file" accept=".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp" multiple style={{ display: "none" }} onChange={onCustomFilesChange} />
          {hasCustomFiles && <p className="muted">Upload custom attivo: {customFiles.map((f) => f.name).join(" · ")}</p>}
          {customUploadError && <p style={{ color: "var(--danger)" }}>{customUploadError}</p>}
          <button className="gen-btn" onClick={runSimulator}>Generate</button>
        </div>
      )}

      {/* LOADING: loader animato + messaggio step */}
      {simState === "loading" && (
        <div>
          <div className="loader-stage">
            <div className="loader-wrapper">
              {"Generating".split("").map((ch, idx) => <span key={idx} className="loader-letter">{ch}</span>)}
              <div className="loader" />
            </div>
          </div>
          <p>{LOADING_STEPS[loadingStep]}</p>
        </div>
      )}

      {/* RESULT / UNLOCKED: iframe preview + form lead (solo se result) */}
      {(simState === "result" || simState === "unlocked") && (
        <div>
          <div className="web-browser">
            <div className="web-tabs-head">...</div>
            <div className="web-head-browser">...</div>
            <div className="web-body">
              {webhookIsHtml && webhookHtmlResponse ? (
                <iframe title="Anteprima risposta webhook" srcDoc={webhookHtmlResponse} sandbox="" />
              ) : (
                <div className="web-body-fallback">Il webhook non ha restituito HTML renderizzabile in anteprima.</div>
              )}
            </div>
          </div>
          {simState === "result" && (
            <div>
              <h3>Vuoi continuare con lo sblocco completo?</h3>
              <input value={firstName} onChange={(e) => { setFirstName(e.target.value); setEmailError(""); }} placeholder="Nome *" />
              <input value={lastName} onChange={(e) => { setLastName(e.target.value); setEmailError(""); }} placeholder="Cognome *" />
              <input value={email} onChange={(e) => { setEmail(e.target.value); setEmailError(""); }} placeholder="nome@tuaazienda.it *" />
              <button onClick={submitEmail}>Invio</button>
              {emailError && <p>{emailError}</p>}
            </div>
          )}
        </div>
      )}
    </div>
  </div>
</section>
```

---

## 7. CSS necessario

```css
:root {
  --line: rgba(120,145,170,.22);
  --ink: #f1f2f0;
  --muted: #a8afb8;
  --primary-ink: #f36a63;
  --danger: #ff7670;
}

.product-carousel { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
.product-card { position: relative; border: 1px solid var(--line); border-radius: 14px; overflow: hidden; background: #0f151b; cursor: pointer; transition: transform .2s ease, box-shadow .2s ease; }
.product-card:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(0,0,0,.3); }
.product-card.is-selected { border-color: var(--primary-ink); box-shadow: 0 0 0 2px rgba(255,55,95,.22); }
.product-card.is-disabled { opacity: .42; cursor: not-allowed; filter: grayscale(1); }
.product-hover { position: absolute; inset: 0; background: #0f151b; transform: translateY(-102%); transition: transform .25s ease; z-index: 2; }
.product-card:hover .product-hover { transform: translateY(0); }
.product-upload { background: #0f151b; }

.loader-stage { display: grid; place-items: center; min-height: 420px; background: #212121; border-radius: 10px; }
.loader-wrapper { position: relative; display: flex; align-items: center; justify-content: center; width: 180px; height: 180px; color: #fff; }
.loader { position: absolute; inset: 0; border-radius: 50%; animation: loader-rotate 2s linear infinite; }
@keyframes loader-rotate {
  0% { transform: rotate(90deg); }
  50% { transform: rotate(270deg); }
  100% { transform: rotate(450deg); }
}
.loader-letter { animation: loader-letter-anim 2s infinite; }
.loader-letter:nth-child(n) { animation-delay: calc((n - 1) * .1s); }
@keyframes loader-letter-anim {
  0%, 100% { opacity: .4; }
  20% { opacity: 1; transform: scale(1.15); }
  40% { opacity: .7; }
}

.web-browser { width: 100%; height: 560px; background: #353535; border-radius: 7px; display: flex; flex-direction: column; overflow: hidden; }
.web-tabs-head { background: #353535; height: 40px; }
.web-head-browser { background: #515151; height: 40px; padding: 7px; display: flex; gap: 5px; }
.web-body { flex: 1; background: #0f141a; }
.web-body iframe { width: 100%; height: 100%; border: none; }
.web-body-fallback { padding: 12px; color: #b4bdc8; font-size: 13px; }

.gen-btn { padding: .5em 1.1em; background: #101010; border-radius: 24px; color: #fff; cursor: pointer; font-weight: 500; }
.kicker { font-size: 11px; letter-spacing: .18em; text-transform: uppercase; font-weight: 600; }
.muted { color: var(--muted); }
.container { max-width: 1240px; margin: 0 auto; padding: 0 28px; }
```

---

## 8. Flusso logico

1. **idle**: utente seleziona prodotto dal carosello O carica immagini custom → clic su "Generate".
2. **loading**: `runSimulator` → `sendSimulatorWebhook` (POST multipart con `files` + `payload` JSON) → messaggio step ruota ogni 1.1s.
3. **result**: risposta webhook in `webhookHtmlResponse` / `webhookTextResponse`; se HTML → iframe `srcDoc`; form lead (nome, cognome, email) → `submitEmail` → `sendLeadWebhook` (POST JSON).
4. **unlocked**: dopo `submitEmail` ok → `setSimState("unlocked")` → rimane solo anteprima, senza form.

---

## 9. Endpoint webhook

- **Simulator**: `POST` multipart con `files` (immagini) e campi: `payload`, `event`, `text`, `inputMode`, `productId`, `productName`, `productCategory`, `email`, `sentAt`, `source`.
- **Lead**: `POST` JSON `{ nome, cognome, email }`.

---

## 10. Prompt estrazione (SIMULATOR_EXTRACTION_TEXT)

Il prompt completo richiede un JSON con: `extraction_metadata`, `product_identification`, `weight_and_volume`, `certifications_visible`, `wine_details`, `nutritional_info_per_100g`, `ingredients`, `warnings_and_labels`, `storage_and_preparation`, `undefined_data`. Per la versione completa vedere il file sorgente `App.tsx` righe 54–189.
