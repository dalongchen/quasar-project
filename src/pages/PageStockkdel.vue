<template>
  <div class="q-pa-xs row justify-center">
    <q-input style="min-width: 1em;max-height: 3em;padding-top:0px;" type="number" v-model.number="virtualListIndex"
      :min="0" :max="9999" label="" input-class="text-right" dense />
    <q-btn class="q-ml-xs" label="Go" no-caps color="primary" dense
      @click="$refs.virtualListRef.scrollTo(virtualListIndex, 'start-force')" />
  </div>
  <q-virtual-scroll ref="virtualListRef" virtual-scroll-item-size="450" virtual-scroll-slice-size="10"
    style="max-height: 450px;" :items="heavyList" separator component="q-list" @virtual-scroll="onVirtualScroll">
    <template v-slot="{ item, index }">{{ item }}
      <q-item :key="index" dense :class="{ 'bg-black text-white': index === virtualListIndex }">
        <LearnChartk :mydata="item"></LearnChartk>
      </q-item>
    </template>
  </q-virtual-scroll>
</template>

<script>
import LearnChartk from 'src/components/LearnChartk.vue';
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'PageStockk2',
  components: { LearnChartk },
  data() {
    return {
      heavyList: [],
      virtualListIndex: 2,
      deii: 0
    }
  },
  mounted() {
    let mydata = useRoute().params.id
    // console.log(mydata)
    let postId = useRoute().params.postId
    let heavyList2 = postId.split(',')
    this.virtualListIndex = heavyList2.findIndex((item) => {
      return item === mydata
    })
    this.heavyList = heavyList2.slice(0, 22);
    Object.freeze(this.heavyList)
  },
  methods: {
    onVirtualScroll({ index }) {
      if (this.deii !== 0) {
        this.virtualListIndex = index
      } else {
        this.$refs.virtualListRef.scrollTo(this.virtualListIndex)
        this.deii += 1
      }
    },
  },
})
</script>