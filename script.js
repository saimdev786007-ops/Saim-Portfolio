/* ========================================================================= */
/* SAIM 3.0: Interactive & Simulated 3D Logic */
/* ========================================================================= */

$(document).ready(function() {
    
    // --- 1. SIMULATED 3D BACKGROUND EFFECT (Vanilla JS/CSS) ---
    // This simulates a futuristic "starfield" or "data grid" effect without heavy Three.js library.
    const bgContainer = document.getElementById('three-js-background');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.width = (Math.random() * 2 + 1) + 'px'; // 1px to 3px wide
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = 'var(--color-accent)';
        particle.style.position = 'absolute';
        particle.style.top = (Math.random() * 100) + '%';
        particle.style.left = (Math.random() * 100) + '%';
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        particle.style.boxShadow = '0 0 5px var(--color-accent)';
        
        // Custom animation properties
        particle.style.animation = `float ${Math.random() * 10 + 5}s linear infinite, flicker ${Math.random() * 5 + 2}s steps(1) infinite`;
        
        bgContainer.appendChild(particle);
    }

    // Add CSS for particle animation to style.css (or inline for quick test):
    /*
        @keyframes float {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(calc(50vw - 100%), calc(50vh - 100%)); }
        }
        @keyframes flicker {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
        }
    */
    // NOTE: This requires adding the particle CSS to the stylesheet for the effect to work.

    // --- 2. SMOOTH SCROLLING & NAV ACTIVE STATE (jQuery) ---
    const headerHeight = $('#header').outerHeight();

    $('a[href*="#"]').on('click', function(e) {
        if (this.hash !== "") {
            e.preventDefault();
            const hash = this.hash;
            if ($(hash).length) {
                $('html, body').animate({
                    scrollTop: $(hash).offset().top - headerHeight
                }, 700);
            }
        }
    });

    // Update Nav Active State on Scroll (Minimalist version)
    $(window).on('scroll', function() {
        const scrollPos = $(document).scrollTop() + headerHeight + 50;
        
        $('.nav-link').each(function() {
            const currLink = $(this);
            const refElement = $(currLink.attr('href'));

            if (refElement.length && refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('.nav-link').removeClass('active');
                currLink.addClass('active');
            } else {
                currLink.removeClass('active');
            }
        });
    });

    // --- 3. TERMINAL CONTACT FORM (jQuery AJAX Simulation) ---
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        const $form = $(this);
        const $submitBtn = $form.find('.terminal-btn');
        const $statusMsg = $('#form-status');
        
        // Basic terminal output simulation
        const name = $('#term-name').val().trim();
        if (!name) {
             $statusMsg.html('<span style="color:red;">Error: User_ID not provided. Abort.</span>');
            return;
        }

        $submitBtn.prop('disabled', true).text('EXECUTING // WAIT...');
        $statusMsg.html(`<span style="color:var(--color-accent);">~$ Pushing payload to SAIM_server...</span>`);

        // Simulate Network Delay
        setTimeout(function() {
            // Success Logic
            const commandOutput = `Payload accepted. Response code: 200 OK. [${name}] request logged. SAIM will review.`;
            $statusMsg.html(`<span style="color:#50fa7b;">~$ ${commandOutput}</span>`);
            $form[0].reset();
            
            // Re-enable button
            $submitBtn.prop('disabled', false).text('SEND // EXECUTE');
        }, 2000); 
    });

    // --- 4. PROJECT CARD INTERACTION (Holographic Pop-up) ---
    $('.project-card').on('click', function() {
        const projectId = $(this).data('project-id');
        // In a real advanced setup, this would trigger an AJAX call to load project details into a holographic modal window.
        
        // Simple Console Log Action
        console.log(`Command: RUN_PROJECT_VIEWER('${projectId}')`);
        alert(`Launching advanced details for project: ${projectId.toUpperCase()}. (Requires Modal Implementation)`);
    });

});