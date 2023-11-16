<template>
  <label class="c-checkbox-label" :class="classLabel" :for="id">
    <span class="c-checkbox-span" :class="classText"> {{ text }} </span>
    <input
      :id="id"
      :checked="modelValue"
      :class="classInput"
      type="checkbox"
      class="c-checkbox-input"
      :name="id"
      @input="$emit('update:modelValue', $event.target.checked)" />
    <div
      class="icon check"
      tabindex="0"
      @keydown.enter="$event.target.previousSibling.click()">
      <Icon icon-name="IconCheck" />
    </div>
  </label>
</template>

<script>
export default {
  props: {
    id: { required: true, default: '', type: String },
    classLabel: { default: '', type: String },
    classText: { default: '', type: String },
    classInput: { default: '', type: String },
    text: { required: true, default: 'Text for checkbox', type: String },
    modelValue: { type: Boolean, default: false },
  },

  emits: ['update:modelValue'],
}
</script>

<style>
.c-checkbox-label {
  display: inline-flex;
  align-items: center;
}
.c-checkbox-input {
  display: none;
}
.check {
  position: relative;
  margin-left: var(--unit);
  border: var(--border-width-small) solid var(--color-border);
  border-radius: var(--radius);
}
.check svg {
  position: absolute;
  display: none;
}
.c-checkbox-input:checked + .check svg {
  display: block;
}
</style>
