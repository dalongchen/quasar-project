<template>
  <q-page class="">
    <div class="row q-col-gutter-sm q-ml-xs q-mr-sm q-py-sm">
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <LearnChartk2></LearnChartk2>
      </div>
    </div>
  </q-page>
</template>

<script>
import LearnChartk2 from 'components/LearnChartk2.vue';
// import LearnChartk from 'components/LearnChartk.vue';
export default {
  name: 'IndexPageSt',
  components: { LearnChartk2}
}
</script>