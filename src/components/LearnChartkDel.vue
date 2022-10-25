<template >
  <div @dblclick="mousemoveOrNone()">
    <v-chart class="chart" :option="option" />
  </div>
</template>
  
<script>
import * as echarts from 'echarts/core';
import {
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  LegendComponent,
  BrushComponent,
  DataZoomComponent
} from 'echarts/components';
import { CandlestickChart, LineChart, BarChart, ScatterChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

import VChart from 'vue-echarts';
import { defineComponent, reactive } from 'vue';

echarts.use([
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  LegendComponent,
  BrushComponent,
  DataZoomComponent,
  CandlestickChart,
  LineChart,
  BarChart,
  ScatterChart,
  CanvasRenderer,
  UniversalTransition
]);

export default defineComponent({
  name: 'LearnChartkDel',
  components: {
    VChart,
  },
  props: {
    mydata: {
      type: Object
    },
  },
  // data() {
  //   return {
  //   }
  // },
  // methods: {
  // },
  setup(props) {
    console.log(props.mydata.length2)
    function calculateMA(dayCount, data) {
      var result = [];
      // console.log(data)
      for (var i = 0, len = data.length; i < len; i++) {
        if (i < dayCount) {
          result.push('-');
          continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
          sum += data[i - j][1];
        }
        result.push(+(sum / dayCount).toFixed(3));
      }
      return result;
    };
    function mousemoveOrNone() {
      option.tooltip.axisPointer.type = (option.tooltip.axisPointer.type == 'none') ? 'cross' : 'none'
    };
    const option = reactive({
      animation: false,
      legend: {
        bottom: 1,
        left: 'center',
      },
      tooltip: {
        axisPointer: {
          type: 'none',
        },
        padding: 1,
        textStyle: {
          fontSize: 14,
          color: '#000'
        },
      },
      axisPointer: {
        snap: true,
        // triggerOn: 'none',
        link: [{ xAxisIndex: 'all' }]
      },
      visualMap: {
        show: false,
        seriesIndex: 6,
        dimension: 2,
        pieces: [
          {
            value: 1,
            color: '#ec0000'
          },
          {
            value: -1,
            color: '#00da3c'
          }
        ]
      },
      grid: [
        {
          left: '8%',
          right: '1%',
          height: '65%'
        },
        {
          left: '8%',
          right: '1%',
          top: '80%',
          height: '10%'
        },
      ],
      xAxis: [
        {
          type: 'category',
          data: props.mydata.categoryData,
          // data: data.dat.categoryData,
          boundaryGap: true,
          axisLine: { onZero: false },
          splitLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
          min: 'dataMin',
          max: 'dataMax',
          axisPointer: {
            z: 100
          }
        },
        {
          type: 'category',
          gridIndex: 1,
          data: props.mydata.categoryData,
          // data: data.dat.categoryData,
          boundaryGap: true,
          axisLine: { onZero: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
          min: 'dataMin',
          max: 'dataMax',
          axisPointer: {
            label: { show: false },
          }
        },
      ],
      yAxis: [
        {
          scale: true,
          splitArea: {
            show: false
          },
          splitLine: {                 //坐标轴在 grid 区域中的分隔线。
            show: true,              //是否显示分隔线。默认数值轴显示，类目轴不显示。
            interval: 'auto',        //坐标轴分隔线的显示间隔，在类目轴中有效。默认会采用标签不重叠的策略间隔显示标签。可以设置成 0 强制显示所有标签。如果设置为 1，表示『隔一个标签显示一个标签』，可以用数值表示间隔的数据，也可以通过回调函数控制。回调函数格式如下：
            lineStyle: {
              color: '#333',
              type: 'solid', //坐标轴线线的类型，solid，dashed，dotted
              width: 0.5,    //坐标轴线线宽
              opacity: 1,    //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形
            },
          },
        },
        {
          // name: 'hk',
          // type: 'value',
          scale: true,
          gridIndex: 1,
          splitNumber: 3,
          axisLabel: {
            show: true, formatter: function (param) {
              return (param / 10000) + 'w'
            }
          },
          axisLine: { show: false },
          splitLine: {
            show: true,
            interval: 'auto',
            lineStyle: {
              color: '#333',
              type: 'solid', //坐标轴线线的类型，solid，dashed，dotted
              width: 0.5,    //坐标轴线线宽
              opacity: 1,    //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形
            },
          }
        },
      ],
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: [0, 1],
          zoomOnMouseWheel: 'alt',
          startValue: props.mydata.length2,
        },
      ],
      series: [
        {
          name: 'Dow',
          type: 'candlestick',
          data: props.mydata.values,
          // data: data.dat.values,
          itemStyle: {
            color: '#00da3c',
            color0: '#ec0000',
            borderColor: '#0CF49B',
            borderColor0: '#FD1050'
          },
        },
        {
          name: 'MA5',
          type: 'line',
          // data: [],
          data: calculateMA(5, props.mydata.values),
          smooth: true,
          showSymbol: false,
          lineStyle: {
            width: 0.5
          },
          tooltip: {
            show: false,
          }
        },
        {
          name: 'MA10',
          type: 'line',
          // data: [],
          data: calculateMA(10, props.mydata.values),
          smooth: true,
          showSymbol: false,
          lineStyle: {
            width: 0.5
          },
          tooltip: {
            show: false,
          }
        },
        {
          name: 'MA20',
          type: 'line',
          // data: [],
          data: calculateMA(20, props.mydata.values),
          smooth: true,
          showSymbol: false,
          lineStyle: {
            width: 0.5
          },
          tooltip: {
            show: false,
          }
        },
        {
          name: 'MA30',
          type: 'line',
          // data: [],
          data: calculateMA(30, props.mydata.values),
          smooth: true,
          showSymbol: false,
          lineStyle: {
            width: 0.5
          },
          tooltip: {
            show: false,
          },
        },
        {
          // name: 'gg',
          type: 'scatter',
          symbolSize: 12,
          // data: [],
          data: props.mydata.dat_yj_yg,
          tooltip: {
            position: ['0%', '0%'],
            formatter: function (param) {
              param = param.data;
              return [
                '<div style="word-break: break-all;word-wrap: break-word;white-space: normal;">'
                + param[2] + ',' + param[3] + ',' + param[4] + ',' + param[5] + '<br/>' + param[6] + '</div>'
              ].join('');
            }
          },
        },
        {
          name: 'Volume',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          stack: 'x',
          // data: [],
          data: props.mydata.volumes,
        },
      ]
    })
    return { option, mousemoveOrNone }
  },
});
</script>

<style scoped>
.chart {
  height: 97vh;
  width: 98vw;
}
</style>
  