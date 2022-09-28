<template>
  <div>User {{ $route.params.id }}</div>
  <!-- <v-chart class="chart" :option="option" /> -->
  <div ref="linechart" class="chart" id="main"></div>
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

// import VChart from 'vue-echarts';
import { defineComponent } from 'vue';
import { api } from 'boot/axios'

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
  name: 'LearnChartk',
  components: {
    // VChart,
  },
  data() {
    return {
      model: false,
      mylineStyle: {
        color: '#333',
        type: 'solid', //坐标轴线线的类型，solid，dashed，dotted
        width: 0.5,    //坐标轴线线宽
        opacity: 1,    //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形
      },
      upColor: '#00da3c',
      downColor: '#ec0000',
    }
  },
  methods: {
    splitData(rawData) {
      console.log('uy')
      let categoryData = [];
      let values = [];
      let volumes = [];
      for (let i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0]);
        values.push(rawData[i]);
        volumes.push([i, rawData[i][4], rawData[i][0] > rawData[i][1] ? 1 : -1]);
      }
      // console.log(volumes)
      return {
        categoryData: categoryData,
        values: values,
        volumes: volumes
      };
    },
    calculateMA(dayCount, data) {
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
    },
    getStockk() {
      console.log(this.$route.params.id);
      api.get('/polls/5/results/', {
        params: {
          inp: this.$route.params.id,
        },
      }).then(res => {
        let dat = this.splitData(res.data.dat)
        // console.log(dat);
        // let myOption = this.myOption(dat)
        // this.init(myOption)
        this.line_chart.setOption(this.myOption(dat))
      }).catch((err) => {
        console.log(err);
      });
    },
    init() {
      let lineChart = document.getElementById('main');
      echarts.dispose(lineChart);
      let theme = this.model ? 'dark' : 'light';
      // let line_chart = echarts.init(lineChart, theme);
      this.line_chart = echarts.init(lineChart, theme);
      // line_chart.setOption(options)
    },
    myOption(data) {
      return {
        animation: false,
        legend: {
          bottom: 1,
          left: 'center',
        },
        tooltip: {
          axisPointer: {
            type: 'cross'
          },
          padding: 1,
          textStyle: {
            fontSize: 14,
            color: '#000'
          },
          // position: function (pos, params, el, elRect, size) {
          //   let obj = {
          //     top: 10,
          //     [['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]]: 10
          //   };
          //   // obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 10;
          //   // console.log(obj)
          //   return obj;
          // }
        },
        axisPointer: {
          // triggerOn: 'click',
          link: [{ xAxisIndex: 'all' }]
        },
        // toolbox: {
        //   feature: {
        //     dataZoom: {
        //       yAxisIndex: false
        //     },
        //     brush: {
        //       type: ['lineX', 'clear']
        //     }
        //   }
        // },
        // brush: {
        //   xAxisIndex: 'all',
        //   brushLink: 'all',
        //   outOfBrush: {
        //     colorAlpha: 0.1
        //   }
        // },
        visualMap: {
          show: false,
          seriesIndex: 5,
          dimension: 2,
          pieces: [
            {
              value: 1,
              color: this.downColor
            },
            {
              value: -1,
              color: this.upColor
            }
          ]
        },
        grid: [
          {
            left: '3%',
            right: '1%',
            height: '65%'
          },
          {
            left: '3%',
            right: '1%',
            top: '80%',
            height: '10%'
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: data.categoryData,
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
            data: data.categoryData,
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
          }
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
              lineStyle: this.mylineStyle
            },
          },
          {
            scale: true,
            gridIndex: 1,
            splitNumber: 2,
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false }
          }
        ],
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: [0, 1],
            startValue: data.categoryData.length - 150,
            // endValue: data_length,//设置X轴刻度之间的间隔(根据数据量来调整)
          },
          {
            show: true,
            // height: 10, //设置滚轴的高度
            xAxisIndex: [0, 1],
            type: 'inside',
            // type: 'slider',
            top: '85%',
            startValue: data.categoryData.length - 150,
            // endValue: data_length,
          }
        ],
        series: [
          {
            name: 'Dow',
            type: 'candlestick',
            data: data.values,
            itemStyle: {
              color: this.upColor,
              color0: this.downColor,
              borderColor: '#0CF49B',
              borderColor0: '#FD1050'
            },
          },
          {
            name: 'MA5',
            type: 'line',
            data: this.calculateMA(5, data.values),
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
            data: this.calculateMA(10, data.values),
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
            data: this.calculateMA(20, data.values),
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
            data: this.calculateMA(30, data.values),
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
            name: 'Volume',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            stack: 'x',
            data: data.volumes,

          },
          {
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: [[1, 20000000, '预祝']],
            // data: data.volumes.slice(500, 540),
            type: 'bar',
            stack: 'x',
            tooltip: {
              formatter: function (param) {
                // console.log(param)
                return [
                  'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
                  'Open: ' + param.data[1] + '<br/>',
                  'Close: ' + param.data[2] + '<br/>',
                ].join('');
              }
            }
          },
        ]
      }
    },
  },
  // watch: {
  //   '$q.dark.isActive': function () {
  //     this.init();
  //   }
  // },
  mounted() {
    this.getStockk()
    this.init()
  },
  // setup() {

  // },
});
</script>

<style scoped>
.chart {
  height: 85vh;
  width: 99vw;
}
</style>
  