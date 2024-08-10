<template>
  <div class="grid" ref="gridRef" :style="style" @mousedown.prevent="mousedown" @mousemove.prevent="mousemove"
    @mouseup.prevent="mouseup">
    <div class="gridInner">
      <div class="row" v-for="(row, index) in showList" :key="index">
        <template v-for="(cellItem, index) in row" :key="index">
          <cellItem v-if="cellItem" :cell="cellItem" @open="open" @flag="flag" />
        </template>


      </div>
    </div>

  </div>
</template>

<script setup>

import { ref, onMounted, computed } from 'vue'
import { getCellByNum, openCell, flagCell, cancelFlagCell } from '@/api/cell';
import cellItem from "@/components/cellItem.vue"
const size = ref(100)
const cell = ref([])
const gridRef = ref()
const top = ref(0)
const left = ref(0)
onMounted(() => {
  if (localStorage.getItem("top")) top.value = parseInt(localStorage.getItem("top"))
  if (localStorage.getItem("left")) left.value = parseInt(localStorage.getItem("left"))
  updateNum()

})

const style = computed(() => {
  return {
    "--size": size.value,
    "--top": top.value + 'px',
    "--left": left.value + 'px',
    "--event": moveFlag.value ? "none" : "auto"
  }
})
const getCell = (start, heightNum, widthNum) => {
  getCellByNum(start, widthNum, heightNum).then(res => {
    res.data.data.forEach(item => {
      if (!cell.value[item.row]) cell.value[item.row] = []
      cell.value[item.row][item.col] = item
    })
  })
}
const flag = (cellItem) => {
  if (cellItem.open === 1) return;
  if (cellItem.open == 2) {
    cell.value[cellItem.row][cellItem.col].open = 0
    cancelFlagCell(cellItem.id).catch((res) => {
      if (res.status !== undefined)
        cell.value[cellItem.row][cellItem.col] = res.data.data;
    })
  }

  else {
    cell.value[cellItem.row][cellItem.col].open = 2
    flagCell(cellItem.id).catch((res) => {
      if (res.status !== undefined)
        cell.value[cellItem.row][cellItem.col] = res.data.data;
    })
  }


}
const open = (cellItem) => {
  if (cellItem.open !== 0) return;
  cell.value[cellItem.row][cellItem.col].open = 1
  openCell(cellItem.id, 1).then(() => {
    if (cellItem.value === 0) updateNum()
  }, (res) => {
    if (res.status !== undefined)
      cell.value[cellItem.row][cellItem.col] = res.data.data;
  })
}
const moveFlag = ref(false)

const mousedown = (e) => {
  if (e.button !== 1) return;
  moveFlag.value = true
}
const mousemove = (e) => {
  if (!moveFlag.value) return;
  top.value += e.movementY
  if (top.value > 0) top.value = 0
  left.value += e.movementX
  if (left.value > 0) left.value = 0
}
const mouseup = () => {

  if (moveFlag.value) {
    localStorage.setItem("top", top.value)
    localStorage.setItem("left", left.value)
    updateNum()
  }
  moveFlag.value = false
}
const updateNum = () => {
  const clientRect = gridRef.value.getBoundingClientRect()
  let widthNum = Math.floor(clientRect.width / size.value)
  let heightNum = Math.floor(clientRect.height / size.value)
  let start = {
    x: Math.floor(-left.value / size.value),
    y: Math.floor(-top.value / size.value)
  }
  getCell(start, widthNum + 5, heightNum + 5)
}
const showList = computed(() => {
  if (!gridRef.value) return []
  const clientRect = gridRef.value.getBoundingClientRect()
  let widthNum = Math.floor(clientRect.width / size.value) + 5
  let heightNum = Math.floor(clientRect.height / size.value) + 5
  let start = {
    x: Math.floor(-left.value / size.value),
    y: Math.floor(-top.value / size.value)
  }
  return cell.value.slice(start.y, start.y + heightNum).map(item => item.slice(start.x, start.x + widthNum))
})
</script>
<style scoped lang="scss">
.grid {
  flex: 1;
  min-height: 0;
  position: relative;
  overflow: hidden;

  .gridInner {


    position: absolute;
    top: var(--top, 0);
    left: var(--left, 0);
    pointer-events: var(--event);

    .row {
      display: flex;

      .cell {
        width: calc(var(--size) * 1px);
        height: calc(var(--size) * 1px);
        flex-shrink: 0;
        border-color: #000;
        border-style: solid;
        border-top-width: 1px;
        border-left-width: 1px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        background-size: cover;
        background-repeat: no-repeat;

        &.close {
          background-image: url("/img/close.gif");
        }
      }
    }
  }


}
</style>
