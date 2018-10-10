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
      h('p', this.data.text),
      this.$slots.default
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
    console.log(context);
    return h(
      getComp(), {
        props: {
          data: context.props.data,
        }
      }, [
        context.children,
        // context.slots().default,
        // context.slots().foo,
        // children 会给你两个段落标签
        // 而 slots().default 只会传递第二个匿名段落标签，slots().foo 会传递第一个具名段落标签。
        // 同时拥有 children 和 slots() ，因此你可以选择让组件通过 slot() 系统分发或者简单的通过 children 接收，让其他组件去处理。
      ]
    )
  }
}
