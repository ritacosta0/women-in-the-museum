d3.csv("sort-abc.csv")
  .then(function (data) {
    console.log(data)
    const waffle = d3.select(".waffle");
    // Define the div for the tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tip")
      .style("opacity", 0);

    waffle
      .selectAll(".paint")
      .data(data)
      .enter()
      .append("div")
      .attr("class", "paint")
      .style("width", (d) => d.width / 100 + "px")
      .style("height", (d) => d.height / 100 + "px")
      .style("background-color", (d) =>
        d.gender == "Female" ? "#14F5B2" : "#b14aed"
      )
      .style("opacity", (d) => (d.gender == "Female" ? 1 : 0.9))
      .on("mouseover", function (d) {
        tooltip.transition().duration(200).style("opacity", 1);
        tooltip
          .html(
            "<h2 class = 'tipText'>" +
              d.artist +
              "<span class = 'tipText tipDate'>" +
              d.dates +
              "</span>" +
              "</h2>" +
              "<p>" +
              d.acquisitionYear +
              "</p>" +
              "<hr class = 'breakLine'>" +
              "<h4 class = 'tipText'>" +
              d.title +
              "</h4>" + 
              "<img class = 'img' src=" +
              d.thumbnailUrl +
              " onerror = 'this.style.display=none' alt = 'Image not available'>"
          )
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY - 28 + "px");
      })
      .on("mouseout", function (d) {
        tooltip
          .transition()
          .duration(500)
          .style("opacity", 0);
      });

    d3.selectAll(".sort-title").on("click", function (d) {
      waffle
        .selectAll(".paint")
        .sort(function (a,b) {return d3.ascending(a.title, b.title);})
        .transition()
        .duration(500)
    });

    d3.selectAll(".sort-abc").on("click", function (d) {
      waffle
        .selectAll(".paint")
        .sort(function (a,b) {return d3.ascending(a.name, b.name);})
        .transition()
        .duration(500)
    });    
    
    d3.selectAll(".sort-birth").on("click", function (d) {
      waffle
        .selectAll(".paint")
        .sort(function(a,b) { return +a.yearOfBirth - +b.yearOfBirth })
        .transition()
        .duration(500)
    });

    d3.selectAll(".sort-purchase").on("click", function (d) {
      waffle
        .selectAll(".paint")
        .sort(function(a,b) { return +a.acquisitionYear - +b.acquisitionYear })
        .transition()
        .duration(500)
    });
  })

  .catch(function (error) {
    // handle error
  });
