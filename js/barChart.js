d3.csv("../data/gender-count.csv")
  .then(function (data) {
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
