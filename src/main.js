import './style.css';
import Chart from 'chart.js/auto';
import { icons } from './icons.js';

const WA_PHONE = '22990000000';

function getWhatsAppUrl(msg) {
  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(msg)}`;
}

// Cockpit Feed Data for Tab Filtering inside Web Browser Dashboard Mockup
const COCKPIT_FEED_DATA = {
  all: [
    {
      avatar: 'K',
      avatarBg: '#2E1065',
      name: 'Kevine Akakpo',
      phone: '+229 97 ** ** 12',
      channel: 'WhatsApp Direct',
      channelBg: '#059669',
      message: '« Bonjour ! Devis pour 5 articles en gros SVP »',
      action: 'Réponse instantanée & catalogue envoyé',
      status: 'Répondu (14s)',
      time: 'Il y a 2 min'
    },
    {
      avatar: 'S',
      avatarBg: '#D97706',
      name: 'Sarah Bio',
      phone: '+229 95 ** ** 88',
      channel: 'WhatsApp + SMS',
      channelBg: '#059669',
      message: 'Devis laissé en attente depuis 24h (45 000 FCFA)',
      action: 'Relance transactionnelle & lien Mobile Money',
      status: 'Relancé (Converti)',
      time: 'Il y a 15 min'
    },
    {
      avatar: 'A',
      avatarBg: '#4C1D95',
      name: 'Armand Dossou',
      phone: '+229 61 ** ** 45',
      channel: 'WhatsApp + Email',
      channelBg: '#7C3AED',
      message: 'Client silencieux (90 jours sans commande)',
      action: 'Message de réactivation + Code privilège -15%',
      status: 'Client Réactivé',
      time: 'Il y a 1h'
    },
    {
      avatar: 'M',
      avatarBg: '#2563EB',
      name: 'Marc Houessou',
      phone: '+229 90 ** ** 33',
      channel: 'WhatsApp Direct',
      channelBg: '#059669',
      message: 'Demande d\'horaires & adresse à Cotonou',
      action: 'Réponse auto instantanée 24/7',
      status: 'Répondu (8s)',
      time: 'Il y a 2h'
    }
  ],

  relances: [
    {
      avatar: 'S',
      avatarBg: '#D97706',
      name: 'Sarah Bio',
      phone: '+229 95 ** ** 88',
      channel: 'WhatsApp + SMS',
      channelBg: '#059669',
      message: 'Devis laissé en attente depuis 24h (45 000 FCFA)',
      action: 'Relance transactionnelle & lien Mobile Money',
      status: 'Relancé (Converti)',
      time: 'Il y a 15 min'
    },
    {
      avatar: 'P',
      avatarBg: '#2563EB',
      name: 'Prudence Tossou',
      phone: '+229 66 ** ** 77',
      channel: 'WhatsApp Direct',
      channelBg: '#059669',
      message: 'Panier de formation en attente',
      action: 'Relance automatique + proposition de créneau',
      status: 'Relance envoyée',
      time: 'Il y a 30 min'
    }
  ],

  fidelisation: [
    {
      avatar: 'A',
      avatarBg: '#4C1D95',
      name: 'Armand Dossou',
      phone: '+229 61 ** ** 45',
      channel: 'WhatsApp + Email',
      channelBg: '#7C3AED',
      message: 'Client silencieux (90 jours sans commande)',
      action: 'Message de réactivation + Code privilège -15%',
      status: 'Client Réactivé',
      time: 'Il y a 1h'
    },
    {
      avatar: 'E',
      avatarBg: '#D97706',
      name: 'Evelyne Mensah',
      phone: '+229 96 ** ** 99',
      channel: 'WhatsApp Direct',
      channelBg: '#059669',
      message: 'Anniversaire d\'achat (1 an de fidélité)',
      action: 'Message attentionné + Cadeau Fidelio -20%',
      status: 'Offre envoyée',
      time: 'Hier 09:00'
    }
  ],

  vocal: [
    {
      avatar: 'R',
      avatarBg: '#059669',
      name: 'Rachid Bello',
      phone: '+229 97 ** ** 55',
      channel: 'IA Vocale WhatsApp',
      channelBg: '#D97706',
      message: '🎙️ Note vocale reçue (0:42s) : « Je veux la réservation d\'une chambre VIP ce week-end »',
      action: 'Transcription IA & réponse vocale synthétisée',
      status: 'Vocal Traité (18s)',
      time: 'Il y a 5 min'
    }
  ]
};

// Calculator State
const calculatorState = {
  msgsPerDay: 40,
  avgOrderVal: 15000,
  chartInstance: null
};

// Clean Offer Data
const PACKS_DATA = {
  starter: {
    id: 'starter',
    name: 'Starter',
    subtitle: 'Automatisation essentielle des réponses et informations',
    badge: 'Découverte',
    monthlyPrice: 14900,
    annualPrice: 11900,
    anchorPrice: 25000,
    setupFee: 29000,
    setupFeeOld: 50000,
    features: [
      { text: 'Réponses automatiques WhatsApp (Horaires & Informations)' },
      { text: 'Présentation de votre catalogue produits' },
      { text: 'Jusqu\'à 150 conversations / mois' },
      { text: 'Support technique par Email & WhatsApp' },
      { text: 'Relances automatiques de devis', disabled: true },
      { text: 'IA Conversationnelle autonome 24/7', disabled: true }
    ]
  },
  business: {
    id: 'business',
    name: 'Business',
    subtitle: 'Réponses 24/7 et relances automatiques de devis',
    badge: 'Populaire',
    monthlyPrice: 34900,
    annualPrice: 27900,
    anchorPrice: 45000,
    setupFee: 49000,
    setupFeeOld: 80000,
    features: [
      { text: 'Réponses automatiques 24/7 en moins de 2 minutes' },
      { text: 'Relances automatiques de devis (jusqu\'à 2 relances)' },
      { text: 'Jusqu\'à 500 conversations / mois' },
      { text: 'Support WhatsApp prioritaire' },
      { text: 'Relances d\'anniversaire et fidélité', disabled: true }
    ]
  },
  pro: {
    id: 'pro',
    name: 'Pro Automate',
    subtitle: 'La solution complète pour convertir et fidéliser sans effort',
    badge: 'Recommandé',
    isHero: true,
    monthlyPrice: 38900,
    annualPrice: 31000,
    anchorPrice: 65000,
    setupFee: 69000,
    setupFeeOld: 120000,
    features: [
      { text: '<strong>Tout le Pack Business inclus</strong>' },
      { text: '<strong>IA Répondeur WhatsApp Intelligente 24/7</strong>' },
      { text: '<strong>Relances illimitées de devis & paniers en attente</strong>' },
      { text: '<strong>Relances d\'anniversaire & messages de fidélisation</strong>' },
      { text: '<strong>Réactivation automatique des clients silencieux (90j)</strong>' },
      { text: '<strong>Support dédié 7j/7</strong>' }
    ]
  },
  vip: {
    id: 'vip',
    name: 'Enterprise',
    subtitle: 'Accompagnement multicanal et sur-mesure pour PME',
    badge: 'Sur-Mesure',
    monthlyPrice: 79900,
    annualPrice: 63900,
    anchorPrice: 120000,
    setupFee: 99000,
    setupFeeOld: 200000,
    features: [
      { text: '<strong>Tout le Pack Pro Automate inclus</strong>' },
      { text: '<strong>Accompagnement Multicanal (WhatsApp + SMS + Email)</strong>' },
      { text: '<strong>Intégration Mobile Money & synchronisation CRM</strong>' },
      { text: '<strong>Chargé de compte dédié à Cotonou</strong>' },
      { text: '<strong>Garantie de service & assistance VIP</strong>' }
    ]
  }
};

const ADDONS_DATA = {
  voice_ia: {
    id: 'voice_ia',
    title: 'Module IA Vocale WhatsApp',
    badge: 'Option Conseillée',
    badgeType: 'violet',
    iconKey: 'mic',
    desc: 'Comprend et répond automatiquement aux notes vocales de vos clients.',
    price: 9900,
    recurring: true
  },
  backup_sms: {
    id: 'backup_sms',
    title: 'Relance de Secours par SMS',
    badge: 'Multicanal',
    badgeType: 'gold',
    iconKey: 'messageCircle',
    desc: 'Envoie un SMS de secours si le message WhatsApp n\'est pas lu sous 10 minutes.',
    price: 4900,
    recurring: true
  },
  catalog_setup: {
    id: 'catalog_setup',
    title: 'Configuration Catalogue WA Business',
    badge: 'Clé en main',
    badgeType: 'gold',
    iconKey: 'layout',
    desc: 'Mise en page visuelle et structuration complète de votre vitrine produits.',
    price: 15000,
    recurring: false
  },
  sales_scripts: {
    id: 'sales_scripts',
    title: 'Scripts de Vente & Relance WhatsApp',
    badge: 'Ressource Pro',
    badgeType: 'violet',
    iconKey: 'fileText',
    desc: 'Modèles de messages de relance et closing testés et prêts à l\'emploi.',
    price: 5000,
    recurring: false
  }
};

const pricingState = {
  isAnnual: false,
  selectedPack: 'pro',
  selectedAddons: new Set(['voice_ia'])
};

window.setBillingCycle = function(isAnnual) {
  pricingState.isAnnual = isAnnual;
  document.querySelectorAll('.billing-toggle-btn').forEach((btn, idx) => {
    if ((idx === 0 && !isAnnual) || (idx === 1 && isAnnual)) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  updatePricingUI();
};

window.selectPack = function(packId) {
  pricingState.selectedPack = packId;
  updatePricingUI();
};

window.toggleAddon = function(addonId) {
  if (pricingState.selectedAddons.has(addonId)) {
    pricingState.selectedAddons.delete(addonId);
  } else {
    pricingState.selectedAddons.add(addonId);
  }
  updatePricingUI();
};

window.setPresetMsgs = function(val) {
  const slider = document.getElementById('msgs-slider');
  if (slider) {
    slider.value = val;
    slider.dispatchEvent(new Event('input'));
  }
};

function buildWhatsAppCheckoutUrl(isTrial = false) {
  const pack = PACKS_DATA[pricingState.selectedPack];
  const price = pricingState.isAnnual ? pack.annualPrice : pack.monthlyPrice;
  const frequency = pricingState.isAnnual ? 'Annuel (-20%)' : 'Mensuel';

  let addonTitles = Array.from(pricingState.selectedAddons)
    .map(id => ADDONS_DATA[id]?.title)
    .filter(Boolean);

  let totalRecurring = price;
  let totalOneTime = pack.setupFee;

  pricingState.selectedAddons.forEach(id => {
    const a = ADDONS_DATA[id];
    if (a) {
      if (a.recurring) totalRecurring += a.price;
      else totalOneTime += a.price;
    }
  });

  let msg = `Bonjour Fidelio !\n\n`;
  if (isTrial) {
    msg += `Je souhaite profiter de l'offre d'essai Starter à 9 900 FCFA pour mon premier mois !\n\n`;
  } else {
    msg += `Je souhaite configurer mon abonnement Fidelio avec les options suivantes :\n`;
  }
  msg += `• Offre choisie : ${pack.name} (${frequency})\n`;
  msg += `• Tarif mensuel : ${totalRecurring.toLocaleString('fr-FR')} FCFA/mois\n`;
  msg += `• Frais d'installation & options : ${totalOneTime.toLocaleString('fr-FR')} FCFA\n`;
  msg += `• Options complémentaires : ${addonTitles.length > 0 ? addonTitles.join(', ') : 'Aucune'}\n\n`;
  msg += `Merci de me recontacter pour finaliser la mise en place sous 72h !`;

  return getWhatsAppUrl(msg);
}

function updatePricingUI() {
  const cardsContainer = document.getElementById('pricing-cards-container');
  const addonsContainer = document.getElementById('addons-grid-container');
  const summaryContainer = document.getElementById('order-summary-bar');
  const downsellBtn = document.getElementById('downsell-wa-btn');

  if (!cardsContainer || !addonsContainer || !summaryContainer) return;

  cardsContainer.innerHTML = Object.values(PACKS_DATA).map(pack => {
    const isSelected = pricingState.selectedPack === pack.id;
    const price = pricingState.isAnnual ? pack.annualPrice : pack.monthlyPrice;
    
    let cardClasses = 'pricing-card';
    if (pack.isHero) cardClasses += ' hero-pro';

    return `
      <div class="${cardClasses}" style="${isSelected ? 'border-color:var(--gold-bright);box-shadow:var(--shadow-gold);' : ''}">
        ${pack.badge ? `
          <div class="featured-badge">
            <span class="icon-box" style="margin-right:4px;">${pack.isHero ? icons.star : icons.sparkles}</span>
            ${pack.badge}
          </div>
        ` : ''}

        <div>
          <h3 style="font-size:22px;font-weight:800;margin-top:6px;">${pack.name}</h3>
          <p style="font-size:12px;color:var(--text-secondary);min-height:36px;margin-top:4px;">${pack.subtitle}</p>

          <div style="margin:16px 0 6px;">
            <span class="price-anchor">${pack.anchorPrice.toLocaleString('fr-FR')} FCFA</span>
            <div class="price-val">
              ${price.toLocaleString('fr-FR')} <span style="font-size:13px;font-weight:600;color:var(--text-secondary);">FCFA/mois</span>
            </div>
          </div>

          <div class="setup-fee">
            Frais d'installation : <span class="strike">${pack.setupFeeOld.toLocaleString('fr-FR')} FCFA</span> 
            <strong style="color:var(--gold-primary);">${pack.setupFee.toLocaleString('fr-FR')} FCFA</strong>
          </div>

          <ul class="pricing-features">
            ${pack.features.map(f => `
              <li class="${f.disabled ? 'disabled' : ''}">
                <span class="icon-box" style="flex-shrink:0;">${f.disabled ? icons.xCircle : icons.checkCircle}</span>
                <span>${f.text}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <button 
          onclick="selectPack('${pack.id}')" 
          class="btn ${pack.isHero || isSelected ? 'btn-gold' : 'btn-secondary'}" 
          style="width:100%;margin-top:16px;">
          <span class="icon-box">${isSelected ? icons.check : icons.zap}</span>
          <span>${isSelected ? 'Formule Sélectionnée' : `Choisir ${pack.name}`}</span>
        </button>
      </div>
    `;
  }).join('');

  addonsContainer.innerHTML = Object.values(ADDONS_DATA).map(addon => {
    const isChecked = pricingState.selectedAddons.has(addon.id);
    const addonIcon = icons[addon.iconKey] || icons.sparkles;
    return `
      <div class="addon-card ${isChecked ? 'selected' : ''}" onclick="toggleAddon('${addon.id}')">
        <div class="addon-checkbox">
          ${isChecked ? icons.check : ''}
        </div>
        <div style="flex-grow:1;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
            <span class="icon-box" style="color:var(--gold-primary);">${addonIcon}</span>
            <span class="addon-badge ${addon.badgeType}">${addon.badge}</span>
          </div>
          <div class="addon-title">${addon.title}</div>
          <div class="addon-desc">${addon.desc}</div>
          <div class="addon-price">
            + ${addon.price.toLocaleString('fr-FR')} FCFA ${addon.recurring ? '/ mois' : '(Paiement unique)'}
          </div>
        </div>
      </div>
    `;
  }).join('');

  const currentPack = PACKS_DATA[pricingState.selectedPack];
  const basePackPrice = pricingState.isAnnual ? currentPack.annualPrice : currentPack.monthlyPrice;
  
  let recurringAddonsTotal = 0;
  let oneTimeAddonsTotal = 0;

  pricingState.selectedAddons.forEach(id => {
    const item = ADDONS_DATA[id];
    if (item) {
      if (item.recurring) recurringAddonsTotal += item.price;
      else oneTimeAddonsTotal += item.price;
    }
  });

  const grandTotalMonthly = basePackPrice + recurringAddonsTotal;
  const setupFee = currentPack.setupFee;

  summaryContainer.innerHTML = `
    <div class="summary-details-box">
      <div style="font-size:11px;color:var(--gold-bright);font-weight:800;text-transform:uppercase;letter-spacing:0.5px;display:flex;align-items:center;gap:6px;">
        <span class="icon-box">${icons.sparkles}</span>
        <span>RÉCAPITULATIF DE VOTRE OFFRE</span>
      </div>
      <div style="font-size:18px;font-weight:800;">
        Offre ${currentPack.name} (${pricingState.isAnnual ? 'Annuel -20%' : 'Mensuel'}) + ${pricingState.selectedAddons.size} Option(s)
      </div>
      <div style="font-size:13px;color:#94A3B8;">
        Installation clé en main : ${setupFee.toLocaleString('fr-FR')} FCFA ${oneTimeAddonsTotal > 0 ? `| Options uniques : +${oneTimeAddonsTotal.toLocaleString('fr-FR')} FCFA` : ''}
      </div>
    </div>

    <div style="text-align:right;display:flex;align-items:center;gap:20px;">
      <div>
        <div style="font-size:11px;color:#94A3B8;">Abonnement Total</div>
        <div class="summary-total-price">${grandTotalMonthly.toLocaleString('fr-FR')} <span style="font-size:14px;color:#FFF;">FCFA/mois</span></div>
      </div>

      <a href="${buildWhatsAppCheckoutUrl()}" target="_blank" class="btn btn-gold" style="font-size:15px;padding:14px 26px;">
        <span class="icon-box">${icons.messageSquare}</span>
        <span>Valider sur WhatsApp →</span>
      </a>
    </div>
  `;

  if (downsellBtn) {
    downsellBtn.href = buildWhatsAppCheckoutUrl(true);
  }
}


function renderApp() {
  const appContainer = document.getElementById('app');
  appContainer.innerHTML = `
    <!-- NAVBAR -->
    <header class="navbar" id="navbar">
      <div class="container nav-container">
        <a href="#" class="nav-brand">
          <img src="/fidelio.svg" alt="Fidelio Logo" />
          <span>fidelio</span>
        </a>
        <button class="nav-toggle" id="nav-toggle" aria-label="Toggle Navigation">
          <span class="icon-box icon-menu">${icons.menu}</span>
          <span class="icon-box icon-close" style="display:none;">${icons.x}</span>
        </button>
        <ul class="nav-links" id="nav-links">
          <li><a href="#problem">Le Problème</a></li>
          <li><a href="#cockpit">Cockpit Web</a></li>
          <li><a href="#infrastructure">Infrastructure</a></li>
          <li><a href="#usecases">Cas d'usage</a></li>
          <li><a href="#calculator">Calculateur</a></li>
          <li><a href="#pricing">Tarifs</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
        <div class="nav-actions">
          <a href="${getWhatsAppUrl("Bonjour Fidelio, je souhaite réserver mon audit gratuit de 20 minutes pour mon entreprise.")}" target="_blank" class="btn btn-wa">
            <span class="icon-box">${icons.phone}</span>
            <span>Réserver l'audit</span>
          </a>
        </div>
      </div>
    </header>

    <!-- HERO SECTION -->
    <section class="hero-section">
      <div class="hero-glow"></div>
      <div class="container">
        <div class="hero-content">
          <div class="tag-pill">
            <span class="icon-box" style="color:var(--gold-bright);">${icons.zap}</span>
            <span>Automation WhatsApp Clé en Main 24/7</span>
          </div>
          <h1 class="hero-title">Vos clients vous écrivent sur WhatsApp.<br><span class="gradient-text-gold">Fidelio répond à votre place, 24h/24.</span></h1>
          <p class="hero-subtitle">Réponses instantanées en moins de 2 minutes, relances automatiques et fidélisation — pour que vous ne perdiez plus jamais une seule vente.</p>
          <div class="hero-cta-group">
            <a href="${getWhatsAppUrl("Bonjour Fidelio, je souhaite réserver mon audit gratuit de 20 min pour mon entreprise.")}" target="_blank" class="btn btn-wa" style="font-size:16px;padding:16px 32px;">
              <span class="icon-box">${icons.messageSquare}</span>
              <span>Réserver mon audit gratuit</span>
            </a>
            <button class="btn btn-secondary" onclick="scrollToSection('pricing')">Voir les tarifs</button>
          </div>
        </div>

        <!-- LE PROBLÈME ET LA SOLUTION (3 IPHONE 16 PRO MAX FAN SHOWCASE) -->
        <div class="problem-iphone-section" id="problem">
          <div style="text-align:center;max-width:820px;margin:0 auto 45px;">
            <div class="tag-pill tag-pill-glow">
              <span class="icon-box" style="color:var(--gold-bright);">${icons.zap}</span>
              <span>COMPARATIF DE PERFORMANCE 24/7</span>
            </div>
            <h2 class="section-title-large" style="font-size:42px;font-weight:800;margin-top:16px;line-height:1.15;">
              Quel est le problème ? <span class="gradient-text-gold">Notre solution.</span>
            </h2>
            <p style="font-size:18px;color:var(--text-secondary);margin-top:12px;line-height:1.6;">
              Chaque message laissé sans réponse est une vente offerte à vos concurrents. Découvrez la différence entre la réalité des PME sans automatisation et la puissance de Fidelio.
            </p>
          </div>

          <!-- 3 IPHONE 16 PRO MAX FAN SHOWCASE -->
          <div class="iphone-fan-stage">
            
            <!-- IPHONE 1: LE PROBLÈME (SANS FIDELIO) -->
            <div class="iphone-fan-card fan-left">
              <div class="fan-badge badge-danger">
                <span class="icon-box">${icons.xCircle}</span>
                <span>1. LE PROBLÈME (Sans Fidelio)</span>
              </div>

              <div class="iphone16-pro-frame frame-danger">
                <!-- Outer Buttons -->
                <div class="btn-action"></div>
                <div class="btn-vol-up"></div>
                <div class="btn-vol-down"></div>
                <div class="btn-power"></div>
                <div class="btn-camera-control"></div>

                <div class="iphone16-inner-screen">
                  <div class="dynamic-island-pro">
                    <div class="camera-sensor"></div>
                    <div class="camera-lens"></div>
                  </div>

                  <div class="ios-status-bar">
                    <span class="status-time">21:45</span>
                    <div class="status-icons">
                      <span>4G</span>
                      <div class="ios-battery"><div class="battery-fill" style="width:25%;background:#EF4444;"></div></div>
                    </div>
                  </div>

                  <div class="wa-app-header header-danger">
                    <div class="wa-header-left">
                      <div class="wa-avatar avatar-client">K</div>
                      <div>
                        <div class="wa-contact-name">Kevine A. (Prospect)</div>
                        <div class="wa-contact-status text-danger">Vu hier à 21:45</div>
                      </div>
                    </div>
                    <span class="icon-box" style="color:#94A3B8;">${icons.phone}</span>
                  </div>

                  <div class="wa-chat-canvas">
                    <div class="chat-bubble bubble-in">
                      Bonjour ! Je souhaite passer commande pour 5 articles en gros (150 000 FCFA). Êtes-vous disponible pour valider ?
                      <div class="bubble-time">21:45</div>
                    </div>

                    <div class="chat-alert-box alert-danger">
                      <span class="icon-box" style="color:#EF4444;margin-right:2px;">${icons.hourglass}</span>
                      <span>Aucune réponse pendant 10 heures (21h45 → 08h30)</span>
                    </div>

                    <div class="chat-bubble bubble-in bubble-error">
                      Bonjour... Sans réponse de votre part cette nuit, j'ai finalement acheté chez votre concurrent qui m'a répondu à 21h46.
                      <div class="bubble-time">08:30</div>
                    </div>
                  </div>

                  <div class="fan-screen-footer footer-danger">
                    <span class="icon-box">${icons.xCircle}</span>
                    <span><strong>150 000 FCFA perdus</strong> faute de réponse nocturne</span>
                  </div>
                  <div class="ios-home-indicator"></div>
                </div>
              </div>
            </div>

            <!-- IPHONE 2: NOTRE SOLUTION (RÉPONSE INSTANTANÉE 24/7) -->
            <div class="iphone-fan-card fan-center">
              <div class="fan-badge badge-success">
                <span class="icon-box">${icons.zap}</span>
                <span>2. NOTRE SOLUTION (Réponse 24/7)</span>
              </div>

              <div class="iphone16-pro-frame frame-success">
                <!-- Outer Buttons -->
                <div class="btn-action"></div>
                <div class="btn-vol-up"></div>
                <div class="btn-vol-down"></div>
                <div class="btn-power"></div>
                <div class="btn-camera-control"></div>

                <div class="iphone16-inner-screen">
                  <div class="dynamic-island-pro active-island">
                    <div class="camera-sensor"></div>
                    <div class="camera-lens"></div>
                    <div class="island-glow"></div>
                  </div>

                  <div class="ios-status-bar">
                    <span class="status-time">21:45</span>
                    <div class="status-icons">
                      <span class="text-success">5G</span>
                      <div class="ios-battery"><div class="battery-fill" style="width:95%;background:#25D366;"></div></div>
                    </div>
                  </div>

                  <div class="wa-app-header header-success">
                    <div class="wa-header-left">
                      <img src="/fidelio.svg" class="wa-avatar-logo" alt="Fidelio Logo" />
                      <div>
                        <div class="wa-contact-name">Fidelio Service Client</div>
                        <div class="wa-contact-status text-success">● En ligne 24/7 (IA Autonome)</div>
                      </div>
                    </div>
                    <span class="icon-box" style="color:#25D366;">${icons.checkCircle}</span>
                  </div>

                  <div class="wa-chat-canvas canvas-success">
                    <div class="chat-bubble bubble-in">
                      Bonjour ! Je souhaite passer commande pour 5 articles en gros (150 000 FCFA). Êtes-vous disponible pour valider ?
                      <div class="bubble-time">21:45</div>
                    </div>

                    <div class="chat-bubble bubble-out bubble-fidelio">
                      <div class="bot-tag"><span class="icon-box" style="margin-right:3px;">${icons.zap}</span> Fidelio IA (14s)</div>
                      Bonjour Kevine ! Vos 5 articles sont réservés. Voici votre lien sécurisé MTN / Moov Mobile Money :
                      <div class="pay-link-pill"><span class="icon-box" style="margin-right:4px;">${icons.creditCardPay}</span> Payer 150 000 FCFA (Lien Direct)</div>
                      <div class="bubble-time">21:45 <span class="checks">${icons.checkDouble}</span></div>
                    </div>

                    <div class="chat-bubble bubble-in">
                      Génial ! Paiement effectué à l'instant. Merci pour l'efficacité super rapide ! <span class="icon-box" style="color:#F59E0B;vertical-align:sub;">${icons.flame}</span>
                      <div class="bubble-time">21:46</div>
                    </div>
                  </div>

                  <div class="fan-screen-footer footer-success">
                    <span class="icon-box">${icons.checkCircle}</span>
                    <span><strong>150 000 FCFA encaissés</strong> en 14s (Paiement validé)</span>
                  </div>
                  <div class="ios-home-indicator"></div>
                </div>
              </div>
            </div>

            <!-- IPHONE 3: L'AUTOMATION & FIDÉLITÉ (RELANCES AUTO) -->
            <div class="iphone-fan-card fan-right">
              <div class="fan-badge badge-gold">
                <span class="icon-box">${icons.refreshCw}</span>
                <span>3. RELANCES & FIDÉLISATION</span>
              </div>

              <div class="iphone16-pro-frame frame-gold">
                <!-- Outer Buttons -->
                <div class="btn-action"></div>
                <div class="btn-vol-up"></div>
                <div class="btn-vol-down"></div>
                <div class="btn-power"></div>
                <div class="btn-camera-control"></div>

                <div class="iphone16-inner-screen">
                  <div class="dynamic-island-pro">
                    <div class="camera-sensor"></div>
                    <div class="camera-lens"></div>
                  </div>

                  <div class="ios-status-bar">
                    <span class="status-time">10:15</span>
                    <div class="status-icons">
                      <span class="text-gold">5G</span>
                      <div class="ios-battery"><div class="battery-fill" style="width:80%;background:#F59E0B;"></div></div>
                    </div>
                  </div>

                  <div class="wa-app-header header-gold">
                    <div class="wa-header-left">
                      <div class="wa-avatar avatar-fidelio">F</div>
                      <div>
                        <div class="wa-contact-name">Fidelio Automation</div>
                        <div class="wa-contact-status text-gold">● Relance devis automatique</div>
                      </div>
                    </div>
                    <span class="icon-box" style="color:#F59E0B;">${icons.gift}</span>
                  </div>

                  <div class="wa-chat-canvas">
                    <div class="chat-bubble bubble-out bubble-gold">
                      <div class="bot-tag"><span class="icon-box" style="margin-right:3px;">${icons.repeat}</span> Relance Devis (+24h)</div>
                      Bonjour Sarah ! Votre devis de 45 000 FCFA expire ce soir. Souhaitez-vous valider votre livraison à Cotonou ?
                      <div class="bubble-time">10:15 <span class="checks">${icons.checkDouble}</span></div>
                    </div>

                    <div class="chat-bubble bubble-in">
                      Merci du rappel ! J'avais complètement oublié. Je règle le montant tout de suite par Moov Money <span class="icon-box" style="color:#25D366;vertical-align:sub;">${icons.check}</span>
                      <div class="bubble-time">10:17</div>
                    </div>

                    <div class="chat-bubble bubble-out bubble-gold">
                      <div class="bot-tag"><span class="icon-box" style="margin-right:3px;">${icons.giftBox}</span> Fidélisation Auto</div>
                      Paiement reçu ! Pour votre 3e commande, voici votre code privilège <strong>-15%</strong> pour votre prochain achat.
                      <div class="bubble-time">10:18 <span class="checks">${icons.checkDouble}</span></div>
                    </div>
                  </div>

                  <div class="fan-screen-footer footer-gold">
                    <span class="icon-box">${icons.sparkles}</span>
                    <span><strong>+45% de chiffre d'affaires</strong> récupéré sans effort</span>
                  </div>
                  <div class="ios-home-indicator"></div>
                </div>
              </div>
            </div>

          </div>

          <!-- COMPARISON ARGUMENTAIRE CARDS -->
          <div class="argumentaire-grid">
            <div class="argumentaire-card arg-problem">
              <div class="arg-header">
                <div class="arg-icon icon-danger">${icons.xCircle}</div>
                <div>
                  <h3 class="arg-title">Le Problème (Sans Fidelio)</h3>
                  <div class="arg-subtitle">L'approche manuelle classique et coûteuse</div>
                </div>
              </div>
              <ul class="arg-list">
                <li>
                  <span class="arg-bullet bullet-danger">${icons.xCircle}</span>
                  <span><strong>Des ventes perdues chaque nuit :</strong> 60% des demandes arrivent entre 19h et 8h du matin, quand vos équipes dorment.</span>
                </li>
                <li>
                  <span class="arg-bullet bullet-danger">${icons.xCircle}</span>
                  <span><strong>Temps de réponse lent :</strong> Répondre au bout de 2 heures divise vos chances de conversion par 10.</span>
                </li>
                <li>
                  <span class="arg-bullet bullet-danger">${icons.xCircle}</span>
                  <span><strong>Devis oubliés :</strong> Faute de temps, 70% des devis envoyés ne sont jamais relancés et finissent à la poubelle.</span>
                </li>
                <li>
                  <span class="arg-bullet bullet-danger">${icons.xCircle}</span>
                  <span><strong>Fatigue & surcharge :</strong> Vos vendeurs passent leurs journées à copier-coller les mêmes réponses d'informations.</span>
                </li>
              </ul>
            </div>

            <div class="argumentaire-card arg-solution">
              <div class="arg-header">
                <div class="arg-icon icon-success">${icons.checkCircle}</div>
                <div>
                  <h3 class="arg-title">Notre Solution (Avec Fidelio)</h3>
                  <div class="arg-subtitle">L'automatisation intelligente 24/7 sur-mesure</div>
                </div>
              </div>
              <ul class="arg-list">
                <li>
                  <span class="arg-bullet bullet-success">${icons.checkCircle}</span>
                  <span><strong>Réponses instantanées 24/7 en &lt;2 min :</strong> Vos prospects reçoivent le catalogue et leur lien de paiement immédiatement.</span>
                </li>
                <li>
                  <span class="arg-bullet bullet-success">${icons.checkCircle}</span>
                  <span><strong>Relances automatiques intelligentes :</strong> Fidelio relance automatiquement les devis en attente 24h et 48h après.</span>
                </li>
                <li>
                  <span class="arg-bullet bullet-success">${icons.checkCircle}</span>
                  <span><strong>Fidélisation & Réactivation :</strong> Messages d'anniversaire et réactivation automatique des clients silencieux après 90 jours.</span>
                </li>
                <li>
                  <span class="arg-bullet bullet-success">${icons.checkCircle}</span>
                  <span><strong>Tableau de bord Cockpit Web :</strong> Suivez toutes vos statistiques et votre chiffre d'affaires récupéré en direct.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- STATS -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-number">&lt;2min</div>
            <div class="stat-label">Temps de réponse garanti</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">72h</div>
            <div class="stat-label">Mise en place clé en main</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">2026</div>
            <div class="stat-label">Conçu à Cotonou, Bénin</div>
          </div>
        </div>
      </div>
    </section>

    <!-- COCKPIT SHOWCASE (DESKTOP WEB BROWSER MOCKUP SERVICE) -->
    <section class="pro-section" id="cockpit">
      <div class="container">
        <div class="pro-header">
          <div class="tag-pill tag-pill-dark">
            <span class="icon-box" style="color:#FBBF24;">${icons.globe}</span>
            <span>Cockpit Web Fidelio</span>
          </div>
          <h2 class="pro-title">Le tableau de bord de votre automatisation</h2>
          <p class="pro-subtitle">Fidelio est un service Web hébergé accessible sur navigateur. Gérez vos relances et scénarios en direct.</p>
        </div>

        <!-- MACOS DESKTOP WEB BROWSER WINDOW MOCKUP -->
        <div class="browser-showcase">
          <div class="browser-window">
            <!-- Browser Top Bar -->
            <div class="browser-top-bar">
              <div class="browser-dots">
                <div class="browser-dot red"></div>
                <div class="browser-dot yellow"></div>
                <div class="browser-dot green"></div>
              </div>
              <div class="browser-address-bar">
                <span class="icon-box" style="color:#25D366;">${icons.lock}</span>
                <span>https://<strong>app.fidelio.bj</strong>/dashboard/cotonou</span>
              </div>
              <div class="browser-nav-btns">
                <span class="icon-box">${icons.refreshCw}</span>
              </div>
            </div>

            <!-- Browser Main Dashboard Content Canvas -->
            <div class="browser-canvas">
              <div class="browser-dashboard-layout">
                <!-- Sidebar Menu inside Web App -->
                <div class="browser-sidebar">
                  <div style="display:flex;align-items:center;gap:10px;padding:0 8px 12px;border-bottom:1px solid rgba(255,255,255,0.08);">
                    <img src="/fidelio.svg" style="width:24px;height:24px;" alt="Fidelio Logo" />
                    <span style="font-weight:800;color:#FFF;font-size:15px;">Fidelio App</span>
                  </div>

                  <ul class="browser-sidebar-menu">
                    <li class="browser-sidebar-item active" onclick="switchBrowserTab(this, 'all')">
                      <span class="icon-box">${icons.activity}</span>
                      <span>Vue d'ensemble</span>
                    </li>
                    <li class="browser-sidebar-item" onclick="switchBrowserTab(this, 'relances')">
                      <span class="icon-box">${icons.refreshCw}</span>
                      <span>Relances Devis</span>
                    </li>
                    <li class="browser-sidebar-item" onclick="switchBrowserTab(this, 'fidelisation')">
                      <span class="icon-box">${icons.gift}</span>
                      <span>Fidélisation</span>
                    </li>
                    <li class="browser-sidebar-item" onclick="switchBrowserTab(this, 'vocal')">
                      <span class="icon-box">${icons.mic}</span>
                      <span>IA Vocale</span>
                    </li>
                  </ul>
                </div>

                <!-- Main Content Panel inside Web App -->
                <div class="browser-main-panel">
                  <!-- Metrics Row inside Browser -->
                  <div class="browser-metrics-row">
                    <div class="browser-metric-card">
                      <div class="browser-metric-lbl">Ventes Récupérées (Ce mois)</div>
                      <div class="browser-metric-val">+ 345 000 FCFA</div>
                    </div>
                    <div class="browser-metric-card">
                      <div class="browser-metric-lbl">Devis Relancés Auto</div>
                      <div class="browser-metric-val" style="color:#FBBF24;">23 Devis</div>
                    </div>
                    <div class="browser-metric-card">
                      <div class="browser-metric-lbl">Taux de Réponse 24/7</div>
                      <div class="browser-metric-val" style="color:#A5B4FC;">99.8 %</div>
                    </div>
                  </div>

                  <!-- Automation Control Buttons inside Browser Header -->
                  <div style="display:flex;align-items:center;justify-content:space-between;margin-top:6px;">
                    <div style="font-weight:800;font-size:15px;color:#FFF;display:flex;align-items:center;gap:8px;">
                      <span class="icon-box" style="color:#25D366;">${icons.zap}</span>
                      <span>Flux d'activités & Automations en direct</span>
                    </div>
                    <div class="pro-tabs" style="margin-top:0;">
                      <button class="pro-tab active" data-tab="all" onclick="switchProTab(this, 'all')">Toutes</button>
                      <button class="pro-tab" data-tab="relances" onclick="switchProTab(this, 'relances')">Relances</button>
                      <button class="pro-tab" data-tab="fidelisation" onclick="switchProTab(this, 'fidelisation')">Fidélité</button>
                      <button class="pro-tab" data-tab="vocal" onclick="switchProTab(this, 'vocal')">Vocal IA</button>
                    </div>
                  </div>

                  <!-- Dynamic Activity List inside Web Browser -->
                  <div class="cockpit-feed-list" id="cockpit-feed-container"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="cards-grid-3">
          <div class="feature-card-dark">
            <div class="feature-icon-badge">${icons.messageSquare}</div>
            <h3 class="feature-card-title">Réponse Instantanée</h3>
            <p class="feature-card-desc">Chaque message reçoit une réponse claire et adaptée en moins de 2 minutes, jour et nuit.</p>
            <span class="channel-tag">Canal : WhatsApp</span>
          </div>

          <div class="feature-card-dark">
            <div class="feature-icon-badge">${icons.refreshCw}</div>
            <h3 class="feature-card-title">Relance de Devis</h3>
            <p class="feature-card-desc">Devis et réservations en attente relancés automatiquement pour concrétiser vos opportunités.</p>
            <span class="channel-tag">Canaux : WhatsApp, SMS</span>
          </div>

          <div class="feature-card-dark">
            <div class="feature-icon-badge">${icons.gift}</div>
            <h3 class="feature-card-title">Fidélisation Client</h3>
            <p class="feature-card-desc">Anniversaires et offres de fidélité pour entretenir une relation durable avec vos clients.</p>
            <span class="channel-tag">Canaux : WhatsApp, Email</span>
          </div>
        </div>
      </div>
    </section>

    <!-- INFRASTRUCTURE -->
    <section class="build-section" id="infrastructure">
      <div class="container">
        <div class="build-grid">
          <div>
            <div class="tag-pill">
              <span class="icon-box" style="color:var(--gold-primary);">${icons.layers}</span>
              <span>Déploiement Clé en Main</span>
            </div>
            <h2 class="build-title">Activé en 72h sans effort technique</h2>
            <p class="build-desc">Aucun logiciel à installer. Nous configurons Fidelio sur votre numéro WhatsApp professionnel actuel sous 72h.</p>
            <div class="hero-cta-group" style="justify-content:flex-start;">
              <a href="${getWhatsAppUrl("Bonjour Fidelio, je souhaite planifier le déploiement de 72h pour mon entreprise.")}" target="_blank" class="btn btn-wa">
                <span class="icon-box">${icons.zap}</span>
                <span>Planifier mon activation (72h)</span>
              </a>
            </div>
          </div>

          <div class="cubes-visual-container">
            <div class="cubes-stack">
              <div class="cube-item">
                <span class="icon-box" style="color:#FBBF24;">${icons.messageSquare}</span>
                <span>Moteur WhatsApp 24/7</span>
              </div>
              <div class="cube-item">
                <span class="icon-box" style="color:#25D366;">${icons.refreshCw}</span>
                <span>Relances Automatiques</span>
              </div>
              <div class="cube-item">
                <span class="icon-box" style="color:#60A5FA;">${icons.creditCard}</span>
                <span>Passerelle Mobile Money</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CAS D'USAGE -->
    <section class="usecases-section" id="usecases">
      <div class="container">
        <div style="text-align:center;max-width:700px;margin:0 auto 50px;">
          <div class="tag-pill">
            <span class="icon-box" style="color:var(--gold-primary);">${icons.target}</span>
            <span>Secteurs d'Activité</span>
          </div>
          <h2 style="font-size:42px;font-weight:800;margin-top:16px;">Fidelio s'adapte à votre activité</h2>
        </div>

        <div class="cards-grid-3">
          <div class="usecase-card">
            <div class="usecase-icon-box">${icons.shoppingBag}</div>
            <h3 class="usecase-title">Commerces & Boutiques</h3>
            <p class="usecase-desc">Réponses instantanées sur les stocks, prix et livraisons, avec relance automatique des devis.</p>
          </div>

          <div class="usecase-card">
            <div class="usecase-icon-box">${icons.graduationCap}</div>
            <h3 class="usecase-title">Prestataires & Formateurs</h3>
            <p class="usecase-desc">Traitement rapide des demandes d'information et suivi régulier de vos prospects et clients.</p>
          </div>

          <div class="usecase-card">
            <div class="usecase-icon-box">${icons.building}</div>
            <h3 class="usecase-title">Agences & Services</h3>
            <p class="usecase-desc">Suivi personnalisé à long terme pour maintenir un contact privilégié avec votre clientèle.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CONFIANCE -->
    <section class="trust-section">
      <div class="container">
        <div style="text-align:center;max-width:650px;margin:0 auto 50px;">
          <div class="tag-pill">
            <span class="icon-box" style="color:var(--gold-primary);">${icons.shieldCheck}</span>
            <span>Nos Engagements</span>
          </div>
          <h2 style="font-size:42px;font-weight:800;margin-top:16px;">Des garanties claires pour votre tranquillité</h2>
        </div>

        <div class="trust-grid">
          <div class="trust-card">
            <div class="trust-icon-box">${icons.clock}</div>
            <div>
              <div class="trust-num">72h</div>
              <div class="trust-text">Installation clé en main</div>
            </div>
          </div>

          <div class="trust-card">
            <div class="trust-icon-box">${icons.zap}</div>
            <div>
              <div class="trust-num">24/7</div>
              <div class="trust-text">Disponibilité continue</div>
            </div>
          </div>

          <div class="trust-card">
            <div class="trust-icon-box">${icons.shieldCheck}</div>
            <div>
              <div class="trust-num">100%</div>
              <div class="trust-text">Garantie de réactivité</div>
            </div>
          </div>

          <div class="trust-card">
            <div class="trust-icon-box">${icons.lock}</div>
            <div>
              <div class="trust-num">0</div>
              <div class="trust-text">Engagement de durée</div>
            </div>
          </div>

          <div class="trust-card">
            <div class="trust-icon-box">${icons.creditCard}</div>
            <div>
              <div class="trust-num">Mobile Money</div>
              <div class="trust-text">Paiements acceptés (MTN, Moov, Wave)</div>
            </div>
          </div>

          <div class="trust-card">
            <div class="trust-icon-box">${icons.layers}</div>
            <div>
              <div class="trust-num">4 Formules</div>
              <div class="trust-text">Adaptées à votre rythme de croissance</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CALCULATEUR INTERACTIF (SIMULATEUR D'IMPACT) -->
    <section class="chart-section" id="calculator">
      <div class="container">
        <div class="chart-card-wrapper">
          <div style="text-align:center;max-width:700px;margin:0 auto 36px;">
            <div class="tag-pill">
              <span class="icon-box" style="color:var(--gold-primary);">${icons.trendingUp}</span>
              <span>Simulateur d'Impact</span>
            </div>
            <h2 style="font-size:38px;font-weight:800;margin-top:12px;">Estimez vos résultats avec Fidelio</h2>
            <p style="color:var(--text-secondary);font-size:15px;">Découvrez les opportunités préservées grâce à une réactivité 24/7 et des relances structurées.</p>
          </div>

          <!-- ULTRA-MODERN SIMULATOR CONTROL PANEL -->
          <div class="simulator-panel">
            <div class="simulator-header">
              <div class="simulator-label">
                <span class="icon-box" style="color:var(--gold-bright);">${icons.messageSquare}</span>
                <span>Volume de messages clients par jour</span>
              </div>
              <div class="simulator-badge" id="msgs-count-display">
                <span class="icon-box">${icons.zap}</span>
                <span>40 msgs / jour</span>
              </div>
            </div>

            <div class="slider-track-container">
              <input type="range" id="msgs-slider" class="custom-slider" min="10" max="200" step="5" value="40" />
              <div class="slider-ticks">
                <span>10 msgs</span>
                <span>50</span>
                <span>100</span>
                <span>150</span>
                <span>200 msgs/j</span>
              </div>
            </div>

            <div class="preset-chips-container">
              <span style="font-size:12px;color:#94A3B8;font-weight:600;">Sélection rapide :</span>
              <div class="preset-chips">
                <button class="preset-chip" onclick="setPresetMsgs(20)">20 / jour</button>
                <button class="preset-chip active" onclick="setPresetMsgs(40)">40 / jour</button>
                <button class="preset-chip" onclick="setPresetMsgs(80)">80 / jour</button>
                <button class="preset-chip" onclick="setPresetMsgs(150)">150 / jour</button>
              </div>
            </div>
          </div>

          <div class="yield-summary-cards">
            <div class="summary-card">
              <div class="summary-val" id="sum-recovered-sales" style="color:var(--wa-dark);">+ 270 000 FCFA</div>
              <div class="summary-lbl">Ventes Préservées par Mois</div>
            </div>
            <div class="summary-card">
              <div class="summary-val" id="sum-hours-saved" style="color:var(--violet-accent);">48 Heures</div>
              <div class="summary-lbl">Temps Économisé par Mois</div>
            </div>
            <div class="summary-card">
              <div class="summary-val" id="sum-response-rate" style="color:#25D366;">100% (&lt;2min)</div>
              <div class="summary-lbl">Taux de Réponse Garanti</div>
            </div>
          </div>

          <div style="height:320px;position:relative;margin-top:40px;">
            <canvas id="fidelioChart"></canvas>
          </div>

          <div class="chart-legend-box">
            Évolution comparative du taux de réponse client avant et après l'activation de Fidelio.
          </div>
        </div>
      </div>
    </section>

    <!-- PRICING SECTION -->
    <section class="pricing-section" id="pricing">
      <div class="container">
        <div class="pricing-header-box">
          <div class="tag-pill">
            <span class="icon-box" style="color:var(--gold-primary);">${icons.flame}</span>
            <span>Nos Offres & Tarifs</span>
          </div>
          <h2 style="font-size:42px;font-weight:800;margin-top:16px;">Formules simples et transparentes</h2>
          <p style="color:var(--text-secondary);font-size:16px;margin-top:8px;">
            Choisissez la formule qui correspond à votre activité. Aucune engagement de durée.
          </p>

          <div class="billing-toggle-wrapper">
            <button class="billing-toggle-btn ${!pricingState.isAnnual ? 'active' : ''}" onclick="setBillingCycle(false)">
              Facturation Mensuelle
            </button>
            <button class="billing-toggle-btn ${pricingState.isAnnual ? 'active' : ''}" onclick="setBillingCycle(true)">
              Facturation Annuelle
              <span class="billing-discount-badge">-20% d'économie</span>
            </button>
          </div>
        </div>

        <div class="pricing-grid-4" id="pricing-cards-container"></div>

        <div class="upsell-crosssell-container">
          <div class="addons-header">
            <div class="tag-pill">
              <span class="icon-box" style="color:var(--gold-bright);">${icons.zap}</span>
              <span>Options Complémentaires</span>
            </div>
            <h3 style="font-size:28px;font-weight:800;margin-top:12px;">Personnalisez votre solution</h3>
            <p style="color:var(--text-secondary);font-size:14px;margin-top:4px;">Sélectionnez les options souhaitées pour les ajouter à votre configuration.</p>
          </div>

          <div class="addons-grid" id="addons-grid-container"></div>

          <div class="order-summary-bar" id="order-summary-bar"></div>
        </div>

        <div class="downsell-box">
          <div>
            <span class="badge-status-green" style="background:#EDE9FE;color:var(--violet-dark);font-weight:800;padding:4px 12px;border-radius:12px;display:inline-flex;align-items:center;gap:6px;">
              <span class="icon-box">${icons.shieldCheck}</span>
              <span>Formule d'Essai & Garantie</span>
            </span>
            <div class="downsell-title" style="margin-top:8px;">Vous souhaitez débuter avec une formule d'essai ?</div>
            <div class="downsell-desc">
              Démarrez avec la formule <strong>Starter dès 9 900 FCFA pour le premier mois</strong> et profitez de notre garantie satisfait ou remboursé sous 30 jours.
            </div>
          </div>
          <a href="#" id="downsell-wa-btn" target="_blank" class="btn btn-gold" style="white-space:nowrap;padding:14px 28px;">
            <span>Profiter de l'offre d'essai →</span>
          </a>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="faq-section" id="faq">
      <div class="container">
        <div style="text-align:center;margin-bottom:50px;">
          <div class="tag-pill">
            <span class="icon-box" style="color:var(--gold-primary);">${icons.help}</span>
            <span>Questions Fréquentes</span>
          </div>
          <h2 style="font-size:40px;font-weight:800;margin-top:16px;">Vos questions sur Fidelio</h2>
        </div>

        <div class="faq-accordion">
          <div class="faq-item active">
            <button class="faq-question">
              <span>Quel est le délai de mise en place ?</span>
              <span class="icon-box">${icons.arrowRight}</span>
            </button>
            <div class="faq-answer">
              La mise en place complète est effectuée en <strong>72h</strong> suite à un échange d'orientation de 20 minutes avec notre équipe.
            </div>
          </div>

          <div class="faq-item">
            <button class="faq-question">
              <span>Faut-il utiliser un nouveau numéro WhatsApp ?</span>
              <span class="icon-box">${icons.arrowRight}</span>
            </button>
            <div class="faq-answer">
              Non. Fidelio se connecte directement sur votre numéro WhatsApp professionnel existant. Vous conservez l'historique de vos échanges.
            </div>
          </div>

          <div class="faq-item">
            <button class="faq-question">
              <span>Comment fonctionne la garantie de satisfaction ?</span>
              <span class="icon-box">${icons.arrowRight}</span>
            </button>
            <div class="faq-answer">
              Votre premier mois est garanti : si vos messages ne reçoivent pas une réactivité conforme en moins de 2 minutes, nous vous remboursons intégralement.
            </div>
          </div>

          <div class="faq-item">
            <button class="faq-question">
              <span>Comment les données sont-elles protégées ?</span>
              <span class="icon-box">${icons.arrowRight}</span>
            </button>
            <div class="faq-answer">
              Vos informations et vos échanges clients sont strictement confidentiels, sécurisés et uniquement accessibles par votre entreprise.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA FINAL -->
    <section class="cta-final-section">
      <div class="container">
        <div class="cta-final-card">
          <h2 class="cta-final-title">Optimisez votre réactivité sur WhatsApp dès aujourd'hui.</h2>
          <a href="${getWhatsAppUrl("Bonjour Fidelio, je souhaite réserver mon audit gratuit avec Fidelio.")}" target="_blank" class="btn btn-gold" style="font-size:18px;padding:18px 38px;">
            <span class="icon-box">${icons.phone}</span>
            <span>Réserver un audit gratuit →</span>
          </a>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div>
            <a href="#" class="nav-brand" style="color:#FFF;">
              <img src="/fidelio.svg" alt="Fidelio Logo" />
              <span>fidelio</span>
            </a>
            <p class="footer-bio" style="margin-top:12px;">Fidelio — Solution d'automatisation WhatsApp et de fidélisation pour entreprises.</p>
          </div>
          <div style="text-align:right;">
            <div style="font-weight:700;color:#FFF;margin-bottom:6px;">Contact & Assistance</div>
            <a href="${getWhatsAppUrl("Bonjour Fidelio")}" target="_blank" style="color:#25D366;text-decoration:none;font-weight:700;">
              WhatsApp Direct : +229 90 00 00 00
            </a>
            <div style="margin-top:4px;">Cotonou, Bénin</div>
          </div>
        </div>
        <div style="text-align:center;border-top:1px solid rgba(255,255,255,0.08);padding-top:20px;font-size:13px;">
          © 2026 Fidelio — Cotonou, Bénin. Tous droits réservés.
        </div>
      </div>
    </footer>
  `;

  renderCockpitFeed('all');
  initChart();
  updatePricingUI();
  attachEventListeners();
}

function renderCockpitFeed(filterKey) {
  const container = document.getElementById('cockpit-feed-container');
  if (!container) return;

  const records = COCKPIT_FEED_DATA[filterKey] || COCKPIT_FEED_DATA.all;
  container.innerHTML = records.map(item => `
    <div class="cockpit-feed-item">
      <div class="feed-item-header">
        <div class="feed-user-info">
          <div class="wa-avatar" style="width:28px;height:28px;font-size:11px;background:${item.avatarBg};">${item.avatar}</div>
          <div>
            <div style="font-size:12px;font-weight:700;color:#FFF;">${item.name}</div>
            <div style="font-size:9px;color:#94A3B8;">${item.phone} • ${item.channel}</div>
          </div>
        </div>
        <span class="badge-status-green" style="font-size:10px;padding:2px 8px;display:inline-flex;align-items:center;gap:4px;">
          <span class="icon-box">${icons.checkCircle}</span>
          <span>${item.status}</span>
        </span>
      </div>
      <div class="feed-msg-box">
        ${item.message}
      </div>
      <div class="feed-action-box">
        <span style="color:#A5B4FC;display:inline-flex;align-items:center;gap:4px;">
          <span class="icon-box">${icons.zap}</span>
          <span>${item.action}</span>
        </span>
        <span style="color:#64748B;">${item.time}</span>
      </div>
    </div>
  `).join('');
}

window.switchProTab = function(btn, tabKey) {
  document.querySelectorAll('.pro-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderCockpitFeed(tabKey);
};

window.switchBrowserTab = function(el, tabKey) {
  document.querySelectorAll('.browser-sidebar-item').forEach(item => item.classList.remove('active'));
  el.classList.add('active');
  renderCockpitFeed(tabKey);
};

function initChart() {
  const ctx = document.getElementById('fidelioChart');
  if (!ctx) return;

  calculatorState.chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Semaine 1 (Avant Fidelio)', 'Semaine 2', 'Semaine 3 (Déploiement)', 'Semaine 4 (Avec Fidelio)', 'Mois 2', 'Mois 3'],
      datasets: [
        {
          label: 'Taux de Réponse Client (%) avec Fidelio (24/7)',
          data: [35, 38, 75, 100, 100, 100],
          borderColor: '#25D366',
          backgroundColor: 'rgba(37, 211, 102, 0.12)',
          fill: true,
          tension: 0.4,
          borderWidth: 3,
          pointRadius: 6,
          pointBackgroundColor: '#25D366'
        },
        {
          label: 'Sans Fidelio',
          data: [35, 36, 34, 35, 33, 35],
          borderColor: '#94A3B8',
          borderDash: [5, 5],
          fill: false,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: { font: { family: 'Inter', size: 13, weight: '700' } }
        },
        tooltip: {
          callbacks: {
            label: (context) => `${context.dataset.label}: ${context.raw}%`
          }
        }
      },
      scales: {
        y: {
          min: 0,
          max: 100,
          ticks: { callback: (val) => `${val}%` }
        }
      }
    }
  });

  updateCalculatorSummaries();
}

function updateCalculatorSummaries() {
  const msgs = calculatorState.msgsPerDay;
  const recoveredSalesPerMonth = Math.round(msgs * 30 * 0.15 * calculatorState.avgOrderVal * 0.3);
  const hoursSaved = Math.round((msgs * 30 * 2) / 60);

  const elSales = document.getElementById('sum-recovered-sales');
  const elHours = document.getElementById('sum-hours-saved');

  if (elSales) elSales.textContent = `+ ${recoveredSalesPerMonth.toLocaleString('fr-FR')} FCFA`;
  if (elHours) elHours.textContent = `${hoursSaved} Heures`;
}

function updateSliderProgress(slider) {
  const min = parseFloat(slider.min) || 10;
  const max = parseFloat(slider.max) || 200;
  const val = parseFloat(slider.value);
  const percentage = ((val - min) / (max - min)) * 100;
  slider.style.setProperty('--slider-progress', `${percentage}%`);
  
  document.querySelectorAll('.preset-chip').forEach(chip => {
    const chipVal = parseInt(chip.textContent, 10);
    if (chipVal === val) chip.classList.add('active');
    else chip.classList.remove('active');
  });
}

function attachEventListeners() {
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const iconMenu = navToggle?.querySelector('.icon-menu');
  const iconClose = navToggle?.querySelector('.icon-close');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('active');
      if (iconMenu && iconClose) {
        iconMenu.style.display = isOpen ? 'none' : 'inline-flex';
        iconClose.style.display = isOpen ? 'inline-flex' : 'none';
      }
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if (iconMenu && iconClose) {
          iconMenu.style.display = 'inline-flex';
          iconClose.style.display = 'none';
        }
      });
    });
  }

  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      if (window.scrollY > 40) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    }
  });

  const slider = document.getElementById('msgs-slider');
  const display = document.getElementById('msgs-count-display');
  if (slider && display) {
    updateSliderProgress(slider);

    slider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      calculatorState.msgsPerDay = val;
      display.innerHTML = `<span class="icon-box">${icons.zap}</span><span>${val} msgs / jour</span>`;
      updateSliderProgress(slider);
      updateCalculatorSummaries();
    });
  }

  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
}

window.scrollToSection = function(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

document.addEventListener('DOMContentLoaded', renderApp);
