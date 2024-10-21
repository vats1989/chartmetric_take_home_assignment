const response = [
  {
    id: 1293487,
    name: "KCRW",  // radio station callsign
    tracks: [{ timestp: "2021-04-08", trackName: "Peaches" }]
  },
  {
    id: 12923,
    name: "KQED",
    tracks: [
      { timestp: "2021-04-09", trackName: "Savage" },
      { timestp: "2021-04-09", trackName: "Savage (feat. Beyonce)" },
      { timestp: "2021-04-08", trackName: "Savage" },
      { timestp: "2021-04-08", trackName: "Savage" },
      { timestp: "2021-04-08", trackName: "Savage" }
    ]
  },
  {
    id: 4,
    name: "WNYC",
    tracks: [
      { timestp: "2021-04-09", trackName: "Captain Hook" },
      { timestp: "2021-04-08", trackName: "Captain Hook" },
      { timestp: "2021-04-07", trackName: "Captain Hook" }
    ]
  }
];

// Step 1: Aggregate the data by date, counting distinct tracks per day
const aggregatedData = {};

response.forEach(radioStation => {
  radioStation.tracks.forEach(track => {
    const day = track.timestp;
    const trackName = track.trackName;

    if(!aggregatedData[day]) {
      aggregatedData[day] = {};
    }

    if(!aggregatedData[day][trackName])  {
      aggregatedData[day][trackName] = 0;
    }
    aggregatedData[day][trackName]++;
  });
});
console.log(aggregatedData);

// step 2: Create desired format
const graphData = Object.entries(aggregatedData).map(([day, tracks]) => {
  const uniqueTracks = Object.keys(tracks);
  const totalSpins = uniqueTracks.length;
  const tooptip = uniqueTracks
    .map(trackName => `${trackName} (${tracks[trackName]})`)
    .join(", ");

  return {
    x: day,
    y: totalSpins,
    tooptip: tooptip
  };
});

// step 3: Sort result by "x" (day)
graphData.sort((a, b) => new Date(a.x) - new Date(b.x));

console.log(graphData);
