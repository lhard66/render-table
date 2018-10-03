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
        return col;
      });
    },
    makeRows () {
      this.currentData = this.data.map((row, index) => {
        row._index = index;
        return row;
      });
    },
  },
  render (h) {
    const ths = [];
    const trs = [];

    this.currentColums.forEach(col => {
      ths.push(h('th', col.name));
    });

    this.currentData.forEach(row => {
      const tds = [];
      this.currentColums.forEach(cell => {
        tds.push(h('td', row[cell.key]));
      });
      console.log(tds);
      trs.push(h('tr', tds));
    });
    console.log(trs);
    return h('table', [
      h('thead', [
        h('tr', ths)
      ]),
      h('tbody', trs)
    ]);
  },
}
</script>
