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

    // call Gauge chart
    buildGauge(sampleMdata.WFREQ);

  });
}

// Charting function. Parameter is a dictionary with sample data
function buildCharts(sample) {
  // Grab a reference to the chart divs
  let pieChart = d3.select("#pie");
  let bubChart = d3.select("#bubble");

  // Clear previous metadata
  pieChart.html("");
  bubChart.html("");

  // Build the path from which will get the data
  let url = "/samples/" + sample;

    // Use the data to build the metadata section
  d3.json(url).then((sampleData) => {
    // Generate an array to assign color to the bubbles *** How to generate color variety
    // different traces, each with one color? how to group??
    let colorArray = Array.from({length: sampleData.otu_ids.length}, (x,i) => i);

    // define the bubble chart
    let trace1 = {
      type: "scatter",
      mode: "markers",
      x: sampleData.otu_ids,
      y: sampleData.sample_values,
      text: sampleData.otu_labels,
      marker: {
        size: sampleData.sample_values,
        color: sampleData.otu_ids,
        colorscale: "Earth"
      }
    };
  
    let plot_data1 = [trace1];

    let layout1 = {
      showlegend: false,
      hovernode: "closest",
      height: 500,
      width: 1200,
      xaxis: {
        title: "OTU ID"
      }
    };

    Plotly.newPlot("bubble", plot_data1, layout1);

    // Define pie chart
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