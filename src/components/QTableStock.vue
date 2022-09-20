<template>
  <!-- <div>677 {{dd[0]}} {{column[5]}}</div> -->
  <!-- md中,sm所有方向小的padding -->
  <div class="q-pa-xs">
    <q-table dense :rows="rows" :columns="column" row-key="name" />
    <!-- <q-table title="Treats" dense :rows="rows" :columns="columns" row-key="name" /> -->
  </div>
</template>

<script>
import { api } from 'boot/axios'

// const rows = [
//   {
//     0: 'Frozen Yogurt',
//     1: 159,
//     2: 6.0,
//     3: 24,
//     4: 4.0,
//     5: 87,
//     6: '14%',
//     7: '1%',
//     8: '1%',
//     9: '1%'
//   }
// ]


export default {
  name: 'QTableStock',
  data() {
    return {
      column: [],
      rows: [],
    }
  },
  // methods: {
  //   api_get() {
  //     api.get('/polls/').then(res => {
  //       return res.data;
  //       // console.log(res);
  //     }).catch((err) => {
  //       return err;
  //       // console.log(err);
  //     })
  //   }
  //   // console.log(api_get());
  // },
  // //加载完成声明周期函数  调用
  mounted() {
    api.get('/polls/').then(res => {
      this.column = res.data.col;
      // console.log(this.column);

      // this.column = [
      //   {
      //     name: 'name',
      //     // required: true,
      //     label: ddd[0],
      //     // label: 'Dessert',
      //     align: 'left',
      //     field: 0,
      //     // field: row => row.name,
      //     // format: val => `${val}`,
      //     sortable: true
      //   },
      //   { name: 'calories', align: 'center', label: ddd[1], field: 1, sortable: true },
      //   { name: 'fat', label: ddd[2], field: 2, sortable: true },
      //   { name: 'carbs', label: ddd[3], field: 3 },
      //   { name: 'protein', label: ddd[4], field: 4 },
      //   { name: 'sodium', label: ddd[5], field: 5 },
      //   { name: 'calcium', label: ddd[6], field: 6, sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
      //   { name: 'iron', label: ddd[7], field: 7, sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
      //   { name: 'iron2', label: ddd[7], field: 8, sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
      //   { name: 'iron3', label: ddd[7], field: 9, sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      // ]
      this.rows = res.data.da;
    }).catch((err) => {
      console.log(err);
    })
  },
  // setup() {
  //   return {
  //     columns,
  //     rows,
  //   }
  // }
}
</script>

  


<!-- <style scoped>
.chart {
  height: 90vh;
  width: 70vw;
}
</style> -->
  