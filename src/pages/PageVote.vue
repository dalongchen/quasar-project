<template>
  <div class="q-gutter-xs">
    <q-form @submit="onSubmit" @reset="onReset">
      <div class="row" style="max-width: 50rem;">
        <div class="col-3">
          <q-select label="季度" filled v-model="quarter" :options="opt" dense options-dense />
        </div>
        <div class="col-1">
          <q-input dense filled type="number" v-model="day_num" label="天数" lazy-rules
            :rules="[val => val !== null && val !== '' || 'Please type ', val => val > 0 && val < 300 || 'Please type']" />
        </div>
        <div class="col-1">
          <q-input dense filled type="number" v-model="up_num" label="正幅度" lazy-rules
            :rules="[val => val !== null && val !== '' || 'Please type ', val => val > 0 && val < 100 || 'Please type']" />
        </div>
        <div class="col-1">
          <q-input dense filled type="number" v-model="down_num" label="负幅度" lazy-rules
            :rules="[val => val !== null && val !== '' || 'Please type ', val => val > -100 && val < 0 || 'Please type']" />
        </div>
        <div class="col-3">
          <q-btn dense label="Submit" type="submit" color="primary" flat class="q-ml-xs" />
          <q-btn dense label="Reset" type="reset" color="primary" flat class="q-ml-xs" />
        </div>
      </div>
    </q-form>
  </div>
  <KeepAlive>
    <TableStock :data="data"></TableStock>
  </KeepAlive>
</template>

<script>
import TableStock from 'components/TableStock.vue';
import { defineComponent, reactive, ref } from 'vue';
import { api } from 'boot/axios'

export default defineComponent({
  name: 'PageVote',
  components: { TableStock },
  setup() {
    let data = reactive({ col: [], da: [], code2: [], name2: [], names: [] });
    const quarter = ref('2020年1-3,2020年1-6')
    const day_num = ref(30)
    const up_num = ref(10)
    const down_num = ref(-10)
    function onSubmit() {
      // console.log('uiy', quarter.value, day_num.value, up_num.value)
      api.get('/polls/5/vote/', {
        params: {
          quarter: quarter.value,
          day_num: day_num.value,
          up_num: up_num.value,
          down_num: down_num.value,
        },
      }).then(res => {
        data.col = res.data.col
        data.da = res.data.da
        data.code2 = res.data.code2
        data.name2 = res.data.name2
        data.names = res.data.col.map(function (user) { return user.name; });
        // console.log(res.data);
      }).catch((err) => {
        console.log(err);
      });
    };
    // onSubmit();
    function onReset() {
      quarter.value = null
      day_num.value = null
      up_num.value = null
      down_num.value = null
    }
    return {
      data,
      opt: [
        '2017年1-9,2017年1-12',
        '2017年1-12,2018年1-3',
        '2018年1-3,2018年1-6',
        '2018年1-6,2018年1-9',
        '2018年1-9,2018年1-12',
        '2018年1-12,2019年1-3',
        '2019年1-3,2019年1-6',
        '2019年1-6,2019年1-9',
        '2019年1-9,2019年1-12',
        '2019年1-12,2020年1-3',
        '2020年1-3,2020年1-6',
        '2020年1-6,2020年1-9',
        '2020年1-9,2020年1-12',
        '2020年1-12,2021年1-3',
        '2021年1-3,2021年1-6',
        '2021年1-6,2021年1-9',
        '2021年1-9,2021年1-12',
        '2021年1-12,2022年1-3',
      ],
      onSubmit,
      onReset,
      quarter,
      day_num,
      up_num,
      down_num,
    };
  }
});
</script>
