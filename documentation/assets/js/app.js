"use strict";

$(document).ready(function () {
  //preloader
  $(".preloader")
    .delay(300)
    .animate(
      {
        opacity: "0",
      },
      300,
      function () {
        $(".preloader").css("display", "none");
      }
    );
});

// function to set a given theme/color-scheme
function setTheme(themeName) {
  localStorage.setItem("theme", themeName);
  document.documentElement.className = themeName;
}

// Immediately invoked function to set the theme on initial load
(function () {
  if (localStorage.getItem("theme") === "theme-dark") {
    setTheme("theme-dark");
  } else {
    setTheme("theme-light");
  }
})();


$(".sidebar-open-btn").on("click", function () {
  $(".nams__sidebar").addClass("active");
});
$(".sidebar-close-btn").on("click", function () {
  $(".nams__sidebar").removeClass("active");
});

$(document).ready(function () {
  // Mobile Menu
  const sidebarToggle = $(".sidebar-toggler");
  if (sidebarToggle) {
    sidebarToggle.on("click", function () {
      $("body").toggleClass("sidebar-open");
      $(this).toggleClass("active");
    });
  }
  // Mobile Menu End
});

document.addEventListener('DOMContentLoaded', function() {
    var sections = document.querySelectorAll('.doc__body > div');
    var sidebarLinks = document.querySelectorAll('#nams__sidebar-nav a');
    var buffer = 50; // Buffer in pixels

    // Debounce function to limit the frequency of the scroll event handler
    function debounce(func, wait) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                func.apply(context, args);
            }, wait);
        };
    }

    function updateActiveSection() {
        var scrollPos = window.scrollY;
        var windowHeight = window.innerHeight;
        var documentHeight = document.body.scrollHeight;

        sections.forEach(function(section, index) {
            var offsetTop = section.offsetTop - buffer;
            var offsetBottom = offsetTop + section.offsetHeight + buffer;

            if (index === sections.length - 1) {
                // For the last section, we check if we've scrolled to the bottom of the page
                if (scrollPos + windowHeight >= documentHeight - buffer) {
                    setActiveLink(section);
                }
            } else {
                if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
                    setActiveLink(section);
                }
            }
        });
    }

    function setActiveLink(section) {
        var sectionId = section.getAttribute('id');
        
        sidebarLinks.forEach(function(link) {
            link.parentNode.classList.remove('active');
        });

        var activeLink = document.querySelector('#nams__sidebar-nav a[href="#' + sectionId + '"]');
        if (activeLink) {
            activeLink.parentNode.classList.add('active');
        }
    }

    var debouncedUpdateActiveSection = debounce(updateActiveSection, 100);
    window.addEventListener('scroll', debouncedUpdateActiveSection);
    window.addEventListener('resize', debouncedUpdateActiveSection);
    updateActiveSection();

    // Ensure the active state updates correctly when clicking on sidebar links
    sidebarLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            var targetId = this.getAttribute('href').substring(1);
            var targetSection = document.getElementById(targetId);
            setActiveLink(targetSection);
        });
    });
});


