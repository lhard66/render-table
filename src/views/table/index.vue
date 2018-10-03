<template>
  <v-table :data="data" :columns="config"></v-table>
</template>

<script>
import vTable from '@/components/vTable.vue';
import { config, data } from './config';

export default {
  name: 'DemoTable',
  components: {
    vTable,
  },
  data () {
    return {
      config,
      data,
    }
  },
}
</script>
