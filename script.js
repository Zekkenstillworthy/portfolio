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

    // Certificate Carousel Functionality
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselSlides = document.querySelectorAll('.certificate-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const indicators = document.querySelectorAll('.indicator');
    
    if (carouselTrack && carouselSlides.length > 0) {
        let currentSlide = 0;
        const totalSlides = carouselSlides.length; // Now 4 slides instead of 14
        const slidesToShow = 1; // Still show 1 slide at a time (each slide contains 4 certificates)
        const maxSlide = totalSlides - 1; // Allow cycling through all slides

        function updateCarousel() {
            // Use the width of a single slide (including its internal padding) to calculate movement
            const firstSlide = carouselSlides[0];
            const slideWidth = firstSlide.getBoundingClientRect().width; 
            const translateX = -(currentSlide * slideWidth);
            
            carouselTrack.style.transform = `translateX(${translateX}px)`;
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
            
            // Update button states - never disable for continuous loop
            prevBtn.disabled = false;
            nextBtn.disabled = false;
        }

        function goToSlide(slideIndex) {
            // Handle wrap-around for continuous loop
            if (slideIndex >= totalSlides) {
                currentSlide = 0;
            } else if (slideIndex < 0) {
                currentSlide = totalSlides - 1;
            } else {
                currentSlide = slideIndex;
            }
            updateCarousel();
        }

        // Navigation buttons
        prevBtn.addEventListener('click', () => {
            goToSlide(currentSlide - 1);
        });

        nextBtn.addEventListener('click', () => {
            goToSlide(currentSlide + 1);
        });

        // Indicator buttons
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                goToSlide(index);
            });
        });

        // Enhanced Auto-play carousel with continuous loop
        let autoPlayInterval;
        function startAutoPlay() {
            autoPlayInterval = setInterval(() => {
                goToSlide(currentSlide + 1); // Will auto-wrap to 0 when reaching end
            }, 3000); // Reduced to 3 seconds for more dynamic feel
        }

        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        // Pause auto-play on hover
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopAutoPlay);
            carouselContainer.addEventListener('mouseleave', startAutoPlay);
        }

        // Touch/swipe support for mobile
        let startX = 0;
        let isDragging = false;

        carouselTrack.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            stopAutoPlay();
        });

        carouselTrack.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });

        carouselTrack.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            
            if (Math.abs(diffX) > 50) { // Minimum swipe distance
                if (diffX > 0) {
                    goToSlide(currentSlide + 1); // Swipe left - next
                } else {
                    goToSlide(currentSlide - 1); // Swipe right - previous
                }
            }
            
            startAutoPlay();
        });

        // Initialize carousel
        updateCarousel();
        startAutoPlay();

        // Handle window resize
        window.addEventListener('resize', () => {
            updateCarousel();
        });
    }

    // Enhanced certificate preview functionality
    const modal = document.getElementById('certificateModal');
    const modalImage = document.getElementById('certificateImage');
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

    function openCertificateModal(imagePath) {
        // Show modal and loading state
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        modalLoading.style.display = 'flex';
        modalImage.style.display = 'none';
        
        // Update modal title
        const modalTitle = document.querySelector('.modal-title');
        const certificateName = imagePath.split('/').pop().replace(/\.(png|jpg|jpeg)$/i, '').replace(/[-_]/g, ' ');
        modalTitle.textContent = `Certificate Preview - ${certificateName}`;
        
        // Load the image
        const img = new Image();
        img.onload = function() {
            modalImage.src = imagePath;
            modalLoading.style.display = 'none';
            modalImage.style.display = 'block';
            
            // Enable download button and set up event handlers
            modalDownloadBtn.disabled = false;
            modalDownloadBtn.onclick = () => downloadCertificate(imagePath);
            
            // Also add event listener as backup
            modalDownloadBtn.addEventListener('click', function downloadHandler(e) {
                e.preventDefault();
                downloadCertificate(imagePath);
                // Remove this specific event listener after use
                modalDownloadBtn.removeEventListener('click', downloadHandler);
            }, { once: true });
        };
        
        img.onerror = function() {
            modalLoading.style.display = 'none';
            modalImage.style.display = 'none';
            
            // Show error message
            const errorDiv = document.createElement('div');
            errorDiv.className = 'modal-error';
            errorDiv.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
                    <h3 style="color: var(--primary); margin-bottom: 1rem;">Certificate Not Found</h3>
                    <p>The certificate image could not be loaded. It may have been moved or deleted.</p>
                    <p style="margin-top: 0.5rem; font-size: 0.9rem; opacity: 0.7;">Path: ${imagePath}</p>
                </div>
            `;
            
            // Insert error message into modal body
            const modalBody = document.querySelector('.modal-body');
            modalBody.appendChild(errorDiv);
            
            // Disable download button
            modalDownloadBtn.disabled = true;
            modalDownloadBtn.onclick = null;
        };
        
        img.src = imagePath;
    }

    function closeImageModal(){
        modal.style.display = 'none';
        modalImage.src = '';
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
