<script setup>
const emit = defineEmits(["update:modelValue"]);

defineProps({
  size: {
    type: String,
    default: "default",
  },
  success: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    default: "",
  },
  options: {
    type: Array,
    default: () => [],
  },
  isRequired: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const getClasses = (size, success, error) => {
  let sizeValue = size ? `form-control-${size}` : "";
  let isValidValue = error ? "is-invalid" : success ? "is-valid" : "";
  return `${sizeValue} ${isValidValue}`;
};
</script>

<template>
  <div class="form-group">
    <select
      :id="id"
      class="form-control"
      :class="getClasses(size, success, error)"
      :name="name"
      :required="isRequired"
      :disabled="disabled"
      :value="modelValue"
      @change="emit('update:modelValue', $event.target.value)"
    >
      <option disabled value="">Selecciona una opció</option>
      <option v-for="(opt, index) in options" :key="index" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>
  </div>
</template>
