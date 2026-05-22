(function () {
  const config = window.siteConfig;
  const app = document.getElementById("app");

  if (!config || !app) {
    return;
  }

  document.documentElement.lang = config.site.language || "en";
  document.title = config.site.name;

  const favicon = document.querySelector("link[rel='shortcut icon']");
  if (favicon && config.site.favicon) {
    favicon.href = config.site.favicon;
  }

  const escapeHtml = (value) =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const resolveHref = (href) => {
    if (!href || href.startsWith("#") || /^[a-z]+:/i.test(href)) {
      return href || "#";
    }
    return `${config.site.assetBaseUrl}${href}`;
  };

  const socialLinks = config.socialLinks
    .map(
      (item) => `
        <li>
          <a href="${escapeHtml(resolveHref(item.href))}" target="_blank" rel="noopener" aria-label="${escapeHtml(item.label)}">
            <i class="fa ${escapeHtml(item.icon)}"></i>
          </a>
        </li>
      `
    )
    .join("");

  const navLinks = config.navigation
    .map((item) => `<li><a href="${escapeHtml(resolveHref(item.href))}">${escapeHtml(item.label)}</a></li>`)
    .join("");

  const slides = config.slider.images
    .map(
      (item, index) => `
        <div class="licext-slide${index === 0 ? " active" : ""}">
          <a href="${escapeHtml(resolveHref(item.href))}">
            <img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt)}">
          </a>
        </div>
      `
    )
    .join("");

  const bullets = config.slider.images
    .map((_, index) => `<button class="${index === 0 ? "active" : ""}" type="button" data-slide="${index}" aria-label="Show slide ${index + 1}"></button>`)
    .join("");

  const objectives = config.objectives.items
    .map(
      (item) => `
        <div class="col-md-4 col-sm-6 wow fadeInDown">
          <div class="feature-wrap">
            <i class="fa ${escapeHtml(item.icon)}"></i>
            <h2 class="${escapeHtml(item.className || "")}">${escapeHtml(item.title)}</h2>
          </div>
        </div>
      `
    )
    .join("");

  const news = config.news.items
    .map(
      (item) => `
        <div class="col-sm-6 col-md-4">
          <div class="media services-wrap wow fadeInDown">
            <div class="pull-left">
              <img class="img-responsive" style="margin-top:.7em;" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}">
            </div>
            <div class="media-body">
              <h3 class="media-heading"><a href="${escapeHtml(resolveHref(item.href))}">${escapeHtml(item.title)}</a></h3>
              <p>${escapeHtml(item.excerpt)}</p>
            </div>
          </div>
        </div>
      `
    )
    .join("");

  const certificates = config.certificates.items
    .map(
      (item) => `
        <div class="col-md-4 col-sm-6 col-xs-12 my-gal-item-div">
          <a class="example-image-link" href="${escapeHtml(item.fullImage)}" data-title="${escapeHtml(item.title)}">
            <img class="example-image" src="${escapeHtml(item.thumb)}" alt="${escapeHtml(item.title)}">
            <p style="max-height:3em;height: 3em;">${escapeHtml(item.title)}</p>
          </a>
          <br>
          <br>
        </div>
      `
    )
    .join("");

  const bottomWidgets = config.bottomWidgets
    .map(
      (widget) => `
        <div class="col-md-3 col-sm-6">
          <div class="widget">
            <h3>${escapeHtml(widget.title)}</h3>
            <ul>
              ${widget.links.map((link) => `<li><a href="${escapeHtml(resolveHref(link.href))}">${escapeHtml(link.label)}</a></li>`).join("")}
            </ul>
          </div>
        </div>
      `
    )
    .join("");

  app.innerHTML = `
    <header id="header">
      <div class="top-bar">
        <div class="container">
          <div class="row">
            <div class="col-sm-offset-3 col-sm-9 col-xs-12">
              <div class="text-right row">
                <div class="my-header-col-1">
                  <ul class="social-share">${socialLinks}</ul>
                </div>
                <div class="my-header-col-2">
                  <div class="search">
                    <form action="${escapeHtml(resolveHref(config.search.action))}" method="get">
                      <div class="search-form">
                        <input type="text" class="form-control" name="${escapeHtml(config.search.inputName)}" maxlength="${escapeHtml(config.search.maxLength)}" placeholder="${escapeHtml(config.search.placeholder)}">
                        <div class="help-block"></div>
                      </div>
                      <button type="submit" id="search-submit"><i class="fa fa-search"></i></button>
                    </form>
                  </div>
                </div>
                <div class="my-header-col-3">
                  <a class="wlang" href="${escapeHtml(resolveHref(config.languageSwitch.href))}">${escapeHtml(config.languageSwitch.label)}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav class="navbar" role="banner">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" aria-label="Toggle navigation">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="${escapeHtml(config.site.assetBaseUrl)}/">
              <img src="${escapeHtml(config.site.logo)}" alt="logo">
            </a>
          </div>

          <div class="collapse navbar-collapse navbar-right">
            <ul class="nav navbar-nav">${navLinks}</ul>
          </div>
        </div>
      </nav>
    </header>

    <section id="main-slider" class="no-margin">
      <div id="jssor_1" class="licext-slider">
        <div class="licext-slides">${slides}</div>
        <div class="jssorb05 licext-bullets">${bullets}</div>
        <button class="jssora22l licext-arrow prev" type="button" aria-label="Previous slide"></button>
        <button class="jssora22r licext-arrow next" type="button" aria-label="Next slide"></button>
      </div>
    </section>

    <section id="feature">
      <div class="container">
        <div class="center wow fadeInDown">
          <h2>${escapeHtml(config.objectives.title)}</h2>
        </div>
        <div class="row">
          <div class="features">${objectives}</div>
        </div>
      </div>
    </section>

    <section id="services" class="service-item">
      <div class="container">
        <div class="center wow fadeInDown">
          <h2>${escapeHtml(config.news.title)}</h2>
        </div>
        <div class="row">${news}</div>
      </div>
    </section>

    <section class="service-item certificates-section">
      <div class="container">
        <div class="center wow fadeInDown">
          <h1>${escapeHtml(config.certificates.title)}</h1>
          <br>
          <div id="img-gal">
            <div class="row">${certificates}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="service-item validation-section">
      <div class="container">
        <div class="center wow fadeInDown">
          <p><span>${config.certificates.validationHtml}</span></p>
          <p><span>${escapeHtml(config.certificates.searchInstruction)}</span></p>
        </div>
      </div>
    </section>

    <section id="bottom">
      <div class="container wow fadeInDown">
        <div class="row">${bottomWidgets}</div>
      </div>
    </section>

    <footer id="footer" class="midnight-blue">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <p class="pull-left">&copy; ${escapeHtml(config.site.copyrightStartYear)} - <span id="year"></span> <a target="_blank" href="${escapeHtml(config.site.assetBaseUrl)}/" rel="noopener">${escapeHtml(config.site.name)}</a>. All Rights Reserved.</p>
            <p class="pull-right">${escapeHtml(config.site.developedByLabel)} <a href="${escapeHtml(config.site.developedByHref)}">${escapeHtml(config.site.developedByName)}</a></p>
          </div>
        </div>
        <br>
      </div>
    </footer>
  `;

  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const slideElements = Array.from(document.querySelectorAll(".licext-slide"));
  const bulletElements = Array.from(document.querySelectorAll(".licext-bullets button"));
  let currentSlide = 0;

  const showSlide = (index) => {
    if (!slideElements.length) {
      return;
    }
    currentSlide = (index + slideElements.length) % slideElements.length;
    slideElements.forEach((slide, slideIndex) => slide.classList.toggle("active", slideIndex === currentSlide));
    bulletElements.forEach((bullet, slideIndex) => bullet.classList.toggle("active", slideIndex === currentSlide));
  };

  document.querySelector(".licext-arrow.prev")?.addEventListener("click", () => showSlide(currentSlide - 1));
  document.querySelector(".licext-arrow.next")?.addEventListener("click", () => showSlide(currentSlide + 1));
  bulletElements.forEach((button, index) => button.addEventListener("click", () => showSlide(index)));
  window.setInterval(() => showSlide(currentSlide + 1), 3000);
})();
