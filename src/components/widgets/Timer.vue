<template>
  <eg-transition
    enter="fadeIn"
    leave="fadeOut"
  >
    <div
      v-if="display"
      class="timer"
    >
      | {{ text }}
    </div>
  </eg-transition>
</template>

<script>

export default {

  isWidget: true,

  name: 'EgTimer',

  props: {

    key: {
      type: String,
      default: 'T'
    }

  },

  data: function () {
    return {
      text: '',
      active: false
    }
  },

  mounted: function () {
    this.updateText()

    window.addEventListener('keydown', this.keydown)

    setInterval(this.updateText, 1000)
  },

  beforeDestroy: function () {
    window.removeEventListener('keydown', this.keydown)
  },

  methods: {

    toggle: function () {
      this.display = !this.display
    },

    keydown: function (evt) {
      if (evt.key === this.key) {
        this.active = !this.active
      }
    },

    updateText: function () {
      var time = (this.$parent.timer / 60) + ':' + (this.$parent.timer % 60)
      var slide = this.$parent.currentSlideIndex + '/' + this.$parent.slides.length
      return slide + ' - ' + time
    }

  }
}

</script>
