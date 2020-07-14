<template>
  <eg-transition
    :enter="enter"
    :leave="leave"
  >
    <div class="eg-code-comment">
      <span v-if="arrow">&larr;</span>
      <slot />
    </div>
  </eg-transition>
</template>

<script>

export default {

  isWidget: true,

  name: 'EgCodeComment',

  props: {

    enter: {
      type: String,
      default: ''
    },

    leave: {
      type: String,
      default: ''
    },

    active: {
      type: Boolean,
      default: true
    },

    arrow: {
      type: Boolean,
      default: true
    }

  }

}

</script>

<style>

.eg-code-comment {
  display: inline-block
}

</style>
