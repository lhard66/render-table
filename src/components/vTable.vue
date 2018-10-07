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
      let key = this.currentColums[index].key;
      this.currentData.sort((a, b) => {
        if (type === 'asc') return a[key] > b[key];
        else return a[key] < b[key];
      });
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
              'sort-type': col._sortType === 'asc'
            },
            on: {
              click: () => {
                this.handleSort(index);
              },
            },
          }, '↑'),
          h('a', {
            class: {
              'sort-type': col._sortType === 'desc',
            },
            on: {
              click: () => {
                this.handleSort(index, 'desc');
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
