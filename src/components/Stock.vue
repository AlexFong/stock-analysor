<script setup lang="ts">
import { defineComponent, getCurrentInstance, onMounted } from "vue";
</script>

<script lang="ts">
export default {
  data() {
    return {
      data: [],
    };
  },
  mounted() {
    // 挂载全局变量
    const {
      appContext: {
        config: { globalProperties },
      },
    } = getCurrentInstance();
    this.g = globalProperties;
    this.init();
  },
  methods: {
    async init() {
      const html : string = await this.getHtml("002487");
      const el = document.createElement("div");
      el.innerHTML = html;
      const table: HTMLTableElement | null = el.querySelector(
        ".fr.yjyc .m_table.m_hl"
      );

      if (table) {
        const keys: Array<string> | undefined = this.getTableHead(table);
        const list: Array<Map<string, string> | undefined> | undefined =
          this.getTableData(table, keys);
        if (list?.length) {
          this.data = list
        }
      }
    },

    getTableHead(el: HTMLTableElement): Array<string> {
      const rows = el.rows;
      if (!rows.length) {
        return [];
      }
      const keys: Array<string> = [];
      const headCells = rows?.item(0)?.cells;
      // LOOP THROUGH EACH CELL
      if (headCells) {
        for (let j = 0; j < headCells.length; j++) {
          const innerHTML = headCells.item(j)?.innerHTML
          keys.push(innerHTML)
        }
      }
      return keys;
    },

    getTableData(el: HTMLTableElement, keys: Array<string>) {
      const rows = el.rows;
      if (!rows.length) {
        return;
      }

      const list = [];
      // LOOP ROW AFTER HEADER.
      for (let i = 1; i < rows.length; i++) {
        const objCells: HTMLCollectionOf<HTMLTableCellElement> | undefined =
          rows.item(i)?.cells;
        const data = new Map();
        if (objCells) {
          // LOOP THROUGH EACH CELL
          for (let j = 0; j < objCells.length; j++) {
            const key: string = keys[j] || "";
            data.set(key, objCells.item(j)?.innerHTML);
          }
        }
        list.push(data);
      }
      return list;
    },

    getHtml(code: string) : Promise<string, any> {
      return new Promise((resolve, reject) => {
        this.g
          .$axios({
            method: "get",
            url: `/api/stockanalysor/worth/${code}/worth.html`,
            responseType: "arraybuffer", // 关键步骤
            responseEncoding: "utf8",
          })
          .then((res : any) => {
            const { data } = res
            const utf8decoder = new TextDecoder("GBK"); // 关键步骤
            const html : string = utf8decoder.decode(data);
            resolve(html);
          })
          .catch((err : any) => {
            console.warn(err);
            reject(err);
          });
      });
    },
  },
};
</script>

<template>
  <div>{{ data }}</div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
