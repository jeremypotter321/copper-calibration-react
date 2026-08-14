// Factual details sourced from coppercalibration.com (services, hours, area,
// booking + social links). All marketing copy here is original, written for this
// enthusiast-themed concept build.

export const shop = {
  name: 'Copper Calibration',
  tagline: 'BMW Tuning & Diagnostics',
  city: 'Fitchburg, Wisconsin',
  serviceArea: 'Dane & Rock County',
  cert: 'HPA Certified EFI Tuning Professional',
  carfaxNote:
    'Every job gets reported to CARFAX — your service history stays documented and your resale value stays intact.',
  links: {
    bookTune: 'https://calendar.app.google/1T5PEvoBfnzmPP9b8',
    bookService: 'https://calendar.app.google/AYU7bYtF7SEcBmyMA',
    instagram: 'https://www.instagram.com/coppercalibration',
    tiktok: 'https://www.tiktok.com/@coppercalibration',
    site: 'https://coppercalibration.com/',
  },
};

// `dow` matches Date.getDay(); `o`/`c` are 24h decimal hours for the bar + the
// open/closed pill.
export const hours = [
  { short: 'MON', dow: 1, o: 19, c: 23, label: '7:00 PM – 11:00 PM' },
  { short: 'TUE', dow: 2, o: 19, c: 23, label: '7:00 PM – 11:00 PM' },
  { short: 'WED', dow: 3, o: 19, c: 23, label: '7:00 PM – 11:00 PM' },
  { short: 'THU', dow: 4, o: 19, c: 23, label: '7:00 PM – 11:00 PM' },
  { short: 'FRI', dow: 5, o: 10, c: 22, label: '10:00 AM – 10:00 PM' },
  { short: 'SAT', dow: 6, o: 10, c: 22, label: '10:00 AM – 10:00 PM' },
  { short: 'SUN', dow: 0, o: null, c: null, label: 'Closed' },
];

export const specStrip = [
  { k: 'Certification', v: 'HPA Certified' },
  { k: 'Scan Tool', v: 'ISTA+' },
  { k: 'Tuning', v: 'Remote + In-Person' },
  { k: 'Records', v: 'CARFAX Documented' },
];

// Chassis / engine codes for the scrolling ticker — the language enthusiasts
// actually speak.
export const ticker = [
  'N54', 'N55', 'S55', 'B58', 'S58', 'N20', 'N26', 'B48', 'N63', 'S63',
  'E90', 'E92', 'F30', 'F80', 'F82', 'G20', 'G80', 'G87',
  'ISTA+', 'MHD', 'BOOST', 'E85', 'DME', 'FLASHED',
];

export const tuningModes = [
  {
    id: 'in-person',
    label: 'In-Person Tune',
    kicker: 'Bay 01 · Fitchburg, WI',
    blurb:
      'Car on the lift, laptop plugged in, hands on the wheel. Datalogs pulled and calibration dialed in on the car in front of me — not a file guessed at from a spreadsheet.',
    sheet: [
      ['Session type', 'Appointment only'],
      ['Platform', 'BMW EFI calibration'],
      ['Tuner', 'HPA Certified'],
      ['Diagnostics', 'ISTA+ pre-scan included'],
      ['Booking', 'Diagnostic + tuning slot'],
    ],
    cta: { label: 'Book the Bay', href: shop.links.bookTune },
  },
  {
    id: 'remote',
    label: 'Remote Tune',
    kicker: 'Anywhere with a laptop',
    blurb:
      'Out of state and still want the calibration? Flash, log, send it over. Revisions come back until the car is doing what it should through the whole rev range.',
    sheet: [
      ['Session type', 'Remote flash + datalog review'],
      ['Requirement', 'Laptop / flash tool on your end'],
      ['Tuner', 'HPA Certified'],
      ['Turnaround', 'Scheduled by appointment'],
      ['Support', 'Revision-based'],
    ],
    cta: { label: 'Start a Remote Tune', href: shop.links.bookTune },
  },
  {
    id: 'prep',
    label: 'Tune Prep',
    kicker: 'Before you add boost',
    blurb:
      'A tune amplifies whatever the engine is already doing — including the bad habits. Prep work first: fresh plugs, healthy coils, clean oil, no leaks. Then we turn it up.',
    sheet: [
      ['Ignition', 'Spark plugs + coilpacks'],
      ['Fluids', 'Oil change'],
      ['Leak check', 'Smoke test — vacuum & boost'],
      ['Fuel', 'Injector cleaning + coding'],
      ['Outcome', 'Clean baseline for calibration'],
    ],
    cta: { label: 'Book Prep Work', href: shop.links.bookService },
  },
];

export const bays = [
  {
    no: '01',
    title: 'Diagnostics',
    tag: 'Find it before you throw parts at it',
    items: [
      'ISTA+ full-system fault scan',
      'Smoke test — vacuum & boost leaks',
      'UV dye leak detection',
      'Compression testing',
      'BMW coding',
    ],
  },
  {
    no: '02',
    title: 'Maintenance',
    tag: 'The stuff that stops the fun',
    items: [
      'Oil filter housing gasket',
      'Oil cooler gasket',
      'Thermostat replacement',
      'Aluminum oil filter housing upgrade',
      'Injector cleaning & coding',
      'Oil change service',
    ],
  },
  {
    no: '03',
    title: 'Exhaust',
    tag: 'Let it breathe. Let it talk.',
    items: [
      'Downpipes',
      'X-pipes',
      'H-pipes',
      'Muffler deletes',
    ],
  },
  {
    no: '04',
    title: 'Power Adders',
    tag: 'More air, more fuel, more grin',
    items: [
      'Turbo upgrades',
      'Intercooler upgrades',
      'Cold air intake',
      'HPFP (high pressure fuel pump)',
      'Aluminum charge pipe',
    ],
  },
];

export const scanSequence = [
  { module: 'DME', label: 'Engine control', status: 'READ' },
  { module: 'EGS', label: 'Transmission', status: 'READ' },
  { module: 'DSC', label: 'Stability control', status: 'READ' },
  { module: 'CAS', label: 'Access system', status: 'READ' },
  { module: 'FRM', label: 'Footwell module', status: 'READ' },
  { module: 'ALL', label: 'Fault memory compiled', status: 'DONE' },
];

export const toolbox = [
  {
    name: 'ISTA+',
    kind: 'Factory-level scan tool',
    detail:
      'The same diagnostic software the dealer runs. Full module access, guided test plans, live values and coding — not a $30 code reader guessing at a P-code.',
  },
  {
    name: 'Smoke Machine',
    kind: 'Vacuum & boost leak testing',
    detail:
      'Pressurize the intake tract and watch where it escapes. Cracked charge pipe, tired PCV, split boot — it shows up in seconds instead of after three parts orders.',
  },
  {
    name: 'UV Dye',
    kind: 'Leak detection',
    detail:
      'Dye in the system, blacklight on the block. That mystery drip on the driveway gets a name and an address.',
  },
  {
    name: 'Compression Tester',
    kind: 'Mechanical health',
    detail:
      'Before any calibration goes near a motor, the bottom end gets a verdict. Numbers on paper, no optimism required.',
  },
];
