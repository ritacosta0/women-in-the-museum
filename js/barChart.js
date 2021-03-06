d3.csv("data/gender-count.csv")
  .then(function (data) {

    const scaleX = d3.scaleLinear().range([0, 100]).domain([0, 54000]);

    const bar = d3.select(".chart");

    // Add a div for each month
    const gender = bar
      .selectAll(".gender")
      .data(data)
      .enter()
      .append("div")
      .attr("class", "gender")
      .style("width", (d) => `${scaleX(d.count)}%`)
      .style("background-color", (d) =>
        d.gender == "Women" ? "#14F5B2" : "#b14aed"
      );

    const label = gender
      .append("text")
      .text((d) => d.gender)
      .attr("class", "label");
      
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
