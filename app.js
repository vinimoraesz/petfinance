(function () {
  "use strict";

  const finance = globalThis.GranaFinance;
  const storageKey = "granapet.v1";
  const pages = {
    painel: "Cantinho",
    financas: "Finanças",
    lancamentos: "Lançamentos",
    orcamentos: "Orçamentos",
    investimentos: "Investimentos",
    renda: "Renda",
    pet: "Meu pet",
  };
  const icons = {
    transactions: '<path d="M3 7h17m-4-4 4 4-4 4M21 17H4m4-4-4 4 4 4"/>',
    pie: '<path d="M11 3a9 9 0 1 0 10 10H11z"/><path d="M14 2.5V10h7.5A9 9 0 0 0 14 2.5Z"/>',
    paw: '<ellipse cx="5.4" cy="9" rx="2.2" ry="3" transform="rotate(-27 5.4 9)"/><ellipse cx="10" cy="5.5" rx="2.1" ry="2.9" transform="rotate(-10 10 5.5)"/><ellipse cx="15.3" cy="5.8" rx="2.1" ry="2.9" transform="rotate(13 15.3 5.8)"/><ellipse cx="19.7" cy="9.7" rx="2.1" ry="2.9" transform="rotate(28 19.7 9.7)"/><path d="M12.4 11.5c-2.5 0-2.9 2.2-5 3.8-2.7 2.1-1.2 5.4 1.5 5.1 1.3 0 2.4-.6 3.5-.6s2.2.6 3.5.6c2.7.3 4.1-3 1.5-5.1-2-1.6-2.5-3.8-5-3.8Z"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    next: '<path d="m9 6 6 6-6 6"/>',
    right: '<path d="M4 12h15m-6-6 6 6-6 6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    wallet: '<path d="M20 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-2M3 7h15"/><path d="M22 9h-6a3.5 3.5 0 0 0 0 7h6zM16 12.5h.01"/>',
    income: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6.5 12h.01m11 0h.01"/>',
    incoming: '<path d="M17 7 7 17m0-8v8h8"/>',
    outgoing: '<path d="m7 17 10-10m-8 0h8v8"/>',
    food: '<path d="M4 3v6a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3V3M7 3v18m13 0V3c-3 1-4 4-4 8h4"/>',
    car: '<path d="m5 10 1.5-4h11L19 10M5 18v2m14-2v2M7 14h.01m10 0h.01"/><rect x="3" y="10" width="18" height="8" rx="2"/>',
    plane: '<path d="M20.8 3.2c-1.6-1.6-3.5.5-4.7 1.7l-3 3L5.5 5.7 3 8.2l6.3 3.5-3 3-2.8-.3L2 16l3.9 2.1L8 22l1.6-1.5-.3-2.8 3-3 3.5 6.3 2.5-2.5-2.2-7.6 3-3c1.2-1.2 3.3-3.1 1.7-4.7Z"/>',
    game: '<path d="M6.7 7h10.6a4 4 0 0 1 4 3.5l.6 4.9a2.3 2.3 0 0 1-3.8 2l-2.5-2.2H8.4l-2.5 2.2a2.3 2.3 0 0 1-3.8-2l.6-4.9a4 4 0 0 1 4-3.5Z"/><path d="M7.5 9.5v4m-2-2h4m6.5 0h.01m2.5 0h.01"/>',
    home: '<path d="m3 11 9-8 9 8M5 9.5v11h14v-11M10 20.5v-6h4v6"/>',
    health: '<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>',
    shield: '<path d="M12 22c5-2 8-5 8-11V5l-8-3-8 3v6c0 6 3 9 8 11Z"/><path d="m9 12 2 2 4-4"/>',
    book: '<path d="M4 19V5a2 2 0 0 1 2-2h14v18H6a2 2 0 1 1 0-4h14M8 7h8"/>',
    savings: '<rect x="3" y="8" width="18" height="13" rx="2"/><path d="M7 8V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3m-8 5h6m-3 0v4"/>',
    more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
    x: '<path d="m6 6 12 12M18 6 6 18"/>',
    edit: '<path d="m14 5 5 5M4 20l4-.8L20 7.3a2.1 2.1 0 0 0-3-3L5 16Zm9 0h8"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    example: '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="m10 8 6 4-6 4z"/>',
    search: '<circle cx="10.5" cy="10.5" r="5.5"/><path d="m15 15 5 5"/>',
  };

  const htmlEntities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  const esc = value => String(value).replace(/[&<>"']/g, char => htmlEntities[char]);
  const icon = (name, cssClass = "") => '<svg class="icon ' + cssClass + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + icons[name] + "</svg>";
  const $ = id => document.getElementById(id);
  const pageRoot = $("page");
  const shell = document.querySelector(".shell");
  const pageHeader = document.querySelector(".page-header");
  const dialog = $("dialog");
  const incomeCategory = { id: "receita", name: "Receita", icon: "incoming" };
  const spendSlices = ["#9e2933", "#dc767e", "#b54853", "#ef9ea4", "#c35a64", "#873841", "#e68890", "#ce4c58", "#a75961"];
  const limitSlices = ["#262626", "#898989", "#595959", "#bfbfbf", "#727272", "#424242", "#a3a3a3", "#969696", "#cfcfcf"];
  const percent = new Intl.NumberFormat("pt-BR", { style: "percent", maximumFractionDigits: 1 });
  const shortMonth = new Intl.DateTimeFormat("pt-BR", { month: "short", year: "numeric" });
  const tailLayout = {
    "srd-dog": { asset: "caramelo", size: 43, left: 65 },
    "shih-tzu": { asset: "silky-white", size: 43, left: 64, tint: "sepia(.2)" },
    yorkshire: { asset: "yorkshire", size: 42, left: 64 },
    spitz: { asset: "spitz", size: 48, left: 64 },
    golden: { asset: "golden", size: 42, left: 67, top: 48, origin: "8% 86%" },
    labrador: { asset: "labrador", size: 43, left: 64 },
    pinscher: { asset: "black-smooth", size: 36, left: 62 },
    bulldog: { asset: "bulldog", size: 42, left: 61, top: 49, origin: "12% 85%" },
    poodle: { asset: "poodle", size: 45, left: 64 },
    lhasa: { asset: "silky-white", size: 46, left: 65, tint: "sepia(.43) saturate(1.15)" },
    dachshund: { asset: "caramelo", size: 41, left: 62, tint: "brightness(.83) saturate(1.18)" },
    pug: { asset: "bulldog", size: 47, left: 66, origin: "12% 85%" },
    maltese: { asset: "silky-white", size: 43, left: 65 },
    shepherd: { asset: "shepherd", size: 42, left: 63 },
    rottweiler: { asset: "black-smooth", size: 49, left: 63 },
    corgi: { asset: "corgi", size: 43, left: 67, top: 51, origin: "13% 84%" },
    tabby: { asset: "tabby", size: 43, left: 66, top: 51, origin: "12% 84%" },
    siamese: { asset: "siamese", size: 46, left: 64, top: 48, origin: "8% 83%" },
    persian: { asset: "persian", size: 45, left: 66, top: 49, origin: "8% 85%" },
    angora: { asset: "silky-white", size: 48, left: 63 },
    himalayan: { asset: "persian", size: 47, left: 67, tint: "sepia(.7) brightness(.64)" },
    ragdoll: { asset: "persian", size: 46, left: 65, tint: "sepia(.24) brightness(.86)" },
    "maine-coon": { asset: "maine", size: 48, left: 63 },
    sphynx: { asset: "sphynx", size: 47, left: 60 },
    bengal: { asset: "bengal", size: 45, left: 64 },
    "british-shorthair": { asset: "british", size: 44, left: 62 },
    "american-shorthair": { asset: "maine", size: 44, left: 63, tint: "grayscale(1) brightness(1.26)" },
  };
  let month = finance.localDate().slice(0, 7);
  let budgetView = "categories";
  let historyMonths = 1;
  let galleryKind;
  let breedQuery = "";
  let breedPage = 0;
  let breedDrag;
  let notificationTimer;
  let dialogTrigger;

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      if (saved?.personal && saved?.demo && ["demo", "personal"].includes(saved.mode)) {
        return saved;
      }
    } catch {
      // The app can still run if storage is unavailable.
    }
    return { mode: "demo", personal: finance.newWorkspace(), demo: finance.newDemo(finance.localDate()) };
  }

  let state = loadState();
  const workspace = () => state[state.mode];
  const moneyTone = value => value > 0 ? "in" : value < 0 ? "out" : "neutral";
  const currentPage = () => {
    const route = location.hash.slice(1);
    return Object.hasOwn(pages, route) ? route : "painel";
  };
  const localToday = () => finance.localDate();
  const chooseBreed = id => finance.breeds.find(breed => breed.id === id) || finance.breeds.find(breed => breed.id === "corgi");

  function notify(message) {
    clearTimeout(notificationTimer);
    $("notification").textContent = message;
    notificationTimer = setTimeout(() => { $("notification").textContent = ""; }, 4500);
  }

  function save(message) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      message = "O navegador bloqueou o armazenamento. Os dados estão disponíveis somente nesta sessão.";
    }
    render();
    if (message) notify(message);
  }

  function categoryIcon(category) {
    return '<span class="category-icon">' + icon(category.icon) + "</span>";
  }

  function link(href, label) {
    return '<a class="text-link" href="#' + href + '">' + label + icon("right") + "</a>";
  }

  function action(label, name, iconName, classes, attributes = "") {
    return '<button type="button" class="button ' + classes + '" data-action="' + name + '" ' + attributes + ">" + (iconName ? icon(iconName) : "") + label + "</button>";
  }

  function panelHeader(title, subtitle, control = "") {
    return '<header class="panel-header"><div><h2>' + title + "</h2>" + (subtitle ? "<p>" + subtitle + "</p>" : "") + "</div>" + control + "</header>";
  }

  function segments(options, selected, actionName, label) {
    return '<div class="segments" role="group" aria-label="' + label + '">' + options.map(([value, text]) => (
      '<button type="button" data-action="' + actionName + '" data-id="' + value + '" aria-pressed="' + (value === selected) + '">' + text + "</button>"
    )).join("") + "</div>";
  }

  function selectSegment(trigger) {
    trigger.parentElement.querySelectorAll("button").forEach(button => {
      button.setAttribute("aria-pressed", String(button === trigger));
    });
  }

  function sprite(breed, mood, decorative = false, thumbnail = false) {
    const lying = mood === "triste";
    const pose = lying ? "deitado" : "sentado";
    const description = decorative ? 'aria-hidden="true"' : 'role="img" aria-label="' + breed.name + ' ' + pose + '"';
    let tailAttributes = "";
    if (!lying && !thumbnail) {
      const { asset, size, left, top = 87 - size * .84, origin = "12% 84%", tint = "none" } = tailLayout[breed.id];
      tailAttributes = ' data-tail style="--tail-image:url(./assets/pets/tail-' + asset + '.webp);--tail-size:' + size + "%;--tail-left:" + left +
        "%;--tail-top:" + top + "%;--tail-origin:" + origin + ";--tail-tint:" + tint + '"';
    }
    const source = "./assets/pets/" + breed.id + "-" + pose + ".webp";
    return '<span class="pet-sprite" data-pose="' + pose + '" data-mood="' + mood + '" ' + description + tailAttributes +
      '><img class="pet-body" src="' + source + '" alt="" width="512" height="512" decoding="async" draggable="false"' +
      (thumbnail ? ' loading="lazy"' : "") + "></span>";
  }

  function balanceChart(entries) {
    const lastEntryDay = entries.length ? Number(entries[0].date.slice(-2)) : 1;
    const currentDay = month === localToday().slice(0, 7) ? Number(localToday().slice(-2)) : 0;
    const cutoff = Math.max(lastEntryDay, currentDay, 2);
    const byDay = Array(cutoff + 1).fill(0);
    for (const entry of entries) {
      const day = Number(entry.date.slice(-2));
      byDay[day] += entry.cents * (entry.type === "income" ? 1 : -1);
    }
    let balance = 0;
    const timeline = byDay.map(delta => balance += delta);
    const min = Math.min(...timeline);
    const max = Math.max(...timeline);
    const yAt = value => max === min ? 54 : 74 - ((value - min) / (max - min)) * 56;
    const points = timeline.map((value, index) => [
      4 + (index / cutoff) * 239,
      yAt(value),
    ]);
    const line = "M" + points.map(point => point.map(pos => pos.toFixed(2)).join(",")).join(" L");
    const [x, y] = points.at(-1);
    const zero = yAt(0);
    const lineWidth = 2.5;
    const aboveZero = ((zero - lineWidth / 2) / 95).toFixed(4);
    const belowZero = ((zero + lineWidth / 2) / 95).toFixed(4);
    const area = line + " L243," + zero.toFixed(2) + " L4," + zero.toFixed(2) + " Z";
    return '<div class="balance-chart"><svg viewBox="0 0 247 95" preserveAspectRatio="none" role="img" aria-label="Evolução do saldo no mês"><defs>' +
      '<linearGradient id="balance-tone" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="95">' +
      '<stop offset="0" stop-color="var(--money-in)"/><stop offset="' + aboveZero + '" stop-color="var(--money-in)"/>' +
      '<stop offset="' + aboveZero + '" stop-color="#666"/><stop offset="' + belowZero + '" stop-color="#666"/>' +
      '<stop offset="' + belowZero + '" stop-color="var(--money-out)"/><stop offset="1" stop-color="var(--money-out)"/></linearGradient></defs>' +
      '<path d="M4 23h239M4 49h239M4 75h239" stroke="#dedede" stroke-dasharray="3 5" fill="none"/><path d="' + area +
      '" fill="url(#balance-tone)" fill-opacity=".14"/><path d="' + line + '" stroke="url(#balance-tone)" stroke-width="' + lineWidth +
      '" stroke-linejoin="round" stroke-linecap="round" fill="none"/>' +
      '<circle cx="' + x + '" cy="' + y + '" r="4.5" data-money="' + moneyTone(balance) + '" fill="var(--money-color, #666)" stroke="#fff" stroke-width="1.5"/></svg></div>';
  }

  function balanceCard(summary) {
    const formatted = (summary.balance < 0 ? "−" : "") + finance.moneyInput(Math.abs(summary.balance));
    const amount = (label, value, cost) => '<div class="amount-box" data-money="' + moneyTone(cost ? -value : value) +
      '"><span class="amount-icon">' + icon(cost ? "outgoing" : "incoming") + '</span><div><span>' + label +
      '</span><strong class="money-value">' + finance.money(value) + "</strong></div></div>";
    return '<section class="balance-card" aria-labelledby="balance-title"><h2 class="card-label" id="balance-title">Saldo do mês</h2><p class="balance-value money-value" data-money="' +
      moneyTone(summary.balance) + '"><small>R$</small> ' + formatted +
      '</p><div class="amounts">' + amount("Receitas", summary.income, false) + amount("Despesas", summary.expense, true) +
      '</div><details class="balance-details"><summary>Evolução do saldo' + icon("chevron") + "</summary>" + balanceChart(summary.entries) + "</details></section>";
  }

  function satisfactionBars(score) {
    const filled = Math.round(score / 20);
    const bars = Array.from({ length: 5 }, (_, index) => '<span class="satisfaction-bar"' +
      (index < filled ? ' data-filled' : '') + ' aria-hidden="true"></span>').join("");
    return '<span class="satisfaction-bars" role="meter" aria-label="Satisfação do pet" aria-valuemin="0" aria-valuemax="5" aria-valuenow="' +
      filled + '" aria-valuetext="' + filled + ' de 5 barras cheias">' + bars + "</span>";
  }

  function petCard(profile, mood) {
    const breed = chooseBreed(profile.breed);
    const detail = mood.detail ? '<p class="form-help">' + esc(mood.detail) + "</p>" : "";
    return '<section class="panel pet-card" aria-label="Mascote e satisfação"><div class="pet-profile"><div class="pet-info"><h2>' + esc(profile.name) + '</h2><p class="breed">' + breed.name +
      '</p><span class="mood-tag">' + mood.label + satisfactionBars(mood.score) + "</span>" +
      action("Editar nome", "rename", "edit", "button-outline pet-button") + '</div><div class="pet-illustration">' + sprite(breed, mood.key) +
      '</div></div><p class="pet-message">' + esc(mood.message) + "</p>" + detail + "</section>";
  }

  function roomView(profile, mood) {
    const breed = chooseBreed(profile.breed);
    const budgetAlert = mood.key === "triste"
      ? '<a class="button button-outline room-finance" href="#orcamentos">' + icon("pie") + "Ver limite estourado</a>"
      : '<a class="button button-outline room-finance" href="#financas">' + icon("wallet") + "Revisar mês</a>";
    const petPose = mood.key === "triste" ? "Deitado" : mood.key === "feliz" ? "Sentado, abanando o rabo" : "Sentado";
    const feedback = mood.key === "calmo" ? "" : '<p class="room-feedback">' + esc(mood.message) + "</p>";
    return '<section class="room-scene" data-mood="' + mood.key + '" aria-labelledby="room-name">' +
      '<div class="room-hud"><div class="room-identity"><h1 id="room-name">' + esc(profile.name) + '</h1><p>' + breed.name + '</p></div>' +
      '<div class="room-status"><strong>' + mood.label + "</strong>" + satisfactionBars(mood.score) + "</div>" + feedback + '</div>' +
      '<div class="room-avatar"><button class="room-pet" type="button" data-action="petting" data-mood="' + mood.key + '" aria-label="Fazer carinho em ' + esc(profile.name) + '" aria-description="' + petPose + '"><span class="room-shadow" aria-hidden="true"></span>' + sprite(breed, mood.key, true) +
      "</button></div>" +
      '<div class="room-actions">' + action("Registrar gasto", "transaction", "plus", "button-primary room-expense") + budgetAlert + "</div></section>";
  }

  function budgetList(rows) {
    return '<ul class="budget-list">' + rows.map(({ category, limit, spent, status }) => {
      const limitLabel = limit ? " / " + finance.money(limit) : " · Sem limite";
      const percent = limit ? Math.round((spent / limit) * 100) : 0;
      const note = status === "acima" ? finance.money(spent - limit) + " acima do limite" : status === "perto" ? percent + "% do limite utilizado" : "";
      const meter = limit
        ? '<span class="budget-track" aria-hidden="true"><span class="budget-fill" data-status="' + status + '" style="--percent:' + Math.min(percent, 100) + '%"></span></span>'
        : "";
      const noteLine = note ? '<span class="budget-note" data-status="' + status + '">' + note + "</span>" : "";
      return '<li class="budget-item"><button class="budget-row" type="button" data-action="budget" data-id="' + category.id + '" aria-label="Editar limite de ' + esc(category.name) +
        '" aria-describedby="budget-' + category.id + '">' + categoryIcon(category) + '<span class="budget-detail"><strong>' + esc(category.name) +
        '</strong><span id="budget-' + category.id + '"><span class="budget-numbers"><b class="money-value" data-money="' + moneyTone(-spent) + '">' +
        finance.money(spent) + "</b>" + limitLabel +
        "</span>" + noteLine + "</span>" + meter + "</span>" + icon("next", "row-arrow") + "</button></li>";
    }).join("") + "</ul>";
  }

  function transactionList(entries, emptyText, withAction = false) {
    if (!entries.length) {
      return '<div class="empty">' + emptyText + (withAction ? '<button type="button" class="text-link" data-action="transaction">Criar lançamento</button>' : "") + "</div>";
    }
    const categories = finance.allCategories(workspace());
    return '<ul class="transaction-list">' + entries.map(entry => {
      const received = entry.type === "income";
      const category = received ? incomeCategory : categories.find(item => item.id === entry.category) || categories.at(-1);
      const sign = received ? "+" : "−";
      const payment = finance.paymentOf(entry);
      const frequency = finance.frequencyOf(entry);
      const expenseDetails = received ? "" :
        (payment === "unspecified" ? "" : " · " + finance.payments[payment]) +
        (frequency === "once" ? "" : " · " + finance.frequencies[frequency]);
      return '<li class="transaction-item"><button class="transaction-row" type="button" data-action="transaction" data-id="' + entry.id + '">' + categoryIcon(category) + '<span class="transaction-detail"><strong>' + esc(entry.name) + "</strong><small>" + esc(category.name) + " · " + finance.dateLabel(entry.date) +
        expenseDetails + '</small></span><span class="transaction-value money-value" data-money="' + moneyTone(received ? entry.cents : -entry.cents) + '">' + sign + " " + finance.money(entry.cents) + "</span></button></li>";
    }).join("") + "</ul>";
  }

  function financialOverview(summary) {
    const exceeded = summary.budgetRows.filter(row => row.status === "acima").length;
    const alert = exceeded
      ? '<div class="budget-alert">' + link("orcamentos", exceeded === 1 ? "1 categoria acima do limite" : exceeded + " categorias acima do limite") + "</div>"
      : "";
    return '<div class="content-stack">' + balanceCard(summary) + alert + '<section class="panel">' +
      panelHeader("Investimentos e reserva", "Acompanhe o dinheiro guardado e o rendimento.", link("investimentos", "Ver investimentos")) + '</section><section class="panel">' +
      panelHeader("Lançamentos recentes", "", link("lancamentos", "Ver todos")) +
      transactionList(summary.entries.slice(0, 3), "Nenhum lançamento neste mês.", true) + "</section>" + expenseReports() + "</div>";
  }

  function expenseRows(rows, neutral = false) {
    return '<dl class="expense-report">' + rows.map(([label, cents, tone]) =>
      '<div><dt>' + esc(label) + '</dt><dd class="money-value" data-money="' + (tone ?? (neutral ? "neutral" : moneyTone(-cents))) + '">' +
      finance.money(cents) + "</dd></div>").join("") + "</dl>";
  }

  function historyContent(today) {
    const { rows, byPayment, total, entries } = finance.expenseHistory(workspace(), today, historyMonths);
    const paymentRows = Object.entries(finance.payments)
      .filter(([id]) => id !== "unspecified" || byPayment[id] > 0)
      .map(([id, label]) => [label, byPayment[id]]);
    return expenseRows([["Total no período", total], ...paymentRows]) +
      (rows.length > 1 ? expenseRows(rows.map(row => [finance.monthLabel(row.month), row.cents])) : "") +
      (entries.length ? '<details class="balance-details"><summary>Ver despesas do período' + icon("chevron") +
        '</summary>' + transactionList(entries, "") + "</details>" : "");
  }

  function expenseReports() {
    const today = localToday();
    const forecast = finance.expenseForecast(workspace(), today);
    const forecastRows = forecast.map((row, index) => [
      index === 0 ? "Restante deste mês" : finance.monthLabel(row.month), row.cents,
    ]);
    return '<section class="panel">' +
      panelHeader("Histórico de gastos", "Inclui o mês atual até hoje.") +
      segments([["1", "1 mês"], ["3", "3 meses"], ["6", "6 meses"]], String(historyMonths), "history-period", "Período do histórico") +
      '<div id="expense-history" aria-live="polite">' + historyContent(today) + '</div></section><section class="panel">' +
      panelHeader("Previsão de gastos", "Estimativa a partir de amanhã com base nas recorrências e nos gastos já agendados.") +
      (forecast.some(row => row.cents > 0) ? expenseRows(forecastRows) :
        '<div class="empty">Nenhum gasto futuro previsto. Registre uma despesa recorrente ou com data futura para começar.</div>') +
      "</section>";
  }

  function labeledOptions(options, selected) {
    return Object.entries(options).map(([id, label]) =>
      '<option value="' + id + '"' + (id === selected ? " selected" : "") + ">" + esc(label) + "</option>").join("");
  }

  function categoryOptions(selected) {
    return finance.allCategories(workspace()).map(category => '<option value="' + category.id + '"' + (category.id === selected ? " selected" : "") + ">" + esc(category.name) + "</option>").join("");
  }

  const filters = { query: "", type: "", category: "", payment: "" };
  const normalized = finance.normalizeName;

  function applyFilters(summary) {
    const query = normalized(filters.query.trim());
    const entries = summary.entries.filter(entry => (
      (!filters.type || filters.type === entry.type) &&
      (!filters.category || filters.category === entry.category) &&
      (!filters.payment || (entry.type === "expense" && filters.payment === finance.paymentOf(entry))) &&
      (!query || normalized(entry.name).includes(query))
    ));
    $("filtered-entries").innerHTML = transactionList(entries, !summary.entries.length ? "Nenhum lançamento neste mês." : "Nenhum lançamento corresponde aos filtros.", !summary.entries.length);
  }

  function transactions() {
    const kind = segments([["", "Todos"], ["expense", "Despesas"], ["income", "Receitas"]], filters.type, "filter-type", "Tipo de lançamento");
    return '<div class="content-stack"><div class="filters"><label class="search-field">' + icon("search") +
      '<input type="search" data-filter="query" aria-label="Buscar lançamento" placeholder="Buscar lançamento" value="' + esc(filters.query) + '"></label>' + kind +
      '<label class="filter-category"><span>Categoria</span><select data-filter="category"><option value="">Todas</option><option value="receita"' +
      (filters.category === "receita" ? " selected" : "") + ">Receita</option>" + categoryOptions(filters.category) +
      '</select></label><label class="filter-category"><span>Pagamento</span><select data-filter="payment">' +
      labeledOptions({ "": "Todos", ...finance.payments }, filters.payment) +
      '</select></label></div><section class="panel list-panel" aria-label="Lançamentos do mês" id="filtered-entries"></section></div>';
  }

  function roundedWedge(start, end) {
    const outer = 48;
    const inner = 30;
    const corner = Math.min(2.6, (end - start) * inner / 4);
    const outside = corner / outer;
    const inside = corner / inner;
    const point = (radius, angle) => (50 + radius * Math.cos(angle)).toFixed(3) + " " + (50 + radius * Math.sin(angle)).toFixed(3);
    const arc = (radius, from, to, clockwise) => (
      "A " + radius + " " + radius + " 0 " + (Math.abs(to - from) > Math.PI ? 1 : 0) + " " + clockwise + " " + point(radius, to)
    );
    return [
      "M " + point(outer, start + outside),
      arc(outer, start + outside, end - outside, 1),
      "Q " + point(outer, end) + " " + point(outer - corner, end),
      "L " + point(inner + corner, end),
      "Q " + point(inner, end) + " " + point(inner, end - inside),
      arc(inner, end - inside, start + inside, 0),
      "Q " + point(inner, start) + " " + point(inner + corner, start),
      "L " + point(outer - corner, start),
      "Q " + point(outer, start) + " " + point(outer, start + outside),
      "Z",
    ].join(" ");
  }

  function budgetPie(title, rows, fieldName, emptyMessage) {
    const isSpend = fieldName === "spent";
    const palette = isSpend ? spendSlices : limitSlices;
    const slices = rows.map((row, index) => ({
      name: row.category.name, value: row[fieldName], color: palette[index % palette.length],
    })).filter(slice => slice.value > 0);
    if (!slices.length) {
      return '<section class="panel pie-panel">' + panelHeader(title, "") + '<p class="empty">' + emptyMessage + "</p></section>";
    }
    const total = slices.reduce((sum, slice) => sum + slice.value, 0);
    let angle = -Math.PI / 2;
    const wedges = slices.length === 1
      ? '<circle cx="50" cy="50" r="39" fill="none" stroke="' + slices[0].color + '" stroke-width="18"></circle>'
      : slices.map(slice => {
        const span = (slice.value / total) * Math.PI * 2;
        const halfGap = Math.min(Math.PI / 128, span * .13);
        const path = roundedWedge(angle + halfGap, angle + span - halfGap);
        angle += span;
        return '<path fill="' + slice.color + '" d="' + path + '"></path>';
      }).join("");
    const legend = slices.map(slice => {
      const ratio = slice.value / total;
      const share = ratio < .001 ? "&lt;0,1%" : percent.format(ratio);
      return '<li><span class="pie-swatch" style="--slice:' + slice.color + '" aria-hidden="true"></span><div><strong>' + esc(slice.name) +
        '</strong><div class="pie-meta"><small class="money-value" data-money="' + (isSpend ? "out" : "neutral") + '">' + finance.money(slice.value) +
        '</small><span class="pie-share">' + share + "</span></div></div></li>";
    }).join("");
    const totalLabel = '<span class="money-value" data-money="' + (isSpend ? "out" : "neutral") + '">' +
      finance.money(total) + "</span> no mês";
    return '<section class="panel pie-panel">' + panelHeader(title, totalLabel) +
      '<div class="pie-layout"><svg class="budget-pie" viewBox="0 0 100 100" aria-hidden="true">' + wedges +
      '</svg><ul class="pie-legend">' + legend + "</ul></div></section>";
  }

  function budgets(summary) {
    const view = segments([["categories", "Categorias"], ["charts", "Gráficos"]], budgetView, "budget-view", "Visualização do orçamento");
    return '<div class="content-stack">' + view + '<div id="budget-content">' + budgetContent(summary) + '</div></div>';
  }

  function budgetContent(summary) {
    if (budgetView === "charts") {
      return '<div class="budget-charts">' + budgetPie("Gastos por categoria", summary.budgetRows, "spent", "Nenhuma despesa registrada neste mês.") +
        budgetPie("Limites por categoria", summary.budgetRows, "limit", "Defina limites para ver a distribuição do orçamento.") + "</div>";
    }
    const configured = summary.budgetRows.filter(row => row.limit > 0);
    const totalLimit = configured.reduce((total, row) => total + row.limit, 0);
    const exceeded = configured.filter(row => row.status === "acima").length;
    const note = exceeded === 1 ? "1 categoria acima do limite." : exceeded + " categorias acima do limite.";
    const average = workspace().averageIncome || 0;
    const plan = finance.budgetPlan(workspace(), month);
    const investmentGoal = plan.goal;
    const planned = totalLimit + investmentGoal;
    const context = average
      ? '<p>' + percent.format(planned / average) + " da renda média mensal.</p>"
      : link("renda", "Informar renda média");
    return '<div class="content-stack"><section class="panel tinted budget-overview"><h2>Total planejado</h2><strong>' + finance.money(planned) +
      "</strong>" + (exceeded ? '<p class="budget-warning">' + note + "</p>" : "") + context +
      (investmentGoal ? expenseRows([["Limites de gastos", totalLimit], ["Meta para guardar", investmentGoal]], true) : "") +
      "</section>" + budgetPlanCard(plan.income) +
      '<section class="panel list-panel" aria-label="Categorias de orçamento">' + budgetList(summary.budgetRows) +
      '</section>' + investmentGoalCard() + "</div>";
  }

  function budgetPlanCard(planIncome) {
    const groups = finance.budgetGroups.map(({ label, shares }) => {
      const share = Object.values(shares).reduce((sum, value) => sum + value, 0);
      return '<div><dt>' + label + '</dt><dd>' + share + "%</dd></div>";
    }).join("");
    const help = planIncome
      ? "Limites preenchidos com base em " + finance.money(planIncome) + " de renda mensal. Toque em uma categoria para ajustar o limite."
      : "Informe a renda mensal em Renda para preencher os limites automaticamente.";
    return '<section class="panel">' + panelHeader("Divisão sugerida da renda", help) +
      '<details class="balance-details"><summary>Ver divisão' + icon("chevron") + '</summary><dl class="expense-report">' + groups +
      "</dl></details></section>";
  }

  function investmentGoalCard(totals = finance.portfolioSummary(workspace(), month)) {
    const { goal } = finance.budgetPlan(workspace(), month);
    const saved = totals.monthlyDeposits - totals.monthlyWithdrawals;
    const progress = goal ? Math.min(100, Math.max(0, saved / goal * 100)) : 0;
    const control = action("Editar meta", "investment-goal", "", "button-outline");
    return '<section class="panel">' + panelHeader("Meta para guardar", finance.monthLabel(month), control) +
      expenseRows([["Aportes menos resgates", saved], ["Meta mensal", goal]], true) +
      (goal ? '<span class="budget-track" aria-hidden="true"><span class="budget-fill savings-progress" style="--percent:' +
        progress + '%"></span></span>' : "") +
      (currentPage() === "orcamentos" ? '<div class="section-actions">' + link("investimentos", "Ver investimentos") + "</div>" : "") +
      "</section>";
  }

  function investmentView() {
    const totals = finance.portfolioSummary(workspace(), month);
    const { investments, balance, deposits, withdrawals, gain } = totals;
    const cards = investments.map(investment => {
      const result = finance.investmentSummary(investment);
      const movements = [...investment.movements].reverse().sort((a, b) => b.date.localeCompare(a.date)).map(movement => [
        (movement.type === "deposit" ? "Aporte" : "Resgate") + " · " + movement.date.split("-").reverse().join("/"),
        movement.type === "deposit" ? movement.cents : -movement.cents,
      ]);
      return '<section class="panel"><div class="panel-header"><h2>' + esc(investment.name) + "</h2>" +
        action("Editar", "investment", "edit", "button-outline", 'data-id="' + investment.id + '"') + "</div>" +
        expenseRows([["Valor atual", result.balance], ["Rendimento acumulado", result.gain, moneyTone(result.gain)]], true) +
        (movements.length ? '<details class="balance-details"><summary>Ver aportes e resgates' + icon("chevron") + "</summary>" +
          expenseRows(movements, true) + "</details>" : "") +
        '<div class="section-actions">' + action("Registrar aporte ou resgate", "investment-movement", "plus", "button-outline", 'data-id="' + investment.id + '"') +
        "</div></section>";
    }).join("");
    const resultTone = moneyTone(gain);
    const returnRate = deposits ? " · " + percent.format(gain / deposits) + " sobre os aportes" : "";
    return '<div class="content-stack"><section class="panel tinted budget-overview"><h2>Total guardado</h2><strong>' + finance.money(balance) +
      '</strong><p class="investment-result money-value" data-money="' + resultTone + '">Rendimento acumulado ' +
      finance.money(gain) + returnRate + "</p>" +
      expenseRows([["Total aportado", deposits], ["Total resgatado", withdrawals]], true) +
      '<p class="form-help">Atualize o valor de cada investimento com o saldo informado pela sua instituição. O rendimento considera o saldo atual, os aportes e os resgates.</p></section>' +
      investmentGoalCard(totals) + (cards ||
        '<section class="panel">' + panelHeader("Seus investimentos", "Adicione uma aplicação ou reserva para começar a acompanhar.") + "</section>") + "</div>";
  }

  function incomeSettings(summary) {
    const average = workspace().averageIncome || 0;
    const value = average ? finance.moneyInput(average) : "";
    const comparison = average
      ? percent.format(summary.expense / average) + " da sua renda mensal média."
      : "Informe sua renda média para comparar com o total de gastos.";
    return '<div class="content-stack income-grid"><section class="panel">' + panelHeader("Renda mensal média", "Uma referência para comparar seus gastos.") +
      '<form class="form income-form" data-form="income">' + field("Valor mensal (R$)", '<input name="value" inputmode="decimal" maxlength="18" value="' + value + '" placeholder="0,00" aria-describedby="income-help">') +
      '<p class="form-help" id="income-help">Para remover a renda, salve o campo em branco.</p><p class="form-error" role="alert" hidden></p><button class="button button-primary" type="submit">Salvar renda</button></form></section>' +
      '<section class="panel tinted budget-overview"><h2>Gastos do mês</h2><strong class="money-value" data-money="' + moneyTone(-summary.expense) + '">' +
      finance.money(summary.expense) + "</strong><p>" + comparison + "</p>" + link("orcamentos", "Ver orçamentos") + "</section></div>";
  }

  function breedGallery() {
    const selected = workspace().pet.breed;
    const tokens = normalized(breedQuery).match(/[a-z0-9]+/g) || [];
    const available = finance.breeds.filter(breed => {
      const searchable = normalized(breed.name + " " + (breed.keywords || ""));
      return breed.kind === galleryKind && tokens.every(token => searchable.includes(token));
    });
    if (!available.length) return '<p class="empty">Nenhum pet encontrado.</p>';
    const cards = available.map(breed => '<button class="breed-option" type="button" data-action="breed" data-id="' + breed.id + '" aria-label="' +
      esc(breed.name) + '" aria-pressed="' + String(selected === breed.id) + '">' + sprite(breed, "calmo", true, true) + esc(breed.name) + "</button>");
    const pageSize = 3;
    const count = Math.ceil(available.length / pageSize);
    const slides = Array.from({ length: count }, (_, index) => {
      const start = index * pageSize;
      return '<div class="breed-slide" role="group" aria-label="Grupo ' + (index + 1) + " de " + count + '">' +
        cards.slice(start, start + pageSize).join("") + "</div>";
    }).join("");
    const controls = count > 1
      ? '<div class="breed-navigation">' +
        '<button type="button" class="icon-button" id="breed-prev" data-action="breed-slide" data-id="-1" aria-label="Pets anteriores" aria-controls="breed-carousel" disabled>' + icon("next", "previous-arrow") + "</button>" +
        '<span id="breed-counter" aria-live="polite" aria-atomic="true">1 de ' + count + "</span>" +
        '<button type="button" class="icon-button" id="breed-next" data-action="breed-slide" data-id="1" aria-label="Ver mais pets" aria-controls="breed-carousel">' + icon("next") + "</button></div>"
      : "";
    return '<div class="breed-carousel" id="breed-carousel" aria-label="Galeria de pets" role="group">' + slides + "</div>" + controls;
  }

  function updateBreedPage(track, index) {
    breedPage = index;
    const counter = $("breed-counter");
    if (!counter) return;
    const count = track.childElementCount;
    const label = (index + 1) + " de " + count;
    if (counter.textContent !== label) counter.textContent = label;
    $("breed-prev").disabled = index === 0;
    $("breed-next").disabled = index === count - 1;
  }

  function restoreBreedPage() {
    const track = $("breed-carousel");
    if (!track) return;
    const index = Math.min(breedPage, track.childElementCount - 1);
    track.scrollLeft = track.children[index].offsetLeft;
    updateBreedPage(track, index);
  }

  function refreshBreedGallery() {
    breedPage = 0;
    $("breed-gallery").innerHTML = breedGallery();
  }

  function goToBreedPage(track, index) {
    const page = Math.min(Math.max(0, index), track.childElementCount - 1);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: track.children[page].offsetLeft, behavior: reducedMotion ? "auto" : "smooth" });
  }

  function finishBreedDrag(event) {
    const drag = breedDrag;
    if (!drag || drag.pointer !== event.pointerId) return;
    breedDrag = undefined;
    if (!drag.moved || !drag.track.isConnected) return;
    drag.track.classList.remove("is-dragging");
    const distance = event.clientX - drag.x;
    const step = event.type === "pointerup" && Math.abs(distance) >= 34 ? -Math.sign(distance) : 0;
    goToBreedPage(drag.track, drag.page + step);
  }

  function petView(mood) {
    const profile = workspace().pet;
    const didReview = workspace().reviews.includes(localToday());
    const thisMonth = month === localToday().slice(0, 7);
    const review = thisMonth
      ? action(didReview ? "Revisão registrada hoje" : "Concluir revisão de hoje", "review", "check", "button-primary", didReview ? "disabled" : "")
      : '<p class="form-help">A revisão diária está disponível no mês atual.</p>';
    galleryKind ||= chooseBreed(profile.breed).kind;
    const species = segments([["Cão", "Cães"], ["Gato", "Gatos"]], galleryKind, "pet-kind", "Espécie");
    const search = '<label class="search-field">' + icon("search") + '<input id="breed-search" type="search" aria-label="Buscar raça" placeholder="Buscar nesta lista" value="' + esc(breedQuery) + '"></label>';
    return '<div class="content-stack">' + petCard(profile, mood) + '<section class="panel">' + panelHeader("Revisão diária", "") +
      '<div class="pet-actions">' + review + link("financas", "Conferir meu mês") + '</div></section><section class="panel">' +
      panelHeader("Escolher pet", "") + '<div class="pet-tools">' + species + search + '</div><div id="breed-gallery">' + breedGallery() + "</div></section></div>";
  }

  function setupOptions(kind, title, selected) {
    const choices = finance.breeds.filter(breed => breed.kind === kind).map(breed => (
      '<option value="' + breed.id + '"' + (selected?.id === breed.id ? " selected" : "") + ">" + esc(breed.name) + "</option>"
    )).join("");
    return '<optgroup label="' + title + '">' + choices + "</optgroup>";
  }

  function setupView(profile) {
    const hasProfileHistory = profile.pet.customName || profile.pet.breed !== "corgi" || profile.entries.length ||
      profile.reviews.length || profile.averageIncome || Object.keys(profile.budgets).length;
    const chosen = hasProfileHistory ? chooseBreed(profile.pet.breed) : null;
    const petName = chosen ? profile.pet.name : "";
    const income = profile.averageIncome ? finance.moneyInput(profile.averageIncome) : "";
    const options = setupOptions("Cão", "Cães", chosen) + setupOptions("Gato", "Gatos", chosen);
    const picker = '<select name="breed" id="setup-breed" required><option value=""' + (chosen ? "" : " selected") +
      ">Escolha um pet</option>" + options + "</select>";
    return '<section class="welcome" aria-labelledby="welcome-title"><h1 id="welcome-title">Bem-vindo!</h1>' +
      '<form class="panel form setup-form" data-form="setup">' +
      field("Seu nome", '<input name="ownerName" autocomplete="name" required maxlength="40" placeholder="Como você quer ser chamado?">') +
      '<div class="setup-income">' + field("Renda mensal média (R$)", '<input name="income" inputmode="decimal" maxlength="18" value="' + income +
        '" placeholder="0,00" aria-describedby="setup-income-help">') +
      '<p class="form-help" id="setup-income-help">Usamos sua renda para sugerir limites e uma meta para guardar. Você pode ajustar tudo depois.</p></div>' +
      '<div class="setup-pet">' + field("Animal de estimação", picker) +
      '<div id="setup-preview" class="setup-preview" aria-hidden="true"' + (chosen ? "" : " hidden") + ">" +
      (chosen ? sprite(chosen, "calmo", true, true) : "") + "</div></div>" +
      field("Nome do pet", '<input name="petName" id="setup-pet-name" required maxlength="20" autocomplete="off" value="' + esc(petName) +
        '" placeholder="Como ele se chama?">') +
      '<p class="form-error" role="alert" hidden></p><button class="button button-primary" type="submit">Começar</button></form></section>';
  }

  function render() {
    const profile = state.personal;
    const needsSetup = !profile.ownerName;
    const page = currentPage();
    const isRoom = page === "painel";
    $("site-nav").hidden = needsSetup;
    $("workspace-switch").hidden = needsSetup;
    pageHeader.hidden = needsSetup || isRoom;
    if (needsSetup) {
      shell.dataset.layout = "welcome";
      document.title = "Boas-vindas · PetFinance";
      pageRoot.innerHTML = setupView(profile);
      return;
    }
    const todayMonth = localToday().slice(0, 7);
    const displayedMonth = isRoom ? todayMonth : month;
    const summary = finance.summarize(workspace(), displayedMonth);
    const mood = finance.petMood(workspace(), displayedMonth, summary);
    const title = pages[page];
    shell.dataset.layout = isRoom ? "room" : "finance";
    $("page-title").textContent = title;
    document.title = title + " · PetFinance";
    const periodLabel = finance.monthLabel(month);
    $("period-trigger").setAttribute("aria-label", periodLabel);
    $("period-trigger").innerHTML = icon("calendar") + '<span class="period-full">' + periodLabel + '</span><span class="period-short">' +
      shortMonth.format(new Date(month + "-15T12:00:00")) + "</span>" + icon("chevron", "chevron");
    const demo = state.mode === "demo";
    $("workspace-switch").setAttribute("aria-label", demo ? "Dados de exemplo" : "Meus dados");
    $("workspace-switch").innerHTML = icon(demo ? "example" : "wallet") + '<span class="workspace-label">' +
      (demo ? "Dados de exemplo" : esc(profile.ownerName)) + "</span>" + icon("chevron", "chevron");
    let pageAction = "";
    if (page === "financas" || page === "lancamentos") {
      pageAction = action("Novo", "transaction", "plus", "button-primary", 'aria-label="Novo lançamento"');
    } else if (page === "orcamentos") {
      pageAction = action("Categoria", "category", "plus", "button-outline", 'aria-label="Nova categoria"');
    } else if (page === "investimentos") {
      pageAction = action("Novo", "investment", "plus", "button-primary", 'aria-label="Novo investimento"');
    }
    $("page-action").innerHTML = pageAction;
    document.querySelectorAll(".nav a").forEach(anchor => {
      if (anchor.dataset.page === page || (page === "investimentos" && anchor.dataset.page === "financas")) anchor.setAttribute("aria-current", "page");
      else anchor.removeAttribute("aria-current");
    });
    switch (page) {
      case "financas":
        pageRoot.innerHTML = financialOverview(summary);
        break;
      case "lancamentos":
        pageRoot.innerHTML = transactions();
        applyFilters(summary);
        break;
      case "orcamentos":
        pageRoot.innerHTML = budgets(summary);
        break;
      case "investimentos":
        pageRoot.innerHTML = investmentView();
        break;
      case "renda":
        pageRoot.innerHTML = incomeSettings(summary);
        break;
      case "pet":
        pageRoot.innerHTML = petView(mood);
        restoreBreedPage();
        break;
      default:
        pageRoot.innerHTML = roomView(workspace().pet, mood);
    }
  }

  function showDialog(title, markup, trigger) {
    if (!dialog.open) dialogTrigger = trigger;
    $("dialog-title").textContent = title;
    $("dialog-body").innerHTML = markup;
    if (!dialog.open) dialog.showModal();
    dialog.querySelector("[autofocus]")?.focus();
  }

  function form(name, controls, submit, extra = "") {
    return '<form class="form" data-form="' + name + '">' + controls + '<p class="form-error" role="alert" hidden></p><div class="form-actions">' + extra + action("Cancelar", "close", "", "button-outline") + '<button type="submit" class="button button-primary">' + submit + "</button></div></form>";
  }

  function field(label, markup) {
    return '<label class="field">' + label + markup + "</label>";
  }

  function editTransaction(id, trigger) {
    const entry = workspace().entries.find(item => item.id === id);
    const mode = entry?.type || "expense";
    const today = localToday();
    const date = entry?.date || (currentPage() === "painel" || month === today.slice(0, 7) ? today : month + "-01");
    const category = '<label class="field" id="transaction-category"' + (mode === "income" ? " hidden" : "") + '>Categoria<select name="category"' + (mode === "income" ? " disabled" : "") + ">" + categoryOptions(entry?.category) + "</select></label>";
    const type = field("Tipo", '<select name="type"><option value="expense">Despesa</option><option value="income"' + (mode === "income" ? " selected" : "") + ">Receita</option></select>");
    const expenseFields = '<div id="transaction-expense-fields"' + (mode === "income" ? " hidden" : "") + '><div class="form-row">' +
      field("Frequência", '<select name="frequency"' + (mode === "income" ? " disabled" : "") + ">" +
        labeledOptions(finance.frequencies, finance.frequencyOf(entry || {})) + "</select>") +
      field("Pagamento", '<select name="payment"' + (mode === "income" ? " disabled" : "") + ">" +
        labeledOptions(finance.payments, finance.paymentOf(entry || {})) + "</select>") +
      '</div><p class="form-help expense-form-help">A frequência entra na previsão de gastos.</p></div>';
    const body = (state.mode === "demo" ? '<p class="form-help">Este lançamento ficará nos dados de exemplo.</p>' : "") +
      field("Descrição", '<input name="name" required maxlength="80" placeholder="Ex.: compras do mercado" value="' + esc(entry?.name || "") + '" autofocus>') +
      '<div class="form-row">' + type + field("Valor (R$)", '<input name="value" inputmode="decimal" maxlength="18" placeholder="0,00" required value="' + (entry ? finance.moneyInput(entry.cents) : "") + '">') + '</div><div class="form-row">' + category +
      field("Data", '<input name="date" type="date" min="1900-01-01" max="9999-12-31" required value="' + date + '">') + "</div>" +
      expenseFields + '<input type="hidden" name="id" value="' + (entry?.id || "") + '">';
    const del = entry ? '<button type="button" class="text-link delete" data-action="confirm-delete" data-id="' + entry.id + '">Excluir</button>' : "";
    showDialog(entry ? "Editar lançamento" : "Novo lançamento", form("transaction", body, "Salvar", del), trigger);
  }

  function editBudget(id, trigger) {
    const category = finance.allCategories(workspace()).find(item => item.id === id);
    if (!category) return;
    const limit = finance.budgetPlan(workspace(), month).limits[id];
    const body = '<p class="workcopy">' + finance.monthLabel(month) + "</p>" +
      field("Limite (R$)", '<input name="value" inputmode="decimal" maxlength="18" placeholder="0,00" autofocus value="' + (limit ? finance.moneyInput(limit) : "") + '">') +
      '<p class="form-help">Deixe em branco ou use zero para remover o limite deste mês.</p><input type="hidden" name="id" value="' + id + '">';
    showDialog("Limite de " + category.name, form("budget", body, "Salvar limite"), trigger);
  }

  function investmentAmount(label, name, cents, attributes = "") {
    const value = cents === undefined ? "" : finance.moneyInput(cents);
    return field(label, '<input name="' + name + '" inputmode="decimal" maxlength="18" placeholder="0,00" value="' + value + '" ' + attributes + '>');
  }

  function investmentDate(label) {
    const today = localToday();
    return field(label, '<input name="date" type="date" min="1900-01-01" max="' + today + '" value="' + today + '" required>');
  }

  function editInvestment(id, trigger) {
    const investment = (workspace().investments || []).find(item => item.id === id);
    if (id && !investment) return;
    const name = field("Nome", '<input name="name" required maxlength="50" placeholder="Ex.: Reserva de emergência" value="' +
      esc(investment?.name || "") + '" autofocus>');
    const balance = investmentAmount("Valor atual (R$)", "balance", investment?.balance, investment ? "required" : "");
    const controls = investment
      ? balance + '<p class="form-help">Informe o saldo atual da aplicação para atualizar o rendimento.</p>'
      : investmentAmount("Valor já aplicado (R$)", "initial") + investmentDate("Data do aporte inicial") + balance +
        '<p class="form-help">Se o campo Valor atual ficar em branco, usamos o valor aplicado.</p>';
    const deleteButton = investment ? action("Excluir", "confirm-investment-delete", "", "button-outline button-danger", 'data-id="' + investment.id + '"') : "";
    showDialog(investment ? "Editar investimento" : "Novo investimento", form("investment", name + controls +
      '<input type="hidden" name="id" value="' + (investment?.id || "") + '">', "Salvar", deleteButton), trigger);
  }

  function editInvestmentMovement(id, trigger) {
    const investment = (workspace().investments || []).find(item => item.id === id);
    if (!investment) return;
    const controls = '<p class="workcopy">' + esc(investment.name) + "</p>" +
      field("Tipo", '<select name="type" autofocus><option value="deposit">Aporte</option><option value="withdrawal">Resgate</option></select>') +
      investmentAmount("Valor (R$)", "value", undefined, "required") + investmentDate("Data") +
      '<p class="form-help">O valor registrado ajusta o saldo da aplicação.</p><input type="hidden" name="id" value="' + id + '">';
    showDialog("Aporte ou resgate", form("investment-movement", controls, "Registrar"), trigger);
  }

  function editWorkspace(trigger) {
    const personal = state.mode === "personal";
    showDialog("Dados do PetFinance", '<p class="workspace-owner">' + esc(state.personal.ownerName) +
      '</p><p class="workcopy">Seus lançamentos, limites e pet ficam salvos neste navegador. Os dados de exemplo ficam em um espaço separado.</p><div class="workspace-options">' +
      action(personal ? "Meus dados · Em uso" : "Usar meus dados", "switch-mode", "wallet", personal ? "button-outline" : "button-primary", personal ? "disabled" : 'data-id="personal"') +
      action(personal ? "Ver dados de exemplo" : "Dados de exemplo · Em uso", "switch-mode", "example", "button-outline", personal ? 'data-id="demo"' : "disabled") + "</div>", trigger);
  }

  function formError(current, message) {
    const error = current.querySelector(".form-error");
    error.textContent = message;
    error.hidden = false;
  }

  function finish(message) {
    dialog.close();
    save(message);
  }

  const uid = () => globalThis.crypto?.randomUUID?.() || Date.now().toString(36) + "-" + Math.random().toString(36).slice(2);

  const submit = {
    setup(current, values) {
      const ownerName = values.get("ownerName").trim();
      const petName = values.get("petName").trim();
      const breed = finance.breeds.find(option => option.id === values.get("breed"));
      const rawIncome = values.get("income").trim();
      const averageIncome = rawIncome ? finance.parseCents(rawIncome) : 0;
      if (!ownerName || !petName || !breed) return formError(current, "Informe seu nome, escolha um pet e dê um nome a ele.");
      if (averageIncome === null) return formError(current, "Informe uma renda válida, como 3.500,00.");
      Object.assign(state.personal, { ownerName, averageIncome, pet: { breed: breed.id, name: petName, customName: true } });
      finance.applyBudgetPlan(state.personal, localToday().slice(0, 7));
      state.mode = "personal";
      save();
      window.scrollTo({ top: 0 });
      $("main").focus({ preventScroll: true });
    },
    income(current, values) {
      const raw = values.get("value").trim();
      const amount = raw ? finance.parseCents(raw) : 0;
      if (amount === null) return formError(current, "Informe um valor válido, como 3.500,00.");
      workspace().averageIncome = amount;
      finance.applyBudgetPlan(workspace(), localToday().slice(0, 7));
      save(amount ? "Renda média salva." : "Renda média removida.");
    },
    period(current, values) {
      const next = values.get("month");
      if (!/^(19\d{2}|[2-9]\d{3})-(0[1-9]|1[0-2])$/.test(next)) {
        return formError(current, "Escolha um mês válido a partir de 1900.");
      }
      month = next;
      dialog.close();
      render();
    },
    transaction(current, values) {
      const name = values.get("name").trim();
      const cents = finance.parseCents(values.get("value"));
      if (!name || !cents) return formError(current, "Informe uma descrição e um valor válido maior que zero.");
      const date = values.get("date");
      const type = values.get("type");
      const category = type === "income" ? "receita" : values.get("category");
      const id = values.get("id");
      const entries = workspace().entries;
      const entry = entries.find(item => item.id === id);
      if (id && !entry) return formError(current, "Este lançamento já foi excluído.");
      const change = { name, type, category, cents, date };
      if (type === "expense") {
        change.frequency = finance.frequencyOf({ frequency: values.get("frequency") });
        change.payment = finance.paymentOf({ payment: values.get("payment") });
      } else if (entry) {
        delete entry.frequency;
        delete entry.payment;
      }
      if (entry) Object.assign(entry, change);
      else entries.push({ ...change, id: uid(), created: Date.now() });
      if (month !== date.slice(0, 7)) month = date.slice(0, 7);
      finish(entry ? "Lançamento atualizado." : "Lançamento salvo.");
    },
    budget(current, values) {
      const raw = values.get("value").trim();
      const limit = raw ? finance.parseCents(raw) : 0;
      if (limit === null) return formError(current, "Informe um valor válido, como 350,00.");
      const id = values.get("id");
      const limits = workspace().budgets[month] ||= {};
      limits[id] = limit;
      finish(limit ? "Limite atualizado." : "Limite removido.");
    },
    "investment-goal"(current, values) {
      const raw = values.get("value").trim();
      const goal = raw ? finance.parseCents(raw) : 0;
      if (goal === null) return formError(current, "Informe uma meta válida.");
      const goals = workspace().investmentGoals ||= {};
      goals[month] = goal;
      finish(goal ? "Meta atualizada." : "Meta removida.");
    },
    investment(current, values) {
      const id = values.get("id");
      const name = values.get("name").trim();
      const investments = workspace().investments ||= [];
      const investment = investments.find(item => item.id === id);
      if (id && !investment) return formError(current, "Este investimento já foi excluído.");
      const initialRaw = values.get("initial")?.trim();
      const initial = initialRaw ? finance.parseCents(initialRaw) : 0;
      const balanceRaw = values.get("balance").trim();
      const balance = (balanceRaw || investment) ? finance.parseCents(balanceRaw) : initial;
      if (!name || initial === null || balance === null) {
        return formError(current, "Informe um nome e valores válidos.");
      }
      if (investment) {
        Object.assign(investment, { name, balance });
      } else {
        const date = values.get("date");
        if (!date || date > localToday()) return formError(current, "Informe uma data válida até hoje.");
        const movements = initial ? [{ type: "deposit", cents: initial, date }] : [];
        investments.push({ id: uid(), name, balance, movements });
      }
      finish(investment ? "Investimento atualizado." : "Investimento adicionado.");
    },
    "investment-movement"(current, values) {
      const investment = (workspace().investments || []).find(item => item.id === values.get("id"));
      if (!investment) return formError(current, "Este investimento já foi excluído.");
      const date = values.get("date");
      const type = values.get("type");
      const amount = finance.parseCents(values.get("value"));
      if (!amount || !date || date > localToday() || !["deposit", "withdrawal"].includes(type)) {
        return formError(current, "Informe um valor maior que zero e uma data válida até hoje.");
      }
      const balance = investment.balance + (type === "deposit" ? amount : -amount);
      if (balance < 0) return formError(current, "O resgate é maior que o saldo atual.");
      if (balance > finance.maxCents) return formError(current, "O saldo ultrapassaria o valor máximo permitido.");
      investment.movements.push({ type, cents: amount, date });
      investment.balance = balance;
      finish(type === "deposit" ? "Aporte registrado." : "Resgate registrado.");
    },
    "investment-delete"(current, values) {
      workspace().investments = (workspace().investments || []).filter(item => item.id !== values.get("id"));
      finish("Investimento excluído do PetFinance.");
    },
    category(current, values) {
      const name = values.get("name").trim();
      if (!name) return formError(current, "Informe o nome da categoria.");
      if (finance.allCategories(workspace()).some(category => normalized(name) === normalized(category.name))) {
        return formError(current, "Já existe uma categoria com esse nome.");
      }
      const extra = workspace().extraCategories;
      extra.push({ id: "custom-" + uid(), name, icon: "more" });
      budgetView = "categories";
      finish("Categoria criada.");
    },
    rename(current, values) {
      const name = values.get("name").trim();
      if (!name) return formError(current, "Informe um nome para seu pet.");
      workspace().pet.name = name;
      workspace().pet.customName = true;
      finish("Nome atualizado.");
    },
    delete(current, values) {
      const id = values.get("id");
      workspace().entries = workspace().entries.filter(entry => entry.id !== id);
      finish("Lançamento excluído.");
    },
  };

  const actions = {
    close: () => dialog.close(),
    workspace: (_, trigger) => editWorkspace(trigger),
    "switch-mode": mode => {
      state.mode = mode;
      filters.query = filters.type = filters.category = filters.payment = "";
      historyMonths = 1;
      budgetView = "categories";
      galleryKind = undefined;
      breedQuery = "";
      breedPage = 0;
      month = localToday().slice(0, 7);
      finish(mode === "personal" ? "Modo pessoal ativado." : "Dados de exemplo carregados.");
    },
    period: (_, trigger) => showDialog("Selecionar mês", form("period", field("Mês", '<input name="month" type="month" min="1900-01" max="9999-12" required value="' + month + '" autofocus>'), "Aplicar"), trigger),
    transaction: editTransaction,
    "history-period": (period, trigger) => {
      historyMonths = Number(period);
      selectSegment(trigger);
      $("expense-history").innerHTML = historyContent(localToday());
    },
    "filter-type": (type, trigger) => {
      filters.type = type;
      selectSegment(trigger);
      applyFilters(finance.summarize(workspace(), month));
    },
    "budget-view": (view, trigger) => {
      budgetView = view;
      selectSegment(trigger);
      $("budget-content").innerHTML = budgetContent(finance.summarize(workspace(), month));
    },
    budget: editBudget,
    "investment-goal": (_, trigger) => {
      const { goal } = finance.budgetPlan(workspace(), month);
      showDialog("Meta para guardar", form("investment-goal", '<p class="workcopy">' + finance.monthLabel(month) + "</p>" +
        investmentAmount("Meta mensal (R$)", "value", goal || undefined, "autofocus") +
        '<p class="form-help">Deixe em branco ou use zero para remover a meta deste mês.</p>', "Salvar meta"), trigger);
    },
    investment: editInvestment,
    "investment-movement": editInvestmentMovement,
    "confirm-investment-delete": (id, trigger) => {
      showDialog("Excluir investimento?", form("investment-delete", '<p class="workcopy">O histórico e os valores registrados desta aplicação serão removidos do PetFinance.</p>' +
        '<input type="hidden" name="id" value="' + id + '">', "Excluir"), trigger);
      dialog.querySelector('button[type="submit"]').classList.replace("button-primary", "button-danger");
    },
    category: (_, trigger) => showDialog("Nova categoria", form("category", field("Nome da categoria", '<input name="name" required maxlength="30" placeholder="Ex.: Educação" autofocus>'), "Criar categoria"), trigger),
    rename: (_, trigger) => showDialog("Nome do seu pet", form("rename", field("Nome", '<input name="name" required maxlength="20" value="' + esc(workspace().pet.name) + '" autofocus>'), "Salvar nome"), trigger),
    petting: (_, trigger) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        notify("Carinho feito em " + workspace().pet.name + ".");
        return;
      }
      const body = trigger.querySelector(".pet-body");
      body.getAnimations().forEach(animation => animation.cancel());
      body.animate([
        { transform: "none" },
        { transform: "translateY(-3%) scale(1.025)", offset: .42 },
        { transform: "none" },
      ], { duration: 340, easing: "ease-in-out" });
    },
    "pet-kind": (kind, trigger) => {
      galleryKind = kind;
      breedQuery = "";
      $("breed-search").value = "";
      selectSegment(trigger);
      refreshBreedGallery();
    },
    "breed-slide": direction => {
      const track = $("breed-carousel");
      goToBreedPage(track, breedPage + Number(direction));
    },
    breed: (id, trigger) => {
      const breed = chooseBreed(id);
      const profile = workspace().pet;
      if (profile.breed === breed.id) return;
      profile.breed = breed.id;
      if (!profile.customName) profile.name = breed.petName;
      save("Seu pet agora é " + breed.name + ".");
      pageRoot.querySelector('[data-action="breed"][data-id="' + trigger.dataset.id + '"]')?.focus();
    },
    review: () => {
      const today = localToday();
      if (month !== today.slice(0, 7) || workspace().reviews.includes(today)) return;
      workspace().reviews.push(today);
      save("Revisão de hoje registrada.");
      pageRoot.querySelector('a[href="#financas"]')?.focus();
    },
    "confirm-delete": (id, trigger) => {
      showDialog("Excluir lançamento?", form("delete", '<p class="workcopy">O lançamento será removido dos seus totais e do orçamento.</p><input type="hidden" name="id" value="' + id + '">', "Excluir"), trigger);
      dialog.querySelector('button[type="submit"]').classList.replace("button-primary", "button-danger");
    },
  };

  document.addEventListener("click", event => {
    if (event.target.closest(".room-finance")) {
      month = localToday().slice(0, 7);
      budgetView = "categories";
    }
    const trigger = event.target.closest("[data-action]");
    if (trigger && !trigger.disabled) actions[trigger.dataset.action]?.(trigger.dataset.id, trigger);
  });

  document.addEventListener("input", event => {
    const field = event.target;
    if (field.form?.dataset.form === "setup") {
      field.form.querySelector(".form-error").hidden = true;
      return;
    }
    if (field.id === "breed-search") {
      breedQuery = field.value;
      refreshBreedGallery();
      return;
    }
    if (!field.dataset.filter) return;
    filters[field.dataset.filter] = field.value;
    applyFilters(finance.summarize(workspace(), month));
  });

  document.addEventListener("change", event => {
    if (event.target.id !== "setup-breed") return;
    const breed = finance.breeds.find(option => option.id === event.target.value);
    const preview = $("setup-preview");
    preview.hidden = !breed;
    preview.innerHTML = breed ? sprite(breed, "calmo", true, true) : "";
    $("setup-pet-name").placeholder = breed ? "Ex.: " + breed.petName : "Como ele se chama?";
  });

  document.addEventListener("scroll", event => {
    const track = event.target;
    if (track.id !== "breed-carousel") return;
    let nearest = breedPage;
    let distance = Math.abs(track.children[nearest].offsetLeft - track.scrollLeft);
    Array.from(track.children).forEach((slide, index) => {
      const next = Math.abs(slide.offsetLeft - track.scrollLeft);
      if (next >= distance) return;
      nearest = index;
      distance = next;
    });
    if (nearest !== breedPage) updateBreedPage(track, nearest);
  }, { capture: true, passive: true });

  document.addEventListener("pointerdown", event => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const track = event.target.closest(".breed-carousel");
    if (!track || track.childElementCount < 2) return;
    breedDrag = { track, pointer: event.pointerId, x: event.clientX, left: track.scrollLeft, page: breedPage, moved: false };
  });

  document.addEventListener("pointermove", event => {
    const drag = breedDrag;
    if (!drag || drag.pointer !== event.pointerId) return;
    if (!(event.buttons & 1) || !drag.track.isConnected) {
      finishBreedDrag(event);
      return;
    }
    const distance = event.clientX - drag.x;
    if (!drag.moved && Math.abs(distance) < 7) return;
    if (!drag.moved) {
      drag.moved = true;
      drag.track.classList.add("is-dragging");
      drag.track.setPointerCapture(event.pointerId);
    }
    const width = drag.track.clientWidth;
    drag.track.scrollLeft = drag.left - Math.min(width, Math.max(-width, distance));
  });

  document.addEventListener("pointerup", finishBreedDrag);
  document.addEventListener("pointercancel", finishBreedDrag);

  dialog.addEventListener("change", event => {
    if (event.target.name !== "type") return;
    const container = $("transaction-category");
    const expenseFields = $("transaction-expense-fields");
    const isIncome = event.target.value === "income";
    container.hidden = isIncome;
    container.querySelector("select").disabled = isIncome;
    expenseFields.hidden = isIncome;
    expenseFields.querySelectorAll("select").forEach(select => { select.disabled = isIncome; });
  });

  document.addEventListener("submit", event => {
    const current = event.target;
    const name = current.dataset.form;
    if (!Object.hasOwn(submit, name)) return;
    event.preventDefault();
    submit[name](current, new FormData(current));
  });

  dialog.addEventListener("close", () => {
    if (dialogTrigger && document.contains(dialogTrigger)) dialogTrigger.focus();
    dialogTrigger = null;
  });

  document.querySelector(".skip").addEventListener("click", event => {
    event.preventDefault();
    $("main").focus();
  });

  window.addEventListener("hashchange", () => {
    if (!state.personal.ownerName) return;
    filters.query = filters.type = filters.category = "";
    budgetView = "categories";
    galleryKind = undefined;
    breedQuery = "";
    breedPage = 0;
    render();
    window.scrollTo({ top: 0 });
    $("main").focus({ preventScroll: true });
  });

  window.addEventListener("storage", event => {
    if (event.key !== storageKey && event.key !== null) return;
    if (dialog.open) dialog.close();
    state = loadState();
    render();
  });

  document.querySelectorAll("[data-icon]").forEach(node => { node.innerHTML = icon(node.dataset.icon); });
  render();
})();
