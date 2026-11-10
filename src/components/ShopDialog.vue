<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import ShopIcon from './ShopIcon.vue';
const props = defineProps({
  title: { type: String, required: true },
  drawer: Boolean,
});
const emit = defineEmits(['close']);
const container = ref(null);
watch(
  () => props.title,
  async () => {
    await nextTick();
    container.value?.querySelector('button')?.focus();
  },
);
let previous;
let oldOverflow;
onMounted(() => {
  previous = document.activeElement;
  oldOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  container.value.querySelector('button, select, input, a[href]')?.focus();
  document.addEventListener('keydown', keyboard);
});
onBeforeUnmount(() => {
  document.body.style.overflow = oldOverflow;
  document.removeEventListener('keydown', keyboard);
  previous?.focus();
});
function keyboard(event) {
  if (event.key === 'Escape') emit('close');
  if (event.key === 'Tab') {
    const nodes = [
      ...container.value.querySelectorAll('button, select, input, a[href]'),
    ].filter((el) => !el.disabled);
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (!container.value.contains(document.activeElement)) {
      event.preventDefault();
      first.focus();
      return;
    }
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    }
    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
}
</script>
<template>
  <Teleport to="body"
    ><div
      class="dialog-shade"
      :class="{ 'is-drawer': drawer }"
      @click.self="emit('close')"
    >
      <section
        ref="container"
        class="shop-dialog"
        :class="{ 'cart-drawer': drawer }"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-heading"
      >
        <div class="dialog-header">
          <h2 id="dialog-heading">{{ title }}</h2>
          <button class="icon-button" aria-label="닫기" @click="emit('close')">
            <ShopIcon name="close" />
          </button>
        </div>
        <slot />
      </section></div
  ></Teleport>
</template>
