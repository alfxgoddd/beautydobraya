// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const header = document.getElementById('header');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

class AppearingHeader {
    constructor() {
        this.header = document.getElementById('header');
        this.lastScrollY = window.scrollY;
        this.showThreshold = 50; // Через сколько px прокрутки показать
        this.hideThreshold = 300;  // Когда скрыть обратно
        this.ticking = false;
        
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => this.onScroll());
    }
    
    onScroll() {
        if (!this.ticking) {
            requestAnimationFrame(() => this.update());
            this.ticking = true;
        }
    }
    
    update() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > this.showThreshold) {
            // Прокрутили достаточно - показываем хедер
            this.show();
        } else if (currentScrollY <= this.hideThreshold) {
            // Вернулись близко к верху - скрываем хедер
            this.hide();
        }
        
        this.lastScrollY = currentScrollY;
        this.ticking = false;
    }
    
    show() {
        this.header.classList.add('visible');
    }
    
    hide() {
        this.header.classList.remove('visible');
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    new AppearingHeader();
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Header background on scroll
//window.addEventListener('scroll', () => {
  //  if (window.scrollY > 100) {
    //    header.style.background = 'rgba(255, 255, 255, 0.98)';
      //  header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    //} else {
      //  header.style.background = 'rgba(255, 255, 255, 0.95)';
        //header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    //}
//});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .pricing-category, .about-text, .contact-info');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animation
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.service-card, .pricing-category, .about-text, .contact-info');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Trigger animation on load for elements in viewport
    setTimeout(animateOnScroll, 100);
});

// Add scroll event listener
window.addEventListener('scroll', animateOnScroll);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroBg = document.querySelector('.hero-bg');
    
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Form submission handling (if forms are added in the future)
document.addEventListener('DOMContentLoaded', () => {
    // This would handle form submissions if contact forms were added
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Form submission logic would go here
            alert('Форма отправлена! Мы свяжемся с вами в ближайшее время.');
            this.reset();
        });
    });
});

// Initialize any third-party integrations
document.addEventListener('DOMContentLoaded', () => {
    // This would initialize any maps, booking widgets, etc.
    console.log('Сайт студии "Добрая" загружен');
});

// Инициализация Яндекс.Карты
function initMap() {
    if (typeof ymaps !== 'undefined') {
        ymaps.ready(function() {
            // Координаты студии в Севастополе
            var studioCoordinates = [44.578318, 33.504339];
            
            var myMap = new ymaps.Map('map-yandex', {
                center: studioCoordinates,
                zoom: 16,
                controls: ['zoomControl', 'fullscreenControl']
            });
            
            var myPlacemark = new ymaps.Placemark(studioCoordinates, {
                hintContent: 'Студия"Добрая"',
                balloonContent: `
                    <div style="padding: 10px; max-width: 250px; font-family: 'Inter', sans-serif;">
                        <h3 style="margin: 0 0 8px 0; color: #833939ff; font-family: 'Playfair Display', serif;">Студия "Добрая"</h3>
                        <p style="margin: 0 0 5px 0;">г. Севастополь, ул. Токарева, 18Д, корп. 1</p>
                        <p style="margin: 0 0 5px 0;">Телефон: +7 (978) 778-96-83</p>
                        <p style="margin: 0 0 5px 0;">WhatsApp: +7 (979) 078-25-15</p>
                        <p style="margin: 0 0 10px 0;">Часы работы: 10:00 - 20:00</p>
                        <a href="https://dikidi.net/624247?p=0.pi" target="_blank" 
                           style="display: inline-block; background: #83c27aff; color: white; padding: 8px 15px; 
                                  text-decoration: none; border-radius: 20px; font-weight: 600;">
                            Записаться онлайн
                        </a>
                    </div>
                `
            }, {
                iconLayout: 'default#image',
                iconImageHref: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
                    <svg width="40" height="50" viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 0C12.268 0 6 6.26801 6 14C6 24.5 20 50 20 50C20 50 34 24.5 34 14C34 6.26801 27.732 0 20 0Z" fill="#e8a3a3"/>
                        <path d="M20 20C23.3137 20 26 17.3137 26 14C26 10.6863 23.3137 8 20 8C16.6863 8 14 10.6863 14 14C14 17.3137 16.6863 20 20 20Z" fill="white"/>
                    </svg>
                `),
                iconImageSize: [40, 50],
                iconImageOffset: [-20, -50]
            });
            
            myMap.geoObjects.add(myPlacemark);
            
            // Открываем балун при загрузке
            myPlacemark.balloon.open();
        });
    }
}

// Добавьте вызов функции после загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    initMap();
});
// Дополнительные эффекты для кнопок социальных сетей
document.addEventListener('DOMContentLoaded', function() {
    const socialButtons = document.querySelectorAll('.social-btn');
    
    // Анимация появления кнопок
    socialButtons.forEach((button, index) => {
        // Начальное состояние для анимации
        button.style.opacity = '0';
        button.style.transform = 'translateY(20px)';
        
        // Запуск анимации с задержкой для каждой кнопки
        setTimeout(() => {
            button.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        }, 200 * index);
    });
    
    // Трекинг кликов по кнопкам (опционально, для аналитики)
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const platform = this.classList[1].replace('-btn', '');
            
            // Можно добавить отправку данных в аналитику
            console.log(`Клик по кнопке ${platform}`);
            
            // Или использовать Google Analytics
            // gtag('event', 'social_click', {
            //     'event_category': 'social',
            //     'event_label': platform
            // });
        });
    });
    
    // Эффект пульсации при наведении
    socialButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.5s ease';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    });
});

// Добавление CSS анимации пульсации
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Галерея с листанием фотографий
class Gallery {
    constructor() {
        this.currentIndex = 0;
        this.slides = document.querySelectorAll('.gallery-slide');
        this.thumbnails = document.querySelectorAll('.thumbnail');
        this.prevBtn = document.querySelector('.gallery-nav.prev');
        this.nextBtn = document.querySelector('.gallery-nav.next');
        this.currentSlideEl = document.querySelector('.current-slide');
        this.totalSlidesEl = document.querySelector('.total-slides');
        
        this.totalSlides = this.slides.length;
        this.init();
    }
    
    init() {
        // Устанавливаем общее количество слайдов
        this.totalSlidesEl.textContent = this.totalSlides;
        
        // Добавляем обработчики событий
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Обработчики для миниатюр
        this.thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                const index = parseInt(thumb.getAttribute('data-index'));
                this.goToSlide(index);
            });
        });
        
        // Обработчики клавиатуры
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
        
        // Обработчики свайпа для мобильных устройств
        this.setupSwipe();
        
        // Автопрокрутка (опционально)
        // this.startAutoPlay();
    }
    
    goToSlide(index) {
        // Скрываем текущий слайд
        this.slides[this.currentIndex].classList.remove('active');
        this.thumbnails[this.currentIndex].classList.remove('active');
        
        // Обновляем индекс
        this.currentIndex = index;
        
        // Показываем новый слайд
        this.slides[this.currentIndex].classList.add('active');
        this.thumbnails[this.currentIndex].classList.add('active');
        
        // Обновляем счетчик
        this.currentSlideEl.textContent = this.currentIndex + 1;
    }
    
    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.totalSlides;
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(prevIndex);
    }
    
    handleKeydown(e) {
        if (e.key === 'ArrowLeft') {
            this.prevSlide();
        } else if (e.key === 'ArrowRight') {
            this.nextSlide();
        }
    }
    
    setupSwipe() {
        const galleryMain = document.querySelector('.gallery-main');
        let startX = 0;
        let endX = 0;
        
        galleryMain.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });
        
        galleryMain.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe(startX, endX);
        }, { passive: true });
        
        // Для десктопов с помощью мыши
        galleryMain.addEventListener('mousedown', (e) => {
            startX = e.clientX;
            document.addEventListener('mouseup', handleMouseUp);
        });
        
        const handleMouseUp = (e) => {
            endX = e.clientX;
            this.handleSwipe(startX, endX);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }
    
    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
    }
    
    startAutoPlay() {
        setInterval(() => {
            this.nextSlide();
        }, 5000); // Меняем слайд каждые 5 секунд
    }
}

// Инициализация галереи после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    new Gallery();
});

// Видео плеер с кастомными контролами
class VideoPlayer {
    constructor() {
        this.video = document.querySelector('.custom-video');
        this.poster = document.querySelector('.video-poster');
        this.playPauseBtn = document.querySelector('.play-pause');
        this.progressBar = document.querySelector('.progress-bar');
        this.progressHandle = document.querySelector('.progress-handle');
        this.progressContainer = document.querySelector('.video-progress');
        this.currentTimeEl = document.querySelector('.current-time');
        this.durationEl = document.querySelector('.duration');
        this.volumeBtn = document.querySelector('.volume-btn');
        this.fullscreenBtn = document.querySelector('.fullscreen-btn');
        this.videoWrapper = document.querySelector('.video-wrapper');
        
        this.isPlaying = false;
        this.isDragging = false;
        
        this.init();
    }
    
    init() {
        // Обработчики событий видео
        this.video.addEventListener('loadedmetadata', () => {
            this.durationEl.textContent = this.formatTime(this.video.duration);
        });
        
        this.video.addEventListener('timeupdate', () => {
            this.updateProgress();
            this.currentTimeEl.textContent = this.formatTime(this.video.currentTime);
        });
        
        this.video.addEventListener('ended', () => {
            this.resetToStart();
        });
        
        // Обработчики кнопок
        this.playPauseBtn.addEventListener('click', () => this.togglePlay());
        this.poster.addEventListener('click', () => this.playVideo());
        this.volumeBtn.addEventListener('click', () => this.toggleMute());
        this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
        
        // Обработчики прогресс бара
        this.progressContainer.addEventListener('click', (e) => this.setProgress(e));
        this.progressContainer.addEventListener('mousedown', () => this.startDragging());
        document.addEventListener('mousemove', (e) => this.dragProgress(e));
        document.addEventListener('mouseup', () => this.stopDragging());
        
        // Обработчики для touch устройств
        this.progressContainer.addEventListener('touchstart', () => this.startDragging());
        document.addEventListener('touchmove', (e) => this.dragProgress(e));
        document.addEventListener('touchend', () => this.stopDragging());
        
        // Обработчики клавиатуры
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
    }
    
    playVideo() {
        this.video.play().then(() => {
            this.isPlaying = true;
            this.updatePlayButton();
            this.poster.classList.add('hidden');
        }).catch(error => {
            console.log('Ошибка воспроизведения:', error);
        });
    }
    
    togglePlay() {
        if (this.video.paused) {
            this.playVideo();
        } else {
            this.video.pause();
            this.isPlaying = false;
            this.updatePlayButton();
        }
    }
    
    updatePlayButton() {
        const playIcon = this.playPauseBtn.querySelector('.play-icon');
        const pauseIcon = this.playPauseBtn.querySelector('.pause-icon');
        
        if (this.isPlaying) {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        } else {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    }
    
    toggleMute() {
        this.video.muted = !this.video.muted;
        this.updateVolumeButton();
    }
    
    updateVolumeButton() {
        const volumeIcon = this.volumeBtn.querySelector('.volume-icon');
        if (this.video.muted) {
            volumeIcon.innerHTML = '<path fill="currentColor" d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.52C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z"/>';
        } else {
            volumeIcon.innerHTML = '<path fill="currentColor" d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"/>';
        }
    }
    
    updateProgress() {
        const percent = (this.video.currentTime / this.video.duration) * 100;
        this.progressBar.style.width = percent + '%';
        this.progressHandle.style.left = percent + '%';
    }
    
    setProgress(e) {
        const rect = this.progressContainer.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        this.video.currentTime = percent * this.video.duration;
    }
    
    startDragging() {
        this.isDragging = true;
        this.video.pause();
    }
    
    dragProgress(e) {
        if (!this.isDragging) return;
        
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        if (!clientX) return;
        
        const rect = this.progressContainer.getBoundingClientRect();
        let percent = (clientX - rect.left) / rect.width;
        percent = Math.max(0, Math.min(1, percent));
        
        this.video.currentTime = percent * this.video.duration;
        this.updateProgress();
    }
    
    stopDragging() {
        if (!this.isDragging) return;
        this.isDragging = false;
        if (this.isPlaying) {
            this.video.play();
        }
    }
    
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            this.videoWrapper.requestFullscreen().catch(err => {
                console.log(`Ошибка при переходе в полноэкранный режим: ${err.message}`);
            });
            this.videoWrapper.classList.add('fullscreen');
        } else {
            document.exitFullscreen();
            this.videoWrapper.classList.remove('fullscreen');
        }
    }
    
    resetToStart() {
        this.video.currentTime = 0;
        this.isPlaying = false;
        this.updatePlayButton();
        this.poster.classList.remove('hidden');
    }
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    handleKeydown(e) {
        // Пробел для play/pause
        if (e.code === 'Space' && document.activeElement !== this.video) {
            e.preventDefault();
            this.togglePlay();
        }
        
        // Стрелки для перемотки
        if (e.code === 'ArrowLeft') {
            this.video.currentTime = Math.max(0, this.video.currentTime - 5);
        } else if (e.code === 'ArrowRight') {
            this.video.currentTime = Math.min(this.video.duration, this.video.currentTime + 5);
        }
    }
}

// Инициализация видео плеера после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    new VideoPlayer();
});


