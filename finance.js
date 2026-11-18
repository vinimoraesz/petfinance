(function () {
  "use strict";

  const categories = [
    { id: "alimentacao", name: "Alimentação", icon: "food" },
    { id: "transporte", name: "Transporte", icon: "car" },
    { id: "viagem", name: "Viagem", icon: "plane" },
    { id: "entretenimento", name: "Entretenimento", icon: "game" },
    { id: "moradia", name: "Moradia", icon: "home" },
    { id: "saude", name: "Saúde", icon: "health" },
    { id: "seguros", name: "Seguros", icon: "shield" },
    { id: "educacao", name: "Educação", icon: "book" },
    { id: "outros", name: "Outros", icon: "more" },
  ];

  const budgetGroups = [
    { label: "Essenciais", shares: { moradia: 25, alimentacao: 15, transporte: 10 } },
    { label: "Saúde e proteção", shares: { saude: 10, seguros: 5 } },
    { label: "Lazer e viagens", shares: { entretenimento: 6, viagem: 4 } },
    { label: "Educação", shares: { educacao: 5 } },
    { label: "Investimentos e reserva", shares: { savings: 20 } },
  ];
  const normalizeName = value => value.toLocaleLowerCase("pt-BR").normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const breeds = [
    { id: "srd-dog", name: "Vira-lata", kind: "Cão", petName: "Paçoca", keywords: "srd caramelo sem raça definida" },
    { id: "shih-tzu", name: "Shih Tzu", kind: "Cão", petName: "Mimo" },
    { id: "yorkshire", name: "Yorkshire", kind: "Cão", petName: "Tico", keywords: "yorkie terrier" },
    { id: "spitz", name: "Lulu da Pomerânia", kind: "Cão", petName: "Fubá", keywords: "spitz alemão" },
    { id: "golden", name: "Golden", kind: "Cão", petName: "Caramelo", keywords: "golden retriever" },
    { id: "labrador", name: "Labrador", kind: "Cão", petName: "Mel", keywords: "labrador retriever" },
    { id: "pinscher", name: "Pinscher", kind: "Cão", petName: "Pimenta" },
    { id: "bulldog", name: "Bulldog Francês", kind: "Cão", petName: "Pipoca" },
    { id: "poodle", name: "Poodle", kind: "Cão", petName: "Pompom" },
    { id: "lhasa", name: "Lhasa Apso", kind: "Cão", petName: "Cookie" },
    { id: "dachshund", name: "Salsicha", kind: "Cão", petName: "Salsicha", keywords: "dachshund teckel" },
    { id: "pug", name: "Pug", kind: "Cão", petName: "Amendoim" },
    { id: "maltese", name: "Maltês", kind: "Cão", petName: "Algodão" },
    { id: "shepherd", name: "Pastor Alemão", kind: "Cão", petName: "Max" },
    { id: "rottweiler", name: "Rottweiler", kind: "Cão", petName: "Thor" },
    { id: "corgi", name: "Corgi", kind: "Cão", petName: "Biscoito", keywords: "welsh corgi" },
    { id: "tabby", name: "Vira-lata", kind: "Gato", petName: "Canela", keywords: "srd gato rajado sem raça definida" },
    { id: "siamese", name: "Siamês", kind: "Gato", petName: "Cacau" },
    { id: "persian", name: "Persa", kind: "Gato", petName: "Nuvem" },
    { id: "angora", name: "Angorá", kind: "Gato", petName: "Neve", keywords: "angorá turco" },
    { id: "himalayan", name: "Himalaio", kind: "Gato", petName: "Trufa" },
    { id: "ragdoll", name: "Ragdoll", kind: "Gato", petName: "Baunilha" },
    { id: "maine-coon", name: "Maine Coon", kind: "Gato", petName: "Cedro" },
    { id: "sphynx", name: "Sphynx", kind: "Gato", petName: "Yoda", keywords: "esfinge gato sem pelos" },
    { id: "bengal", name: "Bengal", kind: "Gato", petName: "Jade", keywords: "bengalês" },
    { id: "british-shorthair", name: "British Shorthair", kind: "Gato", petName: "Névoa", keywords: "pelo curto britânico" },
    { id: "american-shorthair", name: "Pelo Curto Americano", kind: "Gato", petName: "Prata", keywords: "american shorthair" },
  ];

  const maxCents = 99999999999;
  const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
  const decimals = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const shortDate = new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "short" });
  const longMonth = new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" });
  const money = cents => currency.format(cents / 100);
  const moneyInput = cents => decimals.format(cents / 100);
  const pad = value => String(value).padStart(2, "0");
  const frequencies = { once: "Único", weekly: "Semanal", daily: "Diário", monthly: "Mensal" };
  const payments = { credit: "Crédito", debit: "Débito", unspecified: "Não informado" };
  const paymentOf = entry => Object.hasOwn(payments, entry.payment) ? entry.payment : "unspecified";
  const frequencyOf = entry => Object.hasOwn(frequencies, entry.frequency) ? entry.frequency : "once";
  const newestFirst = (a, b) => b.date.localeCompare(a.date) || b.created - a.created;
  const dayMs = 86400000;
  const dayNumber = date => Date.parse(date + "T00:00:00Z") / dayMs;

  function shiftMonth(month, offset) {
    const date = new Date(month + "-01T00:00:00Z");
    date.setUTCMonth(date.getUTCMonth() + offset);
    return date.toISOString().slice(0, 7);
  }

  function expenseHistory(workspace, today, months) {
    const current = today.slice(0, 7);
    const rows = Array.from({ length: months }, (_, index) => ({
      month: shiftMonth(current, -index), cents: 0,
    }));
    const byMonth = new Map(rows.map(row => [row.month, row]));
    const byPayment = { credit: 0, debit: 0, unspecified: 0 };
    const entries = [];
    let total = 0;
    for (const entry of workspace.entries) {
      const row = byMonth.get(entry.date.slice(0, 7));
      if (!row || entry.date > today || entry.type !== "expense") continue;
      entries.push(entry);
      row.cents += entry.cents;
      byPayment[paymentOf(entry)] += entry.cents;
      total += entry.cents;
    }
    return { rows, byPayment, total, entries: entries.sort(newestFirst) };
  }

  function projectedCount(entry, start, end, monthStart) {
    const origin = dayNumber(entry.date);
    if (origin >= end) return 0;
    const frequency = frequencyOf(entry);
    if (frequency === "once") return Number(origin >= start);
    if (frequency === "monthly") {
      const day = Number(entry.date.slice(-2));
      const occurrence = Math.min(monthStart + day - 1, end - 1);
      return Number(occurrence >= start && occurrence >= origin);
    }
    const step = frequency === "weekly" ? 7 : 1;
    const first = origin + Math.max(0, Math.ceil((start - origin) / step)) * step;
    return Math.max(0, Math.ceil((end - first) / step));
  }

  function expenseForecast(workspace, today) {
    const current = today.slice(0, 7);
    const tomorrow = dayNumber(today) + 1;
    const expenses = workspace.entries.filter(entry => entry.type === "expense");
    return Array.from({ length: 4 }, (_, index) => {
      const month = shiftMonth(current, index);
      const monthStart = dayNumber(month + "-01");
      const start = Math.max(tomorrow, monthStart);
      const end = dayNumber(shiftMonth(month, 1) + "-01");
      const cents = expenses.reduce((sum, entry) => sum + entry.cents * projectedCount(entry, start, end, monthStart), 0);
      return { month, cents };
    });
  }

  function localDate() {
    const now = new Date();
    return String(now.getFullYear()).padStart(4, "0") + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate());
  }

  function dateLabel(date) {
    return shortDate.format(new Date(date + "T12:00:00")).replaceAll(".", "");
  }

  function monthLabel(month) {
    const value = longMonth.format(new Date(month + "-15T12:00:00"));
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  function parseCents(value) {
    const raw = String(value).trim();
    let decimal;
    if (/^\d+(,\d{1,2})?$/.test(raw) || /^\d{1,3}(\.\d{3})+(,\d{1,2})?$/.test(raw)) {
      decimal = raw.replaceAll(".", "").replace(",", ".");
    } else if (/^\d+\.\d{1,2}$/.test(raw)) {
      decimal = raw;
    } else {
      return null;
    }
    const [whole, fraction = ""] = decimal.split(".");
    const cents = Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
    return Number.isSafeInteger(cents) && cents <= maxCents ? cents : null;
  }

  function newWorkspace() {
    return {
      ownerName: "",
      entries: [],
      budgets: {},
      averageIncome: 0,
      budgetPlans: {},
      investmentGoals: {},
      investments: [],
      extraCategories: [],
      pet: { breed: "corgi", name: "Biscoito", customName: false },
      reviews: [],
    };
  }

  function newDemo(today) {
    const demo = newWorkspace();
    demo.averageIncome = 640000;
    const month = today.slice(0, 7);
    const day = Number(today.slice(-2));
    const dateAt = offset => month + "-" + pad(Math.max(1, day - offset));
    demo.budgets[month] = {
      alimentacao: 100000, transporte: 55000, viagem: 80000, entretenimento: 40000, moradia: 90000, saude: 35000,
    };
    demo.entries = [
      ["Padaria da esquina", "expense", "alimentacao", 4860, 0],
      ["Transporte por aplicativo", "expense", "transporte", 2840, 1],
      ["Cinema", "expense", "entretenimento", 6200, 2],
      ["Projeto freelance", "income", "receita", 90000, 3],
      ["Mercado", "expense", "alimentacao", 54200, 4],
      ["Streaming e show", "expense", "entretenimento", 32390, 5],
      ["Passagem de ônibus", "expense", "viagem", 24500, 6],
      ["Ônibus e metrô", "expense", "transporte", 28360, 8],
      ["Internet e contas", "expense", "moradia", 55900, 10],
      ["Farmácia", "expense", "saude", 11290, 11],
      ["Feira da semana", "expense", "alimentacao", 19200, 12],
      ["Salário", "income", "receita", 550000, 15],
    ].map(([name, type, category, cents, offset], index) => ({
      id: "demo-" + index, name, type, category, cents, date: dateAt(offset), created: 12 - index,
    }));
    demo.reviews = [dateAt(4)];
    return demo;
  }

  function entriesFor(workspace, month) {
    return workspace.entries.filter(entry => entry.date.startsWith(month + "-")).sort(newestFirst);
  }

  function allCategories(workspace) {
    const existing = workspace.extraCategories;
    return [...categories.filter(category => !existing.some(item =>
      normalizeName(item.name) === normalizeName(category.name))), ...existing];
  }

  function applyBudgetPlan(workspace, month) {
    if (!workspace.averageIncome) return;
    const plans = workspace.budgetPlans ||= {};
    plans[month] = workspace.averageIncome;
  }

  function budgetPlan(workspace, month) {
    const plans = workspace.budgetPlans || {};
    const start = Object.keys(plans).filter(date => date <= month).sort().at(-1);
    const income = plans[start] || 0;
    const limits = { ...workspace.budgets[month] };
    let goal = 0;
    if (income) {
      const available = allCategories(workspace);
      let allocated = 0;
      let cumulativeShare = 0;
      for (const { shares } of budgetGroups) {
        for (const [id, share] of Object.entries(shares)) {
          cumulativeShare += share;
          const subtotal = Math.round(income * cumulativeShare / 100);
          const amount = subtotal - allocated;
          allocated = subtotal;
          if (id === "savings") {
            goal = amount;
          } else {
            const base = categories.find(category => category.id === id);
            const category = available.find(item => item.id === id ||
              normalizeName(item.name) === normalizeName(base.name));
            limits[category.id] ??= amount;
          }
        }
      }
    }
    return { income, limits, goal: workspace.investmentGoals?.[month] ?? goal };
  }

  function investmentSummary(investment) {
    let deposits = 0;
    let withdrawals = 0;
    for (const movement of investment.movements) {
      if (movement.type === "deposit") deposits += movement.cents;
      else withdrawals += movement.cents;
    }
    const balance = investment.balance;
    return { balance, deposits, withdrawals, gain: balance + withdrawals - deposits };
  }

  function portfolioSummary(workspace, month) {
    const investments = workspace.investments || [];
    const totals = { balance: 0, deposits: 0, withdrawals: 0, gain: 0, monthlyDeposits: 0, monthlyWithdrawals: 0 };
    for (const investment of investments) {
      const summary = investmentSummary(investment);
      totals.balance += summary.balance;
      totals.deposits += summary.deposits;
      totals.withdrawals += summary.withdrawals;
      totals.gain += summary.gain;
      for (const movement of investment.movements) {
        if (!movement.date.startsWith(month + "-")) continue;
        if (movement.type === "deposit") totals.monthlyDeposits += movement.cents;
        else totals.monthlyWithdrawals += movement.cents;
      }
    }
    return { investments, ...totals };
  }

  function summarize(workspace, month) {
    const entries = entriesFor(workspace, month);
    const spending = {};
    let income = 0;
    let expense = 0;
    for (const entry of entries) {
      if (entry.type === "income") {
        income += entry.cents;
      } else {
        expense += entry.cents;
        spending[entry.category] = (spending[entry.category] || 0) + entry.cents;
      }
    }
    const { limits } = budgetPlan(workspace, month);
    const budgetRows = allCategories(workspace).map(category => {
      const limit = limits[category.id] || 0;
      const spent = spending[category.id] || 0;
      const status = limit === 0 ? "sem-limite" : spent > limit ? "acima" : spent >= limit * .8 ? "perto" : "dentro";
      return { category, limit, spent, status };
    });
    return { entries, income, expense, balance: income - expense, budgetRows };
  }

  function petMood(workspace, month, summary) {
    const exceeded = summary.budgetRows.filter(row => row.status === "acima");
    const checked = workspace.reviews.filter(date => date.startsWith(month + "-")).length;
    const activeDays = new Set(summary.entries.map(entry => entry.date)).size;
    const score = Math.min(100, 48 + Math.min(36, activeDays * 3) + Math.min(20, checked * 4));
    if (exceeded.length) {
      return {
        key: "triste", label: "Triste", score: Math.max(10, Math.min(45, score - 18 * exceeded.length)),
        message: "Seus gastos passaram do orçamento. " + workspace.pet.name + " está triste.",
        detail: "O limite foi ultrapassado em " + exceeded.map(row => row.category.name).join(", ") + ".",
      };
    }
    if (score >= 72) {
      const feeling = score >= 93 ? "muito feliz" : "feliz";
      const status = summary.balance > 0 && summary.expense > 0
        ? "Você está economizando neste mês."
        : "Você está acompanhando suas finanças.";
      return {
        key: "feliz", label: score >= 93 ? "Muito feliz" : "Feliz", score,
        message: status + " " + workspace.pet.name + " está " + feeling + "!",
      };
    }
    return { key: "calmo", label: "Tranquilo", score, message: "Registre seus lançamentos e revise o mês para deixar seu pet mais feliz." };
  }

  globalThis.GranaFinance = {
    breeds, money, moneyInput, localDate, dateLabel, monthLabel, parseCents, maxCents,
    newWorkspace, newDemo, allCategories, summarize, petMood,
    frequencies, payments, frequencyOf, paymentOf, expenseHistory, expenseForecast,
    budgetGroups, budgetPlan, applyBudgetPlan, investmentSummary, portfolioSummary, normalizeName,
  };
})();
