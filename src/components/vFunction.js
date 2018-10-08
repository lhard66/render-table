// 图片组件
let ImgItem = {
  name: 'ImgItem',
  props: ['data'],
  render: function (h) {
    return h('div', [
      h('p', '图片组件'),
      h('img', {
        attrs: {
          src: this.data.url,
        },
      }),
    ])
  }
};

// 视频组件
let VideoItem = {
  name: 'VideoItem',
  props: ['data'],
  render: function (h) {
    return h('div', [
      h('p', '视频组件'),
      h('video', {
        attrs: {
          src: this.data.url,
          controls: 'controls',
          autoplay: 'autoplay',
        }
      })
    ]);
  }
};

// 文本组件
let TextItem = {
  name: 'textItem',
  props: ['data'],
  // 这里使用箭头函数，会报text是undefined
  render: function (h) {
    return h('div', [
      h('p', '纯文本组件'),
      h('p', this.data.text)
    ])
  }
};

export default {
  functional: true,
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  render: (h, context) => {
    function getComp () {
      let data = context.props.data;
      console.log(data);
      if (data.type === 'img') return ImgItem;
      else if (data.type === 'video') return VideoItem;
      else if (data.type === 'text') return TextItem;
      else throw new Error('type 类型错误！');
    }

    return h(
      getComp(), {
        props: {
          data: context.props.data,
        }
      },
      context.children,
    )
  }
}
