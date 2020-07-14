<template>
  <eg-transition
    :enter="enter"
    :leave="leave"
  >
    <div
      v-if="active"
      class="eg-slide image-slide"
      :style="style"
    />
  </eg-transition>
</template>

<script>

import Slide from '../Slide.vue'

export default {

  isWidget: true,

  name: 'EgImageSlide',

  mixins: [Slide],

  props: {

    url: {
      type: String,
      default: 'https://i.imgur.com/P7iyH.png'
    },

    enter: {
      type: String,
      default: ''
    },

    leave: {
      type: String,
      default: ''
    }

  },

  computed: {

    style: function () {
      return {
        'background-image': 'url(' + this.url + ')',
        'background-position': 'center center',
        'background-size': 'cover'
      }
    }

  }

}
</script>
