<template>
  <div id="chart-container"></div>
</template>
   
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
import "echarts-wordcloud";
import api from "../../../api";

onMounted(load);

const chart = ref(null);

function load() {
  api.postCloudWord().then((Response) => {
    if (true == Response.data.data.isGet) { 
      chart.value = echarts.init(document.getElementById("chart-container"));
        const option = {
          series: [
            {
        type: "wordCloud",
        sizeRange: [20, 40],
        rotationRange: [0, 0],
        rotationStep: 45,
        rotation: 45,
        gridSize: 10,
        shape: "circle",
        width: "100%",
        height: "100%",
        drawOutOfBound: true,
        textStyle: {
          color: function () {
            return (
              "rgb(" +
              [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
              ].join(",") +
              ")"
            );
          },
        },
        emphasis: {
          textStyle: {
            shadowBlur: 10,
            shadowColor: "#333",
            color: "red",
          },
        },
              data: Object.entries(Response.data.data.cloudWord).map(
              ([name, value]) => ({ name, value })
            ),
        },
      ],
      };
      chart.value.setOption(option);
                                          }
   });
}

onBeforeUnmount(() => {
  if (!chart.value) {
    return;
  }
  chart.value.dispose();
});

</script>


<style scoped>
#chart-container {
  height: 100%;
  width: 100%;
}
</style>