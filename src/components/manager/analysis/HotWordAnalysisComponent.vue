<template>
  <el-main>
    <div class="main">
      <div class="container">
        <div class="time">
          <el-form>
            <el-form-item>
              <el-col>
                <el-date-picker
                  v-model="form.time"
                  type="date"
                  placeholder="Pick a date"
                  style="width: 200px; margin-top: 10px"
                />
                <el-button
                  type="primary"
                  style="margin-top: 10px"
                  @click="hotWord"
                  >查询</el-button
                >
              </el-col>
            </el-form-item>
          </el-form>
        </div>

        <div class="div1">
          <div class="box">
            <div class="content" id="yesterdayHotWord"></div>
            <div>{{ form.title }} 热词排行榜</div>
          </div>
        </div>
      </div>
    </div>
  </el-main>
</template>
  
<script setup>
import { reactive, ref } from "vue";
import * as echarts from "echarts";
import api from "../../../api";
import { extractYearAndMonth, extractDay } from "../../../utils/date";

// 使用 onMounted 钩子确保在组件挂载后执行代码

const form = reactive({
  time: null,
  title: "",
});

function hotWord() {
  const endTime = ref("");

  if (null != form.time && "" !== form.time) {
    endTime.value = form.time.toString();

    alert(JSON.stringify(form.time));

    api.postHotWord(endTime.value).then((Response) => {
      if (true == Response.data.data.isGet) {
        const option = {
          dataset: [
            {
              dimensions: ["name", "score"],
              source: Object.entries(Response.data.data.hotTop20).map(
                ([name, score]) => [name, score]
              ),
            },
            {
              transform: {
                type: "sort",
                config: { dimension: "score", order: "desc" },
              },
            },
          ],
          xAxis: {
            type: "category",
            axisLabel: {
              interval: 0,
              rotate: 0,
              textStyle: {
                show: true,
                fontFamily: "微软雅黑",
                fontSize: "20",
              },
            },
          },
          yAxis: {
            axisLabel: {
              textStyle: {
                show: true,
                fontFamily: "微软雅黑",
                fontSize: "20",
              },
            },
          },
          series: {
            type: "bar",
            barWidth: 30, // 设置柱体宽度
            encode: { x: "name", y: "score" },
            datasetIndex: 1,
          },
        };

        const targetElement = document.getElementById("yesterdayHotWord");

        if (targetElement) {
          const myChart = echarts.init(targetElement);
          myChart && myChart.setOption(option);
        }
      }
    });

    form.title =
      extractYearAndMonth(endTime.value) + "-" + extractDay(endTime.value);
  }
}
</script>
  
<style scoped>
.el-main {
  height: 950px;
  margin-left: 10px;
  --el-main-padding: 0px;
}

.main {
  width: 100%;
  height: 650px;
  background-color: #f3f4f8;
  box-shadow: inset -1em -1em 3em rgba(200, 204, 200, 0.3), 0 0 0 2px white,
    0.3em 0.3em 1em rgba(92, 91, 91, 0.6);
  border-radius: 10px;
  overflow: hidden;
}

.container {
  width: 100%;
  height: 920px;
  overflow: auto;
  /* margin-top: 20px; */
  /* background: rgb(188, 201, 195); */
}

.div1 {
  width: 100%;
  height: 600px;
}

.box {
  float: left;
  width: 100%;
  height: 550px;
  margin-left: 20px;
  margin-right: 30px;
  /* background: white; */
  font-size: 20px;
}

.content {
  width: 100%;
  height: 500px;
  /* background: springgreen; */
}

.time {
  /* float: left; */
  height: 50px;
}
</style>
  