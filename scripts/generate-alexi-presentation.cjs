const pptxgen = require('pptxgenjs');

// ============================================================
// Alexi Presentation Generator
// SAP Corporate branding with Georgia/Calibri font pairing
// ============================================================

const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9'; // 10" x 5.625"
pres.author = 'Alexi Team';
pres.title = 'Alexi — Intelligent LLM Orchestrator for SAP AI Core';

// --- Color Palette ---
const C = {
  darkNavy: '0A1E3D',
  gold: 'F0AB00',
  lightBlue: '0070F2',
  offWhite: 'F5F6FA',
  bodyText: '2C3E50',
  muted: '7F8C8D',
  white: 'FFFFFF',
  cardBg: 'FFFFFF',
  cardBorder: 'DCE1E8',
  goldLight: 'FFF3CC',
};

// --- Font Helpers ---
const TITLE_FONT = 'Georgia';
const BODY_FONT = 'Calibri';

// Shadow factory (fresh object each time to avoid PptxGenJS mutation)
const makeShadow = () => ({
  type: 'outer',
  color: '000000',
  blur: 4,
  offset: 2,
  angle: 135,
  opacity: 0.1,
});
const makeCardShadow = () => ({
  type: 'outer',
  color: '000000',
  blur: 6,
  offset: 2,
  angle: 135,
  opacity: 0.12,
});

// ============================================================
// SLIDE 1 — Title Slide (Dark)
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.darkNavy };

  // Gold accent bar at top
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0,
    y: 0,
    w: 10,
    h: 0.06,
    fill: { color: C.gold },
  });

  // Gold diamond accent
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 4.7,
    y: 1.4,
    w: 0.5,
    h: 0.5,
    fill: { color: C.gold },
    rotate: 45,
  });

  // Title
  slide.addText('Alexi', {
    x: 0.5,
    y: 2.0,
    w: 9,
    h: 0.9,
    fontFace: TITLE_FONT,
    fontSize: 48,
    bold: true,
    color: C.white,
    align: 'center',
    margin: 0,
  });

  // Subtitle
  slide.addText('Intelligent LLM Orchestrator for SAP AI Core', {
    x: 0.5,
    y: 2.9,
    w: 9,
    h: 0.6,
    fontFace: BODY_FONT,
    fontSize: 20,
    color: C.gold,
    align: 'center',
    margin: 0,
  });

  // Version & info
  slide.addText('v0.2.6', {
    x: 0.5,
    y: 3.7,
    w: 9,
    h: 0.4,
    fontFace: BODY_FONT,
    fontSize: 14,
    color: C.muted,
    align: 'center',
    margin: 0,
  });

  // Bottom gold bar
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0,
    y: 5.565,
    w: 10,
    h: 0.06,
    fill: { color: C.gold },
  });
}

// ============================================================
// SLIDE 2 — The Challenge
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.offWhite };

  // Title
  slide.addText('The Challenge', {
    x: 0.6,
    y: 0.4,
    w: 9,
    h: 0.7,
    fontFace: TITLE_FONT,
    fontSize: 36,
    bold: true,
    color: C.darkNavy,
    margin: 0,
  });

  // Left column — problem bullets
  const problems = [
    {
      title: 'Fragmented Access',
      desc: 'LLMs scattered across multiple providers with different APIs and authentication',
    },
    {
      title: 'No Smart Routing',
      desc: 'Manual model selection — no intelligent matching of prompts to the right model',
    },
    {
      title: 'Missing Safeguards',
      desc: 'No enterprise-grade content filtering, PII masking, or compliance controls',
    },
    {
      title: 'Context Chaos',
      desc: 'Manual session management, no persistent memory, no cost tracking',
    },
  ];

  problems.forEach((p, i) => {
    const yBase = 1.35 + i * 1.0;
    // Gold circle marker
    slide.addShape(pres.shapes.OVAL, {
      x: 0.6,
      y: yBase + 0.05,
      w: 0.28,
      h: 0.28,
      fill: { color: C.gold },
    });
    slide.addText(String(i + 1), {
      x: 0.6,
      y: yBase + 0.05,
      w: 0.28,
      h: 0.28,
      fontFace: BODY_FONT,
      fontSize: 11,
      bold: true,
      color: C.darkNavy,
      align: 'center',
      valign: 'middle',
      margin: 0,
    });
    // Title
    slide.addText(p.title, {
      x: 1.1,
      y: yBase,
      w: 4,
      h: 0.3,
      fontFace: BODY_FONT,
      fontSize: 16,
      bold: true,
      color: C.darkNavy,
      margin: 0,
    });
    // Description
    slide.addText(p.desc, {
      x: 1.1,
      y: yBase + 0.32,
      w: 4,
      h: 0.5,
      fontFace: BODY_FONT,
      fontSize: 12,
      color: C.muted,
      margin: 0,
    });
  });

  // Right column — visual illustration box
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 5.8,
    y: 1.35,
    w: 3.6,
    h: 3.7,
    fill: { color: C.darkNavy },
    shadow: makeCardShadow(),
  });
  slide.addText(
    [
      {
        text: 'Enterprise AI\nToday',
        options: { breakLine: true, fontSize: 20, bold: true, color: C.gold, fontFace: TITLE_FONT },
      },
      { text: '\n', options: { breakLine: true, fontSize: 8 } },
      {
        text: 'Multiple APIs\nMultiple credentials\nNo unified control\nNo intelligent routing',
        options: { fontSize: 13, color: C.white, fontFace: BODY_FONT },
      },
    ],
    {
      x: 5.8,
      y: 1.35,
      w: 3.6,
      h: 3.7,
      align: 'center',
      valign: 'middle',
      margin: 0.3,
    }
  );
}

// ============================================================
// SLIDE 3 — What is Alexi?
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.offWhite };

  slide.addText('What is Alexi?', {
    x: 0.6,
    y: 0.4,
    w: 9,
    h: 0.7,
    fontFace: TITLE_FONT,
    fontSize: 36,
    bold: true,
    color: C.darkNavy,
    margin: 0,
  });

  const rows = [
    {
      icon: 'CLI',
      color: C.lightBlue,
      title: 'Unified CLI Tool',
      desc: "Available as alexi or ax — a single command-line interface to SAP AI Core's orchestration service",
    },
    {
      icon: 'AI',
      color: C.gold,
      title: 'Intelligent Auto-Routing',
      desc: 'Classifies every prompt by task type and complexity, then selects the optimal model automatically',
    },
    {
      icon: '25+',
      color: C.lightBlue,
      title: 'Autonomous Coding Agent',
      desc: '25+ built-in tools for file operations, bash execution, web access, code search, and memory',
    },
  ];

  rows.forEach((r, i) => {
    const yBase = 1.4 + i * 1.3;
    // Icon circle
    slide.addShape(pres.shapes.OVAL, {
      x: 0.6,
      y: yBase,
      w: 0.7,
      h: 0.7,
      fill: { color: r.color },
    });
    slide.addText(r.icon, {
      x: 0.6,
      y: yBase,
      w: 0.7,
      h: 0.7,
      fontFace: BODY_FONT,
      fontSize: 14,
      bold: true,
      color: C.white,
      align: 'center',
      valign: 'middle',
      margin: 0,
    });
    // Title
    slide.addText(r.title, {
      x: 1.55,
      y: yBase + 0.02,
      w: 7.5,
      h: 0.3,
      fontFace: BODY_FONT,
      fontSize: 18,
      bold: true,
      color: C.darkNavy,
      margin: 0,
    });
    // Description
    slide.addText(r.desc, {
      x: 1.55,
      y: yBase + 0.38,
      w: 7.5,
      h: 0.5,
      fontFace: BODY_FONT,
      fontSize: 13,
      color: C.muted,
      margin: 0,
    });
  });
}

// ============================================================
// SLIDE 4 — Key Capabilities (2x3 Grid)
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.offWhite };

  slide.addText('Key Capabilities', {
    x: 0.6,
    y: 0.4,
    w: 9,
    h: 0.7,
    fontFace: TITLE_FONT,
    fontSize: 36,
    bold: true,
    color: C.darkNavy,
    margin: 0,
  });

  const cards = [
    {
      title: 'Auto-Routing',
      desc: 'Classifies prompts, scores models, picks the best fit automatically',
      accent: C.gold,
    },
    {
      title: 'Agentic Tool Loop',
      desc: 'Autonomous multi-step task execution with tool calls',
      accent: C.lightBlue,
    },
    {
      title: '25+ Built-in Tools',
      desc: 'File ops, bash, web fetch, search, memory, browser',
      accent: C.gold,
    },
    {
      title: 'Multi-Model Support',
      desc: 'GPT, Claude, Gemini, Llama, Nova, DeepSeek, Mistral',
      accent: C.lightBlue,
    },
    {
      title: 'MCP Integration',
      desc: 'Client + Server for external tool extensibility',
      accent: C.gold,
    },
    {
      title: 'Enterprise Features',
      desc: 'Content filtering, PII masking, grounding, translation',
      accent: C.lightBlue,
    },
  ];

  cards.forEach((card, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.5 + col * 3.1;
    const y = 1.3 + row * 2.05;
    const w = 2.8;
    const h = 1.8;

    // Card background
    slide.addShape(pres.shapes.RECTANGLE, {
      x,
      y,
      w,
      h,
      fill: { color: C.cardBg },
      shadow: makeCardShadow(),
    });
    // Left accent bar
    slide.addShape(pres.shapes.RECTANGLE, {
      x,
      y,
      w: 0.06,
      h,
      fill: { color: card.accent },
    });
    // Title
    slide.addText(card.title, {
      x: x + 0.2,
      y: y + 0.2,
      w: w - 0.4,
      h: 0.4,
      fontFace: BODY_FONT,
      fontSize: 15,
      bold: true,
      color: C.darkNavy,
      margin: 0,
    });
    // Description
    slide.addText(card.desc, {
      x: x + 0.2,
      y: y + 0.7,
      w: w - 0.4,
      h: 0.9,
      fontFace: BODY_FONT,
      fontSize: 12,
      color: C.muted,
      margin: 0,
    });
  });
}

// ============================================================
// SLIDE 5 — Supported Models (Grouped Columns)
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.offWhite };

  slide.addText('Supported Models', {
    x: 0.6,
    y: 0.4,
    w: 9,
    h: 0.7,
    fontFace: TITLE_FONT,
    fontSize: 36,
    bold: true,
    color: C.darkNavy,
    margin: 0,
  });

  const families = [
    { name: 'OpenAI', models: 'GPT-4o\nGPT-4.1\nGPT-5', color: C.lightBlue },
    { name: 'Anthropic', models: 'Claude 4.5 Opus\nClaude Sonnet\nClaude Haiku', color: C.gold },
    { name: 'Google', models: 'Gemini', color: C.lightBlue },
    { name: 'Amazon', models: 'Nova', color: C.gold },
    { name: 'Meta', models: 'Llama', color: C.lightBlue },
    { name: 'DeepSeek', models: 'DeepSeek', color: C.gold },
    { name: 'Mistral', models: 'Mistral', color: C.lightBlue },
    { name: 'SAP', models: 'ABAP', color: C.gold },
  ];

  families.forEach((f, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const x = 0.5 + col * 2.35;
    const y = 1.3 + row * 2.05;
    const w = 2.1;
    const h = 1.8;

    // Card background
    slide.addShape(pres.shapes.RECTANGLE, {
      x,
      y,
      w,
      h,
      fill: { color: C.cardBg },
      shadow: makeCardShadow(),
    });
    // Header bar
    slide.addShape(pres.shapes.RECTANGLE, {
      x,
      y,
      w,
      h: 0.4,
      fill: { color: f.color },
    });
    slide.addText(f.name, {
      x,
      y,
      w,
      h: 0.4,
      fontFace: BODY_FONT,
      fontSize: 13,
      bold: true,
      color: C.white,
      align: 'center',
      valign: 'middle',
      margin: 0,
    });
    // Models list
    slide.addText(f.models, {
      x: x + 0.15,
      y: y + 0.5,
      w: w - 0.3,
      h: h - 0.6,
      fontFace: BODY_FONT,
      fontSize: 11,
      color: C.bodyText,
      valign: 'top',
      margin: 0,
    });
  });
}

// ============================================================
// SLIDE 6 — Intelligent Auto-Routing (Flow Diagram)
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.offWhite };

  slide.addText('Intelligent Auto-Routing', {
    x: 0.6,
    y: 0.4,
    w: 9,
    h: 0.7,
    fontFace: TITLE_FONT,
    fontSize: 36,
    bold: true,
    color: C.darkNavy,
    margin: 0,
  });

  const steps = [
    { label: 'Prompt\nInput', color: C.darkNavy },
    { label: 'Task\nClassification', color: C.lightBlue },
    { label: 'Complexity\nAssessment', color: C.lightBlue },
    { label: 'Model\nScoring', color: C.lightBlue },
    { label: 'Best Model\nSelected', color: C.gold },
  ];

  const stepW = 1.5;
  const stepH = 1.2;
  const gap = 0.35;
  const totalW = steps.length * stepW + (steps.length - 1) * gap;
  const startX = (10 - totalW) / 2;
  const yCenter = 2.3;

  steps.forEach((s, i) => {
    const x = startX + i * (stepW + gap);
    // Box
    slide.addShape(pres.shapes.RECTANGLE, {
      x,
      y: yCenter,
      w: stepW,
      h: stepH,
      fill: { color: s.color },
      shadow: makeShadow(),
    });
    slide.addText(s.label, {
      x,
      y: yCenter,
      w: stepW,
      h: stepH,
      fontFace: BODY_FONT,
      fontSize: 12,
      bold: true,
      color: C.white,
      align: 'center',
      valign: 'middle',
      margin: 0,
    });
    // Arrow between boxes
    if (i < steps.length - 1) {
      const arrowX = x + stepW + 0.02;
      slide.addShape(pres.shapes.LINE, {
        x: arrowX,
        y: yCenter + stepH / 2,
        w: gap - 0.04,
        h: 0,
        line: { color: C.muted, width: 2 },
      });
    }
  });

  // Classification labels below
  const classLabels = ['coding', 'reasoning', 'creative', 'QA'];
  const classX = startX + (stepW + gap);
  classLabels.forEach((lbl, i) => {
    slide.addText(lbl, {
      x: classX + i * 0.95,
      y: yCenter + stepH + 0.2,
      w: 0.85,
      h: 0.3,
      fontFace: BODY_FONT,
      fontSize: 9,
      italic: true,
      color: C.muted,
      align: 'center',
      margin: 0,
    });
  });

  // Extra info
  slide.addText(
    [
      { text: 'Hot-reloadable routing config', options: { breakLine: true } },
      { text: '--prefer-cheap flag for cost optimization', options: {} },
    ],
    {
      x: 0.6,
      y: 4.3,
      w: 8.5,
      h: 0.8,
      fontFace: BODY_FONT,
      fontSize: 12,
      color: C.muted,
      margin: 0,
      bullet: true,
    }
  );
}

// ============================================================
// SLIDE 7 — Architecture Overview (Layered Boxes)
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.offWhite };

  slide.addText('Architecture Overview', {
    x: 0.6,
    y: 0.3,
    w: 9,
    h: 0.6,
    fontFace: TITLE_FONT,
    fontSize: 34,
    bold: true,
    color: C.darkNavy,
    margin: 0,
  });

  const layers = [
    { label: 'CLI Layer', detail: 'Commander + Ink/React TUI', color: C.darkNavy },
    {
      label: 'Core Layer',
      detail: 'Orchestrator, Router, Session Mgr, Memory, Cost Tracker',
      color: C.lightBlue,
    },
    {
      label: 'Agent Layer',
      detail: 'Code, Debug, Plan, Explore, Orchestrator Agents',
      color: '1A5276',
    },
    { label: 'Tool Layer', detail: '25 Built-in Tools + MCP Tools', color: C.lightBlue },
    { label: 'Provider Layer', detail: 'SAP Orchestration Provider', color: '1A5276' },
    {
      label: 'SAP AI Core',
      detail: 'Content Filter, DPI, Grounding, Translation',
      color: C.darkNavy,
    },
    {
      label: 'LLM Models',
      detail: 'GPT, Claude, Gemini, Llama, Nova, DeepSeek, Mistral',
      color: C.gold,
    },
  ];

  const layerW = 8.0;
  const layerH = 0.52;
  const layerGap = 0.1;
  const startX = (10 - layerW) / 2;
  const startY = 1.05;

  layers.forEach((l, i) => {
    const y = startY + i * (layerH + layerGap);
    slide.addShape(pres.shapes.RECTANGLE, {
      x: startX,
      y,
      w: layerW,
      h: layerH,
      fill: { color: l.color },
    });
    slide.addText(l.label, {
      x: startX + 0.2,
      y,
      w: 2.2,
      h: layerH,
      fontFace: BODY_FONT,
      fontSize: 11,
      bold: true,
      color: C.white,
      valign: 'middle',
      margin: 0,
    });
    slide.addText(l.detail, {
      x: startX + 2.5,
      y,
      w: layerW - 2.7,
      h: layerH,
      fontFace: BODY_FONT,
      fontSize: 10,
      color: C.white,
      valign: 'middle',
      margin: 0,
      align: 'right',
    });

    // Down arrow between layers
    if (i < layers.length - 1) {
      const arrowY = y + layerH + 0.01;
      slide.addText('\u25BC', {
        x: startX + layerW / 2 - 0.15,
        y: arrowY,
        w: 0.3,
        h: layerGap - 0.02,
        fontFace: BODY_FONT,
        fontSize: 7,
        color: C.muted,
        align: 'center',
        valign: 'middle',
        margin: 0,
      });
    }
  });

  // Caption
  slide.addText('Layered architecture with clean separation of concerns', {
    x: 0.6,
    y: 5.1,
    w: 8.5,
    h: 0.3,
    fontFace: BODY_FONT,
    fontSize: 11,
    italic: true,
    color: C.muted,
    margin: 0,
  });
}

// ============================================================
// SLIDE 8 — Agent System (Table)
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.offWhite };

  slide.addText('Agent System', {
    x: 0.6,
    y: 0.4,
    w: 9,
    h: 0.7,
    fontFace: TITLE_FONT,
    fontSize: 36,
    bold: true,
    color: C.darkNavy,
    margin: 0,
  });

  const headerOpts = {
    fill: { color: C.darkNavy },
    color: C.white,
    bold: true,
    fontFace: BODY_FONT,
    fontSize: 12,
    align: 'center',
    valign: 'middle',
  };
  const cellOpts = {
    fill: { color: C.cardBg },
    color: C.bodyText,
    fontFace: BODY_FONT,
    fontSize: 11,
    valign: 'middle',
  };
  const cellOptsAlt = {
    fill: { color: 'F0F2F8' },
    color: C.bodyText,
    fontFace: BODY_FONT,
    fontSize: 11,
    valign: 'middle',
  };

  const tableData = [
    [
      { text: 'Agent', options: headerOpts },
      { text: 'Role', options: headerOpts },
      { text: 'Tool Access', options: headerOpts },
    ],
    [
      { text: 'Code', options: { ...cellOpts, bold: true } },
      { text: 'General coding, all tool access', options: cellOpts },
      { text: 'Full (25+ tools)', options: cellOpts },
    ],
    [
      { text: 'Debug', options: { ...cellOptsAlt, bold: true } },
      { text: 'Bug fixing, error analysis', options: cellOptsAlt },
      { text: 'Full (25+ tools)', options: cellOptsAlt },
    ],
    [
      { text: 'Plan', options: { ...cellOpts, bold: true } },
      { text: 'Architecture, read-only analysis', options: cellOpts },
      { text: 'read, glob, grep, webfetch', options: cellOpts },
    ],
    [
      { text: 'Explore', options: { ...cellOptsAlt, bold: true } },
      { text: 'Fast codebase search', options: cellOptsAlt },
      { text: 'read, glob, grep', options: cellOptsAlt },
    ],
    [
      { text: 'Orchestrator', options: { ...cellOpts, bold: true } },
      { text: 'Delegates to sub-agents', options: cellOpts },
      { text: 'task only', options: cellOpts },
    ],
  ];

  slide.addTable(tableData, {
    x: 0.6,
    y: 1.25,
    w: 8.8,
    colW: [1.5, 4.0, 3.3],
    border: { pt: 0.5, color: C.cardBorder },
    rowH: [0.45, 0.55, 0.55, 0.55, 0.55, 0.55],
    margin: [0.05, 0.15, 0.05, 0.15],
  });

  // Extra info
  slide.addText(
    [
      { text: '@syntax switching: ', options: { bold: true, breakLine: false } },
      {
        text: '@debug fix this error — instantly switches agent context',
        options: { breakLine: true },
      },
      {
        text: 'Each agent has custom temperature, system prompt, and tool permissions',
        options: {},
      },
    ],
    {
      x: 0.6,
      y: 4.8,
      w: 8.5,
      h: 0.6,
      fontFace: BODY_FONT,
      fontSize: 11,
      color: C.muted,
      margin: 0,
    }
  );
}

// ============================================================
// SLIDE 9 — Tool Ecosystem (Category Grid)
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.offWhite };

  slide.addText('Tool Ecosystem', {
    x: 0.6,
    y: 0.4,
    w: 9,
    h: 0.7,
    fontFace: TITLE_FONT,
    fontSize: 36,
    bold: true,
    color: C.darkNavy,
    margin: 0,
  });

  const groups = [
    {
      name: 'File Operations',
      tools: 'read, write, edit, multiedit,\ndelete, glob, grep, ls',
      color: C.lightBlue,
    },
    { name: 'Execution', tools: 'bash', color: C.gold },
    { name: 'Web', tools: 'webfetch, websearch,\nbrowser', color: C.lightBlue },
    { name: 'Agent / Workflow', tools: 'task, question,\ntodowrite, skill', color: C.gold },
    {
      name: 'Intelligence',
      tools:
        'definitions, codesearch,\nwarpgrep, diagnostics,\nstoreMemory, recallMemory,\nbatch, notebookRead/Edit',
      color: C.lightBlue,
    },
  ];

  // Layout: 3 cards top row, 2 cards bottom row centered
  const cardW = 2.8;
  const cardH = 2.0;
  const gapX = 0.3;
  const gapY = 0.3;
  const topRowX = 0.5;
  const topRowY = 1.25;
  const bottomRowX = (10 - 2 * cardW - gapX) / 2;
  const bottomRowY = topRowY + cardH + gapY;

  groups.forEach((g, i) => {
    let x, y;
    if (i < 3) {
      x = topRowX + i * (cardW + gapX);
      y = topRowY;
    } else {
      x = bottomRowX + (i - 3) * (cardW + gapX);
      y = bottomRowY;
    }

    // Card bg
    slide.addShape(pres.shapes.RECTANGLE, {
      x,
      y,
      w: cardW,
      h: cardH,
      fill: { color: C.cardBg },
      shadow: makeCardShadow(),
    });
    // Top accent bar
    slide.addShape(pres.shapes.RECTANGLE, {
      x,
      y,
      w: cardW,
      h: 0.06,
      fill: { color: g.color },
    });
    // Group name
    slide.addText(g.name, {
      x: x + 0.15,
      y: y + 0.2,
      w: cardW - 0.3,
      h: 0.35,
      fontFace: BODY_FONT,
      fontSize: 14,
      bold: true,
      color: C.darkNavy,
      margin: 0,
    });
    // Tools list
    slide.addText(g.tools, {
      x: x + 0.15,
      y: y + 0.6,
      w: cardW - 0.3,
      h: cardH - 0.75,
      fontFace: BODY_FONT,
      fontSize: 11,
      color: C.muted,
      margin: 0,
    });
  });
}

// ============================================================
// SLIDE 10 — SAP Enterprise Features (2x2 Grid)
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.offWhite };

  slide.addText('SAP Enterprise Features', {
    x: 0.6,
    y: 0.4,
    w: 9,
    h: 0.7,
    fontFace: TITLE_FONT,
    fontSize: 36,
    bold: true,
    color: C.darkNavy,
    margin: 0,
  });

  const blocks = [
    {
      title: 'Content Filtering',
      desc: 'Azure Content Safety + Llama Guard 3\nInput and output filtering for safe, compliant AI interactions',
      accent: C.gold,
    },
    {
      title: 'Data Masking (DPI)',
      desc: 'Anonymize 25+ PII entity types\nEmail, phone, SSN, credit cards, addresses, and more',
      accent: C.lightBlue,
    },
    {
      title: 'Document Grounding',
      desc: 'Vector repositories + help.sap.com\nknowledge bases for context-aware responses',
      accent: C.gold,
    },
    {
      title: 'Translation',
      desc: 'Input/output language translation\nSeamless multilingual support for global teams',
      accent: C.lightBlue,
    },
  ];

  blocks.forEach((b, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.5 + col * 4.65;
    const y = 1.3 + row * 2.05;
    const w = 4.3;
    const h = 1.8;

    // Card bg
    slide.addShape(pres.shapes.RECTANGLE, {
      x,
      y,
      w,
      h,
      fill: { color: C.cardBg },
      shadow: makeCardShadow(),
    });
    // Left accent bar
    slide.addShape(pres.shapes.RECTANGLE, {
      x,
      y,
      w: 0.06,
      h,
      fill: { color: b.accent },
    });
    // Title
    slide.addText(b.title, {
      x: x + 0.25,
      y: y + 0.2,
      w: w - 0.5,
      h: 0.35,
      fontFace: BODY_FONT,
      fontSize: 16,
      bold: true,
      color: C.darkNavy,
      margin: 0,
    });
    // Description
    slide.addText(b.desc, {
      x: x + 0.25,
      y: y + 0.65,
      w: w - 0.5,
      h: 0.95,
      fontFace: BODY_FONT,
      fontSize: 12,
      color: C.muted,
      margin: 0,
    });
  });
}

// ============================================================
// SLIDE 11 — System Prompt Pipeline (Numbered Steps)
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.offWhite };

  slide.addText('System Prompt Pipeline', {
    x: 0.6,
    y: 0.3,
    w: 9,
    h: 0.6,
    fontFace: TITLE_FONT,
    fontSize: 34,
    bold: true,
    color: C.darkNavy,
    margin: 0,
  });

  const steps = [
    { num: '1', title: 'Soul', desc: 'Core identity and behavior directives' },
    { num: '2', title: 'Model-Specific', desc: 'Tailored for Anthropic / OpenAI / Gemini' },
    { num: '3', title: 'Environment', desc: 'Working dir, git status, platform, date' },
    { num: '4', title: 'Agent Role', desc: 'Code / Debug / Plan / Explore / Orchestrator' },
    { num: '5', title: 'Instruction Files', desc: 'AGENTS.md, user rules, project rules' },
    { num: '6', title: 'Custom Rules', desc: 'User-provided via --system flag' },
  ];

  const stepW = 8.0;
  const stepH = 0.55;
  const stepGap = 0.12;
  const startX = 1.0;
  const startY = 1.1;

  steps.forEach((s, i) => {
    const y = startY + i * (stepH + stepGap);
    const bgColor = i % 2 === 0 ? C.lightBlue : C.darkNavy;

    // Step bar
    slide.addShape(pres.shapes.RECTANGLE, {
      x: startX,
      y,
      w: stepW,
      h: stepH,
      fill: { color: bgColor },
    });
    // Number
    slide.addText(s.num, {
      x: startX + 0.1,
      y,
      w: 0.4,
      h: stepH,
      fontFace: BODY_FONT,
      fontSize: 16,
      bold: true,
      color: C.gold,
      valign: 'middle',
      margin: 0,
    });
    // Title
    slide.addText(s.title, {
      x: startX + 0.55,
      y,
      w: 2.2,
      h: stepH,
      fontFace: BODY_FONT,
      fontSize: 13,
      bold: true,
      color: C.white,
      valign: 'middle',
      margin: 0,
    });
    // Desc
    slide.addText(s.desc, {
      x: startX + 2.9,
      y,
      w: 5.0,
      h: stepH,
      fontFace: BODY_FONT,
      fontSize: 11,
      color: C.white,
      valign: 'middle',
      margin: 0,
      align: 'right',
    });

    // Arrow between
    if (i < steps.length - 1) {
      slide.addText('\u25BC', {
        x: startX + stepW / 2 - 0.15,
        y: y + stepH + 0.01,
        w: 0.3,
        h: stepGap - 0.02,
        fontFace: BODY_FONT,
        fontSize: 7,
        color: C.muted,
        align: 'center',
        valign: 'middle',
        margin: 0,
      });
    }
  });

  // Cache note
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 1.0,
    y: 5.0,
    w: 8.0,
    h: 0.4,
    fill: { color: C.goldLight },
  });
  slide.addText('Cache-friendly ordering: stable content first for LLM prompt caching', {
    x: 1.0,
    y: 5.0,
    w: 8.0,
    h: 0.4,
    fontFace: BODY_FONT,
    fontSize: 11,
    italic: true,
    color: C.bodyText,
    align: 'center',
    valign: 'middle',
    margin: 0,
  });
}

// ============================================================
// SLIDE 12 — MCP Integration (Split Layout)
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.offWhite };

  slide.addText('MCP Integration', {
    x: 0.6,
    y: 0.4,
    w: 9,
    h: 0.7,
    fontFace: TITLE_FONT,
    fontSize: 36,
    bold: true,
    color: C.darkNavy,
    margin: 0,
  });

  // Left panel — MCP Server
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5,
    y: 1.3,
    w: 4.25,
    h: 3.5,
    fill: { color: C.darkNavy },
    shadow: makeCardShadow(),
  });
  slide.addText('MCP Server', {
    x: 0.5,
    y: 1.45,
    w: 4.25,
    h: 0.45,
    fontFace: BODY_FONT,
    fontSize: 18,
    bold: true,
    color: C.gold,
    align: 'center',
    margin: 0,
  });
  slide.addText(
    [
      {
        text: 'Exposes all 25+ tools via\nstdio transport',
        options: { breakLine: true, fontSize: 13 },
      },
      { text: '\n', options: { breakLine: true, fontSize: 6 } },
      {
        text: "External AI clients (VS Code,\nCursor, other agents) can\nuse Alexi's tools directly",
        options: { fontSize: 12 },
      },
    ],
    {
      x: 0.8,
      y: 2.1,
      w: 3.65,
      h: 2.4,
      fontFace: BODY_FONT,
      color: C.white,
      margin: 0,
    }
  );

  // Right panel — MCP Client
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 5.25,
    y: 1.3,
    w: 4.25,
    h: 3.5,
    fill: { color: C.cardBg },
    shadow: makeCardShadow(),
  });
  slide.addText('MCP Client', {
    x: 5.25,
    y: 1.45,
    w: 4.25,
    h: 0.45,
    fontFace: BODY_FONT,
    fontSize: 18,
    bold: true,
    color: C.lightBlue,
    align: 'center',
    margin: 0,
  });
  slide.addText(
    [
      { text: 'Connects to external\nMCP servers', options: { breakLine: true, fontSize: 13 } },
      { text: '\n', options: { breakLine: true, fontSize: 6 } },
      {
        text: 'Filesystem, GitHub,\nBrave Search — aggregates\ntools from any MCP server',
        options: { fontSize: 12 },
      },
    ],
    {
      x: 5.55,
      y: 2.1,
      w: 3.65,
      h: 2.4,
      fontFace: BODY_FONT,
      color: C.bodyText,
      margin: 0,
    }
  );

  // Config note at bottom
  slide.addText('Config: ~/.alexi/mcp-servers.json', {
    x: 0.5,
    y: 5.05,
    w: 9,
    h: 0.35,
    fontFace: BODY_FONT,
    fontSize: 11,
    italic: true,
    color: C.muted,
    align: 'center',
    margin: 0,
  });
}

// ============================================================
// SLIDE 13 — Terminal UI
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.offWhite };

  slide.addText('Terminal UI', {
    x: 0.6,
    y: 0.4,
    w: 9,
    h: 0.7,
    fontFace: TITLE_FONT,
    fontSize: 36,
    bold: true,
    color: C.darkNavy,
    margin: 0,
  });

  // Simulated terminal window
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5,
    y: 1.2,
    w: 5.5,
    h: 3.8,
    fill: { color: '1E1E2E' },
    shadow: makeCardShadow(),
  });
  // Terminal title bar
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5,
    y: 1.2,
    w: 5.5,
    h: 0.35,
    fill: { color: '2D2D44' },
  });
  // Terminal dots
  slide.addShape(pres.shapes.OVAL, { x: 0.7, y: 1.3, w: 0.13, h: 0.13, fill: { color: 'FF5F57' } });
  slide.addShape(pres.shapes.OVAL, { x: 0.9, y: 1.3, w: 0.13, h: 0.13, fill: { color: 'FEBC2E' } });
  slide.addShape(pres.shapes.OVAL, { x: 1.1, y: 1.3, w: 0.13, h: 0.13, fill: { color: '28C840' } });

  // Terminal content
  slide.addText(
    [
      {
        text: '$ alexi -i',
        options: { breakLine: true, color: '28C840', fontSize: 12, fontFace: 'Consolas' },
      },
      { text: '\n', options: { breakLine: true, fontSize: 6 } },
      {
        text: 'Alexi v0.2.6 | Model: gpt-4o',
        options: { breakLine: true, color: C.gold, fontSize: 11, fontFace: 'Consolas' },
      },
      { text: '\n', options: { breakLine: true, fontSize: 6 } },
      {
        text: '> Refactor the auth module',
        options: { breakLine: true, color: C.white, fontSize: 11, fontFace: 'Consolas' },
      },
      { text: '\n', options: { breakLine: true, fontSize: 6 } },
      {
        text: '[read] src/auth/index.ts',
        options: { breakLine: true, color: '7DCFFF', fontSize: 10, fontFace: 'Consolas' },
      },
      {
        text: '[edit] src/auth/middleware.ts',
        options: { breakLine: true, color: '7DCFFF', fontSize: 10, fontFace: 'Consolas' },
      },
      {
        text: '[bash] npm test',
        options: { breakLine: true, color: '7DCFFF', fontSize: 10, fontFace: 'Consolas' },
      },
      { text: '\n', options: { breakLine: true, fontSize: 4 } },
      {
        text: 'All tests passing. Cost: $0.023',
        options: { color: '28C840', fontSize: 10, fontFace: 'Consolas' },
      },
    ],
    {
      x: 0.7,
      y: 1.65,
      w: 5.1,
      h: 3.2,
      margin: 0.1,
    }
  );

  // Right side feature list
  const features = [
    'Message bubbles with\nmarkdown rendering',
    'Diff view for\ncode changes',
    'Tool call\nvisualization blocks',
    'Command palette\nwith slash commands',
    'Spinner animations +\nsyntax highlighting',
  ];

  features.forEach((f, i) => {
    const y = 1.2 + i * 0.75;
    // Gold dot marker
    slide.addShape(pres.shapes.OVAL, {
      x: 6.4,
      y: y + 0.12,
      w: 0.18,
      h: 0.18,
      fill: { color: C.gold },
    });
    slide.addText(f, {
      x: 6.75,
      y: y,
      w: 2.8,
      h: 0.65,
      fontFace: BODY_FONT,
      fontSize: 11,
      color: C.bodyText,
      margin: 0,
    });
  });

  // Tech badge
  slide.addText('Built with Ink v6 + React 19', {
    x: 6.4,
    y: 5.0,
    w: 3.0,
    h: 0.3,
    fontFace: BODY_FONT,
    fontSize: 10,
    italic: true,
    color: C.muted,
    margin: 0,
  });
}

// ============================================================
// SLIDE 14 — Cost & Session Management (Two Column)
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.offWhite };

  slide.addText('Cost & Session Management', {
    x: 0.6,
    y: 0.4,
    w: 9,
    h: 0.7,
    fontFace: TITLE_FONT,
    fontSize: 34,
    bold: true,
    color: C.darkNavy,
    margin: 0,
  });

  // Left column — Cost Tracking
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5,
    y: 1.3,
    w: 4.25,
    h: 3.6,
    fill: { color: C.cardBg },
    shadow: makeCardShadow(),
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5,
    y: 1.3,
    w: 4.25,
    h: 0.06,
    fill: { color: C.gold },
  });
  slide.addText('Cost Tracking', {
    x: 0.75,
    y: 1.5,
    w: 3.75,
    h: 0.4,
    fontFace: BODY_FONT,
    fontSize: 18,
    bold: true,
    color: C.darkNavy,
    margin: 0,
  });
  slide.addText(
    [
      { text: 'Per-model pricing tables', options: { bullet: true, breakLine: true } },
      {
        text: 'Per-session / per-day / per-month summaries',
        options: { bullet: true, breakLine: true },
      },
      { text: 'CSV export capability', options: { bullet: true, breakLine: true } },
      { text: 'Real-time cost display during sessions', options: { bullet: true } },
    ],
    {
      x: 0.75,
      y: 2.1,
      w: 3.75,
      h: 2.5,
      fontFace: BODY_FONT,
      fontSize: 12,
      color: C.bodyText,
      margin: 0,
      paraSpaceAfter: 6,
    }
  );

  // Right column — Session Management
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 5.25,
    y: 1.3,
    w: 4.25,
    h: 3.6,
    fill: { color: C.cardBg },
    shadow: makeCardShadow(),
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 5.25,
    y: 1.3,
    w: 4.25,
    h: 0.06,
    fill: { color: C.lightBlue },
  });
  slide.addText('Session Management', {
    x: 5.5,
    y: 1.5,
    w: 3.75,
    h: 0.4,
    fontFace: BODY_FONT,
    fontSize: 18,
    bold: true,
    color: C.darkNavy,
    margin: 0,
  });
  slide.addText(
    [
      { text: 'Persistent multi-turn conversations', options: { bullet: true, breakLine: true } },
      { text: 'Context compaction at 90% window', options: { bullet: true, breakLine: true } },
      { text: 'Typed memory system:', options: { bullet: true, breakLine: true } },
      {
        text: 'episodic, semantic, procedural, working',
        options: { bullet: true, indentLevel: 1 },
      },
    ],
    {
      x: 5.5,
      y: 2.1,
      w: 3.75,
      h: 2.5,
      fontFace: BODY_FONT,
      fontSize: 12,
      color: C.bodyText,
      margin: 0,
      paraSpaceAfter: 6,
    }
  );
}

// ============================================================
// SLIDE 15 — Demo Flow
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.darkNavy };

  slide.addText('Demo Flow', {
    x: 0.6,
    y: 0.4,
    w: 9,
    h: 0.7,
    fontFace: TITLE_FONT,
    fontSize: 36,
    bold: true,
    color: C.white,
    margin: 0,
  });

  const demoSteps = [
    { num: '01', title: 'Launch', desc: 'alexi -i (interactive mode)' },
    { num: '02', title: 'Auto-route', desc: 'Send a prompt, watch model selection' },
    { num: '03', title: 'Agent Execution', desc: 'Multi-step coding task with tool calls' },
    { num: '04', title: 'Tool Visualization', desc: 'See file reads, edits, bash execution' },
    { num: '05', title: 'Cost Summary', desc: 'Review session costs and model usage' },
  ];

  demoSteps.forEach((s, i) => {
    const y = 1.35 + i * 0.8;
    // Gold number
    slide.addText(s.num, {
      x: 0.6,
      y,
      w: 0.6,
      h: 0.55,
      fontFace: TITLE_FONT,
      fontSize: 24,
      bold: true,
      color: C.gold,
      valign: 'middle',
      margin: 0,
    });
    // Title
    slide.addText(s.title, {
      x: 1.4,
      y,
      w: 2.5,
      h: 0.55,
      fontFace: BODY_FONT,
      fontSize: 16,
      bold: true,
      color: C.white,
      valign: 'middle',
      margin: 0,
    });
    // Description
    slide.addText(s.desc, {
      x: 4.0,
      y,
      w: 5.5,
      h: 0.55,
      fontFace: BODY_FONT,
      fontSize: 13,
      color: C.muted,
      valign: 'middle',
      margin: 0,
    });
    // Separator line
    if (i < demoSteps.length - 1) {
      slide.addShape(pres.shapes.LINE, {
        x: 0.6,
        y: y + 0.65,
        w: 8.8,
        h: 0,
        line: { color: '1A3A6A', width: 0.5 },
      });
    }
  });

  // Note
  slide.addText('This slide outlines what to demo live', {
    x: 0.6,
    y: 5.1,
    w: 8.5,
    h: 0.3,
    fontFace: BODY_FONT,
    fontSize: 11,
    italic: true,
    color: C.muted,
    margin: 0,
    align: 'center',
  });
}

// ============================================================
// SLIDE 16 — Tech Stack (Icon-style 3x3 Grid)
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.offWhite };

  slide.addText('Tech Stack', {
    x: 0.6,
    y: 0.4,
    w: 9,
    h: 0.7,
    fontFace: TITLE_FONT,
    fontSize: 36,
    bold: true,
    color: C.darkNavy,
    margin: 0,
  });

  const techItems = [
    { name: 'TypeScript 5.9', detail: 'Strict mode', color: C.lightBlue },
    { name: 'Node.js 22+', detail: 'ES Modules', color: '339933' },
    { name: 'SAP AI SDK', detail: 'Orchestration + AI API', color: C.gold },
    { name: 'Ink v6 + React 19', detail: 'Terminal UI', color: '61DAFB' },
    { name: 'Zod v4', detail: 'Runtime validation', color: '3068B7' },
    { name: 'Commander 14', detail: 'CLI framework', color: C.darkNavy },
    { name: 'Hono v4', detail: 'HTTP server', color: 'E36002' },
    { name: 'Tree-sitter', detail: 'Code parsing', color: '6BBF59' },
    { name: 'Vitest 4', detail: 'Testing framework', color: '729B1B' },
  ];

  techItems.forEach((t, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const cardW = 2.8;
    const cardH = 1.15;
    const x = 0.5 + col * 3.1;
    const y = 1.25 + row * 1.4;

    // Card background
    slide.addShape(pres.shapes.RECTANGLE, {
      x,
      y,
      w: cardW,
      h: cardH,
      fill: { color: C.cardBg },
      shadow: makeCardShadow(),
    });
    // Color strip on left
    slide.addShape(pres.shapes.RECTANGLE, {
      x,
      y,
      w: 0.06,
      h: cardH,
      fill: { color: t.color },
    });
    // Name
    slide.addText(t.name, {
      x: x + 0.2,
      y: y + 0.15,
      w: cardW - 0.4,
      h: 0.4,
      fontFace: BODY_FONT,
      fontSize: 14,
      bold: true,
      color: C.darkNavy,
      margin: 0,
    });
    // Detail
    slide.addText(t.detail, {
      x: x + 0.2,
      y: y + 0.6,
      w: cardW - 0.4,
      h: 0.35,
      fontFace: BODY_FONT,
      fontSize: 11,
      color: C.muted,
      margin: 0,
    });
  });
}

// ============================================================
// SLIDE 17 — Thank You / Q&A (Dark)
// ============================================================
{
  const slide = pres.addSlide();
  slide.background = { color: C.darkNavy };

  // Gold accent bar at top
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0,
    y: 0,
    w: 10,
    h: 0.06,
    fill: { color: C.gold },
  });

  // Gold diamond accent
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 4.7,
    y: 1.5,
    w: 0.5,
    h: 0.5,
    fill: { color: C.gold },
    rotate: 45,
  });

  // Thank you
  slide.addText('Thank You', {
    x: 0.5,
    y: 2.1,
    w: 9,
    h: 0.8,
    fontFace: TITLE_FONT,
    fontSize: 44,
    bold: true,
    color: C.white,
    align: 'center',
    margin: 0,
  });

  // Questions
  slide.addText('Questions?', {
    x: 0.5,
    y: 2.9,
    w: 9,
    h: 0.5,
    fontFace: BODY_FONT,
    fontSize: 22,
    color: C.gold,
    align: 'center',
    margin: 0,
  });

  // Contact info
  slide.addText(
    [
      { text: 'Alexi CLI — alexi / ax', options: { breakLine: true, fontSize: 13 } },
      { text: 'SAP AI Core Orchestration', options: { fontSize: 13 } },
    ],
    {
      x: 0.5,
      y: 3.8,
      w: 9,
      h: 0.8,
      fontFace: BODY_FONT,
      color: C.muted,
      align: 'center',
      margin: 0,
    }
  );

  // Bottom gold bar
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0,
    y: 5.565,
    w: 10,
    h: 0.06,
    fill: { color: C.gold },
  });
}

// ============================================================
// WRITE FILE
// ============================================================
pres
  .writeFile({ fileName: 'alexi-presentation.pptx' })
  .then(() => console.log('Generated: alexi-presentation.pptx'))
  .catch((err) => console.error('Error:', err));
