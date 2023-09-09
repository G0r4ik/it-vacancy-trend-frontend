<template>
  <svg :class="['icon', customClass]" aria-hidden="true">
    <use :href="`${require('./icons/' + iconName + '.svg')}#${iconName}`" />
    <!-- <use :xlink:href="`#${iconName}`"></use> -->
  </svg>
</template>

<script>
// const requireAll = requireContext => requireContext.keys().map(requireContext)
// const req = require.context('./icons', false, /\.svg$/)
// requireAll(req)

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

<style>
.icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
}
</style>
