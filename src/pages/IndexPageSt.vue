<template>
  <q-page class="">
    <div class="row q-col-gutter-sm q-ml-xs q-mr-sm q-py-sm">
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <LearnChartK1></LearnChartK1>
        <!-- <LearnChartK></LearnChartK> -->
        <!-- <LearnLightWeight></LearnLightWeight> -->

      </div>
    </div>
  </q-page>
</template>

<script>
import LearnChartK1 from 'components/LearnChartK1.vue';
// import LearnChartK from 'components/LearnChartK.vue';
// import LearnLightWeight from 'components/LearnLightWeight.vue';
export default {
  name: 'IndexPageSt',
  components: { LearnChartK1 }
  // components: { LearnChartK }
  // components: { LearnLightWeight }
}
</script>