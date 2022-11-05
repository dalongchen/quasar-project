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
          <a target="_blank" :href="'#/stockk/' + props.value + '/code2/' + code2 + '/name2/' + name2">
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
  props: {
    data: {
      type: Object
    },
  },
  setup(props) {
    let rows = toRef(props.data, 'da')
    let columns = toRef(props.data, 'col')
    let visibleColumns = toRef(props.data, 'names')
    let code2 = toRef(props.data, 'code2')
    let name2 = toRef(props.data, 'name2')
    // console.log(props.data);
    Object.freeze(code2)
    Object.freeze(name2)
    return {
      rows,
      columns,
      visibleColumns,
      filter: ref(''),
      code2,
      name2,
    }
  }
}
</script>
<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 29.85rem

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