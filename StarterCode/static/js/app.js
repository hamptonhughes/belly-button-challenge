// Set the Url
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'


// Fetch the json and log to console

d3.json(url).then(function(data) {
    console.log(data);
    
  
    
    let sampValues = data.samples[0].sample_values;
    let otu = data.samples[0].otu_ids;
    let id = data.samples[0].id;
    let otuLabels= data.samples[0].otu_labels;

    
    //Create empty list
    var list = []

    for (var i=0;i<sampValues.length;i++) {
    list.push({'id':id,'sample_values':sampValues[i],'otu_ids':otu[i],'otu_labels':otuLabels[i]})
    }

    let sortedData = list.sort((b,c)=> c.sample_values - b.sample_values)

    let sliced = sortedData.slice(0,10)

    let reversed = sliced.reverse()
    console.log(reversed)

   // }



    function init() {

       
    // Populate the dropdown menu
    selector = d3.select("#selDataset");
            for (let i = 0; i < data.samples.length; i++){
            //console.log(countries[names[i]])
            selector.append("option").text(data.samples[i].id).property("value", data.samples[i].id);
            }

    let trace1 = {
        x:reversed.map((x)=>x.sample_values),
        y:`OTU ${reversed.map((y)=>y.otu_ids)}`,
        labels: `OTU ${reversed.map((y)=>y.otu_ids)}`,
        type: 'bar',  
        orientation: 'h'    
    };

    let plotData = [trace1];

    Plotly.newPlot("barchart", plotData);
    };
   
    init()

    
});

