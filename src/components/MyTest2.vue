<template>
  <div class="q-pa-xs" style="max-width: 400px">

    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-xs">
      <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-4">
          <q-input dense filled v-model="name" label="Your name *" lazy-rules :rules="[val => val && val.length > 0]" />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
          <q-input dense filled type="number" v-model="age" label="Your age *" lazy-rules
            :rules="[val => val !== null && val !== '' || 'Please type your age', val => val > 0 && val < 100 || 'Please type a real age']" />
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
          <q-btn dense label="Submit" type="submit" color="primary" flat class="q-ml-xs" />
          <q-btn dense label="Reset" type="reset" color="primary" flat class="q-ml-xs" />
        </div>


      </div>
    </q-form>

  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const name = ref(null)
    const age = ref(null)
    return {
      name,
      age,
      onSubmit() {
        console.log(name, age)
      },
      onReset() {
        name.value = null
        age.value = null
        accept.value = false
      }
    }
  }
}
</script>
