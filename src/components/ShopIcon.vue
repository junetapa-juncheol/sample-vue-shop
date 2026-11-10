<script setup>
defineProps({
  name: { type: String, default: 'bag' },
  size: { type: Number, default: 20 },
});
const paths = {
  bag: 'M5 7h14l1 14H4L5 7ZM8 8V6a4 4 0 0 1 8 0v2',
  arrow: 'M4 12h16m-6-6 6 6-6 6',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  close: 'm6 6 12 12M6 18 18 6',
  leaf: 'M5 19C2 8 9 3 21 3c0 12-5 19-16 16Zm0 0L17 7',
  check: 'm5 12 4 4L19 6',
};
</script>
<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path :d="paths[name] || paths.bag" />
  </svg>
</template>
