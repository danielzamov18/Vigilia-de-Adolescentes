// Variables globales
let countdownInterval;
const targetDate = new Date('2025-09-05T20:00:00').getTime();

// Función principal de inicialización
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎉 Inicializando aplicación...');
    
    // Inicializar componentes
    initParticles();
    initCountdown();
    initButtons();
    
    console.log('✅ Aplicación inicializada');
});

// Inicializar todos los botones
function initButtons() {
    console.log('🔧 Configurando botones...');
    
    // Botón principal del hero
    const heroButton = document.getElementById('hero-button');
    if (heroButton) {
        heroButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🎯 Clic en botón héroe - mostrando información del evento');
            showEventInfo();
        });
        console.log('✅ Botón héroe configurado');
    } else {
        console.error('❌ Botón héroe no encontrado');
    }
    
    // Botón de actividades
    const activitiesButton = document.getElementById('activities-button');
    if (activitiesButton) {
        activitiesButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🎯 Clic en botón actividades');
            showActivities();
        });
        console.log('✅ Botón actividades configurado');
    } else {
        console.warn('⚠️ Botón actividades no encontrado (se configurará cuando sea visible)');
    }
    
    // Tarjetas de actividades - usar delegación de eventos
    document.addEventListener('click', function(e) {
        const activityCard = e.target.closest('.activity-card');
        if (activityCard) {
            const activity = activityCard.getAttribute('data-activity');
            console.log(`🎯 Clic en actividad: ${activity}`);
            handleActivityClick(activity, activityCard);
        }
    });
    
    console.log('✅ Event listeners configurados');
}

// Crear partículas animadas
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) {
        console.warn('⚠️ Contenedor de partículas no encontrado');
        return;
    }
    
    const particleCount = window.innerWidth < 768 ? 30 : 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
    
    console.log(`✨ ${particleCount} partículas creadas`);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Posición aleatoria
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Propiedades aleatorias
    const size = Math.random() * 4 + 1;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.opacity = Math.random() * 0.9 + 0.3;
    particle.style.animationDelay = Math.random() * 6 + 's';
    
    container.appendChild(particle);
}

// Inicializar contador regresivo
function initCountdown() {
    if (!document.getElementById('days')) {
        console.warn('⚠️ Elementos del contador no encontrados');
        return;
    }
    
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
    console.log('⏰ Contador iniciado');
}

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    const elements = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };
    
    // Verificar que todos los elementos existen
    if (!elements.days || !elements.hours || !elements.minutes || !elements.seconds) {
        console.warn('⚠️ Algunos elementos del contador no encontrados');
        return;
    }
    
    if (distance < 0) {
        clearInterval(countdownInterval);
        const countdownContainer = document.getElementById('countdown');
        if (countdownContainer) {
            countdownContainer.innerHTML = '<div class="countdown-item"><span class="countdown-number">¡Llegó!</span><span class="countdown-label">El día</span></div>';
        }
        return;
    }
    
    const time = {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
    };
    
    elements.days.textContent = String(time.days).padStart(2, '0');
    elements.hours.textContent = String(time.hours).padStart(2, '0');
    elements.minutes.textContent = String(time.minutes).padStart(2, '0');
    elements.seconds.textContent = String(time.seconds).padStart(2, '0');
}

// Mostrar información del evento
function showEventInfo() {
    console.log('📅 Mostrando información del evento');
    
    const heroSection = document.getElementById('hero');
    const eventSection = document.getElementById('event-info');
    
    if (!heroSection) {
        console.error('❌ Sección hero no encontrada');
        return;
    }
    
    if (!eventSection) {
        console.error('❌ Sección event-info no encontrada');
        return;
    }
    
    console.log('🔄 Ocultando hero section...');
    
    // Ocultar hero con transición suave
    heroSection.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    heroSection.style.opacity = '0';
    heroSection.style.transform = 'translateY(-30px)';
    
    setTimeout(() => {
        // Ocultar completamente el hero
        heroSection.classList.add('hidden');
        console.log('✅ Hero section oculta');
        
        // Mostrar sección de evento
        eventSection.classList.remove('hidden');
        eventSection.style.opacity = '0';
        eventSection.style.transform = 'translateY(30px)';
        
        console.log('🔄 Mostrando event section...');
        
        // Animar entrada
        requestAnimationFrame(() => {
            eventSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            eventSection.style.opacity = '1';
            eventSection.style.transform = 'translateY(0)';
            
            console.log('✅ Event section visible');
            
            // Configurar botón de actividades si existe
            setTimeout(() => {
                const activitiesButton = document.getElementById('activities-button');
                if (activitiesButton && !activitiesButton.hasAttribute('data-configured')) {
                    activitiesButton.addEventListener('click', function(e) {
                        e.preventDefault();
                        console.log('🎯 Clic en botón actividades (configurado dinámicamente)');
                        showActivities();
                    });
                    activitiesButton.setAttribute('data-configured', 'true');
                    console.log('✅ Botón actividades configurado dinámicamente');
                }
            }, 100);
            
            // Animar detalles
            animateEventDetails();
        });
        
    }, 500);
    
    // Scroll suave al top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Animar detalles del evento
function animateEventDetails() {
    const details = document.querySelectorAll('.event-detail');
    console.log(`🎬 Animando ${details.length} detalles del evento`);
    
    details.forEach((detail, index) => {
        detail.style.opacity = '0';
        detail.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            detail.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            detail.style.opacity = '1';
            detail.style.transform = 'translateX(0)';
        }, index * 150);
    });
}

// Mostrar actividades
function showActivities() {
    console.log('🎭 Mostrando actividades');
    
    const eventSection = document.getElementById('event-info');
    const activitiesSection = document.getElementById('activities');
    
    if (!eventSection) {
        console.error('❌ Sección event-info no encontrada');
        return;
    }
    
    if (!activitiesSection) {
        console.error('❌ Sección activities no encontrada');
        return;
    }
    
    console.log('🔄 Ocultando event section...');
    
    // Ocultar sección de evento
    eventSection.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    eventSection.style.opacity = '0';
    eventSection.style.transform = 'translateY(-30px)';
    
    setTimeout(() => {
        eventSection.classList.add('hidden');
        console.log('✅ Event section oculta');
        
        // Mostrar actividades
        activitiesSection.classList.remove('hidden');
        activitiesSection.style.opacity = '0';
        activitiesSection.style.transform = 'translateY(30px)';
        
        console.log('🔄 Mostrando activities section...');
        
        requestAnimationFrame(() => {
            activitiesSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            activitiesSection.style.opacity = '1';
            activitiesSection.style.transform = 'translateY(0)';
            
            console.log('✅ Activities section visible');
            
            // Animar tarjetas
            animateActivityCards();
        });
        
    }, 500);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Animar tarjetas de actividades
function animateActivityCards() {
    const cards = document.querySelectorAll('.activity-card');
    console.log(`🎬 Animando ${cards.length} tarjetas de actividades`);
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) scale(0.9)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, index * 100);
    });
}

// Manejar clic en tarjetas de actividades
function handleActivityClick(activity, cardElement) {
    console.log(`🎯 Actividad seleccionada: ${activity}`);
    
    // Efecto visual de clic
    cardElement.style.transform = 'scale(0.95)';
    setTimeout(() => {
        cardElement.style.transform = 'scale(1)';
    }, 150);
    
    // Mostrar detalles especiales para disfraces
    if (activity === 'disfraces') {
        showCostumeDetails();
    } else {
        // Efecto de destello para otras actividades
        createSparkleEffect(cardElement);
        
        // Efecto especial para oración sin descripción
        if (activity === 'oracion') {
            showPrayerEffect(cardElement);
        }
    }
}

// Efecto especial para la actividad de oración
function showPrayerEffect(cardElement) {
    console.log('🙏 Efecto especial de oración');
    
    const prayerGlow = document.createElement('div');
    prayerGlow.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, rgba(255, 215, 0, 0.3), rgba(255, 255, 255, 0.2));
        border-radius: var(--radius-lg);
        pointer-events: none;
        z-index: 1;
        animation: prayerGlow 2s ease-in-out;
    `;
    
    cardElement.style.position = 'relative';
    cardElement.appendChild(prayerGlow);
    
    // Añadir keyframes para la animación si no existen
    if (!document.getElementById('prayer-animation-style')) {
        const style = document.createElement('style');
        style.id = 'prayer-animation-style';
        style.textContent = `
            @keyframes prayerGlow {
                0% { opacity: 0; transform: scale(0.8); }
                50% { opacity: 1; transform: scale(1.1); }
                100% { opacity: 0; transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        if (prayerGlow.parentNode) {
            prayerGlow.remove();
        }
    }, 2000);
}

// Mostrar detalles de disfraces
function showCostumeDetails() {
    console.log('👗 Mostrando detalles de disfraces');
    
    const costumeDetail = document.getElementById('disfraces-detail');
    if (!costumeDetail) {
        console.warn('⚠️ Sección de detalles de disfraces no encontrada');
        return;
    }
    
    if (costumeDetail.classList.contains('hidden')) {
        costumeDetail.classList.remove('hidden');
        costumeDetail.style.opacity = '0';
        costumeDetail.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            costumeDetail.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            costumeDetail.style.opacity = '1';
            costumeDetail.style.transform = 'translateY(0)';
            
            // Scroll suave hacia la sección
            setTimeout(() => {
                costumeDetail.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 300);
        }, 100);
    } else {
        // Efecto de pulso si ya está visible
        const section = costumeDetail.querySelector('.costume-section');
        if (section) {
            section.style.animation = 'pulse 1s ease-in-out';
            setTimeout(() => {
                section.style.animation = '';
            }, 1000);
        }
    }
}

// Crear efecto de destello mejorado
function createSparkleEffect(element) {
    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100px;
        height: 100px;
        background: radial-gradient(circle, rgba(255, 215, 0, 0.8) 0%, rgba(255, 255, 255, 0.4) 30%, transparent 70%);
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        pointer-events: none;
        z-index: 10;
        transition: all 0.8s ease-out;
    `;
    
    element.style.position = 'relative';
    element.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.style.transform = 'translate(-50%, -50%) scale(2.5)';
        sparkle.style.opacity = '0';
    }, 50);
    
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.remove();
        }
    }, 800);
}

// Efectos de hover mejorados para tarjetas
document.addEventListener('mouseenter', function(e) {
    const card = e.target.closest('.activity-card');
    if (card) {
        card.style.transition = 'all 0.3s ease';
        card.style.transform = 'translateY(-10px) scale(1.05)';
        
        const icon = card.querySelector('.activity-icon, .activity-image');
        if (icon) {
            if (icon.classList.contains('activity-icon')) {
                icon.style.textShadow = '0 0 20px rgba(255, 215, 0, 1)';
                icon.style.transform = 'scale(1.1)';
            } else {
                icon.style.filter = 'drop-shadow(0 0 20px rgba(255, 215, 0, 1))';
                icon.style.transform = 'scale(1.1)';
            }
            icon.style.transition = 'all 0.3s ease';
        }
    }
}, true);

document.addEventListener('mouseleave', function(e) {
    const card = e.target.closest('.activity-card');
    if (card) {
        card.style.transform = 'translateY(0) scale(1)';
        
        const icon = card.querySelector('.activity-icon, .activity-image');
        if (icon) {
            if (icon.classList.contains('activity-icon')) {
                icon.style.textShadow = '0 0 10px rgba(255, 215, 0, 0.5)';
            } else {
                icon.style.filter = 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.5))';
            }
            icon.style.transform = 'scale(1)';
        }
    }
}, true);

// Recrear partículas al redimensionar
window.addEventListener('resize', function() {
    const container = document.getElementById('particles');
    if (container) {
        container.innerHTML = '';
        initParticles();
    }
});

// Función de debug mejorada
function debug() {
    console.log('🔍 Estado de la aplicación:');
    console.log('- Hero:', !!document.getElementById('hero'));
    console.log('- Event Info:', !!document.getElementById('event-info'));
    console.log('- Activities:', !!document.getElementById('activities'));
    console.log('- Botón héroe:', !!document.getElementById('hero-button'));
    console.log('- Botón actividades:', !!document.getElementById('activities-button'));
    console.log('- Partículas:', document.querySelectorAll('.particle').length);
    console.log('- Contador regresivo funcionando:', !!countdownInterval);
    
    // Verificar actividades
    const activityCards = document.querySelectorAll('.activity-card');
    console.log('- Actividades disponibles:', activityCards.length);
    activityCards.forEach(card => {
        const activity = card.getAttribute('data-activity');
        const hasDescription = !!card.querySelector('p');
        console.log(`  - ${activity}: ${hasDescription ? 'con descripción' : 'sin descripción'}`);
    });
    
    // Verificar la actividad de oración específicamente
    const oracionCard = document.querySelector('.activity-card[data-activity="oracion"]');
    if (oracionCard) {
        const oracionDescription = oracionCard.querySelector('p');
        console.log('- Oración sin descripción:', !oracionDescription);
        if (oracionDescription) {
            console.warn('⚠️ La tarjeta de oración tiene descripción cuando no debería');
        }
    }
}

// Ejecutar debug después de la carga
setTimeout(debug, 1500);