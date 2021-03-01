d3.csv("../data/gender-count.csv")
  .then(function (data) {
    // const height = 50;
    // const width = 1000;

    // // append the svg object to the body of the page
    // const svg = d3
    //   .select(".chart")
    //   .append("svg")
    //   .attr("preserveAspectRatio", "xMinYMin meet")
    //   .attr("width", '70%')
    //   .attr("height", '100%' )
    //   .attr('viewBox','0 0 '+ Math.min(width + 50)+' '+Math.min(height + 50))
    //   .append("g")
    //   .attr("transform", "translate(" + Math.min(width) / 10 + "," + Math.min(height) / 10 + ")");
    //   // Add X axis
    // const x = d3.scaleLinear().domain([0, 54000]).range([0, width]);
    // svg
    //   .append("g")
    //   .attr("transform", "translate(0," + height + ")")
    //   .call(
    //     d3
    //       .axisBottom(x)
    //       .ticks(5)
    //       .tickFormat(function (d) {
    //         if (d / 1000 >= 1) {
    //           d = d / 1000 + "K";
    //         }
    //         return d;
    //       })
    //   );

    // // Y axis
    // const y = d3
    //   .scaleBand()
    //   .range([0, height])
    //   .domain(
    //     data.map(function (d) {
    //       return d.gender;
    //     })
    //   )
    //   .padding(0.1);
    // svg.append("g").call(d3.axisLeft(y)).attr("class", "yaxis");
    // //Bars
    // svg
    //   .selectAll("myRect")
    //   .data(data)
    //   .enter()
    //   .append("rect")
    //   .attr("x", x(0))
    //   .attr("y", function (d) {
    //     return y(d.gender);
    //   })
    //   .attr("width", 0)
    //   .attr("height", y.bandwidth())
    //   .attr("fill", (d) => (d.gender == "Women" ? "#14F5B2" : "#b14aed"))
    //   .transition()
    //   .duration(2000)
    //   .attr("width", function (d) {
    //     return x(d.count);
    //   });

    // // .attr("x", function(d) { return x(d.gender); })
    // // .attr("y", function(d) { return y(d.count); })
    // // .attr("width", x.bandwidth())
    // // .attr("height", function(d) { return height - y(d.count); })
    // // .attr("fill", "#69b3a2")

    // create a Y scale for the data
    const scaleX = d3.scaleLinear().range([0, 100]).domain([0, 54000]);

    // Select the figure element
    const bar = d3.select(".chart");

    // Add a div for each month
    const gender = bar
      .selectAll(".gender")
      .data(data)
      .enter()
      .append("div")
      .attr("class", "gender")
      // And scale the height of the box based on the value
      .style("width", (d) => `${scaleX(d.count)}%`)
      // Scale the color based on the social media type
      .style("background-color", (d) =>
        d.gender == "Women" ? "#14F5B2" : "#b14aed"
      );
    // Add a block for each social media type

    // Add a month label
    const label = gender
      .append("text")
      .text((d) => d.gender)
      .attr("class", "label");
      
    // Add a total count label
    const count = gender
      .append("text")
      .text((d) => (d.count))
      .attr("class", "count")
      .attr("class", (d) =>
      d.gender == "Women" ? "count count-women" : "count count-men")
  })

  .catch(function (error) {
    // handle error
  });
