$(document).ready(function () {
  // favicon based on color scheme
  function setFavicon() {
    const darkFavicon = $("#browser-dark-theme-favicon");
    const lightFavicon = $("#browser-light-theme-favicon");
    if (darkFavicon.length > 0 && lightFavicon.length > 0) {
      const isDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (isDarkMode) {
        lightFavicon.removeAttr("href");
        // lightFavicon.attr("disabled", "disabled");
      } else {
        darkFavicon.removeAttr("href");
        // darkFavicon.attr("disabled", "disabled");
      }
    }
  }
  setFavicon();
  // listen for changes in the color scheme and update the favicon
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      setFavicon();
    });
  $(".navbar-toggler").on("click", function () {
    // Toggle the "show" class on the navbar-nav element
    $(".navbar-nav").toggleClass("show");
  });
  // Add a click event listener to the document
  $(document).on("click", function (event) {
    // Check if the clicked element is not part of the navbar
    if (!$(event.target).closest(".navbar").length) {
      // Remove the "show" class from the navbar-nav element
      $(".navbar-nav").removeClass("show");
    }
  });
  //navbar ainmation
  $(window).scroll(function () {
    var appScroll = $(document).scrollTop();
    if (appScroll >= 1) {
      $("header").addClass("headerAnimate");
    } else {
      $("header").removeClass("headerAnimate");
    }
  });
  //mainSlider
  function calculateAutoplayDelay(video, minimumDelay) {
    if (video) {
      const videoDuration = video.duration * 1000;
      return Math.max(videoDuration, minimumDelay);
    }
    return minimumDelay;
    x;
  }
  // main Slider
  const mainSlider = new Swiper(".mainSlider", {
    spaceBetween: 0,
    loop: true,
    centeredSlides: true,
    speed: 500,
    effect: "fade",
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".mainSliderPagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".mainSliderNext",
      prevEl: ".mainSliderPrev",
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    on: {
      init: function () {
        setAutoplayDelay(this);
      },
      slideChange: function () {
        pauseAllVideos();
        const activeSlide = this.slides[this.activeIndex];
        const activeVideo = activeSlide.querySelector(".mainSlider video");
        if (activeVideo) {
          activeVideo.play();
          setAutoplayDelay(this);
        }
      },
    },
  });
  //category Slider
  var categorySlider = new Swiper(".categorySlider", {
    pagination: {
      el: ".categorySliderPagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".categorySliderNext",
      prevEl: ".categorySliderPrev",
    },
    // centeredSlides: true,
    // loop: true,
    slidesPerView: "auto",
    spaceBetween: 10,
    speed: 1000,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      0: {
        slidesPerView: 2,
      },
      576: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 4,
      },
      991: {
        slidesPerView: 5,
      },
      1200: {
        slidesPerView: 6,
      },
    },
  });
  function setAutoplayDelay(slider) {
    const activeSlide = slider.slides[slider.activeIndex];
    const activeVideo = activeSlide.querySelector(".mainSlider video");
    const autoplayDelay = calculateAutoplayDelay(activeVideo, 8000);
    slider.params.autoplay.delay = autoplayDelay;
    slider.autoplay.start();
    console.log("Swiper Autoplay Delay:", autoplayDelay);
  }
  // Function to pause all videos
  function pauseAllVideos() {
    const allVideos = document.querySelectorAll(".mainSlider video");
    allVideos.forEach(function (video) {
      video.pause();
    });
  }
  // text length
  $(".project .projectInfo .description").each(function () {
    var text = $(this).text();
    if (text.length > 90) {
      var truncatedText =
        $.trim(text).substring(0, 90).split(" ").slice(0, -1).join(" ") + "...";
      $(this).text(truncatedText);
    }
  });
  // quantity
  $(".plus").click(function () {
    $(this)
      .prev()
      .val(+$(this).prev().val() + 1);
  });
  $(".min").click(function () {
    if ($(this).next().val() > 0)
      $(this)
        .next()
        .val(+$(this).next().val() - 1);
  });
  $(".copyText").click(function () {
    var text = $(this).prev("p").text();
    navigator.clipboard.writeText(text).then(function () {
      $("#alertMessage").slideDown().delay(1500).fadeOut();
    });
  });
  $(".project , .projectDetailsPage").each(function () {
    var $project = $(this);
    var $gifts = $project.find(".gifts");
    var $inputDiv = $project.find(".inputDiv");
    var $quantity = $project.find(".quantity");
    $inputDiv.hide();
    $quantity.hide();
    $gifts.find(".gift, .donate").click(function () {
      $gifts.find(".gift, .donate").removeClass("active");
      $(this).addClass("active");
      $project.find(".action span").remove();
      if ($(this).hasClass("gift")) {
        $quantity.show();
        $inputDiv.hide();
      } else if ($(this).hasClass("donate")) {
        $quantity.hide();
        $inputDiv.show().find("input").focus();
      }
    });
  });
});

// theme costomization
$(document).ready(function () {
  // Retrieve values ​​from local storage if available
  var mainColor = localStorage.getItem('mainColor');
  var mainColor20 = localStorage.getItem('mainColor20');
  var mainColor10 = localStorage.getItem('mainColor10');

if (mainColor) {
      $(':root').css('--mainColor', mainColor);
      $('#colorInput').val(mainColor);
    }
  // Update values ​​if available in local storage
  if (mainColor) $(':root').css('--mainColor', mainColor);
  if (mainColor20) $(':root').css('--mainColor20', mainColor20);
  if (mainColor10) $(':root').css('--mainColor10', mainColor10);

  $('#colorInput').on('input', function () {
    var newColor = $(this).val();
    $(':root').css('--mainColor', newColor);
    $(':root').css('--mainColor20', newColor + '33'); // Adds 20% opacity
    $(':root').css('--mainColor10', newColor + '1a'); // Adds 10% opacity


    // Save the values ​​to local storage
    localStorage.setItem('mainColor', newColor);
    localStorage.setItem('mainColor20', newColor + '33');
    localStorage.setItem('mainColor10', newColor + '1a');
  });
});

// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
$(document).ready(function () {
  //spinner
  $(".preloader").delay(1000).fadeOut(300);
  //aos Delay
  if ($(window).width() > 768) {
    $("section").each(function () {
      const sectionDivs = $(this).find("[data-aos]");
      sectionDivs.each(function (index) {
        // Check if data-aos-delay is not already set
        if (!$(this).attr("data-aos-delay")) {
          $(this).attr("data-aos-delay", (index + 1) * 100);
        }
      });
    });
  }
  // aos
  AOS.init({
    offset: 20,
    delay: 50,
    duration: 750,
    once: true,
  });
  // lozad
  const observer = lozad(".lazy", {
    loaded: function (el) {
      el.parentNode.classList.add("loaded");
    },
  });
  observer.observe();
  // parallax
  var parallaxImage = document.getElementsByClassName("parallax");
  new simpleParallax(parallaxImage, {
    delay: 1,
    transition: "cubic-bezier(0,0,0,1)",
  });
  // tooltip
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );
  // counter up
  const counterUp = window.counterUp.default;
  const callback = (entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      if (entry.isIntersecting && !el.classList.contains("is-visible")) {
        counterUp(el, {
          duration: 3000,
          delay: 16,
        });
        el.classList.add("is-visible");
      }
    });
  };
  const IO = new IntersectionObserver(callback, { threshold: 1 });
  const elements = document.querySelectorAll(".counterUp");
  elements.forEach((el) => IO.observe(el));
});
function highlight(el) {
  el.previousElementSibling.classList.add("h");
}
function dehighlight(el) {
  if (el.value === "") {
    el.previousElementSibling.classList.remove("h");
  }
}
// profile Image Input
document
  .getElementById("profileImageInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document
          .getElementById("profileImagePreview")
          .setAttribute("src", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  });
