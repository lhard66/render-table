<template>
  <div>
    <smart-item :data="data">
      <p slot="foo">first</p><p>second</p>
    </smart-item>
    <button @click="change('img')">切换为图片组件</button>
    <button @click="change('video')">切换为视频组件</button>
    <button @click="change('text')">切换为纯文本组件</button>
  </div>
</template>

<script>
import SmartItem from '../../components/vFunction.js';

export default {
  name: 'DemoFunction',
  components: { SmartItem },
  data () {
    return {
      data: {},
    }
  },
  created () {
    this.change();
  },
  methods: {
    change (type = 'text') {
      if (type === 'img') {
        this.data = {
          type: 'img',
          url: 'http://smartliu.com/resources/imgs/header.png',
        };
      } else if (type === 'video') {
        this.data = {
          type: 'video',
          url: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
        };
      } else if (type === 'text') {
        this.data = {
          type: 'text',
          text: '这个一个纯文本',
        };
      }
    },
  },
}
</script>
