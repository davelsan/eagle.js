<template>
  <eg-transition
    :enter="enterTransition"
    :leave="leaveTransition"
  >
    <div
      v-if="active"
      class="eg-slide"
    >
      <div class="eg-slide-content">
        <slot />
      </div>
    </div>
  </eg-transition>
</template>

<script>
export default {

  name: 'Slide',

  props: {

    skip: {
      type: Boolean,
      default: false
    },

    enter: {
      type: String,
      default: null
    },

    enterPrev: {
      type: String,
      default: null
    },

    enterNext: {
      type: String,
      default: null
    },

    leave: {
      type: String,
      default: null
    },

    leavePrev: {
      type: String,
      default: null
    },

    leaveNext: {
      type: String,
      default: null
    },

    steps: {
      type: Number,
      default: 1
    },

    mouseNavigation: {
      type: Boolean,
      default: true
    },

    keyboardNavigation: {
      type: Boolean,
      default: true
    }

  },

  data: function () {
    return {
      step: 1,
      active: false,
      isSlide: true,
      slideTimer: 0,
      direction: 'next',
      transitions: {
        next: {
          enter: this.enterNext || this.enter,
          leave: this.leaveNext || this.leave
        },
        prev: {
          enter: this.enterPrev || this.enter,
          leave: this.leavePrev || this.leave
        }
      }
    }
  },

  computed: {

    enterTransition: function () {
      return this.transitions[this.direction].enter
    },

    leaveTransition: function () {
      return this.transitions[this.direction].leave
    }

  },

  watch: {

    step: function (val) {
      this.$parent.step = val
    },

    active: function (val) {
      var self = this
      if (val) {
        this.slideTimer = 0
        this.timerUpdater = setInterval(function () {
          self.slideTimer++
        }, 1000)
      } else {
        clearInterval(this.timerUpdater)
      }
    }

  },

  methods: {

    nextStep: function () {
      if (this.step === this.steps) {
        this.$parent.nextSlide()
      } else {
        this.step++
      }
    },

    previousStep: function () {
      if (this.step === 1) {
        this.$parent.previousSlide()
      } else {
        this.step--
      }
    }

  }
}
</script>
