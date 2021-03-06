import { autocomplete } from "./autocomplete.js";

d3.csv("data/tate-art.csv")
  .then(function (data) {

    const waffle = d3.select(".waffle");
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
            "<h2 class = 'tip-text'>"+
              d.artist +
              "<span class = 'tip-text tip-date'>" +
              d.dates +
              "</span>" +
              "</h2>" +
              "<p>" +
              "<hr class = 'breakline'>" +
              "<h4 class = 'tip-text'>" +
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
        tooltip.transition().duration(500).style("opacity", 0);
      });

    const names = d3
      .map(data, function (d) {
        return d.name;
      })
      .keys();

    d3.selectAll(".sort-title").on("click", function (d) {
      waffle
        .selectAll(".paint")
        .sort(function (a, b) {
          return d3.ascending(a.title, b.title);
        })
        .transition()
        .duration(500);
    });

    d3.selectAll(".sort-abc").on("click", function (d) {
      waffle
        .selectAll(".paint")
        .sort(function (a, b) {
          return d3.ascending(a.name, b.name);
        })
        .transition()
        .duration(500);
    });

    d3.selectAll(".sort-birth").on("click", function (d) {
      waffle
        .selectAll(".paint")
        .sort(function (a, b) {
          return +a.yearOfBirth - +b.yearOfBirth;
        })
        .transition()
        .duration(500);
    });

    d3.selectAll(".sort-purchase").on("click", function (d) {
      waffle
        .selectAll(".paint")
        .sort(function (a, b) {
          return +a.acquisitionYear - +b.acquisitionYear;
        })
        .transition()
        .duration(500);
    });

    d3.selectAll(".sort-gender").on("click", function (d) {
      waffle
        .selectAll(".paint")
        .sort(function (a, b) {
          return d3.ascending(a.gender, b.gender);
        })
        .transition()
        .duration(500);
    });

    d3.selectAll(".switch").on("click", function (d) {
      if (this.innerHTML == "Women") {
        waffle
          .selectAll(".paint")
          .style("opacity", (d) => (d.gender == "Female" ? 1 : 0));
      }
      if (this.innerHTML == "Men") {
        waffle
          .selectAll(".paint")
          .style("opacity", (d) => (d.gender == "Male" ? 1 : 0));
      } else if (this.innerHTML == "All") {
        waffle
          .selectAll(".paint")
          .style("opacity", 1);
      }
    });

    d3.selectAll("#text-input").on("keyup", function (d) {
      const searchPaint = this.value;
      if (names.includes(this.value)) {
        const dataFilter = data.filter(function (d) {
          return d.name == searchPaint;
        });
        let filteredWaffle = waffle.selectAll(".paint").data(dataFilter);

        filteredWaffle
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
                "<h2 class = 'tip-text'>" +
                  d.artist +
                  "<span class = 'tip-text tip-date'>" +
                  d.dates +
                  "</span>" +
                  "</h2>" +
                  "<p>" +
                  "<hr class = 'breakline'>" +
                  "<h4 class = 'tip-text'>" +
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
            tooltip.transition().duration(500).style("opacity", 0);
          });

        filteredWaffle
          .style("width", (d) => d.width / 100 + "px")
          .style("height", (d) => d.height / 100 + "px")
          .style("background-color", (d) =>
            d.gender == "Female" ? "#14F5B2" : "#b14aed"
          )
          .style("opacity", (d) => (d.gender == "Female" ? 1 : 0.9));

        filteredWaffle.exit().remove();
      }
    });

    d3.selectAll(".reset").on("click", function (d) {
      waffle.selectAll(".paint").remove();
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
              "<h2 class = 'tip-text'>" +
                d.artist +
                "<span class = 'tip-text tip-date'>" +
                d.dates +
                "</span>" +
                "</h2>" +
                "<p>" +
                "<hr class = 'break-line'>" +
                "<h4 class = 'tip-text'>" +
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
          tooltip.transition().duration(500).style("opacity", 0);
        });
    });

    var button = d3.selectAll(".button");

    // Loop through the buttons and add the active class to the current/clicked button
    for (var i = 0; i < button.length; i++) {
      button[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
      });
    }

    autocomplete(document.getElementById("text-input"), names);
  })

  .catch(function (error) {
    // handle error
  });
