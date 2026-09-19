// All dashboard data is mocked. Replace with API calls later.
// Each place has its own summary, roads, incident, forecast, recommendation and simulation.

export const statusColors = {
  normal: "#2e9d5b",
  slow: "#e0a800",
  congested: "#d64545",
};

// Road paths are written as [dLat, dLng] offsets from the place centre.
const build = (center, roads) =>
  roads.map((road) => ({
    ...road,
    path: road.path.map(([dLat, dLng]) => [center[0] + dLat, center[1] + dLng]),
  }));

const hitechCenter = [17.4435, 78.3772];
const secunderabadCenter = [17.4399, 78.4983];
const gachibowliCenter = [17.4401, 78.3489];
const banjaraCenter = [17.4126, 78.4482];

export const places = [
  {
    id: "hitech-city",
    name: "Hitech City",
    center: hitechCenter,
    zoom: 14,
    summary: {
      congestedRoads: 7,
      activeIncidents: 2,
      averageSpeed: 28,
      networkStatus: "Moderate",
    },
    roads: build(hitechCenter, [
      { id: "R12", name: "Main Corridor", status: "congested", path: [[0.0085, -0.0112], [0.0045, -0.0042], [0, 0.0018]] },
      { id: "R15", name: "Ring Road Bypass", status: "normal", path: [[0.0085, -0.0112], [0.0125, 0.0008], [0.0065, 0.0108]] },
      { id: "R08", name: "Station Road", status: "slow", path: [[0, 0.0018], [-0.0035, 0.0088], [-0.0085, 0.0148]] },
      { id: "R21", name: "Market Street", status: "normal", path: [[0, 0.0018], [-0.0055, -0.0042], [-0.0115, -0.0082]] },
      { id: "R03", name: "Junction Link", status: "congested", path: [[0.0065, 0.0108], [0.0005, 0.0128], [-0.0085, 0.0148]] },
      { id: "R17", name: "Lake Avenue", status: "slow", path: [[-0.0115, -0.0082], [-0.0105, 0.0038], [-0.0085, 0.0148]] },
    ]),
    incident: { segment: "R12", type: "Possible incident", confidence: 87 },
    forecast: [
      { label: "Current", value: 82 },
      { label: "15 min", value: 88 },
      { label: "30 min", value: 91 },
      { label: "45 min", value: 74 },
      { label: "60 min", value: 61 },
    ],
    recommendation: {
      route: "R15",
      reason:
        "R12 is forecast to peak at 91% congestion in 30 minutes because of a possible incident. R15 is currently flowing normally and has spare capacity to absorb the diverted traffic.",
      confidence: 84,
    },
    simulation: { before: 82, after: 61 },
  },

  {
    id: "secunderabad",
    name: "Secunderabad",
    center: secunderabadCenter,
    zoom: 14,
    summary: {
      congestedRoads: 11,
      activeIncidents: 3,
      averageSpeed: 19,
      networkStatus: "Heavy",
    },
    roads: build(secunderabadCenter, [
      { id: "R07", name: "Station Approach", status: "congested", path: [[0.008, -0.01], [0.004, -0.004], [0, 0.002]] },
      { id: "R09", name: "Northern Bypass", status: "normal", path: [[0.008, -0.01], [0.012, 0.001], [0.007, 0.011]] },
      { id: "R02", name: "Market Road", status: "slow", path: [[0, 0.002], [-0.004, 0.009], [-0.009, 0.014]] },
      { id: "R05", name: "Parade Link", status: "congested", path: [[0.007, 0.011], [0.001, 0.013], [-0.009, 0.014]] },
      { id: "R14", name: "Depot Street", status: "congested", path: [[0, 0.002], [-0.005, -0.004], [-0.011, -0.008]] },
      { id: "R18", name: "Clock Tower Road", status: "slow", path: [[-0.011, -0.008], [-0.01, 0.004], [-0.009, 0.014]] },
    ]),
    incident: { segment: "R07", type: "Vehicle breakdown", confidence: 91 },
    forecast: [
      { label: "Current", value: 90 },
      { label: "15 min", value: 93 },
      { label: "30 min", value: 95 },
      { label: "45 min", value: 89 },
      { label: "60 min", value: 80 },
    ],
    recommendation: {
      route: "R09",
      reason:
        "A breakdown on R07 is pushing congestion toward 95% within 30 minutes. R09 is the only nearby road still flowing normally and can take traffic heading north.",
      confidence: 79,
    },
    simulation: { before: 90, after: 68 },
  },

  {
    id: "gachibowli",
    name: "Gachibowli",
    center: gachibowliCenter,
    zoom: 14,
    summary: {
      congestedRoads: 4,
      activeIncidents: 1,
      averageSpeed: 36,
      networkStatus: "Light",
    },
    roads: build(gachibowliCenter, [
      { id: "R04", name: "Financial Loop", status: "congested", path: [[0.006, -0.012], [0.003, -0.005], [0, 0.004]] },
      { id: "R11", name: "Campus Road", status: "normal", path: [[0.006, -0.012], [0.01, -0.001], [0.005, 0.01]] },
      { id: "R06", name: "Stadium Road", status: "normal", path: [[0, 0.004], [-0.004, 0.01], [-0.008, 0.015]] },
      { id: "R19", name: "Tech Park Link", status: "slow", path: [[0.005, 0.01], [0.001, 0.013], [-0.008, 0.015]] },
      { id: "R23", name: "University Avenue", status: "normal", path: [[0, 0.004], [-0.006, -0.003], [-0.011, -0.007]] },
    ]),
    incident: { segment: "R04", type: "Possible incident", confidence: 72 },
    forecast: [
      { label: "Current", value: 55 },
      { label: "15 min", value: 61 },
      { label: "30 min", value: 68 },
      { label: "45 min", value: 57 },
      { label: "60 min", value: 48 },
    ],
    recommendation: {
      route: "R11",
      reason:
        "R04 shows a mild slowdown that may grow to 68% congestion in 30 minutes. R11 has plenty of spare capacity, so a small diversion keeps the area flowing.",
      confidence: 76,
    },
    simulation: { before: 55, after: 41 },
  },

  {
    id: "banjara-hills",
    name: "Banjara Hills",
    center: banjaraCenter,
    zoom: 14,
    summary: {
      congestedRoads: 8,
      activeIncidents: 2,
      averageSpeed: 24,
      networkStatus: "Moderate",
    },
    roads: build(banjaraCenter, [
      { id: "R22", name: "Hill Road", status: "congested", path: [[0.007, -0.011], [0.003, -0.004], [0, 0.003]] },
      { id: "R25", name: "Park Bypass", status: "normal", path: [[0.007, -0.011], [0.011, 0], [0.006, 0.011]] },
      { id: "R10", name: "Film Nagar Road", status: "congested", path: [[0, 0.003], [-0.004, 0.01], [-0.009, 0.015]] },
      { id: "R16", name: "Junction Road", status: "slow", path: [[0.006, 0.011], [0.001, 0.013], [-0.009, 0.015]] },
      { id: "R27", name: "Lake View Road", status: "slow", path: [[0, 0.003], [-0.006, -0.004], [-0.011, -0.008]] },
      { id: "R13", name: "Central Link", status: "congested", path: [[-0.011, -0.008], [-0.01, 0.004], [-0.009, 0.015]] },
    ]),
    incident: { segment: "R22", type: "Road obstruction", confidence: 81 },
    forecast: [
      { label: "Current", value: 76 },
      { label: "15 min", value: 80 },
      { label: "30 min", value: 84 },
      { label: "45 min", value: 79 },
      { label: "60 min", value: 68 },
    ],
    recommendation: {
      route: "R25",
      reason:
        "An obstruction on R22 is expected to lift congestion to 84% in 30 minutes. R25 runs parallel to R22 and is still moving at normal speed.",
      confidence: 82,
    },
    simulation: { before: 76, after: 58 },
  },
];

export const defaultPlaceId = places[0].id;
