function buildGauge(frequecy){
  // Convert the frequency of wash to a number between 0 and 180
  // degrees in a semi-circle. deterine where the needle will point 
  var level = ((180 * frequecy) / 9);

  // Trig to calc meter point
  var degrees = 180 - level,
      radius = .5;
  var radians = degrees * Math.PI / 180;
  var x = radius * Math.cos(radians);
  var y = radius * Math.sin(radians);
  var path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L ' : 'M -0.025 -0.0 L 0.025 0.0 L ';

  var mainPath = path1,
      pathX = String(x),
      space = ' ',
      pathY = String(y),
      pathEnd = ' Z';
  var path = mainPath.concat(pathX,space,pathY,pathEnd);

  let trace3 = {
    values: [
      50/9,
      50/9,
      50/9,
      50/9,
      50/9,
      50/9,
      50/9,
      50/9,
      50/9,
      50
    ],
    labels: [      
      "8-9",
      "7-8",
      "6-7",
      "5-6",
      "4-5",
      "3-4",
      "2-3",
      "1-2",
      "0-1",
      ""
    ],
    text: [
      "8-9",
      "7-8",
      "6-7",
      "5-6",
      "4-5",
      "3-4",
      "2-3",
      "1-2",
      "0-1",
      ""
    ],
    textinfo: "text",
    textposition: "inside",
    rotation: 90,
    marker: {
      colors: [
        "rgba(14, 127, 0, .5)",
        "rgba(14, 127, 50, .5)",
        "rgba(110, 154, 12, .5)",
        "rgba(110, 154, 88, .5)",
        "rgba(170, 202, 35, .5)",
        "rgba(170, 202, 92, .5)",
        "rgba(202, 209, 95, .5)",
        "rgba(210, 206, 145, .5)",
        "rgba(232, 226, 202, .5)",
        "rgba(255, 255, 255, 0)"
      ]
    },
    hoverinfo: "label",
    hole: .5,
    type: "pie",
    showlegend: false
  }

  trace4 = {
    type: 'scatter',
    x:[0],
    y:[0],
    marker: {
      size: 14,
      color:'850000'
    },
    name: 'Num Washes',
    // text: level,
    hoverinfo: 'text+name',
    showlegend: false
}

  let plot_data3 = [trace3, trace4];
      
  let  layout3 = {
    shapes:[{
        type: 'path',
        path: path,
        fillcolor: '850000',
        line: {
          color: '850000'
        }
      }],
    height: 500,
    width: 500,
    margin: { 
      t: 0, 
      b: 0 
    },
    xaxis: {zeroline:false, showticklabels:false,
               showgrid: false, range: [-1, 1]},
    yaxis: {zeroline:false, showticklabels:false,
               showgrid: false, range: [-1, 1]} 
  };
  
  Plotly.newPlot("gauge", plot_data3, layout3);
}

