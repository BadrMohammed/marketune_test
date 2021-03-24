import React from "react";
import { Card } from "reactstrap";
import Chart from "react-apexcharts";

const Statistics = ({ dataList }) => {
  const getGoals = (goalType) => {
    if (dataList.items !== null) {
      let goals = [];
      for (var i = 0; i < dataList.items.length; i++) {
        if (goalType !== undefined) {
          if (dataList.items[i].goal === undefined) {
            goals.push(dataList.items[i].goal_type);
          } else {
            goals.push(dataList.items[i].goal.goal_type);
          }
        } else {
          if (dataList.items[i].goal === undefined) {
            var goal = {
              goal_type: dataList.items[i].goal_type,
              points_in: dataList.items[i].points_in,
              points_out: dataList.items[i].points_out,
            };
            goals.push(goal);
          } else {
            goals.push(dataList.items[i].goal);
          }
        }
      }
      return goals;
    }
  };

  const renderGoalTypes = () => {
    let goals = getGoals();

    if (goals !== undefined) {
      let goal_types = goals.map((g) => g.goal_type);
      let uniqueTypes = [...new Set(goal_types)];
      // return uniqueTypes;
      return {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: uniqueTypes,
        },
      };
    }
  };

  const renderSeries = () => {
    let goals = getGoals();
    if (goals !== undefined) {
      let goal_types = goals.map((g) => g.goal_type);
      let uniqueTypes = [...new Set(goal_types)];
      let new_point_in = [];

      uniqueTypes.forEach((element) => {
        let item = goals.filter((g) => g.goal_type === element);
        if (item.length > 0) {
          new_point_in.push(item);
        }
      });

      let sum_of_points_in = [];

      new_point_in.map((point_sum) => {
        let item = point_sum.map((p) => p.points_in);
        for (let i = item.length - 1; i >= 0; i--) {
          if (typeof item[i] === "string") {
            item.splice(i, 1);
          }
        }

        sum_of_points_in.push(
          item.filter((t) => typeof t === "number").reduce((a, b) => a + b)
        );
      });
      return sum_of_points_in;
    }
  };
  renderSeries();
  const series = [
    {
      name: "point_in",
      data: renderSeries(),
    },
  ];

  return dataList.items !== null ? (
    <Card className="card_style">
      <Chart options={renderGoalTypes()} series={series} type="bar" />
    </Card>
  ) : null;
};

export default Statistics;
