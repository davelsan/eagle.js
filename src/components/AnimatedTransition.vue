<template>
  <transition
    :enter-active-class="enter ? 'animated ' + enter : ''"
    :leave-active-class="leave ? 'animated ' + leave : ''"
  >
    <slot />
  </transition>
</template>

<script>
export default {

  name: 'EgTransition',

  props: {

    enter: {
      type: String,
      default: ''
    },

    leave: {
      type: String,
      default: ''
    }
  }
}
</script>
