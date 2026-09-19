export const summaryData = [
  {
    id: 1,
    title: 'Congested Roads',
    value: '7',
    icon: '🚧',
    color: '#ef4444',
    change: '+2 from last hour',
    trend: 'up',
  },
  {
    id: 2,
    title: 'Active Incidents',
    value: '2',
    icon: '⚠️',
    color: '#f59e0b',
    change: '-1 resolved today',
    trend: 'down',
  },
  {
    id: 3,
    title: 'Average Speed',
    value: '28 km/h',
    icon: '⚡',
    color: '#10b981',
    change: '-5.2 km/h from peak',
    trend: 'down',
  },
  {
    id: 4,
    title: 'Network Status',
    value: 'Moderate',
    icon: '📊',
    color: '#3b82f6',
    change: 'Updated 2 min ago',
    trend: 'stable',
  },
];

export const forecastData = {
  labels: ['Current', '15 min', '30 min', '45 min', '60 min'],
  values: [82, 88, 91, 74, 61],
};

export const roadSegments = [
  {
    id: 'R1',
    name: 'MG Road',
    positions: [[12.9716, 77.5946], [12.9756, 77.6046]],
    status: 'normal',
    color: '#10b981',
  },
  {
    id: 'R5',
    name: 'Brigade Road',
    positions: [[12.9726, 77.6066], [12.9786, 77.6126]],
    status: 'slow',
    color: '#f59e0b',
  },
  {
    id: 'R12',
    name: 'Silk Board Junction',
    positions: [[12.9176, 77.6233], [12.9226, 77.6333]],
    status: 'congested',
    color: '#ef4444',
  },
  {
    id: 'R8',
    name: 'Outer Ring Road',
    positions: [[12.9350, 77.6140], [12.9420, 77.6240]],
    status: 'normal',
    color: '#10b981',
  },
  {
    id: 'R15',
    name: 'Hosur Road',
    positions: [[12.9100, 77.6350], [12.9200, 77.6280]],
    status: 'normal',
    color: '#10b981',
  },
];

export const incidentData = {
  segment: 'R12',
  location: 'Silk Board Junction',
  type: 'Possible Collision',
  confidence: 87,
  timestamp: '2 min ago',
  position: [12.9200, 77.6280],
};

export const recommendationData = {
  action: 'Divert traffic through Route R15 (Hosur Road)',
  reason: 'AI analysis indicates R15 has 40% lower congestion and can absorb additional traffic load without significant delay increase.',
  confidence: 91,
  estimatedImpact: '21% congestion reduction',
};

export const simulationData = {
  before: 82,
  after: 61,
  route: 'R15 (Hosur Road)',
  improvement: 21,
};
