<template>
  <!-- <button v-on:click="getPollStockPreAdd('yuttpiu')">Count</button> -->
  <!-- xs=4 md中,sm=8所有方向小的padding -->
  <div class="q-pa-xs">
    <!-- <div>gu{{andOr!=='no'}}</div> -->
    <q-table dense :rows="rows" :columns="column" row-key="name" :pagination="initialPagination"
      :rows-per-page-options="[20,50,100,200,500,1000,0]" rows-per-page-label=" " :visible-columns="visibleColumns"
      :filter="filter">
      <template v-slot:top>
        <div class="row">
          <q-select v-model="visibleColumns2" outlined dense options-dense emit-value map-options :options="column"
            option-value="label" options-cover>
          </q-select>
          <q-select v-model="modelSingle" outlined dense options-dense emit-value map-options :options="options"
            options-cover>
          </q-select>
          <q-input v-model="inputValue" outlined dense debounce="300" placeholder="Search" input-style="padding: 0px">
            <template v-slot:append>
              <q-icon name="search" v-on:click="getPollStockPreAdd('yuttpiu')" />
            </template>
          </q-input>
          <q-select v-model="andOr" outlined dense options-dense emit-value map-options :options="optionsAndOr"
            options-cover>
          </q-select>
          <q-select v-if="andOr!=='no'" v-model="visibleColumns22" outlined dense options-dense emit-value map-options
            :options="column" option-value="label" options-cover>
          </q-select>
          <q-select v-if="andOr!=='no'" v-model="modelSingle2" outlined dense options-dense emit-value map-options
            :options="options" options-cover>
          </q-select>
          <q-input v-if="andOr!=='no'" v-model="inputValue2" outlined dense debounce="300" placeholder="Search"
            input-style="padding: 0px">
            <template v-slot:append>
              <q-icon name="search" v-on:click="getPollStockPreAdd('yuttpiu')" />
            </template>
          </q-input>
          <q-select v-model="visibleColumns" multiple outlined dense options-dense display-value="列" emit-value
            map-options :options="column" option-value="name" options-cover>
          </q-select>
          <q-input outlined dense debounce="300" v-model="filter" placeholder="过滤" input-style="padding: 0px">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </template>
      <template v-slot:body-cell-0="props">
        <q-td :props="props">
          <a target="_blank" :href="href+props.value">
            {{props.value}}
          </a>
        </q-td>
        <!-- <q-td :props="props" v-on:click="stockk(props.value)">{{props.value}}</q-td> -->
      </template>
      <template v-slot:body-cell-2="props">
        <q-td :props="props">
          <div v-if="props.value !== null" style="font-style:italic;">
            {{props.value.slice(0,4)}}
            <q-tooltip :delay="500" :offset="[0, 10]">{{props.value}}</q-tooltip>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-3="props">
        <q-td :props="props">
          <div v-if="props.value !== null" style="font-style:italic;">
            {{props.value.slice(0,15)}}
            <q-tooltip :delay="500" :offset="[0, 0]">{{props.value}}</q-tooltip>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-6="props">
        <q-td :props="props">
          <div v-if="props.value !== null" style="font-style:italic;">
            {{props.value.slice(0,20)}}
            <q-tooltip :delay="1000" :offset="[0, 10]">{{props.value}}</q-tooltip>
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import { api } from 'boot/axios'
import { ref } from 'vue'

export default {
  name: 'QTableStock',
  data() {
    return {
      column: [],
      rows: [],
      modelSingle: ref('='),
      modelSingle2: ref('='),
      visibleColumns2: ref('股票代码'),
      visibleColumns22: ref('股票代码'),
      inputValue: ref(''),
      inputValue2: ref(''),
      andOr: ref('no'),
      href: '#/stockk/',
    }
  },
  methods: {
    getPollStockPre(vv) {
      console.log(vv);
      api.get('/polls/').then(res => {
        this.column = res.data.col;
        this.rows = res.data.da;
        // console.log(this.rows[0][6]);
      }).catch((err) => {
        console.log(err);
      });
    },
    getPollStockPreAdd(vv) {
      console.log(vv);
      api.get('/polls/5/', {
        params: {
          col: this.visibleColumns2,
          comp: this.modelSingle,
          inp: this.inputValue,
        },
      }).then(res => {
        this.rows = res.data.dat;
        console.log(res.data);
      }).catch((err) => {
        console.log(err);
      });
    },
    stockk(vv) {
      console.log(vv);
      // api.get('/polls/5/', {
      //   params: {
      //     col: this.visibleColumns2,
      //     comp: this.modelSingle,
      //     inp: this.inputValue,
      //   },
      // }).then(res => {
      //   this.rows = res.data.dat;
      //   console.log(res.data);
      // }).catch((err) => {
      //   console.log(err);
      // });
    }
  },
  //加载完成声明周期函数  调用
  mounted() {
    this.getPollStockPre('uiy09')
  },
  setup() {
    return {
      initialPagination: {
        page: 1,
        rowsPerPage: 20
      },
      visibleColumns: ref([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
      options: ['>', '>=', '=', 'like', '!=', '<', '<='],
      optionsAndOr: ['and', 'or', 'no'],
      filter: ref(''),
    }
  }
}
</script>
<style type="text/css">
a {
  /* 去除默认的下划线 */
  text-decoration: none;
  /* 去除默认的颜色和点击后变化的颜色 */
  color: #000;
}
</style>