$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/3d-scatter.csv', function(err, rows){
          function unpack(rows, key) {
            return rows.map(function(row)
            { return row[key]; });}

          var trace1 = {
            x:unpack(rows, 'x1'), y: unpack(rows, 'y1'), z: unpack(rows, 'z1'),
            mode: 'markers',
            marker: {
              size: 12,
              line: {
              color: 'rgba(217, 217, 217, 0.14)',
              width: 0.5},
              opacity: 0.8},
            type: 'scatter3d'
          };

          var trace2 = {
            x:unpack(rows, 'x2'), y: unpack(rows, 'y2'), z: unpack(rows, 'z2'),
            mode: 'markers',
            marker: {
              color: 'rgb(127, 127, 127)',
              size: 12,
              symbol: 'circle',
              line: {
              color: 'rgb(204, 204, 204)',
              width: 1},
              opacity: 0.8},
            type: 'scatter3d'};

          // Add a trace for the lines between the points
          var lines = {
            x: [trace1.x[0], trace2.x[0]], y: [trace1.y[0], trace2.y[0]], z: [trace1.z[0], trace2.z[0]],
            mode: 'lines',
            line: {
              color: 'rgb(255, 0, 0)',
              width: 1},
            type: 'scatter3d'};

          var data = [trace1, trace2, lines];

          var layout = {margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 0
            }
            };
          Plotly.newPlot('3d-graph-1', data, layout);
        });