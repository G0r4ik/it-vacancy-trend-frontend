<template>
  <!-- <label class="c-checkbox-label" :class="classLabel" :for="id">
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
      <IconSvg icon-name="IconCheck" />
    </div>
  </label> -->
  <div style="display: flex; align-items: center">
    <span class="c-checkbox-span" :class="classText"> {{ text }} </span>
    <label class="toggler-wrapper" :class="classLabel" :for="id">
      <input
        :id="id"
        :checked="modelValue"
        :class="classInput"
        type="checkbox"
        class="c-checkbox-input"
        :name="id"
        @input="$emit('update:modelValue', $event.target.checked)" />
      <div class="toggler-slider">
        <div class="toggler-knob"></div>
      </div>
    </label>
  </div>
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
.c-checkbox-span {
  margin-right: 10px;
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
.c-checkbox-input:checked + .check {
  background: var(--color-link);
}
.c-checkbox-input:checked + .check svg {
  display: block;
  width: 100%;
}
/*  */
.toggler-wrapper {
  position: relative;
  display: block;
  width: 45px;
  height: 25px;
  cursor: pointer;
}
.toggler-wrapper input[type='checkbox'] {
  display: none;
}
.toggler-slider {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 45px;
  height: 100%;
  background-color: var(--color-bg-checkbox);
  border-radius: 100px;
  transition: all 300ms ease;
}
.toggler-wrapper input[type='checkbox']:checked + .toggler-slider {
  background-color: var(--color-link);
}
.toggler-knob {
  position: absolute;
  top: 3px;
  left: 3px;
  width: calc(25px - 6px);
  height: calc(25px - 6px);
  background-color: #fff;
  border-radius: 50%;
  transition: all 300ms ease;
}
.toggler-wrapper
  input[type='checkbox']:checked
  + .toggler-slider
  .toggler-knob {
  left: calc(100% - 19px - 3px);
}
</style>
