<template>
  <div :class="classComputed" @dblclick="openAll" @click="open" @contextmenu.prevent="flag" class="cell"
    :style="styleComputed">
    {{ showValue }}</div>
</template>

<script setup>
import { computed } from 'vue';
const emit = defineEmits(["open", "flag", "openAll"])
const props = defineProps({
  cell: {
    type: Object,
    default: () => { }
  },
  index: {
    type: Number,
    default: 0
  }
})
const showValue = computed(() => {
  if (props.cell.open) {
    if (props.cell.value === -1 || props.cell.open === 2) return ""
    if (props.cell.value === 0) return " ";
    return props.cell.value;
  }
  return ""
})
const classComputed = computed(() => {
  if (!props.cell.open) return "close"
  if (props.cell.open === 2) return "flag"
  if (props.cell.value === -1) return "bomb"
  return "bord"
})
const styleComputed = computed(() => {
  return {
    "left": `calc(var(--size) * ${props.cell.col}px)`,
    "top": `calc(var(--size) * ${props.cell.row}px)`
  }
})
const open = () => {
  emit("open", props.cell, props.index)
}
const openAll = () => {
  emit("openAll", props.cell, props.index)
}
const flag = () => {
  emit("flag", props.cell, props.index)

}

</script>
<style scoped lang="scss">
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
  user-select: none;
  position: absolute;

  &.close {
    background-image: url("/img/close.gif");
  }

  &.flag {
    background-image: url("/img/flag.png");
  }

  &.bomb {
    background-image: url("/img/bomb.gif");
  }

  &.bord {
    background-image: url("/img/bord.gif");
  }
}
</style>
