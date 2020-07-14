<template>
  <eg-transition
    :enter="enter"
    :leave="leave"
  >
    <div
      v-if="active"
      class="eg-triggered-message"
      :style="style"
    >
      <slot />
    </div>
  </eg-transition>
</template>
<script>

export default {

  isWidget: true,

  name: 'EgTriggeredMessage',

  props: {

    enter: {
      type: String,
      default: 'slideInLeft'
    },

    leave: {
      type: String,
      default: 'slideOutLeft'
    },

    trigger: {
      type: Boolean,
      default: false
    },

    position: {
      type: String,
      default: 'left top'
    },

    duration: {
      type: Number,
      default: 3
    }

  },

  data: function () {
    return {
      active: false,
      timeout: null,
      style: {
        top: (this.position.indexOf('top') >= 0) ? '0%' : 'none',
        bottom: (this.position.indexOf('bottom') >= 0) ? '0%' : 'none',
        left: (this.position.indexOf('left') >= 0) ? '0%' : 'none',
        right: (this.position.indexOf('right') >= 0) ? '0%' : 'none'
      }
    }
  },

  watch: {

    trigger: function (val, oldVal) {
      if (!oldVal && val) {
        this.active = true
        var self = this
        this.timeout = setTimeout(function () {
          self.active = false
        }, 1000 * this.duration)
      } else if (oldVal && !val) {
        this.active = false
        clearTimeout(this.timeout)
      }
    }

  }

}

</script>
