<template>
  <div class="map" id="map"></div>
</template>

<script setup>
import { onMounted } from "vue";
import * as echarts from "echarts";
import api from "../../../api";

// 使用 onMounted 钩子确保在组件挂载后执行代码
onMounted(load);

function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function load() {
  api.getWeekCommentAreaNum().then((Response) => {
    if (true == Response.data.data.isGet) {

      const chinaJson = require("@/assets/map/china.json");

      echarts.registerMap("china", chinaJson);

      const today = new Date();
      let lastWeekMonday = new Date(today);
      let lastWeekSunday = new Date(today);

      // 获取上一周的周一
      lastWeekMonday.setDate(today.getDate() - today.getDay() - 6);

      // 获取上一周的周天
      lastWeekSunday.setDate(today.getDate() - today.getDay());

      lastWeekMonday = formatDate(lastWeekMonday);
      lastWeekSunday = formatDate(lastWeekSunday);

      const option = {
        title: {
          text:
            "中国地区评论数量(" + lastWeekMonday + " ~ " + lastWeekSunday + ")",
          // subtext: '数据来自 1-1 至 2-1',
          // sublink: 'http://www.census.gov/popest/data/datasets.html',
          left: "3%",
          top: "3%",
        },
        tooltip: {
          trigger: "item",
          showDelay: 0,
          transitionDuration: 0.2,
        },
        visualMap: {
          left: "3%",
          min: 1,
          max: 1000,
          inRange: {
            color: [
              "#313695",
              "#4575b4",
              "#74add1",
              "#abd9e9",
              "#e0f3f8",
              "#ffffbf",
              "#fee090",
              "#fdae61",
              "#f46d43",
              "#d73027",
              "#a50026",
            ],
          },
          text: ["High", "Low"],
          calculable: true,
        },
        toolbox: {
          show: true,
          //orient: 'vertical',
          left: "3%",
          top: "10%",
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {},
          },
        },
        series: [
          {
            name: "地区 评论数量",
            type: "map",
            roam: true,
            map: "china",
            emphasis: {
              label: {
                show: true,
                fontSize: 14,
              },
            },
            data: Object.entries(Response.data.data.areaNum).map(
              ([name, value]) => ({ name, value })
            ),
          },
        ],
      };

      const targetElement = document.getElementById("map");

      if (targetElement) {
        const myChart = echarts.init(targetElement);
        myChart && myChart.setOption(option);
      }
    }
  });
}
</script>


<style scoped>
.map {
  width: 100%;
  height: 100%;
  /* background: yellow; */
  margin: 0 auto;
}
</style>