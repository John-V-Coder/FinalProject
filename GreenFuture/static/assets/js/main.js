/**
 * Green Future Society - Custom JavaScript
 * Replaces Bootstrap functionality for the Green Future Society website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        preloader.classList.add('hide-preloader');
        setTimeout(() => {
          preloader.remove();
        }, 500);
      });
    }

    // Dropdown toggle
    const toggleButton = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if(toggleButton && dropdownMenu) {
        toggleButton.addEventListener('click', (e) => {
          e.preventDefault();
          if (dropdownMenu.style.display === 'flex') {
            dropdownMenu.style.display = 'none';
          } else {
            dropdownMenu.style.display = 'flex';
            dropdownMenu.style.flexDirection = 'column';
          }
        });
    
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
          if (!toggleButton.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.style.display = 'none';
          }
        });
    }
  
    // Mobile Navigation Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.navmenu');
    
    if (mobileNavToggle && navMenu) {
      mobileNavToggle.addEventListener('click', function() {
        navMenu.classList.toggle('mobile-nav-active');
        this.classList.toggle('bi-x');
        this.classList.toggle('bi-list');
      });
    }
  
    // Mobile Dropdown Toggle
    const mobileDropdownToggles = document.querySelectorAll('.toggle-dropdown');
    
    mobileDropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', function(e) {
        if (window.innerWidth < 1200) {
          e.preventDefault();
          this.closest('.dropdown').classList.toggle('mobile-dropdown-active');
        }
      });
    });
  
    // Close mobile nav when clicking outside
    document.addEventListener('click', function(e) {
      if (navMenu && navMenu.classList.contains('mobile-nav-active') && 
          !e.target.closest('.navmenu') && 
          !e.target.closest('.mobile-nav-toggle')) {
        navMenu.classList.remove('mobile-nav-active');
        if (mobileNavToggle) {
          mobileNavToggle.classList.remove('bi-x');
          mobileNavToggle.classList.add('bi-list');
        }
      }
    });
  
    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });
    }
  
    // Scroll to top button
    const scrollTop = document.querySelector('.scroll-top');
    if (scrollTop) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
          scrollTop.classList.add('active');
        } else {
          scrollTop.classList.remove('active');
        }
      });
  
      scrollTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  
    // Custom Alert/Message Dismissal
    const alertCloseButtons = document.querySelectorAll('.alert .btn-close');
    alertCloseButtons.forEach(button => {
      button.addEventListener('click', function() {
        const alert = this.closest('.alert');
        alert.style.opacity = '0';
        setTimeout(() => {
          alert.remove();
        }, 300);
      });
    });
  
    // Form Validation
    const forms = document.querySelectorAll('.needs-validation');
    
    forms.forEach(form => {
      form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          
          const invalidInputs = form.querySelectorAll(':invalid');
          invalidInputs.forEach(input => {
            input.classList.add('is-invalid');
            const feedback = document.createElement('div');
            feedback.className = 'invalid-feedback';
            feedback.textContent = input.validationMessage || 'This field is required';
            if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('invalid-feedback')) {
              input.insertAdjacentElement('afterend', feedback);
            }
          });
        }
        
        form.classList.add('was-validated');
      }, false);
      
      form.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('input', function() {
          if (this.checkValidity()) {
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
          } else {
            this.classList.remove('is-valid');
            this.classList.add('is-invalid');
          }
        });
      });
    });
  
    // Animations on scroll with AOS-like functionality
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    if (animatedElements.length > 0) {
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
              rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
              rect.bottom >= 0
            );
        }
        
        function handleScrollAnimations() {
            animatedElements.forEach(element => {
              if (isInViewport(element) && !element.classList.contains('aos-animate')) {
                element.classList.add('aos-animate');
              }
            });
        }

        const style = document.createElement('style');
        style.textContent = `
          [data-aos] {
            opacity: 0;
            transition: opacity 0.6s ease, transform 0.6s ease;
          }
          [data-aos].aos-animate {
            opacity: 1;
            transform: translateZ(0);
          }
          [data-aos="fade-in"] {
            opacity: 0;
          }
          [data-aos="fade-up"] {
            transform: translate3d(0, 20px, 0);
          }
          [data-aos="fade-down"] {
            transform: translate3d(0, -20px, 0);
          }
          [data-aos="fade-left"] {
            transform: translate3d(-20px, 0, 0);
          }
          [data-aos="fade-right"] {
            transform: translate3d(20px, 0, 0);
          }
          [data-aos="zoom-in"] {
            transform: scale3d(0.9, 0.9, 0.9);
          }
        `;
        document.head.appendChild(style);
        
        window.addEventListener('scroll', handleScrollAnimations);
        window.addEventListener('resize', handleScrollAnimations);
        window.addEventListener('orientationchange', handleScrollAnimations);
        handleScrollAnimations(); // Run on load
        setTimeout(handleScrollAnimations, 100);
    }

    // progress tracker
    let currentStep = 1;
    function updateProgress(step) {
      for (let i = 1; i <= 4; i++) {
        const stepEl = document.getElementById('step' + i);
        if(stepEl) {
            if (i < step) {
              stepEl.classList.add('completed');
            } else if (i === step) {
              stepEl.classList.add('active');
            } else {
              stepEl.classList.remove('active', 'completed');
            }
        }
      }
    }
    if(document.getElementById('step1')){
        updateProgress(currentStep);
        setInterval(function () {
          if (currentStep < 4) {
            currentStep++;
            updateProgress(currentStep);
          }
        }, 3000);
    }
  
    // Light gallery functionality
    const galleryElements = document.querySelectorAll('.glightbox');
    if (galleryElements.length > 0) {
      galleryElements.forEach(element => {
        element.addEventListener('click', function(e) {
          e.preventDefault();
          
          const href = this.getAttribute('href');
          const lightbox = document.createElement('div');
          lightbox.className = 'custom-lightbox-overlay';
          lightbox.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.9); display: flex; align-items: center; justify-content: center; z-index: 9999; opacity: 0; transition: opacity 0.3s ease;';
          
          const img = document.createElement('img');
          img.src = href;
          img.style.cssText = 'max-width: 90%; max-height: 90%; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5); transform: scale(0.9); transition: transform 0.3s ease;';
          
          const closeBtn = document.createElement('button');
          closeBtn.innerText = '×';
          closeBtn.style.cssText = 'position: absolute; top: 20px; right: 20px; border: none; background: transparent; color: white; font-size: 30px; cursor: pointer;';
          
          lightbox.appendChild(img);
          lightbox.appendChild(closeBtn);
          document.body.appendChild(lightbox);
          
          document.body.style.overflow = 'hidden';
          
          setTimeout(() => {
            lightbox.style.opacity = '1';
            img.style.transform = 'scale(1)';
          }, 50);
          
          const closeLightbox = () => {
            lightbox.style.opacity = '0';
            img.style.transform = 'scale(0.9)';
            setTimeout(() => {
              document.body.removeChild(lightbox);
              document.body.style.overflow = '';
            }, 300);
          };
          
          closeBtn.addEventListener('click', closeLightbox);
          lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
          document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
        });
      });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
    });
    
    // Add parallax effect to background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
          heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Add intersection observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('[class*="animate-"]').forEach(el => {
      el.style.animationPlayState = 'paused';
      animationObserver.observe(el);
    });

    // Counter animation
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
      const speed = 200;
  
      const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target');
            
            const updateCount = () => {
              const count = +counter.innerText;
              const increment = target / speed;
  
              if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 15);
              } else {
                counter.innerText = target.toLocaleString();
              }
            };
  
            updateCount();
            observer.unobserve(counter);
          }
        });
      }, { threshold: 0.5 });
  
      counters.forEach(counter => {
        counterObserver.observe(counter);
      });
    }

    //floating labels
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
      const randomLeft = Math.floor(Math.random() * 100); // percent
      const randomDelay = Math.random() * 10; // seconds
      particle.style.left = `${randomLeft}%`;
      particle.style.animationDelay = `${randomDelay}s`;
    });
});