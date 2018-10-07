<template>
  <div>
    <v-table :data="data" :columns="config"></v-table>
    <button class="btn-add" @click="addRow">添加一条</button>
  </div>
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
  methods: {
    addRow () {
      this.data.push({
        name: '何小胖',
        age: 88,
        birth: '1930-01-01',
        address: '美国',
      });
    },
  },
}
</script>

<style scoped>
.btn-add {
  float: left;
  margin-top: 10px;
}
</style>
