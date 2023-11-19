<template>
  <svg :class="['icon', customClass]" aria-hidden="true">
    <use
      :href="`${require('/public/icons/' + iconName + '.svg')}#${iconName}`" />
  </svg>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      required: true,
    },
    customClass: {
      type: String,
      default: '',
    },
  },
}
</script>
