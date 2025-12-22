// ========================
// CYBERPUNK PORTFOLIO JS
// ========================

document.addEventListener('DOMContentLoaded', function() {
    // Debug console removed
    
    // Navigation Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Tab Switching Functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

     function sequentialTypewriter() {
        const lines = [
            'I know what I want.',
            'I know what kind of man I need to be.',
            'For you.',
            'For all of us.'
        ];

        const element = document.getElementById('typewriter-text');
        if (!element) return;

        let currentLineIndex = 0;

        function typeAndEraseLine() {
            // If we've reached the end, reset to beginning for continuous loop
            if (currentLineIndex >= lines.length) {
                currentLineIndex = 0;
                // Add a longer pause before restarting the sequence
                setTimeout(typeAndEraseLine, 2000);
                return;
            }

            const text = lines[currentLineIndex];
            let charIndex = 0;
            let isTyping = true;

            // Show typing cursor
            element.classList.add('typing');
            element.innerHTML = '';

            function animateText() {
                if (isTyping) {
                    // Typing phase
                    if (charIndex < text.length) {
                        element.innerHTML += text.charAt(charIndex);
                        charIndex++;
                        setTimeout(animateText, 100); // Typing speed
                    } else {
                        // Finished typing, wait before erasing (always erase for continuous loop)
                        setTimeout(() => {
                            isTyping = false;
                            animateText();
                        }, 1500); // Pause before erasing
                    }
                } else {
                    // Erasing phase
                    if (charIndex > 0) {
                        element.innerHTML = text.substring(0, charIndex - 1);
                        charIndex--;
                        setTimeout(animateText, 50); // Erasing speed (faster)
                    } else {
                        // Finished erasing, move to next line
                        currentLineIndex++;
                        setTimeout(typeAndEraseLine, 300); // Pause between lines
                    }
                }
            }

            animateText();
        }

        // Start the sequential typing
        typeAndEraseLine();
    }

    // Initialize the typewriter effect
    sequentialTypewriter();

    // =========================
    // Certificates (auto-built)
    // =========================
    const CERTIFICATE_FILES = [
        '(Bulk 1) Copy of 2025 CERT_ATTENDANCE-210_signed.png',
        'ANZ.png',
        'Beginning Oracle WebLogic for Administrators.png',
        'Build Your Own NetApp Storage Lab, for Free.png',
        'Cisco LABS Crash Course.png',
        'Configure Juniper SRX Router Using J-Web.png',
        'Cybersecurity for Small and Medium Size Business.png',
        'GILBERT I. REQUITUD JR. Certificate of Attendance.png',
        'How to Think like a Startup with AI-Native Workflows.pdf',
        'Information Technology Specialist in Networking.pdf',
        'Introduction to Dark Web, Anonymity, and Cryptocurrency.png',
        'Introduction to Internet of Things.pdf',
        'Introduction to SAN and NAS Storage.png',
        'Introduction_to_Cybersecurity.png',
        'Learn Python 3 with Turtle.png',
        'MasterCard.png',
        'Network Support and Security.pdf',
        'Python for Absolute Beginners.png',
        'Quick Start Guide to Oracle SOA 12c.png',
        'Scrum A Concise Introduction.png',
        'Security-Governance-AI-Governance-Certification-Securiti-Education.png',
        'SQL Injection Attacks.png',
        'Telstra.png'
    ];

    function humanizeCertificateName(filename) {
        const withoutExt = filename.replace(/\.(png|jpe?g|pdf)$/i, '');
        return withoutExt
            .replace(/^\(Bulk\s*\d+\)\s*Copy\s*of\s*/i, '')
            .replace(/[_-]+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function pickCertificateIcon(filename) {
        const lower = filename.toLowerCase();
        if (lower.endsWith('.pdf')) return '📄';
        if (lower.includes('cisco')) return '🔧';
        if (lower.includes('juniper')) return '🌐';
        if (lower.includes('oracle')) return '🟣';
        if (lower.includes('netapp') || lower.includes('storage') || lower.includes('san') || lower.includes('nas')) return '💾';
        if (lower.includes('python')) return '🐍';
        if (lower.includes('sql')) return '⚡';
        if (lower.includes('dark web') || lower.includes('anonymity') || lower.includes('cryptocurrency')) return '🕶️';
        if (lower.includes('iot')) return '📡';
        if (lower.includes('scrum')) return '🧭';
        if (lower.includes('governance') || lower.includes('ai')) return '🤖';
        if (lower.includes('mastercard')) return '💳';
        if (lower.includes('anz')) return '🏦';
        if (lower.includes('telstra')) return '📶';
        if (lower.includes('cyber') || lower.includes('security')) return '🔐';
        return '🎓';
    }

    function isPdf(path) {
        return /\.pdf$/i.test(path);
    }

    function buildCertificateCard({ path, title, org, year, icon }) {
        const safeTitle = title || 'Certificate';
        const safeOrg = org || 'Professional Development';
        const safeYear = year || '2025';

        const thumbnailHtml = isPdf(path)
            ? `
                <div class="cert-pdf-thumb" aria-label="PDF certificate thumbnail">
                    <div class="cert-pdf-badge">PDF</div>
                    <div class="cert-pdf-name">${safeTitle}</div>
                </div>
              `
            : `
                <img src="${path}" alt="${safeTitle}" class="cert-thumb" loading="lazy">
              `;

        return `
            <div class="certificate-card">
                <div class="certificate-thumbnail" role="button" tabindex="0" aria-label="Preview ${safeTitle}">
                    ${thumbnailHtml}
                    <div class="certificate-icon">${icon}</div>
                </div>
                <div class="certificate-details">
                    <h3 class="certificate-title">${safeTitle}</h3>
                    <p class="certificate-org">${safeOrg}</p>
                    <p class="certificate-date">${safeYear}</p>
                    <div class="certificate-actions">
                        <a href="#" class="certificate-preview certificate-link" data-cert="${path}">PREVIEW</a>
                        <a href="${path}" class="certificate-link" target="_blank">DOWNLOAD</a>
                    </div>
                </div>
            </div>
        `;
    }

    function buildCertificateSlides() {
        const carouselTrack = document.querySelector('.carousel-track');
        const indicatorsContainer = document.querySelector('.carousel-indicators');
        if (!carouselTrack || !indicatorsContainer) return;

        const certificates = CERTIFICATE_FILES
            .map((file) => {
                const path = `certificates/${file}`;
                return {
                    path,
                    title: humanizeCertificateName(file),
                    org: 'Professional Development',
                    year: '2025',
                    icon: pickCertificateIcon(file)
                };
            });

        const CARDS_PER_SLIDE = 2;
        const totalSlides = Math.max(1, Math.ceil(certificates.length / CARDS_PER_SLIDE));

        // Build slides
        let slidesHtml = '';
        for (let i = 0; i < totalSlides; i++) {
            const startIndex = i * CARDS_PER_SLIDE;
            const slice = certificates.slice(startIndex, startIndex + CARDS_PER_SLIDE);
            slidesHtml += `<div class="certificate-slide">${slice.map(buildCertificateCard).join('')}</div>`;
        }
        carouselTrack.innerHTML = slidesHtml;

        // Build indicators
        indicatorsContainer.innerHTML = Array.from({ length: totalSlides })
            .map((_, index) => `<button class="indicator ${index === 0 ? 'active' : ''}" data-slide="${index}" aria-label="Go to slide ${index + 1}"></button>`)
            .join('');

        return { totalSlides };
    }

    const carouselSetup = buildCertificateSlides();

    // Certificate Carousel Functionality (after slides are generated)
    const carouselTrack = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    if (carouselTrack && carouselSetup?.totalSlides) {
        let currentSlide = 0;
        const totalSlides = carouselSetup.totalSlides;

        function updateCarousel() {
            carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

            document.querySelectorAll('.indicator').forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
        }

        function goToSlide(slideIndex) {
            if (slideIndex >= totalSlides) {
                currentSlide = 0;
            } else if (slideIndex < 0) {
                currentSlide = totalSlides - 1;
            } else {
                currentSlide = slideIndex;
            }
            updateCarousel();
        }

        prevBtn?.addEventListener('click', () => goToSlide(currentSlide - 1));
        nextBtn?.addEventListener('click', () => goToSlide(currentSlide + 1));

        document.querySelectorAll('.indicator').forEach((indicator) => {
            indicator.addEventListener('click', () => {
                const index = Number(indicator.getAttribute('data-slide') || '0');
                goToSlide(index);
            });
        });

        // Auto-play
        let autoPlayInterval;
        function startAutoPlay() {
            autoPlayInterval = setInterval(() => goToSlide(currentSlide + 1), 3500);
        }
        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        const carouselContainer = document.querySelector('.carousel-container');
        carouselContainer?.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer?.addEventListener('mouseleave', startAutoPlay);

        // Touch/swipe support
        let startX = 0;
        let isDragging = false;

        carouselTrack.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            stopAutoPlay();
        }, { passive: true });

        carouselTrack.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;

            if (Math.abs(diffX) > 50) {
                if (diffX > 0) goToSlide(currentSlide + 1);
                else goToSlide(currentSlide - 1);
            }
            startAutoPlay();
        });

        // Re-sync transform on resize (percent-based, but still good to reapply)
        window.addEventListener('resize', () => updateCarousel());

        updateCarousel();
        startAutoPlay();
    }

    // Enhanced certificate preview functionality
    const modal = document.getElementById('certificateModal');
    const modalImage = document.getElementById('certificateImage');
    const modalPdf = document.getElementById('certificatePdf');
    const modalPdfViewer = document.getElementById('certificatePdfViewer');
    const modalLoading = document.querySelector('.modal-loading');
    const modalDownloadBtn = document.getElementById('modalDownload');
    const modalCloseButtons = document.querySelectorAll('.modal-close, .modal-close-btn');
    
    // Debug: Check if all modal elements exist
    console.log('Modal elements check:', {
        modal: !!modal,
        modalImage: !!modalImage,
        modalLoading: !!modalLoading,
        modalDownloadBtn: !!modalDownloadBtn,
        modalCloseButtons: modalCloseButtons.length
    });
    
    let currentCertificatePath = '';
    let pdfjsReadyPromise = null;
    let currentPdfRenderToken = 0;

    // Handle certificate preview clicks
    document.addEventListener('click', e => {
        if(e.target.classList.contains('certificate-preview')){
            e.preventDefault();
            const path = e.target.getAttribute('data-cert');
            if(!path) return;
            
            console.log('Preview clicked for:', path);
            currentCertificatePath = path;
            openCertificateModal(path);
        }
    });

    function openCertificateModal(assetPath) {
        // Show modal and loading state
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        modalLoading.style.display = 'flex';
        modalImage.style.display = 'none';
        if (modalPdfViewer) {
            modalPdfViewer.style.display = 'none';
            modalPdfViewer.innerHTML = '';
        }
        if (modalPdf) {
            modalPdf.style.display = 'none';
            modalPdf.src = '';
        }
        
        // Update modal title
        const modalTitle = document.querySelector('.modal-title');
        const certificateName = assetPath.split('/').pop().replace(/\.(png|jpg|jpeg|pdf)$/i, '').replace(/[-_]/g, ' ');
        modalTitle.textContent = `Certificate Preview - ${certificateName}`;

        const isPdfAsset = /\.pdf$/i.test(assetPath);

        // Enable download button immediately (preview may still fail)
        modalDownloadBtn.disabled = false;
        modalDownloadBtn.onclick = () => downloadCertificate(assetPath);

        // Clear any previous error
        const existingError = document.querySelector('.modal-error');
        if (existingError) existingError.remove();

        if (isPdfAsset) {
            // PDF preview (render pages with PDF.js)
            renderPdfInModal(assetPath);
            return;
        }

        // Image preview
        const img = new Image();
        img.onload = function() {
            modalImage.src = assetPath;
            modalLoading.style.display = 'none';
            modalImage.style.display = 'block';
        };

        img.onerror = function() {
            modalLoading.style.display = 'none';
            modalImage.style.display = 'none';
            if (modalPdf) modalPdf.style.display = 'none';

            const errorDiv = document.createElement('div');
            errorDiv.className = 'modal-error';
            errorDiv.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
                    <h3 style="color: var(--primary); margin-bottom: 1rem;">Preview Failed</h3>
                    <p>The certificate could not be loaded. It may have been moved or deleted.</p>
                    <p style="margin-top: 0.5rem; font-size: 0.9rem; opacity: 0.7;">Path: ${assetPath}</p>
                </div>
            `;

            const modalBody = document.querySelector('.modal-body');
            modalBody.appendChild(errorDiv);
        };

        img.src = assetPath;
    }

    function ensurePdfJsReady() {
        if (pdfjsReadyPromise) return pdfjsReadyPromise;

        pdfjsReadyPromise = new Promise((resolve, reject) => {
            if (window.pdfjsLib) {
                resolve(window.pdfjsLib);
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
            script.async = true;
            script.onload = () => {
                if (!window.pdfjsLib) {
                    reject(new Error('PDF.js loaded but pdfjsLib is missing'));
                    return;
                }

                // Configure worker
                window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
                resolve(window.pdfjsLib);
            };
            script.onerror = () => reject(new Error('Failed to load PDF.js from CDN'));
            document.head.appendChild(script);
        });

        return pdfjsReadyPromise;
    }

    async function renderPdfInModal(pdfPath) {
        const token = ++currentPdfRenderToken;

        // Reset any previous UI
        if (modalPdfViewer) {
            modalPdfViewer.innerHTML = '';
            modalPdfViewer.style.display = 'block';
        }
        if (modalPdf) {
            modalPdf.style.display = 'none';
            modalPdf.src = '';
        }
        modalImage.style.display = 'none';
        modalLoading.style.display = 'flex';

        // Clear any previous error messages
        const existingError = document.querySelector('.modal-error');
        if (existingError) existingError.remove();

        try {
            const pdfjsLib = await ensurePdfJsReady();
            if (token !== currentPdfRenderToken) return;

            // Loading from file:// can be blocked in some browsers. We'll try PDF.js first.
            const loadingTask = pdfjsLib.getDocument({ url: pdfPath });
            const pdf = await loadingTask.promise;
            if (token !== currentPdfRenderToken) {
                try { loadingTask.destroy(); } catch (_) {}
                return;
            }

            modalLoading.style.display = 'none';

            const container = modalPdfViewer;
            if (!container) return;

            // Render all pages
            const containerWidth = Math.max(320, container.clientWidth || 900);

            for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
                if (token !== currentPdfRenderToken) return;

                const page = await pdf.getPage(pageNumber);
                const unscaledViewport = page.getViewport({ scale: 1 });
                const scale = Math.min(2.0, (containerWidth - 24) / unscaledViewport.width);
                const viewport = page.getViewport({ scale });

                const pageWrap = document.createElement('div');
                pageWrap.className = 'pdf-page';

                const label = document.createElement('div');
                label.className = 'pdf-page-label';
                label.textContent = `Page ${pageNumber} / ${pdf.numPages}`;

                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d', { alpha: false });
                canvas.width = Math.floor(viewport.width);
                canvas.height = Math.floor(viewport.height);
                canvas.className = 'pdf-canvas';

                pageWrap.appendChild(label);
                pageWrap.appendChild(canvas);
                container.appendChild(pageWrap);

                await page.render({ canvasContext: ctx, viewport }).promise;
            }

            // Best-effort cleanup
            try { pdf.cleanup(); } catch (_) {}
        } catch (error) {
            // Fallback: iframe (browser's built-in PDF viewer)
            console.warn('PDF.js render failed, falling back to iframe viewer:', error);
            modalLoading.style.display = 'none';

            if (modalPdfViewer) {
                modalPdfViewer.style.display = 'none';
                modalPdfViewer.innerHTML = '';
            }

            if (modalPdf) {
                modalPdf.src = `${pdfPath}#toolbar=1&navpanes=0&view=FitH`;
                modalPdf.style.display = 'block';
                return;
            }

            // If no iframe either, show a helpful error
            const errorDiv = document.createElement('div');
            errorDiv.className = 'modal-error';
            errorDiv.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
                    <h3 style="color: var(--primary); margin-bottom: 1rem;">PDF Preview Blocked</h3>
                    <p>Your browser may block PDF rendering when opened as a local file.</p>
                    <p style="margin-top: 0.75rem; opacity: 0.9;">Tip: run a local server (VS Code Live Server) then open the site via <b>http://localhost</b>.</p>
                </div>
            `;
            const modalBody = document.querySelector('.modal-body');
            modalBody.appendChild(errorDiv);
        }
    }

    function closeImageModal(){
        // Cancel any in-progress PDF render
        currentPdfRenderToken++;

        modal.style.display = 'none';
        modalImage.src = '';
        if (modalPdf) modalPdf.src = '';
        if (modalPdfViewer) modalPdfViewer.innerHTML = '';
        document.body.style.overflow = 'auto';
        currentCertificatePath = '';
        
        // Clear any error messages
        const errorDiv = document.querySelector('.modal-error');
        if (errorDiv) {
            errorDiv.remove();
        }
        
        // Reset loading state
        modalLoading.style.display = 'none';
        modalImage.style.display = 'none';
        if (modalPdf) modalPdf.style.display = 'none';
        if (modalPdfViewer) modalPdfViewer.style.display = 'none';
        modalDownloadBtn.disabled = true;
        modalDownloadBtn.onclick = null;
    }

    // Download certificate function
    function downloadCertificate(imagePath) {
        if (!imagePath) {
            console.error('No image path provided for download');
            return;
        }
        
        const filename = imagePath.split('/').pop();
        console.log('Attempting to download:', filename, 'from path:', imagePath);
        
        // Add download animation to button
        const originalText = modalDownloadBtn.textContent;
        modalDownloadBtn.textContent = 'Downloading...';
        modalDownloadBtn.disabled = true;
        
        // Method 1: Try fetch and blob download (more reliable)
        fetch(imagePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.blob();
            })
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = filename;
                link.style.display = 'none';
                
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Clean up the blob URL
                window.URL.revokeObjectURL(url);
                
                // Show notification
                showDownloadNotification(filename);
                console.log('Download completed successfully:', filename);
            })
            .catch(error => {
                console.error('Fetch download failed, trying direct link method:', error);
                
                // Method 2: Fallback to direct link download
                const link = document.createElement('a');
                link.href = imagePath;
                link.download = filename;
                link.target = '_blank';
                link.style.display = 'none';
                
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Show notification
                showDownloadNotification(filename);
                console.log('Fallback download triggered:', filename);
            })
            .finally(() => {
                // Reset button after short delay
                setTimeout(() => {
                    modalDownloadBtn.textContent = originalText;
                    modalDownloadBtn.disabled = false;
                }, 1000);
            });
    }

    // Modal close event handlers with enhanced keyboard support
    modalCloseButtons.forEach(btn => btn.addEventListener('click', closeImageModal));
    window.addEventListener('click', e => { if(e.target === modal) closeImageModal(); });
    document.addEventListener('keydown', e => { 
        if(e.key === 'Escape' && modal.style.display === 'block') closeImageModal();
        
        // Add keyboard navigation for modal
        if(modal.style.display === 'block') {
            if(e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                e.preventDefault();
                // Could implement next/previous certificate navigation here
            }
            if(e.key === 'Enter' && e.target === modalDownloadBtn) {
                e.preventDefault();
                if(currentCertificatePath) downloadCertificate(currentCertificatePath);
            }
        }
    });

    // Initialize modal download button with direct event listener
    if (modalDownloadBtn) {
        modalDownloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Modal download button clicked, current path:', currentCertificatePath);
            if (currentCertificatePath) {
                downloadCertificate(currentCertificatePath);
            } else {
                console.warn('No certificate path available for download');
            }
        });
    }

    // Add success notification for downloads
    function showDownloadNotification(filename) {
        console.log('Showing download notification for:', filename);
        
        // Remove any existing notifications
        const existingNotification = document.querySelector('.download-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = 'download-notification';
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--gradient-primary);
                color: var(--text-light);
                padding: var(--space-lg);
                border-radius: var(--radius-lg);
                box-shadow: var(--shadow-glow), var(--shadow-xl);
                z-index: 3000;
                display: flex;
                align-items: center;
                gap: var(--space-sm);
                min-width: 250px;
                animation: slideInRight 0.3s ease-out;
            ">
                <span style="font-size: 1.2rem;">✅</span>
                <div>
                    <div style="font-weight: 600;">Download Started</div>
                    <div style="font-size: 0.85rem; opacity: 0.9;">${filename}</div>
                </div>
            </div>
        `;

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 3000);
    }

    // Test download functionality on page load
    console.log('Certificate download functionality initialized');
    
    // Add a test function to the global scope for debugging
    window.testDownload = function(path) {
        console.log('Testing download for path:', path);
        downloadCertificate(path || 'certificates/Cybersecurity for Small and Medium Size Business.png');
    };

    // Add CSS animations for notifications
    if (!document.querySelector('#download-animations')) {
        const style = document.createElement('style');
        style.id = 'download-animations';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Handle certificate thumbnail clicks for preview
    document.addEventListener('click', e => {
        if(e.target.classList.contains('cert-thumb') || e.target.closest('.certificate-thumbnail')){
            e.preventDefault();
            
            // Find the preview link in the same certificate card
            const certificateCard = e.target.closest('.certificate-card');
            if (!certificateCard) return;
            
            const previewLink = certificateCard.querySelector('.certificate-preview');
            if (!previewLink) return;
            
            const path = previewLink.getAttribute('data-cert');
            if (!path) return;
            
            currentCertificatePath = path;
            openCertificateModal(path);
        }
    });

    // Handle direct download links on certificate cards
    document.addEventListener('click', e => {
        if(e.target.classList.contains('certificate-link') && !e.target.classList.contains('certificate-preview')){
            e.preventDefault();
            const downloadPath = e.target.getAttribute('href');
            if(!downloadPath) return;
            
            const filename = downloadPath.split('/').pop();
            console.log('Direct download triggered for:', filename);
            
            // Add visual feedback
            const originalText = e.target.textContent;
            e.target.textContent = 'DOWNLOADING...';
            e.target.style.opacity = '0.7';
            e.target.style.pointerEvents = 'none';
            
            // Method 1: Try fetch and blob download
            fetch(downloadPath)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.blob();
                })
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = filename;
                    link.style.display = 'none';
                    
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    // Clean up
                    window.URL.revokeObjectURL(url);
                    
                    // Show notification
                    showDownloadNotification(filename);
                    console.log('Direct download completed:', filename);
                })
                .catch(error => {
                    console.error('Direct fetch download failed, trying fallback:', error);
                    
                    // Method 2: Fallback to direct link
                    const link = document.createElement('a');
                    link.href = downloadPath;
                    link.download = filename;
                    link.target = '_blank';
                    link.style.display = 'none';
                    
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    // Show notification
                    showDownloadNotification(filename);
                    console.log('Direct fallback download triggered:', filename);
                })
                .finally(() => {
                    // Reset button after delay
                    setTimeout(() => {
                        e.target.textContent = originalText;
                        e.target.style.opacity = '1';
                        e.target.style.pointerEvents = 'auto';
                    }, 1000);
                });
        }
    });

    // Removed all PDF viewing logic

    // Enhanced certificate card hover effects
    document.querySelectorAll('.certificate-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2), 0 0 20px rgba(214, 174, 47, 0.1)';
            
            const thumbnail = this.querySelector('.certificate-thumbnail');
            if (thumbnail) {
                thumbnail.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                thumbnail.style.transform = 'scale(1.05)';
                thumbnail.style.filter = 'brightness(1.1) contrast(1.1)';
            }
            
            const icon = this.querySelector('.certificate-icon');
            if (icon) {
                icon.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.filter = 'drop-shadow(0 0 10px var(--primary))';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            
            const thumbnail = this.querySelector('.certificate-thumbnail');
            if (thumbnail) {
                thumbnail.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                thumbnail.style.transform = 'scale(1)';
                thumbnail.style.filter = 'brightness(1) contrast(1)';
            }
            
            const icon = this.querySelector('.certificate-icon');
            if (icon) {
                icon.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.filter = 'none';
            }
        });
    });
    
    // Add glitch effect to preview links
    document.querySelectorAll('.certificate-preview').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.animation = 'glitch-1 0.3s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        });
    });

    // PDF thumbnail / loader code removed

    // ----- Project placeholder image fallback -----
    document.querySelectorAll('.project-card img').forEach(img => {
        img.addEventListener('error', function(){
            const svg = encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='400' height='250'><rect width='100%' height='100%' fill='%2325262E'/><text x='50%' y='50%' fill='%23F6A652' font-family='Inter' font-size='20' dominant-baseline='middle' text-anchor='middle'>IMAGE UNAVAILABLE</text></svg>`);
            this.src = 'data:image/svg+xml,' + svg;
            this.style.objectFit = 'cover';
            console.warn('[Image] Replaced broken project image with fallback');
        }, { once:true });
    });

    // Simplified thumbnail click handled by certificate-preview links only

    // Floating Input Labels
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value !== '') {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
    });

    // Web3forms Contact Form Handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.querySelector('span').textContent;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.querySelector('span').textContent = 'Sending...';
            submitBtn.style.opacity = '0.7';
            
            try {
                const formData = new FormData(this);
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (result.success) {
                    // Success feedback
                    submitBtn.querySelector('span').textContent = 'Message Sent!';
                    submitBtn.style.background = 'var(--success-color, #4CAF50)';
                    
                    // Reset form
                    this.reset();
                    formInputs.forEach(input => input.classList.remove('has-value'));
                    
                    // Show success message
                    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                    
                } else {
                    throw new Error('Form submission failed');
                }
                
            } catch (error) {
                console.error('Form submission error:', error);
                submitBtn.querySelector('span').textContent = 'Error - Try Again';
                submitBtn.style.background = 'var(--error-color, #f44336)';
                showNotification('Failed to send message. Please try again.', 'error');
            }
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.querySelector('span').textContent = originalText;
                submitBtn.style.opacity = '1';
                submitBtn.style.background = '';
            }, 3000);
        });
    }

    // Notification system for form feedback
    function showNotification(message, type = 'info') {
        // Remove any existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
                <span class="notification-message">${message}</span>
                <button class="notification-close">×</button>
            </div>
        `;

        // Add styles for notification
        const notificationStyles = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--surface-color, #2A2D3A);
                border: 1px solid var(--primary);
                border-radius: var(--radius-lg);
                padding: var(--space-lg);
                box-shadow: var(--shadow-xl);
                z-index: 10000;
                animation: slideInRight 0.3s ease-out;
                max-width: 400px;
            }
            
            .notification-success {
                border-color: #4CAF50;
                background: rgba(76, 175, 80, 0.1);
            }
            
            .notification-error {
                border-color: #f44336;
                background: rgba(244, 67, 54, 0.1);
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: var(--space-md);
                color: var(--text-primary);
            }
            
            .notification-close {
                background: none;
                border: none;
                color: var(--text-secondary);
                cursor: pointer;
                font-size: 1.2rem;
                margin-left: auto;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .notification-close:hover {
                color: var(--text-primary);
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;

        // Add styles to head if not already present
        if (!document.querySelector('#notification-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'notification-styles';
            styleElement.textContent = notificationStyles;
            document.head.appendChild(styleElement);
        }

        document.body.appendChild(notification);

        // Close notification on click
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => notification.remove(), 300);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideInRight 0.3s ease-out reverse';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Neon Cursor Effect
    function createNeonCursor() {
        const cursor = document.createElement('div');
        cursor.classList.add('neon-cursor');
        document.body.appendChild(cursor);

        const cursorStyle = document.createElement('style');
        cursorStyle.textContent = `
            .neon-cursor {
                position: fixed;
                width: 20px;
                height: 20px;
                border: 2px solid var(--neon-blue);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transition: all 0.1s ease;
                box-shadow: 0 0 20px var(--neon-blue);
                opacity: 0;
            }
            
            .neon-cursor.active {
                opacity: 1;
            }
            
            .neon-cursor.clicking {
                transform: scale(0.8);
                border-color: var(--neon-pink);
                box-shadow: 0 0 30px var(--neon-pink);
            }
        `;
        document.head.appendChild(cursorStyle);

        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
            cursor.classList.add('active');
        });

        document.addEventListener('mousedown', function() {
            cursor.classList.add('clicking');
        });

        document.addEventListener('mouseup', function() {
            cursor.classList.remove('clicking');
        });

        document.addEventListener('mouseleave', function() {
            cursor.classList.remove('active');
        });
    }

    // Initialize neon cursor (only on desktop)
    if (window.innerWidth > 768) {
        createNeonCursor();
    }

    // CTA Button Click Effect
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Scroll to about section
            document.querySelector('#about').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Enhanced Project Card Hover Effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        // Create overlay if it doesn't exist
        let overlay = card.querySelector('.project-overlay');
        
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            this.style.transform = 'translateY(-10px) scale(1.02) rotateX(5deg)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.4), 0 0 30px rgba(214, 174, 47, 0.3)';
            
            const img = this.querySelector('img');
            if (img) {
                img.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                img.style.transform = 'scale(1.1)';
                img.style.filter = 'brightness(0.7) contrast(1.2) saturate(1.3)';
            }
            
            if (overlay) {
                overlay.style.opacity = '1';
                overlay.style.transform = 'translateY(0)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            this.style.transform = 'translateY(0) scale(1) rotateX(0)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            
            const img = this.querySelector('img');
            if (img) {
                img.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                img.style.transform = 'scale(1)';
                img.style.filter = 'brightness(1) contrast(1) saturate(1)';
            }
            
            if (overlay) {
                overlay.style.opacity = '0';
                overlay.style.transform = 'translateY(20px)';
            }
        });
        
        // Add click ripple effect
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(214, 174, 47, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 1;
            `;
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });

    // Loading Animation
    window.addEventListener('load', function() {
        document.body.classList.add('loading');
        
        // Stagger animation for sections
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.classList.add('fade-in-up');
            }, index * 200);
        });
    });

    // Easter Egg: Konami Code
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    let userInput = [];

    document.addEventListener('keydown', function(e) {
        userInput.push(e.code);
        
        if (userInput.length > konamiCode.length) {
            userInput.shift();
        }
        
        if (userInput.join('') === konamiCode.join('')) {
            activateMatrixMode();
            userInput = [];
        }
    });

    function activateMatrixMode() {
        document.body.style.filter = 'hue-rotate(120deg) contrast(150%)';
        
        // Add extra glitch effects
        const glitchStyle = document.createElement('style');
        glitchStyle.textContent = `
            .matrix-mode .glitch::before,
            .matrix-mode .glitch::after {
                animation-duration: 0.1s;
            }
        `;
        document.head.appendChild(glitchStyle);
        document.body.classList.add('matrix-mode');
        
        setTimeout(() => {
            document.body.style.filter = '';
            document.body.classList.remove('matrix-mode');
            glitchStyle.remove();
        }, 5000);
    }

    // Performance optimization: Throttle scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Apply throttling to scroll events
    window.addEventListener('scroll', throttle(function() {
        // Scroll-based animations here
    }, 16)); // ~60fps

    console.log('🚀 Cyberpunk Portfolio System Online 🚀');
    console.log('💻 Welcome to the Matrix, Developer! 💻');
    console.log('🔮 Try the Konami Code for a surprise... 🔮');
});

// Global utility functions
window.portfolioUtils = {
    // Add glitch effect to any element
    addGlitch: function(element, duration = 500) {
        element.classList.add('glitch-active');
        setTimeout(() => {
            element.classList.remove('glitch-active');
        }, duration);
    },
    
    // Change theme colors
    changeTheme: function(primary, secondary) {
        document.documentElement.style.setProperty('--neon-pink', primary);
        document.documentElement.style.setProperty('--neon-blue', secondary);
    },
    
    // Create neon text effect
    neonText: function(text, color = 'var(--neon-pink)') {
        const span = document.createElement('span');
        span.textContent = text;
        span.style.color = color;
        span.style.textShadow = `0 0 10px ${color}`;
        span.style.animation = 'neonPulse 2s ease-in-out infinite alternate';
        return span;
    }
};
