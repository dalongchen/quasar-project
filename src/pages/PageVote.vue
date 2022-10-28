<template>
  <TableStock :data="data"></TableStock>
</template>

<script>
import TableStock from 'components/TableStock.vue';
import { defineComponent, reactive } from 'vue';
import { api } from 'boot/axios'

export default defineComponent({
  name: 'PageVote',
  components: { TableStock },
  setup() {
    let data = reactive({ col: [], da: [], code2: [], names: [] });
    api.get('/polls/5/vote/', {
      params: {
        inp: ''
      },
    }).then(res => {
      data.col = res.data.col
      data.da = res.data.da
      data.code2 = res.data.code2
      data.names = res.data.col.map(function (user) { return user.name; });
      // console.log(names);
    }).catch((err) => {
      console.log(err);
    });
    // console.log(data);
    return { data };
  }
});
</script>
