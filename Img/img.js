// 一个小型的示例 Base64 图片（1x1 的红色像素）
const SAMPLE_BASE64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAFBQIAX8jx0gAAAABJRU5ErkJggg==';


function visualizeImage() {
  const input = document.getElementById('base64Input').value.trim();
  const errorDiv = document.getElementById('error');
  const resultDiv = document.getElementById('result');

  // 清除之前的错误
  errorDiv.style.display = 'none';

  if (!input) {
    showError('请输入图片 URL 或 Base64 字符串');
    return;
  }

  try {
    // 检测输入类型
    const isUrl = /^https?:\/\//i.test(input);
    const isDataUri = /^data:image\/[\w+]+;base64,/i.test(input);

    let imageSrc = '';
    let imageFormat = 'unknown';
    let base64Length = 0;

    if (isUrl) {
      // 处理图片 URL
      imageSrc = input;
      // 尝试从 URL 推断格式
      const urlParts = input.split('.');
      const extension = urlParts[urlParts.length - 1].toLowerCase().split('?')[0].split('#')[0];
      if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'svg', 'ico', 'tiff', 'tif'].includes(extension)) {
        imageFormat = extension === 'jpg' ? 'jpeg' : extension;
        if (extension === 'svg') imageFormat = 'svg+xml';
      }
      base64Length = input.length; // URL 长度作为参考
    } else if (isDataUri) {
      // 处理 data URI 格式的 Base64
      const match = input.match(/^data:image\/([\w+]+);base64,(.+)$/);
      if (!match) {
        showError('Base64 格式不正确，应为 data:image/type;base64,xxxxx 格式');
        return;
      }
      imageFormat = match[1];
      const base64Data = match[2];
      imageSrc = input;
      base64Length = base64Data.length;
    } else {
      // 处理纯 Base64 字符串
      // 验证 Base64 格式
      try {
        atob(input);
      } catch (e) {
        showError('Base64 字符串不正确，请检查格式');
        return;
      }

      // 自动检测图片格式
      try {
        const binaryString = atob(input.substring(0, 12));
        if (binaryString.startsWith('\x89PNG')) {
          imageFormat = 'png';
        } else if (binaryString.startsWith('\xFF\xD8\xFF')) {
          imageFormat = 'jpeg';
        } else if (binaryString.startsWith('GIF8')) {
          imageFormat = 'gif';
        } else if (binaryString.startsWith('RIFF')) {
          imageFormat = 'webp';
        } else if (binaryString.startsWith('BM')) {
          imageFormat = 'bmp';
        } else if (input.toLowerCase().includes('<svg')) {
          imageFormat = 'svg+xml';
        }
      } catch (e) {
        // 如果解码失败，可能是SVG
        if (input.toLowerCase().includes('<svg')) {
          imageFormat = 'svg+xml';
        } else {
          imageFormat = 'unknown';
        }
      }
      imageSrc = `data:image/${imageFormat};base64,${input}`;
      base64Length = input.length;
    }

    // 创建图片对象来加载和显示
    const img = new Image();
    
    img.onload = function() {
      // 图片加载成功
      const previewImage = document.getElementById('previewImage');
      previewImage.src = imageSrc;
      
      // 更新信息
      const inputType = isUrl ? 'URL' : 'Base64';
      document.getElementById('inputType').textContent = inputType;
      document.getElementById('imageDimensions').textContent = `${img.width} × ${img.height} px`;
      document.getElementById('base64Length').textContent = base64Length.toLocaleString();
      document.getElementById('imageFormat').textContent = imageFormat.toUpperCase();
      
      // 显示结果区域
      resultDiv.style.display = 'block';
      errorDiv.style.display = 'none';
      
      // 滚动到结果区域
      setTimeout(() => {
        resultDiv.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    };

    img.onerror = function() {
      showError('图片加载失败，请检查 URL 或 Base64 字符串是否正确');
    };

    // 开始加载图片
    img.src = imageSrc;

  } catch (error) {
    showError('处理失败: ' + error.message);
  }
}

function showError(message) {
  const errorDiv = document.getElementById('error');
  const errorMessage = document.getElementById('errorMessage');
  errorMessage.textContent = '❌ ' + message;
  errorDiv.style.display = 'block';
  document.getElementById('result').style.display = 'none';
}

function openFullScreen() {
  const previewImage = document.getElementById('previewImage');
  const imageSrc = previewImage.src;
  if (!imageSrc) {
    showError('当前没有可全屏显示的图片');
    return;
  }

  const overlay = document.getElementById('fullscreenOverlay');
  const fsImage = document.getElementById('fullscreenImage');
  fsImage.src = imageSrc;
  overlay.style.display = 'flex';

  // 尝试使用浏览器全屏 API（如果支持）
  const requestTarget = overlay.requestFullscreen || overlay.webkitRequestFullscreen || overlay.mozRequestFullScreen || overlay.msRequestFullscreen;
  if (requestTarget) {
    requestTarget.call(overlay).catch(() => {});
  }
}

function closeFullScreen() {
  const overlay = document.getElementById('fullscreenOverlay');
  overlay.style.display = 'none';
  const fsImage = document.getElementById('fullscreenImage');
  fsImage.src = '';

  const exit = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
  if (exit && (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)) {
    exit.call(document).catch(() => {});
  }
}

// 全屏层 Esc 键关闭，增加键盘监听
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' || e.key === 'Esc') {
    const overlay = document.getElementById('fullscreenOverlay');
    if (overlay && overlay.style.display === 'flex') {
      closeFullScreen();
    }
  }
});

function clearAll() {
  document.getElementById('base64Input').value = '';
  document.getElementById('result').style.display = 'none';
  document.getElementById('error').style.display = 'none';
}

function downloadImage() {
  const input = document.getElementById('base64Input').value.trim();
  if (!input) {
    showError('没有图片可下载');
    return;
  }

  try {
    const isUrl = /^https?:\/\//i.test(input);
    const isDataUri = /^data:image\/[\w+]+;base64,/i.test(input);

    if (isUrl) {
      // 对于URL，创建一个下载链接
      const link = document.createElement('a');
      link.href = input;
      link.download = 'image'; // 浏览器会自动推断扩展名
      link.target = '_blank'; // 在新标签页打开，让浏览器处理下载
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // 处理 Base64
      let base64String = input;
      let filename = 'image';

      if (isDataUri) {
        const match = input.match(/^data:image\/([\w+]+);base64,(.+)$/);
        if (match) {
          filename = `image.${match[1]}`;
          base64String = input;
        }
      } else {
        base64String = `data:image/png;base64,${input}`;
        filename = 'image.png';
      }

      // 创建下载链接
      const link = document.createElement('a');
      link.href = base64String;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  } catch (error) {
    showError('下载失败: ' + error.message);
  }
}

/* copyBase64 已移除 */
// 函数已删除，后续代码继续。

// 支持拖放功能
document.addEventListener('DOMContentLoaded', function() {
  const textarea = document.getElementById('base64Input');

  textarea.addEventListener('dragover', (e) => {
    e.preventDefault();
    textarea.style.borderColor = '#667eea';
    textarea.style.backgroundColor = '#f0f4ff';
  });

  textarea.addEventListener('dragleave', (e) => {
    e.preventDefault();
    textarea.style.borderColor = '#e0e0e0';
    textarea.style.backgroundColor = '#f9f9f9';
  });

  textarea.addEventListener('drop', (e) => {
    e.preventDefault();
    textarea.style.borderColor = '#e0e0e0';
    textarea.style.backgroundColor = '#f9f9f9';

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      
      // 检查是否是图片文件
      if (!file.type.startsWith('image/')) {
        showError('请拖放图片文件');
        return;
      }

      // 读取文件为 Base64
      const reader = new FileReader();
      reader.onload = (event) => {
        textarea.value = event.target.result;
        // 自动可视化
        setTimeout(visualizeImage, 100);
      };
      reader.readAsDataURL(file);
    }
  });

  // 支持输入时自动可视化（防抖）
  let visualizeDebounceTimer;
  textarea.addEventListener('input', () => {
    clearTimeout(visualizeDebounceTimer);
    visualizeDebounceTimer = setTimeout(() => {
      const value = textarea.value.trim();
      if (value) {
        visualizeImage();
      } else {
        clearAll();
      }
    }, 400);
  });

  // 支持按 Enter 快速可视化
  textarea.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      visualizeImage();
    }
  });
});
