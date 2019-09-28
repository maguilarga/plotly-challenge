function buildMetadata(sample) {
  // Grab a reference to the metada div
  let  mdataDiv = d3.select("#sample-metadata");

  // Clear previous metadata
  mdataDiv.html("");

  // Build the path from which will get the data
  let url = "/metadata/" + sample;

  // Use the data to build the metadata section
  d3.json(url).then((sampleMdata) => {
    // Iterate through the dictionary: keys and values
    Object.entries(sampleMdata).forEach(([key, value]) => {
      mdataDiv.append("p").text(`${key}: ${value}`);
    });

    // BONUS: Build the Gauge Chart
    // Function to chart a gauge *** NOT including
    // import { buildGauge } from './bonus.js';
    buildGauge(sampleMdata.WFREQ);

  });
}

// function buildGauge(frequecy){
//   // Grab a reference to the gauge div
//   let  mdataDiv = d3.select("#gauge");
  
//   let trace3 =     {
//       domain: { 
//         x: [0, 1], 
//         y: [0, 1],
//         row: 10
//       },
//       value: frequecy,
//       title: { 
//         text: "Belly Button Washing Frequency",
//         font: {
//           size: 30
//         }
//        },
//       type: "indicator",
//       name: "MAGU",
//       mode: "gauge",
//       // delta: { reference: 380 },
//       gauge: {
//           axis: { range: [null, 10] },
//           steps: [
//               { range: [0, 1], color: "lightyellow"},
//               { range: [1, 2], color: "lightgray"},
//               { range: [2, 3], color: "lightgray"},
//               { range: [3, 4], color: "lightgray"},
//               { range: [4, 5], color: "lightgray"},
//               { range: [5, 6], color: "lightgray"},
//               { range: [6, 7], color: "lightgray"},
//               { range: [7, 8], color: "lightgray"},
//               { range: [8, 9], color: "green" }
//           ]
//       }
//   }
  
//   let plot_data3 = [trace3];
      
//   let layout3 = { 
//       width: 600, 
//       height: 450, 
//       margin: { 
//           t: 0, 
//           b: 0 
//       } 
//   };
  
//   Plotly.newPlot("gauge", plot_data3, layout3);
//   }


function buildCharts(sample) {
  // Grab a reference to the chart divs
  let pieChart = d3.select("#pie");
  let bubChart = d3.select("#bubble");

  // Clear previous metadata
  pieChart.html("");
  bubChart.html("");

  // Build the path from which will get the data
  let url = "/samples/" + sample;

  console.log(url)

    // Use the data to build the metadata section
  d3.json(url).then((sampleData) => {
    // Generate an array to assign color to the bubbles *** How to generate color variety
    // different traces, each with one color? how to group??
    let colorArray = Array.from({length: sampleData.otu_ids.length}, (x,i) => i);

    // *** How to show x,y in the hover text
    let trace1 = {
      type: "scatter",
      mode: "markers",
      x: sampleData.otu_ids,
      y: sampleData.sample_values,
      text: sampleData.otu_labels,
      marker: {
        size: sampleData.sample_values,
        color: colorArray
      }
    };
  
    let plot_data1 = [trace1];

    let layout1 = {
      showlegend: false,
      hovernode: "closest",
      height: 600,
      // width: 1200,
      xaxis: {
        title: "OTU ID"
      }
    };

    Plotly.newPlot("bubble", plot_data1, layout1);

    let trace2 = {
      type: "pie",
      labels: sampleData.otu_ids.slice(0,10), 
      values: sampleData.sample_values.slice(0,10)
    };

    let plot_data2 = [trace2];

    Plotly.newPlot("pie", plot_data2);
  });
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected

  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();

// *** WHY cytrl+F5. HTML will NOT load unless I kill py and reload it