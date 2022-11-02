<template>
  <q-carousel v-model="slide" vertical transition-prev="slide-down" transition-next="slide-up" swipeable animated
    control-color="white" navigation-icon="radio_button_unchecked" navigation padding arrows height="300px"
    class="bg-purple text-white shadow-1 rounded-borders">
    <q-carousel-slide name="style" class="column no-wrap flex-center">
      <q-icon name="style" size="56px" />
      <div class="q-mt-md text-center">
        {{ lorem }}
      </div>
    </q-carousel-slide>
    <q-carousel-slide name="tv" class="column no-wrap flex-center">
      <q-icon name="live_tv" size="56px" />
      <div class="q-mt-md text-center">
        {{ lorem }}
      </div>
    </q-carousel-slide>
    <q-carousel-slide name="layers" class="column no-wrap flex-center">
      <q-icon name="layers" size="56px" />
      <div class="q-mt-md text-center">
        {{ lorem }}
      </div>
    </q-carousel-slide>
    <q-carousel-slide name="map" class="column no-wrap flex-center">
      <q-icon name="terrain" size="56px" />
      <div class="q-mt-md text-center">
        {{ lorem }}
      </div>
    </q-carousel-slide>
  </q-carousel>
  <!-- <q-virtual-scroll ref="virtualListRef" virtual-scroll-item-size="450" virtual-scroll-slice-size="10"
    style="max-height: 450px;" :items="heavyList" separator component="q-list" @virtual-scroll="onVirtualScroll">
    <template v-slot="{ item, index }">{{ item }}
      <q-item :key="index" dense :class="{ 'bg-black text-white': index === virtualListIndex }">
        <LearnChartk :mydata="item"></LearnChartk>
      </q-item>
    </template>
  </q-virtual-scroll> -->
</template>

<script>
// import LearnChartk from 'src/components/LearnChartk.vue';
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'PageStockk2',
  // components: { LearnChartk },
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