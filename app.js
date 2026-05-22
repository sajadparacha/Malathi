(function () {
  const config = window.siteConfig;
  const app = document.getElementById("app");

  if (!config || !app) {
    return;
  }

  document.documentElement.lang = config.site.language || "en";
  document.title = config.site.name;

  const iconMap = {
    quality:
      '<path d="M12 3l2.7 5.47 6.04.88-4.37 4.26 1.03 6.02L12 16.79l-5.4 2.84 1.03-6.02-4.37-4.26 6.04-.88L12 3z"/>',
    technology:
      '<path d="M7 3h10v4H7V3zm-2 7h14v11H5V10zm4 3v5h2v-5H9zm4 0v5h2v-5h-2z"/>',
    partnership:
      '<path d="M8.5 12.5l2.1 2.1 4.9-5.1 1.5 1.4-6.4 6.6L7 13.9l1.5-1.4z"/><path d="M12 2l8 4v6c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10V6l8-4z" fill="none" stroke="currentColor" stroke-width="2"/>',
    range:
      '<path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z"/>',
    organic:
      '<path d="M20 4c-7.2.2-12.4 4.2-13.3 10.8C5 13.2 4 11 4 8.5 4 5.5 6.5 3 9.5 3c2.2 0 4.2 1.2 5.2 3 1.5-.9 3.3-1.5 5.3-2z"/><path d="M6 21c1.1-5.6 4.5-9.4 10.3-11.3" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"/>',
    order:
      '<path d="M6 2h12l2 4v15H4V6l2-4zm.3 6L6 8.5V19h12V8.5l-.3-.5H6.3zM9 11h6v2H9v-2zm0 4h4v2H9v-2z"/>'
  };

  const escapeHtml = (value) =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const icon = (name) => `
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      ${iconMap[name] || iconMap.quality}
    </svg>
  `;

  const navItems = config.navigation
    .map((item) => `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`)
    .join("");

  const highlightItems = config.hero.highlights
    .map((item) => `<span>${escapeHtml(item)}</span>`)
    .join("");

  const objectiveCards = config.objectives.items
    .map(
      (item) => `
        <article class="feature-card">
          <div class="feature-icon">${icon(item.icon)}</div>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.text)}</p>
        </article>
      `
    )
    .join("");

  const productCards = config.products.items
    .map(
      (item) => `
        <article class="product-card">
          <span class="badge">${escapeHtml(item.badge)}</span>
          <h3>${escapeHtml(item.name)}</h3>
          <p>${escapeHtml(item.description)}</p>
        </article>
      `
    )
    .join("");

  const newsCards = config.news.items
    .map(
      (item) => `
        <article class="news-card">
          <span>${escapeHtml(item.date)}</span>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.excerpt)}</p>
          <a href="#news" aria-label="Read more about ${escapeHtml(item.title)}">Read more</a>
        </article>
      `
    )
    .join("");

  const certificateCards = config.certificates.items
    .map(
      (item) => `
        <article class="certificate-card">
          <div>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.description)}</p>
          </div>
          <a href="${escapeHtml(item.href)}">View certificate</a>
        </article>
      `
    )
    .join("");

  const checklist = config.contact.checklist
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");

  app.innerHTML = `
    <header class="site-header">
      <nav class="navbar container" aria-label="Main navigation">
        <a class="brand" href="#home" aria-label="${escapeHtml(config.site.name)} home">
          <span class="brand-mark">${escapeHtml(config.site.logoText)}</span>
          <span>${escapeHtml(config.site.name)}</span>
        </a>
        <div class="nav-links">${navItems}</div>
      </nav>
    </header>

    <main>
      <section class="hero" id="home">
        <div class="container hero-grid">
          <div class="hero-copy">
            <p class="eyebrow">${escapeHtml(config.hero.eyebrow)}</p>
            <h1>${escapeHtml(config.hero.title)}</h1>
            <p class="hero-text">${escapeHtml(config.hero.description)}</p>
            <div class="hero-actions">
              <a class="button primary" href="#products">${escapeHtml(config.site.ctaPrimary)}</a>
              <a class="button secondary" href="mailto:${escapeHtml(config.site.contactEmail)}">${escapeHtml(config.site.ctaSecondary)}</a>
            </div>
            <div class="hero-highlights">${highlightItems}</div>
          </div>
          <div class="hero-visual" role="img" aria-label="${escapeHtml(config.hero.imageAlt)}">
            <div class="product-orbit orbit-one"></div>
            <div class="product-orbit orbit-two"></div>
            <div class="licorice-card">
              <span>Natural</span>
              <strong>Licorice Extract</strong>
              <small>Root - Powder - Block</small>
            </div>
          </div>
        </div>
      </section>

      <section class="section" id="objectives">
        <div class="container">
          <div class="section-heading">
            <p class="eyebrow">${escapeHtml(config.objectives.title)}</p>
            <h2>${escapeHtml(config.objectives.subtitle)}</h2>
          </div>
          <div class="feature-grid">${objectiveCards}</div>
        </div>
      </section>

      <section class="section products" id="products">
        <div class="container split-section">
          <div>
            <p class="eyebrow">${escapeHtml(config.products.title)}</p>
            <h2>${escapeHtml(config.products.subtitle)}</h2>
          </div>
          <div class="product-grid">${productCards}</div>
        </div>
      </section>

      <section class="section" id="news">
        <div class="container">
          <div class="section-heading">
            <p class="eyebrow">${escapeHtml(config.news.title)}</p>
            <h2>${escapeHtml(config.news.subtitle)}</h2>
          </div>
          <div class="news-grid">${newsCards}</div>
        </div>
      </section>

      <section class="section certificates" id="certificates">
        <div class="container certificate-layout">
          <div>
            <p class="eyebrow">${escapeHtml(config.certificates.title)}</p>
            <h2>${escapeHtml(config.certificates.subtitle)}</h2>
            <p>${escapeHtml(config.certificates.validationNote)}</p>
          </div>
          <div class="certificate-list">${certificateCards}</div>
        </div>
      </section>

      <section class="section contact" id="contacts">
        <div class="container contact-panel">
          <div>
            <p class="eyebrow">${escapeHtml(config.contact.title)}</p>
            <h2>${escapeHtml(config.contact.subtitle)}</h2>
            <p><strong>Email:</strong> <a href="mailto:${escapeHtml(config.site.contactEmail)}">${escapeHtml(config.site.contactEmail)}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${escapeHtml(config.site.contactPhone)}">${escapeHtml(config.site.contactPhone)}</a></p>
            <p><strong>Address:</strong> ${escapeHtml(config.site.address)}</p>
          </div>
          <div class="checklist-card">
            <h3>${escapeHtml(config.contact.fieldsTitle)}</h3>
            <ul>${checklist}</ul>
            <a class="button primary" href="mailto:${escapeHtml(config.site.contactEmail)}">${escapeHtml(config.contact.buttonLabel)}</a>
          </div>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="container footer-inner">
        <p>&copy; <span id="year"></span> ${escapeHtml(config.site.name)}. ${escapeHtml(config.footer.copyright)}</p>
        <p>${escapeHtml(config.footer.note)}</p>
      </div>
    </footer>
  `;

  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }
})();
