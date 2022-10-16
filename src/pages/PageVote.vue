<template>
  <q-page class="row items-center justify-evenly">666
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { api } from 'boot/axios'

export default defineComponent({
  name: 'PageVote',
  components: {},
  setup() {
    api.get('/polls/5/vote/', {
      params: {
        inp: ''
      },
    }).then(res => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    });
    return {};
  }
});
</script>
