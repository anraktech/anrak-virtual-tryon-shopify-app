// ANRAK AI Try-On JavaScript
(function() {
  'use strict';

  let currentStream = null;
  let capturedImage = null;

  // Modal control functions
  window.openAnrakTryOnModal = function() {
    const modal = document.getElementById('anrak-try-on-modal');
    if (modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      resetAnrakModal();
    }
  };

  window.closeAnrakTryOnModal = function() {
    const modal = document.getElementById('anrak-try-on-modal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
      stopAnrakCamera();
      resetAnrakModal();
    }
  };

  // File handling
  window.handleAnrakFileSelect = function(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = function(e) {
        capturedImage = e.target.result;
        showAnrakPreview(capturedImage);
      };
      reader.readAsDataURL(file);
    } else {
      showAnrakError('Please select a valid image file.');
    }
  };

  // Camera functions
  window.startAnrakCamera = function() {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
      .then(function(stream) {
        currentStream = stream;
        const video = document.getElementById('anrak-video');
        if (video) {
          video.srcObject = stream;
          showSection('anrak-camera-section');
        }
      })
      .catch(function(error) {
        console.error('Camera access error:', error);
        showAnrakError('Unable to access camera. Please check permissions or upload a photo instead.');
      });
  };

  window.stopAnrakCamera = function() {
    if (currentStream) {
      currentStream.getTracks().forEach(track => track.stop());
      currentStream = null;
    }
    showSection('anrak-upload-section');
  };

  window.captureAnrakPhoto = function() {
    const video = document.getElementById('anrak-video');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);
    
    capturedImage = canvas.toDataURL('image/jpeg', 0.8);
    stopAnrakCamera();
    showAnrakPreview(capturedImage);
  };

  // Preview functions
  function showAnrakPreview(imageDataUrl) {
    const previewImg = document.getElementById('anrak-preview-image');
    if (previewImg) {
      previewImg.src = imageDataUrl;
      showSection('anrak-preview-section');
    }
  }

  // Try-on submission
  window.submitAnrakTryOn = function() {
    if (!capturedImage) {
      showAnrakError('No image selected. Please take or upload a photo.');
      return;
    }

    const container = document.querySelector('.anrak-ai-try-on-container');
    if (!container) {
      showAnrakError('Product information not found.');
      return;
    }

    const productId = container.getAttribute('data-product-id');
    const variantId = container.getAttribute('data-variant-id');

    if (!productId) {
      showAnrakError('Product ID not found.');
      return;
    }

    showSection('anrak-loading-section');

    // Prepare form data
    const formData = new FormData();
    formData.append('shop', window.Shopify.shop);
    formData.append('productId', productId);
    if (variantId) {
      formData.append('variantId', variantId);
    }
    formData.append('userImage', capturedImage);

    // Submit to webhook
    fetch('/apps/anrak-try-on/webhook', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      if (data.success && data.resultImage) {
        showAnrakResult(data.resultImage);
      } else {
        showAnrakError(data.error || 'Failed to generate try-on image.');
      }
    })
    .catch(error => {
      console.error('Try-on submission error:', error);
      showAnrakError('Network error. Please check your connection and try again.');
    });
  };

  // Result functions
  function showAnrakResult(imageUrl) {
    const resultImg = document.getElementById('anrak-result-image');
    if (resultImg) {
      resultImg.src = imageUrl;
      resultImg.onload = function() {
        showSection('anrak-result-section');
      };
      resultImg.onerror = function() {
        showAnrakError('Failed to load result image.');
      };
    }
  }

  window.downloadAnrakResult = function() {
    const resultImg = document.getElementById('anrak-result-image');
    if (resultImg && resultImg.src) {
      const link = document.createElement('a');
      link.href = resultImg.src;
      link.download = 'anrak-try-on-result.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Error handling
  function showAnrakError(message) {
    const errorText = document.getElementById('anrak-error-text');
    if (errorText) {
      errorText.textContent = message;
      showSection('anrak-error-section');
    }
  }

  // Reset modal
  window.resetAnrakModal = function() {
    capturedImage = null;
    const fileInput = document.getElementById('anrak-file-input');
    if (fileInput) {
      fileInput.value = '';
    }
    
    const previewImg = document.getElementById('anrak-preview-image');
    if (previewImg) {
      previewImg.src = '';
    }
    
    const resultImg = document.getElementById('anrak-result-image');
    if (resultImg) {
      resultImg.src = '';
    }
    
    stopAnrakCamera();
    showSection('anrak-upload-section');
  };

  // Section visibility
  function showSection(sectionId) {
    const sections = [
      'anrak-upload-section',
      'anrak-camera-section', 
      'anrak-preview-section',
      'anrak-loading-section',
      'anrak-result-section',
      'anrak-error-section'
    ];
    
    sections.forEach(id => {
      const section = document.getElementById(id);
      if (section) {
        section.style.display = id === sectionId ? 'block' : 'none';
      }
    });
  }

  // Close modal when clicking outside
  document.addEventListener('click', function(event) {
    const modal = document.getElementById('anrak-try-on-modal');
    if (event.target === modal) {
      closeAnrakTryOnModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeAnrakTryOnModal();
    }
  });

})();