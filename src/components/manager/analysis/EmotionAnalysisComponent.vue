<template>
    <el-main>
        <div class="main">
            <div class="content" id="positive"></div>
            <div>前两周积极评论数量</div>
            <div class="content" id="negative"></div>
            <div>前两周消极评论数量</div>
        </div>
    </el-main>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted } from 'vue';
import api from '../../../api';

// 使用 onMounted 钩子确保在组件挂载后执行代码
onMounted(load);

function load() {

    api.getLastTwoWeekPositiveNum().then(Response => {
        const option = {
            xAxis: {
                type: 'category',
                data: Response.data.data.dateList
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: Response.data.data.countList,
                    type: 'line',
                    smooth: true
                }
            ]
        };

        const targetElement = document.getElementById('positive');

        if (targetElement) {
            const myChart = echarts.init(targetElement);
            myChart && myChart.setOption(option);
        }
    })

    api.getlastTwoWeekNegativeNum().then(Response => {
        const option = {
            xAxis: {
                type: 'category',
                data: Response.data.data.dateList
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: Response.data.data.countList,
                    type: 'line',
                    smooth: true
                }
            ]
        };
        const targetElement = document.getElementById('negative');

        if (targetElement) {
            const myChart = echarts.init(targetElement);
            myChart && myChart.setOption(option);
        }
    })
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
    height: 950px;
    background-color: #f3f4f8;
    box-shadow:
        inset -1em -1em 3em rgba(200, 204, 200, 0.3),
        0 0 0 2px white,
        0.3em 0.3em 1em rgba(92, 91, 91, 0.6);
    border-radius: 10px;
    overflow: hidden;
}

.content {
    width: 100%;
    height: 400px;
    /* background: yellow; */
    margin-top: 20px;
}
</style>