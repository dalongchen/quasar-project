<template>
  <!-- xs=4 md中,sm=8所有方向小的padding -->
  <div class="q-pa-xs">
    <q-table class="my-sticky-header-table" title="Treats" :rows="rows" :columns="columns" row-key="name" flat bordered
      dense :rows-per-page-options="[20, 50, 100, 200, 500, 1000, 0]" rows-per-page-label=" "
      :visible-columns="visibleColumns" :filter="filter">
      <template v-slot:top-right>
        <q-select v-model="visibleColumns" multiple outlined dense options-dense :display-value="$q.lang.table.columns"
          emit-value map-options :options="columns" option-value="name" options-cover style="min-width: 150px" />
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:body-cell-0="props">
        <q-td :props="props">
          <a target="_blank" :href="'#/stockk/' + props.value + '/posts/' + postId">
            {{ props.value }}
          </a>
        </q-td>
      </template>

      <template v-slot:body-cell-2="props">
        <q-td :props="props">
          <div v-if="props.value !== null" style="font-style:italic;">
            {{ props.value.slice(0, 4) }}
            <q-tooltip :delay="800" :offset="[0, 10]">{{ props.value }}</q-tooltip>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-3="props">
        <q-td :props="props">
          <div v-if="props.value !== null" style="font-style:italic;">
            {{ props.value.slice(0, 15) }}
            <q-tooltip :delay="800" :offset="[0, 0]">{{ props.value }}</q-tooltip>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-6="props">
        <q-td :props="props">
          <div v-if="props.value !== null" style="font-style:italic;">
            {{ props.value.slice(0, 20) }}
            <q-tooltip :delay="1000" :offset="[0, 10]">{{ props.value }}</q-tooltip>
          </div>
        </q-td>
      </template>

    </q-table>
  </div>
</template>

<script>
import { toRef, ref } from 'vue'

export default {
  name: 'TableStock',
  // data() {
  //   return {
  //     column: [],
  //     column2: [],
  //     rows: [],
  //     modelSingle: ref('like'),
  //     modelSingle2: ref('like'),
  //     visibleColumns2: ref('股票代码'),
  //     visibleColumns22: ref('股票代码'),
  //     visibleColumns23: ref('重复'),
  //     inputValue: ref(''),
  //     inputValue2: ref(''),
  //     andOr: ref('no'),
  //     postId: [],
  //   }
  // },
  // methods: {
  //   getPollStockPre() {
  //     api.get('/polls/').then(res => {
  //       let rr = res.data.col;
  //       this.column = rr;
  //       this.rows = res.data.da;
  //       this.postId = res.data.code2;
  //       // console.log(this.postId);
  //       rr.push({ name: 10, label: '重复', field: 10 });
  //       this.column2 = rr;
  //     }).catch((err) => { console.log(err); });
  //   },
  //   getPollStockPreAdd(vv) {
  //     console.log(vv);
  //     let col;
  //     if (this.visibleColumns2 === '类型') {
  //       col = '预告类型'
  //     } else if (this.visibleColumns2 === '幅度') {
  //       col = '业绩变动幅度'
  //     } else {
  //       col = this.visibleColumns2
  //     };
  //     let repace2;
  //     if (this.visibleColumns23 === '重复') {
  //       repace2 = ''
  //     } else {
  //       repace2 = ' GROUP BY ' + this.visibleColumns23
  //     }
  //     let tota1;
  //     if (this.modelSingle === 'like') {
  //       tota1 = col + ' ' + this.modelSingle + " '%" + this.inputValue + "%' " + repace2
  //     } else {
  //       tota1 = col + this.modelSingle + "'" + this.inputValue + "' " + repace2
  //     }
  //     console.log(tota1)

  //     if (vv === 'two') {
  //       let col2;
  //       if (this.visibleColumns22 === '类型') {
  //         col2 = '预告类型'
  //       } else if (this.visibleColumns22 === '幅度') {
  //         col2 = '业绩变动幅度'
  //       } else {
  //         col2 = this.visibleColumns22
  //       };

  //       if (this.modelSingle2 === 'like') {
  //         tota1 = col2 + ' ' + this.modelSingle2 + " '%" + this.inputValue2 + "%' " + this.andOr + ' ' + tota1
  //       } else {
  //         tota1 = col2 + this.modelSingle2 + "'" + this.inputValue2 + "' " + this.andOr + ' ' + tota1
  //       }
  //       console.log(tota1)
  //     }
  //     api.get('/polls/5/', {
  //       params: { tota: tota1 }
  //     }).then(res => {
  //       this.rows = res.data.dat;
  //       console.log(res.data);
  //     }).catch((err) => {
  //       console.log(err);
  //     });
  //   },
  // },
  //加载完成声明周期函数  调用
  // mounted() {
  //   this.getPollStockPre()
  // },
  props: {
    data: {
      type: Object
    },
  },
  setup(props) {
    let rows = toRef(props.data, 'da')
    let columns = toRef(props.data, 'col')
    let visibleColumns = toRef(props.data, 'names')
    let postId = toRef(props.data, 'code2')
    console.log(postId);
    return {
      rows,
      columns,
      visibleColumns,
      filter: ref(''),
      postId
    }
  }
}
</script>
<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 410px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #c1f4cd

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>
<style type="text/css">
a {
  /* 去除默认的下划线 */
  text-decoration: none;
  /* 去除默认的颜色和点击后变化的颜色 */
  color: #000;
}
</style>