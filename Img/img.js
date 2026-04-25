const SAMPLE_BASE64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAFBQIAX8jx0gAAAABJRU5ErkJggg==";
const SAMPLE_IMAGE_URL = "https://dummyimage.com/640x360/0f172a/f8fafc.png&text=Img+Preview";
const SAMPLE_SVG = '<svg width="320" height="180" viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1d4ed8"/><stop offset="100%" stop-color="#0f172a"/></linearGradient></defs><rect width="320" height="180" rx="24" fill="url(#g)"/><circle cx="76" cy="90" r="32" fill="#93c5fd"/><text x="144" y="96" fill="#ffffff" font-size="28" font-family="Arial, sans-serif">SVG Preview</text></svg>';

let currentMode = "auto";
let lastRenderState = null;

const elements = {};

document.addEventListener("DOMContentLoaded", () => {
  elements.sourceInput = document.getElementById("sourceInput");
  elements.result = document.getElementById("result");
  elements.error = document.getElementById("error");
  elements.errorMessage = document.getElementById("errorMessage");
  elements.emptyState = document.getElementById("emptyState");
  elements.previewImage = document.getElementById("previewImage");
  elements.svgPreview = document.getElementById("svgPreview");
  elements.statusText = document.getElementById("statusText");
  elements.inputType = document.getElementById("inputType");
  elements.imageDimensions = document.getElementById("imageDimensions");
  elements.base64Length = document.getElementById("base64Length");
  elements.imageFormat = document.getElementById("imageFormat");
  elements.toast = document.getElementById("toast");
  elements.fullscreenOverlay = document.getElementById("fullscreenOverlay");
  elements.fullscreenContent = document.getElementById("fullscreenContent");
  elements.dropHint = document.getElementById("dropHint");

  document.querySelectorAll(".mode-btn").forEach((button) => {
    button.addEventListener("click", () => switchMode(button.dataset.mode));
  });

  document.querySelectorAll(".example-chip").forEach((button) => {
    button.addEventListener("click", () => fillExample(button.dataset.example));
  });

  document.getElementById("visualizeBtn").addEventListener("click", visualizeInput);
  document.getElementById("clearBtn").addEventListener("click", clearAll);
  document.getElementById("downloadBtn").addEventListener("click", downloadRenderedContent);
  document.getElementById("fullscreenBtn").addEventListener("click", openFullScreen);
  document.getElementById("copyBtn").addEventListener("click", copyToClipboard);
  document.getElementById("closeFullscreenBtn").addEventListener("click", closeFullScreen);

  elements.fullscreenOverlay.addEventListener("click", (event) => {
    if (event.target === elements.fullscreenOverlay) {
      closeFullScreen();
    }
  });

  elements.sourceInput.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key === "Enter") {
      visualizeInput();
    }
  });

  elements.sourceInput.addEventListener("dragover", handleDragOver);
  elements.sourceInput.addEventListener("dragleave", handleDragLeave);
  elements.sourceInput.addEventListener("drop", handleDrop);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !elements.fullscreenOverlay.hidden) {
      closeFullScreen();
    }
  });

  switchMode("auto");
});

function switchMode(mode) {
  currentMode = mode;
  document.querySelectorAll(".mode-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === mode);
  });

  const placeholders = {
    auto: "请粘贴图片 URL、Data URI、Base64 字符串或 SVG 代码",
    image: "请粘贴图片 URL、Data URI 或原始 Base64 字符串",
    svg: "请粘贴完整 SVG 代码，例如 <svg>...</svg>"
  };
  elements.sourceInput.placeholder = placeholders[mode] || placeholders.auto;
}

function fillExample(type) {
  if (type === "svg") {
    switchMode("svg");
    elements.sourceInput.value = SAMPLE_SVG;
  } else if (type === "base64") {
    switchMode("image");
    elements.sourceInput.value = SAMPLE_BASE64;
  } else {
    switchMode("auto");
    elements.sourceInput.value = SAMPLE_IMAGE_URL;
  }

  visualizeInput();
}

async function visualizeInput() {
  const input = elements.sourceInput.value.trim();

  if (!input) {
    showError("请输入图片 URL、Base64 字符串、Data URI 或 SVG 代码。");
    return;
  }

  setStatus("正在解析内容...");
  hideError();

  try {
    const parsed = parseInput(input, currentMode);
    lastRenderState = parsed;

    if (parsed.kind === "svg") {
      renderSvg(parsed);
    } else {
      await renderImage(parsed);
    }

    elements.emptyState.hidden = true;
    elements.result.hidden = false;
    setStatus(`已完成预览，识别为 ${parsed.format.toUpperCase()}`);
  } catch (error) {
    showError(error.message || "预览失败");
  }
}

function parseInput(input, mode) {
  const trimmed = input.trim();
  const isDataUri = /^data:image\/[a-zA-Z0-9.+-]+(?:;charset=[^;,]+)?(?:;base64)?,/i.test(trimmed);
  const isSvgText = /^(?:<\?xml[\s\S]*?\?>\s*)?<svg[\s>]/i.test(trimmed);
  const isUrl = /^https?:\/\/\S+/i.test(trimmed);

  if (isDataUri) {
    const parsedDataUri = parseDataUri(trimmed);
    if (mode === "svg" && parsedDataUri.kind !== "svg") {
      throw new Error("当前是 SVG 模式，请输入 SVG 代码或 SVG Data URI。");
    }
    return parsedDataUri;
  }

  if (mode === "svg" || (mode === "auto" && isSvgText)) {
    return parseSvg(trimmed);
  }

  if (mode === "image" && isSvgText) {
    throw new Error("当前是图片模式，检测到 SVG 代码。请切到 SVG 模式或使用自动识别。");
  }

  if (isUrl) {
    const format = inferFormatFromUrl(trimmed);
    return {
      kind: "image",
      inputType: "URL",
      format,
      src: trimmed,
      lengthText: `${trimmed.length.toLocaleString()} chars`,
      downloadName: `image.${format}`
    };
  }

  return parseRawBase64(trimmed);
}

function parseSvg(svgText) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgText, "image/svg+xml");
  const parserError = doc.querySelector("parsererror");

  if (parserError) {
    throw new Error("SVG 代码格式无效，请检查标签是否闭合。");
  }

  const svgElement = doc.documentElement;
  const width = svgElement.getAttribute("width");
  const height = svgElement.getAttribute("height");
  const viewBox = svgElement.getAttribute("viewBox");

  return {
    kind: "svg",
    inputType: "SVG 代码",
    format: "svg",
    raw: svgText,
    width,
    height,
    viewBox,
    lengthText: `${svgText.length.toLocaleString()} chars`,
    downloadName: "image.svg"
  };
}

function parseDataUri(dataUri) {
  const [meta, data] = dataUri.split(",", 2);
  const mimeMatch = meta.match(/^data:(image\/[a-zA-Z0-9.+-]+)/i);

  if (!mimeMatch) {
    throw new Error("仅支持 image/* 类型的 Data URI。");
  }

  const mimeType = mimeMatch[1].toLowerCase();
  const isBase64 = /;base64/i.test(meta);
  const format = mimeType.split("/")[1].replace("+xml", "");

  if (mimeType === "image/svg+xml") {
    const decodedSvg = isBase64 ? atob(data) : decodeURIComponent(data);
    return parseSvg(decodedSvg);
  }

  if (!isBase64) {
    throw new Error("非 base64 的 Data URI 目前只支持 SVG。");
  }

  return {
    kind: "image",
    inputType: "Data URI",
    format,
    src: dataUri,
    lengthText: `${data.length.toLocaleString()} chars`,
    downloadName: `image.${format}`
  };
}

function parseRawBase64(raw) {
  const normalized = raw.replace(/\s+/g, "");

  if (!/^[A-Za-z0-9+/=]+$/.test(normalized)) {
    throw new Error("内容既不是 URL / Data URI / SVG，也不是合法的 Base64。");
  }

  let binary;
  try {
    binary = atob(normalized);
  } catch (error) {
    throw new Error("Base64 内容无法解码，请检查是否完整。");
  }

  const format = inferFormatFromBinary(binary);

  if (!format) {
    throw new Error("无法识别 Base64 对应的图片格式。");
  }

  if (format === "svg") {
    return parseSvg(binary);
  }

  return {
    kind: "image",
    inputType: "Base64",
    format,
    src: `data:image/${format};base64,${normalized}`,
    lengthText: `${normalized.length.toLocaleString()} chars`,
    downloadName: `image.${format}`
  };
}

function inferFormatFromUrl(url) {
  const match = url.match(/\.([a-zA-Z0-9]+)(?:[?#].*)?$/);
  if (!match) {
    return "png";
  }

  const extension = match[1].toLowerCase();
  if (extension === "jpg") {
    return "jpeg";
  }
  if (extension === "svg") {
    return "svg";
  }
  return extension;
}

function inferFormatFromBinary(binary) {
  if (binary.startsWith("\x89PNG")) {
    return "png";
  }
  if (binary.startsWith("\xFF\xD8\xFF")) {
    return "jpeg";
  }
  if (binary.startsWith("GIF8")) {
    return "gif";
  }
  if (binary.startsWith("RIFF") && binary.includes("WEBP")) {
    return "webp";
  }
  if (binary.startsWith("BM")) {
    return "bmp";
  }
  if (binary.startsWith("<?xml") || binary.startsWith("<svg")) {
    return "svg";
  }
  return "";
}

async function renderImage(parsed) {
  hidePreviewNodes();

  const image = await loadImage(parsed.src);
  elements.previewImage.src = parsed.src;
  elements.previewImage.hidden = false;

  updateInfo({
    inputType: parsed.inputType,
    dimensions: `${image.naturalWidth} × ${image.naturalHeight} px`,
    lengthText: parsed.lengthText,
    format: parsed.format.toUpperCase()
  });
}

function renderSvg(parsed) {
  hidePreviewNodes();
  elements.svgPreview.innerHTML = parsed.raw;
  elements.svgPreview.hidden = false;

  const embeddedSvg = elements.svgPreview.querySelector("svg");
  const width = embeddedSvg ? embeddedSvg.getAttribute("width") || "-" : "-";
  const height = embeddedSvg ? embeddedSvg.getAttribute("height") || "-" : "-";
  const viewBox = embeddedSvg ? embeddedSvg.getAttribute("viewBox") : "";
  const dimensionText = width !== "-" || height !== "-"
    ? `${width} × ${height}`
    : (viewBox ? `viewBox ${viewBox}` : "由 SVG 自身内容决定");

  updateInfo({
    inputType: parsed.inputType,
    dimensions: dimensionText,
    lengthText: parsed.lengthText,
    format: "SVG"
  });
}

function hidePreviewNodes() {
  elements.previewImage.hidden = true;
  elements.previewImage.removeAttribute("src");
  elements.svgPreview.hidden = true;
  elements.svgPreview.innerHTML = "";
}

function updateInfo(info) {
  elements.inputType.textContent = info.inputType;
  elements.imageDimensions.textContent = info.dimensions;
  elements.base64Length.textContent = info.lengthText;
  elements.imageFormat.textContent = info.format;
}

function showError(message) {
  lastRenderState = null;
  elements.error.hidden = false;
  elements.errorMessage.textContent = message;
  elements.result.hidden = true;
  elements.emptyState.hidden = false;
  hidePreviewNodes();
  setStatus("解析失败");
}

function hideError() {
  elements.error.hidden = true;
  elements.errorMessage.textContent = "";
}

function clearAll() {
  elements.sourceInput.value = "";
  elements.result.hidden = true;
  elements.error.hidden = true;
  elements.emptyState.hidden = false;
  hidePreviewNodes();
  lastRenderState = null;
  setStatus("等待输入");
}

async function downloadRenderedContent() {
  if (!lastRenderState) {
    showError("当前没有可下载的内容。");
    return;
  }

  const link = document.createElement("a");
  link.download = lastRenderState.downloadName;

  if (lastRenderState.kind === "svg") {
    const blob = new Blob([lastRenderState.raw], { type: "image/svg+xml;charset=utf-8" });
    link.href = URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    return;
  }

  link.href = lastRenderState.src;
  if (lastRenderState.inputType === "URL") {
    link.target = "_blank";
  }
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

async function copyToClipboard() {
  const text = elements.sourceInput.value.trim();
  if (!text) {
    showError("当前没有可复制的内容。");
    return;
  }

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      elements.sourceInput.select();
      document.execCommand("copy");
    }
    showToast("已复制到剪贴板");
  } catch (error) {
    showError("复制失败，请检查浏览器权限。");
  }
}

function openFullScreen() {
  if (!lastRenderState) {
    showError("当前没有可全屏查看的内容。");
    return;
  }

  elements.fullscreenContent.innerHTML = "";

  if (lastRenderState.kind === "svg") {
    const stage = document.createElement("div");
    stage.className = "svg-stage";
    stage.innerHTML = lastRenderState.raw;
    elements.fullscreenContent.appendChild(stage);
  } else {
    const image = document.createElement("img");
    image.src = elements.previewImage.src;
    image.alt = "全屏预览";
    elements.fullscreenContent.appendChild(image);
  }

  elements.fullscreenOverlay.hidden = false;
}

function closeFullScreen() {
  elements.fullscreenOverlay.hidden = true;
  elements.fullscreenContent.innerHTML = "";
}

function handleDragOver(event) {
  event.preventDefault();
  elements.sourceInput.style.borderColor = "rgba(29, 78, 216, 0.45)";
  elements.sourceInput.style.background = "#ffffff";
  elements.dropHint.textContent = "释放鼠标即可读取图片文件";
}

function handleDragLeave(event) {
  event.preventDefault();
  resetDropStyle();
}

function handleDrop(event) {
  event.preventDefault();
  resetDropStyle();

  const [file] = event.dataTransfer.files || [];
  if (!file) {
    return;
  }

  if (!file.type.startsWith("image/")) {
    showError("仅支持拖入图片文件。");
    return;
  }

  const reader = new FileReader();
  reader.onload = (loadEvent) => {
    elements.sourceInput.value = String(loadEvent.target.result || "");
    switchMode(file.type === "image/svg+xml" ? "auto" : "image");
    visualizeInput();
  };

  if (file.type === "image/svg+xml") {
    reader.readAsText(file);
  } else {
    reader.readAsDataURL(file);
  }
}

function resetDropStyle() {
  elements.sourceInput.style.borderColor = "";
  elements.sourceInput.style.background = "";
  elements.dropHint.textContent = "也可以把本地图片文件直接拖到输入框";
}

function setStatus(text) {
  elements.statusText.textContent = text;
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.hidden = false;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    elements.toast.hidden = true;
  }, 1800);
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("图片加载失败，请检查输入是否正确，或确认远程地址允许浏览器访问。"));
    image.src = src;
  });
}
