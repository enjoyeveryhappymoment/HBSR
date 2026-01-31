// Birthday Surprise Interactive Features
class BirthdaySurprise {
    constructor() {
        this.currentQuizQuestion = 0;
        this.quizScore = 0;
        this.isPlaying = false;
        this.currentSong = 0;
        this.songs = [
            { title: "Our Song", artist: "Add your favorite song!" },
            { title: "Dance Song", artist: "Perfect for dancing together" },
            { title: "Love Ballad", artist: "Romantic evening music" }
        ];
        this.init();
    }

    init() {
        // Wait for DOM to load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupEventListeners());
        } else {
            this.setupEventListeners();
        }
    }

    setupEventListeners() {
        // Loading screen with countdown timer
        this.startCountdownTimer();
        
        // Start surprise button
        const startBtn = document.getElementById('start-surprise');
        if (startBtn) {
            startBtn.addEventListener('click', () =>{ 
                const backgroundAudio = new Audio("humsafar_audio.mpeg");
                backgroundAudio.loop = true;
                backgroundAudio.play()
                this.startSurprise()});
        }

        // Navigation
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                this.showSection(section);
                this.updateNavigation(e.currentTarget);
            });
        });

        // Decorate button
        const decorateBtn = document.getElementById('decorate-btn');
        if (decorateBtn) {
            decorateBtn.addEventListener('click', () => this.addStringLights());
        }
    }

    lightCandle() {
        // Light the candle flame
        const flame = document.querySelector('.flame');
        if (flame) {
            flame.classList.add('lit');
        }

        // Show birthday GIF overlay
        // const gifOverlay = document.createElement('div');
        // gifOverlay.className = 'birthday-gif-overlay';
        // gifOverlay.innerHTML = '<img src="birthday-12378_512.gif" alt="Happy Birthday!">';
        // document.body.appendChild(gifOverlay);

        // // Remove GIF after 5 seconds
        // setTimeout(() => {
        //     if (gifOverlay.parentNode) {
        //         gifOverlay.parentNode.removeChild(gifOverlay);
        //     }
        // }, 1000);

        // Update button
        const decorateBtn = document.getElementById('decorate-btn');
        decorateBtn.innerHTML = ' Next <i class="fa-solid fa-arrow-right"></i>';
        decorateBtn.style.background = 'linear-gradient(45deg, #ff6b6b, #ff8e53)';
        decorateBtn.disabled = true;
        decorateBtn.style.cursor = 'default';
        decorateBtn.onclick = null;

        // Memory gallery
        const memoryItems = document.querySelectorAll('.memory-item');
        memoryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const memory = e.currentTarget.dataset.memory;
                this.showMemory(memory);
            });
        });

        // Music player
        this.setupMusicPlayer();

        // Quiz functionality
        this.setupQuiz();

        // Add floating animations
        this.addFloatingElements();
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }

    startCountdownTimer() {
        let countdown = 3;
        const countdownElement = document.getElementById('countdown-number');
        
        const timer = setInterval(() => {
            if (countdownElement) {
                countdownElement.textContent = countdown;
                countdownElement.style.transform = 'scale(1.2)';
                countdownElement.style.color = '#ff6b6b';
                
                setTimeout(() => {
                    countdownElement.style.transform = 'scale(1)';
                    countdownElement.style.color = 'white';
                }, 200);
            }
            
            countdown--;
            
            if (countdown < 0) {
                clearInterval(timer);
                // if (countdownElement) {
                //     countdownElement.textContent = '🎉';
                //     countdownElement.style.transform = 'scale(1.5)';
                // }
                setTimeout(() => this.hideLoadingScreen(), 500);
            }
        }, 1000);
    }

    startSurprise() {
        const introPage = document.getElementById('intro-page');
        const mainSurprise = document.getElementById('main-surprise');
        
        if (introPage && mainSurprise) {
            introPage.classList.add('hidden');
            mainSurprise.classList.remove('hidden');
            this.createFireworks();
            // this.playSuccessSound();
        }
    }

    showSection(sectionId) {
        // Hide all sections
        const sections = document.querySelectorAll('.surprise-section');
        sections.forEach(section => section.classList.remove('active'));

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }

    updateNavigation(activeItem) {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => item.classList.remove('active'));
        activeItem.classList.add('active');
    }

    addStringLights() {
        // Check if lights already exist
        if (document.querySelector('.string-lights')) {
            return; // Lights already added
        }

        // Create string lights container
        const stringLights = document.createElement('div');
        stringLights.className = 'string-lights';
        
        // Create wire segments for each edge
        const topWire = document.createElement('div');
        topWire.className = 'light-wire top-wire';
        stringLights.appendChild(topWire);
        
        const rightWire = document.createElement('div');
        rightWire.className = 'light-wire right-wire';
        stringLights.appendChild(rightWire);
        
        const bottomWire = document.createElement('div');
        bottomWire.className = 'light-wire bottom-wire';
        stringLights.appendChild(bottomWire);
        
        const leftWire = document.createElement('div');
        leftWire.className = 'light-wire left-wire';
        stringLights.appendChild(leftWire);

        // Light colors
        const lightColors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#a8e6cf', '#ff8b94', '#c7ceea', '#ffd93d', '#6c5ce7'];
        const miniColors = ['#ff9999', '#66d9d9', '#fff199', '#d1f2cc', '#ffb3ba', '#e6f0ff', '#ffed99', '#9c7ce8'];
        
        // Calculate number of lights per edge based on screen size
        const lightsPerEdge = 8;
        let lightIndex = 0;
        
        // Create lights for each edge in clockwise order
        const edges = [
            { className: 'top-edge', count: lightsPerEdge },
            { className: 'right-edge', count: lightsPerEdge + 9 },
            { className: 'bottom-edge', count: lightsPerEdge },
            { className: 'left-edge', count: lightsPerEdge + 9 }
        ];
        
        edges.forEach((edge, edgeIndex) => {
            for (let i = 0; i < edge.count; i++) {
                const lightContainer = document.createElement('div');
                lightContainer.className = `light-container ${edge.className}`;
                lightContainer.style.setProperty('--light-position', i);
                lightContainer.style.setProperty('--total-lights', edge.count);
                
                // Main light bulb
                const lightBulb = document.createElement('div');
                lightBulb.className = 'light-bulb';
                lightBulb.style.backgroundColor = lightColors[lightIndex % lightColors.length];
                lightBulb.style.animationDelay = `${lightIndex * 0.15}s`;
                
                // Add light glow effect
                const glow = document.createElement('div');
                glow.className = 'light-glow';
                glow.style.backgroundColor = lightColors[lightIndex % lightColors.length];
                lightBulb.appendChild(glow);
                
                lightContainer.appendChild(lightBulb);

                // Add mini bulb
                const miniBulb = document.createElement('div');
                miniBulb.className = 'mini-bulb';
                miniBulb.style.backgroundColor = miniColors[lightIndex % miniColors.length];
                miniBulb.style.animationDelay = `${(lightIndex * 0.15) + 0.3}s`;
                miniBulb.style.top = '27px';
                miniBulb.style.right = '-8px';
                miniBulb.style.left = '0px';
                lightContainer.appendChild(miniBulb);

                // Add sparkles (every 8th light)
                if (lightIndex % 8 === 4) {
                    const sparkle = document.createElement('div');
                    sparkle.className = 'light-sparkle';
                    sparkle.innerHTML = '✨';
                    sparkle.style.animationDelay = `${lightIndex * 0.25}s`;
                    lightContainer.appendChild(sparkle);
                }
                
                stringLights.appendChild(lightContainer);
                lightIndex++;
            }
        });

        // Add floating hearts
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'floating-heart';
                heart.innerHTML = '💕';
                heart.style.left = `${Math.random() * 100}%`;
                heart.style.animationDelay = `${Math.random() * 2}s`;
                stringLights.appendChild(heart);
                
                // Remove heart after animation
                setTimeout(() => {
                    if (heart.parentNode) {
                        heart.parentNode.removeChild(heart);
                    }
                }, 8000);
            }, i * 500);
        }

        // Add to page
        document.body.appendChild(stringLights);

        // Update button for next action
        const decorateBtn = document.getElementById('decorate-btn');
        decorateBtn.innerHTML = '<i class="fas fa-fire"></i> Light the Candle';
        decorateBtn.style.background = 'linear-gradient(45deg, #ff6b6b, #ff8e53)';
        decorateBtn.onclick = () => this.lightCandle();
        
        // Create celebration effect
        this.createFireworks();
        
        // Show success message
        // this.showDecorateMessage();
    }

    lightCandle() {
        // Light the candle flame
        const flame = document.querySelector('.flame');
        if (flame) {
            flame.classList.add('lit');
        }

        // Show birthday GIF overlay
        // const gifOverlay = document.createElement('div');
        // gifOverlay.className = 'birthday-gif-overlay';
        // gifOverlay.innerHTML = '<img src="birthday-12378_512.gif" alt="Happy Birthday!">';
        // document.body.appendChild(gifOverlay);

        // Remove GIF after 5 seconds
        // setTimeout(() => {
        //     if (gifOverlay.parentNode) {
        //         gifOverlay.parentNode.removeChild(gifOverlay);
        //     }
        // }, 1000);

        // Add birthday text animation
        this.showBirthdayText();

        // Update button
        const decorateBtn = document.getElementById('decorate-btn');
        decorateBtn.innerHTML = ' Next <i class="fa-solid fa-arrow-right"></i>';
        decorateBtn.style.background = 'linear-gradient(45deg, #ff6b6b, #ff8e53)';
        decorateBtn.disabled = false;
        decorateBtn.style.cursor = 'pointer';
        decorateBtn.onclick = () => this.showPhotoGallery();
    }

    showPhotoGallery() {
        // Check if photo gallery already exists
        if (document.querySelector('.photo-gallery-screen')) {
            return; // Gallery already shown
        }

        // Define your slides data
        const slidesData = [
            {
                icon: "fas fa-heart",
                title: "./assets/1.png",
                caption: "Our first amazing moment together ❤️"
            },
            {
                icon: "fas fa-camera",
                title: "./assets/2.jpg",
                caption: "That unforgettable day when everything just felt right 🌟"
            },
            {
                icon: "fas fa-star",
                title: "./assets/3.jpg",
                caption: "The moment I knew you were special 💫"
            },
            {
                icon: "fas fa-kiss",
                title: "./assets/4.jpg",
                caption: "An evening that reminded me why I enjoy your company 😊💝"
            },
            {
                icon: "fas fa-plane",
                title: "./assets/5.jpg",
                caption: "Exploring the world together 🌍"
            },
            {
                icon: "fas fa-gift",
                title: "./assets/6.jpeg",
                caption: "The day you made all my dreams come true 🎁"
            }
        ];

        // Hide the main surprise content
        const mainSurprise = document.getElementById('main-surprise');
        if (mainSurprise) {
            mainSurprise.style.display = 'none';
        }

        // Create photo gallery container
        const photoGallery = document.createElement('div');
        photoGallery.className = 'photo-gallery-screen';
        
        // Check if mobile device
        const isMobile = window.innerWidth <= 768;
        
        photoGallery.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 2000;
            background: radial-gradient(ellipse at center, 
                #ffecd2 0%, 
                #fcb69f 25%, 
                #ff6b6b 50%, 
                #ff8e53 75%, 
                #c7254e 100%);
            background-attachment: fixed;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: ${isMobile ? 'flex-start' : 'center'};
            animation: photoGalleryFadeIn 1s ease-out forwards;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            padding: ${isMobile ? '20px 0 120px 0' : '0 0 100px 0'};
            gap: ${isMobile ? '20px' : '0'};
        `;

        // Create header section
        const header = document.createElement('div');
        header.className = 'photo-gallery-header';
        header.innerHTML = `
            <h1 class="gallery-title">✨ Our Beautiful Memories ✨</h1>
            <p class="gallery-subtitle">A journey through our most precious moments together 💕</p>
        `;
        header.style.cssText = `
            text-align: center;
            margin-bottom: ${isMobile ? '20px' : '30px'};
            z-index: 2001;
            width: 100%;
            padding: ${isMobile ? '0 20px' : '0'};
            position: relative;
        `;

        // Generate slides HTML
        const slidesHTML = slidesData.map((slide, index) => `
            <div class="slide ${index === 0 ? 'active' : ''}">
                <div class="photo-placeholder">
                    
                    <img class="photo-gallery-image" src="${slide.title}" />
                </div>
                <div class="slide-caption">${slide.caption}</div>
            </div>
        `).join('');

        // Generate indicators HTML <i class="${slide.icon}" style="font-size: ${isMobile ? '3rem' : '4rem'}; color: #fff; opacity: 0.8;"></i>  <p style="color: white; margin-top: 20px; font-size: ${isMobile ? '1rem' : '1.2rem'};">${slide.title}</p>
        const indicatorsHTML = slidesData.map((slide, index) => `
            <span class="indicator ${index === 0 ? 'active' : ''}" data-slide="${index}"></span>
        `).join('');

        // Create slideshow container
        const slideshowContainer = document.createElement('div');
        slideshowContainer.className = 'slideshow-container';
        slideshowContainer.innerHTML = `
            <div class="slideshow-wrapper">
                ${slidesHTML}
            </div>
            <div class="slideshow-controls">
                <button class="prev-slide">❮</button>
                <div class="slide-indicators">
                    ${indicatorsHTML}
                </div>
                <button class="next-slide">❯</button>
            </div>
            ${isMobile ? '<div style="height: 80px; width: 100%;"></div>' : ''}
        `;

        // Create next button at bottom
        const nextButton = document.createElement('button');
        nextButton.className = 'photo-gallery-next';
        nextButton.innerHTML = ' <i class="fas fa-envelope"></i> Open my message';
        nextButton.style.cssText = `
            position: fixed;
            bottom: ${isMobile ? '20px' : '30px'};
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(45deg, #ff6b6b, #ff8e53);
            border: none;
            color: white;
            padding: ${isMobile ? '12px 20px' : '15px 30px'};
            border-radius: 30px;
            font-size: ${isMobile ? '1rem' : '1.1rem'};
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
            transition: all 0.3s ease;
            z-index: 2002;
            backdrop-filter: blur(10px);
            width: ${isMobile ? '80%' : '60%'};
            max-width: ${isMobile ? '250px' : '300px'};
            min-height: 44px;
        `;

        // Add elements to gallery
        photoGallery.appendChild(header);
        photoGallery.appendChild(slideshowContainer);
        photoGallery.appendChild(nextButton);

        // Add to page
        document.body.appendChild(photoGallery);

        // Add styles
        this.addPhotoGalleryStyles();

        // Setup slideshow functionality
        this.setupSlideshow();

        // Setup next button
        nextButton.addEventListener('click', () => this.nextFromPhotoGallery());

        // Add floating elements
        this.addGalleryFloatingElements();

        // Ensure proper scroll to top on mobile
        if (isMobile) {
            setTimeout(() => {
                photoGallery.scrollTop = 0;
            }, 100);
        }
    }

    showBirthdayText() {
        // Check if birthday text already exists
        if (document.querySelector('.birthday-text-container')) {
            return; // Text already shown
        }

        const birthdayWords = ["Happy", "Birthday", "Angel"];
        
        // Create container for the birthday text
        const textContainer = document.createElement('div');
        textContainer.className = 'birthday-text-container';
        textContainer.style.cssText = `
            position: fixed;
            top: 18%;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1500;
            font-family: cursive;
            font-size: 3rem;
            font-weight: bold;
            text-align: center;
            pointer-events: none;
        `;

        // Add the container to the page
        document.body.appendChild(textContainer);

        // Create each word on a separate line
        birthdayWords.forEach((word, wordIndex) => {
            const wordLine = document.createElement('div');
            wordLine.style.cssText = `
                margin: 5px 0;
                line-height: 1.2;
            `;
            
            // Create each character span within the word
            const characters = word.split('');
            characters.forEach((char, charIndex) => {
                const charSpan = document.createElement('span');
                charSpan.textContent = char;
                const totalIndex = wordIndex * 10 + charIndex; // Stagger animation across words
                charSpan.style.cssText = `
                    opacity: 0;
                    color: #ffd54f;
                    text-shadow: 
                        0 0 10px #ffd54f,
                        0 0 20px #ffecb3,
                        0 0 30px #fff8e1,
                        0 0 40px #fff59d;
                    animation: textGlowAnimated 0.5s ease-in-out ${totalIndex * 0.1}s forwards, 
                               continuousGlow 2s ease-in-out ${(totalIndex * 0.1) + 0.5}s infinite alternate;
                    display: inline-block;
                    transform: scale(0);
                `;
                wordLine.appendChild(charSpan);
            });
            textContainer.appendChild(wordLine);
        });

        // Add the animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes textGlowAnimated {
                0% {
                    opacity: 0;
                    transform: scale(0) rotateZ(-180deg);
                    text-shadow: none;
                }
                50% {
                    transform: scale(1.2) rotateZ(0deg);
                    text-shadow: 
                        0 0 15px #ffd54f,
                        0 0 25px #ffecb3,
                        0 0 35px #fff8e1,
                        0 0 45px #fff59d;
                }
                100% {
                    opacity: 1;
                    transform: scale(1) rotateZ(0deg);
                    text-shadow: 
                        0 0 10px #ffd54f,
                        0 0 20px #ffecb3,
                        0 0 30px #fff8e1,
                        0 0 40px #fff59d;
                }
            }

            @keyframes continuousGlow {
                0% {
                    text-shadow: 
                        0 0 10px #ffd54f,
                        0 0 20px #ffecb3,
                        0 0 30px #fff8e1,
                        0 0 40px #fff59d;
                    filter: brightness(1);
                }
                25% {
                    text-shadow: 
                        0 0 20px #ffd54f,
                        0 0 30px #ffecb3,
                        0 0 40px #fff8e1,
                        0 0 50px #fff59d,
                        0 0 60px rgba(255, 213, 79, 0.5);
                    filter: brightness(1.2);
                }
                50% {
                    text-shadow: 
                        0 0 30px #ffd54f,
                        0 0 40px #ffecb3,
                        0 0 50px #fff8e1,
                        0 0 60px #fff59d,
                        0 0 70px rgba(255, 213, 79, 0.7),
                        0 0 80px rgba(255, 236, 179, 0.5);
                    filter: brightness(1.4);
                }
                75% {
                    text-shadow: 
                        0 0 25px #ffd54f,
                        0 0 35px #ffecb3,
                        0 0 45px #fff8e1,
                        0 0 55px #fff59d,
                        0 0 65px rgba(255, 213, 79, 0.6);
                    filter: brightness(1.3);
                }
                100% {
                    text-shadow: 
                        0 0 15px #ffd54f,
                        0 0 25px #ffecb3,
                        0 0 35px #fff8e1,
                        0 0 45px #fff59d,
                        0 0 55px rgba(255, 213, 79, 0.4);
                    filter: brightness(1.1);
                }
            }

            .birthday-text-container span {
                animation-fill-mode: forwards;
            }

            .birthday-text-container span:hover {
                text-shadow: 
                    0 0 25px #ffd54f,
                    0 0 35px #ffecb3,
                    0 0 45px #fff8e1,
                    0 0 55px #fff59d,
                    0 0 65px rgba(255, 213, 79, 0.8),
                    0 0 75px rgba(255, 236, 179, 0.6);
                animation: textPulse 1s infinite, continuousGlow 1.5s ease-in-out infinite alternate;
                filter: brightness(1.5);
            }

            @keyframes textPulse {
                0%, 100% { 
                    transform: scale(1); 
                }
                50% { 
                    transform: scale(1.1);
                    text-shadow: 
                        0 0 30px #ffd54f,
                        0 0 40px #ffecb3,
                        0 0 50px #fff8e1,
                        0 0 60px #fff59d,
                        0 0 70px rgba(255, 213, 79, 0.9),
                        0 0 80px rgba(255, 236, 179, 0.7);
                }
            }

            /* Add a subtle background glow effect */
            .birthday-text-container::before {
                content: '';
                position: absolute;
                top: -20px;
                left: -20px;
                right: -20px;
                bottom: -20px;
                background: radial-gradient(ellipse at center, 
                    rgba(255, 213, 79, 0.1) 0%, 
                    rgba(255, 236, 179, 0.05) 30%, 
                    transparent 70%);
                border-radius: 50px;
                z-index: -1;
                animation: backgroundGlow 3s ease-in-out infinite alternate;
            }

            @keyframes backgroundGlow {
                0% {
                    transform: scale(1);
                    opacity: 0.3;
                }
                50% {
                    transform: scale(1.1);
                    opacity: 0.6;
                }
                100% {
                    transform: scale(1.05);
                    opacity: 0.4;
                }
            }
        `;
        document.head.appendChild(style);

        // Add sparkle effects around the text
        setTimeout(() => {
            this.addTextSparkles(textContainer);
        }, birthdayWords.join(' ').length * 100 + 500);
    }

    addTextSparkles(textContainer) {
        const sparkleEmojis = ['✨', '⭐', '🌟', '💫', '🎊'];
        
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
                sparkle.style.cssText = `
                    position: absolute;
                    font-size: 1.5rem;
                    pointer-events: none;
                    z-index: 1600;
                    animation: sparkleFloat 2s ease-out forwards;
                `;

                // Position sparkles around the text
                const rect = textContainer.getBoundingClientRect();
                const angle = (i * 45) * (Math.PI / 180); // 45 degrees apart
                const radius = 80;
                const x = rect.left + (rect.width / 2) + (Math.cos(angle) * radius);
                const y = rect.top + (rect.height / 2) + (Math.sin(angle) * radius);
                
                sparkle.style.left = x + 'px';
                sparkle.style.top = y + 'px';
                sparkle.style.position = 'fixed';

                document.body.appendChild(sparkle);

                // Remove sparkle after animation
                setTimeout(() => {
                    if (sparkle.parentNode) {
                        sparkle.parentNode.removeChild(sparkle);
                    }
                }, 2000);
            }, i * 200);
        }

        // Add floating sparkle animation
        const sparkleStyle = document.createElement('style');
        sparkleStyle.textContent = `
            @keyframes sparkleFloat {
                0% {
                    opacity: 0;
                    transform: scale(0) rotate(0deg);
                }
                20% {
                    opacity: 1;
                    transform: scale(1) rotate(90deg);
                }
                100% {
                    opacity: 0;
                    transform: scale(0.5) rotate(360deg) translateY(-50px);
                }
            }
        `;
        document.head.appendChild(sparkleStyle);
    }

    showDecorateMessage() {
        const message = document.createElement('div');
        message.textContent = '✨ Beautiful string lights added! ✨';
        message.style.cssText = `
            position: fixed;
            top: 20%;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(45deg, #ff6b6b, #ff8e53);
            color: white;
            padding: 15px 25px;
            border-radius: 20px;
            font-size: 1.1rem;
            font-weight: 600;
            z-index: 1000;
            animation: messageFloat 3s ease-out forwards;
            box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
        `;

        const style = document.createElement('style');
        style.textContent = `
            @keyframes messageFloat {
                0% { opacity: 0; transform: translateX(-50%) translateY(30px); }
                20% { opacity: 1; transform: translateX(-50%) translateY(0); }
                80% { opacity: 1; transform: translateX(-50%) translateY(0); }
                100% { opacity: 0; transform: translateX(-50%) translateY(-30px); }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(message);
        setTimeout(() => {
            if (message.parentNode) {
                document.body.removeChild(message);
            }
        }, 3000);
    }

    showMemory(memoryId) {
        const messages = [
            "Our first date was magical! 💫 Remember how nervous we both were?",
            "That moment when I knew you were special ❤️ Your smile lit up the room!",
            "Our adventure together! 🌟 Every journey is better with you by my side.",
            "This will always be my favorite memory with you! 💕 You make life beautiful."
        ];

        const memoryIndex = parseInt(memoryId) - 1;
        const message = messages[memoryIndex] || "This memory is so special to us! 💖";

        // Create modal or alert for now (you can enhance this later)
        this.showMemoryModal(message, memoryId);
    }

    showMemoryModal(message, memoryId) {
        // Create a beautiful modal
        const modal = document.createElement('div');
        modal.className = 'memory-modal';
        modal.innerHTML = `
            <div class="memory-modal-content">
                <div class="memory-modal-header">
                    <h3>Memory ${memoryId} 📸</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="memory-modal-body">
                    <div class="memory-image-placeholder">
                        <i class="fas fa-heart" style="font-size: 4rem; color: #ff6b6b;"></i>
                        <p style="margin-top: 20px; font-style: italic;">Photo placeholder - Add your special memory here!</p>
                    </div>
                    <p class="memory-message">${message}</p>
                </div>
            </div>
        `;

        // Add modal styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease-out;
        `;

        const modalContent = modal.querySelector('.memory-modal-content');
        modalContent.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 20px;
            max-width: 500px;
            margin: 20px;
            text-align: center;
            box-shadow: 0 20px 50px rgba(0,0,0,0.3);
            animation: slideInUp 0.3s ease-out;
        `;

        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            position: absolute;
            top: 10px;
            right: 20px;
            color: #999;
        `;

        document.body.appendChild(modal);

        // Close modal functionality
        const closeModal = () => {
            modal.style.opacity = '0';
            setTimeout(() => document.body.removeChild(modal), 300);
        };

        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideInUp {
                from { transform: translateY(50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    addPhotoGalleryStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes photoGalleryFadeIn {
                0% {
                    opacity: 0;
                    transform: scale(0.95);
                }
                100% {
                    opacity: 1;
                    transform: scale(1);
                }
            }

            .photo-gallery-header {
                position: relative;
            }

            .gallery-title {
                font-family: 'Brush Script MT', cursive, serif;
                font-size: 2rem;
                color: white;
                text-shadow: 
                    0 0 20px rgba(255, 255, 255, 0.5),
                    0 4px 8px rgba(0, 0, 0, 0.3);
                margin: 0;
                animation: titleGlow 2s ease-in-out infinite alternate;
            }

            .gallery-subtitle {
                font-size: 1.2rem;
                color: rgba(255, 255, 255, 0.9);
                margin: 10px 0 0 0;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            }

            @keyframes titleGlow {
                0% {
                    text-shadow: 
                        0 0 20px rgba(255, 255, 255, 0.5),
                        0 4px 8px rgba(0, 0, 0, 0.3);
                }
                100% {
                    text-shadow: 
                        0 0 30px rgba(255, 255, 255, 0.8),
                        0 0 40px rgba(255, 255, 255, 0.4),
                        0 4px 8px rgba(0, 0, 0, 0.3);
                }
            }

            .slideshow-container {
                position: relative;
                max-width: 800px;
                width: 90%;
                margin: 20px auto;
            }

            .slideshow-wrapper {
                position: relative;
                width: 100%;
                height: 500px;
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
            }

            .slide {
                position: absolute;
                width: 100%;
                height: 100%;
                opacity: 0;
                transition: opacity 0.5s ease-in-out;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                background: linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.1) 0%, 
                    rgba(255, 255, 255, 0.05) 100%);
            }

            .slide.active {
                opacity: 1;
            }

            .photo-placeholder {
                text-align: center;
                padding: 40px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 15px;
                margin: 20px;
                backdrop-filter: blur(5px);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            .photo-gallery-image{
                width: 100%;
                height: 100%;
                object-fit: contain;
                border-radius: 12px;
            }

            .slide-caption {
                position: absolute;
                bottom: 20px;
                left: 20px;
                right: 20px;
                background: rgba(0, 0, 0, 0.6);
                color: white;
                padding: 15px;
                border-radius: 10px;
                font-size: 1.1rem;
                text-align: center;
                backdrop-filter: blur(10px);
            }

            .slideshow-controls {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 20px;
                padding: 0 20px;
            }

            .prev-slide, .next-slide {
                background: rgba(255, 255, 255, 0.2);
                border: none;
                color: white;
                font-size: 2rem;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                cursor: pointer;
                transition: all 0.3s ease;
                backdrop-filter: blur(10px);
                border: 2px solid rgba(255, 255, 255, 0.3);
            }

            .prev-slide:hover, .next-slide:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: scale(1.1);
            }

            .slide-indicators {
                display: flex;
                gap: 10px;
            }

            .indicator {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.4);
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .indicator.active {
                background: white;
                transform: scale(1.2);
            }

            .back-to-surprise:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            }

            .photo-gallery-next:hover {
                background: linear-gradient(45deg, #ff8e53, #ff6b6b);
                transform: translateX(-50%) translateY(-3px);
                box-shadow: 0 12px 35px rgba(255, 107, 107, 0.6);
            }

            .photo-gallery-next:active {
                transform: translateX(-50%) translateY(-1px);
                box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
            }
        `;
        document.head.appendChild(style);
    }

    setupSlideshow() {
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        const indicators = document.querySelectorAll('.indicator');
        const prevBtn = document.querySelector('.prev-slide');
        const nextBtn = document.querySelector('.next-slide');

        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        };

        const prevSlide = () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        };

        // Event listeners
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });

        // Auto-advance slideshow
        setInterval(nextSlide, 5000);
    }

    backToSurprise() {
        const photoGallery = document.querySelector('.photo-gallery-screen');
        const mainSurprise = document.getElementById('main-surprise');

        if (photoGallery) {
            photoGallery.style.animation = 'photoGalleryFadeOut 0.5s ease-in forwards';
            setTimeout(() => {
                document.body.removeChild(photoGallery);
            }, 500);
        }

        if (mainSurprise) {
            mainSurprise.style.display = 'block';
            mainSurprise.style.animation = 'fadeIn 0.5s ease-out forwards';
        }

        // Add fade out animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes photoGalleryFadeOut {
                0% { opacity: 1; transform: scale(1); }
                100% { opacity: 0; transform: scale(0.95); }
            }
        `;
        document.head.appendChild(style);
    }

    nextFromPhotoGallery() {
        const photoGallery = document.querySelector('.photo-gallery-screen');

        if (photoGallery) {
            photoGallery.style.animation = 'photoGalleryFadeOut 0.5s ease-in forwards';
            setTimeout(() => {
                document.body.removeChild(photoGallery);
            }, 500);
        }

        // Here you can add the next screen/feature
        // For now, let's show a placeholder message
        setTimeout(() => {
            this.showNextFeaturePlaceholder();
        }, 600);
    }

    showNextFeaturePlaceholder() {
        // Create flip book greeting card
        const flipBook = document.createElement('div');
        flipBook.className = 'flip-book-container';
        flipBook.innerHTML = `
            <div class="flip-book-content">
                <div class="flip-book">
                    <div class="flip-book-cover" id="flipBookCover">
                        <div class="cover-content">
                            <img src="coverBallon.jpeg" alt="Birthday Cover" class="cover-image">
                            <div class="cover-overlay">
                                <p class="cover-subtitle">Tap to Open ✨</p>
                            </div>
                        </div>
                    </div>
                    <div class="flip-book-inside" id="flipBookInside">
                        <div class="inside-background"></div>
                        <div class="inside-content">
                            <div class="greeting-text">
                                <h1 class="birthday-greeting">Happy Birthday, Princess 👸🏻💖!</h1>
                                <div class="birthday-message">
                                    On your special day, I want you to know how much you mean to me. 
                                    Every heartbeat of mine celebrates you today. You are not just a year older, but a year more loved! 💕
                                </div>
                                <div class="signature">
                                    <p>With all my love,</p>
                                    <p class="signature-name"> Sweta ji 😍😘</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div class="flip-book-buttons">
                <button class="close-book" id="closeBook">
                    Photo gallery <i class="fas fa-camera"></i>
                </button>
                <button class="reload-button" id="reloadButton">
                    Next <i class="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        `;
        
        flipBook.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            flex-direction: column;
            z-index: 3000;
            animation: fadeIn 0.5s ease-out forwards;
        `;

        // Add styles for flip book
        const style = document.createElement('style');
        style.textContent = `
            .flip-book-container {
                display: flex;
                flex-direction: column;
                height: 100vh;
            }
            
            .flip-book-content {
                flex: 0 0 85%;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 10px 10px;
            }
            
            .flip-book-buttons {
                display: flex;
                justify-content: space-between;
                padding: 0px 20px;
            }
            
            .flip-book {
                position: relative;
                width: 400px;
                height: 600px;
                perspective: 1000px;
                cursor: pointer;
            }

            .flip-book-cover, .flip-book-inside {
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 15px;
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
                transform-style: preserve-3d;
                transition: transform 0.8s cubic-bezier(0.4, 0.0, 0.2, 1);
                backface-visibility: hidden;
            }

            .flip-book-cover {
                background: linear-gradient(45deg, #ff6b6b, #ff8e53);
                transform: rotateY(0deg);
                z-index: 2;
            }

            .flip-book-inside {
                transform: rotateY(-180deg);
                z-index: 1;
                position: relative;
            }

            .inside-background {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-image: url('newBBG.jpeg');
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                border-radius: 15px;
                opacity: 0.3;
                z-index: 4;
            }

            .inside-background::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.2);
                border-radius: 15px;
                z-index: 2;
            }

            .flip-book.flipped .flip-book-cover {
                transform: rotateY(180deg);
            }

            .flip-book.flipped .flip-book-inside {
                transform: rotateY(0deg);
            }

            .cover-content {
                position: relative;
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                border-radius: 15px;
                overflow: hidden;
            }

            .cover-image {
                width: 100%;
                height: 100%;
                border-radius: 15px;
            }

            .cover-overlay {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                background: linear-gradient(transparent, rgba(0,0,0,0.7));
                padding: 40px 20px 20px;
                text-align: center;
                color: white;
            }

            .cover-title {
                font-family: 'Brush Script MT', cursive, serif;
                font-size: 2.5rem;
                margin: 0 0 10px 0;
                text-shadow: 
                    0 0 20px rgba(255, 255, 255, 0.5),
                    0 2px 4px rgba(0, 0, 0, 0.5);
                animation: coverGlow 2s ease-in-out infinite alternate;
            }

            .cover-subtitle {
                font-size: 1.1rem;
                margin: 0;
                opacity: 0.9;
                animation: pulse 2s ease-in-out infinite;
                color: magenta;
                text-shadow: 0px 0px 10px #eb8deb, 0px 0px 20px #ea55ea;
            }

            @keyframes coverGlow {
                0% {
                    text-shadow: 
                        0 0 20px rgba(255, 255, 255, 0.5),
                        0 2px 4px rgba(0, 0, 0, 0.5);
                }
                100% {
                    text-shadow: 
                        0 0 30px rgba(255, 255, 255, 0.8),
                        0 0 40px rgba(255, 255, 255, 0.3),
                        0 2px 4px rgba(0, 0, 0, 0.5);
                }
            }

            @keyframes pulse {
                0%, 100% { opacity: 0.9; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.05); }
            }

            .inside-content {
                position: relative;
                width: 100%;
                height: 100%;
                padding: 40px 30px 80px 30px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                border-radius: 15px;
                background: rgba(255, 255, 255, 0.75);
                backdrop-filter: blur(8px);
                overflow: hidden;
                z-index: 3;
            }

            .greeting-text {
                text-align: center;
                color: #333;
                z-index: 2;
            }

            .birthday-greeting {
                font-family: 'Brush Script MT', cursive, serif;
                font-size: 2.8rem;
                color: #ff6b6b;
                margin: 0 0 20px 0;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
                animation: textShimmer 3s ease-in-out infinite;
            }

            .birthday-message {
                font-size: 1.1rem;
                line-height: 1.6;
                margin: 0 0 30px 0;
                color: #555;
                text-align: center;
            }

            .signature {
                margin-top: 20px;
            }

            .signature p {
                margin: 5px 0;
                color: #555;
                font-weight: 500;
            }

            .signature-name {
                font-family: 'Brush Script MT', cursive, serif;
                font-size: 1.3rem;
                color: #ff6b6b;
                font-weight: bold;
            }

            @keyframes textShimmer {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.8; text-shadow: 2px 2px 8px rgba(255, 107, 107, 0.3); }
            }

            .close-book {
                background: linear-gradient(45deg, #ff6b6b, #ff8e53);
                border: none;
                color: white;
                padding: 12px 25px;
                border-radius: 25px;
                cursor: pointer;
                font-size: 1rem;
                font-weight: 600;
                transition: all 0.3s ease;
                backdrop-filter: blur(5px);
                z-index: 5;
                box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
                min-height: 44px;
                flex: 0 0 auto;
                white-space: nowrap;
                max-width: 200px;
            }
                .reload-button {
                background: linear-gradient(45deg, #ff6b6b, #ff8e53);
                border: none;
                color: white;
                padding: 12px 25px;
                border-radius: 25px;
                cursor: pointer;
                font-size: 1rem;
                font-weight: 600;
                transition: all 0.3s ease;
                backdrop-filter: blur(5px);
                z-index: 5;
                box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
                min-height: 44px;
                flex: 0 0 auto;
                white-space: nowrap;
                max-width: 200px;
            }

            .close-book:hover {
                background: linear-gradient(45deg, #ff8e53, #ff6b6b);
                transform: translateX(-50%) translateY(-3px);
                box-shadow: 0 8px 25px rgba(255, 107, 107, 0.5);
            }

            .flip-book:hover {
                transform: scale(1.02);
                transition: transform 0.3s ease;
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(flipBook);

        // Add click event to flip the book (toggle functionality)
        const flipBookElement = document.querySelector('.flip-book');
        const coverElement = document.getElementById('flipBookCover');
        const insideElement = document.getElementById('flipBookInside');
        const closeButton = document.getElementById('closeBook');
        const reloadButton = document.getElementById('reloadButton');

        // Add click event to both cover and inside for toggle functionality
        const toggleFlip = () => {
            flipBookElement.classList.toggle('flipped');
            // Update cursor based on flipped state
            if (flipBookElement.classList.contains('flipped')) {
                setTimeout(() => {
                    flipBookElement.style.cursor = 'pointer';
                }, 800);
            } else {
                flipBookElement.style.cursor = 'pointer';
            }
        };

        coverElement.addEventListener('click', toggleFlip);
        insideElement.addEventListener('click', (e) => {
            // Only toggle if not clicking the close button
            if (e.target.closest('.close-book')) {
                return;
            }
            toggleFlip();
        });

        closeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.closeFlipBook();
        });
        reloadButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.showOneLastThing();
        });

        // Add floating hearts around the card
        this.addFlipBookFloatingElements();
    }

    closeFlipBook() {
        const flipBook = document.querySelector('.flip-book-container');
        if (flipBook) {
            flipBook.style.animation = 'fadeOut 0.5s ease-in forwards';
            setTimeout(() => {
                document.body.removeChild(flipBook);
                // Go back to photo gallery
                this.showPhotoGallery();
            }, 500);
        }
    }

    showOneLastThing() {
        // Remove flip book if exists
        const flipBook = document.querySelector('.flip-book-container');
        if (flipBook) {
            document.body.removeChild(flipBook);
        }

        // Create one last thing container
        const oneLastThing = document.createElement('div');
        oneLastThing.className = 'one-last-thing';
        
        // Check if mobile device
        const isMobile = window.innerWidth <= 768;
        // class="one-last-gif" for image on top
        oneLastThing.innerHTML = `
            <div class="stars"></div>
            <div class="one-last-content">
                <img src="happy-birthday-21510_512.gif" alt="Happy Birthday" >
                <h1 class="one-last-title">One Last Thing</h1>
                <div class="gift-container">
                    <img src="gift.gif" alt="Gift" class="gift-image" id="giftImage">
                    <p class="tap-gift-text">Tap the gift</p>
                </div>
            </div>
        `;
        
        oneLastThing.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(135deg, 
                #1a1a2e 0%, 
                #16213e 25%, 
                #0f3460 50%, 
                #533483 75%, 
                #7209b7 100%);
            background-size: 400% 400%;
            animation: gradientShift 10s ease-in-out infinite, fadeIn 1s ease-out forwards;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 4000;
            overflow: hidden;
        `;

        // Add styles for one last thing
        const style = document.createElement('style');
        style.textContent = `
            @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            
            .one-last-content {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
                width: 100%;
                max-width: 600px;
                padding: 20px;
            }
            
            .one-last-gif {
                width: ${isMobile ? '80px' : '120px'};
                height: ${isMobile ? '80px' : '120px'};
                margin-bottom: ${isMobile ? '15px' : '20px'};
                border-radius: 50%;
                animation: giftFloat 3s ease-in-out infinite;
                box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
            }
            
            .one-last-title {
                font-family: 'Brush Script MT', cursive, serif;
                font-size: ${isMobile ? '2.5rem' : '3.5rem'};
                color: white;
                text-shadow: 
                    0 0 20px rgba(255, 255, 255, 0.5),
                    0 0 30px rgba(255, 0, 0, 0.5),
                    0 4px 8px rgba(0, 0, 0, 0.5);
                margin: 0 0 ${isMobile ? '40px' : '60px'} 0;
                animation: titleGlow 2s ease-in-out infinite alternate;
                line-height: 1.2;
            }
            
            .gift-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                cursor: pointer;
                transition: transform 0.3s ease;
            }
            
            .gift-container:hover {
                transform: scale(1.05);
            }
            
            .gift-image {
                width: ${isMobile ? '150px' : '200px'};
                height: ${isMobile ? '150px' : '200px'};
                border-radius: 20px;
                box-shadow: 
                    0 10px 30px rgba(0, 0, 0, 0.5),
                    0 0 50px rgba(255, 0, 0, 0.3);
                margin-bottom: 20px;
                animation: giftFloat 3s ease-in-out infinite;
                border: 3px solid rgba(255, 255, 255, 0.3);
            }
            
            .tap-gift-text {
                font-size: ${isMobile ? '1.2rem' : '1.5rem'};
                color: white;
                text-shadow: 
                    0 0 10px rgba(255, 255, 255, 0.8),
                    0 2px 4px rgba(0, 0, 0, 0.5);
                margin: 0;
                animation: textPulse 2s ease-in-out infinite;
                font-weight: 600;
                letter-spacing: 1px;
            }
            
            @keyframes giftFloat {
                0%, 100% { 
                    transform: translateY(0px) rotate(0deg); 
                    box-shadow: 
                        0 10px 30px rgba(0, 0, 0, 0.5),
                        0 0 50px rgba(255, 0, 0, 0.3);
                }
                50% { 
                    transform: translateY(-10px) rotate(2deg); 
                    box-shadow: 
                        0 15px 40px rgba(0, 0, 0, 0.6),
                        0 0 60px rgba(255, 0, 0, 0.5);
                }
            }
            
            @keyframes textPulse {
                0%, 100% { 
                    opacity: 0.8; 
                    transform: scale(1);
                }
                50% { 
                    opacity: 1; 
                    transform: scale(1.05);
                }
            }
            
            /* Mobile responsive styles */
            @media (max-width: 768px) {
                .one-last-content {
                    padding: 15px;
                }
                
                .one-last-title {
                    font-size: 2.2rem;
                    margin: 0 0 30px 0;
                }
                
                .gift-image {
                    width: 120px;
                    height: 120px;
                }
                
                .tap-gift-text {
                    font-size: 1.1rem;
                }
            }
            
            @media (max-width: 480px) {
                .one-last-title {
                    font-size: 1.8rem;
                    margin: 0 0 25px 0;
                }
                
                .gift-image {
                    width: 100px;
                    height: 100px;
                }
                
                .tap-gift-text {
                    font-size: 1rem;
                }
            }
        `;
        document.head.appendChild(style);

        // Add to page
        document.body.appendChild(oneLastThing);

        // Add gift click event
        const giftImage = document.getElementById('giftImage');
        if (giftImage) {
            giftImage.addEventListener('click', () => {
                this.showFinalScreen();
            });
        }

        // Add sparkle effects around the gift
        this.addGiftSparkles();
    }

    showFinalScreen() {
        // Remove one last thing page
        const oneLastThing = document.querySelector('.one-last-thing');
        if (oneLastThing) {
            oneLastThing.style.animation = 'fadeOut 0.8s ease-in forwards';
            setTimeout(() => {
                document.body.removeChild(oneLastThing);
            }, 800);
        }

        // Check if mobile device
        const isMobile = window.innerWidth <= 768;
        
        // Create final screen container
        const finalScreen = document.createElement('div');
        finalScreen.className = 'final-screen-page';
        //  <div class="final-hearts">💖💕💖</div> <h1 class="final-title">Thank You!</h1> <i class="fa-solid fa-refresh"></i>
        finalScreen.innerHTML = `
            <div class="final-content">
                <div class="final-message">
                    <img src="surprise.gif" alt="Surprise" class="final-surprise-gif">
                    
                    <div class="final-text">
                    <p>With you, every day feels like a celebration, but today is extra special because it gave me you. Happy Birthday sweta 💖</p>
                    <p>Happy Birthday to the most beautiful part of my life 😊</p>
                        <p>This special day is made even more wonderful because of you 💫</p>
                        <p>Hope you enjoyed this little surprise! ✨</p>
                       
                    </div>
                    <button class="restart-journey" onclick="window.location.reload()">
                        Replay <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        `;
        
        finalScreen.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(135deg, 
                #ff6b6b 0%, 
                #ff8e53 25%, 
                #ff6b9d 50%, 
                #c7254e 75%, 
                #667eea 100%);
            background-size: 400% 400%;
            animation: gradientFlow 8s ease-in-out infinite, fadeIn 1s ease-out forwards;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 5000;
            overflow: hidden;
        `;

        // Add final screen styles
        const finalStyle = document.createElement('style');
        finalStyle.textContent = `
            @keyframes gradientFlow {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            
            .final-content {
                text-align: center;
                max-width: 600px;
                padding: 20px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 20px;
                backdrop-filter: blur(10px);
                border: 2px solid rgba(255, 255, 255, 0.2);
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
            }
            
            .final-surprise-gif {
                width: 170px;
            }
            
            .final-title {
                font-family: 'Brush Script MT', cursive, serif;
                font-size: ${isMobile ? '3rem' : '4rem'};
                color: white;
                text-shadow: 
                    0 0 20px rgba(255, 255, 255, 0.8),
                    0 4px 8px rgba(0, 0, 0, 0.3);
                margin: 0 0 30px 0;
                animation: finalTitleGlow 3s ease-in-out infinite alternate;
            }
            
            .final-text p {
                font-size: ${isMobile ? '1.2rem' : '1.4rem'};
                color: white;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
                margin: 15px 0;
                line-height: 1.6;
                font-weight: 500;
            }
            
            .final-hearts {
                font-size: ${isMobile ? '2rem' : '2.5rem'};
                margin: 20px 0;
                animation: heartsBeat 2s ease-in-out infinite;
            }
            
            .restart-journey {
                background: linear-gradient(45deg, #ff6b6b, #ff8e53);
                border: none;
                color: white;
                padding: 15px 30px;
                border-radius: 30px;
                font-size: ${isMobile ? '1.1rem' : '1.2rem'};
                font-weight: 600;
                cursor: pointer;
                margin-top: 30px;
                box-shadow: 0 10px 30px rgba(255, 107, 107, 0.4);
                transition: all 0.3s ease;
                min-height: 50px;
                backdrop-filter: blur(5px);
            }
            
            .restart-journey:hover {
                transform: translateY(-3px);
                box-shadow: 0 15px 40px rgba(255, 107, 107, 0.6);
                background: linear-gradient(45deg, #ff8e53, #ff6b6b);
            }
            
            @keyframes finalTitleGlow {
                0% {
                    text-shadow: 
                        0 0 20px rgba(255, 255, 255, 0.8),
                        0 4px 8px rgba(0, 0, 0, 0.3);
                }
                100% {
                    text-shadow: 
                        0 0 30px rgba(255, 255, 255, 1),
                        0 0 40px rgba(255, 255, 255, 0.5),
                        0 4px 8px rgba(0, 0, 0, 0.3);
                }
            }
            
            @keyframes heartsBeat {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
            
            /* Mobile responsive styles for final screen */
            @media (max-width: 768px) {
                .final-content {
                    margin: 20px;
                    padding: 25px 20px;
                }
                
                .final-title {
                    font-size: 2.5rem;
                }
                
                .final-text p {
                    font-size: 1.1rem;
                }
                
                .final-hearts {
                    font-size: 2rem;
                }
                
                .restart-journey {
                    font-size: 1rem;
                    padding: 12px 25px;
                }
            }
            
            @media (max-width: 480px) {
                .final-title {
                    font-size: 2rem;
                }
                
                .final-text p {
                    font-size: 1rem;
                }
                
                .final-hearts {
                    font-size: 1.8rem;
                }
                
                .restart-journey {
                    font-size: 0.9rem;
                    padding: 10px 20px;
                }
            }
        `;
        document.head.appendChild(finalStyle);

        // Add final screen after a delay
        setTimeout(() => {
            document.body.appendChild(finalScreen);
            this.createFinalFireworks();
        }, 900);
    }

    addGiftSparkles() {
        const sparkleEmojis = ['✨', '⭐', '🌟', '💫', '🎆', '🎊'];
        
        const sparkleInterval = setInterval(() => {
            // Check if one-last-thing page still exists
            if (!document.querySelector('.one-last-thing')) {
                clearInterval(sparkleInterval);
                return;
            }

            if (Math.random() > 0.6) {
                const sparkle = document.createElement('div');
                sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
                
                sparkle.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * 100}vw;
                    top: 100vh;
                    font-size: 1.5rem;
                    z-index: 4001;
                    animation: sparkleUp 6s linear forwards;
                    pointer-events: none;
                    opacity: 0.8;
                `;

                const sparkleStyle = document.createElement('style');
                sparkleStyle.textContent = `
                    @keyframes sparkleUp {
                        0% { 
                            transform: translateY(0) rotate(0deg); 
                            opacity: 0.8; 
                        }
                        100% { 
                            transform: translateY(-100vh) rotate(360deg); 
                            opacity: 0; 
                        }
                    }
                `;
                document.head.appendChild(sparkleStyle);

                document.body.appendChild(sparkle);
                
                setTimeout(() => {
                    if (sparkle.parentNode) {
                        document.body.removeChild(sparkle);
                    }
                }, 6000);
            }
        }, 1500);
    }

    createFinalFireworks() {
        const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#a8e6cf', '#ff8b94', '#c7ceea'];
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * 100}vw;
                    top: ${Math.random() * 100}vh;
                    width: 4px;
                    height: 4px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    border-radius: 50%;
                    z-index: 5001;
                    animation: finalExplode 2s ease-out forwards;
                    pointer-events: none;
                `;

                const fireworkStyle = document.createElement('style');
                fireworkStyle.textContent = `
                    @keyframes finalExplode {
                        0% {
                            transform: scale(1);
                            opacity: 1;
                        }
                        100% {
                            transform: scale(25);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(fireworkStyle);

                document.body.appendChild(firework);
                
                setTimeout(() => {
                    if (firework.parentNode) {
                        document.body.removeChild(firework);
                    }
                }, 2000);
            }, i * 200);
        }
    }

    addFlipBookFloatingElements() {
        const emojis = ['💖', '💕', '🎈', '🎉', '✨', '🌟', '💝', '🎀'];
        
        const floatingInterval = setInterval(() => {
            // Check if flip book still exists
            if (!document.querySelector('.flip-book-container')) {
                clearInterval(floatingInterval);
                return;
            }

            if (Math.random() > 0.7) {
                const emoji = emojis[Math.floor(Math.random() * emojis.length)];
                const floatingElement = document.createElement('div');
                floatingElement.textContent = emoji;
                
                floatingElement.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * 100}vw;
                    top: 100vh;
                    font-size: 1.8rem;
                    z-index: 3001;
                    animation: flipBookFloat 8s linear forwards;
                    pointer-events: none;
                    opacity: 0.8;
                `;

                const style = document.createElement('style');
                style.textContent = `
                    @keyframes flipBookFloat {
                        0% { 
                            transform: translateY(0) rotate(0deg); 
                            opacity: 0.8; 
                        }
                        100% { 
                            transform: translateY(-100vh) rotate(360deg); 
                            opacity: 0; 
                        }
                    }
                `;
                document.head.appendChild(style);

                document.body.appendChild(floatingElement);
                
                setTimeout(() => {
                    if (floatingElement.parentNode) {
                        document.body.removeChild(floatingElement);
                    }
                }, 8000);
            }
        }, 2000);
    }

    backToGallery() {
        const placeholder = document.querySelector('.next-feature-placeholder');
        const flipBook = document.querySelector('.flip-book-container');
        
        if (placeholder) {
            placeholder.style.animation = 'fadeOut 0.5s ease-in forwards';
            setTimeout(() => {
                document.body.removeChild(placeholder);
                // Recreate the photo gallery
                this.showPhotoGallery();
            }, 500);
        }
        
        if (flipBook) {
            flipBook.style.animation = 'fadeOut 0.5s ease-in forwards';
            setTimeout(() => {
                document.body.removeChild(flipBook);
                // Recreate the photo gallery
                this.showPhotoGallery();
            }, 500);
        }

        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    addGalleryFloatingElements() {
        const emojis = ['💖', '📸', '💝', '🌹', '✨', '🎀', '💕', '🌟'];
        
        setInterval(() => {
            if (Math.random() > 0.8) {
                const emoji = emojis[Math.floor(Math.random() * emojis.length)];
                const floatingElement = document.createElement('div');
                floatingElement.textContent = emoji;
                
                floatingElement.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * 100}vw;
                    top: 100vh;
                    font-size: 1.8rem;
                    z-index: 2003;
                    animation: galleryFloat 8s linear forwards;
                    pointer-events: none;
                    opacity: 0.7;
                `;

                const style = document.createElement('style');
                style.textContent = `
                    @keyframes galleryFloat {
                        0% { 
                            transform: translateY(0) rotate(0deg); 
                            opacity: 0.7; 
                        }
                        100% { 
                            transform: translateY(-100vh) rotate(360deg); 
                            opacity: 0; 
                        }
                    }
                `;
                document.head.appendChild(style);

                document.body.appendChild(floatingElement);
                
                setTimeout(() => {
                    if (floatingElement.parentNode) {
                        document.body.removeChild(floatingElement);
                    }
                }, 8000);
            }
        }, 2000);
    }

    setupMusicPlayer() {
        const playPauseBtn = document.getElementById('play-pause');
        const prevBtn = document.getElementById('prev-song');
        const nextBtn = document.getElementById('next-song');
        const playlistItems = document.querySelectorAll('.playlist-item');

        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousSong());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextSong());
        }

        playlistItems.forEach((item, index) => {
            item.addEventListener('click', () => this.selectSong(index));
        });
    }

    togglePlayPause() {
        const playPauseBtn = document.getElementById('play-pause');
        const songArtwork = document.querySelector('.song-artwork');
        
        this.isPlaying = !this.isPlaying;
        
        if (this.isPlaying) {
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            songArtwork.style.animation = 'pulse 1s infinite';
            this.showMusicNote();
        } else {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            songArtwork.style.animation = 'pulse 2s infinite';
        }
    }

    previousSong() {
        this.currentSong = this.currentSong > 0 ? this.currentSong - 1 : this.songs.length - 1;
        this.updateSongInfo();
    }

    nextSong() {
        this.currentSong = this.currentSong < this.songs.length - 1 ? this.currentSong + 1 : 0;
        this.updateSongInfo();
    }

    selectSong(index) {
        this.currentSong = index;
        this.updateSongInfo();
    }

    updateSongInfo() {
        const songTitle = document.getElementById('song-title');
        const songArtist = document.getElementById('song-artist');
        const playlistItems = document.querySelectorAll('.playlist-item');

        if (songTitle && songArtist) {
            songTitle.textContent = this.songs[this.currentSong].title;
            songArtist.textContent = this.songs[this.currentSong].artist;
        }

        // Update playlist active state
        playlistItems.forEach((item, index) => {
            if (index === this.currentSong) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    setupQuiz() {
        const quizOptions = document.querySelectorAll('.quiz-option');
        const restartBtn = document.getElementById('restart-quiz');

        quizOptions.forEach(option => {
            option.addEventListener('click', (e) => this.answerQuiz(e.target));
        });

        if (restartBtn) {
            restartBtn.addEventListener('click', () => this.restartQuiz());
        }
    }

    answerQuiz(selectedOption) {
        const currentQuestion = document.querySelector('.quiz-question.active');
        const options = currentQuestion.querySelectorAll('.quiz-option');
        
        // Disable all options
        options.forEach(option => {
            option.disabled = true;
            if (option.dataset.correct === 'true') {
                option.classList.add('correct');
            } else if (option === selectedOption) {
                option.classList.add('wrong');
            }
        });

        // Check if correct
        if (selectedOption.dataset.correct === 'true') {
            this.quizScore++;
            this.createCelebration();
        }

        // Move to next question or show results
        setTimeout(() => {
            this.nextQuizQuestion();
        }, 2000);
    }

    nextQuizQuestion() {
        const questions = document.querySelectorAll('.quiz-question');
        const currentQuestion = document.querySelector('.quiz-question.active');
        
        currentQuestion.classList.remove('active');
        this.currentQuizQuestion++;

        if (this.currentQuizQuestion < questions.length) {
            questions[this.currentQuizQuestion].classList.add('active');
        } else {
            this.showQuizResults();
        }
    }

    showQuizResults() {
        const quizContainer = document.querySelector('.quiz-container');
        const quizResult = document.querySelector('.quiz-result');
        const scoreElement = document.getElementById('quiz-score');

        quizContainer.style.display = 'none';
        quizResult.classList.remove('hidden');
        
        if (scoreElement) {
            scoreElement.textContent = this.quizScore;
        }

        // Celebrate if perfect score
        if (this.quizScore === 3) {
            this.createFireworks();
            setTimeout(() => {
                alert("Perfect score! I know you so well! 💕");
            }, 500);
        }
    }

    restartQuiz() {
        this.currentQuizQuestion = 0;
        this.quizScore = 0;
        
        const questions = document.querySelectorAll('.quiz-question');
        const quizContainer = document.querySelector('.quiz-container');
        const quizResult = document.querySelector('.quiz-result');
        
        // Reset all questions
        questions.forEach((question, index) => {
            question.classList.remove('active');
            const options = question.querySelectorAll('.quiz-option');
            options.forEach(option => {
                option.disabled = false;
                option.classList.remove('correct', 'wrong');
            });
        });

        // Show first question
        questions[0].classList.add('active');
        quizContainer.style.display = 'block';
        quizResult.classList.add('hidden');
    }

    createFireworks() {
        const fireworksContainer = document.getElementById('fireworks');
        const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#a8e6cf', '#ff8b94'];
        
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.className = 'firework';
                firework.style.left = Math.random() * 100 + 'vw';
                firework.style.top = Math.random() * 50 + 'vh';
                firework.style.background = colors[Math.floor(Math.random() * colors.length)];
                
                fireworksContainer.appendChild(firework);
                
                // Remove after animation
                setTimeout(() => {
                    if (firework.parentNode) {
                        firework.parentNode.removeChild(firework);
                    }
                }, 1500);
            }, i * 100);
        }
    }

    createCelebration() {
        // Create small celebration effect
        const celebration = document.createElement('div');
        celebration.textContent = '🎉';
        celebration.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 3rem;
            z-index: 1000;
            animation: celebrate 1s ease-out forwards;
            pointer-events: none;
        `;

        const style = document.createElement('style');
        style.textContent = `
            @keyframes celebrate {
                0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
                50% { transform: translate(-50%, -50%) scale(1.5); opacity: 1; }
                100% { transform: translate(-50%, -50%) scale(1) translateY(-100px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(celebration);
        setTimeout(() => document.body.removeChild(celebration), 1000);
    }

    showWishMessage() {
        const messages = [
            "May all your dreams come true! ✨",
            "You deserve all the happiness in the world! 💕",
            "Here's to another amazing year ahead! 🎊",
            "You're absolutely wonderful! 💖"
        ];

        const message = messages[Math.floor(Math.random() * messages.length)];
        
        const wishMessage = document.createElement('div');
        wishMessage.textContent = message;
        wishMessage.style.cssText = `
            position: fixed;
            top: 30%;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(45deg, #ff6b6b, #ff8e53);
            color: white;
            padding: 20px 30px;
            border-radius: 25px;
            font-size: 1.2rem;
            font-weight: 600;
            z-index: 1000;
            animation: wishFloat 3s ease-out forwards;
            box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);
        `;

        const style = document.createElement('style');
        style.textContent = `
            @keyframes wishFloat {
                0% { opacity: 0; transform: translateX(-50%) translateY(50px); }
                20% { opacity: 1; transform: translateX(-50%) translateY(0); }
                80% { opacity: 1; transform: translateX(-50%) translateY(0); }
                100% { opacity: 0; transform: translateX(-50%) translateY(-50px); }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(wishMessage);
        setTimeout(() => {
            if (wishMessage.parentNode) {
                document.body.removeChild(wishMessage);
            }
        }, 3000);
    }

    showMusicNote() {
        const musicNote = document.createElement('div');
        musicNote.textContent = '🎵';
        musicNote.style.cssText = `
            position: fixed;
            top: 20%;
            right: 10%;
            font-size: 2rem;
            z-index: 1000;
            animation: musicFloat 2s ease-out forwards;
            pointer-events: none;
        `;

        const style = document.createElement('style');
        style.textContent = `
            @keyframes musicFloat {
                0% { opacity: 1; transform: translateY(0) rotate(0deg); }
                100% { opacity: 0; transform: translateY(-100px) rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(musicNote);
        setTimeout(() => {
            if (musicNote.parentNode) {
                document.body.removeChild(musicNote);
            }
        }, 2000);
    }

    addFloatingElements() {
        // Add random floating emojis with more romantic options
        const emojis = ['💖', '💕', '💗', '💓', '💘', '💝', '💞', '💌', '❤️', '🩷', '💜', '🧡', '💛', '🌹', '💐', '🌸', '🦋', '✨', '🌟', '💫', '🥰', '😍', '😘', '🤍', '🌈'];
        
        setInterval(() => {
            if (Math.random() > 0.7) { // 30% chance every interval
                // Create 2-3 emojis at once
                const numberOfEmojis = Math.floor(Math.random() * 2) + 2; // 2 or 3 emojis
                
                for (let i = 0; i < numberOfEmojis; i++) {
                    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
                    const floatingElement = document.createElement('div');
                    floatingElement.textContent = emoji;
                    
                    // Vary positions and timing slightly for each emoji
                    const leftPosition = Math.random() * 100;
                    const delay = i * 500; // 0.5s delay between each emoji
                    const animationDuration = 7 + Math.random() * 3; // 7-10s duration
                    
                    floatingElement.style.cssText = `
                        position: fixed;
                        left: ${leftPosition}vw;
                        top: 100vh;
                        font-size: 1.5rem;
                        z-index: 100;
                        animation: gentleFloat${i} ${animationDuration}s linear forwards;
                        animation-delay: ${delay}ms;
                        pointer-events: none;
                        opacity: 0.2;
                    `;

                    // Create unique animation for each emoji to avoid conflicts
                    const style = document.createElement('style');
                    style.textContent = `
                        @keyframes gentleFloat${i} {
                            0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.7; }
                            10% { opacity: 1; }
                            90% { opacity: 0.8; }
                            100% { transform: translateY(-100vh) translateX(${(Math.random() - 0.5) * 300}px) rotate(360deg); opacity: 0; }
                        }
                    `;
                    document.head.appendChild(style);

                    document.body.appendChild(floatingElement);
                    
                    setTimeout(() => {
                        if (floatingElement.parentNode) {
                            document.body.removeChild(floatingElement);
                        }
                    }, (animationDuration * 1000) + delay);
                }
            }
        }, 3000);
    }

    playSuccessSound() {
        // Create a simple audio context for success sound (optional)
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            // Audio context not supported, that's okay
            console.log('Audio context not supported');
        }
    }
}

// Initialize the birthday surprise when the page loads
const birthdaySurprise = new BirthdaySurprise();
