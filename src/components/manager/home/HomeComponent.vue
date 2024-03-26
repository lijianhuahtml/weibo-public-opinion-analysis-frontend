<template>
    <div class="main">
      <div class="content1">
        <div class="wordCloud">
          <word-cloud-component style="height: 100%; width: 100%"></word-cloud-component>
        </div>
        <div class="pos">
          <div class="content" id="positive"></div>
          <div>前两周积极评论数量</div>
        </div>
        <div class="pas">
          <div class="content" id="negative"></div>
          <div>前两周消极评论数量</div>
        </div>
      </div>
  
      <div class="content2">
        <div class="map">
          <map-analysis-component
            style="width: 100%; height: 100%"
          ></map-analysis-component>
        </div>
        <div class="hotword">
          <div class="time">
            <div class="select2">
            <el-form>
              <el-form-item>
                <el-col>
                  <el-date-picker
                    v-model="form.time"
                    type="date"
                    placeholder="选择某天热词"
                    style="width: 200px; margin-top: 1%"
                  />
                  <el-button
                    type="primary"
                    style="margin-top: 1%"
                    @click="hotWord"
                    >查询</el-button
                  >
                </el-col>
              </el-form-item>
            </el-form>
           </div>
            <div class="select1">
              <el-select v-model="value" placeholder="选择热词范围" style="width: 240px"  @change="handleChange">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
            </div>

            
          </div>
          <div class="hotContent" id="yesterdayHotWord"></div>
          <div>{{ form.title }} 热词排行榜</div>
        </div>
      </div>

    </div>
  </template>
  
  <script setup>
  import { extractYearAndMonth, extractDay } from "../../../utils/date";
  import { reactive, ref } from "vue";
  import { onMounted } from "vue";
  import WordCloudComponent from "./WordCloudComponent.vue";
  import MapAnalysisComponent from "../analysis/MapAnalysisComponent.vue";
  import api from "../../../api";
  import * as echarts from "echarts";
  
  const form = reactive({
    time: null,
    title: "",
  });

  const options = [
  {
    value: '',
    label: '',
  },
  {
    value: '1',
    label: '三天前至今',
  },
  {
    value: '2',
    label: '七天前至今',
  },
]
  
  // 使用 onMounted 钩子确保在组件挂载后执行代码
  onMounted(load);
  
function load(){
    loadEmotion();
    loadHotWord();
}

function handleChange(newValue) {
      if (newValue == '1') {
        form.title = "三天前至今"
      } else if(newValue == '2') {
          form.title = "七天前至今"
        } else {
          form.title = ""
      }

    if (newValue != '') {
      api.postHotTimeType(newValue).then((Response) => {
        if (true == Response.data.data.isGet) {
          const option = {
            dataset: [
              {
                dimensions: ["name", "score"],
                source: Object.entries(Response.data.data.hotTop12).map(
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
                  fontSize: "16",
                },
              },
            },
            yAxis: {
              axisLabel: {
                textStyle: {
                  show: true,
                  fontFamily: "微软雅黑",
                  fontSize: "16",
                },
              },
            },
            series: {
              type: "bar",
              barWidth: 20, // 设置柱体宽度
              encode: { x: "name", y: "score" },
              datasetIndex: 1,
            },
          };
  
          const targetElement = document.getElementById("yesterdayHotWord");
  
          if (targetElement) {
            // 先销毁已有的图表实例
            echarts.dispose(targetElement);
            const myChart = echarts.init(targetElement);
            myChart && myChart.setOption(option);
          }
        }
      });
    }  
   
}
  
  function loadEmotion() {
    api.getLastTwoWeekPositiveNum().then((Response) => {
      const option = {
        xAxis: {
          type: "category",
          data: Response.data.data.dateList,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: Response.data.data.countList,
            type: "line",
            smooth: true,
          },
        ],
      };
  
      const targetElement = document.getElementById("positive");
  
      if (targetElement) {
        // 先销毁已有的图表实例
        echarts.dispose(targetElement);
  
        // 重新初始化图表实例并设置新的配置选项
        const myChart = echarts.init(targetElement);
        myChart && myChart.setOption(option);
      }
    });
  
    api.getlastTwoWeekNegativeNum().then((Response) => {
      const option = {
        xAxis: {
          type: "category",
          data: Response.data.data.dateList,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: Response.data.data.countList,
            type: "line",
            smooth: true,
          },
        ],
      };
      const targetElement = document.getElementById("negative");
  
      if (targetElement) {
        // 先销毁已有的图表实例
        echarts.dispose(targetElement);
        const myChart = echarts.init(targetElement);
        myChart && myChart.setOption(option);
      }
    });
  }

  function loadHotWord() {
    const now = new Date();
    now.setDate(now.getDate() - 1);
    const endTime = now.toString()
    
      api.postHotWord(now.toString()).then((Response) => {
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
                  fontSize: "16",
                },
              },
            },
            yAxis: {
              axisLabel: {
                textStyle: {
                  show: true,
                  fontFamily: "微软雅黑",
                  fontSize: "16",
                },
              },
            },
            series: {
              type: "bar",
              barWidth: 20, // 设置柱体宽度
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
  
      form.title = extractYearAndMonth(endTime) + "-" + extractDay(endTime);
  }
  
  function hotWord() {
    const endTime = ref("");
  
    if (null != form.time && "" !== form.time) {
      endTime.value = form.time.toString();
      
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
                  fontSize: "16",
                },
              },
            },
            yAxis: {
              axisLabel: {
                textStyle: {
                  show: true,
                  fontFamily: "微软雅黑",
                  fontSize: "16",
                },
              },
            },
            series: {
              type: "bar",
              barWidth: 20, // 设置柱体宽度
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
  .main {
    width: 100%;
    height: 100%;
  }
  
  .content1 {
    float: left;
    width: 40%;
    height: 100%;
  }
  
  .wordCloud {
    float: left;
    width: 100%;
    height: 30%;
  }
  
  .map {
    float: left;
    width: 100%;
    height: 60%;
  }
  
  .hotword {
    float: left;
    width: 100%;
    height: 40%;
  }
  
  .time {
    width: 100%;
    height: 10%;
    /* background: yellow; */
  }

  .select1{
    float: right;
    margin-top: 3px;
  }

  .select2{
    float: right;
    margin-right: 20%;
  }
  
  .content2 {
    float: left;
    width: 60%;
    height: 100%;
  }
  
  .pos {
    float: left;
    width: 100%;
    height: 35%;
  }
  
  .pas {
    float: left;
    width: 100%;
    height: 35%;
  }
  
  .content {
    width: 100%;
    height: 90%;
  }
  
  .hotContent {
    width: 100%;
    height: 81%;
  }
  </style>