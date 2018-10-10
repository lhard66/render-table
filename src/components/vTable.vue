<script>
export default {
  name: 'vTable',
  props: {
    data: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
  },
  data () {
    return {
      currentColums: [],
      currentData: [],
    }
  },
  mounted () {
    this.makeColums();
    this.makeRows();
  },
  methods: {
    makeColums () {
      this.currentColums = this.columns.map((col, index) => {
        col._index = index;
        col._sortType = 'normal';
        return col;
      });
    },
    makeRows () {
      this.currentData = this.data.map((row, index) => {
        row._index = index;
        return row;
      });
    },
    handleSort (index, type = 'asc') {
      this.currentColums.forEach(col => {
        col._sortType = 'normal';
      })
      this.currentColums[index]._sortType = type;

      // 上行代码直接改变数组对象中_sortType的值，vue是监测不到它数据的变化的。使用下面三行代码可以实现监测数组的变化。关键字：this.$set
      // 为什么加上排序代码，就可以监测到数组对象中键的变化？因为排序时表格重新渲染，执行render函数了，render函数中包含列数组的渲染。
      // let orderColum = this.currentColums[index];
      // orderColum._sortType = type;
      // this.$set(this.currentColums, index, orderColum);

      // 排序
      let key = this.currentColums[index].key;
      this.currentData.sort((a, b) => {
        if (type === 'asc') return a[key] > b[key];
        else return a[key] < b[key];
      });
    },
  },
  watch: {
    data () {
      this.makeRows();
      // 找出排序列
      const sortedColumn = this.currentColums.find(col => col._sortType !== 'normal');
      if (sortedColumn) this.handleSort(sortedColumn._index, sortedColumn._sortType);
    },
  },
  render (h) {
    const ths = [];
    const trs = [];

    this.currentColums.forEach((col, index) => {
      if (col.sortable) {
        ths.push(h('th', [
          h('span', col.name),
          h('a', {
            'class': {
              'sort-type': col._sortType === 'desc'
            },
            on: {
              click: () => {
                this.handleSort(index, 'desc');
              },
            },
          }, '↑'),
          h('a', {
            class: {
              'sort-type': col._sortType === 'asc',
            },
            on: {
              click: () => {
                this.handleSort(index);
              },
            },
          }, '↓'),
        ]));
      } else {
        ths.push(h('th', col.name));
      }
    });

    this.currentData.forEach(row => {
      const tds = [];
      this.currentColums.forEach(cell => {
        tds.push(h('td', row[cell.key]));
      });
      // console.log(tds);
      trs.push(h('tr', tds));
    });

    return h('table', [
      h('thead', [
        h('tr', ths)
      ]),
      h('tbody', trs)
    ]);
  },
}
</script>

<style scoped>
table, th, td {
  border: 1px solid #ccc;
  border-collapse: collapse;
}
table {
  width: 600px;
}
th > a {
  display: inline-block;
  width: 15px;
  margin-right: 5px;
  cursor: pointer;
}
th > a:last-of-type {
  margin-right: 0;
}
tr {
  line-height: 30px;
}
.sort-type {
  color: red;
  font-weight: 800;
}
</style>
