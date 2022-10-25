<template>
  <div class="q-pa-md row justify-center">
    <q-input style="min-width: 10em" type="number" v-model.number="virtualListIndex" :min="0" :max="9999"
      label="Scroll to index" input-class="text-right" />
    <q-btn class="q-ml-sm" label="Go" no-caps color="primary"
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
// console.log(useRoute.params.id)


export default defineComponent({
  name: 'IndexPageSt',
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
    // console.log(this.virtualListIndex)
    // this.heavyList = heavyList2;
    this.heavyList = heavyList2.slice(0, 22);
    Object.freeze(this.heavyList)
    // this.$refs.virtualListRef.scrollTo(this.virtualListIndex)
  },
  methods: {
    onVirtualScroll({ index }) {
      if (this.deii !== 0) {
        this.virtualListIndex = index
      } else {
        this.$refs.virtualListRef.scrollTo(this.virtualListIndex)
        this.deii += 1

      }
    }
  },
  // setup() {
  //   // let mydata = useRoute().params.id
  //   let postId = useRoute().params.postId
  //   let heavyList = postId.split(',')
  //   // this.virtualListIndex = arr.findIndex((item) => {
  //   //   return item === mydata
  //   // })
  //   // let heavyList = arr.slice(index - 1, index + 22);
  //   Object.freeze(heavyList)
  //   return {
  //     heavyList,
  //   };
  // },
})
</script>