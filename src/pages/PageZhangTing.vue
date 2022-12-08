<template>
  <!-- xs=4 md中,sm=8所有方向小的padding -->
  <div class="q-pa-xs">
    <q-table title="Treats" :rows="rows" :columns="columns" row-key="name" dense
      :rows-per-page-options="[50, 100, 200, 500, 1000, 0]" rows-per-page-label=" " flat bordered
      class="my-sticky-header-table" :visible-columns="visibleColumns" :filter="filter">
      <template v-slot:top-right>
        <TableZhangTing :flatLable="flatLable = '当天涨停'" :nameList="onSubmitFather"></TableZhangTing>
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
          <a target="_blank" :href="'#/stockStandardk/' + props.value + '/code2/' + code2 + '/name2/' + name2">
            {{ props.value }}
          </a>
        </q-td>
      </template>
    </q-table>
    <!-- <div>我:{{ linksList }}</div> -->
  </div>
</template>

<script>
import TableZhangTing from 'components/TableZhangTing.vue';


export default {
  name: 'PageZhangTing',
  components: { TableZhangTing },
  data() {
    return {
      rows: [],
      columns: [],
      code2: [],
      name2: [],
      visibleColumns: [],
      filter: '',
    };
  },
  // props: {
  //   data: {
  //     type: Object
  //   },
  // },
  methods: {
    onSubmitFather(val) {
      // console.log(val.data.col.map(function (user) { return user.name; }))
      this.rows = val.data.da
      this.columns = val.data.col
      this.code2 = val.data.code2
      this.name2 = val.data.name2
      this.visibleColumns = val.data.col.map(function (user) { return user.name; })
    }
  },
  // setup() { 
  //   return {
  //     filter: ref(''),
  //   }
  // }
}
</script>
<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 33.85rem

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